import Link from "next/link";
import { auth } from "@/lib/auth";
import MobileMenu from "@/components/MobileMenu";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NavbarShell from "@/components/NavbarShell";
import Logo from "@/components/Logo";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function Navbar() {
  const [session, locale] = await Promise.all([auth(), getLocale()]);
  const t = getDictionary(locale);

  const dashboardHref = session?.user
    ? session.user.role === "ADMIN"
      ? "/admin"
      : "/dashboard"
    : null;

  const navLinkClass =
    "transition-colors duration-300 text-white/80 hover:text-white group-data-[scrolled=true]:text-slate-600 group-data-[scrolled=true]:hover:text-blue-600";

  return (
    <NavbarShell>
      <Link href="/" className="flex items-center gap-2.5 shrink-0">
        <Logo className="w-9 h-9 shrink-0" />
        <span className="font-extrabold text-lg tracking-tight text-white group-data-[scrolled=true]:text-slate-900 transition-colors duration-300">
          Inovasi<span className="text-cyan-300 group-data-[scrolled=true]:text-blue-600 transition-colors duration-300">Online</span>
        </span>
      </Link>

      <div className="hidden lg:flex items-center gap-7 text-sm font-medium">
        <Link href="/#about" className={navLinkClass}>{t.nav.about}</Link>
        <Link href="/#services" className={navLinkClass}>{t.nav.services}</Link>
        <Link href="/#portfolio" className={navLinkClass}>{t.nav.portfolio}</Link>
        <Link href="/#team" className={navLinkClass}>{t.nav.team}</Link>
        <Link href="/#contact" className={navLinkClass}>{t.nav.contact}</Link>
      </div>

      <div className="hidden lg:flex items-center gap-3 shrink-0">
        <LanguageSwitcher locale={locale} />
        {dashboardHref ? (
          <Link
            href={dashboardHref}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition shadow-lg shadow-blue-600/20"
          >
            {t.nav.dashboard}
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="text-sm font-semibold text-white/80 hover:text-white group-data-[scrolled=true]:text-slate-700 group-data-[scrolled=true]:hover:text-blue-600 transition-colors duration-300 px-2"
            >
              {t.nav.login}
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition shadow-lg shadow-blue-600/20"
            >
              {t.nav.register}
            </Link>
          </>
        )}
      </div>

      <MobileMenu dashboardHref={dashboardHref} locale={locale} t={t} />
    </NavbarShell>
  );
}
