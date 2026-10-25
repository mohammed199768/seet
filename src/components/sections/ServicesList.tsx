"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, finePointer, reducedMotion } from "@/lib/gsap";
import { TLink } from "@/components/providers/Transition";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";
import styles from "./ServicesList.module.css";

export type ServiceRow = { slug: string; href: string; title: string; short: string; image: string };

export function ServicesList({
  eyebrow,
  title,
  all,
  allHref,
  rows,
}: {
  eyebrow: string;
  title: string;
  all: string;
  allHref: string;
  rows: ServiceRow[];
}) {
  const root = useRef<HTMLElement>(null);
  const float = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const f = float.current;
      if (!f || !finePointer() || reducedMotion() || !contextSafe) return;
      gsap.set(f, { xPercent: -50, yPercent: -58, scale: 0.85 });
      const xTo = gsap.quickTo(f, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(f, "y", { duration: 0.6, ease: "power3" });
      const rTo = gsap.quickTo(f, "rotation", { duration: 0.8, ease: "power3" });
      let lastX = 0;
      const list = root.current!.querySelector<HTMLElement>("[data-list]")!;
      const imgs = f.querySelectorAll<HTMLElement>("[data-i]");
      let current = -1;

      const move = contextSafe((e: PointerEvent) => {
        const row = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-row]");
        if (!row || !list.contains(row)) {
          hide();
          return;
        }
        xTo(e.clientX);
        yTo(e.clientY);
        rTo(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
        show(Number(row.dataset.row));
      });
      const show = contextSafe((i: number) => {
        if (i === current) return;
        const prev = imgs[current];
        current = i;
        gsap.to(f, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "expo.out" });
        if (prev) gsap.to(prev, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.5, ease: "expo.inOut" });
        gsap.fromTo(imgs[i], { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.inOut" });
      });
      const hide = contextSafe(() => {
        current = -1;
        gsap.to(f, { autoAlpha: 0, scale: 0.85, duration: 0.4 });
      });
      const leaveWindow = (e: PointerEvent) => {
        if (!e.relatedTarget) hide();
      };
      document.addEventListener("pointermove", move, { passive: true });
      list.addEventListener("pointerleave", hide);
      window.addEventListener("blur", hide);
      document.addEventListener("pointerout", leaveWindow);
      return () => {
        document.removeEventListener("pointermove", move);
        list.removeEventListener("pointerleave", hide);
        window.removeEventListener("blur", hide);
        document.removeEventListener("pointerout", leaveWindow);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.services}>
      <div className="wrap">
        <div className={styles.head}>
          <p className="label">{eyebrow}</p>
          <Lines as="h2" lines={[title]} className={`${styles.title} h2`} />
        </div>
        <Reveal as="ol" className={styles.list} data-list="" stagger={0.06}>
          {rows.map((r, i) => (
            <li key={r.slug} data-r data-row={String(i)}>
              <TLink href={r.href} className={styles.row}>
                <span className={styles.thumb} aria-hidden="true">
                  <Image src={r.image} alt="" fill sizes="72px" quality={70} loading="lazy" />
                </span>
                <span className={`${styles.name} h3`}>{r.title}</span>
                <span className={styles.short}>{r.short}</span>
                <Arrow className={styles.arrow} />
              </TLink>
            </li>
          ))}
        </Reveal>
        <div className={styles.foot}>
          <Button href={allHref} variant="navy">
            {all}
          </Button>
        </div>
      </div>

      <div ref={float} className={styles.float} aria-hidden="true">
        {rows.map((r, i) => (
          <div key={r.slug} className={styles.floatImg} data-i={i}>
            <Image src={r.image} alt="" fill sizes="300px" quality={80} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
