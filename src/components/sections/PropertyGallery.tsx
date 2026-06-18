"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Lightbox, type LightboxItem } from "@/components/sections/Lightbox";

/**
 * Property gallery: a large cover plus a thumbnail strip. Clicking any image
 * opens the fullscreen drape lightbox at that index, with prev/next.
 */
export function PropertyGallery({
  images,
  alt,
  name,
  location,
  type,
  hint,
}: {
  images: StaticImageData[];
  alt: string;
  name: string;
  location: string;
  type: string;
  hint: string;
}) {
  const [active, setActive] = useState<{ index: number; rect: DOMRect } | null>(null);
  const items: LightboxItem[] = images.map((img, i) => ({
    src: img.src,
    alt: i === 0 ? alt : `${name} — ${i + 1}`,
    name,
    location,
    type,
  }));
  const open = (index: number, el: HTMLElement) =>
    setActive({ index, rect: el.getBoundingClientRect() });

  return (
    <>
      <button
        type="button"
        onClick={(e) => open(0, e.currentTarget)}
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink"
      >
        <Image
          src={images[0]}
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

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.slice(1).map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => open(i + 1, e.currentTarget)}
              aria-label={`${name} — ${i + 2}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-xl bg-ink"
            >
              <Image
                src={img}
                alt=""
                fill
                placeholder="blur"
                sizes="(min-width: 640px) 18vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      )}

      {active && (
        <Lightbox
          items={items}
          index={active.index}
          rect={active.rect}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
