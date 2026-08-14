import en from "./messages/en.json";
import de from "./messages/de.json";

export type Locale = "en" | "de";
export const locales: Locale[] = ["en", "de"];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "indigio.locale";

export type Dictionary = typeof en;

const enDict = en as unknown as Dictionary;
const deDict = de as unknown as Dictionary;

export const dictionaries: Record<Locale, Dictionary> = {
  en: enDict,
  de: deDict,
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "de";
}

export function detectLocale(
  cookieValue: string | null | undefined,
  acceptLanguage: string | null | undefined,
): Locale {
  if (isLocale(cookieValue)) return cookieValue;
  if (acceptLanguage && /de/i.test(acceptLanguage.split(",")[0])) return "de";
  return defaultLocale;
}

type Messages = {
  [key: string]: string | Messages | string[] | Messages[] | undefined;
};

export function lookup(dict: Dictionary, key: string): unknown {
  const parts = key.split(".");
  let node: Messages | undefined = dict as unknown as Messages;
  for (const part of parts) {
    const next = node[part];
    if (next === undefined || next === null) return undefined;
    node = next as Messages;
  }
  return node;
}

export function interpolate(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in params ? String(params[key]) : match,
  );
}

export interface Translator {
  (key: string, params?: Record<string, string | number>): string;
  has: (key: string) => boolean;
  raw: (key: string) => unknown;
  fallback: (key: string, fallback: string) => string;
  locale: Locale;
}

export function createT(locale: Locale): Translator {
  const dict = dictionaries[locale];
  const fallbackDict = locale === "en" ? dict : dictionaries.en;
  const t = (
    (key: string, params?: Record<string, string | number>): string => {
      let value = lookup(dict, key);
      if (typeof value !== "string") value = lookup(fallbackDict, key);
      if (typeof value !== "string") return key;
      return interpolate(value, params);
    }
  ) as Translator;
  t.has = (key: string) => typeof lookup(dict, key) === "string";
  t.raw = (key: string) => lookup(dict, key);
  t.fallback = (key: string, fallback: string) =>
    typeof lookup(dict, key) === "string" ? t(key) : fallback;
  t.locale = locale;
  return t;
}

import type { ValidationMessages } from "./validation";

export function createValidationMessages(t: Translator): ValidationMessages {
  return {
    required: (label) => t("validation.required", { label }),
    minLength: (label, length) =>
      t("validation.minLength", { label, length }),
    emailRequired: t("validation.emailRequired"),
    emailInvalid: t("validation.emailInvalid"),
    dobRequired: t("validation.dobRequired"),
    dobInvalid: t("validation.dobInvalid"),
    dobFuture: t("validation.dobFuture"),
    dobUnderage: t("validation.dobUnderage"),
    dobTooOld: t("validation.dobTooOld"),
    patternName: t("validation.namePattern"),
    patternDoc: t("validation.docPattern"),
  };
}