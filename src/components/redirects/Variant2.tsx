"use client";

import { PrismScene } from "@/components/v5/PrismScene";
import Link from "next/link";

export default function Variant2() {
    return (
        <div className="h-screen w-screen bg-black text-white flex flex-col md:flex-row overflow-hidden font-mono">
            {/* Left Column: Data Rail (35%) */}
            <div className="w-full md:w-[35%] h-[40vh] md:h-full relative z-20 border-b md:border-b-0 md:border-r border-white/10">
                <div className="p-8 h-full flex flex-col justify-between">
                    <div>
                        <div className="text-[10px] tracking-[0.3em] opacity-30 mb-8">SYSTEM / REDIRECT</div>
                        <Link 
                            href="https://rommelnunez.github.io/OHB_Film_Website/v3/"
                            className="block group"
                        >
                             <div className="text-xs mb-2 opacity-50 group-hover:opacity-100 transition-opacity">PROJ_001</div>
                             <h2 className="text-2xl tracking-tighter group-hover:translate-x-2 transition-transform duration-500">OUR HERO BALTHAZAR</h2>
                             <div className="mt-4 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">{">> CLICK TO LAUNCH"}</div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Column: Viewport (65%) */}
            <div className="w-full md:w-[65%] h-[60vh] md:h-full relative z-10">
                <PrismScene inverted={false} />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
