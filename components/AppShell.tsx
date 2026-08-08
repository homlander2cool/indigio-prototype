"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const authLayout = pathname === "/login" || pathname === "/kyc";

  return (
    <>
      {!authLayout && <Navbar />}
      <main className={`flex min-h-screen flex-col ${authLayout ? "pt-0" : "pt-20"}`}>
        {children}
      </main>
      {!authLayout && <Footer />}
    </>
  );
}
