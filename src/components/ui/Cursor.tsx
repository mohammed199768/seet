"use client";

import { useEffect, useRef } from "react";
import { gsap, finePointer, reducedMotion } from "@/lib/gsap";
import styles from "./Cursor.module.css";

/**
 * Dot cursor. Elements with data-cursor="view|open|drag" turn it into a labelled pill;
 * links and buttons make it swell slightly. Fine pointers only.
 */
export function Cursor({ labels }: { labels: Record<string, string> }) {
  const dot = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!finePointer() || reducedMotion() || !dot.current) return;
    const el = dot.current;
    const html = document.documentElement;
    html.classList.add("has-cursor");
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    let shown = false;
    let mode = "";

    const move = (e: PointerEvent) => {
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const setMode = (next: string, dark: boolean) => {
      if (next === mode) return;
      mode = next;
      el.dataset.mode = next;
      el.dataset.dark = dark ? "1" : "";
      if (text.current) text.current.textContent = labels[next] ?? "";
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const tagged = t?.closest<HTMLElement>("[data-cursor]");
      const dark = !!t?.closest('[data-theme="navy"],[data-theme="ink"]');
      if (tagged) setMode(tagged.dataset.cursor || "view", dark);
      else if (t?.closest("a,button,[role=button],label,select")) setMode("link", dark);
      else setMode("", dark);
    };
    const leave = () => {
      gsap.to(el, { autoAlpha: 0, duration: 0.2 });
      shown = false;
    };
    const down = () => gsap.to(el, { scale: 0.8, duration: 0.15 });
    const up = () => gsap.to(el, { scale: 1, duration: 0.3 });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [labels]);

  return (
    <div ref={dot} className={styles.cursor} aria-hidden="true">
      <span ref={text} className={styles.text} />
    </div>
  );
}
