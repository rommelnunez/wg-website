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
 * Link codes. A shared link carries a short opaque `?r=` code, which is
 * expanded back into full campaign attribution here.
 *
 * Two reasons this exists rather than plain UTM strings on the URL:
 *
 * 1. Partners are investors sharing the film — the code keeps their handle out
 *    of the URL, so what they post reads as a plain link to the film rather
 *    than tracking pointed at them.
 * 2. It keeps links short, which matters for SMS, where a UTM string eats into
 *    the segment limit.
 *
 * To add one: pick an unused code and add a row.
 */
const LINK_CODES: Record<string, Partial<Meta>> = {
  // --- Partners. Codes are deliberately meaningless; don't derive them from
  // the handle, or the point is lost. ---
  c1: {
    creator: "welcome.jpeg",
    channel: "instagram",
    medium: "influencer",
    content: "bio_link",
  },

  // --- Owned channels (Laylo blasts) ---
  //
  // These need separate codes because GA4 cannot distinguish an SMS click from
  // an email click on its own. Both typically arrive with no referrer — native
  // mail apps and the Messages app send none — so both land in Direct and are
  // indistinguishable. The medium values below are the ones GA4's default
  // channel grouping recognises, so these land in "Email" and "SMS".
  e1: { channel: "laylo", medium: "email", content: "blast" },
  s1: { channel: "laylo", medium: "sms", content: "blast" },
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

  // A link code wins over UTMs — it's the short-link path.
  const code = q.get("r");
  const link = code ? LINK_CODES[code.toLowerCase()] : undefined;
  if (link) {
    return {
      channel: link.channel || "referral",
      medium: link.medium || "",
      content: link.content || "",
      campaign: link.campaign || DEFAULT_CAMPAIGN,
      // Owned-channel codes have no creator; only partner links do.
      creator: link.creator || "",
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
