"use client";

import { PrismScene } from "@/components/v5/PrismScene";
import { ExpandableButton } from "@/components/ExpandableButton";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import teaserPreview from "../../../public/assets/brand/teaser-preview.jpg";

export default function Variant4() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="h-screen w-screen bg-black text-white relative flex overflow-hidden">
            {/* Split Left: 3D Logo */}
            <div className="w-1/2 h-full relative z-10 border-r border-white/5">
                <PrismScene inverted={false} />
            </div>

            {/* Split Right: Content */}
            <div className="w-1/2 h-full relative z-10 flex flex-col justify-center p-12 md:p-24 overflow-hidden">
                <div 
                    className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${isHovered ? "opacity-20" : "opacity-0"}`}
                >
                    <Image src={teaserPreview} alt="teaser" fill className="object-cover" />
                </div>

                <div className="relative z-20">
                    <div className="font-mono text-[10px] tracking-[0.3em] mb-4 opacity-40 uppercase">Global Premiere 2026</div>
                    <Link 
                        href="https://rommelnunez.github.io/OHB_Film_Website/v3/"
                        className="group block mb-12"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <h1 className="font-display text-5xl md:text-7xl leading-[0.85] tracking-tighter group-hover:tracking-normal transition-all duration-700">
                             OUR HERO,<br />BALTHAZAR
                        </h1>
                    </Link>

                    <div className="flex gap-4">
                        <Link href="https://rommelnunez.github.io/OHB_Film_Website/v3/">
                            <ExpandableButton 
                                icon={<Play className="w-5 h-5 fill-current" />}
                                label="ENTER PROJECT"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
