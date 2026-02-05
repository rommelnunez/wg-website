// @ts-nocheck
"use client";

import { motion, AnimatePresence } from "framer-motion";
import ReactPlayer from "react-player";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface LightboxProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
}

export const Lightbox = ({ isOpen, onClose, videoUrl }: LightboxProps) => {
    const [hasWindow, setHasWindow] = useState(false);

    useEffect(() => {
        setHasWindow(true);

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12"
                    onClick={onClose}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[60]"
                    >
                        <X size={32} />
                    </button>

                    <div className="w-full max-w-6xl aspect-video relative shadow-2xl bg-black" onClick={(e) => e.stopPropagation()}>
                        {hasWindow && (
                            // @ts-ignore
                            <ReactPlayer
                                url={videoUrl}
                                width="100%"
                                height="100%"
                                controls
                                playing
                            />
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
