import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
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
 * confirmation. Production deployments can fan out to email here.
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
    const { error } = await getSupabaseAdminClient().from("contact_submissions").insert({
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject,
      message: values.message.trim(),
    });
    if (error) throw error;
  } catch (error) {
    console.error("[api/contact] write failed:", error);
  }

  return NextResponse.json({ ok: true });
}