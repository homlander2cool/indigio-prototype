import Link from "next/link";
import { deals } from "@/lib/mock-data";

export default function DealsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0b2340]">Private markets</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#102033] md:text-5xl">
            Discover opportunities
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            "All",
            "Residential",
            "Hospitality",
            "Industrial",
            "Debt"
          ].map((filter) => (
            <button
              key={filter}
              type="button"
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                filter === "All"
                  ? "border-[#0b2340] bg-[#0b2340] text-white"
                  : "border-[#d9d2c3] bg-white text-slate-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {deals.map((deal) => (
          <div key={deal.slug} className="panel overflow-hidden p-4">
            <div className="overflow-hidden rounded-[22px]">
              <img src={deal.image} alt={deal.title} className="h-52 w-full object-cover transition duration-500 hover:scale-105" />
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.14em] text-slate-500">
                <span>{deal.assetType}</span>
                <span>{deal.location}</span>
              </div>

              <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#102033]">{deal.title}</h2>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-[#f7f3ec] p-3">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Target IRR</div>
                  <div className="mt-2 font-bold text-[#102033]">{deal.targetIrr}</div>
                </div>
                <div className="rounded-2xl bg-[#f7f3ec] p-3">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Term</div>
                  <div className="mt-2 font-bold text-[#102033]">{deal.term}</div>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-slate-500">
                  <span>Raised</span>
                  <span>{deal.progress}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#efe7db]">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#cda341] to-[#d9ba6d]" style={{ width: `${deal.progress}%` }} />
                </div>
                <div className="mt-2 flex items-center justify-between text-sm font-medium text-slate-600">
                  <span>{deal.raised}</span>
                  <span>{deal.target}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <Link href={`/deals/${deal.slug}`} className="gold-button flex-1">
                  View deal
                </Link>
                <Link href="/kyc" className="ghost-button flex-1">
                  Request pack
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
