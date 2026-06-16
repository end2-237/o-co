/**
 * Locale-agnostic configuration for O&CO (a premium property agency).
 * All display copy lives in the i18n dictionaries; this holds brand, contact,
 * social and address data only.
 */
export const siteConfig = {
  name: "O&CO",
  legalName: "O&CO Property",
  /** Canonical production URL — update to the real domain before launch. */
  url: "https://www.ocohomes.com.au",
  foundingYear: 2012,

  contact: {
    email: "hello@ocohomes.com",
    phone: "+33 1 84 80 00 00",
    phoneHref: "+33184800000",
  },

  address: {
    street: "12 Rue de la Paix",
    locality: "Paris",
    region: "Île-de-France",
    postalCode: "75002",
    country: "FR",
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
