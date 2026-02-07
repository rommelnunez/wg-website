"use client";

import { PrismScene } from "@/components/v5/PrismScene";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";

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
            className="p-2 rounded-full hover:bg-current/10 transition-colors duration-300"
            title={inverted ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {inverted ? (
              <Sun className="w-5 h-5 text-black" />
            ) : (
              <Moon className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Center Title - Hidden */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference">
          {/* Title removed/hidden as per previous design direction */}
        </div>

        <div className="pointer-events-auto mix-blend-difference">
          <Footer inverted={inverted} />
        </div>
      </div>
    </div>
  );
}
