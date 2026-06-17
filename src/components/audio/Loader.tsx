"use client";

import { useEffect, useRef, useState } from "react";
import { useMusic } from "@/components/audio/MusicProvider";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const MIN_MS = 1200; // keep the brand on screen at least this long
const FADE_MS = 700;

/**
 * Branded O&CO intro loader. Preloads the music, stays until the track is
 * ready (and a minimum brand moment), then fades out and releases the hero
 * intro — so animation and music start together with no lag.
 */
export function Loader() {
  const { ready, prime, begin } = useMusic();
  const [phase, setPhase] = useState<"in" | "leaving" | "gone">("in");
  const startedAt = useRef(0);

  // Start preloading + lock scroll while the loader is up.
  useEffect(() => {
    prime();
    startedAt.current = performance.now();
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [prime]);

  // Leave once the track is ready (and the minimum brand moment has passed).
  useEffect(() => {
    if (!ready) return;
    const wait = Math.max(0, MIN_MS - (performance.now() - startedAt.current));
    let fadeTimer = 0;
    const leaveTimer = window.setTimeout(() => {
      setPhase("leaving");
      fadeTimer = window.setTimeout(() => {
        setPhase("gone");
        begin();
        document.documentElement.style.overflow = "";
      }, FADE_MS);
    }, wait);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(fadeTimer);
    };
  }, [ready, begin]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink text-cream transition-opacity ease-out",
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100",
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <Logo className="text-4xl text-cream sm:text-5xl" />
      <div className="mt-8 h-px w-32 overflow-hidden bg-cream/15">
        <div className="animate-loader-bar h-full w-1/3 bg-cream/80" />
      </div>
    </div>
  );
}
