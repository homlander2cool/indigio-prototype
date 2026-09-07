import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
  };
  const response = NextResponse.json({ ok: true });
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
  return response;
}
