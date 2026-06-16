export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
};

/** OpenGraph + html lang values per locale. */
export const localeMeta: Record<Locale, { ogLocale: string; htmlLang: string }> = {
  fr: { ogLocale: "fr_FR", htmlLang: "fr" },
  en: { ogLocale: "en_GB", htmlLang: "en" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
