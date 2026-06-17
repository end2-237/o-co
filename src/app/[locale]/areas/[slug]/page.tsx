import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { IconArrowRight } from "@/components/ui/icons";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, localeMeta } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { getPropertiesByArea } from "@/lib/properties";
import { siteConfig } from "@/lib/site";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return en.areas.list.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const area = getDictionary(locale).areas.list.find((a) => a.slug === slug);
  if (!area) return {};
  const title = `${area.name} — ${area.tagline}`;
  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description: area.description,
    alternates: {
      canonical: `/${locale}/areas/${slug}`,
      languages: {
        fr: `/fr/areas/${slug}`,
        en: `/en/areas/${slug}`,
        "x-default": `/en/areas/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      url: `${siteConfig.url}/${locale}/areas/${slug}`,
      title,
      description: area.description,
    },
  };
}

export default async function AreaPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const area = dict.areas.list.find((a) => a.slug === slug);
  if (!area) notFound();

  const properties = getPropertiesByArea(dict, slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: `${siteConfig.url}/${locale}/areas/${slug}`,
    name: `${area.name} — ${area.tagline}`,
    description: area.description,
    about: { "@type": "Place", name: area.name },
  };

  return (
    <article className="bg-cream pb-24 pt-28 sm:pt-32">
      <Container>
        <Link
          href={`/${locale}#areas`}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-ink"
        >
          ← {dict.areas.heading}
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay">
            <span aria-hidden className="h-px w-10 bg-clay" />
            {dict.areas.eyebrow} · {area.tagline}
          </p>
          <h1 className="mt-6 font-display text-5xl font-light tracking-tight text-ink sm:text-6xl">
            {area.name}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink/70">
            {area.description}
          </p>
        </header>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => {
            const statusLabel =
              property.status === "rent" ? dict.properties.forRent : dict.properties.forSale;
            return (
              <li key={property.slug} className="group relative min-h-[20rem] overflow-hidden rounded-2xl">
                <Link
                  href={`/${locale}/properties/${property.slug}`}
                  aria-label={`${property.name}, ${property.location}`}
                  className="absolute inset-0 z-10"
                />
                <Image
                  src={property.image}
                  alt={property.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent"
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 text-cream">
                  <span className="inline-flex w-fit rounded-full bg-cream/15 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
                    {statusLabel}
                  </span>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.18em] text-cream/75">
                      {property.type} · {property.location}
                    </p>
                    <h2 className="mt-1 font-display text-xl font-medium">{property.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-cream/90">
                      {dict.properties.priceOnRequest}
                    </p>
                    <p className="mt-2 text-xs text-cream/75">
                      {property.beds} {dict.properties.bedsLabel} · {property.baths}{" "}
                      {dict.properties.bathsLabel} · {property.surface}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-16">
          <Link
            href={`/${locale}#contact`}
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-ink-soft"
          >
            {dict.cta.button}
            <IconArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
