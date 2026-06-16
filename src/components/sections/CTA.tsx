import { Container } from "@/components/ui/Container";
import { AssembleHeading } from "@/components/ui/AssembleHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/en";

/**
 * Closing contact band — heading, contact details and the qualified lead form.
 */
export function CTA({ t, form }: { t: Dictionary["cta"]; form: Dictionary["form"] }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-ink py-24 text-cream sm:py-32"
    >
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
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
            className="mt-6 max-w-xl text-balance font-display text-4xl font-light leading-tight tracking-tight sm:text-5xl"
          />
          <p data-reveal className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-cream/75">
            {t.body}
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
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
        </div>

        <div data-reveal data-reveal-delay={120}>
          <ContactForm t={form} />
        </div>
      </Container>
    </section>
  );
}
