import Link from "next/link";

export default function CTA() {
  return (
    <section
      id="access"
      className="on-dark bg-navy-gradient section relative scroll-mt-24 overflow-hidden text-white"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gold" aria-hidden="true" />

      <div className="container-narrow relative z-10 text-center">
        <p className="eyebrow-gold text-[11px] font-semibold uppercase tracking-[0.28em]">
          Investor access
        </p>

        <h2 className="heading-lg mt-4 text-white">
          Ready to build your financial future?
        </h2>

        <p className="lede mx-auto mt-6 max-w-2xl">
          Join investors and global leaders who trust us to secure and grow their
          assets across borders.
        </p>

        {/* These were dead <button> elements before — now real navigation. */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/kyc" className="gold-button shine px-10 py-4 text-base">
            Get Started Today
          </Link>
          <Link href="/deals" className="ghost-button px-10 py-4 text-base">
            Browse deals first
          </Link>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Prototype environment. No funds are transferred and no securities are offered.
        </p>
      </div>
    </section>
  );
}
