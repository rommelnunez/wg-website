"use client";

import { PrismSceneLite } from "@/components/redirects/PrismSceneLite";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import teaserPreview from "../../public/assets/brand/teaser-preview.jpg";

// No country code: Apple redirects each visitor to their own storefront
// (verified 301, affiliate query params preserved). Covers UK/IE and CA
// without geo-detection. The at/ct params are WG's affiliate attribution —
// they were missing from this link and must not be dropped again.
const OHB_URL =
  "https://tv.apple.com/movie/our-hero-balthazar/umc.cmc.1g1532lsxaqk8su6isibi7n79?at=1000l3cjs&ct=wgpic&itsct=tv_box_link&itscg=30200&mttnsubad=umc.cmc.1g1532lsxaqk8su6isibi7n79";

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
          className="mt-[65vh]"
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
            <h1 className={`font-display text-4xl md:text-6xl tracking-tighter text-white transition-transform duration-700 ${hovered ? "md:scale-105" : ""} md:group-hover:scale-105`}>
              OUR HERO, BALTHAZAR
            </h1>
            {/* Underline - always visible on mobile, hover-reveal on desktop */}
            <div className={`h-[1px] bg-white transition-all duration-700 mt-2 w-full md:w-0 ${hovered ? "md:!w-full" : ""} md:group-hover:w-full`} />
            {/* "WATCH AT HOME" - hidden on mobile, hover-reveal on desktop */}
            <span className={`mt-8 font-mono text-xs tracking-widest transition-opacity duration-500 hidden md:block ${hovered ? "opacity-40" : "opacity-0"} group-hover:opacity-40`}>
              WATCH AT HOME
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <Footer inverted={false} />
      </div>
    </div>
  );
}
