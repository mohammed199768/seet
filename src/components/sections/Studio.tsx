import { ClipReveal, Lines, Reveal } from "@/components/motion/Reveal";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { TLink } from "@/components/providers/Transition";
import { Arrow } from "@/components/ui/Arrow";
import styles from "./Studio.module.css";

export function Studio({
  eyebrow,
  title,
  text,
  link,
  linkHref,
}: {
  eyebrow: string;
  title: string;
  text: string;
  link: string;
  linkHref: string;
}) {
  return (
    <section className={styles.studio}>
      <div className={`wrap ${styles.grid}`}>
        <ClipReveal className={styles.media}>
          <LazyVideo mp4="/media/clip-studio.mp4" webm="/media/clip-studio.webm" poster="/media/clip-studio-poster.webp" className={styles.video} />
        </ClipReveal>
        <div className={styles.copy}>
          <p className="label">{eyebrow}</p>
          <Lines as="h2" lines={[title]} className={`${styles.title} h2`} />
          <Reveal>
            <p className={`${styles.text} lead`} data-r>
              {text}
            </p>
            <TLink href={linkHref} className={styles.link} data-r>
              {link}
              <Arrow className={styles.arrow} />
            </TLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
