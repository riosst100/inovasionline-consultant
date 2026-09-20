"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createProject } from "@/lib/actions/projects";
import { Required, RequiredNote } from "@/components/FormHelpers";
import type { dictionaries, Locale } from "@/lib/i18n/dictionaries";

type Dictionary = (typeof dictionaries)[Locale];

export default function NewProjectForm({ t }: { t: Dictionary }) {
  const [state, formAction, pending] = useActionState(createProject, undefined);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="text-sm text-slate-500 hover:text-blue-600 transition">
          &larr; {t.dashboard.backToDashboard}
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 mt-4">
          <h1 className="text-2xl font-extrabold text-slate-900">{t.dashboard.newProjectTitle}</h1>
          <p className="text-sm text-slate-500 mt-1">{t.dashboard.newProjectSubtitle}</p>

          <form action={formAction} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.projectTitleLabel} <Required /></label>
              <input name="title" type="text" required className="form-input" placeholder={t.dashboard.projectTitlePlaceholder} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.categoryLabel} <Required /></label>
              <select name="category" required className="form-input">
                {t.dashboard.categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.descriptionLabel} <Required /></label>
              <textarea
                name="description"
                required
                rows={6}
                className="form-input"
                placeholder={t.dashboard.descriptionPlaceholder}
              />
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
              {pending ? t.dashboard.sending : t.dashboard.submitProject}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
