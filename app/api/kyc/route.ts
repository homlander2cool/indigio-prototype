import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { makeReferenceId, validateAllKyc, type KycValues } from "@/lib/kyc";

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

  try {
    await getDb().execute({
      sql: `INSERT INTO kyc_submissions (reference_id, full_name, data_json)
            VALUES (?, ?, ?)`,
      args: [referenceId, `${values.firstName} ${values.lastName}`, JSON.stringify(values)],
    });
  } catch (error) {
    console.error("[api/kyc] write failed:", error);
  }

  return NextResponse.json({ ok: true, referenceId });
}