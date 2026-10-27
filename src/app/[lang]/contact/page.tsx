import type { Metadata } from "next";
import { getDict, resolveLang } from "@/lib/dictionary";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialDock } from "@/components/contact/SocialDock";
import styles from "./contact.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang);
  return {
    title: t.nav.contact,
    description: t.contactPage.intro,
    alternates: { canonical: `/${lang}/contact`, languages: { ar: "/ar/contact", en: "/en/contact", "x-default": "/en/contact" } },
  };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const lang = await resolveLang(params);
  const t = getDict(lang);
  const list = services.map((s) => ({ slug: s.slug, title: s.title[lang] }));

  return (
    <section className={styles.contact}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.side}>
          <Lines as="h1" intro lines={[t.contactPage.title]} className={`${styles.title} display extrude`} />
          <Reveal intro delay={0.35} className={styles.info}>
            <p className="lead" data-r>
              {t.contactPage.intro}
            </p>
            <div className={styles.details} data-r>
              <h2 className="label">{t.contactPage.detailsTitle}</h2>
              <dl>
                <div>
                  <dt>{t.footer.location}</dt>
                  <dd>{site.location[lang]}</dd>
                </div>
                {site.email && (
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${site.email}`}>{site.email}</a>
                    </dd>
                  </div>
                )}
                {site.phone && (
                  <div>
                    <dt>{lang === "ar" ? "الهاتف" : "Phone"}</dt>
                    <dd dir="ltr">
                      <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
                    </dd>
                  </div>
                )}
                {site.whatsapp && (
                  <div>
                    <dt>WhatsApp</dt>
                    <dd>
                      <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" dir="ltr">
                        {site.whatsappDisplay}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </Reveal>
          <SocialDock lang={lang} />
        </div>
        <Reveal intro delay={0.5} className={styles.formWrap}>
          <div data-r>
            <ContactForm lang={lang} t={t.form} services={list} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
