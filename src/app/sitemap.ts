import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { locales } from "@/i18n/config";

/** XML sitemap with both locales and hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${siteConfig.url}/${l}`]),
  );

  return locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages },
  }));
}
