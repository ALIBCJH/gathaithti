import { LADDER, rungFor } from '../../scripts/image-ladder.mjs';
import maxRung from '../../scripts/image-max.json';

/**
 * The image loader for the static cPanel build. Used ONLY when
 * BUILD_TARGET=cpanel; the Vercel build keeps Next's own optimiser.
 *
 * There is no server to resize anything, so this does not ask one to. It
 * names a file that scripts/build-images.mjs has already written:
 *
 *   /images/gathaithi-gate.jpg  +  width 828   ->   /_img/gathaithi-gate-828.webp
 *
 * WEBP IS THE NAME, AVIF IS WHAT ARRIVES. Every rung is written twice, and
 * .htaccess rewrites the request to the .avif sibling when the browser's
 * Accept header says it can read one. That keeps AVIF's smaller bytes without
 * needing two srcsets or a <picture> around every photograph — and if the
 * rewrite is ever missing or switched off, the URL still resolves to a real
 * WebP rather than to nothing.
 *
 * THE CEILING. Nothing in public/images is wider than 1,717px and half of it
 * is under 1,000px, so most sources cannot fill most of the ladder. Rather
 * than write four identical copies of an 848px portrait under four rung names,
 * scripts/build-images.mjs writes only the rungs a source can reach and
 * records the top one in image-max.json. This clamps to it, so the name always
 * exists — which on a static host is the difference between a slightly soft
 * photograph and a broken one.
 *
 * `quality` is ignored, because it was applied at encode time. next/image
 * passes it anyway.
 */
export default function cpanelImageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  /* Anything not under /images is not ours to rewrite — an absolute URL, or a
     file someone drops in /public later. Hand it back untouched. */
  if (!src.startsWith('/images/')) return src;

  const stem = src.slice('/images/'.length).replace(/\.[^./]+$/, '');
  const ceiling = (maxRung as Record<string, number>)[stem] ?? LADDER[LADDER.length - 1];

  return `/_img/${stem}-${Math.min(rungFor(width), ceiling)}.webp`;
}

export { LADDER };
