"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const authLayout = pathname === "/login" || pathname === "/kyc";

  return (
    <>
      {!authLayout && <Navbar />}

      {authLayout && (
        <header className="sticky top-0 z-50 border-b border-[#d9d2c3] bg-[#f7f3ec]/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d7b768] via-[#d2a94f] to-[#f2d98c] text-sm font-black text-[#0b2340] shadow-[0_12px_30px_rgba(210,169,79,0.25)]">
                I
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#0b2340]">Private bank</div>
                <div className="text-lg font-black tracking-[0.22em] text-[#0b2340]">INDIGIO</div>
              </div>
            </Link>

            <Link href="/" className="text-sm font-semibold text-[#0b2340] transition hover:text-[#112847]">
              Return home
            </Link>
          </div>
        </header>
      )}

      <main className={`flex min-h-screen flex-col ${authLayout ? "pt-0" : "pt-20"}`}>
        {children}
      </main>

      {!authLayout && <Footer />}
    </>
  );
}
