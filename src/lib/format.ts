/** Typographic helpers. Prefer writing the real characters into content files. */

const NBSP = ' ';

/** Glues a value to its unit so a line break can never separate them. */
export const withUnit = (value: string, unit?: string) =>
  unit ? `${value}${NBSP}${unit}` : value;

/** Straight quotes and hyphens are a tell. This is a safety net, not a licence. */
export function typographic(input: string): string {
  return input
    .replace(/(\d)\s?-\s?(\d)/g, '$1–$2')
    .replace(/(\w)'(\w)/g, '$1’$2')
    .replace(/"(\w[^"]*)"/g, '“$1”');
}

export const NON_BREAKING_SPACE = NBSP;
