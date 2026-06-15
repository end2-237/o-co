import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** XML sitemap served at /sitemap.xml. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
