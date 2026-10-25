import { TLink } from "@/components/providers/Transition";
import { Logo } from "@/components/ui/Logo";
import { href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/ar";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { BackToTop } from "./BackToTop";
import styles from "./Footer.module.css";

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  const year = 2026;
  return (
    <footer className={styles.footer} data-theme="ink">
      <div className={`wrap ${styles.top}`}>
        <div className={styles.brand}>
          <Logo variant="reverse" width={168} />
          <p className={`${styles.tagline} h3`}>{t.footer.tagline}</p>
        </div>

        <nav className={styles.col} aria-label={t.footer.explore}>
          <h2 className="label muted">{t.footer.explore}</h2>
          <ul>
            {(["work", "services", "packages", "about", "contact"] as const).map((k) => (
              <li key={k}>
                <TLink href={href(lang, `/${k}`)} className={styles.link}>
                  {t.nav[k]}
                </TLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className="label muted">{t.nav.services}</h2>
          <ul>
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <TLink href={href(lang, `/services#${s.slug}`)} className={styles.link}>
                  {s.title[lang]}
                </TLink>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h2 className="label muted">{t.footer.reach}</h2>
          <ul>
            <li>{site.location[lang]}</li>
            {site.email && (
              <li>
                <a className={styles.link} href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
            )}
            {site.phone && (
              <li>
                <a className={styles.link} href={`tel:${site.phone.replace(/\s/g, "")}`} dir="ltr">
                  {site.phone}
                </a>
              </li>
            )}
            <li>
              <TLink href={href(lang, "/contact")} className={styles.link}>
                {t.nav.cta}
              </TLink>
            </li>
          </ul>
          <div className={styles.socials} aria-label={lang === "ar" ? "روابط التواصل الاجتماعي" : "Social links"}>
            {site.whatsapp && (
              <a
                className={styles.socialLink}
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === "ar" ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
              >
                <SocialIcon network="whatsapp" />
                <span>WhatsApp</span>
              </a>
            )}
            {site.social.map((social) => (
              <a
                className={styles.socialLink}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === "ar" ? "تابعنا على إنستغرام" : "Follow us on Instagram"}
                key={social.href}
              >
                <SocialIcon network="instagram" />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={`wrap ${styles.bottom}`}>
        <p className={styles.small}>
          © {year} {t.footer.rights}
        </p>
        <BackToTop label={t.footer.top} />
      </div>
    </footer>
  );
}
