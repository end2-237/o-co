"use client";

import { useMusic } from "@/components/audio/MusicProvider";
import { IconMusic } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Nav music control. Shows the track and an animated equalizer while playing;
 * click to play/stop.
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
  const { playing, toggle, title } = useMusic();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? pauseLabel : playLabel}
      aria-pressed={playing}
      title={title}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-current/25 px-3 py-1.5 text-xs font-medium transition-colors hover:border-current/50",
        className,
      )}
    >
      {playing ? (
        <span aria-hidden className="flex h-3 items-end gap-[2px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="eq-bar w-[2px] bg-current"
              style={{ height: "100%", animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </span>
      ) : (
        <IconMusic aria-hidden className="text-sm" />
      )}
      <span className="hidden max-w-[8rem] truncate tracking-wide sm:inline">{title}</span>
    </button>
  );
}
