import type { Locale } from "@/lib/i18n";

type L = Record<Locale, string>;

export type Service = {
  slug: string;
  image: string;
  title: L;
  short: L;
  scope: Record<Locale, string[]>;
};

/** CMS-shaped: order, add or remove entries here and every page follows. */
export const services: Service[] = [
  {
    slug: "social-media",
    image: "/media/svc-social.webp",
    title: { ar: "إدارة السوشيال ميديا", en: "Social media management" },
    short: {
      ar: "نجهّز الحسابات، نخطط المحتوى، ننشر بانتظام، ونتابع التفاعل والرسائل.",
      en: "Accounts set up and run: content plans, scheduling, posting, comments and DMs.",
    },
    scope: {
      ar: ["تجهيز الحسابات وتحسينها", "خطة محتوى شهرية", "الجدولة والنشر", "متابعة التعليقات والرسائل", "تقرير أداء شهري"],
      en: ["Account setup and optimisation", "Monthly content plan", "Scheduling and publishing", "Comments and DMs", "Monthly performance report"],
    },
  },
  {
    slug: "content-design",
    image: "/media/svc-content.webp",
    title: { ar: "المحتوى والتصميم", en: "Content & graphic design" },
    short: {
      ar: "كتابة المحتوى وتصميم المنشورات والمواد الدعائية، مفصّلة لكل منصة.",
      en: "Copy and design for posts, ads and print, cut for each platform.",
    },
    scope: {
      ar: ["كتابة المحتوى", "تصميم البوستات والستوري", "تصاميم الإعلانات", "المطبوعات الدعائية"],
      en: ["Copywriting", "Post and story design", "Ad creatives", "Print collateral"],
    },
  },
  {
    slug: "branding",
    image: "/media/svc-branding.webp",
    title: { ar: "الهوية والحلول الإبداعية", en: "Branding & creative" },
    short: {
      ar: "هوية بصرية، اتجاه إبداعي، وتطبيقات للعلامة على كل نقطة تواصل.",
      en: "Visual identity, creative direction and brand applications for every touchpoint.",
    },
    scope: {
      ar: ["الشعار والهوية البصرية", "دليل استخدام الهوية", "الاتجاه الإبداعي", "أفكار الحملات"],
      en: ["Logo and visual identity", "Brand guidelines", "Creative direction", "Campaign concepts"],
    },
  },
  {
    slug: "media-buying",
    image: "/media/svc-media.webp",
    title: { ar: "الإعلانات الممولة والتسويق الرقمي", en: "Digital marketing & media buying" },
    short: {
      ar: "نشغّل الإعلانات الممولة من البداية للنهاية: استهداف، تحسين، تحليل وتقارير.",
      en: "Paid campaigns run end to end: targeting, optimisation, analysis and reports.",
    },
    scope: {
      ar: ["إعداد الحملات", "استهداف الجمهور", "اختبار الإعلانات وتحسينها", "تقارير الأداء"],
      en: ["Campaign setup", "Audience targeting", "Ad testing and optimisation", "Performance reports"],
    },
  },
  {
    slug: "influencers",
    image: "/media/svc-influencer.webp",
    title: { ar: "المؤثرين وتفعيل الحملات", en: "Influencers & activations" },
    short: {
      ar: "نختار المؤثرين المناسبين، وننسّق الحملات والفعاليات من الفكرة للتنفيذ.",
      en: "The right creators, campaigns and on-ground activations, from idea to execution.",
    },
    scope: {
      ar: ["اختيار المؤثرين", "التفاوض والتنسيق", "تفعيلات على الأرض", "متابعة النتائج"],
      en: ["Creator selection", "Briefing and coordination", "On-ground activations", "Results tracking"],
    },
  },
  {
    slug: "web-apps",
    image: "/media/svc-web.webp",
    title: { ar: "المواقع والمتاجر والتطبيقات", en: "Websites, e-commerce & apps" },
    short: {
      ar: "تصميم وتطوير مواقع ومتاجر إلكترونية وتطبيقات جوال، مع التحديث والمتابعة الفنية.",
      en: "Sites, online stores and mobile apps, designed, built and kept up to date.",
    },
    scope: {
      ar: ["تصميم واجهات المستخدم", "تطوير المواقع", "المتاجر الإلكترونية", "تطبيقات الجوال", "الدعم الفني"],
      en: ["UI/UX design", "Website development", "E-commerce", "Mobile apps", "Technical support"],
    },
  },
  {
    slug: "consultancy",
    image: "/media/svc-consult.webp",
    title: { ar: "الاستشارات ودراسات الجدوى", en: "Consultancy & feasibility" },
    short: {
      ar: "دراسة السوق والجمهور والمنافسين، ودراسات جدوى وخطط تسويقية واضحة.",
      en: "Market, audience and competitor research, feasibility studies and marketing plans.",
    },
    scope: {
      ar: ["دراسة السوق", "تحليل المنافسين", "دراسات الجدوى", "الخطة والاستراتيجية التسويقية"],
      en: ["Market research", "Competitor analysis", "Feasibility studies", "Marketing strategy and plan"],
    },
  },
  {
    slug: "production",
    image: "/media/svc-production.webp",
    title: { ar: "التصوير والفيديو والموشن", en: "Photo, video & motion" },
    short: {
      ar: "تصوير المنتجات والخدمات، فيديو، مونتاج، موشن جرافيك وتصحيح ألوان.",
      en: "Product and service shoots, video, editing, motion graphics and colour grading.",
    },
    scope: {
      ar: ["تصوير المنتجات", "إنتاج الفيديو", "المونتاج", "الموشن جرافيك", "تصحيح الألوان"],
      en: ["Product photography", "Video production", "Editing", "Motion graphics", "Colour grading"],
    },
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
