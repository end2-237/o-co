import { siteConfig } from "@/lib/site";
import { localeMeta, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

/**
 * JSON-LD graph for the page. O&CO is exposed as a `RealEstateAgent`
 * (a LocalBusiness subtype) alongside the `WebSite` and localized `WebPage`.
 */
export function buildJsonLd(locale: Locale, dict: Dictionary) {
  const base = siteConfig.url;
  const pageUrl = `${base}/${locale}`;

  const organization = {
    "@type": "RealEstateAgent",
    "@id": `${base}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: base,
    logo: {
      "@type": "ImageObject",
      "@id": `${base}/#logo`,
      url: `${base}/icon`,
    },
    image: `${base}/opengraph-image`,
    description: dict.meta.description,
    foundingDate: String(siteConfig.foundingYear),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    areaServed: { "@type": "City", name: siteConfig.address.locality },
    knowsAbout: [
      "Premium real estate",
      "Property sourcing",
      "Home staging",
      "Sales and lettings",
      "Luxury apartments and villas",
    ],
    sameAs: Object.values(siteConfig.social),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: siteConfig.name,
    description: dict.meta.description,
    inLanguage: localeMeta[locale].htmlLang,
    publisher: { "@id": `${base}/#organization` },
  };

  const webpage = {
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    url: pageUrl,
    name: dict.meta.title,
    description: dict.meta.description,
    inLanguage: localeMeta[locale].htmlLang,
    isPartOf: { "@id": `${base}/#website` },
    about: { "@id": `${base}/#organization` },
    primaryImageOfPage: `${base}/opengraph-image`,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, webpage],
  };
}
