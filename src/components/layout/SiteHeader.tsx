"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { IconArrowRight, IconClose, IconMenu } from "@/components/ui/icons";
import { navItems, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Fixed site header. Transparent over the light top of the hero, condensing to
 * a solid cream bar once the page scrolls. On small screens the navigation
 * collapses into a full-screen overlay menu.
 */
export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  // Stay transparent over the (dark) hero; turn solid once it's scrolled past.
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      setSolid(hero ? hero.getBoundingClientRect().bottom <= 80 : window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Lock background scroll and wire up Escape-to-close while the menu is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onLight = solid && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        onLight
          ? "border-b border-ink/10 bg-cream/85 text-ink backdrop-blur-md"
          : "border-b border-transparent text-cream",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="relative z-50 inline-flex items-center"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative py-1 transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full",
                    onLight ? "text-ink/70 hover:text-ink" : "text-cream/80 hover:text-cream",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className={cn(
              "hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 lg:inline-flex",
              onLight
                ? "bg-ink text-cream hover:bg-ink-soft"
                : "border border-cream/50 text-cream hover:bg-cream hover:text-ink",
            )}
          >
            Start a project
            <IconArrowRight className="text-base" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/25 text-2xl lg:hidden"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </Container>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-ink text-cream transition-all duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <Container className="mt-24 flex flex-1 flex-col">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <li key={item.href} className="border-b border-cream/10">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-5 font-display text-3xl font-light tracking-tight transition-colors hover:text-clay"
                  >
                    <span className="text-xs font-medium tracking-[0.2em] text-cream/40">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-6 py-10">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-lg text-cream/80 transition-colors hover:text-cream"
            >
              {siteConfig.contact.email}
            </a>
            <SocialLinks className="text-cream/70" iconClassName="text-xl" />
          </div>
        </Container>
      </div>
    </header>
  );
}
