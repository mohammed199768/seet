"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { site } from "@/content/site";
import { SocialIcon } from "@/components/ui/SocialIcon";
import styles from "./SocialDock.module.css";

export function SocialDock({ lang }: { lang: Locale }) {
  const [footerVisible, setFooterVisible] = useState(false);
  const instagram = site.social.find((social) => social.label === "Instagram");

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.04 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={styles.dock}
      data-hidden={footerVisible ? "true" : undefined}
      aria-label={lang === "ar" ? "تواصل سريع" : "Quick contact"}
    >
      <a
        className={`${styles.link} ${styles.whatsapp}`}
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={lang === "ar" ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
      >
        <span className={styles.icon}>
          <SocialIcon network="whatsapp" />
        </span>
        <span className={styles.label}>WhatsApp</span>
      </a>

      {instagram && (
        <a
          className={`${styles.link} ${styles.instagram}`}
          href={instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lang === "ar" ? "تابعنا على إنستغرام" : "Follow us on Instagram"}
        >
          <span className={styles.icon}>
            <SocialIcon network="instagram" />
          </span>
          <span className={styles.label}>Instagram</span>
        </a>
      )}
    </nav>
  );
}
