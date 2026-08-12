import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Explore opportunities",
    detail:
      "Browse diligenced deals across residential, hospitality, industrial, and credit strategies — each with target returns and live raise progress.",
    href: "/deals",
    cta: "Browse deals",
  },
  {
    step: "02",
    title: "Verify your profile",
    detail:
      "Complete KYC onboarding in a few minutes: identity, address proof, and source of funds. Most reviews clear within 24–48 hours.",
    href: "/kyc",
    cta: "Start onboarding",
  },
  {
    step: "03",
    title: "Invest & track",
    detail:
      "Request an investor pack, commit to tokenized units, and follow your portfolio — allocations, yields, and capital events in one place.",
    href: "/dashboard",
    cta: "See the dashboard",
  },
];

/**
 * The three-step journey that connects the site's pages into one flow.
 * Section anchors scroll targets are set so footer links to them land cleanly.
 */
export default function HowItWorks() {
  return (
    <section id="journey" className="section scroll-mt-24">
      <div className="container-page">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="heading-lg mt-4 text-ink">Three steps to your first investment</h2>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gold" aria-hidden="true" />
          <p className="lede mt-6">
            A private-market journey designed to be as clear as it is secure.
          </p>
        </div>

        <ol className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {steps.map((item, index) => (
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
                {item.title}
              </h3>
              <p className="flex-1 text-base leading-relaxed text-ink-muted">{item.detail}</p>

              <Link
                href={item.href}
                aria-label={`${item.cta} — ${item.title}`}
                className="link-quiet mt-6 inline-flex items-center gap-2 text-sm"
              >
                {item.cta}
                <span aria-hidden="true" className="text-gold transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}