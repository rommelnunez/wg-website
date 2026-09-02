"use client";

import { PrismSceneLite } from "@/components/redirects/PrismSceneLite";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import teaserPreview from "../../public/assets/brand/teaser-preview.jpg";

// Points at the film's own page rather than straight out to Apple TV, so
// viewers land on the full provider list (Apple TV / Prime Video / Fandango
// at Home) instead of a single storefront. The Apple affiliate link lives on
// that page. Previously this had no route into /ourherobalthazar at all.
const OHB_URL = "/ourherobalthazar";

// The merch store is a separate Shopify storefront on its own subdomain, so
// this is a plain <a> rather than a next/link route.
const SHOP_URL = "https://shop.wgpictures.com";

export default function Home() {
  // Desktop hover state only - mobile shows preview by default via CSS
  const [hovered, setHovered] = useState(false);

  return (
    <div className="h-screen w-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center">
      {/* Preview Image Layer
          - Mobile: always visible at 35% opacity (via CSS class)
          - Desktop: visible on hover at 60% opacity */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 opacity-[0.35] md:opacity-0 ${hovered ? "md:!opacity-60" : ""}`}>
        <Image
          src={teaserPreview}
          alt="Our Hero Balthazar"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 3D Scene Layer — smaller, centered, on top so the logo is interactive
          - Mobile: slightly dimmed to let preview show through
          - Desktop: full opacity, dims on hover */}
      <div className={`absolute left-1/2 top-[5%] -translate-x-1/2 w-[80vw] h-[62vh] md:w-[55vw] md:h-[63vh] z-20 transition-all duration-1000 opacity-60 md:opacity-100 ${hovered ? "md:!opacity-30 md:scale-90" : "scale-100"}`}>
        <PrismSceneLite inverted={false} />
      </div>

      {/* UI Overlay — below the 3D scene, pointer-events only on interactive elements */}
      <div className="relative z-10 flex flex-col items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          // 65vh put the Shop CTA level with the footer email link — fine on
          // desktop where they sit far apart horizontally, crowded on a phone
          // where the centred CTA lands right beside the left-aligned address.
          className="mt-[56vh] md:mt-[65vh] flex flex-col items-center"
        >
          {/* Desktop: hover reveals preview, click navigates
              Mobile: single tap navigates directly (preview always visible) */}
          <Link
            href={OHB_URL}
            className="group flex flex-col items-center pointer-events-auto"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* "New Release" label - always visible on mobile, hover-reveal on desktop */}
            <span className={`font-mono text-[10px] tracking-[0.5em] uppercase mb-4 transition-opacity duration-500 opacity-100 md:opacity-40 ${hovered ? "md:!opacity-100" : ""} md:group-hover:opacity-100`}>
              New Release
            </span>
            {/* 30% of the old text-4xl / md:text-6xl (2.25rem / 3.75rem) —
                Tyler asked for the title to come down by 70%. */}
            <h1 className={`font-display text-[0.675rem] md:text-[1.125rem] tracking-tighter text-white transition-transform duration-700 ${hovered ? "md:scale-105" : ""} md:group-hover:scale-105`}>
              OUR HERO, BALTHAZAR
            </h1>
            {/* Underline - always visible on mobile, hover-reveal on desktop */}
            <div className={`h-[1px] bg-white transition-all duration-700 mt-2 w-full md:w-0 ${hovered ? "md:!w-full" : ""} md:group-hover:w-full`} />
            {/* "WATCH AT HOME" - hidden on mobile, hover-reveal on desktop */}
            <span className={`mt-8 font-mono text-xs tracking-widest transition-opacity duration-500 hidden md:block ${hovered ? "opacity-40" : "opacity-0"} group-hover:opacity-40`}>
              WATCH AT HOME
            </span>
          </Link>

          {/* Merch store CTA.
              Deliberately a sibling of the <Link> above, not a child: nesting an
              anchor inside an anchor is invalid HTML and React drops it.
              On desktop it sits below the hover-reveal "WATCH AT HOME" line, which
              is opacity-0 but still block-level, so this does not shift on hover.
              That line is `hidden` on mobile, hence the larger mt-10 there and the
              tighter md:mt-2 on desktop.
              The mobile margins grew by 24px when the title shrank: that shrink
              freed ~27px of line height above, so SHOP still sits no lower than
              before and stays clear of the footer email link on short phones. */}
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="void-flash mt-10 [@media(max-height:700px)]:mt-7 md:mt-2 pointer-events-auto font-void text-2xl [@media(max-height:700px)]:text-xl md:text-4xl leading-none tracking-[0.08em] transition-opacity duration-300 hover:opacity-80"
          >
            SHOP
          </a>
        </motion.div>
      </div>

      {/* Footer.
          pointer-events-none on the wrapper as well as the <footer>: this is an
          absolutely-positioned full-width band at z-30 covering the bottom of the
          page, and while it was click-catching it swallowed taps on the Shop CTA
          above it. The footer's own link column re-enables pointer events. */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <Footer inverted={false} showShop={false} />
      </div>
    </div>
  );
}
