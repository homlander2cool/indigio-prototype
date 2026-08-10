import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { DEMO_EMAIL } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Client sign in",
  description:
    "Secure sign in for verified investors. Access your portfolio, documents, and live private-market opportunities.",
  alternates: { canonical: "/login" },
};

const trustPoints = [
  {
    title: "Private client security",
    detail: "Hardware-backed session keys and per-device approval.",
  },
  {
    title: "KYC-ready onboarding",
    detail: "Identity and AML screening cleared in 24–48 hours.",
  },
  {
    title: "Global portfolio intelligence",
    detail: "Consolidated reporting across 42 markets, refreshed daily.",
  },
];

const highlightStats = [
  { label: "AUM", value: "$3.8B" },
  { label: "Coverage", value: "42 markets" },
  { label: "Response", value: "< 2 hrs" },
];

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-panel border border-line bg-white shadow-[0_40px_140px_rgba(9,23,40,0.14)] lg:grid-cols-[1.05fr_0.95fr]">
        {/* Brand rail. Hidden below lg — on a phone it would push the form
            below the fold, which is the one thing this page must not do. */}
        <aside className="on-dark bg-navy-gradient relative hidden overflow-hidden p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -left-12 bottom-10 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <p className="eyebrow-gold text-[10px] font-semibold uppercase tracking-[0.32em]">
              Client access
            </p>
            <h2 className="heading-lg mt-6 max-w-md text-white">
              A more secure way to grow wealth.
            </h2>
            <p className="lede mt-5 max-w-md text-base">
              Discreet strategy, institutional access, and trusted portfolio
              guidance for clients who expect more than standard banking.
            </p>
          </div>

          <ul className="relative z-10 mt-8 space-y-3">
            {trustPoints.map((item, index) => (
              <li
                key={item.title}
                className={`rounded-card border border-white/10 bg-white/5 p-4 backdrop-blur-md transition duration-300 hover:border-gold/40 ${
                  index === 0 ? "animate-float-slow" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs text-gold-light"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">{item.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <dl className="relative z-10 mt-8 grid grid-cols-3 gap-3">
            {highlightStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm"
              >
                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-base font-black text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="bg-canvas-ivory p-6 sm:p-8 lg:p-12">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Welcome back</p>
              <h1 className="heading-md mt-3 text-ink">Sign in</h1>
            </div>
            <span className="badge-neutral shrink-0">
              <span aria-hidden="true">🔒</span> Secure
            </span>
          </div>

          {/* Credentials belong in visible copy, not prefilled into the password
              input where they end up in the DOM and in password managers. */}
          <div className="mb-6 rounded-field border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-ink">
            <p className="font-semibold">Prototype demo account</p>
            <p className="mt-1 text-ink-muted">
              Sign in as <span className="font-mono font-semibold">{DEMO_EMAIL}</span> with any
              password of 8+ characters.
            </p>
          </div>

          <LoginForm />

          <div className="my-7 flex items-center gap-3">
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
              or continue with
            </span>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>

          <div className="space-y-3">
            <button type="button" className="ghost-button w-full" disabled>
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.27-4.74 3.27-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                />
              </svg>
              Continue with Google
              <span className="text-xs font-normal opacity-70">(coming soon)</span>
            </button>

            <Link href="/kyc" className="navy-button w-full">
              Start KYC onboarding
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-ink-muted">
            Don&apos;t have an account?{" "}
            <Link href="/kyc" className="link-quiet">
              Create investor profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
