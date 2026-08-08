import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-20">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4af37] to-[#f2d77a] text-sm font-black text-slate-900 shadow-lg shadow-[#d4af37]/30">
            I
          </div>
          <div>
            <div className="text-lg font-black tracking-[0.22em] text-white">INDIGIO</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-200 md:flex">
          <Link href="#" className="transition hover:text-[#d4af37]">Platform</Link>
          <Link href="#" className="transition hover:text-[#d4af37]">Deals</Link>
          <Link href="#" className="transition hover:text-[#d4af37]">Security</Link>
          <Link href="/login" className="rounded-full border border-[#d4af37]/40 bg-[#d4af37] px-5 py-2.5 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-[#e7c861]">
            Open Account
          </Link>
        </nav>
      </div>
    </header>
  );
}
