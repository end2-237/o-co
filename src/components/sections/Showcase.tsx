"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { IconArrowRight } from "@/components/ui/icons";
import { Lightbox, type LightboxItem } from "@/components/sections/Lightbox";
import { AssembleHeading } from "@/components/ui/AssembleHeading";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/en";
import coastal from "@/assets/images/home-coastal.jpg";
import living from "@/assets/images/home-living.jpg";
import modern from "@/assets/images/home-modern.jpg";
import interior from "@/assets/images/home-interior.jpg";
import pool from "@/assets/images/home-pool.jpg";

const images = [coastal, living, modern, interior, pool];

const SHUFFLE_MS = 3200;
const SWAP_MS = 1100;
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Pos = { top: number; left: number };

/**
 * Featured-properties gallery. The four equal cards interchange positions on a
 * timer (FLIP) and clicking a card opens a fullscreen lightbox with a drape
 * distortion reveal.
 */
export function Showcase({ t }: { t: Dictionary["properties"] }) {
  const items = t.items;
  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i));
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
        el.style.transition = `transform ${SWAP_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
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

  useEffect(() => {
    if (!enabled || paused || active) return;
    const id = window.setInterval(() => {
      setOrder((prev) => {
        const span = prev.length - 1;
        if (span < 2) return prev;
        const a = 1 + Math.floor(Math.random() * span);
        let b = 1 + Math.floor(Math.random() * span);
        if (b === a) b = (a % span) + 1;
        const nextOrder = [...prev];
        [nextOrder[a], nextOrder[b]] = [nextOrder[b], nextOrder[a]];
        return nextOrder;
      });
    }, SHUFFLE_MS);
    return () => window.clearInterval(id);
  }, [enabled, paused, active]);

  return (
    <section id="properties" aria-labelledby="properties-heading" className="bg-cream py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              data-reveal
              className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay"
            >
              <span aria-hidden className="h-px w-10 bg-clay" />
              {t.eyebrow}
            </p>
            <AssembleHeading
              variant="mask"
              id="properties-heading"
              text={t.heading}
              className="mt-6 max-w-2xl text-balance font-display text-4xl font-light leading-tight tracking-tight text-ink sm:text-5xl"
            />
          </div>
          <Link
            href="#contact"
            data-reveal
            className="group inline-flex items-center gap-2 self-start text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-clay md:self-auto"
          >
            {t.cta}
            <IconArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <ul
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[21rem] lg:grid-cols-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {order.map((index, pos) => {
            const item = items[index];
            const image = images[index];
            const statusLabel = item.status === "rent" ? t.forRent : t.forSale;
            return (
              <li
                key={item.name}
                ref={(el) => {
                  if (el) itemEls.current.set(item.name, el);
                  else itemEls.current.delete(item.name);
                }}
                className={cn(
                  "group relative min-h-[18rem] overflow-hidden rounded-2xl",
                  pos === 0 && "lg:row-span-2",
                )}
              >
                <Image
                  src={image}
                  alt={item.alt}
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
                  aria-label={`${item.name}, ${item.location}`}
                  onClick={(e) =>
                    setActive({
                      item: {
                        src: image.src,
                        alt: item.alt,
                        name: item.name,
                        location: `${item.location} · ${item.price}`,
                        type: item.type,
                      },
                      rect: e.currentTarget.getBoundingClientRect(),
                    })
                  }
                  className="absolute inset-0 z-10 cursor-pointer"
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 text-cream sm:p-6">
                  <span className="inline-flex w-fit rounded-full bg-cream/15 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
                    {statusLabel}
                  </span>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.18em] text-cream/75">
                      {item.type} · {item.location}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-medium">{item.name}</h3>
                    <p className="mt-1 text-lg font-semibold">{item.price}</p>
                  </div>
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
