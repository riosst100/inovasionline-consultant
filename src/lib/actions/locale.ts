"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { LOCALE_COOKIE } from "@/lib/i18n/get-locale";
import type { Locale } from "@/lib/i18n/dictionaries";

export async function setLocale(locale: Locale, pathname: string) {
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
  revalidatePath(pathname);
}
