import { siteConfig } from "@/lib/site";

/**
 * Builds the JSON-LD graph injected into the document head.
 *
 * We expose the business as a `GeneralContractor` / `HomeAndConstructionBusiness`
 * (a LocalBusiness subtype well understood by Google) alongside the `WebSite`
 * and `WebPage` nodes. Using a single `@graph` with stable `@id`s lets the
 * nodes reference one another, which search engines reward.
 */
export function buildJsonLd() {
  const { url } = siteConfig;

  const organization = {
    "@type": ["GeneralContractor", "HomeAndConstructionBusiness"],
    "@id": `${url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url,
    logo: {
      "@type": "ImageObject",
      "@id": `${url}/#logo`,
      url: `${url}/icon`,
    },
    image: `${url}/opengraph-image`,
    description: siteConfig.description,
    foundingDate: String(siteConfig.foundingYear),
    slogan: siteConfig.tagline,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    areaServed: {
      "@type": "Country",
      name: siteConfig.country,
    },
    knowsAbout: [
      "Custom home building",
      "Residential architecture",
      "Knockdown rebuild",
      "Interior design",
      "Sustainable construction",
    ],
    sameAs: Object.values(siteConfig.social),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.localeBcp47,
    publisher: { "@id": `${url}/#organization` },
  };

  const webpage = {
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name: `${siteConfig.name} — Architectural Home Builders in Australia`,
    description: siteConfig.description,
    inLanguage: siteConfig.localeBcp47,
    isPartOf: { "@id": `${url}/#website` },
    about: { "@id": `${url}/#organization` },
    primaryImageOfPage: `${url}/opengraph-image`,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, webpage],
  };
}
