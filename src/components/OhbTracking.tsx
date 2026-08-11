"use client";

import { useEffect } from "react";

/**
 * GA4 tracking for /ourherobalthazar, built for the influencer campaign.
 *
 * Mirrors the pattern already running on shop.wgpictures.com/pages/giveaway:
 * capture the UTM params off the landing URL once, then attach them to every
 * custom event so influencer attribution survives into event-scoped reports
 * (GA4's built-in campaign dimensions only attach to the session, so custom
 * events lose the source unless you carry it yourself).
 *
 * The gtag script itself is loaded site-wide in app/layout.tsx under the
 * wgpictures.com property. This module only sends events — it does not load
 * or configure a second property.
 */

const DEFAULT_CAMPAIGN = "ohb_watch";

/**
 * Partner codes. The shared link carries an opaque `?r=` code rather than the
 * creator's handle, so what a partner posts reads as a plain link to the film
 * and not as tracking pointed at them. The code is expanded back into full
 * campaign attribution here, so GA4 still reports a readable creator name.
 *
 * To add a partner: pick an unused code and add a row. Codes are deliberately
 * meaningless — don't derive them from the handle, or the point is lost.
 */
const PARTNER_CODES: Record<string, Partial<Meta> & { creator: string }> = {
  c1: {
    creator: "welcome.jpeg",
    channel: "instagram",
    medium: "influencer",
    content: "bio_link",
  },
};

type Meta = {
  channel: string;
  medium: string;
  content: string;
  campaign: string;
  creator: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function readMeta(): Meta {
  const q = new URLSearchParams(window.location.search);

  // A partner code wins over UTMs — it's the short-link path.
  const code = q.get("r");
  const partner = code ? PARTNER_CODES[code.toLowerCase()] : undefined;
  if (partner) {
    return {
      channel: partner.channel || "partner",
      medium: partner.medium || "influencer",
      content: partner.content || "",
      campaign: partner.campaign || DEFAULT_CAMPAIGN,
      creator: partner.creator,
    };
  }

  let referrerHost = "direct";
  if (document.referrer) {
    try {
      referrerHost = new URL(document.referrer).hostname;
    } catch {
      referrerHost = "referral";
    }
  }
  return {
    channel: q.get("utm_source") || referrerHost,
    medium: q.get("utm_medium") || "",
    content: q.get("utm_content") || "",
    campaign: q.get("utm_campaign") || DEFAULT_CAMPAIGN,
    // Handle, so individual creators can be compared directly without
    // parsing utm_content.
    creator: q.get("utm_term") || q.get("utm_content") || "",
  };
}

export function OhbTracking() {
  useEffect(() => {
    const meta = readMeta();

    // A ?r= link carries no UTM params, so GA4 would file the session under
    // direct/none. Feed the expanded values in as the session campaign so the
    // standard acquisition reports still credit the right partner.
    const usedCode = new URLSearchParams(window.location.search).get("r");
    if (usedCode && typeof window.gtag === "function") {
      window.gtag("set", "campaign", {
        source: meta.channel,
        medium: meta.medium,
        name: meta.campaign,
        content: meta.content,
        term: meta.creator,
      });
    }

    const track = (name: string, extra?: Record<string, unknown>) => {
      const payload = { ...meta, ...(extra || {}) };
      if (typeof window.gtag === "function") {
        window.gtag("event", name, payload);
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: name, ...payload });
    };

    track("ohb_page_view");

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.("[data-track]") as HTMLElement | null;
      if (!el) return;
      const href = el.getAttribute("href") || "";
      track("click_" + el.getAttribute("data-track"), { link_url: href });
    };
    document.addEventListener("click", onClick, true);

    const hits: Record<number, boolean> = {};
    const onScroll = () => {
      const d = document.documentElement;
      if (!d.scrollHeight) return;
      const pct = Math.round(((window.scrollY + window.innerHeight) / d.scrollHeight) * 100);
      [25, 50, 75, 100].forEach((m) => {
        if (pct >= m && !hits[m]) {
          hits[m] = true;
          track("scroll_depth", { percent: m });
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Let other parts of the page report events through the same payload shape.
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      if (!detail.name) return;
      track(detail.name, detail.params);
    };
    document.addEventListener("ohb:track", onCustom);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("ohb:track", onCustom);
    };
  }, []);

  return null;
}

/** Fire a tracked event from anywhere on the page. */
export function ohbTrack(name: string, params?: Record<string, unknown>) {
  if (typeof document === "undefined") return;
  document.dispatchEvent(new CustomEvent("ohb:track", { detail: { name, params } }));
}
