import { cookies } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/dictionaries";

export const LOCALE_COOKIE = "locale";
export { defaultLocale };

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  if (value && (locales as readonly string[]).includes(value)) {
    return value as Locale;
  }
  return defaultLocale;
}
