"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Property } from "@/lib/properties";
import type { Dictionary } from "@/i18n/dictionaries/en";

type Option = { value: string; label: string };

function FilterRow({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink/45">
        {label}
      </span>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
            value === opt.value
              ? "border-ink bg-ink text-cream"
              : "border-ink/15 text-ink/70 hover:border-ink/40",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Full catalog with type / status / area filters (scales to large portfolios).
 */
export function CatalogGrid({
  locale,
  properties,
  catalog,
  props,
  areas,
}: {
  locale: Locale;
  properties: Property[];
  catalog: Dictionary["catalog"];
  props: Dictionary["properties"];
  areas: { slug: string; name: string }[];
}) {
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [area, setArea] = useState("all");

  const typeOptions = useMemo<Option[]>(() => {
    const unique = Array.from(new Set(properties.map((p) => p.type)));
    return [{ value: "all", label: catalog.all }, ...unique.map((t) => ({ value: t, label: t }))];
  }, [properties, catalog.all]);

  const statusOptions: Option[] = [
    { value: "all", label: catalog.all },
    { value: "sale", label: props.forSale },
    { value: "rent", label: props.forRent },
  ];

  const areaOptions: Option[] = [
    { value: "all", label: catalog.all },
    ...areas.map((a) => ({ value: a.slug, label: a.name })),
  ];

  const filtered = properties.filter(
    (p) =>
      (type === "all" || p.type === type) &&
      (status === "all" || p.status === status) &&
      (area === "all" || p.areaSlug === area),
  );

  return (
    <div>
      <div className="flex flex-col gap-3 border-y border-ink/10 py-6">
        <FilterRow label={catalog.type} value={type} onChange={setType} options={typeOptions} />
        <FilterRow label={catalog.status} value={status} onChange={setStatus} options={statusOptions} />
        <FilterRow label={catalog.area} value={area} onChange={setArea} options={areaOptions} />
      </div>

      <p className="mt-6 text-sm text-ink/55">
        {filtered.length} {catalog.results}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 text-lg text-ink/60">{catalog.empty}</p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => {
            const statusLabel = property.status === "rent" ? props.forRent : props.forSale;
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
                    <p className="mt-1 text-sm font-semibold text-cream/90">{props.priceOnRequest}</p>
                    <p className="mt-2 text-xs text-cream/75">
                      {property.beds} {props.bedsLabel} · {property.baths} {props.bathsLabel} ·{" "}
                      {property.surface}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
