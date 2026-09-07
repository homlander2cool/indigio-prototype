"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";
import { useI18n } from "@/components/I18nProvider";
import VisitTracker from "@/components/VisitTracker";

/** Routes that use the focused auth chrome instead of the marketing shell. */
const AUTH_ROUTES = new Set(["/login", "/kyc"]);

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useI18n();
  const isAuthRoute = AUTH_ROUTES.has(pathname);

  return (
    <>
      <a href="#main" className="skip-link">
        {t("shell.skipToContent")}
      </a>

      {isAuthRoute ? (
        <header className="sticky top-0 z-50 border-b border-line bg-canvas-panel/90 backdrop-blur-xl">
          <div className="container-page flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Logo tone="onLight" />
            <Link href="/" className="link-quiet text-sm">
              {t("shell.returnHome")}
            </Link>
          </div>
        </header>
      ) : (
        <Navbar />
      )}

      {/*
        flex-1 makes main absorb the leftover height so the footer pins to the
        bottom of short pages. The marketing shell needs top padding to clear
        the fixed navbar; the auth header is sticky and already in flow.
      */}
      <main id="main" className={`flex flex-1 flex-col ${isAuthRoute ? "" : "pt-20"}`}>
        {children}
      </main>

      {!isAuthRoute && <Footer />}

      {/* Site-wide concierge — available on every page, including the login
          and KYC flows. Talks to the backend at /api/chat; the model key never
          leaves the server. */}
      <ChatAssistant />
      <VisitTracker />
    </>
  );
}
