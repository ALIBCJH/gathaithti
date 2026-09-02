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
  },
};

export default nextConfig;
