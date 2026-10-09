"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import styles from "./Transition.module.css";

type Ctx = { navigate: (href: string) => void };
const TransitionContext = createContext<Ctx>({ navigate: () => {} });
export const useTransition = () => useContext(TransitionContext);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const busy = useRef(false);

  const navigate = useCallback(
    (to: string) => {
      const target = new URL(to, window.location.href);
      if (target.pathname === window.location.pathname) {
        if (target.hash) router.push(to);
        return;
      }
      if (busy.current) return;
      if (reducedMotion() || !curtain.current) {
        router.push(to);
        return;
      }
      busy.current = true;
      const el = curtain.current;
      gsap.killTweensOf(el);
      gsap.set(el, { visibility: "visible", clipPath: "inset(100% 0% 0% 0%)" });
      gsap.fromTo(
        el.querySelectorAll("[data-dot]"),
        { yPercent: -260, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "bounce.out", delay: 0.18 },
      );
      gsap.to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.6,
        ease: "expo.inOut",
        onComplete: () => {
          covering.current = true;
          router.push(to);
        },
      });
    },
    [router],
  );

  useEffect(() => {
    const el = curtain.current;
    if (!el || !covering.current) {
      busy.current = false;
      return;
    }
    covering.current = false;
    const tl = gsap.timeline({
      delay: 0.12,
      onComplete: () => {
        gsap.set(el, { visibility: "hidden" });
        busy.current = false;
      },
    });
    tl.to(el.querySelectorAll("[data-dot]"), { yPercent: 160, opacity: 0, duration: 0.35, stagger: 0.05, ease: "power2.in" });
    tl.to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7, ease: "expo.inOut" }, "<0.1");
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div ref={curtain} className={styles.curtain} aria-hidden="true">
        <span className={styles.dots}>
          <i data-dot />
          <i data-dot />
        </span>
      </div>
    </TransitionContext.Provider>
  );
}

type TLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
  prefetch?: boolean;
};

/** Link that plays the curtain before routing. Falls back to native behaviour for new-tab clicks. */
export function TLink({ href, onClick, children, prefetch, ...rest }: TLinkProps) {
  const { navigate } = useTransition();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || rest.target === "_blank") return;
    if (/^(https?:|mailto:|tel:)/.test(href)) return;
    e.preventDefault();
    navigate(href);
  };
  return (
    <Link href={href} onClick={handle} prefetch={prefetch} {...rest}>
      {children}
    </Link>
  );
}
