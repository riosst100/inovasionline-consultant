"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { registerUser } from "@/lib/actions/auth";
import PhoneInput from "@/components/PhoneInput";
import { Required, RequiredNote } from "@/components/FormHelpers";
import type { dictionaries, Locale } from "@/lib/i18n/dictionaries";

type Dictionary = (typeof dictionaries)[Locale];

export default function RegisterForm({ t, defaultCountryCode }: { t: Dictionary; defaultCountryCode: string }) {
  const [state, formAction, pending] = useActionState(registerUser, undefined);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mismatch = confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <h1 className="text-2xl font-extrabold text-slate-900">{t.auth.registerTitle}</h1>
      <p className="text-sm text-slate-500 mt-1">{t.auth.registerSubtitle}</p>

      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.auth.nameLabel} <Required /></label>
          <input name="name" type="text" required className="form-input" placeholder={t.auth.namePlaceholder} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.auth.emailLabel} <Required /></label>
          <input name="email" type="email" required className="form-input" placeholder={t.auth.emailPlaceholder} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.auth.companyLabel}</label>
          <input name="company" type="text" className="form-input" placeholder={t.auth.companyPlaceholder} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.auth.phoneLabel}</label>
          <PhoneInput
            defaultCountryCode={defaultCountryCode}
            placeholder={t.auth.phonePlaceholder}
            searchPlaceholder={t.auth.phoneSearchPlaceholder}
            noCountryFoundText={t.auth.phoneNoCountryFound}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.auth.passwordLabel} <Required /></label>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder={t.auth.passwordHint}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.auth.confirmPasswordLabel} <Required /></label>
          <input
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`form-input ${mismatch ? "border-red-400 focus:border-red-500 focus:ring-red-500/15" : ""}`}
            placeholder={t.auth.confirmPasswordPlaceholder}
          />
          {mismatch && <p className="text-xs text-red-600 mt-1.5">{t.auth.passwordMismatch}</p>}
        </div>

        <RequiredNote text={t.auth.requiredFieldsNote} />

        {state?.error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending || mismatch}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-blue-600/20"
        >
          {pending ? t.auth.registerButtonLoading : t.auth.registerButton}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        {t.auth.haveAccount}{" "}
        <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700">
          {t.auth.loginLink}
        </Link>
      </p>
    </div>
  );
}
