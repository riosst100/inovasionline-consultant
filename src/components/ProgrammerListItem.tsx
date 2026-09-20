"use client";

import { useState, useTransition } from "react";
import ProgrammerForm from "@/components/ProgrammerForm";
import { deleteProgrammer } from "@/lib/actions/content";
import { interpolate } from "@/lib/i18n/interpolate";
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

export default function ProgrammerListItem({ programmer, t }: { programmer: Programmer; t: Dictionary }) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(interpolate(t.dashboard.confirmDeleteProgrammer, { name: programmer.name }))) return;
    startTransition(() => {
      deleteProgrammer(programmer.id);
    });
  };

  if (editing) {
    return (
      <div className="bg-white rounded-2xl border border-blue-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">{t.dashboard.editProgrammer}</h3>
          <button onClick={() => setEditing(false)} className="text-sm text-slate-500 hover:text-slate-700">
            {t.dashboard.cancel}
          </button>
        </div>
        <ProgrammerForm programmer={programmer} t={t} onDone={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold shrink-0">
          {programmer.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </div>
        <div>
          <h3 className="font-bold text-slate-900">{programmer.name}</h3>
          <p className="text-sm text-blue-600">{programmer.role}</p>
          <p className="text-xs text-slate-500 mt-0.5">{programmer.skills}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">{t.dashboard.order} {programmer.order}</span>
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
