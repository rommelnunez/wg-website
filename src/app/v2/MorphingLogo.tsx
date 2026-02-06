"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { interpolate } from "flubber";
import { useMemo, useEffect, useState } from "react";
import { LOGO_PATH, TITLE_PATH } from "./paths";

function MorphingLogo({ isHovering }: { isHovering: boolean }) {
    // Spring Animation for smooth interpolation (0 -> 1)
    const progress = useSpring(isHovering ? 1 : 0, {
        stiffness: 120, // Lower stiffness for slower morph
        damping: 18,    // Higher damping for less bounce
        mass: 0.8,
    });

    // Explicitly update spring target when prop changes
    useEffect(() => {
        progress.set(isHovering ? 1 : 0);
    }, [isHovering, progress]);

    // Create the interpolator
    const interpolator = useMemo(() => interpolate(LOGO_PATH, TITLE_PATH, { maxSegmentLength: 5 }), []);

    // Transform spring value 0-1 to path string
    const pathD = useTransform(progress, (value) => {
        // value can slightly exceed 0-1 due to spring bounce, clamp or let it slide? 
        // flubber handles interpolation 0-1.
        return interpolator(value);
    });

    // Pulse Animation for the Logo state (when not hovering)
    // We can apply this to the parent SVG or path.
    // If hovering, we might want to stop pulsing?
    // Let's toggle Opacity pulse based on !isHovering

    // Optional: Interpolate color if desired. 
    // Logo is white, Title is white (or user's red?).
    // SVG default fill is white.

    return (
        <motion.div
            className="w-full h-full relative"
            animate={!isHovering ? { opacity: [1, 0.6, 1] } : { opacity: 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
            <svg
                viewBox="0 0 1740 603"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-contain drop-shadow-2xl"
                preserveAspectRatio="xMidYMid meet"
            >
                <motion.path
                    d={pathD}
                    fill="white"
                />
            </svg>
        </motion.div>
    );
}

export default MorphingLogo;
