"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
};

const projects: Project[] = [
  {
    img: coastal,
    name: "Saltwater House",
    location: "Noosa, QLD",
    type: "Custom Home",
    alt: "A bright coastal home with a pool framed by palms",
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

const SHUFFLE_MS = 2600;
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Home showcase — an editorial gallery of selected projects.
 *
 * The four equal cards gently interchange positions on a timer using a FLIP
 * animation (measure first/last rects, invert with a transform, then play), so
 * the grid rearranges smoothly rather than snapping. The first (feature) slot
 * stays put so every move is a pure translation. Shuffling pauses on hover,
 * while the lightbox is open, and for reduced motion. Clicking a card opens a
 * fullscreen lightbox with a cloth/drape distortion reveal.
 */
export function Showcase() {
  const [order, setOrder] = useState<number[]>(() => projects.map((_, i) => i));
  const [active, setActive] = useState<{ item: LightboxItem; rect: DOMRect } | null>(null);
  const [paused, setPaused] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const itemEls = useRef<Map<string, HTMLLIElement>>(new Map());
  const prevRects = useRef<Map<string, DOMRect>>(new Map());

  // Enable auto-shuffle only on multi-column layouts and when motion is allowed.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 640px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(wide.matches && !motion.matches);
    sync();
    wide.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  // FLIP: animate any position changes between renders.
  useIsoLayoutEffect(() => {
    itemEls.current.forEach((el, key) => {
      const last = el.getBoundingClientRect();
      const first = prevRects.current.get(key);
      if (first) {
        const dx = first.left - last.left;
        const dy = first.top - last.top;
        if (dx || dy) {
          el.style.transition = "none";
          el.style.transform = `translate(${dx}px, ${dy}px)`;
          requestAnimationFrame(() => {
            el.style.transition = "transform 750ms cubic-bezier(0.22, 1, 0.36, 1)";
            el.style.transform = "";
          });
        }
      }
      prevRects.current.set(key, last);
    });
  });

  // Keep stored rects fresh on resize so a later shuffle animates correctly.
  useEffect(() => {
    const onResize = () => {
      itemEls.current.forEach((el, key) => {
        el.style.transition = "none";
        el.style.transform = "";
        prevRects.current.set(key, el.getBoundingClientRect());
      });
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Periodically swap two of the equal (non-feature) cards.
  useEffect(() => {
    if (!enabled || paused || active) return;
    const id = window.setInterval(() => {
      setOrder((prev) => {
        const span = prev.length - 1; // positions 1..n-1 (slot 0 stays put)
        if (span < 2) return prev;
        const a = 1 + Math.floor(Math.random() * span);
        let b = 1 + Math.floor(Math.random() * span);
        if (b === a) b = (a % span) + 1; // a distinct partner in 1..span
        const next = [...prev];
        [next[a], next[b]] = [next[b], next[a]];
        return next;
      });
    }, SHUFFLE_MS);
    return () => window.clearInterval(id);
  }, [enabled, paused, active]);

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

        <ul
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[21rem] lg:grid-cols-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {order.map((index, pos) => {
            const project = projects[index];
            return (
              <li
                key={project.name}
                ref={(el) => {
                  if (el) itemEls.current.set(project.name, el);
                  else itemEls.current.delete(project.name);
                }}
                className={cn(
                  "group relative min-h-[18rem] overflow-hidden rounded-2xl will-change-transform",
                  pos === 0 && "lg:row-span-2",
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
            );
          })}
        </ul>
      </Container>

      {active && (
        <Lightbox item={active.item} rect={active.rect} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
