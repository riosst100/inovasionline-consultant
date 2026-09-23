import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { prisma } from "@/lib/prisma";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

const serviceIcons = [
  { bg: "bg-blue-50 text-blue-600", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { bg: "bg-cyan-50 text-cyan-600", icon: "M16 11V7a4 4 0 00-8 0v4M5 11h14l-1 10H6L5 11z" },
  { bg: "bg-indigo-50 text-indigo-600", icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-14 5h.01M19 17h.01" },
  { bg: "bg-emerald-50 text-emerald-600", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
  { bg: "bg-amber-50 text-amber-600", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { bg: "bg-violet-50 text-violet-600", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { bg: "bg-rose-50 text-rose-600", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

export default async function Home() {
  const [portfolioItems, programmers, locale] = await Promise.all([
    prisma.portfolioItem.findMany({ orderBy: { order: "asc" } }),
    prisma.programmer.findMany({ orderBy: { order: "asc" } }),
    getLocale(),
  ]);
  const t = getDictionary(locale);

  const gradients = [
    "from-blue-500 to-blue-700",
    "from-cyan-500 to-blue-600",
    "from-indigo-500 to-cyan-500",
    "from-blue-600 to-indigo-500",
  ];

  return (
    <>
      <Navbar />

      {/* ===== HERO ===== */}
      <section id="home" className="relative overflow-hidden bg-slate-950 pt-28 pb-28 lg:pt-32 lg:pb-36">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute -top-32 -right-32 w-[32rem] h-[32rem] bg-blue-600/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="-mt-14 lg:-mt-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              {t.hero.titleLine1}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>{" "}
              {t.hero.titleLine2}
            </h1>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">{t.hero.subtitle}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition shadow-lg shadow-blue-600/30"
              >
                {t.hero.ctaPrimary}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold px-7 py-3.5 rounded-full transition"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 p-3 backdrop-blur">
              <div className="rounded-2xl overflow-hidden bg-slate-900 aspect-square lg:aspect-[4/5] flex items-center justify-center">
                <svg viewBox="0 0 400 480" className="w-full h-full">
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="480" fill="#0f172a" />
                  <g opacity="0.15">
                    <path d="M0 100 H400 M0 200 H400 M0 300 H400 M0 400 H400" stroke="#38bdf8" strokeWidth="1" />
                    <path d="M100 0 V480 M200 0 V480 M300 0 V480" stroke="#38bdf8" strokeWidth="1" />
                  </g>
                  <circle cx="200" cy="220" r="90" fill="url(#g1)" opacity="0.15" />
                  <circle cx="200" cy="220" r="60" fill="url(#g1)" opacity="0.25" />
                  <g stroke="url(#g1)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="150" y="180" width="100" height="70" rx="8" />
                    <path d="M175 250 v14 M225 250 v14 M160 264 h80" />
                    <circle cx="200" cy="210" r="18" />
                    <path d="M192 210 l6 6 12 -14" />
                  </g>
                  <g fill="#38bdf8">
                    <circle cx="90" cy="120" r="4" />
                    <circle cx="320" cy="140" r="5" />
                    <circle cx="70" cy="340" r="4" />
                    <circle cx="330" cy="360" r="4" />
                    <circle cx="200" cy="380" r="4" />
                  </g>
                  <g stroke="#38bdf8" strokeWidth="1.2" opacity="0.5">
                    <path d="M90 120 L150 200" />
                    <path d="M320 140 L250 200" />
                    <path d="M70 340 L160 260" />
                    <path d="M330 360 L240 260" />
                    <path d="M200 380 L200 264" />
                  </g>
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3 max-w-[220px]">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{t.hero.uptimeTitle}</p>
                <p className="text-xs text-slate-500">{t.hero.uptimeSubtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT / TRUST ===== */}
      <section id="about" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-100 h-64 flex items-center justify-center mt-8">
                <svg className="w-16 h-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 h-64 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="rounded-2xl bg-slate-900 h-64 flex items-center justify-center col-span-2">
                <svg className="w-20 h-20 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white shadow-2xl rounded-2xl px-6 py-5 border border-slate-100 max-w-[220px]">
              <p className="text-sm font-extrabold text-blue-600 leading-snug">{t.about.badge}</p>
            </div>
          </div>

          <div>
            <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">{t.about.eyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">{t.about.title}</h2>
            <p className="mt-5 text-slate-600 leading-relaxed">{t.about.description}</p>
            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t.about.point1Title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{t.about.point1Desc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t.about.point2Title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{t.about.point2Desc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t.about.point3Title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{t.about.point3Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">{t.services.eyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">{t.services.title}</h2>
            <p className="mt-4 text-slate-600">{t.services.subtitle}</p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((s, i) => (
              <div key={s.title} className="service-card">
                <div className={`icon-box ${serviceIcons[i % serviceIcons.length].bg}`}>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={serviceIcons[i % serviceIcons.length].icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-5">{s.title}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW WE WORK ===== */}
      <section className="py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-10" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-400 font-bold text-sm tracking-widest uppercase">{t.process.eyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">{t.process.title}</h2>
            <p className="mt-4 text-slate-400">{t.process.subtitle}</p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {t.process.steps.map((s, i) => (
              <div key={s.t} className="why-card">
                <p className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-white font-bold mt-4">{s.t}</h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition shadow-lg shadow-blue-600/30"
            >
              {t.process.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== AI-ASSISTED ENGINEERING ===== */}
      <section id="ai-engineering" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">{t.aiEngineering.eyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">{t.aiEngineering.title}</h2>
            <p className="mt-5 text-slate-600 leading-relaxed">{t.aiEngineering.description}</p>
            <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-100 px-5 py-4">
              <p className="text-sm text-blue-900 leading-relaxed">{t.aiEngineering.note}</p>
            </div>
          </div>

          <div className="grid gap-5">
            {t.aiEngineering.points.map((p) => (
              <div key={p.t} className="flex gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{p.t}</h3>
                  <p className="text-sm text-slate-500 mt-1">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGY ===== */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">{t.technology.eyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">{t.technology.title}</h2>
            <p className="mt-4 text-slate-600">{t.technology.subtitle}</p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.technology.groups.map((g) => (
              <div key={g.label} className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide">{g.label}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY WORK WITH US ===== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">{t.whyUs.eyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">{t.whyUs.title}</h2>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.whyUs.items.map((item) => (
              <div key={item.t} className="service-card">
                <div className="icon-box bg-blue-50 text-blue-600">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-5">{item.t}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SELECTED WORK / CASE STUDIES ===== */}
      {portfolioItems.length > 0 && (
        <section id="portfolio" className="py-24 lg:py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">{t.portfolio.eyebrow}</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">{t.portfolio.title}</h2>
            </div>

            <div className="mt-16 grid lg:grid-cols-2 gap-8">
              {portfolioItems.map((item, i) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
                  <div className={`h-40 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}>
                    <svg className="w-12 h-12 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3V3zm4 4h10M7 11h10M7 15h6" />
                    </svg>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{item.category}</span>
                      {item.clientLabel && (
                        <span className="text-xs font-medium text-slate-400">{item.clientLabel}</span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mt-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">{item.description}</p>

                    {(item.problem || item.solution) && (
                      <div className="mt-4 space-y-3 text-sm">
                        {item.problem && (
                          <p className="text-slate-600 leading-relaxed">
                            <span className="font-semibold text-slate-900">Problem — </span>
                            {item.problem}
                          </p>
                        )}
                        {item.solution && (
                          <p className="text-slate-600 leading-relaxed">
                            <span className="font-semibold text-slate-900">Solution — </span>
                            {item.solution}
                          </p>
                        )}
                      </div>
                    )}

                    {item.techStack && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.techStack.split(",").map((tech) => (
                          <span key={tech} className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-slate-100 grid sm:grid-cols-2 gap-3 text-xs">
                      {item.ourRole && (
                        <div>
                          <p className="font-semibold text-slate-400 uppercase tracking-wide">{t.portfolio.roleLabel}</p>
                          <p className="text-slate-600 mt-1">{item.ourRole}</p>
                        </div>
                      )}
                      {item.challenge && (
                        <div>
                          <p className="font-semibold text-slate-400 uppercase tracking-wide">{t.portfolio.challengeLabel}</p>
                          <p className="text-slate-600 mt-1">{item.challenge}</p>
                        </div>
                      )}
                    </div>

                    {item.outcome && (
                      <p className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                        {item.outcome}
                      </p>
                    )}

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        View Project
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== TEAM ===== */}
      {programmers.length > 0 && (
        <section id="team" className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">{t.team.eyebrow}</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">{t.team.title}</h2>
              <p className="mt-4 text-slate-600">{t.team.subtitle}</p>
            </div>

            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {programmers.map((p) => (
                <div key={p.id} className="team-card">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 mx-auto flex items-center justify-center text-white font-bold text-2xl">
                    {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <h3 className="font-bold text-slate-900 mt-4">{p.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mt-1">{p.role}</p>
                  <p className="text-xs text-slate-500 mt-2">{p.skills}</p>
                  {p.linkedin && (
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      {t.team.linkedin}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-10" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{t.cta.title}</h2>
          <p className="mt-4 text-blue-50 text-lg">{t.cta.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/register" className="bg-white text-blue-600 font-bold px-8 py-3.5 rounded-full hover:bg-blue-50 transition shadow-xl">
              {t.cta.primary}
            </Link>
            <a
              href={getWhatsAppLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 border border-white/30 text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/20 transition"
            >
              {t.cta.secondary}
            </a>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">{t.contact.eyebrow}</span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900">{t.contact.title}</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">{t.contact.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={getWhatsAppLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-7 py-3.5 rounded-full transition shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.81-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.58-.36.77-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.81 2 .88 2.15.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.27.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.32.07.12.07.68-.17 1.36z" />
              </svg>
              {t.contact.whatsapp}
            </a>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-full transition shadow-lg"
            >
              {t.contact.register}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
