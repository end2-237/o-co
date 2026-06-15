"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { IconArrowRight } from "@/components/ui/icons";
import { Lightbox, type LightboxItem } from "@/components/sections/Lightbox";
import { cn } from "@/lib/utils";
import coastal from "@/assets/images/home-coastal.jpg";
import living from "@/assets/images/home-living.jpg";
import modern from "@/assets/images/home-modern.jpg";
import interior from "@/assets/images/home-interior.jpg";
import pool from "@/assets/images/home-pool.jpg";

type Project = {
  img: StaticImageData;
  name: string;
  location: string;
  type: string;
  alt: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    img: coastal,
    name: "Saltwater House",
    location: "Noosa, QLD",
    type: "Custom Home",
    alt: "A bright coastal home with a pool framed by palms",
    featured: true,
  },
  {
    img: living,
    name: "North Light",
    location: "Surry Hills, NSW",
    type: "Interiors",
    alt: "A warm living room with leather seating and a forest outlook",
  },
  {
    img: modern,
    name: "Ironbark",
    location: "Mornington, VIC",
    type: "Architectural",
    alt: "A modern home with timber cladding and a landscaped entry",
  },
  {
    img: interior,
    name: "Gallery House",
    location: "Fitzroy, VIC",
    type: "Interiors",
    alt: "A sunlit living room with a framed gallery wall and greenery",
  },
  {
    img: pool,
    name: "The Esplanade",
    location: "Mosman, NSW",
    type: "Knockdown Rebuild",
    alt: "A white contemporary home opening onto a pool terrace",
  },
];

/**
 * Home showcase — an editorial gallery of selected projects. Clicking a card
 * opens a fullscreen lightbox with a cloth/drape distortion reveal.
 */
export function Showcase() {
  const [active, setActive] = useState<{ item: LightboxItem; rect: DOMRect } | null>(null);

  return (
    <section id="homes" aria-labelledby="homes-heading" className="bg-cream py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay">
              <span aria-hidden className="h-px w-10 bg-clay" />
              Selected homes
            </p>
            <h2
              id="homes-heading"
              className="mt-6 max-w-2xl text-balance font-display text-4xl font-light leading-tight tracking-tight text-ink sm:text-5xl"
            >
              A portfolio you can picture yourself living in.
            </h2>
          </div>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 self-start text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-clay md:self-auto"
          >
            Start your project
            <IconArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[21rem] lg:grid-cols-3">
          {projects.map((project) => (
            <li
              key={project.name}
              className={cn(
                "group relative min-h-[18rem] overflow-hidden rounded-2xl",
                project.featured && "lg:row-span-2",
              )}
            >
              <Image
                src={project.img}
                alt={project.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent"
              />
              <button
                type="button"
                aria-label={`View ${project.name}, ${project.location}`}
                onClick={(e) =>
                  setActive({
                    item: {
                      src: project.img.src,
                      alt: project.alt,
                      name: project.name,
                      location: project.location,
                      type: project.type,
                    },
                    rect: e.currentTarget.getBoundingClientRect(),
                  })
                }
                className="absolute inset-0 z-10 cursor-pointer"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-cream sm:p-7">
                <span className="inline-block rounded-full border border-cream/40 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-cream/90">
                  {project.type}
                </span>
                <h3 className="mt-3 font-display text-2xl font-medium">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-cream/75">{project.location}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      {active && (
        <Lightbox item={active.item} rect={active.rect} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
