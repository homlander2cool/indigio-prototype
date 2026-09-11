"use client";

import { useEffect, useState } from "react";
import type { Deal } from "@/lib/portfolio-data";
import { formatCurrency, formatPercent } from "@/lib/format";

export default function PackageSelector({ deals }: { deals: Deal[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    void fetch("/api/packages", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { slug?: string } | null) => setSelected(data?.slug ?? null));
  }, []);

  async function choose(slug: string) {
    setMessage("");
    const response = await fetch("/api/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error ?? "Unable to save package selection.");
      return;
    }
    setSelected(slug);
    setMessage("Package preference saved. An advisor will follow up with next steps.");
  }

  return (
    <section className="panel p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Investment packages</p>
          <h2 className="heading-md mt-2 text-ink">Choose your next opportunity</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-muted">
            Compare live packages and save your preference. Your selection is a request for guidance, not an automatic investment.
          </p>
        </div>
        {message && <p className="text-sm font-medium text-navy">{message}</p>}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {deals.map((deal) => (
          <article key={deal.slug} className={`rounded-card border p-5 transition hover:-translate-y-1 hover:border-gold/60 ${selected === deal.slug ? "border-gold bg-gold/10 shadow-gold" : "border-line bg-canvas-ivory"}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="metric-label">{deal.category}</p>
                <h3 className="mt-2 text-xl font-black text-ink">{deal.title}</h3>
              </div>
              {selected === deal.slug && <span className="badge-positive">Selected</span>}
            </div>
            <p className="mt-2 text-sm text-ink-muted">{deal.location} · {deal.termMonths} months</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div><p className="metric-label">Target yield</p><p className="mt-1 font-black text-ink">{formatPercent(deal.projectedYieldPct)}</p></div>
              <div><p className="metric-label">Minimum</p><p className="mt-1 font-black text-ink">{formatCurrency(deal.minInvestmentUsd)}</p></div>
            </div>
            <button type="button" className={`${selected === deal.slug ? "ghost-button" : "navy-button"} mt-5 w-full`} onClick={() => void choose(deal.slug)}>
              {selected === deal.slug ? "Update preference" : "Choose package"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
