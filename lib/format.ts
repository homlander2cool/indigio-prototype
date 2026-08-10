/**
 * Presentation helpers.
 *
 * The data layer stores money and rates as plain numbers so they can be summed,
 * sorted and compared. Formatting happens here, at the edge, right before render.
 * `Intl` instances are created once at module scope — constructing them per call
 * is measurably expensive in a list render.
 */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const usdCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const decimal = new Intl.NumberFormat("en-US");

/** `1250000` → `"$1,250,000"` */
export function formatCurrency(value: number): string {
  return usd.format(value);
}

/** `4800000` → `"$4.8M"`. Use in tight spaces like progress bars and cards. */
export function formatCurrencyCompact(value: number): string {
  return usdCompact.format(value);
}

/** `14.2` → `"14.2%"` */
export function formatPercent(value: number, fractionDigits = 1): string {
  return `${value.toFixed(fractionDigits)}%`;
}

/** `18400` → `"18,400"` */
export function formatNumber(value: number): string {
  return decimal.format(value);
}

/** `36` → `"36 months"`, `12` → `"12 months"`, `1` → `"1 month"` */
export function formatTerm(months: number): string {
  return `${months} ${months === 1 ? "month" : "months"}`;
}

export function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}
