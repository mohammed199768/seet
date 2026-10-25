"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, Flip, reducedMotion, dirSign } from "@/lib/gsap";
import { TLink } from "@/components/providers/Transition";
import { Lines } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { LazyVideo } from "@/components/ui/LazyVideo";
import styles from "./FeedRail.module.css";

export type RailCard = { slug: string; href: string; name: string; sector: string; posts: string[] };

export function FeedRail({
  eyebrow,
  title,
  meta,
  all,
  allHref,
  cards,
}: {
  eyebrow: string;
  title: string;
  meta: string;
  view: string;
  all: string;
  allHref: string;
  cards: RailCard[];
}) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 961px) and (prefers-reduced-motion: no-preference)", () => {
        const t = track.current!;
        const distance = () => Math.max(0, t.scrollWidth - window.innerWidth);
        const tween = gsap.to(t, {
          x: () => -distance() * dirSign(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        // Cards tilt in as they cross the right third of the screen.
        t.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
          gsap.fromTo(
            card,
            { rotate: 4 * dirSign(), y: 60 },
            {
              rotate: 0,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: dirSign() > 0 ? "left right" : "right left",
                end: dirSign() > 0 ? "left 55%" : "right 45%",
                scrub: true,
              },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Hover: the feed reshuffles — first post jumps to the end, the rest slide up a slot.
  const shuffle = (grid: HTMLElement | null) => {
    if (!grid || reducedMotion()) return;
    const tiles = Array.from(grid.children) as HTMLElement[];
    const state = Flip.getState(tiles);
    grid.appendChild(tiles[0]);
    Flip.from(state, { duration: 0.7, ease: "expo.out", stagger: 0.015 });
  };

  return (
    <section ref={root} className={styles.rail} data-theme="ink" aria-labelledby="feed-title">
      <div ref={track} className={styles.track}>
        <div className={styles.intro}>
          <p className="label">{eyebrow}</p>
          <Lines as="h2" lines={[title]} className={`${styles.title} h2`} />
          <p className={`${styles.meta} label`}>{meta}</p>
          <div className={styles.film}>
            <LazyVideo mp4="/media/clip-feed.mp4" webm="/media/clip-feed.webm" poster="/media/clip-feed-poster.webp" className={styles.filmVideo} />
          </div>
          <span id="feed-title" className="sr-only">
            {title}
          </span>
        </div>

        <div className={styles.cards} data-lenis-prevent-touch>
        {cards.map((c) => (
          <article key={c.slug} className={styles.card} data-card onPointerEnter={(e) => shuffle(e.currentTarget.querySelector("[data-grid]"))}>
            <TLink href={c.href} className={styles.cardLink} data-cursor="view">
              <div className={styles.grid} data-grid>
                {c.posts.slice(0, 9).map((src) => (
                  <span key={src} className={styles.tile}>
                    <Image src={src} alt="" fill sizes="(min-width: 961px) 9vw, 26vw" quality={80} loading="lazy" />
                  </span>
                ))}
              </div>
              <div className={styles.cap}>
                <h3 className={`${styles.name} h3`}>{c.name}</h3>
                <span className="label">{c.sector}</span>
              </div>
            </TLink>
          </article>
        ))}
        </div>

        <div className={styles.end}>
          <Button href={allHref} variant="white" size="lg">
            {all}
          </Button>
        </div>
      </div>
    </section>
  );
}
