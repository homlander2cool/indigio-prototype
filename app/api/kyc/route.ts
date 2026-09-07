import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
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
    const referrer = await getDb().execute({
      sql: "SELECT referral_code FROM kyc_submissions WHERE referral_code = ? LIMIT 1",
      args: [referredByCode],
    });
    if (referrer.rows.length === 0) {
      return NextResponse.json({ ok: false, message: "That referral code was not found." }, { status: 422 });
    }
  }
  const referralCode = makeReferralCode();

  try {
    await getDb().execute({
      sql: `INSERT INTO kyc_submissions
            (reference_id, full_name, referral_code, referred_by_code, data_json)
            VALUES (?, ?, ?, ?, ?)`,
      args: [
        referenceId,
        `${values.firstName} ${values.lastName}`,
        referralCode,
        referredByCode || null,
        JSON.stringify({ ...values, referredByCode }),
      ],
    });
  } catch (error) {
    console.error("[api/kyc] write failed:", error);
    return NextResponse.json({ ok: false, message: "Unable to save your application." }, { status: 503 });
  }

  return NextResponse.json({ ok: true, referenceId, referralCode });
}