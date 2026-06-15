import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

const stats = [
  { value: `Since ${siteConfig.foundingYear}`, label: "Designing & building" },
  { value: "140+", label: "Homes delivered" },
  { value: "28", label: "Design awards" },
  { value: "100%", label: "Bespoke to site" },
];

/**
 * Studio / about band. Establishes credibility (E-E-A-T) with a short
 * narrative and a set of headline statistics.
 */
export function Studio() {
  return (
    <section id="studio" aria-labelledby="studio-heading" className="bg-cream py-24 sm:py-32">
      <Container className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay">
            <span aria-hidden className="h-px w-10 bg-clay" />
            The studio
          </p>
          <h2
            id="studio-heading"
            className="mt-6 max-w-xl text-balance font-display text-4xl font-light leading-tight tracking-tight text-ink sm:text-5xl"
          >
            We design and build the home you&apos;ll actually live in.
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          <p className="text-pretty text-lg leading-relaxed text-ink/70">
            O&amp;CO Homes is an architect-led builder working across {siteConfig.country}.
            We bring design and construction under one roof, so the considered
            details survive the journey from sketch to handover. Every project
            starts with how you live — light, flow, materials and the small
            moments that make a house feel like yours.
          </p>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-ink/10 pt-10">
            {stats.map((stat) => (
              <div key={stat.label}>
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
