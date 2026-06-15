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
import { AssembleHeading } from "@/components/ui/AssembleHeading";
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

const SHUFFLE_MS = 3200; // time between swaps
const SWAP_MS = 1100; // duration of each slide — slow and clearly visible
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Pos = { top: number; left: number };

/**
 * Home showcase — an editorial gallery of selected projects.
 *
 * The four equal cards gently interchange positions on a timer using a FLIP
 * animation: layout positions are read with offsetTop/offsetLeft (which ignore
 * transforms), so it only animates a genuine reorder and never fights its own
 * in-flight transition. The feature slot stays put so every move is a pure,
 * smooth translation. Shuffling pauses on hover, while the lightbox is open, on
 * one-column layouts, and for reduced motion. Clicking a card opens a
 * fullscreen lightbox with a cloth/drape distortion reveal.
 */
export function Showcase() {
  const [order, setOrder] = useState<number[]>(() => projects.map((_, i) => i));
  const [active, setActive] = useState<{ item: LightboxItem; rect: DOMRect } | null>(null);
  const [paused, setPaused] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const itemEls = useRef<Map<string, HTMLLIElement>>(new Map());
  const positions = useRef<Map<string, Pos>>(new Map());
  const lastOrder = useRef<number[] | null>(null);

  const measure = () => {
    const map = new Map<string, Pos>();
    itemEls.current.forEach((el, key) =>
      map.set(key, { top: el.offsetTop, left: el.offsetLeft }),
    );
    return map;
  };

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

  // FLIP: animate only when the order actually changes.
  useIsoLayoutEffect(() => {
    if (lastOrder.current === null) {
      positions.current = measure();
      lastOrder.current = order;
      return;
    }
    if (order === lastOrder.current) return;

    const next = measure();
    itemEls.current.forEach((el, key) => {
      const from = positions.current.get(key);
      const to = next.get(key);
      if (!from || !to) return;
      const dx = from.left - to.left;
      const dy = from.top - to.top;
      if (!dx && !dy) return;

      el.style.transition = "none";
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.style.zIndex = "5";
      requestAnimationFrame(() => {
        el.style.transition = `transform ${SWAP_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`;
        el.style.transform = "";
        const clear = () => {
          el.style.zIndex = "";
          el.removeEventListener("transitionend", clear);
        };
        el.addEventListener("transitionend", clear);
      });
    });
    positions.current = next;
    lastOrder.current = order;
  });

  // Re-baseline positions on resize so the next swap animates from the truth.
  useEffect(() => {
    const onResize = () => {
      itemEls.current.forEach((el) => {
        el.style.transition = "none";
        el.style.transform = "";
        el.style.zIndex = "";
      });
      positions.current = measure();
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
            <p
              data-reveal
              className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay"
            >
              <span aria-hidden className="h-px w-10 bg-clay" />
              Selected homes
            </p>
            <AssembleHeading
              variant="mask"
              id="homes-heading"
              text="A portfolio you can picture yourself living in."
              className="mt-6 max-w-2xl text-balance font-display text-4xl font-light leading-tight tracking-tight text-ink sm:text-5xl"
            />
          </div>
          <Link
            href="/#contact"
            data-reveal
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
                  "group relative min-h-[18rem] overflow-hidden rounded-2xl",
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
