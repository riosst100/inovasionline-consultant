"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Locale, dictionaries } from "@/lib/i18n/dictionaries";

type Dictionary = (typeof dictionaries)[Locale];

export default function MobileMenu({
  dashboardHref,
  locale,
  t,
}: {
  dashboardHref: string | null;
  locale: Locale;
  t: Dictionary;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Buka menu"
        className="text-white group-data-[scrolled=true]:text-slate-900 transition-colors duration-300"
      >
        {open ? (
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-lg">
          <div className="flex flex-col px-6 py-4 gap-4 text-slate-700 font-medium">
            <Link href="/#about" onClick={() => setOpen(false)}>{t.nav.about}</Link>
            <Link href="/#services" onClick={() => setOpen(false)}>{t.nav.services}</Link>
            <Link href="/#portfolio" onClick={() => setOpen(false)}>{t.nav.portfolio}</Link>
            <Link href="/#team" onClick={() => setOpen(false)}>{t.nav.team}</Link>
            <Link href="/#contact" onClick={() => setOpen(false)}>{t.nav.contact}</Link>

            <LanguageSwitcher locale={locale} />

            {dashboardHref ? (
              <Link
                href={dashboardHref}
                className="bg-blue-600 text-white text-center font-semibold px-5 py-2.5 rounded-full"
              >
                {t.nav.dashboard}
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-center font-semibold">{t.nav.login}</Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white text-center font-semibold px-5 py-2.5 rounded-full"
                >
                  {t.nav.register}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
