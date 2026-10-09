"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";
import { gsap, useGSAP, SplitText, reducedMotion } from "@/lib/gsap";
import { TLink } from "@/components/providers/Transition";
import { Arrow } from "@/components/ui/Arrow";
import styles from "./Statement.module.css";

/** Big sentence that brightens word by word with scroll; [n] tokens become inline post thumbnails. */
export function Statement({
  eyebrow,
  text,
  link,
  linkHref,
  images,
}: {
  eyebrow: string;
  text: string;
  link: string;
  linkHref: string;
  images: string[];
}) {
  const root = useRef<HTMLElement>(null);
  const para = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (reducedMotion() || !para.current) return;
      const split = SplitText.create(para.current.querySelectorAll("[data-w]"), { type: "words", wordsClass: styles.word, aria: "none" });
      const thumbs = para.current.querySelectorAll("[data-thumb]");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: para.current, start: "top 78%", end: "bottom 45%", scrub: 0.5 },
      });
      tl.fromTo(split.words, { opacity: 0.14 }, { opacity: 1, stagger: 0.1, ease: "none" }, 0);
      tl.fromTo(thumbs, { scale: 0, rotate: -12 }, { scale: 1, rotate: 0, stagger: 0.6, ease: "back.out(2)", duration: 0.8 }, 0.1);
      return () => split.revert();
    },
    { scope: root },
  );

  const parts = text.split(/\[(\d)\]/);

  return (
    <section ref={root} className={styles.statement}>
      <div className={`wrap ${styles.grid}`}>
        <p className={`label ${styles.eyebrow}`}>{eyebrow}</p>
        <div>
          <p ref={para} className={styles.text}>
            {parts.map((p, i) =>
              i % 2 === 0 ? (
                <span key={i} data-w>
                  {p}
                </span>
              ) : (
                <Fragment key={i}>
                  {" "}
                  <span className={styles.thumb} data-thumb aria-hidden="true">
                    <Image src={images[Number(p)] ?? images[0]} alt="" width={160} height={200} sizes="96px" quality={80} />
                  </span>{" "}
                </Fragment>
              ),
            )}
          </p>
          <TLink href={linkHref} className={styles.link}>
            {link}
            <Arrow className={styles.arrow} />
          </TLink>
        </div>
      </div>
    </section>
  );
}
