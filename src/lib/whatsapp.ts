import { getDictionary, type Locale } from "@/lib/i18n/dictionaries";

export function getWhatsAppLink(locale: Locale, message?: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890";
  const text = encodeURIComponent(message || getDictionary(locale).contact.whatsappDefaultMessage);
  return `https://wa.me/${number}?text=${text}`;
}
