import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardNav from "@/components/DashboardNav";
import AdminTabs from "@/components/AdminTabs";
import ProgrammerListItem from "@/components/ProgrammerListItem";
import AddProgrammerButton from "@/components/AddProgrammerButton";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function AdminTeamPage() {
  const [session, locale] = await Promise.all([auth(), getLocale()]);
  const t = getDictionary(locale);
  const programmers = await prisma.programmer.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav name={session!.user.name || t.dashboard.adminFallback} role="ADMIN" />

      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-extrabold text-slate-900">{t.dashboard.teamConfigTitle}</h1>
        <p className="text-sm text-slate-500 mt-1">{t.dashboard.teamConfigSubtitle}</p>

        <div className="mt-6">
          <AdminTabs active="/admin/team" />
        </div>

        <AddProgrammerButton t={t} />

        {programmers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p className="text-slate-500">{t.dashboard.noTeamMembers}</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {programmers.map((p) => (
              <ProgrammerListItem key={p.id} programmer={p} t={t} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
