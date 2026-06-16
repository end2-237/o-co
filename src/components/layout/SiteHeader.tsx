"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MusicToggle } from "@/components/audio/MusicToggle";
import { IconArrowRight, IconClose, IconMenu } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/utils";

type NavItem = { label: string; hash: string };

/**
 * Fixed header: transparent over the (dark) hero, solid cream once past it.
 * Navigation collapses into a full-screen overlay on small screens.
 */
export function SiteHeader({
  locale,
  nav,
  cta,
  a11y,
  email,
}: {
  locale: Locale;
  nav: NavItem[];
  cta: string;
  a11y: Dictionary["a11y"];
  email: string;
}) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

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
          href={`/${locale}`}
          aria-label={`${siteConfig.name} — ${a11y.home}`}
          className="relative z-50 inline-flex items-center"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-sm font-medium">
            {nav.map((item) => (
              <li key={item.hash}>
                <Link
                  href={`#${item.hash}`}
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

        <div className="flex items-center gap-3 sm:gap-4">
          <MusicToggle playLabel={a11y.playMusic} pauseLabel={a11y.pauseMusic} />
          <LanguageSwitcher
            locale={locale}
            label={a11y.switchLanguage}
            className="hidden sm:flex"
          />
          <Link
            href="#contact"
            className={cn(
              "hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 lg:inline-flex",
              onLight
                ? "bg-ink text-cream hover:bg-ink-soft"
                : "border border-cream/50 text-cream hover:bg-cream hover:text-ink",
            )}
          >
            {cta}
            <IconArrowRight className="text-base" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? a11y.closeMenu : a11y.openMenu}
            className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/25 text-2xl lg:hidden"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </Container>

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
              {nav.map((item, i) => (
                <li key={item.hash} className="border-b border-cream/10">
                  <Link
                    href={`#${item.hash}`}
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
            <LanguageSwitcher locale={locale} label={a11y.switchLanguage} className="text-base" />
            <a
              href={`mailto:${email}`}
              className="text-lg text-cream/80 transition-colors hover:text-cream"
            >
              {email}
            </a>
            <SocialLinks className="text-cream/70" iconClassName="text-xl" />
          </div>
        </Container>
      </div>
    </header>
  );
}
