import { facts, type FactId } from '@content/facts';
import { site } from '@content/site';
import type { Fact } from '@content/types';

/**
 * Copy may contain {{tokens}}. Two kinds resolve:
 *   {{cuppingScore}}   — an entry in content/facts.ts
 *   {{buyerEmail}}     — a contact detail from content/site.ts
 * Anything else is left visible as {{unknown}} so a typo is obvious on screen
 * rather than silently rendering nothing.
 */

const contactTokens: Record<string, string> = {
  officePhone: site.contact.officePhone.display,
  officeEmail: site.contact.officeEmail.display,
  buyerEmail: site.contact.buyerEmail.display,
  memberLine: site.contact.memberLine.display,
  buyerContact: site.contact.buyerContact.name,
};

export function getFact(id: string): Fact | undefined {
  return (facts as Record<string, Fact>)[id];
}

export function isFactId(id: string): id is FactId {
  return id in facts;
}

export type Segment =
  | { type: 'text'; value: string }
  | { type: 'fact'; fact: Fact }
  | { type: 'contact'; value: string }
  | { type: 'unknown'; value: string };

const TOKEN = /\{\{([a-zA-Z0-9_]+)\}\}/g;

/** Splits a copy string into plain text and resolved tokens. */
export function segments(text: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;

  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) out.push({ type: 'text', value: text.slice(last, index) });

    const key = match[1];
    const fact = getFact(key);
    if (fact) out.push({ type: 'fact', fact });
    else if (key in contactTokens) out.push({ type: 'contact', value: contactTokens[key] });
    else out.push({ type: 'unknown', value: match[0] });

    last = index + match[0].length;
  }

  if (last < text.length) out.push({ type: 'text', value: text.slice(last) });
  return out;
}

/** Plain-string resolution, for <title>, meta descriptions and JSON-LD. */
export function resolve(text: string): string {
  return segments(text)
    .map((s) =>
      s.type === 'text' || s.type === 'unknown'
        ? s.value
        : s.type === 'contact'
          ? s.value
          : s.fact.display,
    )
    .join('');
}

export { facts };
export type { Fact, FactId };
