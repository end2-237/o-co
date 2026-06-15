import Image from "next/image";
import twilightImg from "@/assets/images/home-twilight.jpg";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    no: "01",
    title: "Discovery",
    description:
      "We listen first — your site, your budget, the way your household really moves through a day.",
  },
  {
    no: "02",
    title: "Design",
    description:
      "Concept through to documentation, with light, proportion and materials resolved before we build.",
  },
  {
    no: "03",
    title: "Craft",
    description:
      "Considered construction by trusted trades, with one team accountable from slab to styling.",
  },
  {
    no: "04",
    title: "Handover",
    description:
      "Keys, a full care guide and aftercare — we stay close long after you move in.",
  },
];

/**
 * Approach / process band pairing an atmospheric image with the four stages of
 * an O&CO project.
 */
export function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="bg-sand-soft py-24 sm:py-32"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-last lg:order-first">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={twilightImg}
              alt="A warmly lit home glowing against the dusk — emotion and craft in one frame"
              placeholder="blur"
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <figure className="absolute -bottom-6 -right-2 hidden max-w-xs rounded-xl bg-ink p-6 text-cream shadow-xl sm:block lg:-right-6">
            <blockquote className="text-pretty font-display text-lg font-light italic leading-snug">
              &ldquo;A home should hold the way you feel, not just the way you
              live.&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-cream/60">
              O&amp;CO design principle
            </figcaption>
          </figure>
        </div>

        <div>
          <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay">
            <span aria-hidden className="h-px w-10 bg-clay" />
            Our approach
          </p>
          <h2
            id="approach-heading"
            className="mt-6 max-w-xl text-balance font-display text-4xl font-light leading-tight tracking-tight text-ink sm:text-5xl"
          >
            From first sketch to the day you move in.
          </h2>

          <ol className="mt-12">
            {steps.map((step) => (
              <li
                key={step.no}
                className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-ink/15 py-6"
              >
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-clay">
                  {step.no}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium text-ink">
                    {step.title}
                  </h3>
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
