import { lang as rootLang } from "next/root-params";
import { getDict } from "@/lib/dictionary";
import { href, isLocale, defaultLocale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export default async function NotFound() {
  const raw = await rootLang();
  const lang = raw && isLocale(raw) ? raw : defaultLocale;
  const t = getDict(lang);
  return (
    <section className={styles.nf} data-theme="navy">
      <div className={`wrap ${styles.inner}`}>
        <p className={`${styles.code} display extrude`} aria-hidden="true">
          404
        </p>
        <h1 className="h2">{t.notFound.title}</h1>
        <p className="lead">{t.notFound.text}</p>
        <Button href={href(lang)} variant="white" size="lg">
          {t.notFound.home}
        </Button>
      </div>
    </section>
  );
}
