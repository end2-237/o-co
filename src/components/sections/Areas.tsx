import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AssembleHeading } from "@/components/ui/AssembleHeading";
import { IconArrowRight } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

/**
 * Where we work — links to neighbourhood/area landing pages (internal linking
 * + local SEO).
 */
export function Areas({
  t,
  locale,
  counts,
}: {
  t: Dictionary["areas"];
  locale: Locale;
  counts: Record<string, number>;
}) {
  return (
    <section id="areas" aria-labelledby="areas-heading" className="bg-bone py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <p
            data-reveal
            className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay"
          >
            <span aria-hidden className="h-px w-10 bg-clay" />
            {t.eyebrow}
          </p>
          <AssembleHeading
            variant="words"
            id="areas-heading"
            text={t.heading}
            className="mt-6 text-balance font-display text-4xl font-light leading-tight tracking-tight text-ink sm:text-5xl"
          />
          <p data-reveal className="mt-5 text-pretty text-lg leading-relaxed text-ink/70">
            {t.intro}
          </p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.list.map((area, i) => (
            <li key={area.slug} data-reveal data-reveal-delay={i * 80}>
              <Link
                href={`/${locale}/areas/${area.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl bg-cream p-7 transition-colors hover:bg-sand-soft"
              >
                <div>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-clay">
                    {counts[area.slug] ?? 0} {t.propertiesLabel}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-medium text-ink">{area.name}</h3>
                  <p className="mt-1 text-sm text-ink/55">{area.tagline}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-ink">
                  {t.cta}
                  <IconArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
