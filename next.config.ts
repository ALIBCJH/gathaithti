import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Next 16 writes AGENTS.md and CLAUDE.md into the repo on dev start. This is
     a client project; keep the tree to what the client's developer needs. */
  agentRules: false,
  /* config options here */
};

export default nextConfig;
