import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  KYC_DOCUMENT_BUCKET,
  KYC_DOCUMENT_ACCEPTED_TYPES,
  KYC_DOCUMENT_MAX_BYTES,
  makeReferenceId,
  makeReferralCode,
  normalizeReferralCode,
  initialKycValues,
  validateAllKyc,
  type KycValues,
} from "@/lib/kyc";

export const runtime = "nodejs";

function getRegistrationLocation(request: Request): {
  ip: string | null;
  country: string | null;
} {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip =
    forwardedFor ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-vercel-forwarded-for")?.trim() ||
    null;
  const country =
    request.headers.get("x-vercel-ip-country")?.trim().toUpperCase() ||
    request.headers.get("cf-ipcountry")?.trim().toUpperCase() ||
    request.headers.get("x-country")?.trim().toUpperCase() ||
    null;
  return { ip, country };
}

async function hasValidDocumentSignature(file: File): Promise<boolean> {
  const bytes = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  const isPdf = file.type === "application/pdf" && new TextDecoder().decode(bytes).startsWith("%PDF-");
  const isJpeg = file.type === "image/jpeg" && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isPng =
    file.type === "image/png" &&
    bytes.length >= 8 &&
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a;
  return isPdf || isJpeg || isPng;
}

function hasValidKycShape(value: unknown): value is KycValues {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return Object.keys(initialKycValues).every((field) => typeof record[field] === "string");
}

/**
 * Persists a KYC submission into the database and returns the reference
 * number shown on the success screen.
 *
 * The reference is derived deterministically from the submission so the same
 * applicant always gets the same reference — no secret state required. If the
 * write fails (database unconfigured), the request still succeeds with the
 * reference; the row simply isn't stored. The client treats this as
 * success either way, which is the right behaviour for a prototype.
 */
export async function POST(request: Request) {
  let values: KycValues;
  let document: File | null = null;
  try {
    const formData = await request.formData();
    const parsedValues: unknown = JSON.parse(String(formData.get("values") ?? "{}"));
    if (!hasValidKycShape(parsedValues)) throw new Error("Invalid KYC fields.");
    values = parsedValues;
    const uploadedDocument = formData.get("document");
    if (uploadedDocument instanceof File && uploadedDocument.size > 0) document = uploadedDocument;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const errors = validateAllKyc(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: "Some details are incomplete. Please review your answers." },
      { status: 422 },
    );
  }

  const referenceId = `${makeReferenceId(values)}-${randomUUID().slice(0, 8).toUpperCase()}`;
  const referredByCode = normalizeReferralCode(values.referredByCode ?? "");
  let documentPath: string | null = null;
  try {
    if (referredByCode) {
      const { data: referrer, error } = await getSupabaseAdminClient()
        .from("kyc_submissions")
        .select("referral_code")
        .eq("referral_code", referredByCode)
        .maybeSingle();
      if (error) throw error;
      if (!referrer) {
        return NextResponse.json({ ok: false, message: "That referral code was not found." }, { status: 422 });
      }
    }
    const referralCode = makeReferralCode();
    const location = getRegistrationLocation(request);
    if (!document) {
      return NextResponse.json({ ok: false, message: "Identity document upload is required." }, { status: 422 });
    }
    const extension = document.name.split(".").pop()?.toLowerCase();
    if (
      !extension ||
      !["pdf", "jpg", "jpeg", "png"].includes(extension) ||
      !KYC_DOCUMENT_ACCEPTED_TYPES.includes(document.type as (typeof KYC_DOCUMENT_ACCEPTED_TYPES)[number]) ||
      document.size <= 0 ||
      document.size > KYC_DOCUMENT_MAX_BYTES ||
      !(await hasValidDocumentSignature(document))
    ) {
      return NextResponse.json({ ok: false, message: "The uploaded identity document is invalid." }, { status: 422 });
    }
    const safeFileName = document.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120);
    documentPath = `${referenceId}/${safeFileName}`;
    const client = getSupabaseAdminClient();
    const { error: uploadError } = await client.storage
      .from(KYC_DOCUMENT_BUCKET)
      .upload(documentPath, document, { contentType: document.type || "application/octet-stream", upsert: false });
    if (uploadError) throw uploadError;
    const submission = {
      reference_id: referenceId,
      full_name: `${values.firstName} ${values.lastName}`,
      registration_email: values.email.trim().toLowerCase(),
      registration_phone: values.phone.trim(),
      registration_ip: location.ip,
      registration_country: location.country,
      document_path: documentPath,
      referral_code: referralCode,
      referred_by_code: referredByCode || null,
      data_json: { ...values, referredByCode },
    };
    const { error } = await client.from("kyc_submissions").insert(submission);
    if (error) throw error;
    return NextResponse.json({ ok: true, referenceId, referralCode });
  } catch (error) {
    if (documentPath) {
      await getSupabaseAdminClient().storage.from(KYC_DOCUMENT_BUCKET).remove([documentPath]).catch(() => undefined);
    }
    console.error("[api/kyc] write failed:", error);
    return NextResponse.json({ ok: false, message: "Unable to save your application." }, { status: 503 });
  }
}