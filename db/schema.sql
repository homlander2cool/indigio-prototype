-- Schema for the Indigio prototype database.
--
-- Used verbatim by db/seed.ts against both the local SQLite file
-- (data/indigio.db) and a hosted Turso/libsql database — one schema,
-- one seed script, same SQL in dev and production.

CREATE TABLE IF NOT EXISTS deals (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  category TEXT NOT NULL,
  target_irr_pct REAL NOT NULL,
  projected_yield_pct REAL NOT NULL,
  raised_usd INTEGER NOT NULL,
  target_usd INTEGER NOT NULL,
  term_months INTEGER NOT NULL,
  min_investment_usd INTEGER NOT NULL,
  tokenized_units INTEGER NOT NULL,
  risk_profile TEXT NOT NULL,
  image TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS holdings (
  deal_slug TEXT PRIMARY KEY REFERENCES deals(slug) ON DELETE CASCADE,
  amount_usd INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Live', 'Accruing', 'Pipeline'))
);

CREATE TABLE IF NOT EXISTS kyc_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  data_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);