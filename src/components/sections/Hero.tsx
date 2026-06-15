"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import heroImg from "@/assets/images/hero-home.jpg";
import { IconArrowDown, IconArrowRight } from "@/components/ui/icons";

/**
 * Cinematic, scroll-driven hero.
 *
 * Before scroll the media sits centered as a rounded card (86vw × 64vh,
 * radius 16px, zoomed to 1.15). The section is "pinned" for 140% of the
 * viewport and scrubbed 1:1 with scroll: the card opens to fullscreen (via an
 * animated `clip-path` inset, radius → 0), the media de-zooms to 1, a dark
 * overlay fades in (from 25%) and an immersive headline rises in (from 30%).
 *
 * The background is a video that fades in and **starts playing once the card
 * reaches fullscreen**, sitting over an optimized still image (instant first
 * paint + graceful fallback). No animation library — a sticky pin + scroll
 * progress, with prefers-reduced-motion falling back to the still end state.
 */

const PIN_RANGE = 1.4; // section stays pinned for 140% of the viewport height

const OVERLAY_START = 0.25;
const OVERLAY_END = 0.62;
const TEXT_START = 0.3;
const TEXT_END = 0.78;
const VIDEO_FADE_START = 0.8;
const VIDEO_FADE_END = 0.96;
const PLAY_AT = 0.88; // play the video once (near) fullscreen
const HINT_END = 0.12;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const apply = (p: number) => {
      const inset = 1 - p;
      if (frameRef.current) {
        frameRef.current.style.clipPath = `inset(${18 * inset}vh ${7 * inset}vw round ${16 * inset}px)`;
      }
      if (mediaRef.current) {
        mediaRef.current.style.transform = `scale(${1.15 - 0.15 * p})`;
      }
      if (videoRef.current) {
        videoRef.current.style.opacity = String(range(p, VIDEO_FADE_START, VIDEO_FADE_END));
      }
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(range(p, OVERLAY_START, OVERLAY_END));
      }
      if (textRef.current) {
        const t = range(p, TEXT_START, TEXT_END);
        textRef.current.style.opacity = String(t);
        textRef.current.style.transform = `translateY(${40 * (1 - t)}px)`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(clamp01(1 - p / HINT_END));
      }
    };

    const video = videoRef.current;
    if (video) video.muted = true; // required for programmatic autoplay

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Show the fullscreen, fully-revealed end state — still image, no motion.
      section.style.height = "100svh";
      apply(1);
      if (videoRef.current) videoRef.current.style.opacity = "0";
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - vh;
      const p = clamp01(total > 0 ? -rect.top / total : 0);
      apply(p);

      // Launch the video only while it's (near) fullscreen and on screen.
      const onScreen = rect.bottom > 0 && rect.top < vh;
      const shouldPlay = p >= PLAY_AT && onScreen;
      if (video) {
        if (shouldPlay && !playingRef.current) {
          video.play().catch(() => {});
          playingRef.current = true;
        } else if (!shouldPlay && playingRef.current) {
          video.pause();
          playingRef.current = false;
        }
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Introduction"
      className="relative bg-ink"
      style={{ height: `${(1 + PIN_RANGE) * 100}svh` }}
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* The opening card — a full-bleed frame clipped to a rounded window. */}
        <div
          ref={frameRef}
          className="absolute inset-0 [will-change:clip-path]"
          style={{ clipPath: "inset(18vh 7vw round 16px)" }}
        >
          <div
            ref={mediaRef}
            className="absolute inset-0 will-change-transform"
            style={{ transform: "scale(1.15)" }}
          >
            {/* Instant base image (fast first paint + fallback) */}
            <Image
              src={heroImg}
              alt="A contemporary architect-designed home at twilight with warm interior lighting"
              fill
              priority
              placeholder="blur"
              quality={82}
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Video that fades in and plays at fullscreen */}
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover object-center"
              style={{ opacity: 0 }}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
              tabIndex={-1}
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Darkening overlay (fades in mid-scroll) */}
          <div
            ref={overlayRef}
            aria-hidden
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.45)", opacity: 0 }}
          />

          {/* Immersive reveal */}
          <div
            ref={textRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-cream"
            style={{ opacity: 0, transform: "translateY(40px)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cream/85 sm:text-sm">
              O&amp;CO Homes — Architectural homes in Australia
            </p>
            <h1 className="mt-6 max-w-4xl text-balance font-display text-[clamp(2.5rem,8vw,6.5rem)] font-light leading-[0.95] tracking-tight">
              Crafted to inspire <br className="hidden sm:block" />
              your everyday.
            </h1>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-3 border border-cream/55 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-cream hover:text-ink"
              >
                Contact now
                <IconArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#homes"
                className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/85 underline-offset-8 transition-colors hover:text-cream hover:underline"
              >
                Explore our homes
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue (fades out as the card opens) */}
        <div
          ref={hintRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-cream/65"
        >
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.28em]">
            Scroll to explore
          </span>
          <IconArrowDown className="animate-scroll-cue text-lg" />
        </div>
      </div>
    </section>
  );
}
