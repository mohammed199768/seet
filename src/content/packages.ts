import type { Locale } from "@/lib/i18n";

type L = Record<Locale, string>;

export type SocialPackage = {
  id: "starter" | "growth" | "premium";
  number: string;
  title: string;
  name: L;
  price: L;
  description: L;
  features: Record<Locale, string[]>;
  recommended?: boolean;
};

export const socialPackages: SocialPackage[] = [
  {
    id: "starter",
    number: "01",
    title: "STARTER",
    name: { ar: "باقة الانطلاقة", en: "Launch package" },
    price: { ar: "6,500 جنيه شهريًا", en: "EGP 6,500 / month" },
    description: {
      ar: "مناسبة للمشاريع الجديدة والأنشطة الصغيرة التي تريد أن تبدأ بشكل احترافي.",
      en: "For new ventures and small businesses ready to start with a polished, consistent presence.",
    },
    features: {
      ar: [
        "8 تصاميم سوشيال ميديا",
        "2 فيديو Reels بالمونتاج",
        "6 تصاميم Story",
        "إدارة ونشر المحتوى على منصة واحدة",
        "كتابة الكابشن والمحتوى التسويقي",
        "خطة محتوى شهرية",
        "توحيد شكل التصميمات مع هوية البراند",
        "تقرير أداء شهري مبسط",
      ],
      en: [
        "8 social media designs",
        "2 edited Reels",
        "6 Story designs",
        "Content management and publishing on one platform",
        "Captions and marketing copy",
        "Monthly content plan",
        "A consistent look aligned with the brand identity",
        "Simplified monthly performance report",
      ],
    },
  },
  {
    id: "growth",
    number: "02",
    title: "GROWTH",
    name: { ar: "باقة النمو", en: "Growth package" },
    price: { ar: "11,500 جنيه شهريًا", en: "EGP 11,500 / month" },
    description: {
      ar: "مناسبة للشركات التي تريد توسيع انتشارها وبناء حضور قوي على السوشيال ميديا.",
      en: "For businesses ready to widen their reach and build a stronger social media presence.",
    },
    features: {
      ar: [
        "12 تصميم سوشيال ميديا",
        "4 فيديوهات Reels احترافية",
        "2 تصميم Carousel، كل تصميم حتى 5 شرائح",
        "10 تصاميم Story",
        "إدارة ونشر المحتوى على منصتين",
        "كتابة المحتوى التسويقي والإعلاني",
        "خطة محتوى شهرية",
        "دراسة مبسطة للمنافسين",
        "اقتراح أفكار للعروض والحملات",
        "تقرير أداء شهري وتحليل النتائج",
      ],
      en: [
        "12 social media designs",
        "4 professionally edited Reels",
        "2 Carousels of up to 5 slides each",
        "10 Story designs",
        "Content management and publishing on two platforms",
        "Marketing and advertising copy",
        "Monthly content plan",
        "Focused competitor review",
        "Offer and campaign concepts",
        "Monthly performance report and results analysis",
      ],
    },
    recommended: true,
  },
  {
    id: "premium",
    number: "03",
    title: "PREMIUM",
    name: { ar: "باقة الصدارة", en: "Leadership package" },
    price: { ar: "19,500 جنيه شهريًا", en: "EGP 19,500 / month" },
    description: {
      ar: "مناسبة للعيادات والشركات والبراندات التي تحتاج محتوى متنوعًا وهوية قوية وحضورًا مستمرًا.",
      en: "For clinics, companies and brands that need varied content, a strong identity and an always-on presence.",
    },
    features: {
      ar: [
        "16 تصميم سوشيال ميديا",
        "6 فيديوهات Reels بمونتاج احترافي",
        "4 تصاميم Carousel، كل تصميم حتى 5 شرائح",
        "16 تصميم Story",
        "إدارة ونشر المحتوى على 3 منصات",
        "كتابة المحتوى التسويقي والإعلاني",
        "خطة محتوى واستراتيجية شهرية",
        "تحليل المنافسين والجمهور المستهدف",
        "تطوير أفكار حملات تسويقية",
        "متابعة أساسية للتعليقات خلال أيام العمل",
        "تقريران للأداء شهريًا",
        "اجتماع متابعة واستشارة تسويقية شهريًا",
      ],
      en: [
        "16 social media designs",
        "6 professionally edited Reels",
        "4 Carousels of up to 5 slides each",
        "16 Story designs",
        "Content management and publishing on three platforms",
        "Marketing and advertising copy",
        "Monthly content plan and strategy",
        "Competitor and target audience analysis",
        "Marketing campaign concept development",
        "Basic comment monitoring on business days",
        "Two performance reports per month",
        "Monthly follow-up and marketing consultation",
      ],
    },
  },
];

export const packageBenefits: Record<Locale, string[]> = {
  ar: [
    "تصاميم احترافية مصممة خصيصًا لهويتك",
    "محتوى إبداعي يناسب الجمهور المستهدف",
    "تنظيم مواعيد النشر وفق خطة واضحة",
    "فريق متخصص في التصميم والمونتاج والتسويق",
    "متابعة الأداء وتطوير المحتوى باستمرار",
  ],
  en: [
    "Professional designs made specifically for your identity",
    "Creative content shaped around the target audience",
    "Publishing organised around a clear plan",
    "A specialist design, editing and marketing team",
    "Continuous performance review and content improvement",
  ],
};

export const packageTerms: Record<Locale, string[]> = {
  ar: [
    "الأسعار بالجنيه المصري والاشتراك شهري.",
    "الباقات لا تشمل تكلفة الإعلانات الممولة أو إدارة الحملات الإعلانية.",
    "تصوير الفيديوهات وجلسات التصوير الخارجية غير مشمولة.",
    "المونتاج من المواد المقدمة من العميل أو الأصول الرقمية المتفق عليها.",
    "إنتاج 3D أو AI متقدم يتم تسعيره بشكل منفصل.",
    "مدة كل ريل حتى 45 ثانية.",
    "تشمل كل قطعة محتوى جولتي تعديل.",
    "تشمل الباقة عدد المحتويات الموضح، مع إمكانية إعادة نشرها على المنصات المشمولة دون إنتاج محتوى منفصل لكل منصة.",
    "الرد على رسائل العملاء غير مشمول إلا باتفاق مستقل.",
    "يبدأ العمل بعد سداد الاشتراك واعتماد خطة التنفيذ.",
  ],
  en: [
    "Prices are in Egyptian pounds and subscriptions are monthly.",
    "Paid media spend and campaign management are not included.",
    "Video shoots and external photography sessions are not included.",
    "Editing uses client-supplied footage or agreed digital assets.",
    "Advanced 3D or AI production is quoted separately.",
    "Each Reel may be up to 45 seconds.",
    "Each content item includes two revision rounds.",
    "The stated content volume may be republished across included platforms without separate production for each platform.",
    "Replying to customer messages is not included unless agreed separately.",
    "Work starts after payment and approval of the delivery plan.",
  ],
};
