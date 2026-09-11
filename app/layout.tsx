import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { I18nProvider } from "@/components/I18nProvider";
import { getServerLocale } from "@/lib/i18n-server";
import { site } from "@/lib/site";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  // Exposed as a CSS variable so tailwind.config.ts can own the font stack.
  variable: "--font-inter",
});

export const metadata: Metadata = {
  // Required for OpenGraph/canonical URLs to resolve absolutely.
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "tokenized real estate",
    "private markets",
    "investor dashboard",
    "KYC onboarding",
    "wealth management",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b2340",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = getServerLocale();
  return (
    <html lang={locale} className={inter.variable}>
      {/* min-h-dvh + flex column lets the footer sit at the bottom on short
          pages without any child needing min-h-screen. */}
      <body className="flex min-h-dvh flex-col font-sans">
        <StructuredData />
        <I18nProvider initialLocale={locale}>
          <AppShell>{children}</AppShell>
        </I18nProvider>
      </body>
    </html>
  );
}