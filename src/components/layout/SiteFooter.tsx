import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

type NavItem = { label: string; hash: string };
type AreaItem = { slug: string; name: string };

export function SiteFooter({
  locale,
  t,
  nav,
  areas,
}: {
  locale: Locale;
  t: Dictionary["footer"];
  nav: NavItem[];
  areas: AreaItem[];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/10 bg-ink text-cream">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Link href={`/${locale}`} className="inline-flex">
            <Logo className="text-3xl text-cream" />
          </Link>
          <p className="mt-5 max-w-xs text-pretty leading-relaxed text-cream/65">{t.tagline}</p>
          <SocialLinks className="mt-6 text-cream/70" iconClassName="text-lg" />
        </div>

        <nav aria-label="Footer" className="text-sm lg:col-span-2">
          <h2 className="text-xs uppercase tracking-[0.2em] text-cream/45">{t.exploreLabel}</h2>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.hash}>
                <Link
                  href={`#${item.hash}`}
                  className="text-cream/75 transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Areas" className="text-sm lg:col-span-2">
          <h2 className="text-xs uppercase tracking-[0.2em] text-cream/45">{t.areasLabel}</h2>
          <ul className="mt-5 space-y-3">
            {areas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/${locale}/areas/${area.slug}`}
                  className="text-cream/75 transition-colors hover:text-cream"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm lg:col-span-2">
          <h2 className="text-xs uppercase tracking-[0.2em] text-cream/45">{t.contactLabel}</h2>
          <ul className="mt-5 space-y-3 text-cream/75">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="transition-colors hover:text-cream"
              >
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="transition-colors hover:text-cream"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm lg:col-span-2">
          <h2 className="text-xs uppercase tracking-[0.2em] text-cream/45">{t.officeLabel}</h2>
          <address className="mt-5 not-italic leading-relaxed text-cream/75">
            {siteConfig.address.street}
            <br />
            {siteConfig.address.postalCode} {siteConfig.address.locality}
            <br />
            {siteConfig.address.region}
          </address>
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/55 sm:flex-row">
          <p>
            © {year} {siteConfig.legalName}. {t.rights}
          </p>
          <p className="uppercase tracking-[0.2em]">{t.region}</p>
        </Container>
      </div>
    </footer>
  );
}
