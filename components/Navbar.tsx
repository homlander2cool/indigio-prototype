import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#081b2d]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d7b768] via-[#d2a94f] to-[#f2d98c] text-sm font-black text-[#0b2340] shadow-[0_12px_32px_rgba(210,169,79,0.35)]">
            I
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#f2d686]">Private bank</div>
            <div className="text-lg font-black tracking-[0.24em] text-white">INDIGIO</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-200 md:flex">
          <Link href="#" className="transition hover:text-[#f2d686]">Platform</Link>
          <Link href="#" className="transition hover:text-[#f2d686]">Deals</Link>
          <Link href="#" className="transition hover:text-[#f2d686]">Security</Link>
          <Link href="#" className="transition hover:text-[#f2d686]">Advisory</Link>
          <Link
            href="/login"
            className="rounded-full border border-[#d2a94f]/60 bg-gradient-to-r from-[#d7b768] to-[#d2a94f] px-5 py-2.5 font-semibold text-[#0d1f2d] shadow-[0_12px_28px_rgba(210,169,79,0.28)] transition hover:-translate-y-0.5"
          >
            Open Account
          </Link>
        </nav>
      </div>
    </header>
  );
}
