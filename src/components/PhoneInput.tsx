"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { countries, findCountryByCode, type Country } from "@/lib/countries";
import FlagIcon from "@/components/FlagIcon";

export default function PhoneInput({
  defaultCountryCode,
  placeholder,
  searchPlaceholder,
  noCountryFoundText,
  name = "phone",
}: {
  defaultCountryCode: string;
  placeholder?: string;
  searchPlaceholder: string;
  noCountryFoundText: string;
  name?: string;
}) {
  const [country, setCountry] = useState<Country>(() => findCountryByCode(defaultCountryCode));
  const [number, setNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    searchRef.current?.focus();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const filtered = useMemo(() => {
    if (!query.trim()) return countries;
    const q = query.trim().toLowerCase();
    return countries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dialCode.includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [query]);

  const fullNumber = number ? `${country.dialCode} ${number}` : "";

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={fullNumber} />
      <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:border-blue-600 focus-within:ring-3 focus-within:ring-blue-500/15 transition">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-50 border-r border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-100 transition cursor-pointer shrink-0"
        >
          <FlagIcon code={country.code} className="text-base" />
          <span>{country.dialCode}</span>
          <svg
            className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <input
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value.replace(/[^\d\s-]/g, ""))}
          placeholder={placeholder}
          className="flex-1 min-w-0 px-3 py-2.5 text-sm outline-none"
        />
      </div>

      {open && (
        <div className="lang-dropdown absolute left-0 top-full mt-2 w-72 rounded-xl border border-slate-100 bg-white shadow-xl shadow-slate-900/10 z-50 overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div role="listbox" className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="px-3.5 py-3 text-sm text-slate-400">{noCountryFoundText}</p>
            ) : (
              filtered.map((c) => {
                const active = c.code === country.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setCountry(c);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`flex w-full items-center gap-3 px-3.5 py-2 text-sm transition cursor-pointer ${
                      active ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <FlagIcon code={c.code} className="text-base" />
                    <span className="flex-1 text-left truncate">{c.name}</span>
                    <span className="text-slate-400 text-xs">{c.dialCode}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
