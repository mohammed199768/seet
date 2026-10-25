"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, finePointer, reducedMotion } from "@/lib/gsap";
import { TLink } from "@/components/providers/Transition";
import styles from "./NextCase.module.css";

export function NextCase({ label, name, href, image }: { label: string; name: string; href: string; image: string }) {
  const root = useRef<HTMLElement>(null);
  const pic = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const p = pic.current!;
      if (!finePointer() || reducedMotion()) return;
      gsap.set(p, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
      const xTo = gsap.quickTo(p, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(p, "y", { duration: 0.6, ease: "power3" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
      };
      const enter = () => gsap.to(p, { autoAlpha: 1, scale: 1, rotate: -4, duration: 0.6, ease: "expo.out" });
      const leave = () => gsap.to(p, { autoAlpha: 0, scale: 0.6, rotate: 0, duration: 0.4 });
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.next} data-theme="navy">
      <TLink href={href} className={styles.link} data-cursor="view">
        <span className={`label ${styles.label}`}>{label}</span>
        <span className={`${styles.name} display`}>{name}</span>
      </TLink>
      <span ref={pic} className={styles.pic} aria-hidden="true">
        <Image src={image} alt="" fill sizes="280px" quality={80} loading="lazy" />
      </span>
    </section>
  );
}
