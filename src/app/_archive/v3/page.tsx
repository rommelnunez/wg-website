"use client";

import { Footer } from "@/components/Footer";
import { Lightbox } from "@/components/Lightbox";
import { ExpandableButton } from "@/components/ExpandableButton";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import teaserPreview from "../../../public/assets/brand/teaser-preview.jpg";
import logoImg from "../../../public/assets/brand/WG LOGO_WHITE.png";
import { getAssetPath } from "@/lib/assets";

export default function V3Home() {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isHoveringTitle, setIsHoveringTitle] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white relative flex flex-col overflow-hidden">
            <Lightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                videoUrl="https://www.youtube.com/watch?v=m1iTy0zJ8dU"
            />

            {/* Backgrounds */}
            <div className="absolute inset-0 z-0">
                {/* Image Background (Hover) - Fades in on hover */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ${isHoveringTitle ? "opacity-60" : "opacity-0"}`}>
                    <Image
                        src={teaserPreview}
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Gradient Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
            </div>

            {/* Large Central WG Logo */}
            <div className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-opacity duration-700 ${isHoveringTitle ? "opacity-0" : "opacity-100"}`}>
                <div className="relative w-[40vw] h-[40vw]">
                    <Image
                        src={logoImg}
                        alt="WG Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            <nav className="relative z-10 p-8 flex justify-between items-center">
                {/* Top Left Logo Removed */}
                <div className="w-20"></div>
                {/* Menu Disabled */}
            </nav>

            <main className="flex-1 relative z-10 flex flex-col justify-end p-8 md:p-20 pb-32">
                <div className="max-w-5xl">
                    <div className="font-mono text-xs tracking-[0.2em] mb-4 opacity-60 pl-1">
                        LATEST RELEASE
                    </div>
                    <Link
                        href="https://rommelnunez.github.io/OHB_Film_Website/v3/"
                        target="_blank"
                        className="group relative block w-fit"
                        onMouseEnter={() => setIsHoveringTitle(true)}
                        onMouseLeave={() => setIsHoveringTitle(false)}
                        onClick={(e) => {
                            if (!isHoveringTitle) {
                                e.preventDefault();
                                setIsHoveringTitle(true);
                            }
                        }}
                    >
                        {/* Smaller Title: text-2xl md:text-4xl (Matching V1) */}
                        <h1 className="font-display text-2xl md:text-4xl leading-[0.85] tracking-tighter mb-8 drop-shadow-2xl mix-blend-screen transition-all duration-700 group-hover:tracking-normal group-hover:opacity-80 relative">
                            OUR HERO,<br />BALTHAZAR
                            <span className="text-xs md:text-base align-top ml-2 relative -top-2 md:-top-3 tracking-widest opacity-100 group-hover:text-red-500 transition-colors duration-500">2026</span>
                        </h1>
                    </Link>

                    <div className="flex flex-row gap-6 items-center">
                        <ExpandableButton
                            icon={<Play className="w-6 h-6 fill-current" />}
                            label="Watch Trailer"
                            onClick={() => setIsLightboxOpen(true)}
                        />
                    </div>
                </div>
            </main>

            <div className="relative z-10">
                <Footer inverted={false} />
            </div>
        </div>
    );
}
