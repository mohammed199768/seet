import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { clients } from "@/content/clients";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/work", "/services", "/about", "/contact", ...clients.map((c) => `/work/${c.slug}`)];
  const now = new Date();
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${site.url}/${l}${p}`,
      lastModified: now,
      changeFrequency: p.startsWith("/work/") ? ("monthly" as const) : ("weekly" as const),
      priority: p === "" ? 1 : p.startsWith("/work/") ? 0.6 : 0.8,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${site.url}/${x}${p}`])) },
    })),
  );
}
