import AuthHeader from "@/components/AuthHeader";
import LoginForm from "@/components/LoginForm";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function LoginPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-6 py-16 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-10" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <AuthHeader locale={locale} />
        <LoginForm t={t} />
      </div>
    </main>
  );
}
