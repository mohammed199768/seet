import { getDict, fill, resolveLang } from "@/lib/dictionary";
import { href } from "@/lib/i18n";
import { clients, clientBySlug, featured, postsOf, sectors, totalPosts, postSrc } from "@/content/clients";
import { services } from "@/content/services";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Statement } from "@/components/sections/Statement";
import { FeedRail } from "@/components/sections/FeedRail";
import { ServicesList } from "@/components/sections/ServicesList";
import { Packages } from "@/components/sections/Packages";
import { Process } from "@/components/sections/Process";
import { Studio } from "@/components/sections/Studio";
import { Cta } from "@/components/sections/Cta";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = await resolveLang(params);
  const t = getDict(lang);

  const cards = featured
    .map((s) => clientBySlug(s)!)
    .map((c) => {
      const posts = postsOf(c);
      // the chosen cover leads the mini-feed
      const cover = postSrc(c.slug, c.cover);
      return {
        slug: c.slug,
        href: href(lang, `/work/${c.slug}`),
        name: c.name[lang],
        sector: sectors[c.sector][lang],
        posts: [cover, ...posts.filter((p) => p !== cover)],
      };
    });

  return (
    <>
      <Hero lang={lang} t={t.hero} />
      <Ticker label={t.ticker.label} names={clients.map((c) => c.name[lang])} />
      <Statement
        eyebrow={t.statement.eyebrow}
        text={t.statement.text}
        link={t.statement.link}
        linkHref={href(lang, "/about")}
        images={[postSrc("healthy", 3), postSrc("tablia", 5), postSrc("mona-clinic", 14)]}
      />
      <FeedRail
        eyebrow={t.feed.eyebrow}
        title={t.feed.title}
        meta={fill(t.feed.meta, { posts: totalPosts, brands: clients.length })}
        view={t.feed.view}
        all={t.feed.all}
        allHref={href(lang, "/work")}
        cards={cards}
      />
      <ServicesList
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        all={t.services.all}
        allHref={href(lang, "/services")}
        rows={services.map((s) => ({
          slug: s.slug,
          href: href(lang, `/services#${s.slug}`),
          title: s.title[lang],
          short: s.short[lang],
          image: s.image,
        }))}
      />
      <Packages lang={lang} t={t.packagesSection} preview />
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
