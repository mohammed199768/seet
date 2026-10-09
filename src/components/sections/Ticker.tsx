"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, reducedMotion, dirSign } from "@/lib/gsap";
import styles from "./Ticker.module.css";

export function Ticker({ label, names }: { label: string; names: string[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
      const loop = gsap.to(track, { xPercent: -50 * dirSign(), duration: 60, ease: "none", repeat: -1 });
      // Scroll velocity pushes the belt; it eases back to cruising speed.
      let boost = 0;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          boost = Math.min(Math.abs(self.getVelocity()) / 220, 9) * (self.direction < 0 ? -1 : 1);
        },
        onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
      });
      const tick = () => {
        boost *= 0.93;
        loop.timeScale(1 + boost);
      };
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    },
    { scope: root },
  );

  const row = (hidden: boolean) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {names.map((n, i) => (
        <li key={i} className={`${styles.item} display`} data-alt={i % 2 ? "1" : ""}>
          {n}
          <span className={styles.sep} aria-hidden="true">
            <i />
            <i />
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section ref={root} className={styles.ticker} aria-label={label}>
      <p className={`wrap label ${styles.label}`}>{label}</p>
      <div className={styles.viewport}>
        <div className={styles.track} data-track>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
