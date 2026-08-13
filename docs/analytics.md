# Analytics — GA4 setup for wgpictures.com

Reference for anything analytics-related on this site. If you're changing page layout or styling instead, you want the root `CLAUDE.md`.

---

## Plain-language primer

Skip this if you already know GA4.

- **GA4** (Google Analytics 4) records what people do on the site — pages viewed, links clicked, where they came from.
- A **property** is one GA4 "bucket" of data. Each website normally gets its own. We have three.
- A **measurement ID** looks like `G-XXXXXXXX` and tells the page which property to send data to.
- **gtag** is the small Google script that does the sending. It's loaded once per page.
- An **event** is one recorded action — a page view, a button click.
- **UTM parameters** are tags added to a URL (`?utm_source=instagram&utm_medium=influencer`) so GA4 knows where a visitor came from. Without them, GA4 usually guesses "Direct" and you lose the trail.
- **Attribution** is the general problem of knowing which link, email, or post caused a visit or a sale.

---

## The three properties

Each site reports to a different property. Sending data to the wrong one is the easiest mistake to make here.

| Measurement ID | Site | Where it's installed |
| --- | --- | --- |
| `G-LM61JDD1X6` | **wgpictures.com** (this repo) | `src/app/layout.tsx`, loaded on every page |
| `G-WXK96SG60E` | shop.wgpictures.com (Shopify) | Shopify theme, not this repo |
| `G-XPPEN38FH8` | ourherobalthazar.com | `public/index.html` in the `OHB_Film_Website` repo |

`src/components/OhbTracking.tsx` **only sends events**. It does not load or configure a property — gtag is already on the page from `layout.tsx`. Don't add a second `gtag('config', ...)` call; that would double-count traffic.

---

## How our link tracking works

### The problem it solves

We share links in lots of places — partner Instagram bios, Laylo email blasts, Laylo texts. We need to know which one drove a visit and, ideally, a purchase.

Two complications:

1. **Partners are investors in the film.** A link with `utm_term=welcome.jpeg` in it reads as tracking pointed at them. The link they post should look like a plain link to the film.
2. **GA4 cannot tell an SMS click from an email click on its own.** Native mail apps and the Messages app both send no referrer, so both arrive looking like Direct traffic and are indistinguishable. There's no automatic detection — each send needs its own tagged link.

### The solution

Every shared link carries a short opaque code instead of UTM parameters:

```
https://wgpictures.com/ohb?r=c1
```

- `/ohb` is a short route that redirects to `/ourherobalthazar`, carrying the query string across. Short matters for SMS, which has a per-message character limit.
- `?r=c1` is the code. `LINK_CODES` in `src/components/OhbTracking.tsx` expands it into full attribution.

So the URL stays short and anonymous, while GA4 still gets a readable source.

### Current codes

| Code | Type | Channel | Medium | Content | Creator |
| --- | --- | --- | --- | --- | --- |
| `c1` | Partner | instagram | influencer | bio_link | welcome.jpeg |
| `e1` | Owned | laylo | email | blast | — |
| `s1` | Owned | laylo | sms | blast | — |
| `d1` | Owned | manychat | social | dm | — |

`medium` values matter: GA4's **default channel grouping** only recognises a fixed set of them. `email`, `sms` and `social` are on that list, so those visits land in the "Email", "SMS" and "Organic Social" channels rather than "Unassigned." This is why the ManyChat code uses `social` rather than the more descriptive `dm` — `dm` is not a recognised value. The `content` field carries the real detail instead.

**Codes are deliberately meaningless.** Don't derive them from the partner's handle — that would put the name back in the URL and defeat the point.

### Adding a code

1. Add a row to `LINK_CODES` in `src/components/OhbTracking.tsx`.
2. Add a matching row to the **[OHB Tracked Links](https://app.notion.com/p/ce9baec3d46043eb8ee5c2ca630f574b)** Notion database, so the registry and the code stay in sync.
3. Ship it — the link does nothing until it's deployed.

---

## Events

Fired by `OhbTracking.tsx` on `/ourherobalthazar`:

| Event | When |
| --- | --- |
| `ohb_page_view` | page load |
| `click_watch_apple_tv` / `_prime_video` / `_fandango_at_home` | provider tile clicked |
| `trailer_play` | trailer poster clicked |
| `scroll_depth` | 25 / 50 / 75 / 100% reached |

Every event carries `channel`, `medium`, `content`, `campaign` and `creator`.

**Why we attach those to each event rather than relying on GA4's built-in fields:** GA4's campaign dimensions are *session*-scoped, so custom events lose the source unless you carry it yourself.

Fire your own event from anywhere on the page with `ohbTrack(name, params)`.

### The `data-track` dependency

Outbound provider tiles in `src/app/ourherobalthazar/page.tsx` carry `data-track` attributes. The click handler finds links by that attribute. **Removing or renaming them silently kills click tracking** — no error, the events just stop. Reordering the provider list is safe.

This is the one file shared between analytics work and layout work. Touch it carefully from either side.

---

## Session attribution for `?r=` links

A `?r=` link has no UTM parameters, so GA4 would file the session under `direct / none` and the partner would get no credit in the standard acquisition reports. To prevent that, the expanded values are also pushed in as the session campaign:

```js
gtag('set', 'campaign', { source, medium, name, content, term })
```

**Open item:** this has been verified only client-side — we've confirmed the browser sends it, not how GA4 processes it. Worth checking in **GA4 DebugView** with a real `?r=c1` visit. If sessions still show as `direct / none`, switch to passing campaign fields through a `gtag('config', ...)` call instead.

---

## Known gaps

- **ohb.com uses different provider links.** It still points at `primevideo.com` and uses the Apple campaign token `ct=wgpic`, while this site uses the Amazon product page and `ct=wgpic19`. Conversions from the two sites therefore land under different campaign tokens. Not yet reconciled.
- **`click_watch_*` events are not marked as conversions** in GA4. Doing so is what turns "which partner drove clicks" into "which partner drove purchases."
- **No internal-traffic filter** in GA4, so local testing hits mix into the real data.

---

## Related

- Root `CLAUDE.md` — stack, deploy pipeline, page structure
- `src/components/OhbTracking.tsx` — the implementation
- [OHB Tracked Links](https://app.notion.com/p/ce9baec3d46043eb8ee5c2ca630f574b) — the link registry
