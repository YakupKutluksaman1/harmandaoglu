import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    qualities: [75, 85, 90],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2560, 3840],
    imageSizes: [64, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.harmandaoglu.com.tr" }],
        destination: "https://harmandaoglu.com.tr/:path*",
        permanent: true,
      },
      { source: "/isler", destination: "/", permanent: true },
      { source: "/isler/:path*", destination: "/", permanent: true },
      { source: "/yaklasim", destination: "/", permanent: true },
      { source: "/antalya", destination: "/", permanent: true },
      { source: "/iletisim", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
