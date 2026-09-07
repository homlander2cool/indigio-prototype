"use client";

import { useRouter } from "next/navigation";

/**
 * Ends the server session and returns to the sign-in screen.
 */
export default function SignOutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        void fetch("/api/auth/signout", { method: "POST" }).finally(() => router.push("/login"));
      }}
      className="ghost-button"
    >
      Sign out
    </button>
  );
}