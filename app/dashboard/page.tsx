import Link from "next/link";
import { dashboardHoldings, deals } from "@/lib/mock-data";

export default function DashboardPage() {
  const featuredDeal = deals[0];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0b2340]">Investor dashboard</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#102033] md:text-5xl">
            Portfolio overview
          </h1>
        </div>
        <Link href="/deals" className="gold-button">
          Explore deals
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Portfolio value", value: "$463,800", tone: "bg-[#0b2340] text-white" },
          { label: "Token balance", value: "18,420", tone: "bg-[#f7f3ec] text-[#102033]" },
          { label: "Current yield", value: "11.7%", tone: "bg-[#f7f3ec] text-[#102033]" },
          { label: "Next drawdown", value: "Q4 2026", tone: "bg-[#f7f3ec] text-[#102033]" }
        ].map((item) => (
          <div key={item.label} className={`rounded-[26px] p-5 ${item.tone}`}>
            <div className="text-[10px] uppercase tracking-[0.18em] opacity-75">{item.label}</div>
            <div className="mt-3 text-3xl font-black tracking-[-0.05em]">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="panel p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-[-0.04em] text-[#102033]">Active positions</h2>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
              Updated today
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {dashboardHoldings.map((holding) => (
              <div key={holding.name} className="rounded-[22px] border border-[#e9e0d3] bg-[#f9f5ef] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-lg font-black text-[#102033]">{holding.name}</div>
                    <div className="mt-1 text-sm text-slate-500">Allocation: {holding.allocation}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-[#102033]">{holding.amount}</div>
                    <div className="text-xs uppercase tracking-[0.14em] text-slate-500">{holding.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5 sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">Featured focus</p>
          <div className="mt-4 overflow-hidden rounded-[24px]">
            <img src={featuredDeal.image} alt={featuredDeal.title} className="h-52 w-full object-cover" />
          </div>
          <h3 className="mt-5 text-2xl font-black tracking-[-0.04em] text-[#102033]">{featuredDeal.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{featuredDeal.description}</p>
          <div className="mt-5 flex items-center justify-between rounded-[20px] bg-[#f7f3ec] p-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Projected yield</div>
              <div className="mt-1 text-xl font-black text-[#102033]">{featuredDeal.targetIrr}</div>
            </div>
            <Link href={`/deals/${featuredDeal.slug}`} className="text-sm font-bold text-[#0b2340]">
              View details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
