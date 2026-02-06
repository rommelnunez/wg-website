"use client";

import Link from "next/link";

export const Footer = () => {
    const socials = {
        instagram: "https://instagram.com/wg",
        email: "contact@wgpictures.com",
        linkedin: "https://linkedin.com/company/wg",
    };

    return (
        <footer className="w-full py-12 px-6 flex justify-between items-end border-t border-white/10 mt-auto mix-blend-difference z-50 relative pointer-events-auto">
            <div className="flex flex-col gap-2">
                <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest text-white">
                    <a href={`mailto:${socials.email}`} className="hover:text-white/70 transition-colors">
                        EMAIL
                    </a>
                </div>
            </div>
        </footer>
    );
};
