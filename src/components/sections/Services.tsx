import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { IconArrowRight } from "@/components/ui/icons";

const services = [
  {
    no: "01",
    title: "Custom Homes",
    description:
      "Ground-up homes designed around your site, your light and the way you live — engineered for comfort and built to last.",
  },
  {
    no: "02",
    title: "Knockdown & Rebuild",
    description:
      "Stay in the suburb you love. We replace tired structures with architectural homes that make the most of every square metre.",
  },
  {
    no: "03",
    title: "Architecture & Interiors",
    description:
      "A single team for exterior and interior — joinery, finishes and furniture resolved together for a seamless result.",
  },
];

/**
 * Services overview. Each offering reads as an editorial card with a number,
 * heading and short description — strong for both scannability and SEO.
 */
export function Services() {
  return (
    <section id="homes" aria-labelledby="homes-heading" className="bg-bone py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay">
              <span aria-hidden className="h-px w-10 bg-clay" />
              What we build
            </p>
            <h2
              id="homes-heading"
              className="mt-6 max-w-2xl text-balance font-display text-4xl font-light leading-tight tracking-tight text-ink sm:text-5xl"
            >
              Three ways to bring your home to life.
            </h2>
          </div>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
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
                href="/#contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-clay"
                aria-label={`Enquire about ${service.title}`}
              >
                Enquire
                <IconArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
