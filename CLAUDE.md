@AGENTS.md

## i18n (Indonesian / English)

This project supports ID/EN via `src/lib/i18n/dictionaries.ts`. **Every user-facing string in the app must go through this dictionary — never hardcode Indonesian or English text directly in a component.**

- Locale is read server-side with `getLocale()` (`src/lib/i18n/get-locale.ts`), cookie-backed, auto-detected on first visit via IP geolocation in `src/proxy.ts`, and switchable at runtime through `LanguageSwitcher`.
- Server components: call `const locale = await getLocale(); const t = getDictionary(locale);` and read strings off `t`.
- Client components (`"use client"`) cannot call `getLocale()`/`getDictionary()` directly — the parent server component must fetch `t` and pass it down as a prop.
- **Never put a function inside `dictionaries.ts`.** Functions aren't serializable across the Server→Client Component boundary and will crash any client component that receives `t` as a prop ("Functions cannot be passed directly to Client Components..."). For strings needing interpolation (a name, a title), store a template string with `{placeholder}` syntax and interpolate with `interpolate()` from `src/lib/i18n/interpolate.ts` — see `t.dashboard.confirmDeleteProgrammer`, `t.dashboard.askStatusMessage` for examples.
- Status labels (project/offer status enums) go through `projectStatusLabel(t, status)` / `offerStatusLabel(t, status)` in `src/lib/status.ts`, not a plain lookup object — colors stay locale-independent and can remain plain objects.
- Locale-aware date formatting: map `locale` to an `Intl`/`toLocaleDateString` locale string (`{ id: "id-ID", en: "en-US" }`) rather than hardcoding `"id-ID"`.
- WhatsApp deep-links (`getWhatsAppLink(locale, message)`) always take `locale` explicitly — pass the actual page's resolved locale, not a hardcoded `"id"`.
- When adding a new page or component with user-facing text: add the keys to **both** the `id` and `en` blocks in `dictionaries.ts` in the same edit, then wire the component to `t`. Run `npx tsc --noEmit` after — a missing key on one locale surfaces as a type error since both blocks are typed against the same shape.
