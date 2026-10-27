"use client";

import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/lib/gsap";

/**
 * Muted, inline, looping video that only fetches when near the viewport and pauses
 * off-screen. On the first page load it also waits for the window load event (or 3s), so
 * the video never competes with the poster, fonts and scripts the first paint needs.
 * With reduced motion it stays on its poster.
 */
export function LazyVideo({
  mp4,
  webm,
  mp4Small,
  webmSmall,
  poster,
  className = "",
  label,
  eager = false,
}: {
  mp4: string;
  webm?: string;
  /** lighter encodes served to narrow screens */
  mp4Small?: string;
  webmSmall?: string;
  poster: string;
  className?: string;
  label?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || reducedMotion()) return;
    let near = false;
    let settled = document.readyState === "complete";
    const start = () => {
      if (!near || !settled) return;
      setLoad(true);
      v.play().catch(() => {});
    };
    const settle = () => {
      settled = true;
      start();
    };
    const timer = settled ? undefined : setTimeout(settle, 3000);
    if (!settled) window.addEventListener("load", settle, { once: true });
    const io = new IntersectionObserver(
      ([e]) => {
        near = e.isIntersecting;
        if (near) start();
        else v.pause();
      },
      { rootMargin: eager ? "100% 0px" : "25% 0px" },
    );
    io.observe(v);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      window.removeEventListener("load", settle);
    };
  }, [eager]);

  useEffect(() => {
    if (load) ref.current?.play().catch(() => {});
  }, [load]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      aria-hidden={label ? undefined : true}
      disablePictureInPicture
    >
      {load && webmSmall && <source src={webmSmall} type="video/webm" media="(max-width: 960px)" />}
      {load && mp4Small && <source src={mp4Small} type="video/mp4" media="(max-width: 960px)" />}
      {load && webm && <source src={webm} type="video/webm" />}
      {load && <source src={mp4} type="video/mp4" />}
    </video>
  );
}
