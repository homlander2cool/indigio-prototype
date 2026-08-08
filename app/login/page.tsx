import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center justify-center px-6 py-16">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_32px_90px_rgba(15,23,42,0.12)] lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.25),transparent_35%),linear-gradient(135deg,#071a2b_0%,#0b2340_40%,#0a1d35_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4af37] to-[#f2d77a] text-sm font-black text-slate-900">
                I
              </div>
              <span className="text-sm font-bold tracking-[0.22em]">INDIGIO</span>
            </div>

            <p className="text-sm uppercase tracking-[0.26em] text-[#d4af37]">Secure investor access</p>
            <h1 className="mt-6 max-w-md text-4xl font-black leading-tight">
              Welcome back to global wealth.
            </h1>
          </div>

          <div className="space-y-4">
            {[
              "Institutional-grade account security",
              "Fast onboarding with KYC review",
              "Private-market access and portfolio insights",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#f0d786]">✓</div>
                <span className="text-sm text-slate-100">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 sm:p-10 lg:p-12">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0055a4]">Sign in</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">Access your account</h2>
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
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#0055a4] focus:bg-white focus:ring-4 focus:ring-[#0055a4]/10"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                defaultValue="password123"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#0055a4] focus:bg-white focus:ring-4 focus:ring-[#0055a4]/10"
              />
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#0055a4] focus:ring-[#0055a4]" />
                Remember me
              </label>
              <Link href="/kyc" className="font-semibold text-[#0055a4] hover:text-[#0a3e77]">
                Need KYC review?
              </Link>
            </div>

            <button
              type="submit"
              className="gold-button w-full rounded-2xl px-6 py-3.5 text-base"
            >
              Sign in securely
            </button>
          </form>

          <div className="my-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Or continue</span>
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
            <Link href="/kyc" className="font-semibold text-[#0055a4] hover:text-[#0a3e77]">
              Create investor profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
