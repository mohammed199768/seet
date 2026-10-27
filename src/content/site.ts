/**
 * Business details. Fields left empty are hidden in the UI until filled in —
 * the handoff lists phone, email, domain and social URLs as still to be provided.
 */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.seet.agency",
  name: { ar: "صيت", en: "SEET" },
  legalNameNote: "Marketing name only — do not mix with SAYT / Media Creative legal wording.",
  phone: "", // e.g. "+20 100 000 0000"
  whatsapp: "201043437978",
  whatsappDisplay: "+20 10 4343 7978",
  email: "", // e.g. "hello@seet.agency"
  location: {
    ar: "بني سويف، مصر",
    en: "Beni Suef, Egypt",
  },
  social: [
    { network: "instagram", label: "Instagram", href: "https://www.instagram.com/seetagency123/" },
    { network: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61591667284562" },
  ] as { network: "instagram" | "facebook"; label: string; href: string }[],
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  },
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
};
