/**
 * Database seam.
 *
 * One client for both worlds:
 *   - development: a real SQLite file at `file:./data/indigio.db`
 *   - production:  a hosted SQLite-compatible libsql/Turso database at
 *                  `libsql://…` or `https://…` with `TURSO_AUTH_TOKEN`
 *
 * If no DATABASE_URL is set the app silently uses the local file (which
 * db/seed.ts creates), and lib/data.ts falls back to the seeded copy whenever
 * the database is unreachable — the site must always load.
 */
import { createClient, type Client } from "@libsql/client";

const LOCAL_DEFAULT = "file:./data/indigio.db";

let client: Client | null = null;

function databaseUrl(): string {
  return process.env.DATABASE_URL?.trim() || LOCAL_DEFAULT;
}

/** Whether the configured database is a hosted one (not the local file). */
export function dbMode(): "local" | "remote" {
  const url = databaseUrl();
  return url.startsWith("libsql:") || url.startsWith("https:") ? "remote" : "local";
}

export function getDb(): Client {
  if (!client) {
    const url = databaseUrl();
    client =
      dbMode() === "remote"
        ? createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN })
        : createClient({ url });
  }
  return client;
}