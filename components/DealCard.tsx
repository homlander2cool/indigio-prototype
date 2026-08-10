import Image from "next/image";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import {
  formatCurrencyCompact,
  formatPercent,
  formatTerm,
} from "@/lib/format";
import { dealProgressPct, type Deal } from "@/lib/mock-data";

type DealCardProps = {
  deal: Deal;
  /** Set on the first row so the optimiser preloads above-the-fold art. */
  priority?: boolean;
};

/**
 * The single deal card used by the listing and the dashboard. Previously this
 * component was dead code typed `deal: any` while the listing hand-inlined its
 * own near-identical markup — two copies to keep in sync, and no type safety.
 */
export default function DealCard({ deal, priority = false }: DealCardProps) {
  const progress = dealProgressPct(deal);
  const headingId = `deal-${deal.slug}-title`;

  return (
    <article
      aria-labelledby={headingId}
      className="panel group flex h-full flex-col overflow-hidden p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lifted"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-canvas-deep">
        <Image
          src={deal.image}
          alt={deal.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-navy/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-light backdrop-blur-sm">
          {deal.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          <span>{deal.assetType}</span>
          <span className="text-right">{deal.location}</span>
        </div>

        <h3 id={headingId} className="mt-3 text-2xl font-black tracking-[-0.04em] text-ink">
          {deal.title}
        </h3>

        <dl className="mt-4 grid grid-cols-2 gap-3">
          <div className="tile">
            <dt className="metric-label">Target IRR</dt>
            <dd className="mt-2 font-bold tabular-nums text-ink">
              {formatPercent(deal.targetIrrPct)}
            </dd>
          </div>
          <div className="tile">
            <dt className="metric-label">Term</dt>
            <dd className="mt-2 font-bold tabular-nums text-ink">
              {formatTerm(deal.termMonths)}
            </dd>
          </div>
        </dl>

        <div className="mt-5">
          <ProgressBar
            value={progress}
            label="Raised"
            leading={formatCurrencyCompact(deal.raisedUsd)}
            trailing={formatCurrencyCompact(deal.targetUsd)}
          />
        </div>

        {/* mt-auto pins the actions to the bottom so cards of differing text
            length still line their buttons up across the grid. */}
        <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
          <Link
            href={`/deals/${deal.slug}`}
            className="gold-button flex-1"
            // The visible label repeats across cards; this disambiguates it.
            aria-label={`View deal: ${deal.title}`}
          >
            View deal
          </Link>
          <Link
            href="/kyc"
            className="ghost-button flex-1"
            aria-label={`Request the investor pack for ${deal.title}`}
          >
            Request pack
          </Link>
        </div>
      </div>
    </article>
  );
}
