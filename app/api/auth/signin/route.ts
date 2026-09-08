import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
  };
  const isAdmin = body.email?.trim().toLowerCase() === process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const response = NextResponse.json({ ok: true, isAdmin });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.headers.get("cookie")?.split("; ").map((item) => {
          const [name, ...value] = item.split("=");
          return { name, value: value.join("=") };
        }) ?? [],
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );
  const { error } = await supabase.auth.signInWithPassword({
    email: body.email?.trim() ?? "",
    password: body.password ?? "",
  });
  if (error) {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }
  response.cookies.set(
    "indigio-admin-login",
    isAdmin ? "1" : "0",
    { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" },
  );
  return response;
}
