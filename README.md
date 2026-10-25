# SEET / صيت — website

Bilingual (English LTR by default, Arabic RTL at /ar) agency site for SEET Marketing Agency.
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
| Social media packages, benefits and terms | `src/content/packages.ts` |
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

To rebuild the optimized work library from the supplied source folder, run `npm run images:work`. The script keeps Tablia untouched, excludes contact sheets and empty slices, and exports numbered 1080px WebP files.

## Contact form

The browser submits to `POST /api/contact`. The route validates the request, sends it to Formspree (`xzedyqwk`), then returns success immediately. After the response, it makes best-effort Resend deliveries: a receipt to the visitor when their contact value is an email, and the full request to the company inbox. Missing Resend configuration, exhausted credits, timeouts or API failures are logged but never turn a successful Formspree submission into a visitor-facing error. The form's native Formspree `action` remains as a non-JavaScript fallback.

Configure the server-only email variables in the deployment environment:

```
RESEND_API_KEY=re_...                       # private; never prefix with NEXT_PUBLIC_
CONTACT_TO_EMAIL=team@your-company-domain  # receives the full enquiry
```

Resend sends from `SEET <noreply@seet.agency>`, so `seet.agency` must be verified in the Resend dashboard.

## Other environment variables

```
NEXT_PUBLIC_SITE_URL=https://your-domain   # canonical URLs, sitemap, OG
NEXT_PUBLIC_GA_ID=                         # GA4, loads only when set
NEXT_PUBLIC_META_PIXEL_ID=                 # Meta Pixel, loads only when set
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=      # Google Search Console HTML-tag token
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
