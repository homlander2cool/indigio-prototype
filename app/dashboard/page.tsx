import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProgressBar from "@/components/ProgressBar";
import SignOutButton from "@/components/SignOutButton";
import {
  formatCurrency,
  formatCurrencyCompact,
  formatNumber,
  formatPercent,
} from "@/lib/format";
import {
  dealProgressPct,
  getPortfolioSummary,
  resolveHoldings,
} from "@/lib/portfolio-data";
import { getDeals, getHoldings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Investor dashboard",
  description:
    "Portfolio value, token balance, blended yield, and live position status across your tokenized real-estate holdings.",
  alternates: { canonical: "/dashboard" },
};

// Refresh from the database on a short ISR cadence so position values and
// deal progress stay current without a redeploy.
export const dynamic = "force-dynamic";

const STATUS_TONE: Record<string, string> = {
  Live: "badge-positive",
  Accruing: "badge-gold",
  Pipeline: "badge-neutral",
};

export default async function DashboardPage() {
  // Every figure below is derived from the holdings and the live deal rows,
  // so the summary tiles and the position list can never disagree with each
  // other — and both reflect the database, not the build-time copy.
  const [holdingsSource, allDeals] = await Promise.all([getHoldings(), getDeals()]);
  const holdings = resolveHoldings(holdingsSource, allDeals);
  const summary = getPortfolioSummary(holdingsSource, allDeals);
  const featuredDeal = allDeals[0];

  const summaryTiles = [
    {
      label: "Portfolio value",
      value: formatCurrency(summary.totalValueUsd),
      emphasis: true,
    },
    { label: "Token balance", value: formatNumber(summary.tokenBalance) },
    { label: "Blended yield", value: formatPercent(summary.blendedYieldPct) },
    { label: "Next drawdown", value: summary.nextDrawdown },
  ];

  return (
    <div className="container-page section">
      <PageHeader
        eyebrow="Investor dashboard"
        title="Portfolio overview"
        description="A consolidated view of your tokenized positions, yields, and upcoming capital events."
        action={
          <>
            <Link href="/deals" className="gold-button">
              Explore deals
            </Link>
            <Link href="/kyc" className="ghost-button">
              Account settings
            </Link>
            <SignOutButton />
          </>
        }
      />

      <dl className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryTiles.map((tile) => (
          <div
            key={tile.label}
            className={`rounded-card p-5 ${
              tile.emphasis
                ? "on-dark border border-white/10 bg-navy text-white shadow-lifted"
                : "border border-line bg-canvas-panel text-ink"
            }`}
          >
            <dt className={tile.emphasis ? "metric-label text-slate-300" : "metric-label"}>
              {tile.label}
            </dt>
            <dd className="mt-3 text-3xl font-black tabular-nums tracking-[-0.05em]">
              {tile.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section aria-labelledby="positions-heading" className="panel p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="positions-heading" className="heading-md text-ink">
              Active positions
            </h2>
            <span className="badge-positive">Updated today</span>
          </div>

          <ul className="mt-6 space-y-4">
            {holdings.map((holding) => {
              const deal = allDeals.find((item) => item.slug === holding.dealSlug);

              return (
                <li
                  key={holding.dealSlug}
                  className="rounded-card border border-line bg-canvas-ivory p-4 transition hover:border-gold/40"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      {deal ? (
                        <Link
                          href={`/deals/${deal.slug}`}
                          className="text-lg font-black text-ink transition hover:text-navy-mid"
                        >
                          {holding.name}
                        </Link>
                      ) : (
                        <span className="text-lg font-black text-ink">{holding.name}</span>
                      )}
                      <p className="mt-1 text-sm text-ink-muted">
                        {deal?.location} · {formatPercent(holding.yieldPct)} projected yield
                      </p>
                    </div>

                    <div className="shrink-0 text-left sm:text-right">
                      <p className="text-lg font-black tabular-nums text-ink">
                        {formatCurrency(holding.amountUsd)}
                      </p>
                      <span className={`${STATUS_TONE[holding.status] ?? "badge-neutral"} mt-1.5`}>
                        {holding.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <ProgressBar value={holding.allocationPct} label="Allocation" />
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 text-xs text-ink-muted">
            Allocations are derived from position values and always total 100%.
          </p>
        </section>

        <section aria-labelledby="featured-heading" className="panel p-5 sm:p-6">
          <p className="metric-label">Featured focus</p>

          <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-card bg-canvas-deep">
            <Image
              src={featuredDeal.image}
              alt={featuredDeal.imageAlt}
              fill
              sizes="(min-width: 1280px) 33vw, 92vw"
              className="object-cover"
            />
          </div>

          <h2 id="featured-heading" className="heading-md mt-5 text-ink">
            {featuredDeal.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-ink-muted">{featuredDeal.description}</p>

          <div className="mt-5 tile">
            <ProgressBar
              value={dealProgressPct(featuredDeal)}
              label="Capital raised"
              leading={formatCurrencyCompact(featuredDeal.raisedUsd)}
              trailing={formatCurrencyCompact(featuredDeal.targetUsd)}
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-card bg-canvas-panel p-4">
            <div>
              <p className="metric-label">Projected yield</p>
              <p className="mt-1 text-xl font-black tabular-nums text-ink">
                {formatPercent(featuredDeal.projectedYieldPct)}
              </p>
            </div>
            <Link href={`/deals/${featuredDeal.slug}`} className="link-quiet text-sm">
              View details →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
