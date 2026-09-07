"use client";

import { useState } from "react";

export default function AdminUserForm() {
  const [email, setEmail] = useState("");
  const [asset, setAsset] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, dashboardAssetUsd: Number(asset) }),
    });
    const body = (await response.json()) as { message?: string; generatedPassword?: string };
    setResult(response.ok ? `Temporary password: ${body.generatedPassword}` : body.message ?? "Unable to create account.");
    setSubmitting(false);
  }

  return (
    <form onSubmit={submit} className="panel-solid mt-8 max-w-xl space-y-5 p-6">
      <label className="block text-sm font-semibold text-ink">
        Investor email
        <input className="field mt-2 w-full" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </label>
      <label className="block text-sm font-semibold text-ink">
        Dashboard asset (USD)
        <input className="field mt-2 w-full" type="number" min="0" step="0.01" value={asset} onChange={(event) => setAsset(event.target.value)} required />
      </label>
      <button className="gold-button" disabled={submitting}>{submitting ? "Creating…" : "Create account"}</button>
      {result && <p role="status" className="rounded-field bg-canvas-panel p-4 text-sm text-ink">{result}</p>}
    </form>
  );
}
