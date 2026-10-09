"use client";

import { useRef, type ReactNode, type ElementType, type CSSProperties } from "react";
import { gsap, useGSAP, reducedMotion, skipIntro, whenSeen } from "@/lib/gsap";
import { onReady } from "@/components/ui/Preloader";

/**
 * Headline whose lines rise out of masks. Lines are authored (not auto-split),
 * so Arabic shaping is never touched and the extrusion has room inside the mask.
 */
export function Lines({
  lines,
  as = "h2",
  className = "",
  lineClassName = "",
  intro = false,
  delay = 0,
  stagger = 0.09,
  start = "top 85%",
  style,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  /** play after the preloader instead of on scroll */
  intro?: boolean;
  delay?: number;
  stagger?: number;
  start?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el || reducedMotion() || (intro && skipIntro())) return;
      const spans = el.querySelectorAll(":scope > .lm > span");
      gsap.set(spans, { yPercent: 115 });
      const play = () => gsap.to(spans, { yPercent: 0, duration: 1.25, stagger, delay, ease: "expo.out" });
      if (intro && contextSafe) return onReady(contextSafe(play));
      whenSeen(el, play, start);
    },
    { scope: ref },
  );
  const Tag = as;
  return (
    <Tag ref={ref} className={className} style={style}>
      {lines.map((l, i) => (
        <span className="lm" key={i}>
          <span className={lineClassName}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Children marked with data-r fade and rise in sequence when the block enters. */
export function Reveal({
  children,
  as = "div",
  className = "",
  stagger = 0.08,
  y = 28,
  start = "top 85%",
  intro = false,
  delay = 0,
  style,
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: number;
  y?: number;
  start?: string;
  intro?: boolean;
  delay?: number;
  style?: CSSProperties;
  [k: `data-${string}`]: string | undefined;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el || reducedMotion() || (intro && skipIntro())) return;
      const items = el.querySelectorAll("[data-r]");
      const targets = items.length ? items : [el];
      gsap.set(targets, { opacity: 0, y });
      const play = () => gsap.to(targets, { opacity: 1, y: 0, duration: 1, stagger, delay, ease: "expo.out", clearProps: "transform" });
      if (intro && contextSafe) return onReady(contextSafe(play));
      whenSeen(el, play, start);
    },
    { scope: ref },
  );
  const Tag = as;
  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}

/** Media frame that wipes open from the bottom with the image settling from a slight zoom. */
export function ClipReveal({
  children,
  className = "",
  start = "top 88%",
  style,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  start?: string;
  style?: CSSProperties;
  [k: `data-${string}`]: string | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reducedMotion()) return;
      const media = el.querySelector("img,video");
      gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
      if (media) gsap.set(media, { scale: 1.25 });
      whenSeen(
        el,
        () => {
          gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" });
          if (media) gsap.to(media, { scale: 1, duration: 1.8, ease: "expo.out" });
        },
        start,
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className} style={style} {...rest}>
      {children}
    </div>
  );
}
