"use client";

import Image from "next/image";
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
              <Image
                src="/logo.svg"
                alt="RBC Private Bank logo"
                width={220}
                height={150}
                priority
                className="h-10 w-auto object-contain"
              />
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
