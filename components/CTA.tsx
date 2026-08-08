export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),transparent_35%),linear-gradient(135deg,#071a2b_0%,#0b2340_35%,#0b213f_100%)] px-6 py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px] opacity-40" />
      <div className="absolute top-0 left-0 h-1 w-full bg-[#d4af37]" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#f0d786]">Investor access</p>
        <h2 className="mb-6 text-4xl font-black tracking-[-0.04em] text-[#f8fafc] md:text-5xl">
          Ready to build your financial future?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-200 md:text-xl">
          Join thousands of investors and global leaders who trust RBC to secure and grow their assets across borders.
        </p>
        <button className="rounded-full bg-[#d4af37] px-12 py-4 text-lg font-bold text-slate-900 shadow-[0_18px_40px_rgba(212,175,55,0.35)] transition duration-300 hover:-translate-y-1 hover:bg-[#e7c861] hover:shadow-[0_22px_50px_rgba(212,175,55,0.45)]">
          Get Started Today
        </button>
      </div>
    </section>
  );
}
