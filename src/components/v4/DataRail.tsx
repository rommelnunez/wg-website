
import { Footer } from "@/components/Footer";



interface DataRailProps {
    activeRelease: string | null;
    onHoverRelease: (id: string | null) => void;
}

export function DataRail({ activeRelease, onHoverRelease }: DataRailProps) {
    return (
        <div className="h-full w-full flex flex-col p-6 border-r border-white/10 bg-black font-mono text-xs md:text-sm text-white/70 justify-center">
            {/* Release List (The Index) */}
            <div className="flex flex-col justify-center gap-8">

                <div
                    className={`group cursor-pointer transition-all duration-300 ${activeRelease === 'rel-001' ? 'pl-4 text-white' : 'hover:pl-2 hover:text-white'}`}
                    onMouseEnter={() => onHoverRelease('rel-001')}
                    onMouseLeave={() => onHoverRelease(null)}
                >
                    <div className="flex items-baseline gap-4 mb-2">
                        <span className="text-white/30 text-[10px]">001</span>
                        <h2 className="text-2xl md:text-4xl font-display font-bold uppercase leading-none tracking-tighter">
                            {activeRelease === 'rel-001' ? (
                                <ScrambleText text="OUR HERO, BALTHAZAR" scrambleSpeed={10} />
                            ) : (
                                "OUR HERO, BALTHAZAR"
                            )}
                        </h2>
                    </div>

                    {/* Metadata reveals on hover */}
                    <div className={`overflow-hidden transition-all duration-300 ease-out border-l border-white/20 pl-4 space-y-1 ${activeRelease === 'rel-001' ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                        <div className="flex justify-between">
                            <span className="opacity-40">YEAR</span>
                            <span>2026</span>
                        </div>
                        <div className="mt-4">
                            <button className="px-3 py-1 bg-white text-black font-bold text-[10px] hover:bg-green-400 transition-colors uppercase">
                                Visit Site
                            </button>
                        </div>
                    </div>
                </div>

                {/* Placeholder for future releases */}
                <div className="opacity-20 select-none">
                    <div className="flex items-baseline gap-4">
                        <span className="text-[10px]">002</span>
                        <h2 className="text-2xl md:text-4xl font-display font-bold uppercase leading-none tracking-tighter mix-blend-overlay">
                            [REDACTED]
                        </h2>
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-8">
                <Footer />
            </div>
        </div>
    );
}
