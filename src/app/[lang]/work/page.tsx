import type { Metadata } from "next";
import { getDict, fill, resolveLang } from "@/lib/dictionary";
import { href } from "@/lib/i18n";
import { clients, postsOf, postSrc, sectors, totalPosts, type Sector } from "@/content/clients";
import { PageHero } from "@/components/sections/PageHero";
import { WorkIndex } from "@/components/work/WorkIndex";
import { FeedWall } from "@/components/work/FeedWall";
import { Cta } from "@/components/sections/Cta";
import { jsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";
import styles from "./work.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/work">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang);
  return {
    title: t.workPage.title,
    description: t.workPage.intro,
    alternates: { canonical: `/${lang}/work`, languages: { ar: "/ar/work", en: "/en/work", "x-default": "/en/work" } },
  };
}

export default async function WorkPage({ params }: PageProps<"/[lang]/work">) {
  const lang = await resolveLang(params);
  const t = getDict(lang);

  const cards = clients.map((c) => {
    const posts = postsOf(c);
    const cover = postSrc(c.slug, c.cover);
    const rest = posts.filter((p) => p !== cover);
    return {
      slug: c.slug,
      href: href(lang, `/work/${c.slug}`),
      name: c.name[lang],
      sector: sectors[c.sector][lang],
      sectorKey: c.sector,
      cover,
      flick: rest.slice(0, 4),
      count: fill(t.workPage.count, { n: posts.length }),
    };
  });

  const keys = Object.keys(sectors) as Sector[];
  const filters = [
    { key: "all", label: t.workPage.all, n: clients.length },
    ...keys.map((k) => ({ key: k, label: sectors[k][lang], n: clients.filter((c) => c.sector === k).length })),
  ];

  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: lang === "ar" ? "أعمال صيت" : "SEET selected work",
    itemListElement: clients.map((client, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: client.name[lang],
      url: `${site.url}/${lang}/work/${client.slug}`,
    })),
  };

  // An even spread of posts from every brand for the wall.
  const wall: string[] = [];
  for (let round = 0; wall.length < 60 && round < 12; round++) {
    for (const c of clients) {
      const p = postsOf(c);
      if (p[round + 3]) wall.push(p[round + 3]);
      if (wall.length >= 60) break;
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
      <PageHero
        title={t.workPage.title}
        intro={t.workPage.intro}
        aside={<p className="label">{fill(t.feed.meta, { posts: totalPosts, brands: clients.length })}</p>}
      />
      <section className={styles.index}>
        <div className="wrap">
          <WorkIndex cards={cards} filters={filters} />
        </div>
      </section>
      <FeedWall title={t.workPage.wallTitle} posts={wall} />
      <Cta lines={t.cta.lines} sub={t.cta.sub} button={t.cta.button} buttonHref={href(lang, "/contact")} />
    </>
  );
}
