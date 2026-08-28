# Kiswahili content — for the translator

> **This locale is currently switched off.** The site ships English only: there
> is no language toggle in the header and `/sw` redirects to `/en`. Everything
> below still applies — the files, the fallback and the tooling are intact — but
> before any of it appears on the site, add `'sw'` back to `locales` in
> `content/site.ts` (that file lists the three steps).

Every file in this folder mirrors the matching file in `../en`. Each exports a
`DeepPartial<…>` of the same shape, which means:

* **You do not have to translate everything at once.** Any key you leave out
  falls back to the English text automatically. Nothing breaks and nothing
  renders blank.
* **Translate by replacing `todo('…')` with a plain Kiswahili string.** The
  English source is inside the `todo()` call so you can see what you are
  translating. `todo()` returns the English text unchanged, so an untranslated
  string simply shows in English.
* **Keep `{{tokens}}` exactly as they are.** `{{members}}`, `{{cuppingScore}}`
  and the rest are placeholders that the site fills in with the current figure
  from `content/facts.ts`. Move them around the sentence as Kiswahili grammar
  requires, but do not translate or delete them.
* **Keep the punctuation style.** Curly quotes (’ “ ”), en dashes in ranges
  (16–26), and the non-breaking space between a number and its unit.

Nothing here has been machine-translated. The site shows a notice on Kiswahili
pages saying the translation is in progress; delete that notice from
`content/sw/common.ts` (`locale.pending`) once the translation is complete.

## Priority order

1. `common.ts` — navigation, buttons, footer. Seen on every page.
2. `farmers.ts` — the members' noticeboard. This is the section members
   actually use, and the one most likely to be read in Kiswahili.
3. `home.ts`, `contact.ts`
4. `about.ts`, `products.ts` — long editorial copy, mostly read by
   international buyers in English.
