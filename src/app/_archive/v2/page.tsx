"use client";

import { Footer } from "@/components/Footer";
import { Lightbox } from "@/components/Lightbox";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import teaserPreview from "../../../public/assets/brand/teaser-preview.jpg";

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
                    onClick={(e) => {
                        if (!isHoveringCenter) {
                            e.preventDefault();
                            setIsHoveringCenter(true);
                        }
                    }}
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
                                    className="absolute inset-0 flex items-center justify-center p-4"
                                >
                                    <motion.div
                                        className="relative w-full h-full flex items-center justify-center"
                                        animate={{ opacity: [1, 0.6, 1] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    >
                                        {/* WG Logo SVG */}
                                        <svg viewBox="0 0 1740 553" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain drop-shadow-2xl">
                                            <path d="M92.2718 8.98177C106.741 7.7515 121.931 8.08558 136.457 8.45367C158.308 9.00743 181.658 10.7296 201.86 19.8345C245.638 39.5655 295.025 125.963 324.401 166.403C331.086 175.606 337.802 185.37 345.664 193.589C351.437 199.623 360.326 207.425 369.256 207.395C389.875 207.326 453.5 110.073 466.671 91.9427C480.599 72.7692 499.084 46.5865 515.527 30.1957C524.223 21.5269 535.141 15.6003 546.983 12.4765C568.102 6.90592 591.79 8.4442 613.513 8.382L677.061 8.31144C702.631 8.35636 736.205 5.69111 760.196 14.6174C792.318 26.5698 859.609 133.372 881.351 163.675C889.023 174.372 896.448 185.991 905.794 195.304C911.045 200.531 918.368 206.515 926.219 206.414C933.364 206.322 940.093 201.883 945.275 197.356C971.758 174.236 1002.85 116.129 1022.79 84.9967C1033.37 68.4904 1044.38 51.6649 1058.08 37.5717C1068.23 27.1271 1078.61 19.1298 1092.88 15.0404C1108.43 10.5811 1127.88 12.7694 1144 12.528L1239.86 11.3551C1344.56 10.0732 1449.26 9.54089 1553.97 9.75835C1588.54 9.95619 1623.31 9.68046 1657.83 11.0377C1670.15 11.9127 1683.79 11.7079 1695.96 13.5179C1737.05 19.6362 1741.61 82.187 1709.89 102.956C1702.87 107.551 1693.95 109.194 1685.85 109.34C1664.57 109.723 1643.32 109.121 1622.08 108.925L1481.65 108.076C1450.52 107.976 1419.4 108.246 1388.28 108.884C1298.31 110.627 1214.04 116.791 1145.24 182.754C1085.04 240.481 1090.69 315.755 1147.73 373.087C1167.59 392.906 1191.22 408.563 1217.21 419.141C1283.9 446.531 1380.48 447.438 1452.47 448.201C1472.75 448.513 1495.44 447.029 1515.51 447.692C1580.54 449.842 1583.63 443.629 1583.5 381.305C1583.43 367.165 1585.93 339.188 1572.55 330.04C1561.3 322.353 1540.66 324.274 1526.81 323.984L1449.23 322.995C1438.8 322.9 1427.26 323.235 1417.02 322.104C1411.18 321.458 1404.29 318.843 1399.71 315.264C1392.04 308.686 1389.39 298.27 1388.67 288.834C1382.88 213.684 1404.43 223.327 1469.75 223.41L1565.16 223.479L1648.3 223.413C1687.61 223.381 1728.05 215.878 1730.4 269.135C1731.14 285.858 1730.6 302.62 1730.59 319.34L1730.62 414.153L1730.66 477.663C1730.72 489.559 1731.74 503.944 1730.24 515.487C1725.16 554.403 1683.63 546.892 1656.53 546.817L1582.66 546.827L1343.92 546.836L1115.47 546.84L1041.21 546.915C1028 546.924 1014.41 547.11 1001.24 546.655C993.346 546.382 985.598 542.147 979.396 537.343C950.993 515.341 924.715 486.069 900.484 459.769C848.993 403.897 800.463 345.658 749.621 289.257C727.909 266.341 707.768 241.22 684.393 219.967C667.155 204.292 655.497 202.509 638.436 218.705C617.377 238.698 600.066 261.327 582.306 284.027C539.374 338.898 500.726 396.935 459.53 453.098C441.33 477.914 423.766 503.219 404.185 526.97C396.401 536.412 385.857 546.323 373.037 547.189C363.556 547.843 353.069 543.763 346.292 537.249C338.478 529.737 330.399 518.302 323.892 509.469C313.501 495.343 303.195 481.154 292.975 466.904C231.554 379.763 171.618 291.585 113.193 202.409C92.0603 170.513 70.6788 138.782 49.0511 107.219C37.0483 89.7231 24.6727 72.0735 12.8501 54.4597C9.56431 48.9316 6.12755 42.2999 5.90835 35.7846C4.92947 6.68943 46.7984 10.1662 66.3243 9.87991C74.9766 9.67646 83.6265 9.37703 92.2718 8.98177Z" fill="white" />
                                        </svg>
                                    </motion.div>
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
                                    className="absolute inset-0 flex items-center justify-center p-4"
                                >
                                    <div className="flex flex-col items-center">
                                        <h1 className="font-display text-4xl md:text-5xl leading-[0.85] tracking-tighter text-center drop-shadow-2xl mix-blend-screen text-white">
                                            OUR HERO,<br />BALTHAZAR
                                        </h1>
                                        {/* Underline Removed as per request */}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Link>
            </main>

            <div className="relative z-10 p-8 flex justify-center items-end">
                {/* Trailer Button Removed */}
                <Footer inverted={false} />
            </div>
        </div>
    );
}
