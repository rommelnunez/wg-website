"use client";

import Image from "next/image";
import { getAssetPath } from "@/lib/assets";
import teaserPreview from "../../../public/assets/brand/teaser-preview.jpg";

interface ViewportProps {
    activeRelease: string | null;
}

export function Viewport({ activeRelease }: ViewportProps) {
    const videoPath = getAssetPath("brand/wg-brand-loop.mov");

    return (
        <div className="relative h-full w-full bg-neutral-900 overflow-hidden">
            {/* 1. Base Layer: The Brand Loop (System Idle) */}
            <div className="absolute inset-0 z-0 opacity-80 mix-blend-luminosity">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover grayscale opacity-50"
                >
                    <source src={videoPath} type="video/quicktime" />
                    <source src={videoPath} type="video/mp4" />
                </video>
            </div>

            {/* 2. Release Preview Layer (Hard Cut) */}
            {/* While 'AnimatePresence' is smooth, V4 wants 'Hard Cuts'. Conditional rendering does exactly that. */}
            {activeRelease === 'rel-001' && (
                <div className="absolute inset-0 z-10 bg-black animate-in fade-in duration-75">
                    <Image
                        src={teaserPreview}
                        alt="Our Hero, Balthazar"
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                    {/* Grain/Scanline Overlay */}
                    <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                </div>
            )}

            {/* 3. The "Overlay" UI (Scanlines, Crosshairs) */}
            <div className="absolute inset-0 z-20 pointer-events-none p-8 flex flex-col justify-between">
                {/* Top Corners */}
                <div className="flex justify-between items-start">
                    <div className="w-4 h-4 border-t border-l border-white/50" />
                    <div className="w-4 h-4 border-t border-r border-white/50" />
                </div>

                {/* Center Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="w-[1px] h-full bg-white" />
                    <div className="h-[1px] w-full bg-white" />
                </div>

                {/* Bottom Corners */}
                <div className="flex justify-between items-end">
                    <div className="w-4 h-4 border-b border-l border-white/50" />
                    <div className="w-4 h-4 border-b border-r border-white/50" />
                </div>
            </div>

            {/* Scanline Effect (CSS) */}
            <div className="absolute inset-0 z-30 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />

        </div>
    );
}
