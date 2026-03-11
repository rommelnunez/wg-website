"use client";

import { PrismScene } from "@/components/v5/PrismScene";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import teaserPreview from "../../../public/assets/brand/teaser-preview.jpg";

export default function Variant3() {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className="h-screen w-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
            {/* Background Image Layer */}
            <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isHovering ? "opacity-40" : "opacity-0"}`}>
                <Image
                    src={teaserPreview}
                    alt="Background"
                    fill
                    className="object-cover scale-110"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* 3D Scene */}
            <div className={`absolute inset-0 z-10 transition-all duration-1000 ${isHovering ? "scale-75 opacity-20 blur-sm" : "scale-100 opacity-100 blur-0"}`}>
                <PrismScene inverted={false} />
            </div>

            {/* Interaction Layer */}
            <Link 
                href="https://rommelnunez.github.io/OHB_Film_Website/v3/"
                className="relative z-20 w-full h-full flex items-center justify-center cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <AnimatePresence>
                    {isHovering && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center"
                        >
                            <h1 className="font-display text-6xl md:text-8xl tracking-tighter text-white mix-blend-difference text-center leading-none">
                                OUR HERO,<br />BALTHAZAR
                            </h1>
                            <span className="mt-8 font-mono text-sm tracking-[0.5em] opacity-60">LAUNCH PRODUCTION</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Link>
        </div>
    );
}
