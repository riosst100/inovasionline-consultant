import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { projectStatusLabel, projectStatusColor } from "@/lib/status";
import OfferCard from "@/components/OfferCard";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";

const dateLocale: Record<string, string> = { id: "id-ID", en: "en-US" };

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [session, locale] = await Promise.all([auth(), getLocale()]);
  const t = getDictionary(locale);

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      offers: {
        orderBy: { round: "desc" },
        include: { negotiations: { orderBy: { createdAt: "asc" } } },
      },
    },
  });

  if (!project || project.userId !== session!.user.id) notFound();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="text-sm text-slate-500 hover:text-blue-600 transition">
          &larr; {t.dashboard.backToDashboard}
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 mt-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900">{project.title}</h1>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${projectStatusColor[project.status]}`}>
              {projectStatusLabel(t, project.status)}
            </span>
          </div>
          <p className="text-sm text-blue-600 font-medium mt-2">{project.category}</p>
          <p className="text-sm text-slate-600 mt-4 whitespace-pre-line">{project.description}</p>
          <p className="text-xs text-slate-400 mt-4">
            {t.dashboard.submittedOn} {new Date(project.createdAt).toLocaleDateString(dateLocale[locale], { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">{t.dashboard.offersHeading}</h2>

          {project.offers.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <p className="text-slate-500">{t.dashboard.awaitingReview}</p>
              <a
                href={getWhatsAppLink(locale, interpolate(t.dashboard.askStatusMessage, { title: project.title }))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                {t.dashboard.askViaWhatsApp}
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {project.offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} projectId={project.id} t={t} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
