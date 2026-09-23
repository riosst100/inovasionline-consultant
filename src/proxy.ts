import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";
import { LOCALE_COOKIE, defaultLocale } from "@/lib/i18n/get-locale";
import { COUNTRY_COOKIE } from "@/lib/get-country";

const { auth } = NextAuth(authConfig);

const DEFAULT_COUNTRY_CODE = "ID";

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

  if (!req.cookies.has(LOCALE_COOKIE)) {
    response.cookies.set(LOCALE_COOKIE, defaultLocale, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
  }
  if (!req.cookies.has(COUNTRY_COOKIE)) {
    response.cookies.set(COUNTRY_COOKIE, DEFAULT_COUNTRY_CODE, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
