import Image from "next/image";

const proofPoints = [
  { value: "1864", label: "Founded" },
  { value: "42", label: "Markets covered" },
  { value: "A+", label: "Custody rating" },
];

export default function About() {
  return (
    <section id="about" className="section scroll-mt-24 overflow-hidden">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">Our heritage</p>
          <h2 className="heading-lg mt-4 text-ink">
            A Symbol of Strength
            <span className="block text-gold-deep">and Unwavering Trust</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            For generations, the lion has represented courage while the globe has
            symbolised boundless ambition. We pair that heritage with modern
            financial engineering.
          </p>

          <blockquote className="mt-6 rounded-r-panel border-l-4 border-gold bg-white p-6 shadow-panel">
            <p className="text-lg font-semibold italic text-ink">
              “We don&apos;t just manage wealth; we empower legacies that
              transcend borders.”
            </p>
            <footer className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
              Office of the Chief Investment Officer
            </footer>
          </blockquote>

          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            Whether you are an individual seeking sustained growth or an
            institution navigating complex markets, we provide the stability of a
            legacy bank with the agility of a modern digital partner.
          </p>

          <dl className="mt-9 grid grid-cols-3 gap-4">
            {proofPoints.map((point) => (
              <div key={point.label} className="tile">
                <dt className="metric-label">{point.label}</dt>
                <dd className="metric-value mt-2 text-ink">{point.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="relative m-0 h-80 w-full overflow-hidden rounded-panel shadow-lifted lg:h-[520px]">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
            alt="Skyscrapers in a financial district viewed from street level"
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
              Global Network
            </span>
            <span className="mt-1 block text-2xl font-bold text-gold-light">
              RBC Financial
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
