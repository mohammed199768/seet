"use client";

import variants from "./image-variants.json";

const caps: Record<string, number> = variants.caps;
const roots = /^\/(?:work|media|brand)\//;

/**
 * next/image loader for the static variants built by scripts/image-variants.mjs:
 * each srcset width maps to /img/<width>/<path>.webp, or to the original once the
 * requested width reaches the source's own size.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!roots.test(src)) return src;
  const cap = caps[src] ?? variants.defaultCap;
  return width <= cap ? `/img/${width}${src.replace(/\.(?:jpe?g|png)$/i, ".webp")}` : src;
}
