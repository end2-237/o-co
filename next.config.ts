import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework.
  poweredByHeader: false,
  // Serve modern formats from next/image for smaller, faster hero imagery.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
