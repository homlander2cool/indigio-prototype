"use client";

import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";

const proofPoints = [
  { value: "1864", labelKey: "founded" },
  { value: "42", labelKey: "marketsCovered" },
  { value: "A+", labelKey: "custodyRating" },
];

export default function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="section scroll-mt-24 overflow-hidden">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">{t("aboutHome.eyebrow")}</p>
          <h2 className="heading-lg mt-4 text-ink">
            {t("aboutHome.titleStart")}
            <span className="block text-gold-deep">{t("aboutHome.titleEnd")}</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            {t("aboutHome.paragraph1")}
          </p>

          <blockquote className="mt-6 rounded-r-panel border-l-4 border-gold bg-white p-6 shadow-panel">
            <p className="text-lg font-semibold italic text-ink">
              {t("aboutHome.quote")}
            </p>
            <footer className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
              {t("aboutHome.quoteSource")}
            </footer>
          </blockquote>

          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            {t("aboutHome.paragraph2")}
          </p>

          <dl className="mt-9 grid grid-cols-3 gap-4">
            {proofPoints.map((point) => (
              <div key={point.labelKey} className="tile">
                <dt className="metric-label">{t(`aboutHome.${point.labelKey}`)}</dt>
                <dd className="metric-value mt-2 text-ink">{point.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="relative m-0 h-80 w-full overflow-hidden rounded-panel shadow-lifted lg:h-[520px]">
          <Image
            src="/projects/mining.jpg"
            alt={t("aboutHome.imageAlt")}
            fill
            // Tells the optimiser the real rendered width at each breakpoint so
            // it doesn't ship a 1600px file to a 400px slot.
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent"
            aria-hidden="true"
          />
          <figcaption className="absolute bottom-6 left-6 text-white">
            <span className="block text-[10px] font-light uppercase tracking-[0.2em] opacity-80">
              {t("aboutHome.globalNetwork")}
            </span>
            <span className="mt-1 block text-2xl font-bold text-gold-light">
              RBC Indigio
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
