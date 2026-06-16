export const en = {
  meta: {
    title: "O&CO — Premium Property Agency",
    titleTemplate: "%s | O&CO",
    description:
      "O&CO is a premium property agency. We source, style and showcase exceptional homes — and place you in the one that fits your life.",
    ogDescription:
      "We source, style and showcase exceptional homes. Find the premium property that fits your life.",
    keywords: [
      "premium property agency",
      "luxury real estate",
      "apartments for sale",
      "penthouses",
      "property sourcing",
      "home staging",
      "real estate agency",
      "O&CO",
    ],
  },

  nav: [
    { label: "Properties", hash: "properties" },
    { label: "Agency", hash: "agency" },
    { label: "Process", hash: "process" },
    { label: "Contact", hash: "contact" },
  ],

  header: { cta: "Book a call" },

  hero: {
    eyebrow: "O&CO — Premium property agency",
    headline: "Find the home that's truly you.",
    ctaPrimary: "Book a call",
    ctaSecondary: "View properties",
    scrollCue: "Scroll to explore",
  },

  immersive: {
    eyebrow: "Your next home",
    headline: "A home isn't square metres. It's a life.",
    body: "From the morning light in the kitchen to the view you'll never tire of, we look past the floor plan — and find the place that fits the way you actually live.",
    ctaPrimary: "View properties",
    ctaSecondary: "Book a call",
  },

  properties: {
    eyebrow: "Featured properties",
    heading: "A handpicked collection, presented properly.",
    cta: "Talk to us",
    forSale: "For sale",
    forRent: "For rent",
    items: [
      { name: "Saltwater Penthouse", location: "Cannes", type: "Penthouse", price: "€2.95M", status: "sale", alt: "A bright seafront penthouse with a pool terrace" },
      { name: "North Light Apartment", location: "Paris 3e", type: "Apartment", price: "€1.45M", status: "sale", alt: "A warm Parisian apartment with leather seating and a leafy outlook" },
      { name: "Ironbark Villa", location: "Saint-Tropez", type: "Villa", price: "€3.20M", status: "sale", alt: "A modern villa with timber cladding and landscaped gardens" },
      { name: "Gallery Loft", location: "Paris 11e", type: "Loft", price: "€4,200/mo", status: "rent", alt: "A sunlit loft with a framed gallery wall and greenery" },
      { name: "Esplanade Villa", location: "Cap-Ferrat", type: "Villa", price: "€4.10M", status: "sale", alt: "A white contemporary villa opening onto a pool terrace" },
    ],
  },

  marquee: [
    "Apartments",
    "Penthouses",
    "Architect-designed houses",
    "Villas",
    "Lofts",
    "Sales & lettings",
    "Home staging",
    "Premium living",
  ],

  agency: {
    eyebrow: "The agency",
    heading: "We find the home. We make it shine.",
    body: "O&CO is a premium property agency. We source off-market and on-market homes, style and shoot them properly, and guide you from the first viewing to the day you move in.",
    stats: [
      { value: "600+", label: "Homes presented" },
      { value: "< 30 days", label: "Average time to offer" },
      { value: "4.9★", label: "Client rating" },
      { value: "100%", label: "Hands-on service" },
    ],
  },

  services: {
    eyebrow: "How we help",
    heading: "Everything between the search and the keys.",
    cta: "Enquire",
    items: [
      {
        no: "01",
        title: "Search & sourcing",
        description:
          "We hunt on- and off-market for homes that match your brief, budget and life — not just what's already listed.",
      },
      {
        no: "02",
        title: "Styling & presentation",
        description:
          "Home staging, photography and the social-ready films our TikTok is known for. Your property, at its absolute best.",
      },
      {
        no: "03",
        title: "Viewings & negotiation",
        description:
          "We run the viewings, handle the offers and the hard conversations, and secure you the right deal.",
      },
    ],
  },

  reels: {
    eyebrow: "@ocohomes",
    heading: "The homes, the way they deserve to be seen.",
    body: "Walk-throughs and reveals of the premium homes we present. Tap a clip to watch full screen.",
    follow: "Follow on TikTok",
    captions: [
      "Inside a €4.1M villa in Cap-Ferrat 🌿",
      "Penthouse reveal — Cannes seafront ✨",
      "Paris loft, full walk-through 🤍",
      "Golden hour at the Saint-Tropez villa 🌅",
    ],
    music: [
      "O&CO · original sound",
      "calm interiors · original",
      "O&CO · original sound",
      "golden hour · original",
    ],
  },

  process: {
    eyebrow: "How it works",
    heading: "From first call to first night in.",
    steps: [
      { no: "01", title: "Brief", description: "We listen — your life, your budget, the non-negotiables and the dreams." },
      { no: "02", title: "Shortlist", description: "A curated selection of homes worth your time, on- and off-market." },
      { no: "03", title: "Viewings", description: "We visit, pressure-test and negotiate, with you at every step." },
      { no: "04", title: "Move in", description: "Offer to handover to settled — and we stay close after." },
    ],
    quote: "A home should hold the way you live, not just where you sleep.",
    quoteAuthor: "O&CO principle",
  },

  cta: {
    eyebrow: "Start your search",
    heading: "Let's find your next home.",
    body: "Tell us what you're looking for. We take on a limited number of clients each season, so everyone gets our full attention.",
    button: "Email the agency",
    emailLabel: "Email",
    phoneLabel: "Phone",
    officeLabel: "Office",
  },

  footer: {
    tagline: "Premium property agency. We source, style and showcase exceptional homes.",
    exploreLabel: "Explore",
    contactLabel: "Contact",
    officeLabel: "Office",
    rights: "All rights reserved.",
    region: "Premium property agency",
  },

  a11y: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "Switch language",
    skipToContent: "Skip to content",
    home: "home",
  },
};

export type Dictionary = typeof en;
