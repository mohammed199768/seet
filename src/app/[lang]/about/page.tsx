import type { Metadata } from "next";
import Image from "next/image";
import { getDict, resolveLang } from "@/lib/dictionary";
import { href } from "@/lib/i18n";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { Studio } from "@/components/sections/Studio";
import { Cta } from "@/components/sections/Cta";
import { ClipReveal, Lines, Reveal } from "@/components/motion/Reveal";
import { Principles } from "@/components/sections/Principles";
import styles from "./about.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang);
  return {
    title: t.aboutPage.title,
    description: t.aboutPage.lead,
    alternates: { canonical: `/${lang}/about`, languages: { ar: "/ar/about", en: "/en/about", "x-default": "/en/about" } },
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const lang = await resolveLang(params);
  const t = getDict(lang);
  const a = t.aboutPage;

  return (
    <>
      <PageHero title={a.title} />
      <section className={styles.lead}>
        <div className="wrap">
          <Lines as="p" lines={[a.lead]} className={`${styles.leadText} h2`} />
        </div>
      </section>

      <ClipReveal className={styles.wide} data-cursor="view">
        <Image src="/media/about-desk.webp" alt="" fill sizes="100vw" quality={80} loading="lazy" />
      </ClipReveal>

      <section className={styles.story}>
        <Reveal className={`wrap ${styles.storyGrid}`}>
          <p className="label" data-r>
            {t.statement.eyebrow}
          </p>
          <p className="lead" data-r>
            {a.body}
          </p>
        </Reveal>
      </section>

      <Principles title={a.principlesTitle} items={a.principles} />
      <Process eyebrow={t.process.eyebrow} title={t.process.title} steps={t.process.steps} />
      <Studio
        eyebrow={t.studio.eyebrow}
        title={t.studio.title}
        text={t.studio.text}
        link={t.studio.link}
        linkHref={href(lang, "/services#production")}
      />
      <Cta lines={t.cta.lines} sub={t.cta.sub} button={t.cta.button} buttonHref={href(lang, "/contact")} />
    </>
  );
}
