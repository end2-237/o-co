"use client";

import { Fragment, useEffect, useLayoutEffect, useRef } from "react";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Deterministic pseudo-random in [0,1) so SSR and client agree.
function rand(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export type HeadingVariant = "recompose" | "mask" | "words" | "flip";

/**
 * Heading with a choice of scroll-triggered entrance animations, so different
 * sections don't all animate the same way:
 *
 * - `recompose` — letters start scattered (from above) and reassemble.
 * - `mask`      — words slide up from behind a mask (overflow clip).
 * - `words`     — words fade + slide up, one after another.
 * - `flip`      — letters flip up in 3D.
 *
 * The settled text is the default render, so it stays readable without JS and
 * for reduced motion; an aria-label keeps it clean for screen readers.
 */
export function AssembleHeading({
  text,
  id,
  className,
  variant = "recompose",
}: {
  text: string;
  id?: string;
  className?: string;
  variant?: HeadingVariant;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useIso(() => {
    const root = ref.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-l]"));
    if (els.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const N = els.length;
    const isLetters = variant === "recompose" || variant === "flip";
    const step = isLetters ? Math.min(30, 600 / N) : Math.min(85, 520 / N);

    const setState = (el: HTMLElement, i: number, phase: "init" | "in") => {
      switch (variant) {
        case "recompose":
          if (phase === "init") {
            el.style.opacity = "0";
            el.style.transform = `translate(${(rand(i, 1) * 2 - 1) * 42}px, ${-34 - rand(i, 2) * 72}px) rotate(${(rand(i, 3) * 2 - 1) * 18}deg)`;
          } else {
            el.style.opacity = "1";
            el.style.transform = "translate(0,0) rotate(0deg)";
          }
          break;
        case "flip":
          if (phase === "init") {
            el.style.opacity = "0";
            el.style.transform = "rotateX(-90deg)";
          } else {
            el.style.opacity = "1";
            el.style.transform = "none";
          }
          break;
        case "mask":
          el.style.transform = phase === "init" ? "translateY(110%)" : "translateY(0)";
          break;
        default: // words
          if (phase === "init") {
            el.style.opacity = "0";
            el.style.transform = "translateY(0.6em)";
          } else {
            el.style.opacity = "1";
            el.style.transform = "none";
          }
      }
    };

    const transition = (i: number) => {
      const d = Math.round(i * step);
      switch (variant) {
        case "recompose":
          return `transform 900ms cubic-bezier(0.16,1,0.3,1) ${d}ms, opacity 600ms ease ${d}ms`;
        case "flip":
          return `transform 750ms cubic-bezier(0.2,0.7,0.2,1) ${d}ms, opacity 400ms ease ${d}ms`;
        case "mask":
          return `transform 850ms cubic-bezier(0.16,1,0.3,1) ${d}ms`;
        default:
          return `transform 700ms cubic-bezier(0.16,1,0.3,1) ${d}ms, opacity 600ms ease ${d}ms`;
      }
    };

    els.forEach((el, i) => setState(el, i, "init"));

    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (done || !entries.some((e) => e.isIntersecting)) return;
        done = true;
        els.forEach((el, i) => {
          el.style.transition = transition(i);
          requestAnimationFrame(() => setState(el, i, "in"));
        });
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [variant]);

  const words = text.split(" ");

  let content: React.ReactNode;
  if (variant === "mask") {
    content = words.map((word, wi) => (
      <Fragment key={wi}>
        <span
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.12em" }}
        >
          <span data-l className="inline-block will-change-transform">
            {word}
          </span>
        </span>
        {wi < words.length - 1 ? " " : null}
      </Fragment>
    ));
  } else if (variant === "words") {
    content = words.map((word, wi) => (
      <Fragment key={wi}>
        <span data-l className="inline-block whitespace-nowrap will-change-transform">
          {word}
        </span>
        {wi < words.length - 1 ? " " : null}
      </Fragment>
    ));
  } else {
    content = words.map((word, wi) => (
      <Fragment key={wi}>
        <span className="inline-block whitespace-nowrap">
          {[...word].map((ch, ci) => (
            <span
              key={ci}
              data-l
              className="inline-block will-change-transform"
              style={variant === "flip" ? { transformOrigin: "bottom" } : undefined}
            >
              {ch}
            </span>
          ))}
        </span>
        {wi < words.length - 1 ? " " : null}
      </Fragment>
    ));
  }

  return (
    <h2
      ref={ref}
      id={id}
      className={className}
      aria-label={text}
      style={variant === "flip" ? { perspective: "700px" } : undefined}
    >
      {content}
    </h2>
  );
}
