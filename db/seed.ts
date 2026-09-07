/**
 * Creates the schema and seeds the portfolio data into whatever DATABASE_URL points
 * at — a local SQLite file in development, a hosted Turso database in
 * production. Idempotent: safe to run at every build and on every `npm run dev`.
 *
 *   DATABASE_URL=file:./data/indigio.db            (default, local .db file)
 *   DATABASE_URL=libsql://your-db.turso.io         (production)
 *   TURSO_AUTH_TOKEN=...                            (required for hosted DBs)
 *
 * The seed data itself is the `deals` and `dashboardHoldings` arrays from
 * lib/portfolio-data.ts, so the database and the codebase can never disagree.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import { dashboardHoldings, deals } from "../lib/portfolio-data";

const DATABASE_URL = process.env.DATABASE_URL?.trim() || "file:./data/indigio.db";
const AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

async function main(): Promise<void> {
  if (DATABASE_URL.startsWith("file:")) {
    // Make sure the parent directory exists for the local .db file.
    const filePath = DATABASE_URL.slice("file:".length);
    const absolute = path.resolve(filePath);
    await fs.mkdir(path.dirname(absolute), { recursive: true });
  }

  const db = createClient({
    url: DATABASE_URL,
    authToken: AUTH_TOKEN || undefined,
  });

  const schema = await fs.readFile(path.join(process.cwd(), "db", "schema.sql"), "utf8");
  await db.executeMultiple(schema);
  for (const statement of [
    "ALTER TABLE kyc_submissions ADD COLUMN referral_code TEXT",
    "ALTER TABLE kyc_submissions ADD COLUMN referred_by_code TEXT",
  ]) {
    try {
      await db.execute(statement);
    } catch (error) {
      if (!String(error).toLowerCase().includes("duplicate column")) throw error;
    }
    await db.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_kyc_referral_code ON kyc_submissions(referral_code)");
  }

  const dealStmt =
    `INSERT INTO deals (slug, title, location, asset_type, category,
                        target_irr_pct, projected_yield_pct, raised_usd, target_usd,
                        term_months, min_investment_usd, tokenized_units, risk_profile,
                        image, image_alt, description, highlights)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(slug) DO UPDATE SET
       title = excluded.title, location = excluded.location,
       asset_type = excluded.asset_type, category = excluded.category,
       target_irr_pct = excluded.target_irr_pct,
       projected_yield_pct = excluded.projected_yield_pct,
       raised_usd = excluded.raised_usd, target_usd = excluded.target_usd,
       term_months = excluded.term_months,
       min_investment_usd = excluded.min_investment_usd,
       tokenized_units = excluded.tokenized_units,
       risk_profile = excluded.risk_profile, image = excluded.image,
       image_alt = excluded.image_alt, description = excluded.description,
       highlights = excluded.highlights`;

  const dealArgs = deals.map((deal) => ({
    sql: dealStmt,
    args: [
      deal.slug,
      deal.title,
      deal.location,
      deal.assetType,
      deal.category,
      deal.targetIrrPct,
      deal.projectedYieldPct,
      deal.raisedUsd,
      deal.targetUsd,
      deal.termMonths,
      deal.minInvestmentUsd,
      deal.tokenizedUnits,
      deal.riskProfile,
      deal.image,
      deal.imageAlt,
      deal.description,
      JSON.stringify(deal.highlights),
    ],
  }));

  const holdingArgs = dashboardHoldings.map((holding) => ({
    sql: `INSERT INTO holdings (deal_slug, amount_usd, status)
          VALUES (?, ?, ?)
          ON CONFLICT(deal_slug) DO UPDATE SET
            amount_usd = excluded.amount_usd, status = excluded.status`,
    args: [holding.dealSlug, holding.amountUsd, holding.status],
  }));

  await db.batch([...dealArgs, ...holdingArgs]);

  const dealCount = await db.execute("SELECT COUNT(*) AS count FROM deals");
  const holdingCount = await db.execute("SELECT COUNT(*) AS count FROM holdings");
  console.log(
    `[db] seeded ${dealCount.rows[0].count} deals and ${holdingCount.rows[0].count} holdings into ${DATABASE_URL}`,
  );

  await db.close();
}

main().catch((error) => {
  console.error("[db] seed failed:", error);
  process.exitCode = 1;
});