import { cookies } from "next/headers";
import { findCountryByCode, type Country } from "@/lib/countries";

export const COUNTRY_COOKIE = "country";

export async function getCountry(): Promise<Country> {
  const cookieStore = await cookies();
  const code = cookieStore.get(COUNTRY_COOKIE)?.value;
  return findCountryByCode(code);
}
