import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth-token";

export async function middleware(request: NextRequest) {
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");
  const isDashboardApi = request.nextUrl.pathname.startsWith("/api/dashboard");
  if (!isDashboardPage && !isDashboardApi) return NextResponse.next();

  const authenticated = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
    process.env.NEXTAUTH_SECRET,
  );
  if (authenticated) return NextResponse.next();

  if (isDashboardApi) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
