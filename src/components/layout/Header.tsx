"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TLink, useTransition } from "@/components/providers/Transition";
import { useLenis } from "@/components/providers/SmoothScroll";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { gsap, reducedMotion } from "@/lib/gsap";
import { href, otherLocale, swapLocale, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/ar";
import { site } from "@/content/site";
import styles from "./Header.module.css";

const links = ["work", "services", "packages", "about", "contact"] as const;

export function Header({ lang, t }: { lang: Locale; t: Dictionary["nav"] & { location: string } }) {
  const pathname = usePathname();
  const { navigate } = useTransition();
  const lenis = useLenis();
  // the menu belongs to the page it was opened on, so any navigation closes it
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((cur) => ((typeof v === "function" ? v(cur === pathname) : v) ? pathname : null));
  const [floating, setFloating] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const other = otherLocale(lang);

  // Floating pill once the top header has scrolled away.
  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu open/close animation, scroll lock, focus management.
  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-mi]");
    if (open) {
      lenis.current?.stop();
      document.documentElement.style.overflow = "hidden";
      el.hidden = false;
      if (reducedMotion()) gsap.set(el, { clipPath: "inset(0 0 0 0)" });
      else {
        gsap.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" });
        gsap.fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.06, delay: 0.35 });
      }
      el.querySelector<HTMLElement>("a,button")?.focus({ preventScroll: true });
    } else if (!el.hidden) {
      lenis.current?.start();
      document.documentElement.style.overflow = "";
      const done = () => {
        el.hidden = true;
      };
      if (reducedMotion()) done();
      else gsap.to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "expo.inOut", onComplete: done });
      toggle.current?.focus({ preventScroll: true });
    }
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOn(null);
      if (e.key === "Tab" && menu.current) {
        const f = menu.current.querySelectorAll<HTMLElement>("a,button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const active = (k: string) => pathname.startsWith(`/${lang}/${k}`);
  const langHref = swapLocale(pathname, other);
  const switchLang = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(langHref);
  };

  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      {/* Tone follows the page: any page that opens on a navy section gets the reverse logo (see CSS :has). */}
      <header className={styles.header}>
        <div className={`wrap ${styles.bar}`}>
          <TLink href={href(lang)} className={styles.logo} aria-label={t.home}>
            <Logo variant="reverse" width={140} preload={isHome} className={styles.onDark} />
            <Logo variant="primary" width={140} preload={!isHome} className={styles.onLight} />
          </TLink>
          <nav className={styles.nav} aria-label="Primary">
            <ul>
              {links.map((k) => (
                <li key={k}>
                  <TLink href={href(lang, `/${k}`)} className={styles.link} aria-current={active(k) ? "page" : undefined}>
                    {t[k]}
                  </TLink>
                </li>
              ))}
            </ul>
            <a href={langHref} onClick={switchLang} className={styles.lang} hrefLang={other} lang={other}>
              {t.switchLang}
            </a>
            <Button href={href(lang, "/contact")} variant="navy" className={styles.cta}>
              {t.cta}
            </Button>
          </nav>
        </div>
      </header>

      <div className={styles.pill} data-on={floating || open ? "1" : ""}>
        <button
          ref={toggle}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.glyph} data-open={open ? "1" : ""} aria-hidden="true">
            <i />
            <i />
            <b />
          </span>
          <span className={styles.toggleText}>{open ? t.close : t.menu}</span>
        </button>
      </div>

      <div ref={menu} id="site-menu" className={styles.menu} data-theme="navy" hidden role="dialog" aria-modal="true" aria-label={t.menu}>
        <div className={`wrap ${styles.menuInner}`}>
          <ul className={styles.menuList}>
            {(["home", ...links] as const).map((k) => (
              <li key={k} className="lm">
                <span data-mi>
                  <TLink href={k === "home" ? href(lang) : href(lang, `/${k}`)} className={`${styles.menuLink} display`}>
                    {t[k]}
                  </TLink>
                </span>
              </li>
            ))}
          </ul>
          <div className={styles.menuFoot}>
            <span className="lm">
              <span data-mi>
                <a href={langHref} onClick={switchLang} className={styles.menuLang} hrefLang={other} lang={other}>
                  {t.switchLang}
                </a>
              </span>
            </span>
            <span className="lm">
              <span data-mi className={styles.menuMeta}>
                {t.location}
                {site.email && (
                  <>
                    {" · "}
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </>
                )}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
