"use client";

import { useActionState, useEffect, useRef } from "react";
import { createProgrammer, updateProgrammer } from "@/lib/actions/content";
import { Required, RequiredNote } from "@/components/FormHelpers";
import type { dictionaries, Locale } from "@/lib/i18n/dictionaries";

type Dictionary = (typeof dictionaries)[Locale];

type Programmer = {
  id: string;
  name: string;
  role: string;
  skills: string;
  linkedin: string | null;
  order: number;
};

export default function ProgrammerForm({
  programmer,
  t,
  onDone,
}: {
  programmer?: Programmer;
  t: Dictionary;
  onDone?: () => void;
}) {
  const isEdit = Boolean(programmer);
  const action = isEdit ? updateProgrammer : createProgrammer;
  const [state, formAction, pending] = useActionState(action, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending && !state?.error) {
      formRef.current?.reset();
      onDone?.();
    }
    wasPending.current = pending;
  }, [pending, state, onDone]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {isEdit && <input type="hidden" name="id" value={programmer!.id} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.nameLabel} <Required /></label>
          <input
            name="name"
            type="text"
            required
            defaultValue={programmer?.name}
            className="form-input"
            placeholder={t.dashboard.namePlaceholder}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.roleLabel} <Required /></label>
          <input
            name="role"
            type="text"
            required
            defaultValue={programmer?.role}
            className="form-input"
            placeholder={t.dashboard.rolePlaceholder}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.skillsLabel} <Required /></label>
        <input
          name="skills"
          type="text"
          required
          defaultValue={programmer?.skills}
          className="form-input"
          placeholder={t.dashboard.skillsPlaceholder}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.linkedinLabel}</label>
          <input
            name="linkedin"
            type="url"
            defaultValue={programmer?.linkedin ?? ""}
            className="form-input"
            placeholder={t.dashboard.linkedinPlaceholder}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.displayOrderLabel}</label>
          <input
            name="order"
            type="number"
            defaultValue={programmer?.order ?? 0}
            className="form-input"
            placeholder="0"
          />
        </div>
      </div>

      <RequiredNote text={t.auth.requiredFieldsNote} />

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition"
      >
        {pending ? t.dashboard.saving : isEdit ? t.dashboard.saveChanges : t.dashboard.addProgrammer}
      </button>
    </form>
  );
}
