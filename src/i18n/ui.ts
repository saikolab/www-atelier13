import type { Locale } from './config';

const UI = {
  buttons: {
    viewMore: { en: 'View More', el: 'Δείτε περισσότερα' },
    getQuote: { en: 'Get a quote', el: 'Λάβετε προσφορά' },
  },
  testimonialsSection: {
    title: { en: 'What our clients say', el: 'Τι λένε οι πελάτες μας' },
  },
  nav: {
    home: { en: 'Home', el: 'Αρχική' },
    portfolio: { en: 'Portfolio', el: 'Έργα' },
    elements: { en: 'Elements', el: 'Στοιχεία' },
    contact: { en: 'Contact', el: 'Επικοινωνία' },
    gallery: { en: 'Gallery', el: 'Συλλογή'},
    services: { en: 'Services', el: 'Υπηρεσίες' },
    pages: { en: 'Pages', el: 'Σελίδες' },
    project: { en: 'About us', el: 'Σχετικά με εμάς' },
    legal: { en: 'Legal', el: 'Νομικά' },
  },
  hero: {
    title: { en: 'Atelier 13 Interiors', el: 'Atelier 13 Interiors' },
    subtitle: {
      en: "Transform spaces with thoughtful, functional, and timeless interior design.",
      el: 'Μεταμορφώνουμε χώρους με προσεγμένο, λειτουργικό και διαχρονικό σχεδιασμό.',
    },
    cta: { en: "Let's get in touch", el: 'Ας μιλήσουμε' },
  },
  contactPage: {
    title: { en: 'Contact Us', el: 'Επικοινωνία' },
    subtitle: {
      en: 'Pick the channel you prefer and we will get back to you as soon as possible.',
      el: 'Διαλέξτε το κανάλι που προτιμάτε και θα σας απαντήσουμε το συντομότερο.',
    },
    email: { en: 'Email', el: 'Email' },
    phone: { en: 'Phone', el: 'Τηλέφωνο' },
    whatsapp: { en: 'WhatsApp', el: 'WhatsApp' },
    instagram: { en: 'Instagram', el: 'Instagram' },
    openOnWhatsApp: { en: 'Open in WhatsApp', el: 'Άνοιγμα στο WhatsApp' },
    callNow: { en: 'Call now', el: 'Κλήση τώρα' },
    sendEmail: { en: 'Send email', el: 'Αποστολή email' },
    visitInstagram: { en: 'Visit Instagram', el: 'Προβολή στο Instagram' },
    copy: { en: 'Copy', el: 'Αντιγραφή' },
    copied: { en: 'Copied!', el: 'Αντιγράφηκε!' },
  },
  footer: {
    rights: { en: 'All rights reserved.', el: 'Με την επιφύλαξη παντός δικαιώματος.' },
  },
  pricingSection: {
    title: { en: 'Design Services', el: 'Υπηρεσίες σχεδιασμού' },
  },
    portfolioSection: {
    headline: {
        en: "Elevated interiors designed for how you live and work.",
        el: "Εσωτερικοί χώροι υψηλής αισθητικής για τον τρόπο που ζείτε και εργάζεστε.",
    },
    viewAll: { en: "View all projects", el: "Δείτε όλα τα έργα" },
    fallback: {
        en: "More projects in this language are coming soon.",
        el: "Περισσότερα έργα στη γλώσσα αυτή έρχονται σύντομα.",
    },
    },
} as const;

export function t<K extends keyof typeof UI, S extends keyof (typeof UI)[K]>(
  lang: Locale,
  key: K,
  subkey: S
): string {
  const entry = UI[key][subkey] as Record<Locale, string>;
  return entry[lang] ?? entry.en;
}
