"use client";

import Link from "next/link";
// import { useTina } from "tinacms/dist/react"; // We'll enable this when types are ready
import { Instagram, Mail, Linkedin } from "lucide-react";

export const Footer = () => {
    // In a real implementation, we would fetch the global content here or pass it as props
    // For now, we'll hardcode based on the spec/content we created
    const socials = {
        instagram: "https://instagram.com/wg",
        email: "contact@wg.com",
        linkedin: "https://linkedin.com/company/wg",
    };

    return (
        <footer className="w-full py-12 px-6 flex justify-between items-end border-t border-white/10 mt-auto mix-blend-difference z-50 relative pointer-events-auto">
            <div className="flex flex-col gap-2">
                <h2 className="font-display uppercase text-sm tracking-widest opacity-50">Contact</h2>
                <div className="flex gap-6">
                    <Link href={socials.instagram} target="_blank" className="hover:opacity-50 transition-opacity">
                        <Instagram size={20} />
                    </Link>
                    <a href={`mailto:${socials.email}`} className="hover:opacity-50 transition-opacity">
                        <Mail size={20} />
                    </a>
                    <Link href={socials.linkedin} target="_blank" className="hover:opacity-50 transition-opacity">
                        <Linkedin size={20} />
                    </Link>
                </div>
            </div>
            <div className="text-[10px] uppercase opacity-30 font-display">
                © {new Date().getFullYear()} WG
            </div>
        </footer>
    );
};
