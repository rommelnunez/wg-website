"use client";

import { PrismScene } from "@/components/v5/PrismScene";
import { Footer } from "@/components/Footer";
import { DataRail } from "@/components/v4/DataRail"; // Reuse for consistency, or standard overlay?
import { useState } from "react";

export default function V5Home() {
    const [activeRelease, setActiveRelease] = useState<string | null>(null);

    return (
        <div className="h-screen w-screen bg-black text-white relative overflow-hidden">

            {/* 3D Scene Layer */}
            <div className="absolute inset-0 z-0">
                <PrismScene />
            </div>

            {/* UI Overlay Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none p-8 flex flex-col justify-between">
                {/* Simple Header */}
                {/* Simple Header Removed */}
                <div />

                {/* Center Title - only visible on hover? or always? */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference">
                    <h1 className="font-display text-[10vw] leading-none tracking-tighter opacity-0">
                        THE PRISM
                    </h1>
                </div>

                <div className="pointer-events-auto">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
