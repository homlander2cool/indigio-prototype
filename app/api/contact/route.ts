import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { email, required, validateFields } from "@/lib/validation";

export const runtime = "nodejs";

type ContactValues = { name: string; email: string; subject: string; message: string };

const RULES = {
  name: [required("Name")],
  email: [email()],
  subject: [required("Subject")],
  message: [required("Message")],
};

/**
 * Stores a contact enquiry in the database and returns a lightweight
 * confirmation. Demo behaviour — a production build would fan out to email.
 */
export async function POST(request: Request) {
  let values: ContactValues;
  try {
    values = (await request.json()) as ContactValues;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const errors = validateFields(values, RULES);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: "Please complete every field to send your message." },
      { status: 422 },
    );
  }

  try {
    await getDb().execute({
      sql: `INSERT INTO contact_submissions (name, email, subject, message)
            VALUES (?, ?, ?, ?)`,
      args: [values.name.trim(), values.email.trim(), values.subject, values.message.trim()],
    });
  } catch (error) {
    console.error("[api/contact] write failed:", error);
  }

  return NextResponse.json({ ok: true });
}