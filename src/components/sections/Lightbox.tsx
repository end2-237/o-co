"use client";

import { useCallback, useEffect, useRef } from "react";
import { IconClose } from "@/components/ui/icons";

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
 * Fullscreen image lightbox with a "drape" reveal.
 *
 * The image grows from the clicked card's rect (FLIP-style, animating
 * top/left/width/height so `object-cover` keeps the aspect honest) while an
 * SVG turbulence + displacement filter distorts it like rippling cloth, the
 * displacement easing to zero so it settles flat once fully spread.
 */
export function Lightbox({
  item,
  rect,
  onClose,
}: {
  item: LightboxItem;
  rect: DOMRect;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const reduceRef = useRef(false);
  const closingRef = useRef(false);
  const rafRef = useRef(0);

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

    // Lock background scroll while open.
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
      // No motion — snap to fullscreen.
      expand();
      if (backdropRef.current) backdropRef.current.style.opacity = "1";
    } else {
      // Next frame: enable transition + apply the drape filter, then expand.
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
            img.style.filter = "none"; // crisp + cheap once settled
          }
        };
        rafRef.current = requestAnimationFrame(tick);
      });
    }

    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      root.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [close]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name}, ${item.location}`}
      className="fixed inset-0 z-[100]"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={close}
        className="absolute inset-0 bg-ink/95 transition-opacity duration-500"
        style={{ opacity: 0 }}
      />

      {/* Hidden filter definition */}
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

      {/* Animated image container (starts at the card's rect) */}
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
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-cover"
          draggable={false}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-8 text-cream sm:p-12">
          <span className="inline-block rounded-full border border-cream/40 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em]">
            {item.type}
          </span>
          <h3 className="mt-3 font-display text-3xl font-medium sm:text-4xl">
            {item.name}
          </h3>
          <p className="mt-1 text-cream/75">{item.location}</p>
        </div>
      </div>

      {/* Close */}
      <button
        ref={closeBtnRef}
        type="button"
        onClick={close}
        aria-label="Close"
        className="absolute right-5 top-5 z-[101] inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 bg-ink/40 text-2xl text-cream backdrop-blur-sm transition-colors hover:bg-ink/70"
      >
        <IconClose />
      </button>
    </div>
  );
}
