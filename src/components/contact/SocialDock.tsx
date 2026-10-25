"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { site } from "@/content/site";
import { SocialIcon } from "@/components/ui/SocialIcon";
import styles from "./SocialDock.module.css";

export function SocialDock({ lang }: { lang: Locale }) {
  const [footerVisible, setFooterVisible] = useState(false);

  const socialLabel = (network: "instagram" | "facebook") => {
    if (network === "facebook") {
      return lang === "ar" ? "تابعنا على فيسبوك" : "Follow us on Facebook";
    }
    return lang === "ar" ? "تابعنا على إنستغرام" : "Follow us on Instagram";
  };

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

      {site.social.map((social) => (
        <a
          className={`${styles.link} ${styles[social.network]}`}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={socialLabel(social.network)}
          key={social.href}
        >
          <span className={styles.icon}>
            <SocialIcon network={social.network} />
          </span>
          <span className={styles.label}>{social.label}</span>
        </a>
      ))}
    </nav>
  );
}
