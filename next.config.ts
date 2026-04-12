import { execSync } from "node:child_process";
import type { NextConfig } from "next";

// Get git commit hash during build
const getGitHash = () => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch (_error) {
    return "dev";
  }
};

// The URL of the Account zone app - injected at deploy time
// See: https://nextjs.org/docs/app/guides/multi-zones
const ACCOUNT_ZONE_URL =
  process.env.ACCOUNT_ZONE_URL ?? "http://localhost:3001";


const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ["three"], // necessary to compile threejs
  // Empty turbopack config to use Next.js 16 defaults
  turbopack: {},
  // NOTE: output: "export" removed — rewrites() requires a Node.js server runtime.
  // The Dockerfile has been updated to use `next start` instead of `serve`.
  async rewrites() {
    return {
      // afterFiles: checked after local pages/public files are resolved.
      // This means the local /account WIP page.tsx takes precedence until
      // it is removed and the Account zone app is live.
      afterFiles: [
        {
          source: "/account/:path*",
          destination: `${ACCOUNT_ZONE_URL}/account/:path*`,
        },
      ],
    };
  },
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
