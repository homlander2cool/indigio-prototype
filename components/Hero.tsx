import Link from "next/link";
import { formatCurrency, formatPercent } from "@/lib/format";

const stats = [
  { value: "190+", label: "countries served" },
  { value: "$8.2B", label: "assets monitored" },
  { value: "24/7", label: "client concierge" },
];

/**
 * Sample allocation for the preview card. Percentages are numbers so the bar
 * widths are computed from the same value the label shows — they can't drift.
 */
const allocation = [
  { label: "Property Fund", pct: 48, bar: "from-gold-light to-gold" },
  { label: "Private Credit", pct: 31, bar: "from-cyan-400 to-sky-500" },
  { label: "Global Equity", pct: 21, bar: "from-violet-400 to-fuchsia-500" },
];

const PREVIEW_VALUE = 2_840_000;

export default function Hero() {
  return (
    <section className="on-dark bg-navy-gradient relative overflow-hidden text-white">
      {/* Decorative layers, hidden from assistive tech. */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-16 top-24 h-80 w-80 rounded-full bg-gold/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 top-8 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative z-10 grid items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:py-28">
        <div className="animate-fade-in">
          <p className="eyebrow-gold text-[11px] font-semibold uppercase tracking-[0.28em]">
            Private banking &amp; wealth advisory
          </p>

          <h1 className="heading-xl mt-5 max-w-2xl text-white">
            Private wealth for a global life.
          </h1>

          <p className="lede mt-6 max-w-xl">
            Discreet strategy, institutional access, and bespoke portfolio guidance
            for clients who expect more than standard banking.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/kyc" className="gold-button shine px-8 py-4 text-base">
              Open Your Account
            </Link>
            <Link href="/deals" className="ghost-button px-8 py-4 text-base">
              Explore live deals
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            No obligation. KYC review typically completes in 24–48 hours.
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
            {stats.map((item) => (
              <div key={item.label}>
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="block text-2xl font-black text-white md:text-3xl">
                    {item.value}
                  </span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-slate-400">
                    {item.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Product preview. Decorative illustration of the dashboard, so it is
            labelled as a figure rather than announced as live account data. */}
        <figure className="animate-fade-in m-0" style={{ animationDelay: "140ms" }}>
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-3 shadow-[0_30px_90px_rgba(5,10,20,0.38)] backdrop-blur-xl sm:p-4">
            <div className="rounded-[26px] bg-[#0d1f34]/90 p-5 ring-1 ring-white/5 sm:p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    Portfolio overview
                  </p>
                  <p className="mt-2 text-3xl font-black tabular-nums text-white">
                    {formatCurrency(PREVIEW_VALUE)}
                  </p>
                </div>
                <span className="badge-positive whitespace-nowrap">+12.4% YTD</span>
              </div>

              <ul className="space-y-3">
                {allocation.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                  >
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{item.label}</span>
                      <span className="font-semibold tabular-nums text-white">
                        {formatPercent(item.pct, 0)}
                      </span>
                    </div>
                    <div className="progress-track mt-3">
                      <div
                        className={`progress-fill bg-gradient-to-r ${item.bar}`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-gold/25 bg-gold/10 p-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-gold-light">
                    KYC status
                  </p>
                  <p className="mt-1.5 text-lg font-semibold text-white">Verified</p>
                </div>
                <span className="badge-positive whitespace-nowrap">Ready to invest</span>
              </div>
            </div>
          </div>
          <figcaption className="mt-3 text-center text-[11px] text-slate-500">
            Illustrative dashboard. Figures are sample data.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
