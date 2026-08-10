/**
 * Authentication seam.
 *
 * Everything here is a stand-in for the real backend. The UI only ever awaits
 * these functions, so swapping in a fetch to `/api/auth/*` (or NextAuth)
 * requires no component changes.
 *
 * SECURITY: credential checks must move server-side before this ships. A
 * client-side comparison is a demo affordance, not authentication.
 */

export type SignInResult =
  | { ok: true }
  | { ok: false; message: string; field?: "email" | "password" };

/** Surfaced as a hint on the sign-in screen so the demo is usable. */
export const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_EMAIL ?? "demo@indigio.test";

/**
 * Demo session flag, kept in localStorage on the client only. A real backend
 * replaces this with an HTTP-only cookie — components must not treat this as
 * authentication, it exists so the sign-out affordance has something to clear.
 */
const SESSION_KEY = "rbc-indigio.demo-session";

export function hasSession(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SESSION_KEY) === "1";
}

export function startSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, "1");
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}

/** Any password of a plausible length is accepted while there is no backend. */
const MIN_PASSWORD_LENGTH = 8;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function signIn(email: string, password: string): Promise<SignInResult> {
  // Simulated latency: without it, loading and disabled states never get
  // exercised and would ship broken.
  await delay(700);

  if (email.trim().toLowerCase() !== DEMO_EMAIL.toLowerCase()) {
    return {
      ok: false,
      field: "email",
      message: `This prototype only accepts the demo account (${DEMO_EMAIL}).`,
    };
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      ok: false,
      field: "password",
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    };
  }

  return { ok: true };
}
