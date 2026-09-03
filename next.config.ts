import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Next 16 writes AGENTS.md and CLAUDE.md into the repo on dev start. This is
     a client project; keep the tree to what the client's developer needs. */
  agentRules: false,
  images: {
    /* Next 16 will only honour a quality it has been told about — anything else
       is refused by the optimiser ("q parameter of 74 is not allowed") and the
       markup quietly falls back to 75. The two values the components actually
       ask for were therefore doing nothing at all: the hero's 74 and every
       photograph's 72 were both being served at 75. Declared here so the
       numbers written in the components are the numbers that ship. */
    qualities: [72, 74, 75],

    /* AVIF first. Next serves the first format the browser accepts, and AVIF
       is materially smaller than WebP at the same quality on photographs —
       which is all this site has. A browser that does not accept it still gets
       the WebP, and one that accepts neither still gets the original. */
    formats: ['image/avif', 'image/webp'],

    /* The ladder Next picks a width from, and it is the DEFAULT list with two
       changes.

       1366 and 1536 are ADDED because the gap between 1200 and 1920 was doing
       real damage: a photograph needing 1232px — the processing frames on a 2x
       desktop — had nothing to take but 1920, which is 2.4x the pixels for a
       box it overshoots by a quarter.

       3840 is REMOVED. Nothing on this site is 3840 CSS pixels wide; the only
       thing that ever asked for it was a full-bleed hero on a 3x phone, where
       the image is scaled to cover the viewport's HEIGHT and so genuinely
       needs about 1500 CSS px of width — 4500 device px. That is a third of a
       megabyte of photograph delivered to a phone, which on the intermittent
       connections this site is actually read over is the wrong trade. Capped
       at 2048 the same hero is about 1.4x density on a 3x screen: softer than
       theoretically perfect, indistinguishable in practice on a photograph,
       and a fraction of the bytes.

       The cost is honest and worth stating: a full-bleed photograph on a very
       large high-density display (a 2560px window at 2x) now tops out at 2048
       rather than 3840. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1366, 1536, 1920, 2048],
  },
};

export default nextConfig;
