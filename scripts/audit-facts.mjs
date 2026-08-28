#!/usr/bin/env node
/**
 * npm run facts             list every statistic and whether it is confirmed
 * npm run facts -- --strict exit 1 if anything is still unverified
 *
 * Reads content/facts.ts directly. No TypeScript runtime, no dependency - this
 * has to work on any machine that can run the site.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(join(root, 'content/facts.ts'), 'utf8');

const entries = [...source.matchAll(/\n {2}(\w+): \{([\s\S]*?)\n {2}\},/g)].map(([, key, body]) => {
  const field = (name) => {
    const match = body.match(new RegExp(`${name}: (?:'((?:[^'\\\\]|\\\\.)*)'|([^,\\n]+))`));
    return match ? (match[1] ?? match[2]).trim() : '';
  };
  return {
    id: key,
    label: field('label'),
    display: field('display'),
    verified: field('verified') === 'true',
    note: field('note'),
  };
});

const E = String.fromCharCode(27) + '[';
const bold = (s) => `${E}1m${s}${E}0m`;
const dim = (s) => `${E}2m${s}${E}0m`;
const red = (s) => `${E}31m${s}${E}0m`;
const green = (s) => `${E}32m${s}${E}0m`;

const strict = process.argv.includes('--strict');
const unverified = entries.filter((entry) => !entry.verified);
const pad = (value, width) => String(value).padEnd(width);

console.log(`\n${bold('Statistics on the Gathaithi site')}  -  content/facts.ts\n`);
console.log(dim(`    ${pad('id', 22)}${pad('shows as', 22)}label`));

for (const entry of entries) {
  const mark = entry.verified ? green('  y') : red('  .');
  console.log(`${mark} ${pad(entry.id, 22)}${pad(entry.display, 22)}${dim(entry.label)}`);
}

console.log(
  `\n${entries.length} figures - ${green(`${entries.length - unverified.length} confirmed`)} - ${
    unverified.length ? red(`${unverified.length} still unverified`) : green('none outstanding')
  }\n`,
);

if (unverified.length) {
  console.log(bold('Still to confirm with the society:\n'));
  for (const entry of unverified) {
    console.log(`  ${bold(entry.id)}  ${dim('->')} ${entry.note || 'No note.'}`);
  }
  console.log(`\n${dim('Set verified: true and fill in `source` once each is confirmed.')}`);
  console.log(dim('To mark them on the pages: NEXT_PUBLIC_SHOW_UNVERIFIED=1 npm run dev\n'));
}

if (strict && unverified.length) process.exit(1);
