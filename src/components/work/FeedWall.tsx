"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Lines } from "@/components/motion/Reveal";
import styles from "./FeedWall.module.css";

/** Columns of real posts sliding at different speeds as the page scrolls. */
export function FeedWall({ title, posts }: { title: string; posts: string[] }) {
  const root = useRef<HTMLElement>(null);
  const cols = 5;
  const columns = Array.from({ length: cols }, (_, c) => posts.filter((_, i) => i % cols === c));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.current!.querySelectorAll<HTMLElement>("[data-col]").forEach((col, i) => {
          const travel = [-22, -6, -30, -10, -18][i % 5];
          gsap.fromTo(
            col,
            { yPercent: 0 },
            {
              yPercent: travel,
              ease: "none",
              scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.4 },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.wall} data-theme="ink">
      <div className={`wrap ${styles.head}`}>
        <Lines as="h2" lines={[title]} className="h2" />
      </div>
      <div className={styles.cols} aria-hidden="true">
        {columns.map((col, c) => (
          <div key={c} className={styles.col} data-col>
            {col.map((src) => (
              <span key={src} className={styles.tile}>
                <Image src={src} alt="" fill sizes="(min-width: 900px) 19vw, 33vw" quality={70} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
