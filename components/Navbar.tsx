import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#081b2d]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="RBC Private Bank logo"
            width={220}
            height={150}
            priority
            className="h-11 w-auto object-contain"
          />
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
