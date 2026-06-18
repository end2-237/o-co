"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IconClose } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export type LightboxItem = {
  src: string;
  alt: string;
  name: string;
  location: string;
  type: string;
};

const DURATION = 900;
const MAX_DISPLACE = 70;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const SIZE_EASE = "cubic-bezier(0.7, 0, 0.18, 1)";
const SIZE_TRANSITION = (["top", "left", "width", "height", "border-radius"] as const)
  .map((p) => `${p} ${DURATION}ms ${SIZE_EASE}`)
  .join(", ");

/**
 * Fullscreen image lightbox with a cloth/drape reveal on open, and prev/next
 * navigation through a gallery (buttons, arrow keys, swipe).
 */
export function Lightbox({
  items,
  index,
  rect,
  onClose,
}: {
  items: LightboxItem[];
  index: number;
  rect: DOMRect;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);
  const n = items.length;
  const item = items[current];

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const reduceRef = useRef(false);
  const closingRef = useRef(false);
  const rafRef = useRef(0);
  const touchX = useRef(0);

  const go = useCallback((dir: number) => setCurrent((c) => (c + dir + n) % n), [n]);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const c = containerRef.current;
    if (reduceRef.current || !c) {
      onClose();
      return;
    }
    if (backdropRef.current) backdropRef.current.style.opacity = "0";
    if (imageRef.current) imageRef.current.style.filter = "none";
    c.style.top = `${rect.top}px`;
    c.style.left = `${rect.left}px`;
    c.style.width = `${rect.width}px`;
    c.style.height = `${rect.height}px`;
    c.style.borderRadius = "16px";
    c.style.opacity = "0";
    window.setTimeout(onClose, DURATION);
  }, [onClose, rect]);

  useEffect(() => {
    const c = containerRef.current;
    const img = imageRef.current;
    if (!c) return;

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    closeBtnRef.current?.focus();

    const expand = () => {
      c.style.top = "0px";
      c.style.left = "0px";
      c.style.width = "100vw";
      c.style.height = "100svh";
      c.style.borderRadius = "0px";
    };

    if (reduceRef.current) {
      expand();
      if (backdropRef.current) backdropRef.current.style.opacity = "1";
    } else {
      rafRef.current = requestAnimationFrame(() => {
        c.style.transition = SIZE_TRANSITION;
        if (backdropRef.current) backdropRef.current.style.opacity = "1";
        if (img) img.style.filter = "url(#oco-drape)";
        expand();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          const e = easeOutCubic(t);
          const scale = MAX_DISPLACE * (1 - e);
          dispRef.current?.setAttribute("scale", String(scale));
          turbRef.current?.setAttribute(
            "baseFrequency",
            `${(0.008 + 0.014 * (1 - e)).toFixed(4)} ${(0.014 + 0.03 * (1 - e)).toFixed(4)}`,
          );
          if (t < 1) {
            rafRef.current = requestAnimationFrame(tick);
          } else if (img) {
            img.style.filter = "none";
          }
        };
        rafRef.current = requestAnimationFrame(tick);
      });
    }

    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") close();
      else if (ev.key === "ArrowLeft") go(-1);
      else if (ev.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      root.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [close, go]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name}, ${item.location}`}
      className="fixed inset-0 z-[100]"
    >
      <div
        ref={backdropRef}
        onClick={close}
        className="absolute inset-0 bg-ink/95 transition-opacity duration-500"
        style={{ opacity: 0 }}
      />

      <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
        <filter id="oco-drape" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence
            ref={turbRef}
            type="turbulence"
            baseFrequency="0.022 0.044"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feDisplacementMap
            ref={dispRef}
            in="SourceGraphic"
            in2="noise"
            scale={MAX_DISPLACE}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div
        ref={containerRef}
        className="absolute overflow-hidden"
        style={{
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          borderRadius: 16,
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current}
          ref={imageRef}
          src={item.src}
          alt={item.alt}
          className={cn("h-full w-full object-cover", n > 1 && "animate-fade")}
          draggable={false}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-8 text-cream sm:p-12">
          <div>
            <span className="inline-block rounded-full border border-cream/40 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em]">
              {item.type}
            </span>
            <h3 className="mt-3 font-display text-3xl font-medium sm:text-4xl">{item.name}</h3>
            <p className="mt-1 text-cream/75">{item.location}</p>
          </div>
          {n > 1 && (
            <span className="shrink-0 text-sm font-medium text-cream/70">
              {current + 1} / {n}
            </span>
          )}
        </div>
      </div>

      {n > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-4 top-1/2 z-[101] inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 bg-ink/40 text-2xl text-cream backdrop-blur-sm transition-colors hover:bg-ink/70 sm:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-4 top-1/2 z-[101] inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 bg-ink/40 text-2xl text-cream backdrop-blur-sm transition-colors hover:bg-ink/70 sm:right-6"
          >
            ›
          </button>
        </>
      )}

      <button
        ref={closeBtnRef}
        type="button"
        onClick={close}
        aria-label="Close"
        className="absolute right-4 top-5 z-[101] inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 bg-ink/40 text-2xl text-cream backdrop-blur-sm transition-colors hover:bg-ink/70 sm:right-6"
      >
        <IconClose />
      </button>
    </div>
  );
}
