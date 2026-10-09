"use client";

import { useRef } from "react";
import { gsap, useGSAP, whenSeen } from "@/lib/gsap";
import { Lines } from "@/components/motion/Reveal";
import styles from "./Process.module.css";

export function Process({
  eyebrow,
  title,
  steps,
}: {
  eyebrow: string;
  title: string;
  steps: { title: string; text: string }[];
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const el = root.current!;
      const items = el.querySelectorAll<HTMLElement>("[data-step]");
      const nums = el.querySelectorAll<HTMLElement>("[data-num]");
      const bar = el.querySelector<HTMLElement>("[data-bar]");

      mm.add("(min-width: 961px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(items, { opacity: 0.22 });
        gsap.set(nums, { "--k": 0 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top top", end: "+=160%", pin: true, scrub: 0.6 },
        });
        tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: items.length }, 0);
        items.forEach((it, i) => {
          tl.to(it, { opacity: 1, duration: 0.5, ease: "none" }, i);
          tl.to(nums[i], { "--k": 1, duration: 0.5, ease: "none" }, i);
        });
      });
      mm.add("(max-width: 960px) and (prefers-reduced-motion: no-preference)", () => {
        items.forEach((it) => {
          gsap.set(it, { opacity: 0, y: 40 });
          whenSeen(it, () => gsap.to(it, { opacity: 1, y: 0, duration: 1 }), "top 88%");
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.process} data-theme="navy">
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.head}>
          <p className="label">{eyebrow}</p>
          <Lines as="h2" lines={[title]} className={`${styles.title} h2`} />
        </div>
        <div className={styles.track}>
          <span className={styles.rail} aria-hidden="true">
            <span className={styles.fill} data-bar />
          </span>
          <ol className={styles.steps}>
            {steps.map((s, i) => (
              <li key={s.title} className={styles.step} data-step>
                <span className={`${styles.num} display extrude`} data-num aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={`${styles.stepTitle} h3`}>{s.title}</h3>
                <p className={styles.text}>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
