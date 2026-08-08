import Link from "next/link";

const stats = [
  { value: "190+", label: "countries" },
  { value: "$8.2B", label: "assets monitored" },
  { value: "24/7", label: "investor support" },
];

const content = {
  title: "Global wealth, designed for the next generation.",
  subtitle: "Access private-market opportunities, secure portfolio infrastructure, and a smarter way to grow capital across borders.",
  ctaPrimary: "Start Your Journey",
  ctaSecondary: "View KYC Plan",
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),transparent_35%),linear-gradient(135deg,#071a2b_0%,#0b2340_35%,#0b213f_100%)] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:52px_52px] opacity-30" />
      <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-[#d4af37]/20 blur-3xl" />
      <div className="absolute right-10 top-8 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[86vh] max-w-7xl items-center px-6 py-20 md:px-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="animate-fade-in">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-[#d4af37]">
              Private banking & wealth access
            </p>
            <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-[-0.04em] md:text-7xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-200 md:text-2xl">
              {content.subtitle}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="rounded-full bg-[#d4af37] px-8 py-4 text-center text-base font-bold text-slate-900 shadow-[0_20px_45px_rgba(212,175,55,0.35)] transition hover:-translate-y-1 hover:bg-[#e7c861]"
              >
                {content.ctaPrimary}
              </Link>
              <Link
                href="/kyc"
                className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-center text-base font-semibold text-white transition hover:bg-white/10"
              >
                {content.ctaSecondary}
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 text-left">
              {stats.map((item) => (
                <div key={item.label} className="min-w-[120px]">
                  <div className="text-2xl font-black text-white md:text-3xl">{item.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-300">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-4 shadow-[0_30px_80px_rgba(8,15,30,0.45)] backdrop-blur-xl">
              <div className="rounded-[28px] bg-slate-950/70 p-5">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Portfolio overview</p>
                    <h2 className="mt-2 text-2xl font-bold text-white">$2.84M</h2>
                  </div>
                  <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    +12.4% YTD
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>Property Fund</span>
                      <span>48%</span>
                    </div>
                    <div className="mt-3 h-2.5 rounded-full bg-slate-800">
                      <div className="h-2.5 w-[48%] rounded-full bg-gradient-to-r from-[#d4af37] to-[#f2d77a]" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>Private Credit</span>
                      <span>31%</span>
                    </div>
                    <div className="mt-3 h-2.5 rounded-full bg-slate-800">
                      <div className="h-2.5 w-[31%] rounded-full bg-gradient-to-r from-cyan-400 to-sky-500" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>Global Equity</span>
                      <span>21%</span>
                    </div>
                    <div className="mt-3 h-2.5 rounded-full bg-slate-800">
                      <div className="h-2.5 w-[21%] rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#f0d786]">KYC status</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">Verified</span>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-300">
                      Ready to invest
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
