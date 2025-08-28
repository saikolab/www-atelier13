// src/i18n/config.ts
export const DEFAULT_LOCALE = 'en' as const;
export const LOCALES = ['en','el'] as const;
export type Locale = typeof LOCALES[number];
export const isLocale = (x: string): x is Locale =>
  (LOCALES as readonly string[]).includes(x);
