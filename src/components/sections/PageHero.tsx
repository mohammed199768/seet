import type { ReactNode } from "react";
import { Lines, Reveal } from "@/components/motion/Reveal";
import styles from "./PageHero.module.css";

/** Inner-page opener: one oversized extruded word, one supporting paragraph. */
export function PageHero({ title, intro, aside }: { title: string; intro?: string; aside?: ReactNode }) {
  return (
    <section className={styles.hero}>
      <div className={`wrap ${styles.inner}`}>
        <Lines as="h1" intro lines={[title]} className={`${styles.title} display extrude`} />
        {(intro || aside) && (
          <Reveal intro delay={0.4} className={styles.row}>
            {intro && (
              <p className={`${styles.intro} lead`} data-r>
                {intro}
              </p>
            )}
            {aside && (
              <div className={styles.aside} data-r>
                {aside}
              </div>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}
