export const en = {
  meta: {
    title: "O&CO — Premium Property Agency",
    titleTemplate: "%s | O&CO",
    description:
      "O&CO is a premium property agency in Cameroon. We source, style and showcase exceptional homes — and place you in the one that fits your life.",
    ogDescription:
      "Premium property agency in Cameroon. We source, style and showcase exceptional homes.",
    keywords: [
      "premium property agency Cameroon",
      "real estate Douala",
      "real estate Yaoundé",
      "apartments for sale Cameroon",
      "villas Cameroon",
      "property sourcing",
      "home staging",
      "O&CO",
    ],
  },

  nav: [
    { label: "Properties", to: "properties" },
    { label: "Agency", hash: "agency" },
    { label: "Process", hash: "process" },
    { label: "Contact", hash: "contact" },
  ] as { label: string; hash?: string; to?: string }[],

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
    viewAll: "View all properties",
    priceOnRequest: "Price on request",
    forSale: "For sale",
    forRent: "For rent",
    viewLabel: "View property",
    bedsLabel: "bd",
    bathsLabel: "ba",
    items: [
      {
        slug: "saltwater-penthouse",
        name: "Saltwater Penthouse",
        location: "Kribi",
        areaSlug: "kribi",
        type: "Penthouse",
        status: "sale",
        beds: 3,
        baths: 3,
        surface: "185 m²",
        alt: "A bright oceanfront penthouse with a pool terrace",
        summary: "Oceanfront penthouse with a wraparound terrace and private pool.",
        description:
          "A top-floor penthouse facing the ocean, with a wraparound terrace, private pool and a calm, light-filled interior — steps from the beach in Kribi.",
        agentName: "Camille Laurent",
        agentRole: "Senior advisor — Littoral",
      },
      {
        slug: "north-light-apartment",
        name: "North Light Apartment",
        location: "Bonapriso, Douala",
        areaSlug: "douala",
        type: "Apartment",
        status: "sale",
        beds: 2,
        baths: 1,
        surface: "96 m²",
        alt: "A warm apartment with leather seating and a leafy outlook",
        summary: "A quietly elegant Bonapriso apartment with double exposure.",
        description:
          "A quietly elegant apartment in Bonapriso — double exposure, fine finishes and a leafy outlook, in one of Douala's most sought-after addresses.",
        agentName: "Camille Laurent",
        agentRole: "Senior advisor — Littoral",
      },
      {
        slug: "ironbark-villa",
        name: "Ironbark Villa",
        location: "Bastos, Yaoundé",
        areaSlug: "yaounde",
        type: "Villa",
        status: "sale",
        beds: 5,
        baths: 4,
        surface: "320 m²",
        alt: "A modern villa with timber cladding and landscaped gardens",
        summary: "A contemporary villa with gardens and a heated pool.",
        description:
          "A contemporary villa in Bastos — generous volumes, landscaped gardens and a pool, in Yaoundé's most prestigious neighbourhood.",
        agentName: "Léa Fontaine",
        agentRole: "Advisor — Centre",
      },
      {
        slug: "gallery-loft",
        name: "Gallery Loft",
        location: "Akwa, Douala",
        areaSlug: "douala",
        type: "Loft",
        status: "rent",
        beds: 2,
        baths: 2,
        surface: "140 m²",
        alt: "A sunlit loft with a framed gallery wall and greenery",
        summary: "A double-height loft to rent, fully furnished.",
        description:
          "A double-height loft in Akwa — open kitchen, artist's light and a gallery wall, furnished and ready to move into. In the heart of downtown Douala.",
        agentName: "Camille Laurent",
        agentRole: "Senior advisor — Littoral",
      },
      {
        slug: "esplanade-villa",
        name: "Esplanade Villa",
        location: "Limbé",
        areaSlug: "limbe",
        type: "Villa",
        status: "sale",
        beds: 5,
        baths: 5,
        surface: "410 m²",
        alt: "A white contemporary villa opening onto a pool terrace",
        summary: "A white contemporary villa with sweeping ocean views.",
        description:
          "A serene, white-rendered villa facing the ocean in Limbé — floor-to-ceiling glass, a mature garden and an infinity pool, with sweeping views over the bay.",
        agentName: "Julien Mercier",
        agentRole: "Partner",
      },
    ],
  },

  propertyDetail: {
    back: "All properties",
    overviewTitle: "About this home",
    factsTitle: "At a glance",
    labels: {
      price: "Price",
      type: "Type",
      beds: "Bedrooms",
      baths: "Bathrooms",
      surface: "Surface",
      status: "Status",
      location: "Location",
      reference: "Reference",
    },
    galleryHint: "Tap to view full screen",
    locationTitle: "Location",
    locationNote: "Exact address shared on request.",
    agentTitle: "Your advisor",
  },

  catalog: {
    title: "All properties",
    intro: "Our full portfolio — for sale and to rent, across Cameroon.",
    all: "All",
    type: "Type",
    status: "Status",
    area: "Area",
    results: "properties",
    empty: "No properties match these filters.",
  },

  marquee: [
    "Apartments",
    "Penthouses",
    "Villas",
    "Lofts",
    "Oceanfront homes",
    "Sales & lettings",
    "Home staging",
    "Premium living",
  ],

  agency: {
    eyebrow: "The agency",
    heading: "We find the home. We make it shine.",
    body: "O&CO is a premium property agency in Cameroon. We source off-market and on-market homes, style and shoot them properly, and guide you from the first viewing to the day you move in.",
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

  testimonials: {
    eyebrow: "Client stories",
    heading: "People we've helped find home.",
    items: [
      {
        quote:
          "They found us a home that wasn't even on the market — and made the whole thing feel effortless.",
        name: "Marie & Thomas",
        role: "Bought in Douala",
        rating: 5,
      },
      {
        quote:
          "The way they present a home is on another level. We had three offers in a week.",
        name: "Sophie D.",
        role: "Sold in Kribi",
        rating: 5,
      },
      {
        quote:
          "Honest, fast and genuinely good taste. We wouldn't use anyone else.",
        name: "James & Olivia",
        role: "Rented in Yaoundé",
        rating: 5,
      },
    ],
  },

  reels: {
    eyebrow: "@ocohomes",
    heading: "The homes, the way they deserve to be seen.",
    body: "Walk-throughs and reveals of the premium homes we present. Tap a clip to watch full screen.",
    follow: "Follow on TikTok",
    captions: [
      "Inside an oceanfront villa in Limbé 🌿",
      "Penthouse reveal — Kribi beachfront ✨",
      "Akwa loft, Douala — full walk-through 🤍",
      "Golden hour at the Bastos villa 🌅",
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

  team: {
    eyebrow: "The team",
    heading: "Small team, serious attention.",
    body: "A handful of advisors who know their markets inside out — and stay with you from the first call to handover.",
    members: [
      { name: "Julien Mercier", role: "Partner", initials: "JM" },
      { name: "Camille Laurent", role: "Senior advisor — Littoral", initials: "CL" },
      { name: "Léa Fontaine", role: "Advisor — Centre", initials: "LF" },
      { name: "Noah Bertrand", role: "Head of presentation", initials: "NB" },
    ],
  },

  areas: {
    eyebrow: "Where we work",
    heading: "A few of our markets.",
    cta: "Explore",
    intro: "Premium homes at Cameroon's most sought-after addresses.",
    propertiesLabel: "properties",
    list: [
      { slug: "douala", name: "Douala", tagline: "Apartments & villas", description: "From Bonapriso to Bonanjo and Bonamoussadi — apartments, lofts and villas in the city's best neighbourhoods." },
      { slug: "yaounde", name: "Yaoundé", tagline: "Residences & villas", description: "Bastos and the hills around it — family villas and modern residences in the capital's most prestigious addresses." },
      { slug: "kribi", name: "Kribi", tagline: "Beachfront", description: "Penthouses and villas along the coast, steps from the beach and the lagoon." },
      { slug: "limbe", name: "Limbé", tagline: "Oceanfront", description: "Some of the coast's most private homes, with mature gardens and sweeping ocean views." },
    ],
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

  whatsapp: {
    contact: "Continue on WhatsApp",
    viewing: "Arrange via WhatsApp",
    contactMessage: "Hi O&CO, I'd like help finding a property.",
    viewingMessage: "Hi O&CO, I'd like to arrange a viewing for",
  },

  form: {
    title: "Tell us what you're looking for",
    name: "Full name",
    email: "Email",
    phone: "Phone (optional)",
    budget: "Budget",
    type: "What are you after?",
    area: "Preferred area",
    message: "Message",
    budgetOptions: ["For sale", "To rent", "No preference"],
    typeOptions: ["Buy", "Rent", "Sell", "Just exploring"],
    areaPlaceholder: "e.g. Douala, Yaoundé…",
    messagePlaceholder: "A few words about your project",
    submit: "Send enquiry",
    sending: "Sending…",
    success: "Thank you — we'll be in touch within 24 hours.",
    error: "Something went wrong. Please try again, or message us on WhatsApp.",
    required: "Please fill in the required fields.",
    consent: "By sending, you agree to be contacted about your enquiry.",
  },

  footer: {
    tagline: "Premium property agency in Cameroon. We source, style and showcase exceptional homes.",
    exploreLabel: "Explore",
    areasLabel: "Areas",
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
    playMusic: "Play music",
    pauseMusic: "Pause music",
  },
};

export type Dictionary = typeof en;
