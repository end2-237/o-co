import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Dashboard, type DashMedia } from "@/components/dashboard/Dashboard";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";
import { getProperties } from "@/lib/properties";
import { siteConfig } from "@/lib/site";

type Params = Promise<{ locale: string }>;

export const metadata: Metadata = {
  title: "Console",
  robots: { index: false, follow: false },
};

export default async function DashboardPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const props = getProperties(dict);

  const properties = props.map((p) => ({
    slug: p.slug,
    name: p.name,
    location: p.location,
    type: p.type,
    status: p.status,
    beds: p.beds,
    baths: p.baths,
    surface: p.surface,
    cover: p.image.src,
    images: p.gallery.length,
  }));

  const mediaMap = new Map<string, DashMedia>();
  props.forEach((p) =>
    p.gallery.forEach((img, i) => {
      if (!mediaMap.has(img.src)) {
        mediaMap.set(img.src, { src: img.src, name: `${p.name} · ${i + 1}`, kind: "image" });
      }
    }),
  );

  const media: DashMedia[] = [
    ...Array.from(mediaMap.values()),
    { src: "/videos/hero.mp4", name: "Hero", kind: "video" },
    { src: "/videos/reels/r1.mp4", name: "Reel 1", kind: "video" },
    { src: "/videos/reels/r2.mp4", name: "Reel 2", kind: "video" },
    { src: "/videos/reels/r3.mp4", name: "Reel 3", kind: "video" },
    { src: "/videos/reels/r5.mp4", name: "Reel 4", kind: "video" },
  ];

  return (
    <Dashboard
      locale={locale}
      properties={properties}
      media={media}
      site={{
        name: siteConfig.name,
        email: siteConfig.contact.email,
        phone: siteConfig.contact.phone,
        whatsapp: siteConfig.whatsapp,
        tiktok: siteConfig.social.tiktok,
      }}
    />
  );
}
