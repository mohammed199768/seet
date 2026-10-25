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
    slug: "bridgestone",
    name: { ar: "بريجستون", en: "Bridgestone" },
    sector: "auto",
    services: ["social-media", "content-design", "production"],
    summary: {
      ar: "محتوى لموزّع إطارات بريجستون: شرح المقاسات، مقارنة الموديلات، وصور من الورشة لفريق العمل نفسه.",
      en: "Feed for the Bridgestone tyre distributor: size guides, model line-ups and photos of the actual workshop team.",
    },
    posts: 39,
    cover: 1,
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
    cover: 3,
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
    posts: 54,
    cover: 2,
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
    posts: 30,
    cover: 1,
  },
  {
    slug: "bright-touch",
    name: { ar: "برايت تاتش", en: "Bright Touch" },
    sector: "retail",
    services: ["social-media", "production"],
    summary: {
      ar: "خدمات تنظيف عميق للأثاث والمفروشات، قدّمناها بصور ميدانية ورسائل مباشرة توضّح الفرق والنتيجة.",
      en: "Deep-cleaning services for furniture and interiors, presented through field photography and direct before-and-after messaging.",
    },
    posts: 12,
    cover: 2,
  },
  {
    slug: "dawaii",
    name: { ar: "دوايي", en: "Dawaii" },
    sector: "health",
    services: ["social-media", "content-design"],
    summary: {
      ar: "منصة صحية بهوية خضراء هادئة، محتوى توعوي وخدمي يحوّل التفاصيل الطبية إلى رسائل سهلة وواضحة.",
      en: "A health platform with a calm green identity and service-led content that makes medical information clear and approachable.",
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
    posts: 39,
    cover: 1,
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
    cover: 2,
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
    slug: "healthy",
    name: { ar: "هيلثي", en: "Healthy" },
    sector: "food",
    services: ["social-media", "content-design", "production"],
    summary: {
      ar: "وجبات متوازنة بمحتوى يبرز المكوّنات والسعرات والعروض، مع تصوير منتج دافئ وهوية برتقالية ثابتة.",
      en: "Balanced meals presented through ingredient-led content, clear offers and warm product photography in a consistent orange system.",
    },
    posts: 30,
    cover: 2,
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
    cover: 5,
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
    posts: 36,
    cover: 2,
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
    cover: 1,
  },
  {
    slug: "sovia",
    name: { ar: "سوفيا", en: "Sovia" },
    sector: "retail",
    services: ["social-media", "content-design", "production"],
    summary: {
      ar: "علامة أزياء وإكسسوارات بهوية هادئة، ركّزنا فيها على تفاصيل الخامة والمنتج داخل نظام بصري أنيق.",
      en: "A fashion and accessories brand built around quiet styling, tactile product detail and an elegant visual system.",
    },
    posts: 15,
    cover: 2,
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
    cover: 4,
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
    cover: 3,
  },
  {
    slug: "makebtek",
    name: { ar: "مكتبك", en: "Maktabak" },
    sector: "retail",
    services: ["social-media", "content-design"],
    summary: {
      ar: "منصة للخدمات والحلول الهندسية، بهوية زرقاء دقيقة ومحتوى يشرح رحلة المستخدم من الفكرة إلى التنفيذ.",
      en: "An engineering services platform with a precise blue identity and content that explains the path from idea to execution.",
    },
    posts: 31,
    cover: 3,
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
    cover: 2,
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
    posts: 24,
    cover: 6,
  },
  {
    slug: "hadaq",
    name: { ar: "حدق", en: "Hadaq" },
    sector: "health",
    services: ["social-media", "content-design", "web-apps"],
    summary: {
      ar: "تجربة رقمية للخدمات الصحية، قدّمناها بمحتوى يشرح المزايا والخطوات ويُظهر المنتج داخل الاستخدام اليومي.",
      en: "A digital healthcare experience explained through product-led content, clear feature stories and everyday use cases.",
    },
    posts: 18,
    cover: 3,
  },
  {
    slug: "kabab-factory",
    name: { ar: "كباب فاكتوري", en: "Kabab Factory" },
    sector: "food",
    services: ["social-media", "content-design", "production"],
    summary: {
      ar: "مطعم مشاوي بهوية داكنة وجريئة، محتوى عروض وتصوير قريب يجعل النار والمنتج بطلَي المشهد.",
      en: "A grill restaurant with a bold dark identity, offer-led content and close photography that puts fire and food at centre stage.",
    },
    posts: 18,
    cover: 5,
  },
  {
    slug: "soft",
    name: { ar: "سوفت", en: "Soft" },
    sector: "food",
    services: ["social-media", "content-design", "production"],
    summary: {
      ar: "حلويات وشوكولاتة بهوية وردية مرحة، جمعنا فيها تصوير المنتج مع رسائل خفيفة وحركة بصرية شهية.",
      en: "Desserts and chocolate wrapped in a playful pink identity, combining product photography with light copy and appetite-first art direction.",
    },
    posts: 24,
    cover: 4,
  },
  {
    slug: "wallstreet",
    name: { ar: "وول ستريت", en: "Wallstreet" },
    sector: "retail",
    services: ["social-media", "content-design"],
    summary: {
      ar: "خدمات سفر وتسهيل إجراءات، بمحتوى يبسّط الخطوات ويحوّل المعلومات المعقدة إلى بطاقات عملية واضحة.",
      en: "Travel and facilitation services presented through practical content that turns complex steps into clear, usable information.",
    },
    posts: 21,
    cover: 1,
  },
];

export const featured = ["tablia", "healthy", "bridgestone", "mona-clinic", "mango-talaat", "next-level", "rarus", "bright-touch"];

export const clientBySlug = (slug: string) => clients.find((c) => c.slug === slug);

export const postSrc = (slug: string, n: number) => `/work/${slug}/${String(n).padStart(2, "0")}.webp`;

export const postsOf = (c: Client) =>
  Array.from({ length: c.posts }, (_, i) => i + 1)
    .filter((n) => !c.skip?.includes(n))
    .map((n) => postSrc(c.slug, n));

export const totalPosts = clients.reduce((n, c) => n + c.posts - (c.skip?.length ?? 0), 0);
