import AuthHeader from "@/components/AuthHeader";
import RegisterForm from "@/components/RegisterForm";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getCountry } from "@/lib/get-country";

export default async function RegisterPage() {
  const [locale, country] = await Promise.all([getLocale(), getCountry()]);
  const t = getDictionary(locale);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-6 py-16 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-10" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <AuthHeader locale={locale} />
        <RegisterForm t={t} defaultCountryCode={country.code} />
      </div>
    </main>
  );
}
