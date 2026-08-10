import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import {
  formatCurrency,
  formatCurrencyCompact,
  formatNumber,
  formatPercent,
  formatTerm,
} from "@/lib/format";
import { dealProgressPct, deals, getDealBySlug, type Deal } from "@/lib/mock-data";

type PageProps = { params: { slug: string } };

/** Pre-renders every deal at build time. */
export function generateStaticParams() {
  return deals.map((deal) => ({ slug: deal.slug }));
}

/** Per-deal title, description and OG image so shared links are meaningful. */
export function generateMetadata({ params }: PageProps): Metadata {
  const deal = getDealBySlug(params.slug);

  if (!deal) {
    return { title: "Deal not found" };
  }

  return {
    title: deal.title,
    description: deal.description,
    alternates: { canonical: `/deals/${deal.slug}` },
    openGraph: {
      title: deal.title,
      description: deal.description,
      images: [{ url: deal.image, alt: deal.imageAlt }],
    },
  };
}

/** Derived from the numeric fields, so it can never contradict the data. */
function keyMetrics(deal: Deal) {
  return [
    { label: "Min. investment", value: formatCurrency(deal.minInvestmentUsd) },
    { label: "Projected yield", value: formatPercent(deal.projectedYieldPct) },
    { label: "Tokenized units", value: formatNumber(deal.tokenizedUnits) },
    { label: "Risk profile", value: deal.riskProfile },
  ];
}

export default function DealDetailPage({ params }: PageProps) {
  const deal = getDealBySlug(params.slug);

  if (!deal) {
    notFound();
  }

  const progress = dealProgressPct(deal);
  const remaining = Math.max(0, deal.targetUsd - deal.raisedUsd);
  const related = deals.filter((item) => item.slug !== deal.slug).slice(0, 3);

  return (
    <div className="container-page section">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <li>
            <Link href="/" className="transition hover:text-navy">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/deals" className="transition hover:text-navy">
              Deals
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-semibold text-ink">
            {deal.title}
          </li>
        </ol>
      </nav>

      <div className="overflow-hidden rounded-panel border border-line bg-canvas-ivory shadow-lifted">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-card bg-canvas-deep">
              <Image
                src={deal.image}
                alt={deal.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>

            <ul className="mt-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              {[deal.category, deal.assetType, deal.location, formatTerm(deal.termMonths)].map(
                (chip) => (
                  <li key={chip} className="badge-neutral">
                    {chip}
                  </li>
                ),
              )}
            </ul>

            <h1 className="heading-lg mt-6 text-ink">{deal.title}</h1>
            <p className="lede mt-5 max-w-2xl">{deal.description}</p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {keyMetrics(deal).map((metric) => (
                <div key={metric.label} className="panel-solid p-4">
                  <dt className="metric-label">{metric.label}</dt>
                  <dd className="mt-3 text-xl font-black tabular-nums text-ink">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>

            <section className="mt-10">
              <h2 className="heading-md text-ink">Why this opportunity stands out</h2>
              <ul className="mt-5 space-y-3 text-base text-ink-muted">
                {deal.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-700"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sticky rail keeps the primary action reachable on long pages. */}
          <aside className="border-t border-line bg-white p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
            <div className="lg:sticky lg:top-28">
              <p className="metric-label">Investment overview</p>

              <div className="mt-6 space-y-4">
                <div className="tile">
                  <p className="metric-label">Target return (IRR)</p>
                  <p className="mt-2 text-3xl font-black tabular-nums text-ink">
                    {formatPercent(deal.targetIrrPct)}
                  </p>
                </div>

                <div className="tile">
                  <ProgressBar
                    value={progress}
                    label="Capital raised"
                    leading={formatCurrencyCompact(deal.raisedUsd)}
                    trailing={formatCurrencyCompact(deal.targetUsd)}
                  />
                  <p className="mt-3 text-xs text-ink-muted">
                    {remaining > 0
                      ? `${formatCurrencyCompact(remaining)} remaining to close.`
                      : "This raise is fully subscribed."}
                  </p>
                </div>

                <div className="tile">
                  <p className="metric-label">Minimum ticket</p>
                  <p className="mt-2 text-xl font-black tabular-nums text-ink">
                    {formatCurrency(deal.minInvestmentUsd)}
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Link href="/kyc" className="gold-button w-full">
                  Request investor pack
                </Link>
                <Link href="/login" className="ghost-button w-full">
                  Sign in to invest
                </Link>
              </div>

              <div className="on-dark mt-8 rounded-card bg-navy p-5 text-white">
                <p className="eyebrow-gold text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Investor note
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-200">
                  This opportunity is available to verified investors after
                  onboarding and KYC review. Past performance does not guarantee
                  future results.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="heading-md text-ink">Other opportunities</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/deals/${item.slug}`}
                  className="panel group flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-lifted"
                >
                  <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-canvas-deep">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-bold text-ink">{item.title}</span>
                    <span className="mt-1 block text-xs text-ink-muted">
                      {formatPercent(item.targetIrrPct)} target IRR · {item.category}
                    </span>
                  </span>
                  <span aria-hidden="true" className="ml-auto text-gold transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
