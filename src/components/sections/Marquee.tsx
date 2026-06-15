const keywords = [
  "Custom Homes",
  "Knockdown & Rebuild",
  "Architectural Design",
  "Luxury Interiors",
  "Sustainable Building",
  "Coastal Residences",
];

/**
 * Infinite keyword marquee separating the hero from the page body. The track
 * holds two identical lists and is translated by -50%, so the loop is seamless.
 * Motion is paused automatically for users who prefer reduced motion.
 */
export function Marquee() {
  return (
    <section
      aria-label="What we do"
      className="overflow-hidden border-y border-cream/10 bg-ink py-5 text-cream"
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center"
          >
            {keywords.map((word) => (
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
