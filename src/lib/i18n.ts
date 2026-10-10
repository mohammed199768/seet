export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const dirOf = (l: Locale) => (l === "ar" ? "rtl" : "ltr");
export const otherLocale = (l: Locale): Locale => (l === "ar" ? "en" : "ar");

/** Prefix a path with the locale: href("en", "/work") -> "/en/work" */
export const href = (l: Locale, path = "/") => `/${l}${path === "/" ? "" : path}`;

/** Replace the locale segment of a pathname. */
export const swapLocale = (pathname: string, to: Locale) => {
  const parts = pathname.split("/");
  if (parts[1] && isLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || `/${to}`;
};
