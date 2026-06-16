import { Container } from "@/components/ui/Container";
import { AssembleHeading } from "@/components/ui/AssembleHeading";
import { IconArrowRight } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/en";

/**
 * Closing contact band — the page's primary conversion point.
 */
export function CTA({ t }: { t: Dictionary["cta"] }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-ink py-24 text-cream sm:py-32"
    >
      <Container className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-end">
        <div>
          <p
            data-reveal
            className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay"
          >
            <span aria-hidden className="h-px w-10 bg-clay" />
            {t.eyebrow}
          </p>
          <AssembleHeading
            id="contact-heading"
            text={t.heading}
            className="mt-6 max-w-2xl text-balance font-display text-4xl font-light leading-tight tracking-tight sm:text-6xl"
          />
          <p data-reveal className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-cream/75">
            {t.body}
          </p>

          <a
            href={`mailto:${siteConfig.contact.email}`}
            data-reveal
            className="group mt-10 inline-flex items-center gap-3 bg-cream px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-sand"
          >
            {t.button}
            <IconArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <dl
          data-reveal
          data-reveal-delay={120}
          className="grid gap-8 border-t border-cream/15 pt-10 sm:grid-cols-2 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
        >
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-cream/50">{t.emailLabel}</dt>
            <dd className="mt-2">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-lg transition-colors hover:text-clay"
              >
                {siteConfig.contact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-cream/50">{t.phoneLabel}</dt>
            <dd className="mt-2">
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="text-lg transition-colors hover:text-clay"
              >
                {siteConfig.contact.phone}
              </a>
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-[0.2em] text-cream/50">{t.officeLabel}</dt>
            <dd className="mt-2 not-italic text-lg leading-relaxed text-cream/80">
              {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
              {siteConfig.address.locality}
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
