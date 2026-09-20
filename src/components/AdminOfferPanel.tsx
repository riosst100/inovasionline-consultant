"use client";

import { useActionState, useState } from "react";
import { adminReplyNegotiation } from "@/lib/actions/projects";
import { offerStatusLabel, offerStatusColor } from "@/lib/status";
import { Required, RequiredNote } from "@/components/FormHelpers";
import type { dictionaries, Locale } from "@/lib/i18n/dictionaries";

type Dictionary = (typeof dictionaries)[Locale];

const dateLocale: Record<string, string> = { id: "id-ID", en: "en-US" };

type Negotiation = {
  id: string;
  sender: "ADMIN" | "USER";
  message: string;
  proposedBudget: string | null;
  proposedWaktu: string | null;
  createdAt: Date;
};

type Offer = {
  id: string;
  round: number;
  estimasiWaktu: string;
  budget: string;
  scopeOfWork: string;
  status: "PENDING" | "NEGOTIATING" | "ACCEPTED" | "REJECTED";
  createdAt: Date;
  negotiations: Negotiation[];
};

export default function AdminOfferPanel({
  offer,
  projectId,
  t,
  locale,
}: {
  offer: Offer;
  projectId: string;
  t: Dictionary;
  locale: Locale;
}) {
  const [state, formAction, pending] = useActionState(adminReplyNegotiation, undefined);
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{t.dashboard.offerNumber}{offer.round}</span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${offerStatusColor[offer.status]}`}>
            {offerStatusLabel(t, offer.status)}
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400 font-medium">{t.dashboard.estimatedTime}</p>
            <p className="font-semibold text-slate-900 mt-1">{offer.estimasiWaktu}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">{t.dashboard.budget}</p>
            <p className="font-semibold text-slate-900 mt-1">{offer.budget}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs text-slate-400 font-medium">{t.dashboard.scopeOfWork}</p>
          <p className="text-sm text-slate-700 mt-1 whitespace-pre-line">{offer.scopeOfWork}</p>
        </div>
      </div>

      {offer.negotiations.length > 0 && (
        <div className="p-6 bg-slate-50 border-b border-slate-100 space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{t.dashboard.negotiationHistory}</p>
          {offer.negotiations.map((n) => (
            <div
              key={n.id}
              className={`rounded-xl p-4 text-sm ${
                n.sender === "USER" ? "bg-blue-50 border border-blue-100" : "bg-white border border-slate-200 ml-6"
              }`}
            >
              <p className="text-xs font-semibold text-slate-500 mb-1">
                {n.sender === "USER" ? t.dashboard.senderClient : t.dashboard.senderYou} &middot;{" "}
                {new Date(n.createdAt).toLocaleString(dateLocale[locale], { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </p>
              <p className="text-slate-700">{n.message}</p>
              {(n.proposedBudget || n.proposedWaktu) && (
                <div className="mt-2 flex gap-4 text-xs text-slate-500">
                  {n.proposedBudget && <span>{t.dashboard.proposedBudgetLabel} <strong>{n.proposedBudget}</strong></span>}
                  {n.proposedWaktu && <span>{t.dashboard.proposedTimeLabel} <strong>{n.proposedWaktu}</strong></span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {offer.status === "NEGOTIATING" && (
        <div className="p-6">
          {!showReply ? (
            <button
              onClick={() => setShowReply(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition"
            >
              {t.dashboard.replyNegotiation}
            </button>
          ) : (
            <form action={formAction} className="space-y-3">
              <input type="hidden" name="offerId" value={offer.id} />
              <input type="hidden" name="projectId" value={projectId} />
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.dashboard.newBudget}</label>
                  <input name="proposedBudget" type="text" className="form-input" placeholder={t.dashboard.newBudgetPlaceholder} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.dashboard.newTime}</label>
                  <input name="proposedWaktu" type="text" className="form-input" placeholder={t.dashboard.newTimePlaceholder} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.dashboard.replyMessage} <Required /></label>
                <textarea name="message" required rows={3} className="form-input" placeholder={t.dashboard.replyMessagePlaceholder} />
              </div>
              <RequiredNote text={t.auth.requiredFieldsNote} />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={pending}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition"
                >
                  {pending ? t.dashboard.sending : t.dashboard.sendReply}
                </button>
                <button
                  type="button"
                  onClick={() => setShowReply(false)}
                  className="text-sm text-slate-500 hover:text-slate-700 font-medium"
                >
                  {t.dashboard.cancel}
                </button>
              </div>
            </form>
          )}

          {state?.error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-3">{state.error}</p>
          )}
        </div>
      )}
    </div>
  );
}
