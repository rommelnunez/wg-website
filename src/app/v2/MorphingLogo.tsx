"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { interpolate } from "flubber";
import { useMemo, useEffect } from "react";
import { LOGO_PATH, TITLE_PATH } from "./paths";

function MorphingLogo({ isHovering }: { isHovering: boolean }) {
    // Spring Animation for smooth interpolation (0 -> 1)
    const progress = useSpring(isHovering ? 1 : 0, {
        stiffness: 40,  // Lower stiffness = slower, more liquid
        damping: 12,    // Balanced damping
        mass: 1.2,      // Heavier mass = more momentum feel
    });

    // Explicitly update spring target when prop changes
    useEffect(() => {
        progress.set(isHovering ? 1 : 0);
    }, [isHovering, progress]);

    // Create the interpolator
    // maxSegmentLength: Lower = more points = smoother curve morph, but more perf cost. 2 is good.
    const interpolator = useMemo(() => interpolate(LOGO_PATH, TITLE_PATH, { maxSegmentLength: 2 }), []);

    // Transform spring value 0-1 to path string
    const pathD = useTransform(progress, (value) => interpolator(value));

    // Color: White -> Red (#FF3600)
    const fillColor = useTransform(progress, [0, 1], ["#FFFFFF", "#FF3600"]);

    // Centering: 
    // Logo Width: ~1740 (ViewBox width)
    // Title Width: ~1349
    // Difference: 391. Center offset: 195.5
    // We animate a group <g> transform x from 0 to 195.5
    const xOffset = useTransform(progress, [0, 1], [0, 195.5]);

    // Filter: Blur + Glow
    // Peak blur at 0.5 progress to hide the "messy" middle state of the morph.
    const filterStyle = useTransform(progress, [0, 0.5, 1], [
        "blur(0px) drop-shadow(0px 0px 0px rgba(255,54,0,0))",
        "blur(6px) drop-shadow(0px 0px 20px rgba(255,54,0,0.5))",
        "blur(0px) drop-shadow(0px 0px 15px rgba(255,54,0,0.6))"
    ]);

    return (
        <motion.div
            className="w-full h-full relative"
            style={{ filter: filterStyle }}
        >
            {/* Breathe Animation for the container (simulating the Pulse) */}
            <motion.div
                className="w-full h-full"
                animate={!isHovering ? { scale: [1, 1.02, 1], opacity: [1, 0.8, 1] } : { scale: 1, opacity: 1 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg
                    viewBox="0 0 1740 603"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-contain"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <motion.g style={{ x: xOffset }}>
                        <motion.path
                            d={pathD}
                            fill={fillColor}
                        />
                    </motion.g>
                </svg>
            </motion.div>
        </motion.div>
    );
}

export default MorphingLogo;
