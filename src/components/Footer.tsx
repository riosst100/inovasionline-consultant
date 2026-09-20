import Link from "next/link";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function Footer() {
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com";
  const year = new Date().getFullYear();
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <footer className="bg-slate-950 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center font-extrabold text-white text-lg">
                I
              </div>
              <span className="font-extrabold text-lg text-white">
                Inovasi<span className="text-blue-400">Online</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">{t.footer.description}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.navigation}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/#about" className="hover:text-cyan-400 transition">{t.footer.aboutUs}</Link></li>
              <li><Link href="/#services" className="hover:text-cyan-400 transition">{t.footer.services}</Link></li>
              <li><Link href="/#portfolio" className="hover:text-cyan-400 transition">{t.footer.portfolio}</Link></li>
              <li><Link href="/#team" className="hover:text-cyan-400 transition">{t.footer.team}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.servicesTitle}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {t.services.items.slice(0, 4).map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.contactTitle}</h4>
            <div className="flex gap-3">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center text-white transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={getWhatsAppLink(locale)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.contact.whatsapp}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500 flex items-center justify-center text-white transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.81-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.58-.36.77-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.81 2 .88 2.15.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.27.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.32.07.12.07.68-.17 1.36z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-white/10 text-center text-sm text-slate-500">
          <p>&copy; {year} Inovasi Online IT Consultant. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
