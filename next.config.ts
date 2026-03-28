import type { NextConfig } from "next";
import { execSync } from "child_process";

// Get git commit hash during build
const getGitHash = () => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch (error) {
    return "dev";
  }
};

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ["three"], // necessary to compile threejs
  // Empty turbopack config to use Next.js 16 defaults
  turbopack: {},
  output: "export",
  env: {
    NEXT_PUBLIC_GIT_HASH: getGitHash(),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "secure.meetupstatic.com",
      },
      {
        protocol: "https",
        hostname: "secure-content.meetupstatic.com",
      },
    ],
  },
};

export default nextConfig;
