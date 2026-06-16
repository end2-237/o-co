import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AssembleHeading } from "@/components/ui/AssembleHeading";
import { IconArrowRight } from "@/components/ui/icons";
import type { Dictionary } from "@/i18n/dictionaries/en";

/**
 * Services overview — how the agency helps, as editorial cards.
 */
export function Services({ t }: { t: Dictionary["services"] }) {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-bone py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              data-reveal
              className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay"
            >
              <span aria-hidden className="h-px w-10 bg-clay" />
              {t.eyebrow}
            </p>
            <AssembleHeading
              variant="flip"
              id="services-heading"
              text={t.heading}
              className="mt-6 max-w-2xl text-balance font-display text-4xl font-light leading-tight tracking-tight text-ink sm:text-5xl"
            />
          </div>
        </div>

        <ul
          data-reveal
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {t.items.map((service) => (
            <li
              key={service.no}
              className="group flex flex-col bg-bone p-8 transition-colors duration-300 hover:bg-cream sm:p-10"
            >
              <span className="font-display text-sm font-semibold tracking-[0.2em] text-clay">
                {service.no}
              </span>
              <h3 className="mt-6 font-display text-2xl font-medium text-ink">
                {service.title}
              </h3>
              <p className="mt-4 flex-1 text-pretty leading-relaxed text-ink/65">
                {service.description}
              </p>
              <Link
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-clay"
                aria-label={`${t.cta} — ${service.title}`}
              >
                {t.cta}
                <IconArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
