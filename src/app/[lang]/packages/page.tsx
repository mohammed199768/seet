import type { Metadata } from "next";
import { getDict, resolveLang } from "@/lib/dictionary";
import { href } from "@/lib/i18n";
import { site } from "@/content/site";
import { socialPackages, packageBenefits, packageTerms } from "@/content/packages";
import { jsonLd } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/PageHero";
import { Packages } from "@/components/sections/Packages";
import { Cta } from "@/components/sections/Cta";
import { Lines, Reveal } from "@/components/motion/Reveal";
import styles from "./packages.module.css";

type PackagesPageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PackagesPageProps): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang);
  return {
    title: t.packagesPage.title,
    description: t.packagesPage.intro,
    alternates: {
      canonical: `/${lang}/packages`,
      languages: { ar: "/ar/packages", en: "/en/packages", "x-default": "/en/packages" },
    },
  };
}

export default async function PackagesPage({ params }: PackagesPageProps) {
  const lang = await resolveLang(params);
  const t = getDict(lang);
  const ld = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "SEET Social Media Management Packages",
    url: `${site.url}/${lang}/packages`,
    itemListElement: socialPackages.map((plan) => ({
      "@type": "Offer",
      name: `${plan.title} — ${plan.name[lang]}`,
      priceCurrency: "EGP",
      price: plan.price[lang].match(/[\d,]+/)?.[0]?.replace(",", ""),
      description: plan.description[lang],
      url: `${site.url}/${lang}/packages#${plan.id}`,
      seller: { "@type": "Organization", name: "SEET Marketing Agency", url: site.url },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
      <PageHero title={t.packagesPage.title} intro={t.packagesPage.intro} />
      <Packages lang={lang} t={t.packagesSection} />

      <section className={styles.details}>
        <div className={`wrap ${styles.detailGrid}`}>
          <div className={styles.panel}>
            <Lines as="h2" lines={[t.packagesPage.benefitsTitle]} className={`${styles.detailTitle} h3`} />
            <Reveal as="ul" className={styles.list} stagger={0.05}>
              {packageBenefits[lang].map((item) => <li key={item} data-r>{item}</li>)}
            </Reveal>
          </div>
          <div className={`${styles.panel} ${styles.terms}`}>
            <Lines as="h2" lines={[t.packagesPage.termsTitle]} className={`${styles.detailTitle} h3`} />
            <Reveal as="ul" className={styles.list} stagger={0.03}>
              {packageTerms[lang].map((item) => <li key={item} data-r>{item}</li>)}
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.promise} data-theme="navy">
        <div className="wrap">
          <p className="label">SEET MARKETING AGENCY</p>
          <p className={`${styles.promiseText} h2`}>{t.packagesPage.promise}</p>
        </div>
      </section>
      <Cta lines={t.cta.lines} sub={t.cta.sub} button={t.cta.button} buttonHref={href(lang, "/contact?service=social-media")} />
    </>
  );
}
