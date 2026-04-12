"use client";

import { PrismSceneLite } from "@/components/redirects/PrismSceneLite";
import { Footer } from "@/components/Footer";
import { MerchSection } from "@/components/MerchSection";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import teaserPreview from "../../../public/assets/brand/teaser-preview.jpg";

const OHB_URL = "/ourherobalthazar";

export default function ShopifyTestPage() {
  // Desktop hover state only - mobile shows preview by default via CSS
  const [hovered, setHovered] = useState(false);

  return (
    <div className="min-h-screen w-screen bg-black text-white">
      {/* Hero Section - Full viewport height */}
      <section className="h-screen w-full relative overflow-hidden flex flex-col items-center justify-center">
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
              {/* "GET TICKETS" - hidden on mobile, hover-reveal on desktop */}
              <span className={`mt-8 font-mono text-xs tracking-widest transition-opacity duration-500 hidden md:block ${hovered ? "opacity-40" : "opacity-0"} group-hover:opacity-40`}>
                GET TICKETS
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Shop</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4V16M10 16L4 10M10 16L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Merch Section */}
      <MerchSection />

      {/* Footer */}
      <Footer inverted={false} />
    </div>
  );
}
