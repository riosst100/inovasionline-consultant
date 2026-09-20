import Link from "next/link";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function AdminTabs({ active }: { active: string }) {
  const locale = await getLocale();
  const t = getDictionary(locale);

  const tabs = [
    { href: "/admin", label: t.dashboard.tabSubmissions },
    { href: "/admin/team", label: t.dashboard.tabTeam },
    { href: "/admin/portfolio", label: t.dashboard.tabPortfolio },
  ];

  return (
    <div className="flex gap-1 border-b border-slate-200 mb-8 -mt-2 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = tab.href === active;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              isActive
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
