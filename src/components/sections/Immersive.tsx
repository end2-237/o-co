"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import immersiveImg from "@/assets/images/immersive-home.jpg";
import { Container } from "@/components/ui/Container";
import { AssembleHeading } from "@/components/ui/AssembleHeading";
import { IconArrowRight } from "@/components/ui/icons";
import type { Dictionary } from "@/i18n/dictionaries/en";

/**
 * Immersive, emotional band after the hero, with a light parallax photograph
 * and a headline that recomposes into place.
 */
export function Immersive({ t }: { t: Dictionary["immersive"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      image.style.transform = "scale(1.1)";
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const rel = (rect.top + rect.height / 2 - vh / 2) / vh;
      const y = Math.max(-8, Math.min(8, rel * 14));
      image.style.transform = `translate3d(0, ${y}%, 0) scale(1.2)`;
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
      aria-labelledby="immersive-heading"
      className="relative flex min-h-[90svh] items-center overflow-hidden bg-ink text-cream"
    >
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "scale(1.2)" }}
      >
        <Image
          src={immersiveImg}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/35"
      />

      <Container className="relative z-10 py-28">
        <div className="max-w-3xl">
          <p
            data-reveal
            className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-cream/85"
          >
            <span aria-hidden className="h-px w-10 bg-clay" />
            {t.eyebrow}
          </p>
          <AssembleHeading
            id="immersive-heading"
            text={t.headline}
            className="mt-6 text-balance font-display text-[clamp(2.25rem,6vw,5rem)] font-light leading-[1.03] tracking-tight"
          />
          <p
            data-reveal
            data-reveal-delay={120}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-cream/80"
          >
            {t.body}
          </p>
          <div
            data-reveal
            data-reveal-delay={220}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Link
              href="#properties"
              className="group inline-flex items-center gap-3 bg-cream px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-sand"
            >
              {t.ctaPrimary}
              <IconArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#contact"
              className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/85 underline-offset-8 transition-colors hover:text-cream hover:underline"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
