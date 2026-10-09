import { notFound } from "next/navigation";
import ar from "@/dictionaries/ar";
import en from "@/dictionaries/en";
import { isLocale, type Locale } from "./i18n";

const dictionaries = { ar, en };

export const getDict = (l: Locale) => dictionaries[l];

/** Resolve the `[lang]` route param or 404. */
export async function resolveLang(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}

export const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
