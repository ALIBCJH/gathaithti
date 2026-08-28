#!/usr/bin/env node
/**
 * npm run images
 *
 * Keeps three things in agreement:
 *   content/images.ts        the slots the site renders
 *   public/images/IMAGES.md  the shot list handed to the photographer
 *   public/images/*          the photographs that have actually arrived
 */

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const registrySource = readFileSync(join(root, 'content/images.ts'), 'utf8');
const shotList = readFileSync(join(root, 'public/images/IMAGES.md'), 'utf8');

const registry = [...registrySource.matchAll(/file: '([^']+)'/g)].map((m) => m[1]);
const listed = new Set([...shotList.matchAll(/\| `([^`]+\.jpg)`/g)].map((m) => m[1]));
const onDisk = new Set(
  readdirSync(join(root, 'public/images')).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)),
);

const E = String.fromCharCode(27) + '[';
const bold = (s) => `${E}1m${s}${E}0m`;
const dim = (s) => `${E}2m${s}${E}0m`;
const red = (s) => `${E}31m${s}${E}0m`;
const green = (s) => `${E}32m${s}${E}0m`;
const yellow = (s) => `${E}33m${s}${E}0m`;

console.log(`\n${bold('Image slots')}  -  content/images.ts vs public/images\n`);

let filled = 0;
for (const file of registry) {
  const here = onDisk.has(file);
  if (here) filled += 1;
  console.log(`  ${here ? green('y') : dim('.')} ${here ? file : dim(file)}`);
}

console.log(`\n${filled} of ${registry.length} slots filled.\n`);

const missingFromList = registry.filter((f) => !listed.has(f));
if (missingFromList.length) {
  console.log(red('In the registry but missing from IMAGES.md - nobody will know to shoot these:'));
  for (const f of missingFromList) console.log(`  ${f}`);
  console.log();
}

const strays = [...onDisk].filter((f) => !registry.includes(f));
if (strays.length) {
  console.log(yellow('In public/images but used by no slot - check the filename for a typo:'));
  for (const f of strays) console.log(`  ${f}`);
  console.log();
}

if (missingFromList.length) process.exit(1);
