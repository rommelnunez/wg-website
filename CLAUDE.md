# WG Pictures Website — Claude Code Documentation

Marketing site for **WG Pictures**, a film distribution company, served at **wgpictures.com**.

Next.js 16 (App Router) + React 19 + Tailwind v4, exported as a **static site** and hosted on **GitHub Pages**.

---

## The two things that surprise people first

**1. There are no page stylesheets.** Styling is Tailwind utility classes written inline in the JSX. The only CSS file is `src/app/globals.css` (~20 lines: colour and font variables). If you're looking for "the stylesheet for this page," it doesn't exist — edit the `className` on the element.

**2. `next start` does not work.** `next.config.ts` sets `output: "export"`, so the build emits a static site to `out/`. Use one of:

```bash
npm run dev                 # dev server w/ hot reload → localhost:3000
npx next dev                # same, skipping TinaCMS (see below)
npx next build && npx serve out   # preview the real production build
```

`npm run dev` runs `tinacms dev -c "next dev"`. If Tina errors and you're only doing UI work, `npx next dev` is fine.

---

## Deploy

**Push to `main` → GitHub Pages.** `.github/workflows/deploy.yml` runs `npm ci && npx next build` on Node 20 and publishes `out/`. Takes ~2–3 minutes.

- Custom domain comes from **`public/CNAME`** (`wgpictures.com`). Don't delete it — Pages reverts to the `github.io` URL.
- **There are no PR preview deploys.** Pages only builds `main`. Preview locally, or import the repo into Vercel for previews (production would stay on Pages).
- Verify a deploy by matching the workflow run's `headSha` to the merge commit — the run list shows the *previous* run as successful while the new one is still queued, which reads as "nothing deployed."

Sister repo: **`rommelnunez/OHB_Film_Website`** (ourherobalthazar.com) — plain static HTML/CSS on Vercel, a completely different setup. Several things must stay in sync between them; see below.

---

## Routes

| Path | What it is |
| --- | --- |
| `/` | Homepage — 3D prism scene, links through to `/ourherobalthazar` |
| `/ourherobalthazar` | The film page. Most work happens here. |
| `/ohb` | Short share link → redirects to `/ourherobalthazar`, preserving the query string |
| `/ohbwg`, `/ohbwg/[id]` | Redirect-variant showcase |
| `/shopifytest` | Shopify experiment |
| `/_archive/v2`, `v3`, `v4` | Old homepage versions, not linked |

---

## `/ourherobalthazar` — page structure

One large client component: `src/app/ourherobalthazar/page.tsx` (~1,250 lines). Top-level sections, in render order:

```
<nav aria-label="Back to home">     back arrow
<section id="watch-at-home">        heading → OHB logo → provider tiles   ← primary CTA
<section id="trailer">              poster facade → YouTube embed on click
<section id="film-info">            <HeroSection /> — poster, synopsis, cast, credits
<section id="special-screenings">   date picker + location bar + showtimes grid
```

**The order is deliberate.** The film went to digital on 8/11/2026 and traffic is being steered to TVOD, so screenings sit below the fold — they should not be visible on load. Check that before reordering anything.

The three screening blocks were once loose siblings; they're wrapped in `#special-screenings` so they move as a unit.

### Provider tiles

`WATCH_PROVIDERS` at the top of the file. Two constraints that look arbitrary but aren't:

- **Apple TV must stay LAST.** The row stacks vertically on mobile, so the final tile sits lowest and closest to the thumb (Peter's call).
- **Tiles are white, not transparent.** The logos are official brand artwork in full colour — Apple TV's mark is `#0d0d0d` and Prime Video's wordmark `#232F3E`, both invisible on black.

Logo files live in `public/assets/providers/`. They have very different aspect ratios (Apple ~2:1, Prime ~3.25:1, Fandango ~10:1), so the `<img>` caps **both** axes (`max-h-*` + `max-w-full`) instead of forcing one height.

### Apple TV links — do not "fix" these

```
https://tv.apple.com/movie/our-hero-balthazar/umc.cmc.1g1532lsxaqk8su6isibi7n79?at=1000l3cjs&ct=wgpic&itsct=tv_box_link&itscg=30200&mttnsubad=...
```

- **No country code by design.** Apple 301-redirects each visitor to their own storefront, which covers UK/Ireland/Canada with no geo-detection code. The redirect preserves the query string (verified). Adding `/us/` breaks this.
- **`at=` and `ct=` are WG's affiliate attribution.** They were once missing from this site while the OHB site had them, silently losing credit on every purchase routed through wgpictures.com. Never drop them.
- Amazon and Fandango links are **US storefronts only** and do *not* geo-redirect.

---

## Analytics

> **Full reference: [`docs/analytics.md`](docs/analytics.md).** Read that before changing anything analytics-related — the properties, the link-code scheme, the events, and the known gaps are all documented there. The summary below is just enough to avoid breaking it.

**Three separate GA4 properties — don't mix them up:**

| Property | Site |
| --- | --- |
| `G-LM61JDD1X6` | wgpictures.com — loaded site-wide in `src/app/layout.tsx` |
| `G-WXK96SG60E` | shop.wgpictures.com (Shopify) |
| `G-XPPEN38FH8` | ourherobalthazar.com |

`src/components/OhbTracking.tsx` adds **event** tracking on `/ourherobalthazar`. It does not load or configure a property — `gtag` is already on the page from `layout.tsx`.

Events: `ohb_page_view`, `click_watch_<provider>`, `trailer_play`, `scroll_depth`. Fire a custom one with `ohbTrack(name, params)`.

### Partner links

Partners are **investors in the film**, so shared links must not look like tracking aimed at them. Links carry an opaque code, never the handle:

```
wgpictures.com/ohb?r=c1
```

`PARTNER_CODES` in `OhbTracking.tsx` expands the code into full attribution, so GA4 still reports a readable creator name. **Codes are deliberately meaningless** — don't derive them from the handle or the point is lost. Add partners as `c2`, `c3`, …

Because a `?r=` link has no UTM params, GA4 would file the session as `direct / none`, so the expanded values are also pushed via `gtag('set', 'campaign', ...)`.

Outbound tiles carry `data-track` attributes — the click handler depends on them. Reordering `WATCH_PROVIDERS` is safe; removing `data-track` is not.

---

## Data kept in sync with the OHB repo

| Thing | Here | There |
| --- | --- | --- |
| Showtimes | `public/data/showtimes.csv` | `public/showtimes.csv` |
| Theatre → city map | `THEATER_CITIES` in the film page | `public/index.html` |
| Trailer video ID | `TRAILER_ID` (`NLzyq75U6G4`) | inline in `public/index.html` |
| Provider logos | `public/assets/providers/` | `public/assets/images/providers/` |

The showtimes CSV is written by the scraper dashboard in the OHB repo, which syncs to both. Theatrical section headings read **"Special Screenings"** on both sites.

---

## Conventions

- Sections get real `id`s and `aria-label`s, not anonymous `div`s — they double as deep-link anchors (`#watch-at-home`).
- Comment the *why* on anything that looks arbitrary (Apple-last, white tiles, missing country code). All three have already been "corrected" by someone at least once.
- The film page is a client component (`"use client"`) and renders showtimes after fetching the CSV, so the static export is only a shell. Verify changes in a browser; grepping `out/*.html` won't show rendered content.

## Key files

```
src/app/ourherobalthazar/page.tsx   the film page — most work happens here
src/components/OhbTracking.tsx      GA4 events + partner codes
src/app/layout.tsx                  gtag install (G-LM61JDD1X6), metadata
src/app/ohb/page.tsx                short-link redirect
src/components/Footer.tsx           shared footer (email + Shop link)
src/app/globals.css                 the only CSS file — colour/font vars
public/CNAME                        custom domain; deleting it breaks the domain
public/data/showtimes.csv           showtimes, synced from the OHB repo
public/assets/brand/                OHB title logo, teaser image, WG marks
next.config.ts                      output: "export" — why next start fails
```
