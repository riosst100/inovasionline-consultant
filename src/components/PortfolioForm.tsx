"use client";

import { useActionState, useEffect, useRef } from "react";
import { createPortfolioItem, updatePortfolioItem } from "@/lib/actions/content";
import { Required, RequiredNote } from "@/components/FormHelpers";
import type { dictionaries, Locale } from "@/lib/i18n/dictionaries";

type Dictionary = (typeof dictionaries)[Locale];

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  link: string | null;
  order: number;
  clientLabel: string | null;
  problem: string | null;
  solution: string | null;
  techStack: string | null;
  ourRole: string | null;
  challenge: string | null;
  outcome: string | null;
};

export default function PortfolioForm({
  item,
  t,
  onDone,
}: {
  item?: PortfolioItem;
  t: Dictionary;
  onDone?: () => void;
}) {
  const isEdit = Boolean(item);
  const action = isEdit ? updatePortfolioItem : createPortfolioItem;
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
      {isEdit && <input type="hidden" name="id" value={item!.id} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.portfolioTitleLabel} <Required /></label>
          <input
            name="title"
            type="text"
            required
            defaultValue={item?.title}
            className="form-input"
            placeholder={t.dashboard.portfolioTitlePlaceholder}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.categoryLabel} <Required /></label>
          <input
            name="category"
            type="text"
            required
            defaultValue={item?.category}
            className="form-input"
            placeholder={t.dashboard.portfolioCategoryPlaceholder}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.portfolioDescriptionLabel} <Required /></label>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={item?.description}
          className="form-input"
          placeholder={t.dashboard.portfolioDescriptionPlaceholder}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.portfolioLinkLabel}</label>
          <input
            name="link"
            type="url"
            defaultValue={item?.link ?? ""}
            className="form-input"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.displayOrderLabel}</label>
          <input
            name="order"
            type="number"
            defaultValue={item?.order ?? 0}
            className="form-input"
            placeholder="0"
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 mt-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Case Study</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.portfolioClientLabel}</label>
            <input
              name="clientLabel"
              type="text"
              defaultValue={item?.clientLabel ?? ""}
              className="form-input"
              placeholder={t.dashboard.portfolioClientPlaceholder}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.portfolioTechStackLabel}</label>
            <input
              name="techStack"
              type="text"
              defaultValue={item?.techStack ?? ""}
              className="form-input"
              placeholder={t.dashboard.portfolioTechStackPlaceholder}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.portfolioProblemLabel}</label>
          <textarea
            name="problem"
            rows={2}
            defaultValue={item?.problem ?? ""}
            className="form-input"
            placeholder={t.dashboard.portfolioProblemPlaceholder}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.portfolioSolutionLabel}</label>
          <textarea
            name="solution"
            rows={2}
            defaultValue={item?.solution ?? ""}
            className="form-input"
            placeholder={t.dashboard.portfolioSolutionPlaceholder}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.portfolioOurRoleLabel}</label>
            <input
              name="ourRole"
              type="text"
              defaultValue={item?.ourRole ?? ""}
              className="form-input"
              placeholder={t.dashboard.portfolioOurRolePlaceholder}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.portfolioChallengeLabel}</label>
            <input
              name="challenge"
              type="text"
              defaultValue={item?.challenge ?? ""}
              className="form-input"
              placeholder={t.dashboard.portfolioChallengePlaceholder}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dashboard.portfolioOutcomeLabel}</label>
          <textarea
            name="outcome"
            rows={2}
            defaultValue={item?.outcome ?? ""}
            className="form-input"
            placeholder={t.dashboard.portfolioOutcomePlaceholder}
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
        {pending ? t.dashboard.saving : isEdit ? t.dashboard.saveChanges : t.dashboard.addPortfolioProject}
      </button>
    </form>
  );
}
