import type { Metadata } from "next";
import KycWizard from "@/components/KycWizard";
import { createT } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Investor verification",
  description:
    "Complete KYC onboarding — identity, address proof, source of funds, and review — to unlock access to private market opportunities.",
  alternates: { canonical: "/kyc" },
};

export default function KYCPage() {
  const t = createT(getServerLocale());

  return (
    <div className="container-page section">
      <div className="mb-10 text-center">
        <p className="eyebrow">{t("kycPage.eyebrow")}</p>
        <h1 className="heading-lg mt-4 text-ink">{t("kycPage.title")}</h1>
        <p className="lede mx-auto mt-4 max-w-2xl">{t("kycPage.lede")}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
        <KycWizard />

        <aside className="space-y-6">
          <div className="panel p-6">
            <p className="metric-label">{t("kycPage.accountStatus")}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-2xl font-black text-ink">{t("kycPage.unverified")}</span>
              <span className="badge-gold">{t("kycPage.inProgress")}</span>
            </div>

            <div className="mt-6 space-y-3 text-sm text-ink-muted">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span>{t("kycPage.identityCheck")}</span>
                <span className="font-semibold text-ink">{t("kycPage.pending")}</span>
              </div>
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span>{t("kycPage.amlScreening")}</span>
                <span className="font-semibold text-ink">{t("kycPage.pending")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t("kycPage.approvalWindow")}</span>
                <span className="font-semibold text-ink">{t("kycPage.approvalValue")}</span>
              </div>
            </div>
          </div>

          <div className="on-dark rounded-panel bg-navy p-6 text-white shadow-lifted">
            <p className="eyebrow-gold text-[10px] font-semibold uppercase tracking-[0.26em]">
              {t("kycPage.checklistTitle")}
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-100">
              {(["checklist1", "checklist2", "checklist3", "checklist4"] as const).map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-300">
                    ✓
                  </span>
                  <span>{t(`kycPage.${key}`)}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 rounded-2xl bg-white/5 p-4 text-xs leading-relaxed text-slate-300">
              {t("kycPage.privacyNote")}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}