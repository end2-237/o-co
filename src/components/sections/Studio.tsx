import { Container } from "@/components/ui/Container";
import { AssembleHeading } from "@/components/ui/AssembleHeading";
import type { Dictionary } from "@/i18n/dictionaries/en";

/**
 * Agency / about band. Short narrative + headline statistics for credibility.
 */
export function Studio({ t }: { t: Dictionary["agency"] }) {
  return (
    <section id="agency" aria-labelledby="agency-heading" className="bg-cream py-24 sm:py-32">
      <Container className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <p
            data-reveal
            className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay"
          >
            <span aria-hidden className="h-px w-10 bg-clay" />
            {t.eyebrow}
          </p>
          <AssembleHeading
            variant="words"
            id="agency-heading"
            text={t.heading}
            className="mt-6 max-w-xl text-balance font-display text-4xl font-light leading-tight tracking-tight text-ink sm:text-5xl"
          />
        </div>

        <div className="flex flex-col gap-10">
          <p data-reveal className="text-pretty text-lg leading-relaxed text-ink/70">
            {t.body}
          </p>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-ink/10 pt-10">
            {t.stats.map((stat, i) => (
              <div key={stat.label} data-reveal data-reveal-delay={i * 90}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-semibold text-ink sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-sm uppercase tracking-[0.16em] text-ink/55">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
