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
    // Influencer handle, so individual creators can be compared directly
    // without parsing utm_content.
    creator: q.get("utm_term") || q.get("utm_content") || "",
  };
}

export function OhbTracking() {
  useEffect(() => {
    const meta = readMeta();

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
