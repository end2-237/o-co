import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PropertyGallery } from "@/components/sections/PropertyGallery";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, localeMeta } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { getProperty } from "@/lib/properties";
import { siteConfig, waLink } from "@/lib/site";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return en.properties.items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const property = getProperty(getDictionary(locale), slug);
  if (!property) return {};
  const title = `${property.name} — ${property.location}`;
  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description: property.summary,
    alternates: {
      canonical: `/${locale}/properties/${slug}`,
      languages: {
        fr: `/fr/properties/${slug}`,
        en: `/en/properties/${slug}`,
        "x-default": `/en/properties/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      url: `${siteConfig.url}/${locale}/properties/${slug}`,
      title,
      description: property.summary,
    },
  };
}

export default async function PropertyPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const property = getProperty(dict, slug);
  if (!property) notFound();

  const d = dict.propertyDetail;
  const onRequest = dict.properties.priceOnRequest;
  const statusLabel =
    property.status === "rent" ? dict.properties.forRent : dict.properties.forSale;
  const schemaType = /villa|house|maison/i.test(property.type) ? "House" : "Apartment";
  const surfaceValue = parseInt(property.surface, 10) || undefined;
  const initials = property.agentName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const facts = [
    { label: d.labels.price, value: onRequest },
    { label: d.labels.type, value: property.type },
    { label: d.labels.beds, value: String(property.beds) },
    { label: d.labels.baths, value: String(property.baths) },
    { label: d.labels.surface, value: property.surface },
    { label: d.labels.status, value: statusLabel },
    { label: d.labels.location, value: property.location },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: property.name,
    description: property.description,
    url: `${siteConfig.url}/${locale}/properties/${slug}`,
    image: `${siteConfig.url}${property.image.src}`,
    numberOfBedrooms: property.beds,
    numberOfBathroomsTotal: property.baths,
    ...(surfaceValue
      ? { floorSize: { "@type": "QuantitativeValue", value: surfaceValue, unitCode: "MTK" } }
      : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressCountry: siteConfig.address.country,
    },
  };

  return (
    <article className="bg-cream pb-24 pt-28 sm:pt-32">
      <Container>
        <Link
          href={`/${locale}/properties`}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-ink"
        >
          ← {d.back}
        </Link>

        <div className="mt-6">
          <PropertyGallery
            image={property.image}
            alt={property.alt}
            name={property.name}
            location={property.location}
            type={property.type}
            hint={d.galleryHint}
          />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="inline-flex rounded-full bg-ink/5 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink/70">
              {statusLabel}
            </span>
            <h1 className="mt-4 font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">
              {property.name}
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-ink/55">
              {property.type} · {property.location}
            </p>
            <p className="mt-4 font-display text-2xl font-medium text-ink">{onRequest}</p>
            <p className="mt-3 text-ink/65">
              {property.beds} {dict.properties.bedsLabel} · {property.baths}{" "}
              {dict.properties.bathsLabel} · {property.surface}
            </p>

            <h2 className="mt-12 font-display text-2xl font-medium text-ink">{d.overviewTitle}</h2>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink/70">
              {property.description}
            </p>

            <h2 className="mt-12 font-display text-2xl font-medium text-ink">{d.locationTitle}</h2>
            <div className="mt-4 flex aspect-[16/7] flex-col items-center justify-center rounded-2xl border border-ink/10 bg-sand-soft text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-cream">
                ◉
              </span>
              <p className="mt-4 font-display text-xl text-ink">{property.location}</p>
              <p className="mt-1 text-sm text-ink/55">{d.locationNote}</p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-ink/10 bg-bone p-7">
              <h2 className="text-xs uppercase tracking-[0.2em] text-ink/45">{d.factsTitle}</h2>
              <dl className="mt-5 divide-y divide-ink/10">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-center justify-between py-3 text-sm">
                    <dt className="text-ink/55">{f.label}</dt>
                    <dd className="font-medium text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-4 rounded-2xl border border-ink/10 bg-bone p-7">
              <h2 className="text-xs uppercase tracking-[0.2em] text-ink/45">{d.agentTitle}</h2>
              <div className="mt-5 flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-ink font-display text-base font-semibold text-cream">
                  {initials}
                </span>
                <div>
                  <p className="font-display text-lg font-medium text-ink">{property.agentName}</p>
                  <p className="text-sm text-ink/55">{property.agentRole}</p>
                </div>
              </div>
              <div className="mt-6">
                <WhatsAppButton
                  href={waLink(
                    `${dict.whatsapp.viewingMessage} ${property.name} (${property.location}).`,
                  )}
                  label={dict.whatsapp.viewing}
                />
              </div>
            </div>
          </aside>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
