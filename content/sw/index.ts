import type { DeepPartial, Dictionary } from '../types';
import { common } from './common';
import { home } from './home';
import { about } from './about';
import { products } from './products';
import { farmers } from './farmers';
import { contact } from './contact';

/**
 * A partial dictionary. It is deep-merged over the English one at render time,
 * so any key that has not been translated yet falls back to English.
 */
export const sw: DeepPartial<Dictionary> = { common, home, about, products, farmers, contact };
