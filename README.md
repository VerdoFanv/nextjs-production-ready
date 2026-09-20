# Next.js Production Ready

Reference Next.js app that demonstrates a production-minded stack: **security headers**, **Core Web Vitals reporting**, and **SEO** — surfaced as a single landing page.

Built with Next.js 16, React 19, Tailwind CSS v4, and Radix UI.

## Home page

| Section | Purpose |
| --- | --- |
| **Header** | Anchor nav to Security / Performance / SEO, plus theme toggle |
| **Hero** | Brand + headline + CTA into the stack sections |
| **Security** | CSP and related headers explained; copyable `next.config.ts` snippet |
| **Performance** | LCP / INP / CLS targets with practices and supporting imagery |
| **SEO** | Metadata API, alt text, sitemap/robots, JSON-LD |
| **Footer** | Site attribution |

Supporting pieces on the route:

- `JsonLd` — Person schema for richer search understanding
- `WebVitalsReporter` — client reporter → `POST /api/vitals` (production)

## Stack highlights

- **Security** — CSP (enforce or report-only via `CSP_ENFORCE`), HSTS (prod), `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` in `next.config.ts`
- **Web Vitals** — `next/web-vitals` + `/api/vitals` hook for your analytics provider
- **SEO** — route `metadata`, `sitemap.ts`, `robots.ts`, Open Graph / Twitter cards, JSON-LD
- **UI** — Radix primitives, Framer Motion (respects reduced motion), `next-themes`, Sonner toasts
- **Tokens** — semantic colors/typography in `src/app/_styles/`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

Create a `.env` in the project root:

```bash
NEXT_PUBLIC_URL="http://localhost:3000"
CSP_ENFORCE="true"   # true = enforce CSP; omit or false = report-only
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_URL` | Canonical site URL (metadata, sitemap, JSON-LD) |
| `CSP_ENFORCE` | `true` = enforce CSP; otherwise report-only |

### Scripts

```bash
npm run dev          # development server
npm run build        # production build
npm run start        # serve production build
npm run lint         # ESLint
npm run format       # Prettier write
npm run typecheck    # tsc --noEmit
npm run check        # typecheck + lint + format check + build
```

## Project layout

```
src/app/
  (home)/                 # Landing route + section components
  api/vitals/             # Web Vitals ingest endpoint
  components/ui/          # Shared Radix-based UI
  components/providers/   # Theme provider
  config/                 # siteConfig, siteImages
  hooks/                  # Client hooks
  lib/                    # cn, formatters, sanitize, url helpers
  _styles/                # Design tokens (colors, theme, typography)
```

## Learn more

- [Next.js docs](https://nextjs.org/docs)
- [Core Web Vitals](https://web.dev/articles/vitals)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
