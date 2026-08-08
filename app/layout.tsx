import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RBC | Global Wealth Reimagined",
  description: "Connecting you to global markets with security and innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f6f1e7] text-[#102033]`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
