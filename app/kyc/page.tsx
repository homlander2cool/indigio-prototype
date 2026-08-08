import Link from "next/link";

const steps = [
  "Identity verification",
  "Address proof",
  "Source of funds",
  "Review & approval",
];

const checklist = [
  "Government ID uploaded",
  "Residential address confirmed",
  "Source of funds declared",
  "Risk acknowledgment signed",
];

export default function KYCPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-8 text-center sm:mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0b2340]">KYC onboarding</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#102033] md:text-5xl">
          Complete your investor verification
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
          Secure your account and unlock access to managed opportunities, fund documentation, and private market deals.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
        <div className="rounded-[30px] border border-[#d9d2c3] bg-[#f8f5f0] p-5 shadow-[0_30px_80px_rgba(11,35,64,0.08)] sm:p-8">
          <div className="mb-8 flex flex-wrap gap-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                  index === 0
                    ? "bg-[#0b2340] text-white shadow-[0_12px_28px_rgba(11,35,64,0.18)]"
                    : "bg-white text-slate-600 ring-1 ring-[#d9d2c3]"
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
                <input
                  defaultValue="Ava"
                  className="w-full rounded-2xl border border-[#d9d2c3] bg-white px-4 py-3 text-[#102033] outline-none transition focus:border-[#0b2340] focus:ring-4 focus:ring-[#0b2340]/10"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Last name</label>
                <input
                  defaultValue="Morgan"
                  className="w-full rounded-2xl border border-[#d9d2c3] bg-white px-4 py-3 text-[#102033] outline-none transition focus:border-[#0b2340] focus:ring-4 focus:ring-[#0b2340]/10"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Date of birth</label>
                <input
                  type="date"
                  defaultValue="1990-08-12"
                  className="w-full rounded-2xl border border-[#d9d2c3] bg-white px-4 py-3 text-[#102033] outline-none transition focus:border-[#0b2340] focus:ring-4 focus:ring-[#0b2340]/10"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Nationality</label>
                <input
                  defaultValue="United States"
                  className="w-full rounded-2xl border border-[#d9d2c3] bg-white px-4 py-3 text-[#102033] outline-none transition focus:border-[#0b2340] focus:ring-4 focus:ring-[#0b2340]/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Residential address</label>
              <input
                defaultValue="540 Park Avenue, New York, NY"
                className="w-full rounded-2xl border border-[#d9d2c3] bg-white px-4 py-3 text-[#102033] outline-none transition focus:border-[#0b2340] focus:ring-4 focus:ring-[#0b2340]/10"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Document type</label>
                <select
                  defaultValue="passport"
                  className="w-full rounded-2xl border border-[#d9d2c3] bg-white px-4 py-3 text-[#102033] outline-none transition focus:border-[#0b2340] focus:ring-4 focus:ring-[#0b2340]/10"
                >
                  <option value="passport">Passport</option>
                  <option value="drivers-license">Driver's License</option>
                  <option value="national-id">National ID</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Document number</label>
                <input
                  defaultValue="X8429182"
                  className="w-full rounded-2xl border border-[#d9d2c3] bg-white px-4 py-3 text-[#102033] outline-none transition focus:border-[#0b2340] focus:ring-4 focus:ring-[#0b2340]/10"
                />
              </div>
            </div>

            <div className="rounded-[24px] border border-dashed border-[#d9d2c3] bg-white p-5">
              <p className="text-sm font-medium text-slate-700">Upload identity proof</p>
              <p className="mt-2 text-sm text-slate-500">Passport, driver licence, or government-issued ID.</p>
              <button
                type="button"
                className="mt-4 inline-flex items-center rounded-full border border-[#0b2340] bg-[#0b2340]/5 px-4 py-2 text-sm font-semibold text-[#0b2340] transition hover:bg-[#0b2340]/10"
              >
                Select file
              </button>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
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
          <div className="rounded-[28px] border border-[#d9d2c3] bg-white p-6 shadow-[0_20px_60px_rgba(11,35,64,0.06)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">Account status</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-2xl font-black text-[#102033]">Verified</span>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                Ready
              </span>
            </div>

            <div className="mt-6 space-y-3 text-sm text-slate-600">
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
                <span className="font-semibold text-[#102033]">24–48 hrs</span>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#d9d2c3] bg-[#0b2340] p-6 text-white shadow-[0_20px_60px_rgba(11,35,64,0.12)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#f2d686]">Investor checklist</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-100">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-300">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
