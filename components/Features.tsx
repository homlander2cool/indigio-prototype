const features = [
  {
    title: "Global Reach",
    desc: "Unparalleled international presence with networks across 190 countries, keeping you connected to opportunities wherever they surface.",
    // Paths are stored as data, not JSX, so this array stays serialisable.
    path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
  },
  {
    title: "Secure Legacy",
    desc: "Built on a heritage of trust. Institutional-grade custody and encryption keep your assets protected and your records auditable.",
    path: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5L12 1zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z",
  },
  {
    title: "Digital Innovation",
    desc: "Tokenized ownership, real-time reporting, and same-day settlement — the clarity of modern software with private-bank discipline.",
    path: "M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z",
  },
];

export default function Features() {
  return (
    <section id="pillars" className="section scroll-mt-24 border-y border-line bg-canvas-ivory">
      <div className="container-page">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow">Why clients choose us</p>
          <h2 className="heading-lg mt-4 text-ink">Our Core Pillars</h2>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gold" aria-hidden="true" />
          <p className="lede mt-6">
            Driving the future of global finance through stability, security, and technology.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {features.map((item, index) => (
            <li
              key={item.title}
              style={{ animationDelay: `${index * 90}ms` }}
              className="animate-fade-in group flex flex-col items-start rounded-panel border border-line bg-white p-7 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lifted lg:p-8"
            >
              <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-gold-light">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={item.path} />
                </svg>
              </span>
              <h3 className="mb-3 text-2xl font-bold tracking-[-0.03em] text-ink">{item.title}</h3>
              <p className="text-base leading-relaxed text-ink-muted">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
