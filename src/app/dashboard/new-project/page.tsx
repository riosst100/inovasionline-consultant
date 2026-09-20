import NewProjectForm from "@/components/NewProjectForm";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function NewProjectPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return <NewProjectForm t={t} />;
}
