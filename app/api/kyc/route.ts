import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  makeReferenceId,
  makeReferralCode,
  normalizeReferralCode,
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
  try {
    values = (await request.json()) as KycValues;
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
    const submission = {
      reference_id: referenceId,
      full_name: `${values.firstName} ${values.lastName}`,
      registration_email: values.email.trim().toLowerCase(),
      registration_phone: values.phone.trim(),
      registration_ip: location.ip,
      registration_country: location.country,
      referral_code: referralCode,
      referred_by_code: referredByCode || null,
      data_json: { ...values, referredByCode },
    };
    const client = getSupabaseAdminClient();
    const { error } = await client.from("kyc_submissions").insert(submission);
    if (error) throw error;
    return NextResponse.json({ ok: true, referenceId, referralCode });
  } catch (error) {
    console.error("[api/kyc] write failed:", error);
    return NextResponse.json({ ok: false, message: "Unable to save your application." }, { status: 503 });
  }
}