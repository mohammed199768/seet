"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP, reducedMotion, whenSeen } from "@/lib/gsap";
import { useLenis } from "@/components/providers/SmoothScroll";
import { fillClient } from "./fill";
import styles from "./CaseFeed.module.css";

type T = { close: string; prev: string; nextImg: string; open: string };

/** The client's feed as a 3-column grid; any post opens full-size in a keyboard-friendly lightbox. */
export function CaseFeed({ posts, name, t, rtl }: { posts: string[]; name: string; t: T; rtl: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      if (reducedMotion()) return;
      root.current!.querySelectorAll<HTMLElement>("[data-tile]").forEach((tile, i) => {
        gsap.set(tile, { opacity: 0, y: 50 });
        whenSeen(tile, () => gsap.to(tile, { opacity: 1, y: 0, duration: 1, delay: (i % 3) * 0.08 }), "top 92%");
      });
    },
    { scope: root },
  );

  const go = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + posts.length) % posts.length)),
    [posts.length],
  );

  useEffect(() => {
    if (open === null) return;
    const l = lenis.current;
    l?.stop();
    document.documentElement.style.overflow = "hidden";
    box.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      // arrows follow reading direction
      if (e.key === "ArrowRight") go(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
      if (e.key === "Tab" && box.current) {
        const f = box.current.querySelectorAll<HTMLElement>("button");
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      l?.start();
      document.documentElement.style.overflow = "";
      opener.current?.focus({ preventScroll: true });
    };
  }, [open, go, rtl, lenis]);

  useEffect(() => {
    if (open === null || !box.current || reducedMotion()) return;
    gsap.fromTo(box.current.querySelector("[data-img]"), { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "expo.out" });
  }, [open]);

  // Swipe on touch.
  const touch = useRef<number | null>(null);

  return (
    <div ref={root}>
      <ul className={styles.grid}>
        {posts.map((src, i) => (
          <li key={src} data-tile>
            <button
              type="button"
              className={styles.tile}
              data-cursor="open"
              aria-label={fillClient(t.open, i + 1, name)}
              onClick={(e) => {
                opener.current = e.currentTarget;
                setOpen(i);
              }}
            >
              <Image src={src} alt="" fill sizes="(min-width: 1000px) 320px, 33vw" quality={85} loading="lazy" />
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div
          ref={box}
          className={styles.box}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} — ${open + 1} / ${posts.length}`}
          data-theme="ink"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(null);
          }}
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 50) go((dx < 0 ? 1 : -1) * (rtl ? -1 : 1));
            touch.current = null;
          }}
        >
          <div className={styles.frame} data-img>
            <Image src={posts[open]} alt={`${name} ${open + 1}`} fill sizes="(min-width: 900px) 56vh, 90vw" quality={90} preload />
          </div>
          <div className={styles.bar}>
            <button type="button" className={styles.ctrl} onClick={() => go(-1)} aria-label={t.prev}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.chev} data-dir="prev">
                <path d="M15 5.5 8.5 12 15 18.5" />
              </svg>
            </button>
            <span className={`label ${styles.count}`} dir="ltr">
              {String(open + 1).padStart(2, "0")} / {String(posts.length).padStart(2, "0")}
            </span>
            <button type="button" className={styles.ctrl} onClick={() => go(1)} aria-label={t.nextImg}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.chev} data-dir="next">
                <path d="M9 5.5 15.5 12 9 18.5" />
              </svg>
            </button>
            <button type="button" className={styles.close} onClick={() => setOpen(null)} data-close>
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
