import { clampPercent } from "@/lib/format";

/**
 * Demo dataset for the prototype — now serving two roles:
 *
 *  1. Seed source: db/seed.ts loads these arrays into the database
 *     (libsql — a local `data/indigio.db` file in dev, a hosted Turso
 *     database in production).
 *  2. Fallback: lib/data.ts returns this exact data whenever the database
 *     is unreachable, so the site never renders empty.
 *
 * The pure derivation helpers (progress, allocations, portfolio summary)
 * also live here so the database rows and the UI compute from the same
 * code. Money and rates are stored as numbers, never pre-formatted strings.
 */

/** Broad buckets used by the deals filter. Distinct from the display label. */
export const DEAL_CATEGORIES = [
  "Residential",
  "Hospitality",
  "Industrial",
  "Debt",
] as const;

export type DealCategory = (typeof DEAL_CATEGORIES)[number];

export type RiskProfile = "Conservative" | "Balanced" | "Moderate" | "Growth";

export type Deal = {
  slug: string;
  title: string;
  location: string;
  /** Specific label shown on the card, e.g. "Multifamily". */
  assetType: string;
  /** Coarse bucket used for filtering. */
  category: DealCategory;
  targetIrrPct: number;
  projectedYieldPct: number;
  raisedUsd: number;
  targetUsd: number;
  termMonths: number;
  minInvestmentUsd: number;
  tokenizedUnits: number;
  riskProfile: RiskProfile;
  image: string;
  /** Describes the image for screen readers; never a duplicate of the title. */
  imageAlt: string;
  description: string;
  highlights: string[];
};

export const deals: Deal[] = [
  {
    slug: "harbor-point-residences",
    title: "Harbor Point Residences",
    location: "Miami, Florida",
    assetType: "Multifamily",
    category: "Residential",
    targetIrrPct: 14.2,
    projectedYieldPct: 9.8,
    raisedUsd: 4_800_000,
    targetUsd: 6_100_000,
    termMonths: 36,
    minInvestmentUsd: 25_000,
    tokenizedUnits: 18_400,
    riskProfile: "Moderate",
    image: "/images/harbor-point-residences.svg",
    imageAlt: "Illustration of a waterfront residential tower at dusk",
    description:
      "A premium multifamily asset positioned along the Miami waterfront, designed for durable cash flow and long-term value creation in a supply-constrained submarket.",
    highlights: [
      "Low vacancy in a high-demand residential corridor",
      "Institutional-grade operations and strong exit pipeline",
      "Built for steady monthly distributions and downside protection",
    ],
  },
  {
    slug: "copper-cove-hospitality",
    title: "Copper Cove Hospitality",
    location: "Aspen, Colorado",
    assetType: "Hospitality",
    category: "Hospitality",
    targetIrrPct: 17.8,
    projectedYieldPct: 11.4,
    raisedUsd: 3_200_000,
    targetUsd: 5_500_000,
    termMonths: 24,
    minInvestmentUsd: 50_000,
    tokenizedUnits: 12_600,
    riskProfile: "Growth",
    image: "/images/copper-cove-hospitality.svg",
    imageAlt: "Illustration of a mountain resort lodge beneath alpine peaks",
    description:
      "A destination hospitality venture focused on premium guest conversion, seasonality management, and outsized yield during peak travel periods.",
    highlights: [
      "Strong destination demand with premium ADR trends",
      "Asset enhancement plan to improve operating margin",
      "Designed around reinvestment and refinancing optionality",
    ],
  },
  {
    slug: "summit-terrace-works",
    title: "Summit Terrace Works",
    location: "Austin, Texas",
    assetType: "Industrial",
    category: "Industrial",
    targetIrrPct: 13.6,
    projectedYieldPct: 10.1,
    raisedUsd: 7_100_000,
    targetUsd: 8_800_000,
    termMonths: 42,
    minInvestmentUsd: 30_000,
    tokenizedUnits: 21_800,
    riskProfile: "Balanced",
    image: "/images/summit-terrace-works.svg",
    imageAlt: "Illustration of a logistics warehouse campus at sunrise",
    description:
      "A logistics-focused industrial platform positioned in one of the strongest leasing markets in the U.S. with resilient occupier demand and long-term rental growth.",
    highlights: [
      "Long-warranted tenancy and pricing power",
      "Location near major transportation corridors",
      "Strong industrial demand profile with inflation resilience",
    ],
  },
  {
    slug: "meridian-bridge-credit",
    title: "Meridian Bridge Credit",
    location: "Chicago, Illinois",
    assetType: "Senior Secured Debt",
    category: "Debt",
    targetIrrPct: 10.4,
    projectedYieldPct: 8.6,
    raisedUsd: 9_400_000,
    targetUsd: 10_000_000,
    termMonths: 18,
    minInvestmentUsd: 20_000,
    tokenizedUnits: 9_800,
    riskProfile: "Conservative",
    image: "/images/meridian-bridge-credit.svg",
    imageAlt: "Illustration of a bridge span rendered in navy and gold",
    description:
      "A short-duration senior secured lending strategy against stabilised Midwest assets, structured for capital preservation and predictable quarterly coupons.",
    highlights: [
      "First-lien position with conservative loan-to-value coverage",
      "Short duration reduces exposure to rate and cycle risk",
      "Quarterly coupon payments with covenant-backed protections",
    ],
  },
];

/** Percentage of the raise completed, derived so it can never contradict the amounts. */
export function dealProgressPct(deal: Deal): number {
  if (deal.targetUsd <= 0) return 0;
  return clampPercent(Math.round((deal.raisedUsd / deal.targetUsd) * 100));
}

export function getDealBySlug(slug: string): Deal | undefined {
  return deals.find((deal) => deal.slug === slug);
}

export function filterDealsByCategory(
  source: Deal[],
  category: DealCategory | "All",
): Deal[] {
  return category === "All"
    ? source
    : source.filter((deal) => deal.category === category);
}

export type HoldingStatus = "Live" | "Accruing" | "Pipeline";

export type Holding = {
  /** Links the position back to a deal so the UI can deep-link into it. */
  dealSlug: string;
  amountUsd: number;
  status: HoldingStatus;
};

export const dashboardHoldings: Holding[] = [
  { dealSlug: "harbor-point-residences", amountUsd: 104_500, status: "Live" },
  { dealSlug: "summit-terrace-works", amountUsd: 86_200, status: "Accruing" },
  { dealSlug: "copper-cove-hospitality", amountUsd: 72_800, status: "Pipeline" },
  { dealSlug: "meridian-bridge-credit", amountUsd: 61_300, status: "Accruing" },
];

export type ResolvedHolding = Holding & {
  name: string;
  /** Share of the whole portfolio, derived from the amounts. */
  allocationPct: number;
  yieldPct: number;
};

/**
 * Joins holdings to their deals and derives each position's share of the
 * portfolio. Allocations always total 100% because they are computed, not typed.
 *
 * `dealSource` defaults to the seeded deals so the pure helpers work standalone;
 * callers backed by the database pass the DB rows so joins and yields reflect
 * live data instead of the build-time copy.
 */
export function resolveHoldings(
  source: Holding[] = dashboardHoldings,
  dealSource: Deal[] = deals,
): ResolvedHolding[] {
  const total = source.reduce((sum, holding) => sum + holding.amountUsd, 0);

  return source.map((holding) => {
    const deal = dealSource.find((item) => item.slug === holding.dealSlug);
    return {
      ...holding,
      name: deal?.title ?? holding.dealSlug,
      yieldPct: deal?.projectedYieldPct ?? 0,
      allocationPct: total > 0 ? (holding.amountUsd / total) * 100 : 0,
    };
  });
}

export type PortfolioSummary = {
  totalValueUsd: number;
  tokenBalance: number;
  /** Value-weighted blend of each position's projected yield. */
  blendedYieldPct: number;
  nextDrawdown: string;
};

export function getPortfolioSummary(
  source: Holding[] = dashboardHoldings,
  dealSource: Deal[] = deals,
): PortfolioSummary {
  const resolved = resolveHoldings(source, dealSource);
  const totalValueUsd = resolved.reduce((sum, h) => sum + h.amountUsd, 0);

  const blendedYieldPct =
    totalValueUsd > 0
      ? resolved.reduce((sum, h) => sum + h.yieldPct * h.amountUsd, 0) / totalValueUsd
      : 0;

  const tokenBalance = resolved.reduce((sum, holding) => {
    const deal = dealSource.find((item) => item.slug === holding.dealSlug);
    if (!deal || deal.raisedUsd <= 0) return sum;
    // Units are pro-rata to the investor's share of the deal's raise.
    return sum + Math.round((holding.amountUsd / deal.raisedUsd) * deal.tokenizedUnits);
  }, 0);

  return {
    totalValueUsd,
    tokenBalance,
    blendedYieldPct,
    nextDrawdown: "Q4 2026",
  };
}
