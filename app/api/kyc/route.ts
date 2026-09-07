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

  const referenceId = makeReferenceId(values);
  const referredByCode = normalizeReferralCode(values.referredByCode ?? "");
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

  try {
    const { error } = await getSupabaseAdminClient().from("kyc_submissions").insert({
      reference_id: referenceId,
      full_name: `${values.firstName} ${values.lastName}`,
      referral_code: referralCode,
      referred_by_code: referredByCode || null,
      data_json: { ...values, referredByCode },
    });
    if (error) throw error;
  } catch (error) {
    console.error("[api/kyc] write failed:", error);
    return NextResponse.json({ ok: false, message: "Unable to save your application." }, { status: 503 });
  }

  return NextResponse.json({ ok: true, referenceId, referralCode });
}