import localFont from "next/font/local";

/** LamaSans — one bilingual (Arabic + Latin) family, used in three widths. */
export const sans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../fonts/LamaSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/LamaSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/LamaSans-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/LamaSans-Black.woff2", weight: "900", style: "normal" },
  ],
  fallback: ["system-ui", "Segoe UI", "Tahoma", "Arial", "sans-serif"],
});

export const display = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../fonts/LamaSans-BoldExpanded.woff2", weight: "700", style: "normal" },
    { path: "../fonts/LamaSans-BlackExpanded.woff2", weight: "900", style: "normal" },
  ],
  fallback: ["Arial Black", "Tahoma", "sans-serif"],
});

export const label = localFont({
  variable: "--font-label",
  display: "swap",
  preload: false,
  src: [{ path: "../fonts/LamaSans-MediumCondensed.woff2", weight: "500", style: "normal" }],
  fallback: ["Arial Narrow", "Tahoma", "sans-serif"],
});
