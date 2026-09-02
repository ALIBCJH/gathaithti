/**
 * A 4×5 warm parchment gradient, inlined as the blur-up placeholder for every
 * photograph. Photographs resolve out of a warm field rather than popping in
 * from grey — and it costs 220 bytes instead of a per-image LQIP pipeline.
 *
 * It lives here, apart from `lib/images.ts`, because that module reads the
 * filesystem to resolve slots and is therefore server-only. A client component
 * that wanted this string used to drag `node:fs` into the browser bundle, and
 * Turbopack fails the build rather than shipping it.
 */
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="10"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#EFE4D2"/><stop offset="60%" stop-color="#DCC9AE"/><stop offset="100%" stop-color="#B99C7C"/></linearGradient></defs><rect width="8" height="10" fill="url(#g)"/></svg>',
  ).toString('base64');
