import { NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE, SESSION_TTL_SECONDS } from "@/lib/auth-token";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { email, password } = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
  };
  const configuredEmail = process.env.AUTH_EMAIL?.trim().toLowerCase();
  const configuredPassword = process.env.AUTH_PASSWORD;

  if (!configuredEmail || !configuredPassword || !process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ message: "Authentication is not configured." }, { status: 503 });
  }
  if (email?.trim().toLowerCase() !== configuredEmail) {
    return NextResponse.json({ field: "email", message: "Invalid email or password." }, { status: 401 });
  }
  if (password !== configuredPassword) {
    return NextResponse.json({ field: "password", message: "Invalid email or password." }, { status: 401 });
  }

  const token = await createSessionToken(configuredEmail, process.env.NEXTAUTH_SECRET);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
  });
  return response;
}
