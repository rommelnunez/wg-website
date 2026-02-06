"use client";

import { PrismScene } from "@/components/v5/PrismScene";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-black text-white relative overflow-hidden">

      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <PrismScene />
      </div>

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none p-8 flex flex-col justify-between">
        {/* Empty Header Spacer */}
        <div />

        {/* Center Title - Hidden */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference">
          {/* Title removed/hidden as per previous design direction */}
        </div>

        <div className="pointer-events-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
