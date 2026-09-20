"use client";

import { useActionState } from "react";
import { sendOffer } from "@/lib/actions/projects";
import { Required, RequiredNote } from "@/components/FormHelpers";
import type { dictionaries, Locale } from "@/lib/i18n/dictionaries";

type Dictionary = (typeof dictionaries)[Locale];

export default function SendOfferForm({ projectId, t }: { projectId: string; t: Dictionary }) {
  const [state, formAction, pending] = useActionState(sendOffer, undefined);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="font-bold text-slate-900">{t.dashboard.sendNewOffer}</h3>
      <p className="text-sm text-slate-500 mt-1">{t.dashboard.sendNewOfferSubtitle}</p>

      <form action={formAction} className="mt-4 space-y-4">
        <input type="hidden" name="projectId" value={projectId} />
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.estimatedTime} <Required /></label>
            <input name="estimasiWaktu" type="text" required className="form-input" placeholder={t.dashboard.estimatedTimePlaceholder} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.budget} <Required /></label>
            <input name="budget" type="text" required className="form-input" placeholder={t.dashboard.budgetPlaceholder} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.scopeOfWork} <Required /></label>
          <textarea
            name="scopeOfWork"
            required
            rows={5}
            className="form-input"
            placeholder={t.dashboard.scopeOfWorkPlaceholder}
          />
        </div>

        <RequiredNote text={t.auth.requiredFieldsNote} />

        {state?.error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-600/20"
        >
          {pending ? t.dashboard.sending : t.dashboard.sendOffer}
        </button>
      </form>
    </div>
  );
}
