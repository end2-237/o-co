"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { AssembleHeading } from "@/components/ui/AssembleHeading";
import { ReelsPlayer, type Reel } from "@/components/sections/ReelsPlayer";
import {
  IconArrowRight,
  IconComment,
  IconHeart,
  IconMusic,
  IconPlay,
  IconShare,
} from "@/components/ui/icons";

const TIKTOK_URL = "https://www.tiktok.com/@ocohomes";

const reels: Reel[] = [
  {
    src: "/videos/reels/r3.mp4",
    handle: "ocohomes",
    caption: "Before → after: the Mosman rebuild 🤍",
    likes: "23.7k",
    comments: "412",
    shares: "1.2k",
    music: "O&CO · original sound",
  },
  {
    src: "/videos/reels/r1.mp4",
    handle: "ocohomes",
    caption: "Kitchen reveal ✨ spotted gum + honed stone",
    likes: "12.4k",
    comments: "208",
    shares: "540",
    music: "calm interiors · original",
  },
  {
    src: "/videos/reels/r2.mp4",
    handle: "ocohomes",
    caption: "Walk-through: the North Light living room",
    likes: "8,116",
    comments: "96",
    shares: "302",
    music: "O&CO · original sound",
  },
  {
    src: "/videos/reels/r5.mp4",
    handle: "ocohomes",
    caption: "Handover day at Saltwater House 🌴",
    likes: "15.2k",
    comments: "330",
    shares: "688",
    music: "golden hour · original",
  },
];

function MiniStat({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-lg">{icon}</span>
      <span className="text-[0.6rem] font-semibold">{value}</span>
    </div>
  );
}

/**
 * TikTok-style social section. A horizontal "discovery" row of vertical 9:16
 * cards that autoplay (muted) as they scroll into view; tapping one opens an
 * immersive fullscreen reel player.
 */
export function Reels() {
  const [open, setOpen] = useState<number | null>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Autoplay each card while it's the one in view; pause the rest.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { root: rowRef.current, threshold: [0, 0.6, 1] },
    );
    videoRefs.current.forEach((v) => v && io.observe(v));
    return () => io.disconnect();
  }, []);

  const scrollByCard = (dir: number) => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector("li");
    const amount = card ? card.clientWidth + 16 : 320;
    row.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="social" aria-labelledby="social-heading" className="bg-ink py-24 text-cream sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              data-reveal
              className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay"
            >
              <span aria-hidden className="h-px w-10 bg-clay" />
              @ocohomes
            </p>
            <AssembleHeading
              variant="scramble"
              id="social-heading"
              text="Inside our builds, in sixty seconds."
              className="mt-6 max-w-2xl text-balance font-display text-4xl font-light leading-tight tracking-tight sm:text-5xl"
            />
            <p
              data-reveal
              className="mt-5 max-w-md text-pretty leading-relaxed text-cream/70"
            >
              Site walk-throughs, reveals and the moments in between. Tap a clip
              to watch full screen.
            </p>
          </div>

          <div data-reveal data-reveal-delay={120} className="flex items-center gap-3">
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-cream/40 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-cream hover:text-ink"
            >
              Follow on TikTok
              <IconArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <div className="hidden gap-2 lg:flex">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Scroll left"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-xl transition-colors hover:bg-cream/10"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Scroll right"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-xl transition-colors hover:bg-cream/10"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        <ul
          ref={rowRef}
          data-reveal
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reels.map((reel, i) => (
            <li key={reel.src} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Play reel: ${reel.caption}`}
                className="group relative block aspect-[9/16] w-[260px] overflow-hidden rounded-2xl bg-black sm:w-[300px]"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={`${reel.src}#t=0.1`}
                  className="absolute inset-0 h-full w-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20"
                />

                {/* Hover play affordance */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-black/40 text-2xl backdrop-blur-sm">
                    <IconPlay />
                  </span>
                </span>

                {/* Caption + stats */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-left">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">@{reel.handle}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-cream/85">
                      {reel.caption}
                    </p>
                    <p className="mt-1.5 flex items-center gap-1 text-[0.65rem] text-cream/70">
                      <IconMusic className="text-xs shrink-0" />
                      <span className="truncate">{reel.music}</span>
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-center gap-3">
                    <MiniStat icon={<IconHeart />} value={reel.likes} />
                    <MiniStat icon={<IconComment />} value={reel.comments} />
                    <MiniStat icon={<IconShare />} value={reel.shares} />
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </Container>

      {open !== null && (
        <ReelsPlayer reels={reels} index={open} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}
