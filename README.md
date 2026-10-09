# SEET / صيت — website

Bilingual (Arabic RTL by default, English LTR) agency site for SEET Marketing Agency.
Next.js 16 (App Router) · TypeScript · GSAP 3.15 (ScrollTrigger, SplitText, Flip, MotionPath, DrawSVG) · Lenis · CSS Modules.

The design rationale, asset list and motion plan are in [`PLAN.md`](PLAN.md).

## Run

```bash
npm install
npm run dev          # http://localhost:3000  →  redirects to /ar or /en
npm run build && npm start
```

## Where things live

| What | File |
|---|---|
| Phone, email, WhatsApp, social links, analytics IDs | `src/content/site.ts` (empty fields stay hidden on the site) |
| Services (order, copy, scope, image) | `src/content/services.ts` |
| Clients / case studies (name, sector, summary, cover, post count) | `src/content/clients.ts` |
| All interface copy, both languages | `src/dictionaries/ar.ts`, `src/dictionaries/en.ts` |
| Brand tokens (colours, type scale, extrusion) | `src/app/globals.css` |
| Portfolio images | `public/work/<client>/NN.webp` (4:5) |
| Generated still lifes and films | `public/media/` |
| Logo variants (from the brand kit artwork) | `public/brand/logo-{primary,reverse,mono}.{png,webp}` |
| Fonts (LamaSans, subset to Arabic + Latin, WOFF2) | `src/fonts/` |

To add a client:
1. Export its posts as `public/work/<slug>/01.webp, 02.webp…` at 4:5.
2. Add an entry to `clients.ts`.

Pages, the sitemap and static params all follow from that entry.

## Contact form

`POST /api/contact` validates with zod. Spam protection is a honeypot field plus a 2.5 s time trap. Configure delivery with environment variables:

```
CONTACT_WEBHOOK_URL=   # receives the JSON payload (Make, Zapier, CRM…)
# or
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=    # optional, must be a verified Resend sender
```

How it behaves without either:
- In development, requests are logged.
- In production, the API answers 503 and the form shows its error message, so no request is silently lost.

## Other environment variables

```
NEXT_PUBLIC_SITE_URL=https://your-domain   # canonical URLs, sitemap, OG
NEXT_PUBLIC_GA_ID=                         # GA4, loads only when set
NEXT_PUBLIC_META_PIXEL_ID=                 # Meta Pixel, loads only when set
```

## Motion and accessibility

**Desktop** gets the full choreography:
- preloader (first visit per session only);
- line-mask headline reveals and a curtain page transition;
- the film expanding from its block to full screen;
- the pinned horizontal work rail, the pinned process and the paper-plane CTA.

**Phones** get content straight from the HTML (no preloader, no intro masks), with native scrolling and swipe rows.

**`prefers-reduced-motion`** turns off smooth scroll, pins, scrubbing and autoplaying video.

Arabic text is never split into letters, so shaping is preserved. Directional motion, arrows and the flight path mirror in RTL; logos and numerals do not.

## Open items (from the handoff, still to confirm)

- **Contact details:** phone, email, domain and social URLs. Fill in `site.ts`.
- **Office address:** only "Beni Suef, Egypt" is shown until the full address is confirmed.
- **Vector logo:** SVG / AI files. The current marks are clean transparent rasters extracted from the brand kit.
- **Client names and summaries:**
  - Names were read from the posts themselves; confirm the exact spellings with each client.
  - Summaries describe only what the work shows.
  - No results or metrics are published. The Dawam growth figures are deliberately left out, as the handoff requires.
- **Legal pages:** if needed, add them using the confirmed legal name. Never mix "SEET" with "SAYT / Media Creative".
