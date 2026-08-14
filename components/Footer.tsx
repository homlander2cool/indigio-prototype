"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { footerNav, site } from "@/lib/site";
import { useI18n } from "@/components/I18nProvider";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="on-dark mt-auto bg-navy-deep text-white">
      <div className="container-page grid gap-10 px-4 pb-14 pt-16 sm:px-6 md:grid-cols-2 lg:grid-cols-6 lg:px-8">
        <div className="lg:col-span-2">
          <Logo tone="onDark" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-300">
            {t("footer.description")}
          </p>
          <Link href="/kyc" className="gold-button mt-6 !min-h-0 px-5 py-2.5 text-xs">
            {t("footer.openAccount")}
          </Link>
          <LanguageSwitcher tone="onDark" className="mt-6" />
        </div>

        {footerNav.map((group) => (
          <nav key={group.headingKey} aria-labelledby={`footer-${group.headingKey}`}>
            <h2
              id={`footer-${group.headingKey}`}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light"
            >
              {t(`footer.groups.${group.headingKey}`)}
            </h2>
            <ul className="space-y-3 text-sm text-slate-300">
              {group.links.map((link) => (
                <li key={`${group.headingKey}-${link.href}-${link.key}`}>
                  <Link
                    href={link.href}
                    className="inline-block transition hover:translate-x-0.5 hover:text-white"
                  >
                    {t.fallback(`footer.${link.key}`, link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 px-4 py-7 text-xs text-slate-400 sm:px-6 md:flex-row lg:px-8">
          <p>
            {t("footer.copyright", {
              year: new Date().getFullYear(),
              name: site.name,
            })}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/kyc" className="transition hover:text-white">
              {t("footer.privacyPolicy")}
            </Link>
            <Link href="/kyc" className="transition hover:text-white">
              {t("footer.termsOfService")}
            </Link>
            <Link href="/login" className="transition hover:text-white">
              {t("footer.clientLogin")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
