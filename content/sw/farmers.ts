/**
 * KISWAHILI — Our Farmers.  PRIORITY 2, and the most important page in this
 * folder: the noticeboard is what members actually read, on a phone, often in
 * Kiswahili.  Translate `noticeboard` first, then the rest of the page.
 *
 * Every key left out falls back to English.  See ./README.md.
 */
import type { FarmersContent, DeepPartial } from '../types';
import { todo } from './todo';

export const farmers: DeepPartial<FarmersContent> = {
  hero: {
    eyebrow: todo('Our farmers'),
    title: todo('The society is its members'),
  },

  noticeboard: {
    eyebrow: todo('Members’ noticeboard'),
    heading: todo('Cherry price & payments'),
    lead: todo('Updated by the society office. Check here before you deliver.'),
    updated: todo('Last updated: to be confirmed'),
    priceLabel: todo('Cherry price now'),
    priceUnit: todo('per kilo of cherry'),
    priceFootnote: todo(
      'The rate shown is the current advance rate paid on delivery. The final rate is confirmed when the season’s sales close and the balance is paid.',
    ),
    // TODO(sw): `notices`, `collection` and `help` still to translate. They are
    // arrays and objects — copy the shape from ../en/farmers.ts and translate
    // the `label`, `value` and `detail` strings.
  },

  // TODO(sw): profiles, training, prefinance.
};
