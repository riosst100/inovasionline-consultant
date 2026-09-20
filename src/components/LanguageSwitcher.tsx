"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { setLocale } from "@/lib/actions/locale";
import { dictionaries, type Locale } from "@/lib/i18n/dictionaries";

function IdFlag({ clipId }: { clipId: string }) {
  return (
    <svg viewBox="0 0 32 32" className="w-5 h-5 rounded-full ring-1 ring-black/5 shrink-0">
      <clipPath id={clipId}>
        <circle cx="16" cy="16" r="16" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="32" height="16" fill="#e70011" />
        <rect y="16" width="32" height="16" fill="#ffffff" />
      </g>
    </svg>
  );
}

function EnFlag({ clipId }: { clipId: string }) {
  return (
    <svg viewBox="0 0 32 32" className="w-5 h-5 rounded-full ring-1 ring-black/5 shrink-0">
      <clipPath id={clipId}>
        <circle cx="16" cy="16" r="16" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="32" height="32" fill="#012169" />
        <path d="M0 0 32 32M32 0 0 32" stroke="#fff" strokeWidth="4" />
        <path d="M0 0 32 32M32 0 0 32" stroke="#C8102E" strokeWidth="2" />
        <path d="M16 0V32M0 16H32" stroke="#fff" strokeWidth="7" />
        <path d="M16 0V32M0 16H32" stroke="#C8102E" strokeWidth="4" />
      </g>
    </svg>
  );
}

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const options = [
    { value: "id" as const, label: "Indonesia", flag: <IdFlag clipId={`${uid}-id`} /> },
    { value: "en" as const, label: "English", flag: <EnFlag clipId={`${uid}-en`} /> },
  ];

  const current = options.find((o) => o.value === locale) ?? options[0];

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const select = (next: Locale) => {
    setOpen(false);
    if (next === locale || isPending) return;
    startTransition(() => {
      setLocale(next, pathname);
    });
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={dictionaries[locale].lang[locale]}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white pl-2 pr-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
      >
        {current.flag}
        <span className="uppercase text-xs tracking-wide">{current.value}</span>
        <svg
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="lang-dropdown absolute right-0 top-full mt-2 w-44 rounded-xl border border-slate-100 bg-white py-1.5 shadow-xl shadow-slate-900/10 z-50"
        >
          {options.map((opt) => {
            const active = opt.value === locale;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => select(opt.value)}
                className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-sm transition cursor-pointer ${
                  active ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {opt.flag}
                <span className="flex-1 text-left">{opt.label}</span>
                {active && (
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
