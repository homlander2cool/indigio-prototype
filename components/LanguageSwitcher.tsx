"use client";

import { useI18n } from "./I18nProvider";
import type { Locale } from "@/lib/i18n";

const options: { locale: Locale; label: string; flag: string; native: string }[] = [
  { locale: "en", label: "EN", flag: "🇬🇧", native: "English" },
  { locale: "de", label: "DE", flag: "🇩🇪", native: "Deutsch" },
];

export default function LanguageSwitcher({
  tone = "onLight",
  className = "",
}: {
  tone?: "onLight" | "onDark";
  className?: string;
}) {
  const { locale, setLocale, t } = useI18n();

  const container =
    tone === "onDark"
      ? "border-white/20 bg-white/5"
      : "border-stone-300/70 bg-stone-100/70";
  const buttonBase =
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500";
  const active =
    tone === "onDark"
      ? "bg-white text-emerald-950 shadow-sm"
      : "bg-emerald-900 text-white shadow-sm";
  const idle =
    tone === "onDark"
      ? "text-stone-300 hover:text-white"
      : "text-stone-600 hover:text-stone-900";

  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className={`inline-flex items-center rounded-full border p-0.5 ${container} ${className}`}
    >
      {options.map((option) => (
        <button
          key={option.locale}
          type="button"
          aria-pressed={locale === option.locale}
          title={option.native}
          aria-label={option.native}
          onClick={() => setLocale(option.locale)}
          className={`${buttonBase} ${locale === option.locale ? active : idle}`}
        >
          <span aria-hidden="true">{option.flag}</span>
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}