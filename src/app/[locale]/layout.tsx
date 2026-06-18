import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "../globals.css";
import { siteConfig } from "@/lib/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, localeMeta } from "@/i18n/config";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const title = dict.meta.title;

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: dict.meta.titleTemplate },
    description: dict.meta.description,
    applicationName: siteConfig.name,
    keywords: [...dict.meta.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.legalName,
    category: "Real estate",
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      title,
      description: dict.meta.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.meta.ogDescription,
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: { telephone: true, email: true, address: true },
  };
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#14233b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream">{children}</body>
    </html>
  );
}
