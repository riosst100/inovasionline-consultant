import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardNav from "@/components/DashboardNav";
import { projectStatusLabel, projectStatusColor } from "@/lib/status";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

const dateLocale: Record<string, string> = { id: "id-ID", en: "en-US" };

export default async function DashboardPage() {
  const [session, locale] = await Promise.all([auth(), getLocale()]);
  const t = getDictionary(locale);
  const projects = await prisma.project.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: { offers: true },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav name={session!.user.name || t.dashboard.clientFallback} role="USER" />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">{t.dashboard.myProjects}</h1>
            <p className="text-sm text-slate-500 mt-1">{t.dashboard.myProjectsSubtitle}</p>
          </div>
          <Link
            href="/dashboard/new-project"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition shadow-lg shadow-blue-600/20"
          >
            {t.dashboard.newProjectButton}
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p className="text-slate-500">{t.dashboard.noProjectsYet}</p>
            <Link
              href="/dashboard/new-project"
              className="inline-flex items-center gap-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition"
            >
              {t.dashboard.submitFirstProject}
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/dashboard/project/${p.id}`}
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
                    {t.dashboard.submittedOn} {new Date(p.createdAt).toLocaleDateString(dateLocale[locale], { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
                <div className="text-sm text-slate-500">
                  {p.offers.length} {t.dashboard.offersCount} &rarr;
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
