"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/lib/actions/auth";
import { Required, RequiredNote } from "@/components/FormHelpers";
import type { dictionaries, Locale } from "@/lib/i18n/dictionaries";

type Dictionary = (typeof dictionaries)[Locale];

export default function AdminLoginForm({ t }: { t: Dictionary }) {
  const [state, formAction, pending] = useActionState(loginAdmin, undefined);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <span className="inline-block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">
        {t.auth.adminPortal}
      </span>
      <h1 className="text-2xl font-extrabold text-slate-900">{t.auth.adminLoginTitle}</h1>
      <p className="text-sm text-slate-500 mt-1">{t.auth.adminLoginSubtitle}</p>

      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.auth.emailLabel} <Required /></label>
          <input name="email" type="email" required className="form-input" placeholder={t.auth.adminEmailPlaceholder} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.auth.passwordLabel} <Required /></label>
          <input name="password" type="password" required className="form-input" placeholder={t.auth.passwordPlaceholder} />
        </div>

        <RequiredNote text={t.auth.requiredFieldsNote} />

        {state?.error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition shadow-lg"
        >
          {pending ? t.auth.loginButtonLoading : t.auth.adminLoginButton}
        </button>
      </form>
    </div>
  );
}
