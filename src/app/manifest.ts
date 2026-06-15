import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** Web app manifest served at /manifest.webmanifest. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#14233b",
    theme_color: "#f4f0e8",
    categories: ["business", "architecture", "lifestyle"],
    icons: [
      { src: "/icon", sizes: "any", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
