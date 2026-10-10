import type { Metadata, Viewport } from "next";
import "../globals.css";
import { sans, display, label } from "@/lib/fonts";
import { dirOf, locales, type Locale } from "@/lib/i18n";
import { getDict, resolveLang } from "@/lib/dictionary";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { TransitionProvider } from "@/components/providers/Transition";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { Preloader, preloaderScript } from "@/components/ui/Preloader";
import { Analytics } from "@/components/layout/Analytics";
import { jsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#2B2A68",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: lang === "ar" ? "%s | صيت" : "%s | SEET" },
    description: t.meta.description,
    applicationName: "SEET",
    alternates: {
      canonical: `/${lang}`,
      languages: { ar: "/ar", en: "/en", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: lang === "ar" ? "صيت" : "SEET Marketing Agency",
      locale: lang === "ar" ? "ar_AR" : "en_US",
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: { card: "summary_large_image" },
    formatDetection: { telephone: false },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const lang = (await resolveLang(params)) as Locale;
  const t = getDict(lang);

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SEET Marketing Agency",
    alternateName: "صيت",
    url: site.url,
    logo: `${site.url}/brand/logo-primary.png`,
    slogan: "Make the brand visible.",
    address: { "@type": "PostalAddress", addressLocality: "Beni Suef", addressCountry: "EG" },
    ...(site.email ? { email: site.email } : {}),
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
  };

  return (
    <html lang={lang} dir={dirOf(lang)} className={`${sans.variable} ${display.variable} ${label.variable}`} suppressHydrationWarning>
      <body>
        {/* runs during HTML parse, before first paint: decides whether the preloader shows */}
        <script dangerouslySetInnerHTML={{ __html: preloaderScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(orgLd) }} />
        <SmoothScroll>
          <TransitionProvider>
            <Preloader label={t.preloader.label} />
            <Header lang={lang} t={{ ...t.nav, location: site.location[lang] }} />
            <main id="main" tabIndex={-1}>
              {children}
            </main>
            <Footer lang={lang} t={t} />
            <Cursor labels={t.cursor} />
          </TransitionProvider>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
