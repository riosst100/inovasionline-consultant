import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n/dictionaries";

export default function AuthHeader({ locale, dark = true }: { locale: Locale; dark?: boolean }) {
  return (
    <div className="relative flex items-center justify-between mb-8">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center font-extrabold text-white text-lg">
          I
        </div>
        <span className={`font-extrabold text-lg ${dark ? "text-white" : "text-slate-900"}`}>
          Inovasi<span className="text-blue-400">Online</span>
        </span>
      </Link>
      <LanguageSwitcher locale={locale} />
    </div>
  );
}
