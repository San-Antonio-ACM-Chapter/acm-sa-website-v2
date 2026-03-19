import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ["three"], // necessary to compile threejs
  // Empty turbopack config to use Next.js 16 defaults
  turbopack: {},
  output: "export",
};

export default nextConfig;
