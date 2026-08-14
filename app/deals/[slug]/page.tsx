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
import { dealProgressPct } from "@/lib/mock-data";
import { getDealBySlug, getDeals } from "@/lib/data";
import { createT } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

type PageProps = { params: { slug: string } };

/**
 * Unknown slugs 404 at the routing layer.
 *
 * With `dynamicParams = false` Next/server returns a real 404 for any slug
 * that isn't in `generateStaticParams` — the in-page `notFound()` path in
 * Next 14.2 has a quirk where it renders the 404 UI but answers HTTP 200.
 * Known slugs are pre-rendered once at build time; new deals ship together
 * with the seed that run on every build.
 */
export const dynamicParams = false;

/** Pre-renders every deal at build time. */
export async function generateStaticParams() {
  const allDeals = await getDeals();
  return allDeals.map((deal) => ({ slug: deal.slug }));
}

/** Per-deal title, description and OG image so shared links are meaningful. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const deal = await getDealBySlug(params.slug);

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

export default async function DealDetailPage({ params }: PageProps) {
  const [deal, allDeals] = await Promise.all([getDealBySlug(params.slug), getDeals()]);
  const locale = getServerLocale();
  const t = createT(locale);

  if (!deal) {
    notFound();
  }

  const prefix = `dealContent.${deal.slug}`;
  const progress = dealProgressPct(deal);
  const remaining = Math.max(0, deal.targetUsd - deal.raisedUsd);
  const related = allDeals.filter((item) => item.slug !== deal.slug).slice(0, 3);

  const keyMetrics = [
    { label: t("dealDetail.minInvestment"), value: formatCurrency(deal.minInvestmentUsd, locale) },
    { label: t("dealDetail.projectedYield"), value: formatPercent(deal.projectedYieldPct, 1, locale) },
    { label: t("dealDetail.tokenizedUnits"), value: formatNumber(deal.tokenizedUnits, locale) },
    {
      label: t("dealDetail.riskProfile"),
      value: t.fallback(`riskProfiles.${deal.riskProfile}`, deal.riskProfile),
    },
  ];

  return (
    <div className="container-page section">
      <nav aria-label={t("dealDetail.breadcrumbDeals")} className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <li>
            <Link href="/" className="transition hover:text-navy">
              {t("common.home")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/deals" className="transition hover:text-navy">
              {t("dealDetail.breadcrumbDeals")}
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
                alt={t.fallback(`${prefix}.imageAlt`, deal.imageAlt)}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>

            <ul className="mt-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              {[
                t.fallback(`${prefix}.category`, deal.category),
                t.fallback(`${prefix}.assetType`, deal.assetType),
                deal.location,
                formatTerm(deal.termMonths, locale),
              ].map((chip) => (
                <li key={chip} className="badge-neutral">
                  {chip}
                </li>
              ))}
            </ul>

            <h1 className="heading-lg mt-6 text-ink">{deal.title}</h1>
            <p className="lede mt-5 max-w-2xl">
              {t.fallback(`${prefix}.description`, deal.description)}
            </p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {keyMetrics.map((metric) => (
                <div key={metric.label} className="panel-solid p-4">
                  <dt className="metric-label">{metric.label}</dt>
                  <dd className="mt-3 text-xl font-black tabular-nums text-ink">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>

            <section className="mt-10">
              <h2 className="heading-md text-ink">{t("dealDetail.whyStandout")}</h2>
              <ul className="mt-5 space-y-3 text-base text-ink-muted">
                {(t.raw(`${prefix}.highlights`) as string[] | undefined ?? deal.highlights).map(
                  (highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-700"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ),
                )}
              </ul>
            </section>
          </div>

          {/* Sticky rail keeps the primary action reachable on long pages. */}
          <aside className="border-t border-line bg-white p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
            <div className="lg:sticky lg:top-28">
              <p className="metric-label">{t("dealDetail.investmentOverview")}</p>

              <div className="mt-6 space-y-4">
                <div className="tile">
                  <p className="metric-label">{t("dealDetail.targetReturn")}</p>
                  <p className="mt-2 text-3xl font-black tabular-nums text-ink">
                    {formatPercent(deal.targetIrrPct, 1, locale)}
                  </p>
                </div>

                <div className="tile">
                  <ProgressBar
                    value={progress}
                    label={t("dealDetail.capitalRaised")}
                    leading={formatCurrencyCompact(deal.raisedUsd, locale)}
                    trailing={formatCurrencyCompact(deal.targetUsd, locale)}
                  />
                  <p className="mt-3 text-xs text-ink-muted">
                    {remaining > 0
                      ? t("dealDetail.remainingToClose", {
                          amount: formatCurrencyCompact(remaining, locale),
                        })
                      : t("dealDetail.fullySubscribed")}
                  </p>
                </div>

                <div className="tile">
                  <p className="metric-label">{t("dealDetail.minimumTicket")}</p>
                  <p className="mt-2 text-xl font-black tabular-nums text-ink">
                    {formatCurrency(deal.minInvestmentUsd, locale)}
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Link href="/kyc" className="gold-button w-full">
                  {t("dealDetail.requestPack")}
                </Link>
                <Link href="/login" className="ghost-button w-full">
                  {t("dealDetail.signInToInvest")}
                </Link>
              </div>

              <div className="on-dark mt-8 rounded-card bg-navy p-5 text-white">
                <p className="eyebrow-gold text-[10px] font-semibold uppercase tracking-[0.2em]">
                  {t("dealDetail.investorNote")}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-200">
                  {t("dealDetail.investorNoteBody")}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="heading-md text-ink">{t("dealDetail.otherOpportunities")}</h2>
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
                      {t("dealDetail.targetIrrSuffix", {
                        pct: formatPercent(item.targetIrrPct, 1, locale),
                        category: t.fallback(`dealContent.${item.slug}.category`, item.category),
                      })}
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
