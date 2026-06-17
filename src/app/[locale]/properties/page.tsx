import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CatalogGrid } from "@/components/sections/CatalogGrid";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, localeMeta } from "@/i18n/config";
import { getProperties } from "@/lib/properties";
import { siteConfig } from "@/lib/site";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: dict.catalog.title,
    description: dict.catalog.intro,
    alternates: {
      canonical: `/${locale}/properties`,
      languages: {
        fr: "/fr/properties",
        en: "/en/properties",
        "x-default": "/en/properties",
      },
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      url: `${siteConfig.url}/${locale}/properties`,
      title: dict.catalog.title,
      description: dict.catalog.intro,
    },
  };
}

export default async function CatalogPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const properties = getProperties(dict);

  return (
    <div className="bg-cream pb-24 pt-28 sm:pt-32">
      <Container>
        <header className="max-w-3xl">
          <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay">
            <span aria-hidden className="h-px w-10 bg-clay" />
            {dict.properties.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-5xl font-light tracking-tight text-ink sm:text-6xl">
            {dict.catalog.title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink/70">
            {dict.catalog.intro}
          </p>
        </header>

        <div className="mt-12">
          <CatalogGrid
            locale={locale}
            properties={properties}
            catalog={dict.catalog}
            props={dict.properties}
            areas={dict.areas.list.map((a) => ({ slug: a.slug, name: a.name }))}
          />
        </div>
      </Container>
    </div>
  );
}
