// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.animenewsnetwork.com",
        port: "",
        pathname: "/**",
      },
      // Add any other image hosts you might need
      {
        protocol: "https",
        hostname: "img.animechan.xyz",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
