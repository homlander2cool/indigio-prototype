import Link from "next/link";

const trustPoints = [
  "Private client security",
  "KYC-ready onboarding",
  "Global portfolio intelligence",
];

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f6f1e7] px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[34px] border border-[#d9d2c3] bg-white shadow-[0_40px_120px_rgba(11,35,64,0.12)] lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative hidden overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.28),transparent_30%),linear-gradient(135deg,#071a2b_0%,#0b2340_35%,#112847_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#f6e7a4] text-base font-black text-[#0b2340] shadow-lg shadow-[#d4af37]/30">
                I
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#f0d786]">Private bank</div>
                <div className="text-sm font-black tracking-[0.22em]">INDIGIO</div>
              </div>
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f0d786]">Client access</p>
            <h1 className="mt-6 max-w-md text-4xl font-black leading-tight tracking-[-0.05em]">
              A more secure way to grow wealth.
            </h1>
            <p className="mt-5 max-w-md text-base text-slate-200">
              Institutional access, personalized advisory support, and discreet portfolio management for clients with global ambitions.
            </p>
          </div>

          <div className="space-y-4">
            {trustPoints.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#f0d786]">
                  ✓
                </div>
                <span className="text-sm text-slate-100">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#f8f5f0] p-6 sm:p-8 lg:p-12">
          <div className="mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#0b2340]">Welcome back</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#102033] sm:text-4xl">Sign in</h2>
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
                className="w-full rounded-2xl border border-[#d9d2c3] bg-white px-4 py-3.5 text-[#102033] outline-none transition focus:border-[#0b2340] focus:bg-white focus:ring-4 focus:ring-[#0b2340]/10"
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
                  className="w-full rounded-2xl border border-[#d9d2c3] bg-white px-4 py-3.5 pr-12 text-[#102033] outline-none transition focus:border-[#0b2340] focus:bg-white focus:ring-4 focus:ring-[#0b2340]/10"
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

            <button type="submit" className="gold-button w-full rounded-2xl px-6 py-3.5 text-base">
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
            <Link href="/kyc" className="gold-button w-full justify-center rounded-2xl bg-[#0b2340] px-6 py-3.5 text-white hover:bg-[#102d4f]">
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
