import { socialPackages } from "@/content/packages";
import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/i18n";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import styles from "./Packages.module.css";

type PackagesCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  recommended: string;
  choose: string;
  details: string;
};

export function Packages({ lang, t, preview = false }: { lang: Locale; t: PackagesCopy; preview?: boolean }) {
  return (
    <section id="packages" className={styles.section} aria-labelledby="packages-title">
      <div className="wrap">
        <div className={styles.head}>
          <div>
            <p className="label">{t.eyebrow}</p>
            <Lines as="h2" lines={[t.title]} className={`${styles.title} h2`} />
          </div>
          <p className={`${styles.intro} lead`}>{t.intro}</p>
          <span id="packages-title" className="sr-only">{t.title}</span>
        </div>

        <Reveal as="div" className={styles.grid} stagger={0.08}>
          {socialPackages.map((plan) => {
            const features = preview ? plan.features[lang].slice(0, 6) : plan.features[lang];
            return (
              <article
                id={plan.id}
                key={plan.id}
                className={styles.card}
                data-featured={plan.recommended ? "1" : undefined}
                data-r
              >
                <div className={styles.cardTop}>
                  <span className={styles.number} aria-hidden="true">{plan.number}</span>
                  {plan.recommended && <span className={styles.badge}>{t.recommended}</span>}
                </div>
                <div className={styles.planName}>
                  <h3 className={styles.planTitle}>{plan.title}</h3>
                </div>
                <p className={styles.price} dir="auto">{plan.price[lang]}</p>
                <p className={styles.description}>{plan.description[lang]}</p>
                <ul className={styles.features}>
                  {features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <div className={styles.action}>
                  <Button
                    href={href(lang, `/contact?service=social-media&package=${plan.id}`)}
                    variant={plan.recommended ? "white" : "navy"}
                    className={styles.packageButton}
                    magnetic={false}
                  >
                    {t.choose} {plan.title}
                  </Button>
                </div>
              </article>
            );
          })}
        </Reveal>

        {preview && (
          <div className={styles.more}>
            <Button href={href(lang, "/packages")} variant="outline">{t.details}</Button>
          </div>
        )}
      </div>
    </section>
  );
}
