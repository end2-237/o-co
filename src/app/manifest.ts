import type { MetadataRoute } from "next";

/** Web app manifest served at /manifest.webmanifest. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "O&CO — Premium Property Agency",
    short_name: "O&CO",
    description:
      "Premium property agency. We source, style and showcase exceptional homes.",
    start_url: "/",
    display: "standalone",
    background_color: "#14233b",
    theme_color: "#f4f0e8",
    categories: ["business", "real estate", "lifestyle"],
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/brand-icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand-icon", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
