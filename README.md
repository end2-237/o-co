# O&CO Homes

Marketing site for **O&CO Homes** — an architectural home builder based in
Australia. Built with the Next.js App Router, TypeScript and Tailwind CSS v4,
with a strong focus on SEO and Core Web Vitals.

## Highlights

- **Cinematic hero** — full-bleed architectural photography with an oversized
  O&CO wordmark, tagline, social rail and call to action.
- **Complete landing page** — hero, keyword marquee, studio/credibility band,
  services, an approach/process section and a contact CTA.
- **SEO foundation**
  - Rich `metadata` (title template, canonical, Open Graph, Twitter, robots
    directives) driven from a single `src/lib/site.ts` config.
  - JSON-LD structured data (`GeneralContractor` / `HomeAndConstructionBusiness`
    + `WebSite` + `WebPage`).
  - Generated `sitemap.xml`, `robots.txt` and `manifest.webmanifest`.
  - Dynamic Open Graph / Twitter cards, favicon and Apple touch icon via
    `next/og`.
- **Performance & a11y** — `next/image` with blur placeholders, `next/font`
  self-hosting, semantic landmarks, a skip link, focus-visible styles and
  `prefers-reduced-motion` handling.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Project structure

```
src/
  app/
    layout.tsx            # fonts, metadata, viewport, JSON-LD, header/footer
    page.tsx              # landing page composition
    globals.css           # Tailwind v4 theme tokens (navy / sand / cream)
    sitemap.ts robots.ts manifest.ts
    opengraph-image.tsx twitter-image.tsx icon.tsx apple-icon.tsx
  components/
    layout/               # SiteHeader, SiteFooter
    sections/             # Hero, Marquee, Studio, Services, Approach, CTA
    ui/                    # Container, Logo, SocialLinks, icons
  lib/
    site.ts               # single source of truth for brand + SEO content
    jsonld.ts             # structured-data builder
    utils.ts
  assets/images/          # statically imported, optimized hero imagery
```

## Customising

Brand copy, contact details, social links and SEO keywords all live in
[`src/lib/site.ts`](src/lib/site.ts). Update `siteConfig.url` to the production
domain before deploying so canonical URLs, the sitemap and structured data
resolve correctly. Replace the imagery in `src/assets/images/` with licensed
photography of your own projects.
