import Link from "next/link";

const steps = [
  "Identity verification",
  "Address proof",
  "Source of funds",
  "Review & approval",
];

export default function KYCPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0055a4]">KYC onboarding</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
          Complete your investor verification
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Secure your account and unlock access to managed opportunities, fund documentation, and private market deals.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel p-6 sm:p-8">
          <div className="mb-8 flex flex-wrap gap-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] ${
                  index === 0
                    ? "bg-[#0055a4] text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {index + 1}. {step}
              </div>
            ))}
          </div>

          <form className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">First name</label>
                <input defaultValue="Ava" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#0055a4] focus:bg-white focus:ring-4 focus:ring-[#0055a4]/10" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Last name</label>
                <input defaultValue="Morgan" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#0055a4] focus:bg-white focus:ring-4 focus:ring-[#0055a4]/10" />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Date of birth</label>
                <input type="date" defaultValue="1990-08-12" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#0055a4] focus:bg-white focus:ring-4 focus:ring-[#0055a4]/10" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Nationality</label>
                <input defaultValue="United States" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#0055a4] focus:bg-white focus:ring-4 focus:ring-[#0055a4]/10" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Residential address</label>
              <input defaultValue="540 Park Avenue, New York, NY" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#0055a4] focus:bg-white focus:ring-4 focus:ring-[#0055a4]/10" />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Document type</label>
                <select defaultValue="passport" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#0055a4] focus:bg-white focus:ring-4 focus:ring-[#0055a4]/10">
                  <option value="passport">Passport</option>
                  <option value="drivers-license">Driver's License</option>
                  <option value="national-id">National ID</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Document number</label>
                <input defaultValue="X8429182" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#0055a4] focus:bg-white focus:ring-4 focus:ring-[#0055a4]/10" />
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-700">Upload identity proof</p>
              <p className="mt-2 text-sm text-slate-500">Passport, driver licence, or government issued ID.</p>
              <button type="button" className="mt-4 inline-flex items-center rounded-full border border-[#0055a4] bg-[#0055a4]/5 px-4 py-2 text-sm font-semibold text-[#0055a4] hover:bg-[#0055a4]/10">
                Select file
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="ghost-button flex-1 justify-center rounded-2xl px-6 py-3.5">
                Back to sign in
              </Link>
              <button type="submit" className="gold-button flex-1 justify-center rounded-2xl px-6 py-3.5">
                Continue to review
              </button>
            </div>
          </form>
        </div>

        <aside className="space-y-6">
          <div className="panel p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Account status</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-2xl font-black text-slate-900">Verified</span>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">Ready</span>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span>Identity check</span>
                <span className="font-semibold text-emerald-600">Passed</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span>AML screening</span>
                <span className="font-semibold text-emerald-600">Passed</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Approval window</span>
                <span className="font-semibold text-slate-900">24-48 hrs</span>
              </div>
            </div>
          </div>

          <div className="panel p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Investor checklist</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              {[
                "Government ID uploaded",
                "Residential address confirmed",
                "Source of funds declared",
                "Risk acknowledgment signed",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
