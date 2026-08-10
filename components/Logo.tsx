import Link from "next/link";
import { site } from "@/lib/site";

type LogoProps = {
  /** `onDark` inverts the wordmark for navy backgrounds. */
  tone?: "onLight" | "onDark";
  className?: string;
};

/**
 * Brand lockmark, drawn inline rather than loaded as an asset.
 *
 * The bundled logo.svg is a 166KB traced file, fixed to a pale blue that
 * disappears on light backgrounds. An inline mark costs no request, stays
 * crisp at any size, and can invert with the surface it sits on.
 *
 * Always wrapped in a home link — an unclickable logo is a dead end users
 * reliably try anyway.
 */
export default function Logo({ tone = "onLight", className = "" }: LogoProps) {
  const onDark = tone === "onDark";

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`group flex shrink-0 items-center gap-3 rounded-lg ${className}`}
    >
      <svg
        viewBox="0 0 40 40"
        className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="logo-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f2d686" />
            <stop offset="55%" stopColor="#d2a94f" />
            <stop offset="100%" stopColor="#c6952c" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="12" fill="url(#logo-gold)" />
        {/* Stylised "I" column with serif slabs, echoing the wordmark. */}
        <path d="M13 11h14v3.4h-5.15v11.2H27V29H13v-3.4h5.15V14.4H13z" fill="#0b2340" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-black tracking-[-0.04em] ${
            onDark ? "text-white" : "text-navy"
          }`}
        >
          {site.shortName}
          <span className="text-gold"> Indigio</span>
        </span>
        <span
          className={`mt-1 text-[8px] font-semibold uppercase tracking-[0.3em] ${
            onDark ? "text-slate-400" : "text-ink-muted"
          }`}
        >
          Private Wealth
        </span>
      </span>
    </Link>
  );
}
