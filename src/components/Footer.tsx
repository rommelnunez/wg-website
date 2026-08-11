"use client";

import Link from "next/link";

interface FooterProps {
    inverted: boolean;
}

const SHOP_URL = "https://shop.wgpictures.com";

export const Footer = ({ inverted }: FooterProps) => {
    const socials = {
        instagram: "https://instagram.com/wg",
        email: "contact@wgpictures.com",
        linkedin: "https://linkedin.com/company/wg",
    };

    return (
        <footer className={`w-full py-12 px-6 flex justify-between items-end mt-auto z-50 relative pointer-events-auto transition-colors duration-1000`}>
            <div className="flex flex-col gap-2">
                <div className={`flex gap-6 font-mono text-[10px] uppercase tracking-widest transition-colors duration-1000 ${inverted ? "text-black" : "text-white"}`}>
                    <a href={`mailto:${socials.email}`} className={`transition-colors hover:opacity-70 ${inverted ? "hover:text-black/70" : "hover:text-white/70"}`}>
                        {socials.email}
                    </a>
                    <a
                        href={SHOP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors hover:opacity-70 ${inverted ? "hover:text-black/70" : "hover:text-white/70"}`}
                    >
                        Shop
                    </a>
                </div>
            </div>
        </footer>
    );
};
