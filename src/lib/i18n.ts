import { en } from '@content/en';
import { sw } from '@content/sw';
import type { DeepPartial, Dictionary } from '@content/types';
import { defaultLocale, locales, type Locale } from '@content/site';

export { locales, defaultLocale };
export type { Locale };

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/**
 * Deep-merges a translation over the English base. Arrays replace wholesale —
 * a translated list is translated in full or not at all. Anything missing from
 * the translation keeps its English value, so a half-finished locale renders.
 */
function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (!isPlainObject(base) || !isPlainObject(override)) return override as T;

  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    out[key] = deepMerge((base as Record<string, unknown>)[key], value);
  }
  return out as T;
}

/**
 * Keyed by string, not by Locale: the Kiswahili dictionary stays built and
 * ready even while `locales` in content/site.ts lists English only, so
 * switching the language back on needs no change here.
 */
const dictionaries: Record<string, Dictionary> = {
  en,
  sw: deepMerge(en, sw as DeepPartial<Dictionary>),
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** True while any part of a locale is still awaiting translation. */
export function isTranslationPending(locale: Locale): boolean {
  return locale !== defaultLocale;
}
