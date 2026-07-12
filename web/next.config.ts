import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    // AVIF first — noticeably crisper than WebP at the same byte size,
    // which matters for the fine metal/optic detail in product renders.
    formats: ["image/avif", "image/webp"],
    // Optimized variants barely change between deploys — let browsers and the
    // CDN hold them for a day instead of Next's 60s default.
    minimumCacheTTL: 86400,
    remotePatterns: [
      // CloudFront CDN (site assets + CMS uploads)
      { protocol: "https", hostname: "*.cloudfront.net", pathname: "/**" },
      { protocol: "https", hostname: "*.s3.*.amazonaws.com", pathname: "/**" },
      { protocol: "https", hostname: "*.s3.amazonaws.com", pathname: "/**" },
      { protocol: "https", hostname: "alburhan-asset.s3.eu-north-1.amazonaws.com", pathname: "/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "8001", pathname: "/uploads/**" },
      { protocol: "http", hostname: "13.60.4.75", port: "8002", pathname: "/uploads/**" },
    ],
  },
  async headers() {
    return [
      {
        // Small chrome that stays in /public (logo, favicons) — cache hard.
        source: "/:file(logo.png|icon.png|apple-icon.png|favicon.ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

export default nextConfig;
