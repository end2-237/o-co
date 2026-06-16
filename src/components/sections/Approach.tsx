import Image from "next/image";
import twilightImg from "@/assets/images/home-twilight.jpg";
import { Container } from "@/components/ui/Container";
import { AssembleHeading } from "@/components/ui/AssembleHeading";
import type { Dictionary } from "@/i18n/dictionaries/en";

/**
 * Process band pairing an atmospheric image with the stages of working with
 * the agency.
 */
export function Approach({ t }: { t: Dictionary["process"] }) {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-sand-soft py-24 sm:py-32"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-last lg:order-first">
          <div data-reveal className="overflow-hidden rounded-2xl">
            <Image
              src={twilightImg}
              alt=""
              placeholder="blur"
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <figure
            data-reveal
            data-reveal-delay={200}
            className="absolute -bottom-6 -right-2 hidden max-w-xs rounded-xl bg-ink p-6 text-cream shadow-xl sm:block lg:-right-6"
          >
            <blockquote className="text-pretty font-display text-lg font-light italic leading-snug">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-cream/60">
              {t.quoteAuthor}
            </figcaption>
          </figure>
        </div>

        <div>
          <p
            data-reveal
            className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay"
          >
            <span aria-hidden className="h-px w-10 bg-clay" />
            {t.eyebrow}
          </p>
          <AssembleHeading
            variant="blur"
            id="process-heading"
            text={t.heading}
            className="mt-6 max-w-xl text-balance font-display text-4xl font-light leading-tight tracking-tight text-ink sm:text-5xl"
          />

          <ol className="mt-12">
            {t.steps.map((step, i) => (
              <li
                key={step.no}
                data-reveal
                data-reveal-delay={i * 90}
                className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-ink/15 py-6"
              >
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-clay">
                  {step.no}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium text-ink">{step.title}</h3>
                  <p className="mt-2 text-pretty leading-relaxed text-ink/65">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
