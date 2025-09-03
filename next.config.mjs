// next.config.mjs
import bundleAnalyzer from "@next/bundle-analyzer";
import { env } from "node:process"; 
import createNextIntlPlugin from 'next-intl/plugin';
import { withContentlayer } from 'next-contentlayer';

const withNextIntl = createNextIntlPlugin();

/** Habilítalo con: ANALYZE=true npm run build */
const withBundleAnalyzer = bundleAnalyzer({
  enabled: env.ANALYZE === "true", // 👈 usa env
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  output: "standalone",

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 días
    remotePatterns: [], // añade dominios externos si usas <Image> remota
  },

  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|css|js|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default withContentlayer(withNextIntl(withBundleAnalyzer(nextConfig)));

