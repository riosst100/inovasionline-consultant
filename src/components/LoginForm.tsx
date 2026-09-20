"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginUser } from "@/lib/actions/auth";
import { Required, RequiredNote } from "@/components/FormHelpers";
import type { dictionaries, Locale } from "@/lib/i18n/dictionaries";

type Dictionary = (typeof dictionaries)[Locale];

export default function LoginForm({ t }: { t: Dictionary }) {
  const [state, formAction, pending] = useActionState(loginUser, undefined);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <h1 className="text-2xl font-extrabold text-slate-900">{t.auth.loginTitle}</h1>
      <p className="text-sm text-slate-500 mt-1">{t.auth.loginSubtitle}</p>

      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.auth.emailLabel} <Required /></label>
          <input name="email" type="email" required className="form-input" placeholder={t.auth.emailPlaceholder} />
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
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-blue-600/20"
        >
          {pending ? t.auth.loginButtonLoading : t.auth.loginButton}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        {t.auth.noAccount}{" "}
        <Link href="/register" className="text-blue-600 font-semibold hover:text-blue-700">
          {t.auth.registerLink}
        </Link>
      </p>
    </div>
  );
}
