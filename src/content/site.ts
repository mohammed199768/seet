/**
 * Business details. Fields left empty are hidden in the UI until filled in —
 * the handoff lists phone, email, domain and social URLs as still to be provided.
 */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://seet.agency",
  name: { ar: "صيت", en: "SEET" },
  legalNameNote: "Marketing name only — do not mix with SAYT / Media Creative legal wording.",
  phone: "", // e.g. "+20 100 000 0000"
  whatsapp: "", // digits only, e.g. "201000000000"
  email: "", // e.g. "hello@seet.agency"
  location: {
    ar: "بني سويف، مصر",
    en: "Beni Suef, Egypt",
  },
  social: [] as { label: string; href: string }[],
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  },
};
