"use client";

import { clampPercent } from "@/lib/format";
import { useI18n } from "@/components/I18nProvider";

type ProgressBarProps = {
  /** Percentage complete, 0–100. Clamped defensively. */
  value: number;
  label: string;
  /** Optional captions beneath the bar, e.g. "$4.8M" and "$6.1M". */
  leading?: string;
  trailing?: string;
};

/**
 * Accessible capital-raise meter.
 *
 * Uses role="progressbar" with the aria-value* trio so screen readers announce
 * the amount rather than reading an unlabelled decorative div.
 */
export default function ProgressBar({
  value,
  label,
  leading,
  trailing,
}: ProgressBarProps) {
  const { t } = useI18n();
  const pct = clampPercent(value);
  const rounded = Math.round(pct);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        <span>{label}</span>
        <span className="font-semibold tabular-nums">{rounded}%</span>
      </div>

      <div
        role="progressbar"
        aria-label={t("progress.ofTarget", { label, pct: rounded })}
        aria-valuenow={rounded}
        aria-valuemin={0}
        aria-valuemax={100}
        className="progress-track"
      >
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>

      {(leading || trailing) && (
        <div className="mt-2 flex items-center justify-between text-sm font-medium tabular-nums text-ink-muted">
          <span>{leading}</span>
          <span>{trailing}</span>
        </div>
      )}
    </div>
  );
}
