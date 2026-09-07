import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { dashboardHoldings, deals } from "../lib/portfolio-data";

loadEnvConfig(process.cwd());

async function main(): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  }

  const supabase = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { error: dealsError } = await supabase.from("deals").upsert(
    deals.map((deal) => ({
      slug: deal.slug,
      title: deal.title,
      location: deal.location,
      asset_type: deal.assetType,
      category: deal.category,
      target_irr_pct: deal.targetIrrPct,
      projected_yield_pct: deal.projectedYieldPct,
      raised_usd: deal.raisedUsd,
      target_usd: deal.targetUsd,
      term_months: deal.termMonths,
      min_investment_usd: deal.minInvestmentUsd,
      tokenized_units: deal.tokenizedUnits,
      risk_profile: deal.riskProfile,
      image: deal.image,
      image_alt: deal.imageAlt,
      description: deal.description,
      highlights: deal.highlights,
    })),
    { onConflict: "slug" },
  );
  if (dealsError) throw dealsError;

  const { error: holdingsError } = await supabase.from("holdings").upsert(
    dashboardHoldings.map((holding) => ({
      deal_slug: holding.dealSlug,
      amount_usd: holding.amountUsd,
      status: holding.status,
    })),
    { onConflict: "deal_slug" },
  );
  if (holdingsError) throw holdingsError;

  console.log(`[supabase] seeded ${deals.length} deals and ${dashboardHoldings.length} holdings.`);
}

main().catch((error) => {
  console.error("[supabase] seed failed:", error);
  process.exitCode = 1;
});
