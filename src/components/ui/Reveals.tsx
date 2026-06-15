"use client";

import { useEffect, useLayoutEffect } from "react";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Mounted once on the page. Finds every `[data-reveal]` element, hides it
 * (before paint, so there's no flash and it stays visible without JS), then
 * reveals it with a fade + slide as it scrolls into view. An optional
 * `data-reveal-delay` (ms) staggers grouped items.
 */
export function Reveals() {
  useIso(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (els.length === 0) return;

    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(22px)";
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay) || 0;
          if (delay) {
            el.style.transitionDelay = `${delay}ms`;
            // Clear the delay once revealed so later hover transitions are instant.
            window.setTimeout(() => {
              el.style.transitionDelay = "";
            }, delay + 1000);
          }
          el.style.opacity = "1";
          el.style.transform = "none";
          io.unobserve(el);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
