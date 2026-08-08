import Link from "next/link";

const trustPoints = [
  "Institutional-grade security",
  "KYC approved onboarding",
  "Private-market dashboard access",
];

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.12)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.25),transparent_35%),linear-gradient(135deg,#081a2d_0%,#0d2341_35%,#0b1b30_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4af37] to-[#f2d77a] text-sm font-black text-slate-900 shadow-lg shadow-[#d4af37]/30">
                I
              </div>
              <span className="text-sm font-black tracking-[0.25em]">INDIGIO</span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f0d786]">Investor portal</p>
            <h1 className="mt-6 max-w-md text-4xl font-black leading-tight tracking-[-0.04em]">
              Secure access to global wealth.
            </h1>
            <p className="mt-5 max-w-md text-base text-slate-200">
              A modern platform for private-market investing, portfolio oversight, and international capital growth.
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

        <div className="bg-white p-6 sm:p-8 lg:p-12">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0055a4]">Welcome back</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-900 sm:text-4xl">Sign in</h2>
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
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#0055a4] focus:bg-white focus:ring-4 focus:ring-[#0055a4]/10"
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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-slate-900 outline-none transition focus:border-[#0055a4] focus:bg-white focus:ring-4 focus:ring-[#0055a4]/10"
                />
                <button type="button" className="absolute inset-y-0 right-3 flex items-center text-sm font-medium text-slate-500">
                  Show
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#0055a4] focus:ring-[#0055a4]" />
                Remember me
              </label>
              <Link href="/kyc" className="font-semibold text-[#0055a4] transition hover:text-[#0a3e77]">
                Need KYC review?
              </Link>
            </div>

            <button type="submit" className="gold-button w-full rounded-2xl px-6 py-3.5 text-base">
              Sign in securely
            </button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">or continue with</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="space-y-3">
            <button className="ghost-button w-full justify-center rounded-2xl border-slate-200 py-3.5 font-medium">
              Continue with Google
            </button>
            <Link href="/kyc" className="gold-button w-full justify-center rounded-2xl bg-slate-900 px-6 py-3.5 text-white hover:bg-slate-800">
              Start KYC onboarding
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-slate-600">
            Don’t have an account?{' '}
            <Link href="/kyc" className="font-semibold text-[#0055a4] transition hover:text-[#0a3e77]">
              Create investor profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
