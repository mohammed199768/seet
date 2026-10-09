"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import styles from "./Preloader.module.css";

declare global {
  interface Window {
    __seetReady?: boolean;
  }
}

export const READY_EVENT = "seet:ready";

export const onReady = (fn: () => void) => {
  if (window.__seetReady) {
    fn();
    return () => {};
  }
  window.addEventListener(READY_EVENT, fn, { once: true });
  return () => window.removeEventListener(READY_EVENT, fn);
};

const markReady = () => {
  window.__seetReady = true;
  document.documentElement.classList.remove("is-loading");
  window.dispatchEvent(new Event(READY_EVENT));
};

/** Inline, pre-paint: repeat visitors in the same session skip the preloader. */
export const preloaderScript = `try{if(sessionStorage.getItem('seet-v')||matchMedia('(max-width: 960px)').matches){document.documentElement.classList.add('no-preload')}else{document.documentElement.classList.add('is-loading')}}catch(e){document.documentElement.classList.add('no-preload')}`;

export function Preloader({ label }: { label: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const html = document.documentElement;
    if (!el || html.classList.contains("no-preload") || window.__seetReady) {
      markReady();
      return;
    }
    try {
      sessionStorage.setItem("seet-v", "1");
    } catch {}

    if (reducedMotion()) {
      el.style.display = "none";
      markReady();
      return;
    }

    // Slow device or network: scripts arrived late, so don't make people wait any longer.
    if (performance.now() > 1400) {
      gsap.to(el, {
        opacity: 0,
        duration: 0.35,
        onComplete: () => {
          el.style.display = "none";
        },
      });
      markReady();
      return;
    }

    const count = { v: 0 };
    const num = el.querySelector<HTMLElement>("[data-num]");
    const tl = gsap.timeline({
      onComplete: () => {
        el.style.display = "none";
      },
    });
    tl.from(el.querySelectorAll("[data-dot]"), { yPercent: -420, duration: 0.7, stagger: 0.07, ease: "bounce.out" }, 0)
      .from(el.querySelector("[data-bar]"), { scaleX: 0, duration: 0.5, ease: "expo.inOut" }, 0.2)
      .to(count, {
        v: 100,
        duration: 0.8,
        ease: "power2.inOut",
        onUpdate: () => {
          if (num) num.textContent = String(Math.round(count.v)).padStart(3, "0");
        },
      }, 0)
      .to(el.querySelector("[data-mark]"), { yPercent: -40, opacity: 0, duration: 0.4, ease: "power3.in" }, 0.75)
      .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.75, ease: "expo.inOut" }, 0.85)
      .add(markReady, 1.05);
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={root} className={styles.pre} data-preloader role="status" aria-label={label}>
      <div className={styles.mark} data-mark aria-hidden="true">
        <span className={styles.dots}>
          <i data-dot />
          <i data-dot />
        </span>
        <span className={styles.bar} data-bar />
      </div>
      <span className={`${styles.num} label`} data-num aria-hidden="true">
        000
      </span>
    </div>
  );
}
