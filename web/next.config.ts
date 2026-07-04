import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    // AVIF first — noticeably crisper than WebP at the same byte size,
    // which matters for the fine metal/optic detail in product renders.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "*.s3.*.amazonaws.com", pathname: "/**" },
      { protocol: "https", hostname: "*.s3.amazonaws.com", pathname: "/**" },
      { protocol: "https", hostname: "alburhan-asset.s3.eu-north-1.amazonaws.com", pathname: "/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "8001", pathname: "/uploads/**" },
      { protocol: "http", hostname: "13.60.4.75", port: "8002", pathname: "/uploads/**" },
    ],
  },
};

export default nextConfig;
