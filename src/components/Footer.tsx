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
                <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest text-white/50">
                    <Link href={socials.instagram} target="_blank" className="hover:text-white transition-colors">
                        Instagram
                    </Link>
                    <a href={`mailto:${socials.email}`} className="hover:text-white transition-colors">
                        Email
                    </a>
                    <Link href={socials.linkedin} target="_blank" className="hover:text-white transition-colors">
                        LinkedIn
                    </Link>
                </div>
            </div>
        </footer>
    );
};
