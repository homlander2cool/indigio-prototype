import type { Metadata } from "next";
import KycWizard from "@/components/KycWizard";

export const metadata: Metadata = {
  title: "Investor verification",
  description:
    "Complete KYC onboarding — identity, address proof, source of funds, and review — to unlock access to private market opportunities.",
  alternates: { canonical: "/kyc" },
};

const checklist = [
  "Government ID uploaded",
  "Residential address confirmed",
  "Source of funds declared",
  "Risk acknowledgment signed",
];

export default function KYCPage() {
  return (
    <div className="container-page section">
      <div className="mb-10 text-center">
        <p className="eyebrow">KYC onboarding</p>
        <h1 className="heading-lg mt-4 text-ink">Complete your investor verification</h1>
        <p className="lede mx-auto mt-4 max-w-2xl">
          Secure your account and unlock access to managed opportunities, fund
          documentation, and private market deals.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
        <KycWizard />

        <aside className="space-y-6">
          <div className="panel p-6">
            <p className="metric-label">Account status</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-2xl font-black text-ink">Unverified</span>
              <span className="badge-gold">In progress</span>
            </div>

            <div className="mt-6 space-y-3 text-sm text-ink-muted">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span>Identity check</span>
                <span className="font-semibold text-ink">Pending</span>
              </div>
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span>AML screening</span>
                <span className="font-semibold text-ink">Pending</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Approval window</span>
                <span className="font-semibold text-ink">24–48 hrs</span>
              </div>
            </div>
          </div>

          <div className="on-dark rounded-panel bg-navy p-6 text-white shadow-lifted">
            <p className="eyebrow-gold text-[10px] font-semibold uppercase tracking-[0.26em]">
              Investor checklist
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-100">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-300">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 rounded-2xl bg-white/5 p-4 text-xs leading-relaxed text-slate-300">
              Your details are stored only in the demo database and are
              never shared with real verification agencies.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}