"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Lightbox, type LightboxItem } from "@/components/sections/Lightbox";

/**
 * Property hero image that opens the fullscreen drape lightbox on click.
 */
export function PropertyGallery({
  image,
  alt,
  name,
  location,
  type,
  hint,
}: {
  image: StaticImageData;
  alt: string;
  name: string;
  location: string;
  type: string;
  hint: string;
}) {
  const [active, setActive] = useState<{ rect: DOMRect } | null>(null);
  const item: LightboxItem = { src: image.src, alt, name, location, type };

  return (
    <>
      <button
        type="button"
        onClick={(e) => setActive({ rect: e.currentTarget.getBoundingClientRect() })}
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink"
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 75vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute bottom-4 right-4 rounded-full bg-ink/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-cream opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          {hint}
        </span>
      </button>
      {active && (
        <Lightbox item={item} rect={active.rect} onClose={() => setActive(null)} />
      )}
    </>
  );
}
