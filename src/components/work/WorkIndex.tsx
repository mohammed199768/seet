"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP, Flip, reducedMotion, whenSeen } from "@/lib/gsap";
import { TLink } from "@/components/providers/Transition";
import styles from "./WorkIndex.module.css";

export type WorkCard = {
  slug: string;
  href: string;
  name: string;
  sector: string;
  sectorKey: string;
  cover: string;
  flick: string[];
  count: string;
};

export function WorkIndex({ cards, filters }: { cards: WorkCard[]; filters: { key: string; label: string; n: number }[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("all");

  const pick = (key: string) => {
    if (key === active) return;
    const grid = root.current?.querySelector("[data-grid]");
    const items = grid ? Array.from(grid.children) : [];
    const state = reducedMotion() ? null : Flip.getState(items);
    setActive(key);
    requestAnimationFrame(() => {
      if (!state) return;
      Flip.from(state, {
        duration: 0.8,
        ease: "expo.inOut",
        stagger: 0.02,
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.4 }),
      });
    });
  };

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const cards = root.current!.querySelectorAll("[data-card]");
      gsap.set(cards, { opacity: 0, y: 60 });
      whenSeen(root.current!, () => gsap.to(cards, { opacity: 1, y: 0, duration: 1.1, stagger: 0.05, clearProps: "opacity,transform" }), "top 80%");
    },
    { scope: root },
  );

  // Hover flicks through a few posts, like thumbing a feed.
  const flick = (el: HTMLElement, on: boolean) => {
    if (reducedMotion()) return;
    const imgs = el.querySelectorAll<HTMLElement>("[data-flick]");
    gsap.killTweensOf(imgs);
    if (!on) {
      gsap.to(imgs, { opacity: 0, duration: 0.3 });
      return;
    }
    const tl = gsap.timeline({ repeat: -1 });
    imgs.forEach((img, i) => tl.set(img, { opacity: 1 }, i * 0.45).set(img, { opacity: 0 }, (i + 1) * 0.45));
    (el as HTMLElement & { _tl?: gsap.core.Timeline })._tl?.kill();
    (el as HTMLElement & { _tl?: gsap.core.Timeline })._tl = tl;
  };
  const stop = (el: HTMLElement) => {
    (el as HTMLElement & { _tl?: gsap.core.Timeline })._tl?.kill();
    flick(el, false);
  };

  return (
    <div ref={root}>
      <div className={styles.filters} role="group">
        {filters.map((f) => (
          <button key={f.key} type="button" className={styles.chip} aria-pressed={active === f.key} onClick={() => pick(f.key)}>
            {f.label}
            <sup>{f.n}</sup>
          </button>
        ))}
      </div>

      <ul className={styles.grid} data-grid>
        {cards
          .filter((c) => active === "all" || c.sectorKey === active)
          .map((c, i) => (
            <li key={c.slug} className={styles.item} data-card data-flip-id={c.slug} data-off={i % 3 === 1 ? "1" : ""}>
              <TLink
                href={c.href}
                className={styles.card}
                data-cursor="view"
                onPointerEnter={(e) => flick(e.currentTarget, true)}
                onPointerLeave={(e) => stop(e.currentTarget)}
              >
                <span className={styles.media}>
                  <Image src={c.cover} alt="" fill sizes="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 92vw" quality={80} />
                  {c.flick.map((src) => (
                    <span key={src} className={styles.flick} data-flick>
                      <Image src={src} alt="" fill sizes="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 92vw" quality={80} />
                    </span>
                  ))}
                </span>
                <span className={styles.cap}>
                  <span className={`${styles.name} h3`}>{c.name}</span>
                  <span className={`${styles.meta} label`}>
                    {c.sector} · {c.count}
                  </span>
                </span>
              </TLink>
            </li>
          ))}
      </ul>
    </div>
  );
}
