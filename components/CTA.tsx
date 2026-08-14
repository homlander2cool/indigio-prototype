"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

export default function CTA() {
  const { t } = useI18n();
  return (
    <section
      id="access"
      className="on-dark bg-navy-gradient section relative scroll-mt-24 overflow-hidden text-white"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gold" aria-hidden="true" />

      <div className="container-narrow relative z-10 text-center">
        <p className="eyebrow-gold text-[11px] font-semibold uppercase tracking-[0.28em]">
          {t("cta.eyebrow")}
        </p>

        <h2 className="heading-lg mt-4 text-white">{t("cta.title")}</h2>

        <p className="lede mx-auto mt-6 max-w-2xl">{t("cta.lede")}</p>

        {/* These were dead <button> elements before — now real navigation. */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/kyc" className="gold-button shine px-10 py-4 text-base">
            {t("cta.getStarted")}
          </Link>
          <Link href="/deals" className="ghost-button px-10 py-4 text-base">
            {t("cta.browseFirst")}
          </Link>
        </div>

        <p className="mt-6 text-xs text-slate-400">{t("cta.prototypeNote")}</p>
      </div>
    </section>
  );
}
