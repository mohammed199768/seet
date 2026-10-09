import { NextResponse, type NextRequest } from "next/server";

const locales = ["ar", "en"];

/** Send locale-less URLs to /ar or /en based on Accept-Language (Arabic by default). */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const accept = request.headers.get("accept-language") ?? "";
  const prefersEn = /^en\b/i.test(accept.trim()) && !/\bar\b/i.test(accept.split(",")[0]);
  const locale = prefersEn ? "en" : "ar";
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
