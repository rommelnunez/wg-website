"use client";

import { PrismScene } from "@/components/v5/PrismScene";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export default function Home() {
  const [inverted, setInverted] = useState(false);

  return (
    <div className={`h-screen w-screen relative overflow-hidden transition-colors duration-1000 ${inverted ? "bg-white text-black" : "bg-black text-white"}`}>

      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <PrismScene inverted={inverted} />
      </div>

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none p-8 flex flex-col justify-between">

        {/* Header / Top Right Toggle */}
        <div className="w-full flex justify-end pointer-events-auto">
          <button
            onClick={() => setInverted(!inverted)}
            className="w-4 h-4 rounded-full border border-current hover:bg-current hover:text-inherit transition-all duration-300"
            title={inverted ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {/* Simple circle toggle */}
          </button>
        </div>

        {/* Center Title - Hidden */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference">
          {/* Title removed/hidden as per previous design direction */}
        </div>

        <div className="pointer-events-auto mix-blend-difference">
          <Footer />
        </div>
      </div>
    </div>
  );
}
