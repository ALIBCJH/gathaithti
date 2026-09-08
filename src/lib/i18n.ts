import { en } from '@content/en';
import type { Dictionary } from '@content/types';

/**
 * ONE LANGUAGE, ONE DICTIONARY.
 *
 * The site was built bilingual: every page sat under a locale segment, and
 * this file deep-merged a Kiswahili translation over the English base so a
 * half-finished locale still rendered. Kiswahili was switched off long before
 * launch, and on 2026-09-08 the locale segment came out of the URLs with it —
 * /en/about became /about, which is the honest shape for a site with one
 * language.
 *
 * WHAT IS STILL THERE IF IT COMES BACK: content/sw holds the translation, and
 * the deep-merge that used to live here is in this file's git history. Putting
 * it back means moving the pages under a [locale] folder again — an afternoon,
 * not a rewrite. Nothing was deleted from content/.
 */
export const dict: Dictionary = en;

/** The one language this site is written in. Used for <html lang>. */
export const languageTag = 'en-KE';
export const ogLocale = 'en_KE';
