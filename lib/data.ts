/**
 * Data access for the UI.
 *
 * Every read goes through the database (lib/db.ts). If the database is
 * unavailable — first run before seeding, or an unconfigured deployment —
 * the same data falls back to the seeded arrays in lib/mock-data.ts, so the
 * site never renders empty. Types are shared with the fallback, so the two
 * sources can never drift apart.
 */
import { getDb } from "@/lib/db";
import {
  dashboardHoldings,
  deals as fallbackDeals,
  type Deal,
  type Holding,
} from "@/lib/mock-data";

type DealRow = {
  slug: string;
  title: string;
  location: string;
  assetType: string;
  category: Deal["category"];
  targetIrrPct: number;
  projectedYieldPct: number;
  raisedUsd: number;
  targetUsd: number;
  termMonths: number;
  minInvestmentUsd: number;
  tokenizedUnits: number;
  riskProfile: Deal["riskProfile"];
  image: string;
  imageAlt: string;
  description: string;
  highlights: string;
};

const DEAL_COLUMNS = `
  slug, title, location,
  asset_type AS assetType, category,
  target_irr_pct AS targetIrrPct, projected_yield_pct AS projectedYieldPct,
  raised_usd AS raisedUsd, target_usd AS targetUsd,
  term_months AS termMonths, min_investment_usd AS minInvestmentUsd,
  tokenized_units AS tokenizedUnits, risk_profile AS riskProfile,
  image, image_alt AS imageAlt, description, highlights
`;

function rowToDeal(row: DealRow): Deal {
  return {
    slug: row.slug,
    title: row.title,
    location: row.location,
    assetType: row.assetType,
    category: row.category,
    targetIrrPct: row.targetIrrPct,
    projectedYieldPct: row.projectedYieldPct,
    raisedUsd: row.raisedUsd,
    targetUsd: row.targetUsd,
    termMonths: row.termMonths,
    minInvestmentUsd: row.minInvestmentUsd,
    tokenizedUnits: row.tokenizedUnits,
    riskProfile: row.riskProfile,
    image: row.image,
    imageAlt: row.imageAlt,
    description: row.description,
    highlights: JSON.parse(row.highlights) as string[],
  };
}

export async function getDeals(): Promise<Deal[]> {
  try {
    const result = await getDb().execute(
      `SELECT ${DEAL_COLUMNS} FROM deals ORDER BY rowid`,
    );
    return result.rows.map((row) => rowToDeal(row as unknown as DealRow));
  } catch (error) {
    console.warn("[data] deals read failed, using seeded copy.", error);
    return fallbackDeals;
  }
}

export async function getDealBySlug(slug: string): Promise<Deal | undefined> {
  try {
    const result = await getDb().execute({
      sql: `SELECT ${DEAL_COLUMNS} FROM deals WHERE slug = ?`,
      args: [slug],
    });
    const row = result.rows[0] as unknown as DealRow | undefined;
    return row ? rowToDeal(row) : undefined;
  } catch (error) {
    console.warn("[data] deal read failed, using seeded copy.", error);
    return fallbackDeals.find((deal) => deal.slug === slug);
  }
}

export async function getHoldings(): Promise<Holding[]> {
  try {
    const result = await getDb().execute(
      `SELECT deal_slug AS dealSlug, amount_usd AS amountUsd, status
       FROM holdings ORDER BY amount_usd DESC`,
    );
    return result.rows.map((row) => ({
      dealSlug: String(row.dealSlug),
      amountUsd: Number(row.amountUsd),
      status: String(row.status) as Holding["status"],
    }));
  } catch (error) {
    console.warn("[data] holdings read failed, using seeded copy.", error);
    return dashboardHoldings;
  }
}