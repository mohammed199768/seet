# SEET / صيت — Website Plan

Source material: `SEET_Developer_Handoff.docx`, `SEET_Company_Services.docx`, `SEET_Brand_Identity_Kit.pdf`, `seet_logo.png`, two neon banners, the 10s logo-reveal video, the LamaSans family, and 34 Instagram-grid screenshots of client work.

## 1. What the company actually is

- **SEET Marketing Agency / صيت**. A creative marketing agency. The legal name "SAYT / Media Creative" is never used in the UI.
- **Office:** Beni Suef, Egypt (address still needs confirming).
- **Clients:** mostly in Kuwait. The posts use +965 numbers, Gulf dialect copy and Kuwaiti brands.
- **What they make:** they design and run Instagram feeds, mainly for food and beverage, clinics and retail.
- **Eight services** (from the handoff):
  - Social media management
  - Content and design
  - Branding
  - Media buying
  - Influencer and activations
  - Web, e-commerce and apps
  - Consultancy and feasibility
  - Photo, video and motion
- **Brand rules:**
  - Colours: Navy #2B2A68, Ink #100F0D, White. Nothing else unless justified.
  - Logo clear space of 0.25 × logo height, minimum width 140px, never stretched, never rebuilt in type.
  - Brand language: "Bold. Clear. Memorable.", "A system, not a template.", "Make the brand visible.", "Your next move."
  - The neon/3D treatment is allowed in the hero only.
- **The name:** صيت literally means *reputation, renown*: the thing that travels ahead of you.

### Portfolio (split from the 34 grids, duplicates removed)

| Client | Sector | Grids |
|---|---|---|
| Al Mersal Trading (Abu Feel, Good France sauces) | FMCG | 0, 9, 33 |
| Mango Talaat | Juice bar | 1, 2 |
| Smart Food Butchery | Meat boxes | 3 |
| Shawarma Factory | QSR | 4 |
| Tablia (طبلية) | Egyptian restaurant | 5, 16 |
| Wadi Rum | Shawarma | 6 |
| Bridgestone Tire Distribution | Automotive | 7, 11, 24, 26 |
| V60 Coffee | Café | 8 |
| Mona Clinic | Dental and derma | 10, 13, 20, 22 |
| SENT Hearing Center | ENT | 12, 21 |
| Best Quality Laundry | Services | 14 |
| LAMPO | Car tint and protection | 15 |
| Next Level | Restaurant | 17, 18 |
| AIIC | Insurance | 19 |
| GREY Flowers & Events | Events | 23, 28 |
| Zeina Clinic | Derma | 25 |
| Ebtesam | Beauty salon | 27 |
| RARUS Perfumes | Fragrance | 29 |
| Prime Clinic | Dental | 30 |
| Spotless | Cleaning | 31 |
| ACAN Nursery | Education | 32 |

Pipeline:
1. Upscale each grid 2× with Magnific Precision, which stays faithful to Arabic text.
2. Split the 3-column grid into 4:5 posts.
3. Trim the gutters.
4. Perceptual-hash dedupe.
5. Export WebP to `public/work/<client>/`.
6. A manifest in `src/content/clients.ts` drives every page.

## 2. Concept: "صيتك يسبقك" (your reputation precedes you)

The site argues one thing: SEET builds the feed a brand is known by.

**Signature: the Extrusion.** The logo is a chunky block with a solid navy extrusion falling down-left. That same extrusion becomes the site's tactile language:
- display headlines carry a stepped navy extrusion that deepens as they scroll into view;
- buttons and project tiles sit on an extrusion and *press down* on hover or tap, like pushing the logo block.

It is used only in a few key places (hero, CTA, buttons, tile hover). Everything else stays flat colour-blocking.

**Supporting motifs, all lifted from the brand kit and video:**
- **Two dots** (from ث and ë) for the preloader, the cursor, and the menu toggle.
- **Dots and bars** as a pattern texture on navy fields.
- **The paper plane on a light line** from the logo video. It draws itself across the final CTA and flies off when the contact form is sent.

### Tokens

| Token | Value | Use |
|---|---|---|
| `--navy` | #2B2A68 | primary field, buttons, extrusion |
| `--navy-deep` | #1E1D4E | extrusion shade, pressed state |
| `--ink` | #100F0D | text, dark fields |
| `--paper` | #F2F2F5 | soft field (brand kit page grey) |
| `--white` | #FFFFFF | base |
| `--lilac` | #B9B6F2 | muted text on navy only; derived from navy, not a new hue |

**Type:** LamaSans only. It is one bilingual family (Arabic and Latin), so both languages share one voice.
- **Display:** LamaSans Black Expanded, a wide geometric echo of the logo. Uppercase Latin.
- **Body:** LamaSans Regular / Medium.
- **Labels and data:** LamaSans Medium Condensed, uppercase Latin at 0.08em tracking; Arabic has no tracking.
- **Scale:** clamp-based. Display 9–17vw, h2 5–8vw, body 17–19px. Arabic line-height is 1.7 for body, 1.15 for display.

### Avoid-list (AI-look)

- **Colour and effects:** no gradients or glow blobs outside the brand video, no glassmorphism.
- **Layout:** no three-icon card grids, no centred pill-badge hero, no shadcn look.
- **Icons:** no emoji and no icon libraries. The only glyphs are a custom arrow and the dots.
- **Copy:** no fake testimonials and no unverified metrics. The handoff explicitly flags the Dawam growth numbers as unconfirmed, so they stay off the site.
- **Motion:** not the same fade-up everywhere. Each reveal type maps to a role:
  - headline: line mask
  - image: clip-path wipe
  - list rows: stagger
  - numbers: count-up

## 3. Sitemap (ar default, en mirror)

`/ar`, `/en`
- `/` Home
- `/work` covers all clients. Sector filter: Food & drink / Health & beauty / Retail & services / Automotive.
- `/work/[client]` is a case page: name, sector, services, observed brief, full feed with lightbox, and next case.
- `/services` lists all eight services, each with its own anchor section.
- `/about` holds who we are, the process in five steps, and how we work.
- `/contact` has the form plus location and social links.
- `sitemap.xml`, `robots.txt`, OG images, JSON-LD for Organization and Service.

### Home flow

1. **Preloader.** About 1.2s: the two dots drop, the extrusion fills, the curtain lifts. Skipped on repeat visits, and it does not block the LCP poster.
2. **Hero.** Navy field.
   - Huge line-masked headline: "صيتك / يسبقك." in Arabic, "MAKE THE / BRAND / VISIBLE." in English.
   - The brand's own logo-reveal video sits in a rounded block and expands to full-bleed on scroll.
   - CTAs: Start a project / See the work.
3. **Client ticker.** Real client names in a velocity-reactive marquee, mirrored for RTL.
4. **Statement.** One paragraph whose words light up as you scrub.
5. **The Feed.** The signature work moment.
   - A pinned horizontal run of client "feeds": each card is a 3×3 grid of that brand's real posts that shuffles on hover.
   - Below it, a three-column wall of 300+ posts drifting at different speeds.
6. **Services.** An editorial list rather than cards.
   - Big rows; hovering shows a floating image that follows the cursor.
   - On mobile, a tap opens the row.
7. **Process.** Discover → Think → Create → Launch → Optimize. It is a real sequence, so the numbers are earned. Pinned on desktop, stacked on mobile.
8. **Facts.** Only verifiable counts: brands in the portfolio, posts shown, services, sectors.
9. **CTA.** "YOUR NEXT MOVE." / "خطوتك الجاية." in extruded type that tilts with the pointer, and the paper-plane line draws as you scroll.
10. **Footer.** Reverse logo, navigation, location, social links, legal line.

## 4. Motion and libraries

| Need | Tool |
|---|---|
| Smooth scroll | `lenis` 1.3 driven by `gsap.ticker`, with ScrollTrigger updates on Lenis scroll |
| Timelines and scroll | `gsap` 3.15 (all plugins free): ScrollTrigger, SplitText (mask lines, autoSplit, never chars for Arabic), Flip, MotionPathPlugin, DrawSVG |
| React integration | `@gsap/react` `useGSAP` scoped contexts |
| Page transitions | Navy curtain wipe in a template-level client transition; the direction follows `dir` |
| Cursor | Dot cursor that grows into a "View / شاهد" pill; only on `(hover:hover) and (pointer:fine)` |
| Magnetic buttons | `gsap.quickTo`, fine pointer only |
| Reduced motion | `gsap.matchMedia`: Lenis, pins and scrub are off; opacity-only fades instead |

The stack is Next.js 16 App Router + TypeScript + CSS Modules, with no CSS framework so every value comes from the tokens. Static generation applies to every locale, client and service.

## 5. Generated media (Freepik, 5,000-credit cap)

The art direction is one consistent still-life series: hard-flash studio photography on navy seamless paper, white and ink objects, a long ink shadow. It is about craft objects, not 3D clay icons or AI people.

| # | Asset | Model | Est. credits |
|---|---|---|---|
| 1–8 | One still life per service (phone and tiles, poster proofs and a marker, a rubber stamp and cards, ticket-rail receipts, a ring light and microphone, a laptop, a notebook and loupe, a cinema camera) | Nano Banana Pro, 4:5 | 8 × 75 = 600 |
| 9–10 | About: a studio product shoot (softbox and burger), a desk of printed post proofs on a navy cutting mat | Nano Banana Pro, 3:2 | 150 |
| 11 | Work intro: top-down hands arranging printed posts into a 3×3 grid | Nano Banana Pro + Kling 2.5 720p video | 75 + 140 |
| 12 | Production loop: camera flash firing in the studio | Kling 2.5 720p | 140 |
| — | Portfolio: 2× faithful upscale of about 24 unique grids | Magnific Precision | about 24 × 90 = 2,160 |

The total is about 3,265 credits, with the remainder kept as a buffer for retries.

## 6. Quality bar (Definition of Done from the handoff)

- **Brand:** brand-exact colours. The logo is always the image file, with clear space respected.
- **Layout:** real responsive layouts at 390 / 768 / 1024 / 1440. RTL/LTR mirroring is checked, with arrows flipped and logos and numerals not flipped.
- **Performance:** AVIF/WebP via next/image, fixed aspect ratios with zero CLS. The video has a poster and `preload="none"` on mobile.
- **Accessibility:** semantic headings, alt text, visible focus, form labels, contrast AA, keyboard-navigable menu and lightbox.
- **Contact form:**
  - Validated on client and server (zod), with a honeypot and time-trap against spam.
  - Clear success and error states.
  - Delivery through `CONTACT_WEBHOOK_URL` or `RESEND_API_KEY` env.
- **Content:** no placeholder text visible. Unknown phone and email are hidden until they are added in `src/content/site.ts`.
