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
    items: [
      { name: "Penthouse Saltwater", location: "Cannes", type: "Penthouse", price: "2,95 M€", status: "sale", alt: "Un penthouse lumineux en front de mer avec terrasse et piscine" },
      { name: "Appartement North Light", location: "Paris 3e", type: "Appartement", price: "1,45 M€", status: "sale", alt: "Un appartement parisien chaleureux, assises en cuir et vue arborée" },
      { name: "Villa Ironbark", location: "Saint-Tropez", type: "Villa", price: "3,20 M€", status: "sale", alt: "Une villa contemporaine bardée de bois et jardins paysagers" },
      { name: "Loft Gallery", location: "Paris 11e", type: "Loft", price: "4 200 €/mois", status: "rent", alt: "Un loft baigné de lumière avec mur de cadres et verdure" },
      { name: "Villa Esplanade", location: "Cap-Ferrat", type: "Villa", price: "4,10 M€", status: "sale", alt: "Une villa contemporaine blanche ouverte sur une terrasse et piscine" },
    ],
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

  cta: {
    eyebrow: "Lancez votre recherche",
    heading: "Trouvons votre prochain chez-vous.",
    body: "Dites-nous ce que vous cherchez. On accompagne un nombre limité de clients chaque saison, pour donner à chacun toute notre attention.",
    button: "Écrire à l'agence",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    officeLabel: "Bureau",
  },

  footer: {
    tagline: "Agence immobilière premium. On déniche, on met en scène et on révèle des logements d'exception.",
    exploreLabel: "Explorer",
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
