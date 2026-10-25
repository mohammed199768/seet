import type { Metadata } from "next";
import Image from "next/image";
import { getDict, resolveLang } from "@/lib/dictionary";
import { href } from "@/lib/i18n";
import { jsonLd } from "@/lib/jsonld";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { Cta } from "@/components/sections/Cta";
import { ClipReveal, Lines, Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import styles from "./services.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang);
  return {
    title: t.servicesPage.title,
    description: t.servicesPage.intro,
    alternates: { canonical: `/${lang}/services`, languages: { ar: "/ar/services", en: "/en/services", "x-default": "/en/services" } },
  };
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const lang = await resolveLang(params);
  const t = getDict(lang);

  const ld = {
    "@context": "https://schema.org",
    "@graph": services.map((s) => ({
      "@type": "Service",
      name: s.title[lang],
      description: s.short[lang],
      provider: { "@type": "Organization", name: "SEET Marketing Agency", url: site.url },
      url: `${site.url}/${lang}/services#${s.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
      <PageHero title={t.servicesPage.title} intro={t.servicesPage.intro} />

      <nav className={styles.index} aria-label={t.servicesPage.title}>
        <Reveal as="ul" className="wrap" stagger={0.04}>
          {services.map((s) => (
            <li key={s.slug} data-r>
              <a href={`#${s.slug}`} className={styles.chip}>
                {s.title[lang]}
              </a>
            </li>
          ))}
        </Reveal>
      </nav>

      <div className={styles.list}>
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} className={styles.svc} data-flip={i % 2 ? "1" : ""} aria-labelledby={`${s.slug}-t`}>
            <div className={`wrap ${styles.grid}`}>
              <ClipReveal className={styles.media}>
                <Image src={s.image} alt="" fill sizes="(min-width: 900px) 40vw, 92vw" quality={85} loading="lazy" />
              </ClipReveal>
              <div className={styles.copy}>
                <Lines as="h2" lines={[s.title[lang]]} className={`${styles.title} h2`} />
                <span id={`${s.slug}-t`} className="sr-only">
                  {s.title[lang]}
                </span>
                <Reveal className={styles.body}>
                  <p className="lead" data-r>
                    {s.short[lang]}
                  </p>
                  <div data-r>
                    <p className={`label ${styles.inc}`}>{t.services.included}</p>
                    <ul className={styles.scope}>
                      {s.scope[lang].map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  <div data-r>
                    <Button href={href(lang, `/contact?service=${s.slug}`)} variant="navy">
                      {t.services.ask}
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      <Process eyebrow={t.process.eyebrow} title={t.process.title} steps={t.process.steps} />
      <Cta lines={t.cta.lines} sub={t.cta.sub} button={t.cta.button} buttonHref={href(lang, "/contact")} />
    </>
  );
}
