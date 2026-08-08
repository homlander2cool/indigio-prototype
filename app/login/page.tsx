import Link from "next/link";

const trustPoints = [
  "Private client security",
  "KYC-ready onboarding",
  "Global portfolio intelligence",
];

const highlightStats = [
  { label: "AUM", value: "$3.8B" },
  { label: "Coverage", value: "42 markets" },
  { label: "Response", value: "< 2 hrs" },
];

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f3efe8] px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[36px] border border-[#d9d2c3] bg-white shadow-[0_40px_140px_rgba(9,23,40,0.14)] lg:grid-cols-[1.12fr_0.88fr]">
        <div className="relative hidden overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.28),transparent_28%),linear-gradient(135deg,#071a2b_0%,#0c2340_35%,#112b4d_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.14),transparent_18%),radial-gradient(circle_at_20%_80%,rgba(212,175,55,0.18),transparent_22%)]" />

          <div className="relative z-10">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d7b768] via-[#d2a94f] to-[#f2d98c] text-base font-black text-[#0b2340] shadow-[0_0_30px_rgba(210,169,79,0.32)]">
                I
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#f2d686]">Private bank</div>
                <div className="text-sm font-black tracking-[0.26em]">INDIGIO</div>
              </div>
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#f2d686]">Client access</p>
            <h1 className="mt-6 max-w-md text-4xl font-black leading-[0.96] tracking-[-0.06em] text-white">
              A more secure way to grow wealth.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-200">
              Discreet strategy, institutional access, and trusted portfolio guidance for clients who expect more than standard banking.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            {trustPoints.map((item, index) => (
              <div
                key={item}
                className={`rounded-[22px] border border-white/10 bg-white/5 p-3.5 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[#f2d686]/40 ${index === 0 ? "float-slow" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#f2d686] shadow-[inset_0_0_18px_rgba(212,175,55,0.18)]">
                    ✓
                  </div>
                  <span className="text-sm text-slate-100">{item}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 mt-5 grid grid-cols-3 gap-3">
            {highlightStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm">
                <div className="text-[10px] uppercase tracking-[0.24em] text-slate-300">{stat.label}</div>
                <div className="mt-2 text-base font-black text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#f8f5f0] p-6 sm:p-8 lg:p-12">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#0b2340]">Welcome back</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#102033] sm:text-[2.3rem]">Sign in</h2>
            </div>
            <div className="rounded-full border border-[#d7cfbf] bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#102033]">
              Secure
            </div>
          </div>

          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                defaultValue="demo@indigio.test"
                className="w-full rounded-2xl border border-[#d9d2c3] bg-white px-4 py-3.5 text-[#102033] outline-none transition duration-200 focus:border-[#0b2340] focus:bg-white focus:ring-4 focus:ring-[#0b2340]/10"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  defaultValue="password123"
                  className="w-full rounded-2xl border border-[#d9d2c3] bg-white px-4 py-3.5 pr-12 text-[#102033] outline-none transition duration-200 focus:border-[#0b2340] focus:bg-white focus:ring-4 focus:ring-[#0b2340]/10"
                />
                <button type="button" className="absolute inset-y-0 right-3 flex items-center text-sm font-medium text-slate-500">
                  Show
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#0b2340] focus:ring-[#0b2340]" />
                Remember me
              </label>
              <Link href="/kyc" className="font-semibold text-[#0b2340] transition hover:text-[#112847]">
                Need KYC review?
              </Link>
            </div>

            <button type="submit" className="gold-button shine w-full rounded-2xl px-6 py-3.5 text-base">
              Sign in securely
            </button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#d9d2c3]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">or continue with</span>
            <div className="h-px flex-1 bg-[#d9d2c3]" />
          </div>

          <div className="space-y-3">
            <button className="ghost-button w-full justify-center rounded-2xl border-[#d9d2c3] py-3.5 font-medium">
              Continue with Google
            </button>
            <Link
              href="/kyc"
              className="gold-button shine w-full justify-center rounded-2xl bg-[#0b2340] px-6 py-3.5 text-white hover:bg-[#102d4f]"
            >
              Start KYC onboarding
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-slate-600">
            Don’t have an account?{' '}
            <Link href="/kyc" className="font-semibold text-[#0b2340] transition hover:text-[#112847]">
              Create investor profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
