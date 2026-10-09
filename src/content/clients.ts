import type { Locale } from "@/lib/i18n";

type L = Record<Locale, string>;

export type Sector = "food" | "health" | "retail" | "auto";

export type Client = {
  slug: string;
  name: L;
  sector: Sector;
  /** service slugs from services.ts */
  services: string[];
  /** what the work shows — descriptive only, no unverified results */
  summary: L;
  /** number of posts exported to /public/work/<slug>/NN.webp */
  posts: number;
  /** 1-based post index used as the single cover image */
  cover: number;
  /** 1-based post indexes to leave out (screenshot artifacts) */
  skip?: number[];
};

export const sectors: Record<Sector, L> = {
  food: { ar: "مطاعم ومشروبات", en: "Food & drink" },
  health: { ar: "صحة وتجميل", en: "Health & beauty" },
  retail: { ar: "خدمات وتجزئة", en: "Retail & services" },
  auto: { ar: "سيارات", en: "Automotive" },
};

export const clients: Client[] = [
  {
    slug: "tablia",
    name: { ar: "طبلية", en: "Tablia" },
    sector: "food",
    services: ["social-media", "content-design", "influencers", "production"],
    summary: {
      ar: "مطعم مصري بنينا له صوتًا كله حنين: «طعم زمان»، أفيشات أبيض وأسود، وأطباق تتصوّر كأنها على سفرة البيت.",
      en: "An Egyptian kitchen given a voice built on nostalgia: “the taste of the old days”, retro TV references and dishes shot like a family table.",
    },
    posts: 30,
    cover: 5,
    skip: [2],
  },
  {
    slug: "smart-food",
    name: { ar: "سمارت فود", en: "Smart Food" },
    sector: "food",
    services: ["social-media", "content-design", "production"],
    summary: {
      ar: "بوكسات لحوم جاهزة للشوي. حملة صيف «صيفك غير»، عروض بوكسات بأسعار واضحة، وتصوير منتج على البحر والشواية.",
      en: "Ready-to-grill meat boxes. A “your summer, different” campaign, box offers with clear pricing and product shot on the beach and the grill.",
    },
    posts: 15,
    cover: 14,
  },
  {
    slug: "bridgestone",
    name: { ar: "بريجستون", en: "Bridgestone" },
    sector: "auto",
    services: ["social-media", "content-design", "production"],
    summary: {
      ar: "محتوى لموزّع إطارات بريجستون: شرح المقاسات، مقارنة الموديلات، وصور من الورشة لفريق العمل نفسه.",
      en: "Feed for the Bridgestone tyre distributor: size guides, model line-ups and photos of the actual workshop team.",
    },
    posts: 41,
    cover: 5,
  },
  {
    slug: "mona-clinic",
    name: { ar: "منى كلينك", en: "Mona Clinic" },
    sector: "health",
    services: ["social-media", "content-design"],
    summary: {
      ar: "عيادة أسنان وجلدية. محتوى توعوي بسيط، نتائج قبل وبعد، ونظام أزرق ثابت يخلي كل بوست معروف من أول نظرة.",
      en: "Dental and skin clinic. Plain-language education, before-and-after results and a steady blue system that makes every post recognisable.",
    },
    posts: 24,
    cover: 14,
  },
  {
    slug: "mango-talaat",
    name: { ar: "مانجو طلعت", en: "Mango Talaat" },
    sector: "food",
    services: ["social-media", "production"],
    summary: {
      ar: "محل عصائر بهوية برتقالية. صور منتج حيّة في الشارع والعربية، وكل كوب يشتغل كإعلان.",
      en: "A juice bar with an orange identity. Lively product shots on the street and in the car, where every cup works as an ad.",
    },
    posts: 18,
    cover: 5,
  },
  {
    slug: "next-level",
    name: { ar: "نكست ليفل", en: "Next Level" },
    sector: "food",
    services: ["social-media", "content-design", "production"],
    summary: {
      ar: "مطعم وجبات بالسعرات. لوحة سوداء جريئة، عناوين كبيرة، وبيانات القيمة الغذائية جزء من التصميم.",
      en: "Macro-counted meals. A bold black palette, oversized headlines and nutrition facts built into the layout.",
    },
    posts: 17,
    cover: 2,
  },
  {
    slug: "grey-events",
    name: { ar: "جراي للورود والمناسبات", en: "GREY Flowers & Events" },
    sector: "retail",
    services: ["social-media", "production"],
    summary: {
      ar: "تنسيق ورود ومناسبات. تصوير من قلب التجهيزات، وأخضر هادي يعطي العلامة فخامتها.",
      en: "Florals and event styling. Behind-the-scenes shoots from the set-up and a calm green that carries the brand's polish.",
    },
    posts: 15,
    cover: 14,
  },
  {
    slug: "lampo",
    name: { ar: "لامبو", en: "LAMPO" },
    sector: "auto",
    services: ["social-media", "content-design", "production"],
    summary: {
      ar: "تظليل وحماية سيارات. أسود وذهبي، تصوير ليلي للسيارات، ورسائل مباشرة عن الخبرة والضمان.",
      en: "Car tint and protection. Black and gold, night-time car shoots and direct messages about experience and warranty.",
    },
    posts: 12,
    cover: 2,
  },
  {
    slug: "al-mersal",
    name: { ar: "المرسال التجارية", en: "Al Mersal Trading" },
    sector: "food",
    services: ["social-media", "content-design", "production"],
    summary: {
      ar: "صوصات «أبو فيل» و«جود فرانس». تصاميم فاتحة للشهية، اقتراحات أكل مع كل صوص، وعناوين عربية خفيفة الدم.",
      en: "Abu Feel and Good France sauces. Appetite-first design, food pairings for every bottle and playful Arabic headlines.",
    },
    posts: 32,
    cover: 3,
  },
  {
    slug: "sent-hearing",
    name: { ar: "سنت للسمعيات", en: "SENT Hearing Center" },
    sector: "health",
    services: ["social-media", "content-design"],
    summary: {
      ar: "مركز سمعيات. محتوى يشرح الأعراض بلغة الناس، ويحوّل موضوع حساس لرسائل واضحة ومطمّنة.",
      en: "A hearing centre. Symptoms explained in everyday language, turning a sensitive subject into clear, reassuring posts.",
    },
    posts: 24,
    cover: 8,
  },
  {
    slug: "shawarma-factory",
    name: { ar: "شاورما فاكتوري", en: "Shawarma Factory" },
    sector: "food",
    services: ["social-media", "content-design", "production"],
    summary: {
      ar: "شاورما بشخصية برتقالية مرحة. مشاهد خيالية، عروض توصيل، وتصوير قريب للساندويش.",
      en: "Shawarma with a playful orange personality. Surreal scenes, delivery pushes and close-up sandwich shots.",
    },
    posts: 12,
    cover: 2,
  },
  {
    slug: "wadi-rum",
    name: { ar: "وادي رم", en: "Wadi Rum" },
    sector: "food",
    services: ["social-media", "content-design"],
    summary: {
      ar: "شاورما وادي رم. محتوى مرتبط بالمواسم والمباريات، وألوان أخضر وبرتقالي من هوية المطعم.",
      en: "Wadi Rum shawarma. Posts tied to seasons and match days, in the restaurant's own green and orange.",
    },
    posts: 12,
    cover: 5,
  },
  {
    slug: "v60-coffee",
    name: { ar: "V60 كوفي", en: "V60 Coffee" },
    sector: "food",
    services: ["social-media", "production"],
    summary: {
      ar: "مقهى مختص. أبيض ورمادي هادي، تصوير للقهوة والحلى، وطباعة مفرّغة تخلي المنتج هو البطل.",
      en: "Speciality coffee. Quiet whites and greys, coffee and dessert photography, and outline type that keeps the product the hero.",
    },
    posts: 12,
    cover: 7,
  },
  {
    slug: "zeina-clinic",
    name: { ar: "زينة كلينك", en: "Zeina Clinic" },
    sector: "health",
    services: ["social-media", "content-design"],
    summary: {
      ar: "عيادة جلدية وتجميل. أخضر طبيعي، نتائج قبل وبعد، ورسالة «تحسين، مش تغيير».",
      en: "Skin and aesthetics clinic. Natural greens, before-and-after results and a “refinement, not transformation” message.",
    },
    posts: 12,
    cover: 3,
  },
  {
    slug: "prime-clinic",
    name: { ar: "برايم كلينك", en: "Prime Clinic" },
    sector: "health",
    services: ["social-media", "content-design"],
    summary: {
      ar: "عيادة أسنان. أحمر واثق، نتائج حقيقية قبل وبعد، ومحتوى يشجع على الفحص المبكر.",
      en: "Dental clinic. A confident red, real before-and-after cases and posts that push for early check-ups.",
    },
    posts: 9,
    cover: 2,
  },
  {
    slug: "ebtesam",
    name: { ar: "ابتسام", en: "Ebtesam" },
    sector: "health",
    services: ["social-media", "content-design"],
    summary: {
      ar: "صالون تجميل. شعر وأظافر ومكياج بتصوير ناعم، وأدلة بصرية تساعد العميلة تختار.",
      en: "Beauty salon. Soft photography for hair, nails and make-up, plus visual guides that help clients choose.",
    },
    posts: 15,
    cover: 3,
  },
  {
    slug: "rarus",
    name: { ar: "رارس للعطور", en: "RARUS Perfumes" },
    sector: "retail",
    services: ["social-media", "production"],
    summary: {
      ar: "عطور. زجاجة واحدة في كل كادر، إضاءة دافئة، ومشاهد تحكي عن الرائحة بدون كلام كثير.",
      en: "Fragrance. One bottle per frame, warm light and scenes that suggest the scent without many words.",
    },
    posts: 12,
    cover: 5,
  },
  {
    slug: "best-quality",
    name: { ar: "بيست كواليتي لاندري", en: "Best Quality Laundry" },
    sector: "retail",
    services: ["social-media", "content-design"],
    summary: {
      ar: "مغسلة ملابس. برتقالي وأبيض، قوائم أسعار واضحة، ومحتوى عن العناية بكل قطعة.",
      en: "A laundry. Orange and white, clear price lists and posts about caring for each garment.",
    },
    posts: 12,
    cover: 2,
  },
  {
    slug: "aiic",
    name: { ar: "AIIC للتأمين", en: "AIIC Insurance" },
    sector: "retail",
    services: ["social-media", "content-design"],
    summary: {
      ar: "تأمين. ذهبي وأبيض، رموز بسيطة للحماية، ورسائل قصيرة تشرح التغطية.",
      en: "Insurance. Gold and white, simple protection symbols and short messages that explain cover.",
    },
    posts: 12,
    cover: 5,
  },
  {
    slug: "spotless",
    name: { ar: "سبوتلس", en: "Spotless" },
    sector: "retail",
    services: ["social-media", "content-design"],
    summary: {
      ar: "خدمات تنظيف. صور قبل وبعد، أزرق نظيف، ورقم الحجز ظاهر في كل بوست.",
      en: "Cleaning services. Before-and-after shots, a clean blue and the booking number visible on every post.",
    },
    posts: 15,
    cover: 1,
  },
  {
    slug: "acan-nursery",
    name: { ar: "حضانة أكان", en: "ACAN Nursery" },
    sector: "retail",
    services: ["social-media", "content-design"],
    summary: {
      ar: "حضانة أطفال. ألوان مرحة، محتوى بالإنجليزي للأهالي، وإعلانات التسجيل والعروض.",
      en: "A nursery. Playful colours, English-language posts for parents, and registration and offer announcements.",
    },
    posts: 15,
    cover: 5,
  },
];

export const featured = ["tablia", "smart-food", "bridgestone", "mona-clinic", "mango-talaat", "next-level", "grey-events", "lampo"];

export const clientBySlug = (slug: string) => clients.find((c) => c.slug === slug);

export const postSrc = (slug: string, n: number) => `/work/${slug}/${String(n).padStart(2, "0")}.webp`;

export const postsOf = (c: Client) =>
  Array.from({ length: c.posts }, (_, i) => i + 1)
    .filter((n) => !c.skip?.includes(n))
    .map((n) => postSrc(c.slug, n));

export const totalPosts = clients.reduce((n, c) => n + c.posts - (c.skip?.length ?? 0), 0);
