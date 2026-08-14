"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

const steps = [
  {
    step: "01",
    titleKey: "step1Title",
    detailKey: "step1Detail",
    href: "/deals",
    ctaKey: "step1Cta",
  },
  {
    step: "02",
    titleKey: "step2Title",
    detailKey: "step2Detail",
    href: "/kyc",
    ctaKey: "step2Cta",
  },
  {
    step: "03",
    titleKey: "step3Title",
    detailKey: "step3Detail",
    href: "/dashboard",
    ctaKey: "step3Cta",
  },
];

/**
 * The three-step journey that connects the site's pages into one flow.
 * Section anchors scroll targets are set so footer links to them land cleanly.
 */
export default function HowItWorks() {
  const { t } = useI18n();
  return (
    <section id="journey" className="section scroll-mt-24">
      <div className="container-page">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow">{t("howItWorks.eyebrow")}</p>
          <h2 className="heading-lg mt-4 text-ink">{t("howItWorks.title")}</h2>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gold" aria-hidden="true" />
          <p className="lede mt-6">{t("howItWorks.lede")}</p>
        </div>

        <ol className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {steps.map((item, index) => {
            const title = t(`howItWorks.${item.titleKey}`);
            const cta = t(`howItWorks.${item.ctaKey}`);
            return (
              <li
                key={item.step}
                style={{ animationDelay: `${index * 90}ms` }}
                className="animate-fade-in group relative flex flex-col rounded-panel border border-line bg-white p-7 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lifted lg:p-8"
              >
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy font-black tabular-nums text-gold-light transition-colors duration-300 group-hover:bg-gold group-hover:text-navy"
                  >
                    {item.step}
                  </span>
                  {/* Connector line between steps, hidden on the last card. */}
                  {index < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-px flex-1 bg-gradient-to-r from-line to-transparent md:block"
                    />
                  )}
                </div>

                <h3 className="mb-3 mt-6 text-2xl font-bold tracking-[-0.03em] text-ink">
                  {title}
                </h3>
                <p className="flex-1 text-base leading-relaxed text-ink-muted">
                  {t(`howItWorks.${item.detailKey}`)}
                </p>

                <Link
                  href={item.href}
                  aria-label={`${cta} — ${title}`}
                  className="link-quiet mt-6 inline-flex items-center gap-2 text-sm"
                >
                  {cta}
                  <span aria-hidden="true" className="text-gold transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}