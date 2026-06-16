"use client";

import { Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import heroImg from "@/assets/images/hero-home.jpg";
import { IconArrowDown, IconArrowRight } from "@/components/ui/icons";
import { useMusic } from "@/components/audio/MusicProvider";
import type { Dictionary } from "@/i18n/dictionaries/en";

/**
 * Cinematic hero with a self-triggering intro: a beat after load the centered
 * rounded card opens to fullscreen on its own (no scroll needed), the headline
 * assembles letter by letter, the background video fades in and plays, and the
 * music starts at the same moment.
 */

const INTRO_DELAY = 1000; // wait a beat after load
const INTRO_DURATION = 2800;
const OVERLAY_START = 0.25;
const OVERLAY_END = 0.62;
const VIDEO_FADE_START = 0.78;
const VIDEO_FADE_END = 0.94;
const PLAY_AT = 0.86;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function Hero({ t }: { t: Dictionary["hero"] }) {
  const { start: startMusic } = useMusic();
  const musicStart = useRef(startMusic);
  musicStart.current = startMusic;

  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const letters = headingRef.current
      ? Array.from(headingRef.current.querySelectorAll<HTMLElement>("[data-letter]"))
      : [];
    const N = letters.length || 1;
    const LW = 0.34;
    let videoStarted = false;

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
      const et = range(p, 0.24, 0.42);
      if (eyebrowRef.current) {
        eyebrowRef.current.style.opacity = String(et);
        eyebrowRef.current.style.transform = `translateY(${(1 - et) * 16}px)`;
      }
      const tt = range(p, 0.3, 0.82);
      for (let i = 0; i < letters.length; i++) {
        const startAt = (i / N) * (1 - LW);
        const lt = clamp01((tt - startAt) / LW);
        letters[i].style.opacity = String(lt);
        letters[i].style.transform = `translateY(${(1 - lt) * 0.55}em)`;
      }
      const ct = range(p, 0.64, 0.86);
      if (ctaRef.current) {
        ctaRef.current.style.opacity = String(ct);
        ctaRef.current.style.transform = `translateY(${(1 - ct) * 16}px)`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(range(p, 0.85, 1));
      }
      if (videoRef.current && p >= PLAY_AT && !videoStarted) {
        videoStarted = true;
        videoRef.current.play().catch(() => {});
      }
    };

    if (videoRef.current) videoRef.current.muted = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      if (videoRef.current) videoRef.current.style.opacity = "0";
      return;
    }

    let raf = 0;
    let startTime = 0;
    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      if (elapsed < INTRO_DELAY) {
        apply(0);
        raf = requestAnimationFrame(tick);
        return;
      }
      const p = clamp01((elapsed - INTRO_DELAY) / INTRO_DURATION);
      apply(easeInOut(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Kick off the music at the moment the intro begins.
    const musicTimer = window.setTimeout(() => musicStart.current(), INTRO_DELAY);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(musicTimer);
    };
  }, []);

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative h-svh overflow-hidden bg-ink text-cream"
    >
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
          <Image
            src={heroImg}
            alt=""
            fill
            priority
            placeholder="blur"
            quality={82}
            sizes="100vw"
            className="object-cover object-center"
          />
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

        <div
          ref={overlayRef}
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.45)", opacity: 0 }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-cream">
          <p
            ref={eyebrowRef}
            className="text-xs font-semibold uppercase tracking-[0.32em] text-cream/85 sm:text-sm"
            style={{ opacity: 0, transform: "translateY(16px)" }}
          >
            {t.eyebrow}
          </p>

          <h1
            ref={headingRef}
            aria-label={t.headline}
            className="mt-6 max-w-4xl text-balance font-display text-[clamp(2.5rem,8vw,6.5rem)] font-light leading-[0.95] tracking-tight"
          >
            {t.headline.split(" ").map((word, wi, arr) => (
              <Fragment key={wi}>
                <span className="inline-block whitespace-nowrap">
                  {[...word].map((ch, ci) => (
                    <span
                      key={ci}
                      data-letter
                      className="inline-block will-change-transform"
                      style={{ opacity: 0, transform: "translateY(0.55em)" }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
                {wi < arr.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h1>

          <div
            ref={ctaRef}
            className="mt-10 flex flex-wrap items-center justify-center gap-5"
            style={{ opacity: 0, transform: "translateY(16px)" }}
          >
            <Link
              href="#contact"
              className="group inline-flex items-center gap-3 border border-cream/55 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-cream hover:text-ink"
            >
              {t.ctaPrimary}
              <IconArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#properties"
              className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/85 underline-offset-8 transition-colors hover:text-cream hover:underline"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={hintRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 text-cream/65"
        style={{ opacity: 0 }}
      >
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.28em]">
          {t.scrollCue}
        </span>
        <IconArrowDown className="animate-scroll-cue text-lg" />
      </div>
    </section>
  );
}
