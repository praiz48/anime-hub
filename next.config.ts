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
      {
        protocol: "https",
        hostname: "s4.anilist.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.anilist.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.anilist.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "trace.moe",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.trace.moe",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.trace.moe",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nekos.best",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
