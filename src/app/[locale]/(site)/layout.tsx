import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MusicProvider } from "@/components/audio/MusicProvider";
import { buildJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";

export default async function SiteLayout({
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
    <MusicProvider src="/audio/woman-glow.mp3" title="Woman's Glow">
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
      <SiteFooter locale={locale} t={dict.footer} nav={dict.nav} areas={dict.areas.list} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </MusicProvider>
  );
}
