import Link from "next/link";
import { notFound } from "next/navigation";
import { deals, getDealBySlug } from "@/lib/mock-data";

export function generateStaticParams() {
  return deals.map((deal) => ({ slug: deal.slug }));
}

export default function DealDetailPage({ params }: { params: { slug: string } }) {
  const deal = getDealBySlug(params.slug);

  if (!deal) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link href="/deals" className="mb-6 inline-flex items-center text-sm font-semibold text-[#0b2340]">
        ← Back to deals
      </Link>

      <div className="overflow-hidden rounded-[30px] border border-[#d9d2c3] bg-[#f8f5f0] shadow-[0_30px_80px_rgba(11,35,64,0.08)]">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-4 sm:p-6 lg:p-8">
            <img src={deal.image} alt={deal.title} className="h-[320px] w-full rounded-[24px] object-cover" />

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.14em] text-slate-500">
              <span className="rounded-full border border-[#d9d2c3] bg-white px-3 py-2">{deal.assetType}</span>
              <span className="rounded-full border border-[#d9d2c3] bg-white px-3 py-2">{deal.location}</span>
              <span className="rounded-full border border-[#d9d2c3] bg-white px-3 py-2">{deal.term}</span>
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-[-0.05em] text-[#102033] md:text-5xl">{deal.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600">{deal.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {deal.metrics.map((metric) => (
                <div key={metric.label} className="rounded-[22px] border border-[#d9d2c3] bg-white p-4">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{metric.label}</div>
                  <div className="mt-3 text-xl font-black text-[#102033]">{metric.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-black tracking-[-0.04em] text-[#102033]">Why this opportunity stands out</h2>
              <ul className="mt-5 space-y-3 text-base text-slate-600">
                {deal.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-700">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="border-t border-[#d9d2c3] bg-white p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">Investment overview</p>

            <div className="mt-6 space-y-4">
              <div className="rounded-[24px] bg-[#f7f3ec] p-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Target return</div>
                <div className="mt-2 text-3xl font-black text-[#102033]">{deal.targetIrr}</div>
              </div>

              <div className="rounded-[24px] bg-[#f7f3ec] p-4">
                <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-slate-500">
                  <span>Capital raised</span>
                  <span>{deal.progress}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#efe7db]">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#cda341] to-[#d9ba6d]" style={{ width: `${deal.progress}%` }} />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm font-semibold text-slate-600">
                  <span>{deal.raised}</span>
                  <span>{deal.target}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link href="/kyc" className="gold-button w-full">
                Request investor pack
              </Link>
              <Link href="/login" className="ghost-button w-full">
                Open account
              </Link>
            </div>

            <div className="mt-8 rounded-[24px] border border-[#d9d2c3] bg-[#0b2340] p-5 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f2d686]">Investor note</p>
              <p className="mt-3 text-sm leading-6 text-slate-200">
                This opportunity is available to verified investors following the onboarding and KYC review process.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
