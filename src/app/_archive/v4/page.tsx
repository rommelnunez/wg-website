"use client";

import { useState } from "react";
import { DataRail } from "@/components/v4/DataRail";
import { Viewport } from "@/components/v4/Viewport";
import { Footer } from "@/components/Footer";

export default function V4Home() {
    const [activeRelease, setActiveRelease] = useState<string | null>(null);

    return (
        <div className="h-screen w-screen bg-black text-white flex flex-col md:flex-row overflow-hidden font-mono">
            {/* Left Column: Data Rail (35%) */}
            <div className="w-full md:w-[35%] h-[40vh] md:h-full relative z-20 border-b md:border-b-0 md:border-r border-white/10">
                <DataRail
                    activeRelease={activeRelease}
                    onHoverRelease={setActiveRelease}
                />
            </div>

            {/* Right Column: Viewport (65%) */}
            <div className="w-full md:w-[65%] h-[60vh] md:h-full relative z-10">
                <Viewport activeRelease={activeRelease} />
            </div>

            {/* Footer Layer (Absolute Bottom) */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-30">
                <Footer inverted={false} />
            </div>
        </div>
    );
}
