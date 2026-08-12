"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DealCard from "@/components/DealCard";
import {
  DEAL_CATEGORIES,
  filterDealsByCategory,
  type Deal,
  type DealCategory,
} from "@/lib/mock-data";

type Filter = DealCategory | "All";
type SortKey = "featured" | "yield" | "raised" | "min";

const FILTERS: Filter[] = ["All", ...DEAL_CATEGORIES];

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "yield", label: "Highest projected yield" },
  { key: "raised", label: "Most funded" },
  { key: "min", label: "Lowest minimum" },
];

/** Safe read of the `?category=` param — anything unknown falls back to "All". */
function readActiveFilter(searchParams: URLSearchParams | null): Filter {
  const raw = searchParams?.get("category");
  return raw && (FILTERS as string[]).includes(raw) ? (raw as Filter) : "All";
}

/**
 * Interactive slice of the deals page. The active filter lives in the URL
 * (`?category=…`) so a filtered view is shareable, survives reloads, and the
 * back button behaves; sorting is per-visit presentation only.
 */
export default function DealFilter({ deals }: { deals: Deal[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = readActiveFilter(searchParams);
  const [sort, setSort] = useState<SortKey>("featured");

  const visible = useMemo(() => {
    const filtered = filterDealsByCategory(deals, active);
    const sorted = [...filtered];
    switch (sort) {
      case "yield":
        sorted.sort((a, b) => b.projectedYieldPct - a.projectedYieldPct);
        break;
      case "raised":
        sorted.sort((a, b) => b.raisedUsd / b.targetUsd - a.raisedUsd / a.targetUsd);
        break;
      case "min":
        sorted.sort((a, b) => a.minInvestmentUsd - b.minInvestmentUsd);
        break;
      default:
        break;
    }
    return sorted;
  }, [deals, active, sort]);

  // Only offer a filter that would return something.
  const available = useMemo(
    () => FILTERS.filter((f) => f === "All" || deals.some((d) => d.category === f)),
    [deals],
  );

  const selectFilter = (filter: Filter): void => {
    if (filter === active) return;
    const next = filter === "All" ? "/deals" : `/deals?category=${encodeURIComponent(filter)}`;
    router.replace(next, { scroll: false });
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Filter deals by category"
          className="flex flex-wrap gap-2"
        >
          {available.map((filter) => {
            const isActive = filter === active;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => selectFilter(filter)}
                aria-pressed={isActive}
                className={`chip ${isActive ? "chip-active" : ""}`}
              >
                {filter}
                <span className="tabular-nums opacity-60">
                  {filterDealsByCategory(deals, filter).length}
                </span>
              </button>
            );
          })}
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
          <span className="sr-only sm:not-sr-only">Sort by</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="cursor-pointer rounded-full border border-line bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink outline-none transition focus:border-navy focus:ring-4 focus:ring-navy/10"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* aria-live announces the new count when the filter changes, so the
          result of pressing a chip isn't silent for screen-reader users. */}
      <p aria-live="polite" className="mt-6 text-sm text-ink-muted">
        Showing <span className="font-semibold text-ink">{visible.length}</span>{" "}
        {visible.length === 1 ? "opportunity" : "opportunities"}
        {active !== "All" && ` in ${active}`}.
      </p>

      {visible.length > 0 ? (
        <ul className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((deal, index) => (
            <li key={deal.slug} className="flex">
              <DealCard deal={deal} priority={index < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="panel mt-6 p-10 text-center">
          <p className="text-lg font-semibold text-ink">No deals in this category yet</p>
          <p className="mt-2 text-sm text-ink-muted">
            New opportunities are added as they clear diligence.
          </p>
          <button type="button" onClick={() => selectFilter("All")} className="ghost-button mt-6">
            Show all deals
          </button>
        </div>
      )}
    </>
  );
}