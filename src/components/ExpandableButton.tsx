"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface ExpandableButtonProps {
    icon: ReactNode;
    label: string;
    onClick?: () => void;
    href?: string;
}

export const ExpandableButton = ({ icon, label, onClick, href }: ExpandableButtonProps) => {
    const Container = ({ children, className }: { children: ReactNode; className: string }) => {
        if (href) {
            return (
                <Link href={href} target="_blank" className={className}>
                    {children}
                </Link>
            );
        }
        return (
            <button onClick={onClick} className={className}>
                {children}
            </button>
        );
    };

    return (
        <Container className="group relative flex items-center">
            <motion.div
                initial={false}
                className="relative flex items-center bg-white/10 border border-white/30 backdrop-blur-md rounded-full overflow-hidden cursor-pointer transition-colors duration-300 group-hover:bg-white group-hover:text-black h-16"
                animate={{ width: "auto" }}
            >
                <div className="w-16 h-16 flex items-center justify-center shrink-0">
                    {icon}
                </div>

                <div className="overflow-hidden max-w-[0px] group-hover:max-w-[200px] transition-[max-width] duration-500 ease-in-out">
                    <span className="font-display font-bold uppercase tracking-widest whitespace-nowrap pr-8 pl-2">
                        {label}
                    </span>
                </div>
            </motion.div>
        </Container>
    );
};
