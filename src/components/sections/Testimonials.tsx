import { Container } from "@/components/ui/Container";
import { AssembleHeading } from "@/components/ui/AssembleHeading";
import type { Dictionary } from "@/i18n/dictionaries/en";

/**
 * Client testimonials — social proof for credibility (E-E-A-T).
 */
export function Testimonials({ t }: { t: Dictionary["testimonials"] }) {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-bone py-24 sm:py-32"
    >
      <Container>
        <div>
          <p
            data-reveal
            className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay"
          >
            <span aria-hidden className="h-px w-10 bg-clay" />
            {t.eyebrow}
          </p>
          <AssembleHeading
            variant="recompose"
            id="testimonials-heading"
            text={t.heading}
            className="mt-6 max-w-2xl text-balance font-display text-4xl font-light leading-tight tracking-tight text-ink sm:text-5xl"
          />
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {t.items.map((item, i) => (
            <li
              key={item.name}
              data-reveal
              data-reveal-delay={i * 100}
              className="flex flex-col rounded-2xl bg-cream p-8"
            >
              <div aria-label={`${item.rating} / 5`} className="text-sm tracking-[0.2em] text-clay">
                {"★".repeat(item.rating)}
              </div>
              <blockquote className="mt-5 flex-1 text-pretty text-lg leading-relaxed text-ink/85">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 border-t border-ink/10 pt-5">
                <p className="font-display text-base font-medium text-ink">{item.name}</p>
                <p className="mt-1 text-sm text-ink/55">{item.role}</p>
              </footer>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
