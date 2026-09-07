const SESSION_COOKIE = "indigio-session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function toBase64Url(value: Uint8Array): string {
  let binary = "";
  value.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = `${base64}${"=".repeat((4 - (base64.length % 4)) % 4)}`;
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function asArrayBuffer(value: Uint8Array): ArrayBuffer {
  const copy = new Uint8Array(value.byteLength);
  copy.set(value);
  return copy.buffer;
}

async function signature(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
  const signed = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toBase64Url(new Uint8Array(signed));
}

export async function createSessionToken(email: string, secret: string): Promise<string> {
  const payload = toBase64Url(
    new TextEncoder().encode(
      JSON.stringify({ email, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS }),
    ),
  );
  return `${payload}.${await signature(payload, secret)}`;
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string | undefined,
): Promise<boolean> {
  if (!token || !secret) return false;
  const [payload, suppliedSignature] = token.split(".");
  if (!payload || !suppliedSignature) return false;

  try {
    const valid = await crypto.subtle.verify(
      "HMAC",
      await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["verify"],
      ),
      asArrayBuffer(fromBase64Url(suppliedSignature)),
      new TextEncoder().encode(payload),
    );
    if (!valid) return false;

    const decoded = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as { exp?: number };
    return typeof decoded.exp === "number" && decoded.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export { SESSION_COOKIE, SESSION_TTL_SECONDS };
