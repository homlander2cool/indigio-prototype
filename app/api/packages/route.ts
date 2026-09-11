import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

async function getUser() {
  return (await getSupabaseServerClient().auth.getUser()).data.user;
}

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const result = await getSupabaseAdminClient().from("investment_package_selections").select("deal_slug").eq("user_id", user.id).maybeSingle();
  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 });
  return NextResponse.json({ slug: result.data?.deal_slug ?? null });
}

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const body = await request.json();
  const slug = typeof body.slug === "string" ? body.slug.trim().slice(0, 120) : "";
  if (!slug) return NextResponse.json({ error: "Choose a valid package." }, { status: 400 });
  const db = getSupabaseAdminClient();
  const deal = await db.from("deals").select("slug").eq("slug", slug).maybeSingle();
  if (deal.error) return NextResponse.json({ error: deal.error.message }, { status: 500 });
  if (!deal.data) return NextResponse.json({ error: "That package is no longer available." }, { status: 404 });
  const result = await db.from("investment_package_selections").upsert({ user_id: user.id, deal_slug: slug, updated_at: new Date().toISOString() });
  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 400 });
  return NextResponse.json({ slug });
}
