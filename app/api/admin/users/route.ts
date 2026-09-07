import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function isAdmin(email: string | undefined): boolean {
  return Boolean(email && email.toLowerCase() === process.env.ADMIN_EMAIL?.trim().toLowerCase());
}

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!isAdmin(authData.user?.email)) {
    return NextResponse.json({ message: "Administrator access required." }, { status: 403 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    dashboardAssetUsd?: number;
  };
  const email = body.email?.trim().toLowerCase();
  const dashboardAssetUsd = body.dashboardAssetUsd;
  if (!email || typeof dashboardAssetUsd !== "number" || !Number.isFinite(dashboardAssetUsd) || dashboardAssetUsd < 0) {
    return NextResponse.json({ message: "A valid email and non-negative asset value are required." }, { status: 422 });
  }

  const generatedPassword = randomBytes(18).toString("base64url");
  const admin = getSupabaseAdminClient();
  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password: generatedPassword,
    email_confirm: true,
    user_metadata: { must_change_password: true },
  });
  if (createError || !created.user) {
    return NextResponse.json({ message: createError?.message ?? "Unable to create user." }, { status: 422 });
  }

  const { error: profileError } = await admin.from("profiles").upsert({
    id: created.user.id,
    email,
    role: "investor",
    dashboard_asset_usd: dashboardAssetUsd,
  });
  if (profileError) {
    await admin.auth.admin.deleteUser(created.user.id);
    return NextResponse.json({ message: "Unable to save investor profile." }, { status: 503 });
  }

  return NextResponse.json({ ok: true, email, generatedPassword });
}
