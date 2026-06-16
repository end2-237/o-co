import type { Dictionary } from "./en";

export const fr: Dictionary = {
  meta: {
    title: "O&CO — Agence immobilière premium",
    titleTemplate: "%s | O&CO",
    description:
      "O&CO est une agence immobilière premium. Nous dénichons, mettons en scène et révélons des logements d'exception — et vous installons dans celui qui vous ressemble.",
    ogDescription:
      "Nous dénichons, mettons en scène et révélons des logements d'exception. Trouvez le bien premium qui vous ressemble.",
    keywords: [
      "agence immobilière premium",
      "immobilier de luxe",
      "appartements à vendre",
      "penthouses",
      "chasseur immobilier",
      "home staging",
      "agence immobilière",
      "O&CO",
    ],
  },

  nav: [
    { label: "Biens", hash: "properties" },
    { label: "Agence", hash: "agency" },
    { label: "Méthode", hash: "process" },
    { label: "Contact", hash: "contact" },
  ],

  header: { cta: "Prendre RDV" },

  hero: {
    eyebrow: "O&CO — Agence immobilière premium",
    headline: "Trouvez le logement qui vous ressemble.",
    ctaPrimary: "Prendre RDV",
    ctaSecondary: "Voir les biens",
    scrollCue: "Faites défiler",
  },

  immersive: {
    eyebrow: "Votre futur chez-vous",
    headline: "Un logement, ce ne sont pas des mètres carrés. C'est une vie.",
    body: "De la lumière du matin dans la cuisine à la vue dont on ne se lasse pas, on regarde au-delà du plan — pour trouver le lieu qui colle à votre vraie vie.",
    ctaPrimary: "Voir les biens",
    ctaSecondary: "Prendre RDV",
  },

  properties: {
    eyebrow: "Biens à la une",
    heading: "Une sélection triée sur le volet, présentée comme il se doit.",
    cta: "Nous contacter",
    forSale: "À vendre",
    forRent: "À louer",
    viewLabel: "Voir le bien",
    bedsLabel: "ch",
    bathsLabel: "sdb",
    items: [
      {
        slug: "saltwater-penthouse",
        name: "Penthouse Saltwater",
        location: "Cannes",
        areaSlug: "cannes",
        type: "Penthouse",
        price: "2,95 M€",
        priceValue: 2950000,
        status: "sale",
        beds: 3,
        baths: 3,
        surface: "185 m²",
        alt: "Un penthouse lumineux en front de mer avec terrasse et piscine",
        summary: "Penthouse en front de mer, terrasse panoramique et piscine privée.",
        description:
          "Un penthouse en dernier étage sur la Croisette, vue mer sans vis-à-vis, terrasse panoramique, piscine privée et intérieur baigné de lumière. À pied de la plage, du port et des meilleures tables.",
        agentName: "Camille Laurent",
        agentRole: "Conseillère senior — Riviera",
      },
      {
        slug: "north-light-apartment",
        name: "Appartement North Light",
        location: "Paris 3e",
        areaSlug: "paris",
        type: "Appartement",
        price: "1,45 M€",
        priceValue: 1450000,
        status: "sale",
        beds: 2,
        baths: 1,
        surface: "96 m²",
        alt: "Un appartement parisien chaleureux, assises en cuir et vue arborée",
        summary: "Un appartement élégant au cœur du Marais, double exposition.",
        description:
          "Un appartement tout en sobriété au cœur du Marais — double exposition, parquet chêne, cuisine rénovée et vue sur cour arborée. À deux pas des galeries, des cafés et de la place des Vosges.",
        agentName: "Léa Fontaine",
        agentRole: "Conseillère — Paris",
      },
      {
        slug: "ironbark-villa",
        name: "Villa Ironbark",
        location: "Saint-Tropez",
        areaSlug: "saint-tropez",
        type: "Villa",
        price: "3,20 M€",
        priceValue: 3200000,
        status: "sale",
        beds: 5,
        baths: 4,
        surface: "320 m²",
        alt: "Une villa contemporaine bardée de bois et jardins paysagers",
        summary: "Une villa contemporaine avec jardins et piscine chauffée.",
        description:
          "Une villa contemporaine à quelques minutes du village — bois et pierre, beaux volumes, jardins paysagers et piscine chauffée. Pensée pour les longs étés et les réceptions faciles.",
        agentName: "Camille Laurent",
        agentRole: "Conseillère senior — Riviera",
      },
      {
        slug: "gallery-loft",
        name: "Loft Gallery",
        location: "Paris 11e",
        areaSlug: "paris",
        type: "Loft",
        price: "4 200 €/mois",
        priceValue: 4200,
        status: "rent",
        beds: 2,
        baths: 2,
        surface: "140 m²",
        alt: "Un loft baigné de lumière avec mur de cadres et verdure",
        summary: "Un loft double hauteur à louer, entièrement meublé.",
        description:
          "Un loft double hauteur avec mur de cadres, cuisine ouverte et lumière d'atelier — meublé et prêt à vivre. Une location rare dans le 11e, près d'Oberkampf et de Bastille.",
        agentName: "Léa Fontaine",
        agentRole: "Conseillère — Paris",
      },
      {
        slug: "esplanade-villa",
        name: "Villa Esplanade",
        location: "Cap-Ferrat",
        areaSlug: "cap-ferrat",
        type: "Villa",
        price: "4,10 M€",
        priceValue: 4100000,
        status: "sale",
        beds: 5,
        baths: 5,
        surface: "410 m²",
        alt: "Une villa contemporaine blanche ouverte sur une terrasse et piscine",
        summary: "Une villa contemporaine blanche avec vue mer panoramique.",
        description:
          "Une villa épurée, enduit blanc, sur le Cap — baies vitrées toute hauteur, jardin mature, piscine à débordement et vue dégagée sur la baie. Intimité totale, à quelques minutes du village.",
        agentName: "Julien Mercier",
        agentRole: "Associé",
      },
    ],
  },

  propertyDetail: {
    back: "Tous les biens",
    overviewTitle: "À propos de ce bien",
    factsTitle: "En un coup d'œil",
    labels: {
      price: "Prix",
      type: "Type",
      beds: "Chambres",
      baths: "Salles de bain",
      surface: "Surface",
      status: "Statut",
      location: "Emplacement",
      reference: "Référence",
    },
    galleryHint: "Touchez pour le plein écran",
    locationTitle: "Emplacement",
    locationNote: "Adresse exacte communiquée sur demande.",
    agentTitle: "Votre conseiller",
    viewingCta: "Organiser une visite",
    perMonth: "/mois",
  },

  marquee: [
    "Appartements",
    "Penthouses",
    "Maisons d'architecte",
    "Villas",
    "Lofts",
    "Vente & location",
    "Home staging",
    "Vivre premium",
  ],

  agency: {
    eyebrow: "L'agence",
    heading: "On trouve le bien. On le sublime.",
    body: "O&CO est une agence immobilière premium. On déniche des biens on et off-market, on les met en scène et on les filme comme il faut, puis on vous accompagne de la première visite au jour de l'emménagement.",
    stats: [
      { value: "600+", label: "Biens présentés" },
      { value: "< 30 jours", label: "Délai moyen avant offre" },
      { value: "4,9★", label: "Note clients" },
      { value: "100%", label: "Accompagnement sur-mesure" },
    ],
  },

  services: {
    eyebrow: "Comment on aide",
    heading: "Tout, entre la recherche et les clés.",
    cta: "Demander",
    items: [
      {
        no: "01",
        title: "Recherche & sourcing",
        description:
          "On chasse on et off-market les biens qui collent à votre brief, votre budget et votre vie — pas seulement ce qui est déjà en ligne.",
      },
      {
        no: "02",
        title: "Mise en scène & présentation",
        description:
          "Home staging, photo et les vidéos qui font notre réputation sur TikTok. Votre bien, à son meilleur.",
      },
      {
        no: "03",
        title: "Visites & négociation",
        description:
          "On gère les visites, les offres et les conversations difficiles, et on vous décroche le bon deal.",
      },
    ],
  },

  testimonials: {
    eyebrow: "Ils nous ont fait confiance",
    heading: "Celles et ceux qu'on a aidés à trouver leur chez-soi.",
    items: [
      {
        quote:
          "Ils nous ont trouvé un appartement qui n'était même pas sur le marché — et tout a été d'une simplicité folle.",
        name: "Marie & Thomas",
        role: "Achat à Paris 3e",
        rating: 5,
      },
      {
        quote:
          "Leur façon de présenter un bien est d'un autre niveau. Trois offres en une semaine.",
        name: "Sophie D.",
        role: "Vente à Cannes",
        rating: 5,
      },
      {
        quote:
          "Honnêtes, rapides et un vrai bon goût. On ne passerait par personne d'autre.",
        name: "James & Olivia",
        role: "Location à Paris 11e",
        rating: 5,
      },
    ],
  },

  reels: {
    eyebrow: "@ocohomes",
    heading: "Les biens, montrés comme ils le méritent.",
    body: "Visites et révélations des logements premium qu'on présente. Touchez un extrait pour le voir en plein écran.",
    follow: "Suivre sur TikTok",
    captions: [
      "Dans une villa à 4,1 M€ au Cap-Ferrat 🌿",
      "Révélation penthouse — front de mer à Cannes ✨",
      "Loft parisien, visite complète 🤍",
      "Heure dorée à la villa de Saint-Tropez 🌅",
    ],
    music: [
      "O&CO · son original",
      "intérieurs calmes · original",
      "O&CO · son original",
      "heure dorée · original",
    ],
  },

  process: {
    eyebrow: "Comment ça marche",
    heading: "Du premier appel à la première nuit.",
    steps: [
      { no: "01", title: "Brief", description: "On écoute — votre vie, votre budget, les non-négociables et les rêves." },
      { no: "02", title: "Sélection", description: "Une short-list de biens qui valent votre temps, on et off-market." },
      { no: "03", title: "Visites", description: "On visite, on challenge et on négocie, à vos côtés à chaque étape." },
      { no: "04", title: "Emménagement", description: "De l'offre à la remise des clés jusqu'à l'installation — et on reste proche après." },
    ],
    quote: "Un logement doit épouser votre façon de vivre, pas seulement votre façon de dormir.",
    quoteAuthor: "Principe O&CO",
  },

  team: {
    eyebrow: "L'équipe",
    heading: "Petite équipe, vraie attention.",
    body: "Une poignée de conseillers qui connaissent leur marché sur le bout des doigts — et qui vous suivent du premier appel à la remise des clés.",
    members: [
      { name: "Julien Mercier", role: "Associé", initials: "JM" },
      { name: "Camille Laurent", role: "Conseillère senior — Riviera", initials: "CL" },
      { name: "Léa Fontaine", role: "Conseillère — Paris", initials: "LF" },
      { name: "Noah Bertrand", role: "Responsable présentation", initials: "NB" },
    ],
  },

  areas: {
    eyebrow: "Où l'on travaille",
    heading: "Quelques-uns de nos marchés.",
    cta: "Découvrir",
    intro: "Des biens premium aux adresses les plus recherchées de France.",
    propertiesLabel: "biens",
    list: [
      { slug: "paris", name: "Paris", tagline: "Appartements & lofts", description: "Du Marais au 16e — appartements anciens, lofts et pied-à-terre dans les meilleurs arrondissements." },
      { slug: "cannes", name: "Cannes", tagline: "Vivre face mer", description: "Penthouses et villas sur la Croisette et les hauteurs, à deux pas de la plage et du Palais." },
      { slug: "saint-tropez", name: "Saint-Tropez", tagline: "Villas & jardins", description: "Villas contemporaines et traditionnelles à quelques minutes du village, des plages et des vignes." },
      { slug: "cap-ferrat", name: "Cap-Ferrat", tagline: "Rare & privé", description: "Quelques-unes des propriétés les plus privées de la Riviera, jardins matures et vue mer." },
    ],
  },

  cta: {
    eyebrow: "Lancez votre recherche",
    heading: "Trouvons votre prochain chez-vous.",
    body: "Dites-nous ce que vous cherchez. On accompagne un nombre limité de clients chaque saison, pour donner à chacun toute notre attention.",
    button: "Écrire à l'agence",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    officeLabel: "Bureau",
  },

  form: {
    title: "Dites-nous ce que vous cherchez",
    name: "Nom complet",
    email: "Email",
    phone: "Téléphone (optionnel)",
    budget: "Budget",
    type: "Vous cherchez à…",
    area: "Secteur souhaité",
    message: "Message",
    budgetOptions: ["< 1 M€", "1–2 M€", "2–4 M€", "4 M€+", "À louer"],
    typeOptions: ["Acheter", "Louer", "Vendre", "Je me renseigne"],
    areaPlaceholder: "ex. Paris, Cannes…",
    messagePlaceholder: "Quelques mots sur votre projet",
    submit: "Envoyer",
    sending: "Envoi…",
    success: "Merci — on revient vers vous sous 24 heures.",
    error: "Une erreur est survenue. Réessayez, ou écrivez-nous directement.",
    required: "Merci de remplir les champs obligatoires.",
    consent: "En envoyant, vous acceptez d'être recontacté au sujet de votre demande.",
  },

  footer: {
    tagline: "Agence immobilière premium. On déniche, on met en scène et on révèle des logements d'exception.",
    exploreLabel: "Explorer",
    areasLabel: "Secteurs",
    contactLabel: "Contact",
    officeLabel: "Bureau",
    rights: "Tous droits réservés.",
    region: "Agence immobilière premium",
  },

  a11y: {
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    switchLanguage: "Changer de langue",
    skipToContent: "Aller au contenu",
    home: "accueil",
  },
};
