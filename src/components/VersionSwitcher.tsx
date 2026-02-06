"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function VersionSwitcher() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "V1" },
        { href: "/v2", label: "V2" },
        { href: "/v3", label: "V3" },
        { href: "/v4", label: "V4" },
        { href: "/v5", label: "V5" },
    ];

    return (
        <div className="fixed top-4 right-4 z-50 flex gap-2 font-mono text-xs mix-blend-difference pointer-events-auto">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1 border border-white/30 rounded-full transition-colors ${pathname === link.href
                        ? "bg-white text-black font-bold"
                        : "text-white/50 hover:text-white hover:border-white"
                        }`}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}
