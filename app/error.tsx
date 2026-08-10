"use client";

import { useEffect } from "react";

/**
 * Client error boundary for the app shell. A failed render shows this instead
 * of a blank page, and "Try again" remounts the subtree.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page section">
      <div className="mx-auto max-w-xl rounded-panel border border-line bg-white p-10 text-center shadow-panel">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-3xl">
          ⚠️
        </span>
        <h1 className="heading-md mt-6 text-ink">Something went wrong</h1>
        <p className="lede mt-4 !text-base">
          An unexpected error interrupted this page. You can try again, or head
          back to the home page.
        </p>
        {error.digest && (
          <p className="mt-4 font-mono text-xs text-ink-muted">Error ID: {error.digest}</p>
        )}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="gold-button justify-center">
            Try again
          </button>
          <a href="/" className="ghost-button justify-center">
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
}