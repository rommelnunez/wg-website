"use client";

import { Footer } from "@/components/Footer";
import { Lightbox } from "@/components/Lightbox";
import { ExpandableButton } from "@/components/ExpandableButton";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import teaserPreview from "../../../public/assets/brand/teaser-preview.jpg";
import logoImg from "../../../public/assets/brand/WG LOGO_WHITE.png";
import { getAssetPath } from "@/lib/assets";

export default function V2Home() {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isHoveringCenter, setIsHoveringCenter] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white relative flex flex-col overflow-hidden">
            <Lightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                videoUrl="https://www.youtube.com/watch?v=m1iTy0zJ8dU"
            />

            {/* Background Interaction */}
            <div className="absolute inset-0 z-0">
                {/* Black Background (Default) is implied by min-h-screen bg-black */}

                {/* Image Background (Hover) - Fades in */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isHoveringCenter ? "opacity-60" : "opacity-0"}`}>
                    <Image
                        src={teaserPreview}
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Gradient Fade for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                </div>
            </div>

            <nav className="relative z-10 p-8 flex justify-between items-center pointer-events-none">
                {/* Top Left Icon Removed */}
                <div className="w-16 h-16 relative overflow-hidden opacity-0"></div>
                {/* Menu Disabled */}
            </nav>

            <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-8">

                {/* Shape Shifter Core */}
                <Link
                    href="https://rommelnunez.github.io/OHB_Film_Website/v3/"
                    target="_blank"
                    className="relative cursor-pointer group"
                    onMouseEnter={() => setIsHoveringCenter(true)}
                    onMouseLeave={() => setIsHoveringCenter(false)}
                >
                    <div className="relative h-[20vw] w-[60vw] flex items-center justify-center">
                        <AnimatePresence mode="popLayout">
                            {!isHoveringCenter ? (
                                <motion.div
                                    key="logo"
                                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        filter: "blur(0px)",
                                        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 1.2,
                                        filter: "blur(20px)",
                                        transition: { duration: 0.4, ease: "easeIn" }
                                    }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={logoImg}
                                            alt="WG Logo"
                                            fill
                                            className="object-contain drop-shadow-2xl"
                                            priority
                                        />
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="title"
                                    initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        filter: "blur(0px)",
                                        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.8,
                                        filter: "blur(10px)",
                                        transition: { duration: 0.4, ease: "easeIn" }
                                    }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <h1 className="font-display text-4xl md:text-5xl leading-[0.85] tracking-tighter text-center drop-shadow-2xl mix-blend-screen text-white">
                                        OUR HERO,<br />BALTHAZAR
                                    </h1>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Link>
            </main>

            <div className="relative z-10 p-8 flex justify-center items-end">
                {/* Trailer Button Removed */}
                <Footer />
            </div>
        </div>
    );
}
