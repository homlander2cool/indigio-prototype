/**
 * Presentation helpers.
 *
 * The data layer stores money and rates as plain numbers so they can be summed,
 * sorted and compared. Formatting happens here, at the edge, right before render.
 * All functions are locale-aware so German visitors see German conventions
 * (`1.250.000 $`, `14,2 %`) without any client-side logic.
 */

type Locale = string;

const cache = new Map<string, Intl.NumberFormat>();

function formatter(locale: Locale, options: Intl.NumberFormatOptions): Intl.NumberFormat {
  const key = `${locale}:${JSON.stringify(options)}`;
  let fmt = cache.get(key);
  if (!fmt) {
    fmt = new Intl.NumberFormat(locale, options);
    cache.set(key, fmt);
  }
  return fmt;
}

/** `1250000` → `"$1,250,000"` (en) / `"1.250.000 $"` (de) */
export function formatCurrency(value: number, locale: Locale = "en-US"): string {
  return formatter(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/** `4800000` → `"$4.8M"` (en) / `"4,8 Mio. $"` (de). Tight spaces: cards, bars. */
export function formatCurrencyCompact(value: number, locale: Locale = "en-US"): string {
  return formatter(locale, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/** `14.2` → `"14.2%"` (en) / `"14,2 %"` (de) */
export function formatPercent(
  value: number,
  fractionDigits = 1,
  locale: Locale = "en-US",
): string {
  return formatter(locale, {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value / 100);
}

/** `18400` → `"18,400"` (en) / `"18.400"` (de) */
export function formatNumber(value: number, locale: Locale = "en-US"): string {
  return formatter(locale, {}).format(value);
}

const TERM_UNIT: Record<string, { one: string; other: string }> = {
  en: { one: "month", other: "months" },
  de: { one: "Monat", other: "Monate" },
};

/** `36` → `"36 months"` (en) / `"36 Monate"` (de). Falls back to English. */
export function formatTerm(months: number, locale: Locale = "en-US"): string {
  const unit = TERM_UNIT[locale] ?? TERM_UNIT.en;
  return `${months} ${months === 1 ? unit.one : unit.other}`;
}

export function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}
