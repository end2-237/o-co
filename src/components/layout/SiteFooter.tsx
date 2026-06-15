import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { navItems, siteConfig } from "@/lib/site";

/**
 * Site footer. Repeats the primary navigation and contact details for crawlers
 * and users who reach the bottom of the page.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/10 bg-ink text-cream">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="lg:col-span-1">
          <Logo className="text-3xl text-cream" />
          <p className="mt-5 max-w-xs text-pretty leading-relaxed text-cream/65">
            Architectural home builders crafting custom homes and considered
            interiors across {siteConfig.country}.
          </p>
          <SocialLinks className="mt-6 text-cream/70" iconClassName="text-lg" />
        </div>

        <nav aria-label="Footer" className="text-sm">
          <h2 className="text-xs uppercase tracking-[0.2em] text-cream/45">Explore</h2>
          <ul className="mt-5 space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream/75 transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="text-xs uppercase tracking-[0.2em] text-cream/45">Contact</h2>
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

        <div className="text-sm">
          <h2 className="text-xs uppercase tracking-[0.2em] text-cream/45">Studio</h2>
          <address className="mt-5 not-italic leading-relaxed text-cream/75">
            {siteConfig.address.street}
            <br />
            {siteConfig.address.locality} {siteConfig.address.region}{" "}
            {siteConfig.address.postalCode}
            <br />
            {siteConfig.country}
          </address>
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/55 sm:flex-row">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.2em]">
            {siteConfig.region} · Since {siteConfig.foundingYear}
          </p>
        </Container>
      </div>
    </footer>
  );
}
