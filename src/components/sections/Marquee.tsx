import type { Dictionary } from "@/i18n/dictionaries/en";

/**
 * Infinite keyword marquee. The track holds two identical lists translated by
 * -50% for a seamless loop; motion pauses for reduced-motion users.
 */
export function Marquee({ items }: { items: Dictionary["marquee"] }) {
  return (
    <section
      aria-label="What we do"
      className="overflow-hidden border-y border-cream/10 bg-ink py-5 text-cream"
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex items-center">
            {items.map((word) => (
              <li
                key={word}
                className="flex items-center whitespace-nowrap font-display text-sm font-medium uppercase tracking-[0.2em] text-cream/85"
              >
                <span className="px-8">{word}</span>
                <span aria-hidden className="text-clay">
                  ✳
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
