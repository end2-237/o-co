import Image from "next/image";
import Link from "next/link";
import heroImg from "@/assets/images/hero-home.jpg";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { IconArrowDown, IconArrowRight } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";

/**
 * Landing hero. A full-bleed photograph of an architectural home, layered with
 * cinematic gradients so the oversized O&CO wordmark, tagline and call to
 * action stay legible — a branded take on the reference composition.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-cream"
    >
      {/* Background photograph */}
      <Image
        src={heroImg}
        alt="A contemporary architect-designed home at twilight with warm interior lighting"
        fill
        priority
        placeholder="blur"
        quality={82}
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />

      {/* Legibility gradients */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/35 to-ink/60"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent"
      />

      {/* Right-hand social rail (desktop) */}
      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center lg:gap-6">
        <span aria-hidden className="h-16 w-px bg-cream/30" />
        <SocialLinks
          orientation="vertical"
          className="text-cream/75"
          iconClassName="text-lg"
        />
        <span aria-hidden className="h-16 w-px bg-cream/30" />
      </div>

      <Container className="relative z-10 flex min-h-svh flex-col justify-end pb-14 pt-36 sm:pb-20">
        {/* Eyebrow */}
        <p
          className="reveal flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-cream/80"
          style={{ animationDelay: "0.05s" }}
        >
          <span aria-hidden className="h-px w-10 bg-clay" />
          Architectural homes · {siteConfig.country}
        </p>

        {/* Display headline */}
        <h1
          className="reveal mt-6 font-display leading-[0.9] tracking-[-0.03em]"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="sr-only">
            O&CO Homes — architectural home builders in Australia
          </span>
          <span
            aria-hidden
            className="block text-[clamp(3.5rem,13vw,11.5rem)] font-extrabold"
          >
            O<span className="text-clay">{"&"}</span>CO
          </span>
          <span
            aria-hidden
            className="block text-[clamp(3rem,11vw,10rem)] font-extralight text-outline"
          >
            HOMES
          </span>
        </h1>

        {/* Tagline + actions */}
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p
            className="reveal max-w-xl text-pretty text-lg leading-relaxed text-cream/85 sm:text-xl"
            style={{ animationDelay: "0.3s" }}
          >
            {siteConfig.tagline}
          </p>

          <div
            className="reveal flex flex-wrap items-center gap-5"
            style={{ animationDelay: "0.45s" }}
          >
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-3 border border-cream/50 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-cream hover:text-ink"
            >
              Contact now
              <IconArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#homes"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cream/80 underline-offset-8 transition-colors hover:text-cream hover:underline"
            >
              Explore our homes
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="mt-12 hidden items-center gap-3 text-cream/55 sm:flex">
          <IconArrowDown className="animate-scroll-cue text-lg" />
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.25em]">
            Scroll to explore
          </span>
        </div>
      </Container>
    </section>
  );
}
