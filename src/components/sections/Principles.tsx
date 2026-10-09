"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Lines } from "@/components/motion/Reveal";
import styles from "./Principles.module.css";

/** Bold. Clear. Memorable. — each word rises and its extrusion builds as it crosses the screen. */
export function Principles({ title, items }: { title: string; items: { title: string; text: string }[] }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.current!.querySelectorAll<HTMLElement>("[data-word]").forEach((w) => {
          gsap.fromTo(
            w,
            { "--k": 0, yPercent: 30, opacity: 0.2 },
            { "--k": 1, yPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: w, start: "top 92%", end: "top 45%", scrub: 0.5 } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.p} data-theme="navy">
      <div className="wrap">
        <Lines as="h2" lines={[title]} className={`${styles.title} label`} />
        <ul className={styles.list}>
          {items.map((it) => (
            <li key={it.title} className={styles.item}>
              <span className={`${styles.word} display extrude`} data-word>
                {it.title}
              </span>
              <p className={styles.text}>{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
