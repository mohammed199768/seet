import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDict, resolveLang } from "@/lib/dictionary";
import { href, locales } from "@/lib/i18n";
import { jsonLd } from "@/lib/jsonld";
import { clientBySlug, clients, postSrc, postsOf, sectors } from "@/content/clients";
import { serviceBySlug } from "@/content/services";
import { site } from "@/content/site";
import { Lines, Reveal, ClipReveal } from "@/components/motion/Reveal";
import { TLink } from "@/components/providers/Transition";
import { CaseFeed } from "@/components/work/CaseFeed";
import { NextCase } from "@/components/work/NextCase";
import styles from "./case.module.css";

export function generateStaticParams() {
  return locales.flatMap((lang) => clients.map((c) => ({ lang, client: c.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[client]">): Promise<Metadata> {
  const { client } = await params;
  const lang = await resolveLang(params);
  const c = clientBySlug(client);
  if (!c) return {};
  return {
    title: c.name[lang],
    description: c.summary[lang],
    alternates: { canonical: `/${lang}/work/${c.slug}`, languages: { ar: `/ar/work/${c.slug}`, en: `/en/work/${c.slug}` } },
    openGraph: { images: [{ url: postSrc(c.slug, c.cover), width: 500, height: 625 }] },
  };
}

export default async function CasePage({ params }: PageProps<"/[lang]/work/[client]">) {
  const { client } = await params;
  const lang = await resolveLang(params);
  const c = clientBySlug(client);
  if (!c) notFound();
  const t = getDict(lang);
  const posts = postsOf(c);
  const cover = postSrc(c.slug, c.cover);
  const others = posts.filter((p) => p !== cover);
  const idx = clients.findIndex((x) => x.slug === c.slug);
  const next = clients[(idx + 1) % clients.length];

  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${c.name.en} — SEET`,
    about: c.name[lang],
    creator: { "@type": "Organization", name: "SEET Marketing Agency", url: site.url },
    inLanguage: lang,
    image: `${site.url}${cover}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroInner}`}>
          <Reveal intro className={styles.back}>
            <TLink href={href(lang, "/work")} className={styles.backLink} data-r>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 12H5M11 5.5 4.5 12 11 18.5" />
              </svg>
              {t.casePage.back}
            </TLink>
          </Reveal>
          <Lines as="h1" intro lines={[c.name[lang]]} className={`${styles.title} display extrude`} />
          <Reveal intro delay={0.35} className={styles.meta}>
            <dl className={styles.dl}>
              <div data-r>
                <dt className="label">{t.casePage.sector}</dt>
                <dd>{sectors[c.sector][lang]}</dd>
              </div>
              <div data-r>
                <dt className="label">{t.casePage.services}</dt>
                <dd>
                  {c.services.map((s, i) => (
                    <span key={s}>
                      <TLink href={href(lang, `/services#${s}`)} className={styles.svc}>
                        {serviceBySlug(s)?.title[lang]}
                      </TLink>
                      {i < c.services.length - 1 ? (lang === "ar" ? "، " : ", ") : ""}
                    </span>
                  ))}
                </dd>
              </div>
              <div data-r>
                <dt className="label">{t.casePage.posts}</dt>
                <dd>{posts.length}</dd>
              </div>
            </dl>
            <p className={`${styles.summary} lead`} data-r>
              {c.summary[lang]}
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.showcase} data-theme="navy">
        <div className={`wrap ${styles.trio}`}>
          <ClipReveal className={`${styles.shot} ${styles.shotA}`} data-cursor="view">
            <Image src={cover} alt={c.name[lang]} fill sizes="(min-width: 900px) 40vw, 90vw" quality={90} preload />
          </ClipReveal>
          {others.slice(0, 2).map((p, i) => (
            <ClipReveal key={p} className={`${styles.shot} ${i ? styles.shotC : styles.shotB}`}>
              <Image src={p} alt="" fill sizes="(min-width: 900px) 26vw, 45vw" quality={85} />
            </ClipReveal>
          ))}
        </div>
      </section>

      <section className={styles.feed}>
        <div className="wrap">
          <div className={styles.feedHead}>
            <Lines as="h2" lines={[t.casePage.feed]} className="h2" />
            <span className="label">{posts.length}</span>
          </div>
          <CaseFeed posts={posts} name={c.name[lang]} rtl={lang === "ar"} t={t.casePage} />
        </div>
      </section>

      <NextCase
        label={t.casePage.next}
        name={next.name[lang]}
        href={href(lang, `/work/${next.slug}`)}
        image={postSrc(next.slug, next.cover)}
      />
    </>
  );
}
