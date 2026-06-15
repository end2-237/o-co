"use client";

import { Fragment, useEffect, useLayoutEffect, useRef } from "react";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Deterministic pseudo-random in [0,1) so SSR and client agree.
function rand(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Heading whose letters start scattered (drifting in from above, as if blown
 * out of the previous section) and **recompose into the phrase** when it
 * scrolls into view. Pure CSS transitions with a per-letter delay; the visible
 * default is the settled text, so it stays readable without JS and for
 * reduced-motion.
 */
export function AssembleHeading({
  text,
  id,
  className,
}: {
  text: string;
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useIso(() => {
    const el = ref.current;
    if (!el) return;
    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-letter]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Scatter (before paint) so there's no flash of the assembled text.
    letters.forEach((l, i) => {
      const dx = (rand(i, 1) * 2 - 1) * 42;
      const dy = -34 - rand(i, 2) * 72; // from above
      const rot = (rand(i, 3) * 2 - 1) * 18;
      l.style.opacity = "0";
      l.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
    });

    const N = letters.length || 1;
    const step = Math.min(34, 700 / N);
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (done || !entries.some((e) => e.isIntersecting)) return;
        done = true;
        letters.forEach((l, i) => {
          l.style.transition = `transform 900ms cubic-bezier(0.16,1,0.3,1) ${i * step}ms, opacity 600ms ease ${i * step}ms`;
          requestAnimationFrame(() => {
            l.style.opacity = "1";
            l.style.transform = "translate(0,0) rotate(0deg)";
          });
        });
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <h2 ref={ref} id={id} className={className} aria-label={text}>
      {text.split(" ").map((word, wi, arr) => (
        <Fragment key={wi}>
          <span className="inline-block whitespace-nowrap">
            {[...word].map((ch, ci) => (
              <span key={ci} data-letter className="inline-block will-change-transform">
                {ch}
              </span>
            ))}
          </span>
          {wi < arr.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h2>
  );
}
