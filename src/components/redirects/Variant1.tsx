"use client";

import { PrismSceneLite } from "./PrismSceneLite";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import teaserPreview from "../../../public/assets/brand/teaser-preview.jpg";

const OHB_URL = "https://ourherobalthazar.com/";

export default function Variant1() {
  const [revealed, setRevealed] = useState(false);

  const handleTap = useCallback((e: React.MouseEvent) => {
    // On mobile (no hover), first tap reveals, second tap navigates
    if (!revealed) {
      e.preventDefault();
      setRevealed(true);
    }
  }, [revealed]);

  return (
    <div className="h-screen w-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center">
      {/* Preview Image Layer */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${revealed ? "opacity-60" : "opacity-0"}`}>
        <Image
          src={teaserPreview}
          alt="Our Hero Balthazar"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 3D Scene Layer — smaller, centered, on top so the logo is interactive */}
      <div className={`absolute left-1/2 top-[5%] -translate-x-1/2 w-[80vw] h-[62vh] md:w-[55vw] md:h-[63vh] z-20 transition-all duration-1000 ${revealed ? "opacity-30 scale-90" : "opacity-100 scale-100"}`}>
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
          {/* Desktop: single link with hover reveal */}
          {/* Mobile: first tap reveals, then show explicit enter button */}
          <Link
            href={OHB_URL}
            className="group flex flex-col items-center pointer-events-auto"
            onMouseEnter={() => setRevealed(true)}
            onMouseLeave={() => setRevealed(false)}
            onClick={handleTap}
          >
            <span className={`font-mono text-[10px] tracking-[0.5em] uppercase mb-4 transition-opacity duration-500 ${revealed ? "opacity-100" : "opacity-40 group-hover:opacity-100"}`}>
              New Release
            </span>
            <h1 className={`font-display text-4xl md:text-6xl tracking-tighter text-white transition-transform duration-700 ${revealed ? "scale-105" : "group-hover:scale-105"}`}>
              OUR HERO, BALTHAZAR
            </h1>
            <div className={`h-[1px] bg-white transition-all duration-700 mt-2 ${revealed ? "w-full" : "w-0 group-hover:w-full"}`} />
            <span className={`mt-8 font-mono text-xs tracking-widest transition-opacity duration-500 hidden md:block ${revealed ? "opacity-40" : "opacity-0 group-hover:opacity-40"}`}>
              ENTER SITE
            </span>
          </Link>

          {/* Mobile enter button — visible after first tap */}
          <div className={`md:hidden flex justify-center mt-8 transition-all duration-700 pointer-events-auto ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            <a
              href={OHB_URL}
              className="font-mono text-xs tracking-[0.4em] uppercase px-8 py-3 hover:opacity-70 active:opacity-50 transition-opacity"
            >
              ENTER SITE
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <Footer inverted={false} />
      </div>
    </div>
  );
}
