import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { buildJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, localeMeta } from "@/i18n/config";

const display = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
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
  const dict = getDictionary(locale);
  const jsonLd = buildJsonLd(locale, dict);

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-cream"
        >
          {dict.a11y.skipToContent}
        </a>

        <SiteHeader
          locale={locale}
          nav={dict.nav}
          cta={dict.header.cta}
          a11y={dict.a11y}
          email={siteConfig.contact.email}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} t={dict.footer} nav={dict.nav} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
