"use client";

import { useState } from "react";
import ProgrammerForm from "@/components/ProgrammerForm";
import type { dictionaries, Locale } from "@/lib/i18n/dictionaries";

type Dictionary = (typeof dictionaries)[Locale];

export default function AddProgrammerButton({ t }: { t: Dictionary }) {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <div className="bg-white rounded-2xl border border-blue-200 p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">{t.dashboard.addProgrammerTitle}</h3>
          <button onClick={() => setOpen(false)} className="text-sm text-slate-500 hover:text-slate-700">
            {t.dashboard.cancel}
          </button>
        </div>
        <ProgrammerForm t={t} onDone={() => setOpen(false)} />
      </div>
    );
  }

  return (
    <button
      onClick={() => setOpen(true)}
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition shadow-lg shadow-blue-600/20 mb-6"
    >
      {t.dashboard.addProgrammer}
    </button>
  );
}
