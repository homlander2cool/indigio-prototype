import { cookies, headers } from "next/headers";
import {
  LOCALE_COOKIE,
  detectLocale,
  type Locale,
} from "./i18n";

export function getServerLocale(): Locale {
  const cookieStore = cookies();
  const headerStore = headers();
  const cookieValue = cookieStore.get(LOCALE_COOKIE)?.value ?? null;
  const acceptLanguage = headerStore.get("accept-language")?.split(";")[0] ?? null;
  return detectLocale(cookieValue, acceptLanguage);
}