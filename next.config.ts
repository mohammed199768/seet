import type { NextConfig } from "next";
import variants from "./src/lib/image-variants.json";

/**
 * Report-only for now: violations are logged in the browser console without blocking anything.
 * Inline scripts (Next's flight data, the preloader gate, JSON-LD) still need 'unsafe-inline';
 * analytics hosts are listed for when their env IDs are set.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://www.facebook.com",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://connect.facebook.net https://www.facebook.com",
  "form-action 'self' https://formspree.io",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // No runtime optimizer: srcset widths map to static variants built by scripts/image-variants.mjs.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    qualities: [70, 80, 85, 90],
    deviceSizes: variants.deviceSizes,
    imageSizes: variants.imageSizes,
  },
  async headers() {
    return [
      {
        source: "/:dir(media|work|brand|img)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // dev needs eval for fast refresh, so the policy is only sent by production builds
          ...(process.env.NODE_ENV === "production"
            ? [{ key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy }]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;
