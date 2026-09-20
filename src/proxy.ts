import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";
import { LOCALE_COOKIE } from "@/lib/i18n/get-locale";
import { COUNTRY_COOKIE } from "@/lib/get-country";
import type { Locale } from "@/lib/i18n/dictionaries";

const { auth } = NextAuth(authConfig);

const ID_COUNTRY_CODE = "ID";
const GEO_LOOKUP_TIMEOUT_MS = 1500;

async function detectFromIp(ip: string | null): Promise<{ locale: Locale; countryCode: string }> {
  if (!ip || ip === "127.0.0.1" || ip === "::1") {
    return { locale: "id", countryCode: ID_COUNTRY_CODE };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), GEO_LOOKUP_TIMEOUT_MS);

    const res = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) return { locale: "id", countryCode: ID_COUNTRY_CODE };

    const data = (await res.json()) as { countryCode?: string };
    const countryCode = data.countryCode || ID_COUNTRY_CODE;
    const locale: Locale = countryCode === ID_COUNTRY_CODE ? "id" : "en";
    return { locale, countryCode };
  } catch {
    return { locale: "id", countryCode: ID_COUNTRY_CODE };
  }
}

function getClientIp(req: Parameters<Parameters<typeof auth>[0]>[0]): string | null {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();
  return req.headers.get("x-real-ip");
}

export default auth(async (req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user;

  const isAdminRoute = pathname.startsWith("/admin");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (isAdminRoute) {
    if (!user) return NextResponse.redirect(new URL("/login/admin", req.url));
    if (user.role !== "ADMIN") return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isDashboardRoute) {
    if (!user) return NextResponse.redirect(new URL("/login", req.url));
    if (user.role === "ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
  }

  const response = NextResponse.next();

  const hasLocaleCookie = req.cookies.has(LOCALE_COOKIE);
  const hasCountryCookie = req.cookies.has(COUNTRY_COOKIE);
  if (!hasLocaleCookie || !hasCountryCookie) {
    const ip = getClientIp(req);
    const { locale, countryCode } = await detectFromIp(ip);

    if (!hasLocaleCookie) {
      response.cookies.set(LOCALE_COOKIE, locale, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
        sameSite: "lax",
      });
    }
    if (!hasCountryCookie) {
      response.cookies.set(COUNTRY_COOKIE, countryCode, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
        sameSite: "lax",
      });
    }
  }

  return response;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
