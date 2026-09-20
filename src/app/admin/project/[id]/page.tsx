import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { projectStatusLabel, projectStatusColor } from "@/lib/status";
import AdminOfferPanel from "@/components/AdminOfferPanel";
import SendOfferForm from "@/components/SendOfferForm";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";

export default async function AdminProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  const t = getDictionary(locale);

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      user: true,
      offers: {
        orderBy: { round: "desc" },
        include: { negotiations: { orderBy: { createdAt: "asc" } } },
      },
    },
  });

  if (!project) notFound();

  const latestOffer = project.offers[0];
  const canSendNewOffer =
    project.offers.length === 0 || (latestOffer && ["REJECTED"].includes(latestOffer.status) === false && latestOffer.status !== "ACCEPTED");

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin" className="text-sm text-slate-500 hover:text-blue-600 transition">
          &larr; {t.dashboard.backToSubmissions}
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

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400 font-medium">{t.dashboard.client}</p>
              <p className="font-semibold text-slate-900 mt-1">{project.user.name}</p>
              <p className="text-sm text-slate-500">{project.user.company || "-"} &middot; {project.user.email}</p>
              {project.user.phone && <p className="text-sm text-slate-500">{project.user.phone}</p>}
            </div>
            <a
              href={getWhatsAppLink(locale, interpolate(t.dashboard.adminOfferMessage, { name: project.user.name, title: project.title }))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-sm px-4 py-2 rounded-full transition"
            >
              {t.dashboard.chatViaWhatsApp}
            </a>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <h2 className="text-lg font-bold text-slate-900">{t.dashboard.offersHeading}</h2>

          {project.offers.map((offer) => (
            <AdminOfferPanel key={offer.id} offer={offer} projectId={project.id} t={t} locale={locale} />
          ))}

          {canSendNewOffer && <SendOfferForm projectId={project.id} t={t} />}
        </div>
      </div>
    </div>
  );
}
