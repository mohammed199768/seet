"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip, MotionPathPlugin, DrawSVGPlugin);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Phones get content straight from the HTML: no preloader, no intro masks (fast first paint). */
export const skipIntro = () =>
  reducedMotion() || (typeof window !== "undefined" && window.matchMedia("(max-width: 960px)").matches);

/** +1 for LTR, -1 for RTL — multiply horizontal motion by this. */
export const dirSign = () => (typeof document !== "undefined" && document.documentElement.dir === "rtl" ? -1 : 1);

/**
 * Run `fn` once when `trigger` reaches `start` — also when a fast jump skips straight past it
 * (ScrollTrigger then reports onLeave without onEnter), so reveals never strand content hidden.
 */
export const whenSeen = (trigger: Element, fn: () => void, start = "top 85%") =>
  ScrollTrigger.create({ trigger, start, once: true, onEnter: fn, onLeave: fn });

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };
