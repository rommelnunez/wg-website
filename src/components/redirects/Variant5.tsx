"use client";

import { PrismScene } from "@/components/v5/PrismScene";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Variant5() {
    const [clicked, setClicked] = useState(false);

    return (
        <div className="h-screen w-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none overflow-hidden">
                 <h1 className="text-[30vw] font-display whitespace-nowrap tracking-tighter">BALTHAZAR</h1>
            </div>

            {/* Interactive Logo Container */}
            <motion.div 
                animate={clicked ? { scale: 5, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                className="w-full h-full relative z-10"
            >
                <div className="absolute inset-0">
                    <PrismScene inverted={false} />
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                    <Link 
                        href="https://rommelnunez.github.io/OHB_Film_Website/v3/"
                        className="w-64 h-64 rounded-full cursor-pointer z-20"
                        onClick={(e) => {
                           // e.preventDefault();
                           // setClicked(true);
                           // setTimeout(() => window.location.href = "https://rommelnunez.github.io/OHB_Film_Website/v3/", 1500);
                        }}
                    />
                </div>
            </motion.div>

            {/* Title Overlay */}
            <div className="absolute bottom-16 left-0 w-full flex flex-col items-center z-20 pointer-events-none">
                 <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="font-display text-2xl tracking-widest opacity-40 uppercase"
                 >
                    Interactive Monolith
                 </motion.h2>
                 <div className="mt-4 font-mono text-[10px] tracking-[0.4em] opacity-20 uppercase">Click the logo to enter</div>
            </div>
        </div>
    );
}
