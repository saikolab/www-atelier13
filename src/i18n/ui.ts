import type { Locale } from './config';

const UI = {
  nav: {
    home: { en: 'Home', el: 'Αρχική' },
    portfolio: { en: 'Portfolio', el: 'Έργα' },
    elements: { en: 'Elements', el: 'Στοιχεία' },
    contact: { en: 'Contact', el: 'Επικοινωνία' },
  },
  hero: {
    title: { en: 'Atelier 13 Interiors', el: 'Atelier 13 Interiors' },
    subtitle: {
      en: "Transform your living space, enhance your quality of life, optimise your investment's potential.",
      el: 'Μεταμορφώστε τον χώρο σας, βελτιώστε την ποιότητα ζωής, μεγιστοποιήστε την αξία της επένδυσής σας.',
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
    portfolioSection: {
    headline: {
        en: "The moments you'll want to relive in a timeless, romantic, and artistic style.",
        el: "Στιγμές που θα θέλετε να ζείτε ξανά με διαχρονικό, ρομαντικό και καλλιτεχνικό ύφος.",
    },
    viewAll: { en: "View all portfolios", el: "Δείτε όλα τα έργα" },
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
