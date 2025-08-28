// src/i18n/utils.ts
import type { Locale } from './config';
import { DEFAULT_LOCALE, LOCALES, isLocale } from './config';

export function getLangFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/');
  return isLocale(maybeLocale) ? maybeLocale : DEFAULT_LOCALE;
}

// Prefix a path with the current lang (and avoid double-prefixing)
export function localizedPath(lang: Locale, path: string) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const parts = clean.split('/').filter(Boolean);
  if (parts.length && LOCALES.includes(parts[0] as Locale)) return `/${lang}/${parts.slice(1).join('/')}`;
  return `/${lang}${clean}`;
}
