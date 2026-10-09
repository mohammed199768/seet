"use client";

import { useRef } from "react";
import { gsap, useGSAP, reducedMotion, skipIntro } from "@/lib/gsap";
import { onReady } from "@/components/ui/Preloader";
import { Lines } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/ar";
import styles from "./Hero.module.css";

export function Hero({ lang, t }: { lang: Locale; t: Dictionary["hero"] }) {
  const root = useRef<HTMLElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const reel = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const sec = root.current!;
      const r = reel.current!;
      const s = slot.current!;
      const reduce = reducedMotion();
      const offs: (() => void)[] = [];

      // Extrusion lifts once the headline has risen — the logo block being pushed up.
      const h1 = title.current?.querySelector("h1");
      if (h1 && !skipIntro() && contextSafe) {
        const items = sec.querySelectorAll("[data-hr]");
        gsap.set(h1, { "--k": 0 });
        gsap.set(items, { opacity: 0, y: 24 });
        offs.push(
          onReady(
            contextSafe(() => {
              gsap.to(h1, { "--k": 1, duration: 1.2, delay: 0.75, ease: "back.out(2.2)" });
              gsap.to(items, { opacity: 1, y: 0, duration: 1, stagger: 0.08, delay: 0.55 });
            }),
          ),
        );
      }

      const mm = gsap.matchMedia();
      mm.add({ big: "(min-width: 961px)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        const { big } = ctx.conditions as { big: boolean; reduce: boolean };
        if (!big) return;
        // The film's box starts exactly on the slot and grows to fill the pinned hero.
        const box = () => {
          const a = sec.getBoundingClientRect();
          const b = s.getBoundingClientRect();
          return { top: b.top - a.top, left: b.left - a.left, width: b.width, height: b.height };
        };
        const radius = parseFloat(getComputedStyle(s).borderRadius) || 28;
        r.style.visibility = "visible";
        gsap.set(r, { ...box(), borderRadius: radius });
        if (reduce) return;
        if (!window.__seetReady && contextSafe) {
          gsap.set(r, { opacity: 0 });
          offs.push(onReady(contextSafe(() => gsap.to(r, { opacity: 1, duration: 0.8, delay: 0.9 }))));
        }
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(
          r,
          { top: () => box().top, left: () => box().left, width: () => box().width, height: () => box().height, borderRadius: radius },
          { top: 0, left: 0, width: () => sec.clientWidth, height: () => sec.clientHeight, borderRadius: 0, ease: "power2.inOut" },
          0,
        )
          .to(title.current, { yPercent: -18, opacity: 0, ease: "power1.in" }, 0)
          .to(sec.querySelector("[data-row]"), { opacity: 0, y: -40, ease: "power1.in" }, 0);
        return () => {
          r.style.visibility = "";
        };
      });
      return () => {
        offs.forEach((off) => off());
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.hero} data-theme="navy" data-lang={lang}>
      <div className={`wrap ${styles.inner}`}>
        <div ref={title} className={styles.titleWrap}>
          <Lines as="h1" intro lines={t.lines} className={`${styles.title} display extrude`} stagger={0.1} />
        </div>

        <div className={styles.row} data-row>
          <div className={styles.copy}>
            <p className={`${styles.sub} lead`} data-hr>
              {t.sub}
            </p>
            <div className={styles.ctas} data-hr>
              <Button href={href(lang, "/contact")} variant="white" size="lg">
                {t.primary}
              </Button>
              <Button href={href(lang, "/work")} variant="outline" size="lg">
                {t.secondary}
              </Button>
            </div>
            <p className={styles.def} data-hr>
              <b>{t.definitionWord}</b> <i>({t.definitionType})</i> {t.definition}
            </p>
          </div>

          {/* The film sits here at rest; on desktop it grows from this slot to the full screen. */}
          <div ref={slot} className={styles.slot} data-cursor="view">
            <div className={styles.slotMedia}>
              <LazyVideo
                mp4="/media/brand-loop.mp4"
                webm="/media/brand-loop.webm"
                mp4Small="/media/brand-loop-sm.mp4"
                webmSmall="/media/brand-loop-sm.webm"
                poster="/media/brand-loop-poster.webp"
                className={styles.video}
              />
            </div>
          </div>
        </div>
      </div>

      <div ref={reel} className={styles.reel} aria-hidden="true">
        <LazyVideo eager mp4="/media/brand-loop.mp4" webm="/media/brand-loop.webm" poster="/media/brand-loop-poster.webp" className={styles.video} />
      </div>
    </section>
  );
}
