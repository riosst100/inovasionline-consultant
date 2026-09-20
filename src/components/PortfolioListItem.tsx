"use client";

import { useState, useTransition } from "react";
import PortfolioForm from "@/components/PortfolioForm";
import { deletePortfolioItem } from "@/lib/actions/content";
import { interpolate } from "@/lib/i18n/interpolate";
import type { dictionaries, Locale } from "@/lib/i18n/dictionaries";

type Dictionary = (typeof dictionaries)[Locale];

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  link: string | null;
  order: number;
};

export default function PortfolioListItem({ item, t }: { item: PortfolioItem; t: Dictionary }) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(interpolate(t.dashboard.confirmDeletePortfolio, { title: item.title }))) return;
    startTransition(() => {
      deletePortfolioItem(item.id);
    });
  };

  if (editing) {
    return (
      <div className="bg-white rounded-2xl border border-blue-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">{t.dashboard.editPortfolio}</h3>
          <button onClick={() => setEditing(false)} className="text-sm text-slate-500 hover:text-slate-700">
            {t.dashboard.cancel}
          </button>
        </div>
        <PortfolioForm item={item} t={t} onDone={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{item.category}</span>
        <h3 className="font-bold text-slate-900 mt-1">{item.title}</h3>
        <p className="text-sm text-slate-500 mt-1">{item.description}</p>
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 inline-block">
            {item.link}
          </a>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">{t.dashboard.order} {item.order}</span>
        <button
          onClick={() => setEditing(true)}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 px-3 py-1.5"
        >
          {t.dashboard.edit}
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-sm font-semibold text-red-600 hover:text-red-700 disabled:opacity-60 px-3 py-1.5"
        >
          {t.dashboard.delete}
        </button>
      </div>
    </div>
  );
}
