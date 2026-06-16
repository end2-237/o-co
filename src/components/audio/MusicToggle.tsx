"use client";

import { useMusic } from "@/components/audio/MusicProvider";
import { cn } from "@/lib/utils";

const STATIC_HEIGHTS = ["40%", "75%", "55%", "90%"];

/**
 * Minimal nav music control: an animated wave (equalizer) icon — no label.
 * Bars dance while playing, sit still when stopped. Click to play / stop.
 */
export function MusicToggle({
  playLabel,
  pauseLabel,
  className,
}: {
  playLabel: string;
  pauseLabel: string;
  className?: string;
}) {
  const { playing, toggle } = useMusic();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? pauseLabel : playLabel}
      aria-pressed={playing}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/25 transition-colors hover:border-current/50",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("flex h-3.5 items-end gap-[2.5px]", !playing && "opacity-50")}
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn("w-[2px] rounded-full bg-current", playing && "eq-bar")}
            style={
              playing
                ? { height: "100%", animationDelay: `${i * 0.15}s` }
                : { height: STATIC_HEIGHTS[i] }
            }
          />
        ))}
      </span>
    </button>
  );
}
