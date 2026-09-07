import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function visitorId(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwardedFor || request.headers.get("x-real-ip") || randomUUID();
  const salt = process.env.ANALYTICS_SALT || process.env.NEXTAUTH_SECRET || "indigio-analytics";
  return createHash("sha256").update(`${salt}:${address}`).digest("hex").slice(0, 24);
}

export async function POST(request: Request) {
  let body: { path?: unknown; referrer?: unknown };
  try {
    body = (await request.json()) as { path?: unknown; referrer?: unknown };
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const path = typeof body.path === "string" ? body.path.slice(0, 500) : "";
  if (!path.startsWith("/") || path.startsWith("/api/")) {
    return NextResponse.json({ ok: false, message: "Invalid page path." }, { status: 422 });
  }

  let userEmail: string | null = null;
  try {
    const { data } = await getSupabaseServerClient().auth.getUser();
    userEmail = data.user?.email ?? null;
  } catch (error) {
    console.error("[analytics] unable to resolve visitor account:", error);
  }

  try {
    const { error } = await getSupabaseAdminClient().from("site_visits").insert({
      visitor_id: visitorId(request),
      user_email: userEmail,
      path,
      referrer: typeof body.referrer === "string" ? body.referrer.slice(0, 1000) : null,
      user_agent: request.headers.get("user-agent")?.slice(0, 1000) || null,
    });
    if (error) throw error;
  } catch (error) {
    console.error("[analytics] visit write failed:", error);
    return NextResponse.json({ ok: false, message: "Unable to record visit." }, { status: 503 });
  }

  return new NextResponse(null, { status: 204 });
}
