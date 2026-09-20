import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardNav from "@/components/DashboardNav";
import AdminTabs from "@/components/AdminTabs";
import { projectStatusLabel, projectStatusColor } from "@/lib/status";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function AdminDashboardPage() {
  const [session, locale] = await Promise.all([auth(), getLocale()]);
  const t = getDictionary(locale);
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, offers: true },
  });

  const stats = {
    total: projects.length,
    pending: projects.filter((p) => p.status === "PENDING").length,
    negotiating: projects.filter((p) => p.status === "NEGOTIATING").length,
    accepted: projects.filter((p) => p.status === "ACCEPTED" || p.status === "IN_PROGRESS" || p.status === "DONE").length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav name={session!.user.name || t.dashboard.adminFallback} role="ADMIN" />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-extrabold text-slate-900">{t.dashboard.projectSubmissions}</h1>
        <p className="text-sm text-slate-500 mt-1">{t.dashboard.projectSubmissionsSubtitle}</p>

        <div className="mt-6">
          <AdminTabs active="/admin" />
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-2xl font-extrabold text-slate-900">{stats.total}</p>
            <p className="text-xs text-slate-500 mt-1">{t.dashboard.totalSubmissions}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-2xl font-extrabold text-amber-600">{stats.pending}</p>
            <p className="text-xs text-slate-500 mt-1">{t.dashboard.awaitingReviewStat}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-2xl font-extrabold text-purple-600">{stats.negotiating}</p>
            <p className="text-xs text-slate-500 mt-1">{t.dashboard.negotiatingStat}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-2xl font-extrabold text-emerald-600">{stats.accepted}</p>
            <p className="text-xs text-slate-500 mt-1">{t.dashboard.acceptedRunningStat}</p>
          </div>
        </div>

        <div className="mt-8">
          {projects.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <p className="text-slate-500">{t.dashboard.noSubmissionsYet}</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {projects.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/project/${p.id}`}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-wrap items-center justify-between gap-4 hover:border-blue-300 hover:shadow-md transition"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-slate-900">{p.title}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${projectStatusColor[p.status]}`}>
                        {projectStatusLabel(t, p.status)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{p.category}</p>
                    <p className="text-sm text-slate-400 mt-1">
                      {p.user.name} &middot; {p.user.company || p.user.email}
                    </p>
                  </div>
                  <div className="text-sm text-slate-500">{p.offers.length} {t.dashboard.offersCount} &rarr;</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
