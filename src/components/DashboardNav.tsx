import Link from "next/link";
import { logout } from "@/lib/actions/auth";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Logo from "@/components/Logo";

export default async function DashboardNav({
  name,
  role,
}: {
  name: string;
  role: "USER" | "ADMIN";
}) {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const homeHref = role === "ADMIN" ? "/admin" : "/dashboard";

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href={homeHref} className="flex items-center gap-2">
          <Logo className="w-9 h-9" />
          <span className="font-extrabold text-lg tracking-tight text-slate-900">
            Inovasi<span className="text-blue-600">Online</span>
            {role === "ADMIN" && (
              <span className="ml-2 text-xs font-bold text-slate-400 align-middle">ADMIN</span>
            )}
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600 hidden sm:inline">{t.dashboard.greeting} {name}</span>
          <LanguageSwitcher locale={locale} />
          <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 transition">
            {t.dashboard.viewWebsite}
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm font-semibold text-red-600 hover:text-red-700 transition"
            >
              {t.dashboard.logout}
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
