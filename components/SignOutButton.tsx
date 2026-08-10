"use client";

import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/auth";

/**
 * Ends the demo session and returns to the sign-in screen. A real backend
 * swaps the body of the click handler for a POST to `/api/auth/signout`.
 */
export default function SignOutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        clearSession();
        router.push("/login");
      }}
      className="ghost-button"
    >
      Sign out
    </button>
  );
}