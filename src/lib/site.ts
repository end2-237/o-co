/**
 * Locale-agnostic configuration for O&CO (a premium property agency, Cameroon).
 * Display copy lives in the i18n dictionaries.
 */
export const siteConfig = {
  name: "O&CO",
  legalName: "O&CO Immobilier",
  /** Canonical production URL — update to the real domain before launch. */
  url: "https://www.oco-immo.cm",
  foundingYear: 2012,

  contact: {
    email: "hello@oco-immo.cm",
    phone: "+237 6 90 00 00 00",
    phoneHref: "237690000000",
  },

  /** WhatsApp number in international format, digits only (for wa.me links). */
  whatsapp: "237690000000",

  address: {
    street: "Rue Joss, Bonanjo",
    locality: "Douala",
    region: "Littoral",
    country: "CM",
  },

  social: {
    tiktok: "https://www.tiktok.com/@ocohomes",
    instagram: "https://www.instagram.com/ocohomes",
    facebook: "https://www.facebook.com/ocohomes",
    linkedin: "https://www.linkedin.com/company/ocohomes",
  },

  twitterHandle: "@ocohomes",
} as const;

export type SocialKey = keyof typeof siteConfig.social;

export const socialItems: { label: string; href: string; key: SocialKey }[] = [
  { label: "TikTok", href: siteConfig.social.tiktok, key: "tiktok" },
  { label: "Instagram", href: siteConfig.social.instagram, key: "instagram" },
  { label: "Facebook", href: siteConfig.social.facebook, key: "facebook" },
  { label: "LinkedIn", href: siteConfig.social.linkedin, key: "linkedin" },
];

/** Build a WhatsApp click-to-chat link with a prefilled message. */
export function waLink(text: string): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}
