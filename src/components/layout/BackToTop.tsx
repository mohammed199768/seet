"use client";

import { useLenis } from "@/components/providers/SmoothScroll";
import styles from "./Footer.module.css";

export function BackToTop({ label }: { label: string }) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      className={styles.top2}
      onClick={() => {
        if (lenis.current) lenis.current.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
    >
      {label}
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M12 20V5M5.5 11 12 4.5 18.5 11" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
