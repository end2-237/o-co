/**
 * Central configuration for O&CO Homes.
 *
 * A single source of truth that feeds the UI, the metadata in the root
 * layout, the sitemap/robots routes and the JSON-LD structured data. Keeping
 * everything here makes the marketing copy and SEO surface easy to audit and
 * update in one place.
 */

export const siteConfig = {
  name: "O&CO Homes",
  shortName: "O&CO",
  legalName: "O&CO Homes Pty Ltd",
  /**
   * Canonical, absolute production URL. Used as `metadataBase` and inside the
   * structured data. Update this to the real domain before launch.
   */
  url: "https://www.ocohomes.com.au",
  locale: "en_AU",
  localeBcp47: "en-AU",
  foundingYear: 2012,
  country: "Australia",
  region: "Based in Australia",

  tagline:
    "Crafting considered spaces where form, function and feeling converge — architectural homes designed and built across Australia.",

  description:
    "O&CO Homes is an architectural home builder based in Australia. Since 2012 we have designed and crafted custom homes, knockdown rebuilds and interiors where form, function and feeling converge.",

  /** Short, punchy description for social cards. */
  ogDescription:
    "Architectural home builders crafting custom homes, knockdown rebuilds and interiors across Australia. Designed and built since 2012.",

  contact: {
    email: "studio@ocohomes.com.au",
    phone: "+61 2 8000 0000",
    phoneHref: "+61280000000",
  },

  address: {
    street: "12 Foundry Lane",
    locality: "Surry Hills",
    region: "NSW",
    postalCode: "2010",
    country: "AU",
  },

  social: {
    facebook: "https://www.facebook.com/ocohomes",
    instagram: "https://www.instagram.com/ocohomes",
    linkedin: "https://www.linkedin.com/company/ocohomes",
    pinterest: "https://www.pinterest.com/ocohomes",
  },

  twitterHandle: "@ocohomes",

  keywords: [
    "architectural home builders",
    "custom homes Australia",
    "luxury home builder",
    "knockdown rebuild",
    "architect designed homes",
    "residential architecture",
    "sustainable homes",
    "bespoke interiors",
    "O&CO Homes",
  ],
} as const;

export type NavItem = { label: string; href: string };

/** Primary navigation — anchors map to section ids on the landing page. */
export const navItems: NavItem[] = [
  { label: "Homes", href: "/#homes" },
  { label: "Approach", href: "/#approach" },
  { label: "Studio", href: "/#studio" },
  { label: "Contact", href: "/#contact" },
];

export type SocialItem = {
  label: string;
  href: string;
  key: keyof typeof siteConfig.social;
};

export const socialItems: SocialItem[] = [
  { label: "Facebook", href: siteConfig.social.facebook, key: "facebook" },
  { label: "Instagram", href: siteConfig.social.instagram, key: "instagram" },
  { label: "LinkedIn", href: siteConfig.social.linkedin, key: "linkedin" },
  { label: "Pinterest", href: siteConfig.social.pinterest, key: "pinterest" },
];
