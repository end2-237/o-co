"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  IconChevronDown,
  IconChevronUp,
  IconClose,
  IconComment,
  IconHeart,
  IconMusic,
  IconMuted,
  IconPlay,
  IconShare,
  IconSound,
} from "@/components/ui/icons";

export type Reel = {
  src: string;
  handle: string;
  caption: string;
  likes: string;
  comments: string;
  shares: string;
  music: string;
};

function Action({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-2xl text-cream backdrop-blur-sm">
        {icon}
      </span>
      <span className="text-xs font-semibold text-cream">{value}</span>
    </div>
  );
}

/**
 * Immersive, TikTok-style fullscreen reel player. Vertical 9:16 video on black,
 * with the social action rail, caption and music, sound toggle, tap to
 * play/pause, and up/down navigation (buttons, arrow keys, wheel, swipe).
 */
export function ReelsPlayer({
  reels,
  index,
  onClose,
}: {
  reels: Reel[];
  index: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(index);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const wheelLock = useRef(false);
  const touchY = useRef(0);

  const n = reels.length;
  const reel = reels[idx];
  const go = useCallback((dir: number) => setIdx((i) => (i + dir + n) % n), [n]);

  // Scroll lock + keyboard controls.
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowUp") go(-1);
      else if (e.key === "ArrowDown") go(1);
      else if (e.key.toLowerCase() === "m") setMuted((m) => !m);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  // Play the current reel (unmuted; fall back to muted if autoplay is blocked).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    setPaused(false);
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  const onTime = () => {
    const v = videoRef.current;
    if (v && barRef.current && v.duration) {
      barRef.current.style.width = `${(v.currentTime / v.duration) * 100}%`;
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    if (wheelLock.current || Math.abs(e.deltaY) < 24) return;
    wheelLock.current = true;
    go(e.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => (wheelLock.current = false), 650);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Social reels"
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onWheel={onWheel}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/40 text-2xl text-cream transition-colors hover:bg-black/70"
      >
        <IconClose />
      </button>

      {/* Up / down navigation (desktop) */}
      <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous reel"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/40 text-2xl text-cream transition-colors hover:bg-black/70"
        >
          <IconChevronUp />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next reel"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/40 text-2xl text-cream transition-colors hover:bg-black/70"
        >
          <IconChevronDown />
        </button>
      </div>

      {/* Player column */}
      <div
        className="relative aspect-[9/16] h-[88svh] max-w-[94vw] overflow-hidden rounded-2xl bg-black shadow-2xl"
        onTouchStart={(e) => (touchY.current = e.touches[0].clientY)}
        onTouchEnd={(e) => {
          const dy = e.changedTouches[0].clientY - touchY.current;
          if (Math.abs(dy) > 50) go(dy < 0 ? 1 : -1);
        }}
      >
        <video
          key={idx}
          ref={videoRef}
          src={reel.src}
          className="h-full w-full object-cover"
          loop
          playsInline
          onClick={togglePlay}
          onTimeUpdate={onTime}
        />

        {paused && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Play"
            className="absolute inset-0 grid place-items-center"
          >
            <span className="grid h-20 w-20 place-items-center rounded-full bg-black/45 text-4xl text-cream backdrop-blur-sm">
              <IconPlay />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40" />

        {/* Top: handle + sound */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-cream">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-cream font-display text-xs font-extrabold text-ink">
              O&amp;
            </span>
            <span className="text-sm font-semibold">@{reel.handle}</span>
          </div>
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute" : "Mute"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-xl text-cream"
          >
            {muted ? <IconMuted /> : <IconSound />}
          </button>
        </div>

        {/* Right action rail */}
        <div className="absolute bottom-24 right-3 flex flex-col items-center gap-5">
          <Action icon={<IconHeart />} value={reel.likes} />
          <Action icon={<IconComment />} value={reel.comments} />
          <Action icon={<IconShare />} value={reel.shares} />
        </div>

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 p-4 pb-5 pr-20 text-cream">
          <p className="text-sm font-semibold">@{reel.handle}</p>
          <p className="mt-1 text-sm leading-snug text-cream/90">{reel.caption}</p>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-cream/75">
            <IconMusic className="text-sm" /> {reel.music}
          </p>
        </div>

        {/* Progress */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
          <div ref={barRef} className="h-full bg-cream" style={{ width: "0%" }} />
        </div>
      </div>
    </div>
  );
}
