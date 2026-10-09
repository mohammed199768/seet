"use client";

import { useRef } from "react";
import { gsap, useGSAP, finePointer, reducedMotion, whenSeen } from "@/lib/gsap";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import styles from "./Cta.module.css";

/** The flight line from the logo film: drawn by scroll, with the paper plane riding it. */
const PATH = "M-40 640 C 180 600 260 330 470 360 S 760 690 980 520 S 1220 140 1480 160";

export function Cta({ lines, sub, button, buttonHref }: { lines: string[]; sub: string; button: string; buttonHref: string }) {
  const root = useRef<HTMLElement>(null);
  const word = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const path = el.querySelector<SVGPathElement>("[data-path]")!;
      const plane = el.querySelector<SVGGElement>("[data-plane]")!;
      if (reducedMotion()) {
        gsap.set(plane, { opacity: 0 });
        return;
      }
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 60%", scrub: 0.8 },
      });
      tl.fromTo(path, { drawSVG: "0%" }, { drawSVG: "100%", ease: "none" }, 0).to(
        plane,
        {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true },
          ease: "none",
        },
        0,
      );

      const h = el.querySelector("h2");
      if (h) {
        gsap.set(h, { "--k": 0 });
        whenSeen(h, () => gsap.to(h, { "--k": 1, ease: "back.out(2)", duration: 1.2, delay: 0.5 }), "top 75%");
      }

      // The block tilts toward the pointer, like picking up the logo.
      if (!finePointer() || !word.current) return;
      const w = word.current;
      const rx = gsap.quickTo(w, "rotationX", { duration: 0.8, ease: "power3" });
      const ry = gsap.quickTo(w, "rotationY", { duration: 0.8, ease: "power3" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 14);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.cta}>
      <svg className={styles.flight} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d={PATH} data-path fill="none" stroke="var(--navy)" strokeWidth="4" strokeLinecap="round" />
        <g data-plane>
          <path d="M-26 -18 L30 0 L-26 18 L-14 0 Z" fill="var(--navy)" />
          <path d="M-14 0 L30 0" stroke="var(--white)" strokeWidth="2" />
        </g>
      </svg>
      <div className={`wrap ${styles.inner}`}>
        <div ref={word} className={styles.word}>
          <Lines as="h2" lines={lines} className={`${styles.title} display extrude extrude-logo`} />
        </div>
        <Reveal className={styles.foot}>
          <p className="lead" data-r>
            {sub}
          </p>
          <div data-r>
            <Button href={buttonHref} variant="navy" size="lg">
              {button}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
