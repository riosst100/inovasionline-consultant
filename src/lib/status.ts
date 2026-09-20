import type { dictionaries, Locale } from "@/lib/i18n/dictionaries";

type Dictionary = (typeof dictionaries)[Locale];

export const projectStatusColor: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  OFFERED: "bg-blue-100 text-blue-700",
  NEGOTIATING: "bg-purple-100 text-purple-700",
  ACCEPTED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-red-100 text-red-700",
  IN_PROGRESS: "bg-cyan-100 text-cyan-700",
  DONE: "bg-slate-200 text-slate-700",
};

export const offerStatusColor: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  NEGOTIATING: "bg-purple-100 text-purple-700",
  ACCEPTED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-red-100 text-red-700",
};

export function projectStatusLabel(t: Dictionary, status: string): string {
  return t.status.project[status as keyof typeof t.status.project] ?? status;
}

export function offerStatusLabel(t: Dictionary, status: string): string {
  return t.status.offer[status as keyof typeof t.status.offer] ?? status;
}
