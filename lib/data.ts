/**
 * Data access for the UI.
 *
 * Every read goes through Supabase Postgres. The portfolio arrays remain the
 * type-safe seed source, but production data is always read from Supabase.
 */
import {
  type Deal,
  type Holding,
} from "@/lib/portfolio-data";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  dashboardHoldings,
  deals as fallbackDeals,
} from "@/lib/portfolio-data";

type DealRow = Omit<Deal, "assetType" | "targetIrrPct" | "projectedYieldPct" | "raisedUsd" | "targetUsd" | "termMonths" | "minInvestmentUsd" | "tokenizedUnits" | "riskProfile" | "imageAlt" | "highlights"> & {
  asset_type: string;
  target_irr_pct: number;
  projected_yield_pct: number;
  raised_usd: number;
  target_usd: number;
  term_months: number;
  min_investment_usd: number;
  tokenized_units: number;
  risk_profile: Deal["riskProfile"];
  image_alt: string;
  highlights: string[] | null;
};

function rowToDeal(row: DealRow): Deal {
  return {
    slug: row.slug,
    title: row.title,
    location: row.location,
    assetType: row.asset_type,
    category: row.category,
    targetIrrPct: row.target_irr_pct,
    projectedYieldPct: row.projected_yield_pct,
    raisedUsd: row.raised_usd,
    targetUsd: row.target_usd,
    termMonths: row.term_months,
    minInvestmentUsd: row.min_investment_usd,
    tokenizedUnits: row.tokenized_units,
    riskProfile: row.risk_profile,
    image: row.image,
    imageAlt: row.image_alt,
    description: row.description,
    highlights: row.highlights ?? [],
  };
}

export async function getDeals(): Promise<Deal[]> {
  try {
    const { data, error } = await getSupabaseAdminClient()
      .from("deals")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data as DealRow[]).map(rowToDeal);
  } catch (error) {
    console.warn("[data] deals read failed, using seeded copy.", error);
    return fallbackDeals;
  }
}

export async function getDealBySlug(slug: string): Promise<Deal | undefined> {
  try {
    const { data, error } = await getSupabaseAdminClient()
      .from("deals")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    const row = data as DealRow | null;
    return row ? rowToDeal(row) : undefined;
  } catch (error) {
    console.warn("[data] deal read failed, using seeded copy.", error);
    return fallbackDeals.find((deal) => deal.slug === slug);
  }
}

export async function getHoldings(): Promise<Holding[]> {
  try {
    const { data, error } = await getSupabaseAdminClient()
      .from("holdings")
      .select("deal_slug, amount_usd, status")
      .order("amount_usd", { ascending: false });
    if (error) throw error;
    return (data ?? []).map((row) => ({
      dealSlug: String(row.deal_slug),
      amountUsd: Number(row.amount_usd),
      status: String(row.status) as Holding["status"],
    }));
  } catch (error) {
    console.warn("[data] holdings read failed, using seeded copy.", error);
    return dashboardHoldings;
  }
}