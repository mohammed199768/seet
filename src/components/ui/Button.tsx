"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { TLink } from "@/components/providers/Transition";
import { gsap, finePointer, reducedMotion } from "@/lib/gsap";
import { Arrow } from "./Arrow";
import styles from "./Button.module.css";

type Common = {
  children: ReactNode;
  variant?: "navy" | "white" | "outline";
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
  magnetic?: boolean;
};

type AsLink = Common & { href: string; type?: never; disabled?: never; onClick?: never };
type AsButton = Common & { href?: never; type?: "button" | "submit"; disabled?: boolean; onClick?: () => void };

export function Button(props: AsLink | AsButton) {
  const { children, variant = "navy", size = "md", arrow = true, className = "", magnetic = true } = props;
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !magnetic || !finePointer() || reducedMotion()) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.32);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [magnetic]);

  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;
  const inner = (
    <span className={styles.face}>
      <span className={styles.text}>{children}</span>
      {arrow && <Arrow className={styles.arrow} />}
    </span>
  );

  return (
    <span ref={ref} className={styles.mag}>
      {"href" in props && props.href ? (
        <TLink href={props.href} className={cls}>
          {inner}
        </TLink>
      ) : (
        <button type={props.type ?? "button"} disabled={props.disabled} onClick={props.onClick} className={cls}>
          {inner}
        </button>
      )}
    </span>
  );
}
