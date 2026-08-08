const features = [
  {
    title: "Global Reach",
    desc: "Unparalleled international presence with networks across 190 countries, ensuring you're always connected to wealth opportunities.",
    svg: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  },
  {
    title: "Secure Legacy",
    desc: "Built on a heritage of trust. Our gold-standard encryption keeps your assets safe and your future secure.",
    svg: <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5L12 1zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
  },
  {
    title: "Digital Innovation",
    desc: "Future-forward financial tools that streamline your asset management with unmatched speed, clarity, and intelligence.",
    svg: <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
  }
];

export default function Features() {
  return (
    <section className="border-b border-slate-200 bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-[#0055a4]">Why clients choose us</p>
          <h2 className="mb-4 text-4xl font-black tracking-[-0.04em] text-slate-900 md:text-5xl">Our Core Pillars</h2>
          <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-[#d4af37]" />
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Driving the future of global finance through stability, security, and technology.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((item, i) => (
            <div
              key={i}
              className="group flex flex-col items-start rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0055a4]/20 hover:shadow-[0_26px_60px_rgba(15,23,42,0.08)]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0055a4]/5 text-[#0055a4] transition-colors duration-300 group-hover:bg-[#0055a4] group-hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                  {item.svg}
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-slate-900">{item.title}</h3>
              <p className="text-base leading-relaxed text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
