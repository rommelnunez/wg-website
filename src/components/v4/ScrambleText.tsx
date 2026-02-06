"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

interface ScrambleTextProps {
    text: string;
    className?: string;
    scrambleSpeed?: number;
    revealSpeed?: number;
    trigger?: boolean; // Toggle to restart effect
}

export function ScrambleText({
    text,
    className = "",
    scrambleSpeed = 30,
    revealSpeed = 50,
    trigger = true
}: ScrambleTextProps) {
    const [displayedText, setDisplayedText] = useState(text);

    useEffect(() => {
        if (!trigger) return;

        let interval: NodeJS.Timeout;
        let iteration = 0;

        // Initial random duration before revealing
        const startDelay = Math.random() * 200;

        const runScramble = () => {
            interval = setInterval(() => {
                setDisplayedText((current) =>
                    text
                        .split("")
                        .map((char, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3; // Slow down the reveal
            }, scrambleSpeed);
        };

        const timeout = setTimeout(runScramble, startDelay);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [text, trigger, scrambleSpeed]);

    return <span className={className}>{displayedText}</span>;
}
