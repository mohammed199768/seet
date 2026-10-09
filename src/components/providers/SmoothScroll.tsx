"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";

const LenisContext = createContext<{ current: Lenis | null }>({ current: null });
export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      // keep native touch scrolling: it is what phones feel right with
      syncTouch: false,
      anchors: { offset: -80 },
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // New page: start at the top, then let triggers measure the new layout.
  useEffect(() => {
    const hash = window.location.hash;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    let t: ReturnType<typeof setTimeout> | undefined;
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      // arriving with #anchor (e.g. /services#branding): jump there once pins have measured
      if (hash) {
        t = setTimeout(() => {
          const el = document.getElementById(decodeURIComponent(hash.slice(1)));
          if (!el) return;
          if (lenisRef.current) lenisRef.current.scrollTo(el, { immediate: true, force: true, offset: -24 });
          else el.scrollIntoView();
        }, 60);
      }
    });
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(t);
    };
  }, [pathname]);

  // Late font and image loads shift layout; re-measure once they settle.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(t);
      t = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
