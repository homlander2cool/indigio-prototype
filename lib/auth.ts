export type SignInResult =
  | { ok: true; isAdmin: boolean }
  | { ok: false; message: string; field?: "email" | "password" };

export async function signIn(email: string, password: string): Promise<SignInResult> {
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const body = (await response.json().catch(() => null)) as { isAdmin?: boolean } | null;
    return { ok: true, isAdmin: body?.isAdmin === true };
  }
  const body = (await response.json().catch(() => null)) as
    | { field?: "email" | "password"; message?: string }
    | null;
  return {
    ok: false,
    field: body?.field,
    message: body?.message ?? "Unable to sign in.",
  };
}

export function clearSession(): void {
  // The HTTP-only session cookie is cleared by /api/auth/signout.
}
