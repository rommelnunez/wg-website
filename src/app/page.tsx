"use client";

import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Lightbox } from "@/components/Lightbox";
import { ExpandableButton } from "@/components/ExpandableButton";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Play, Globe } from "lucide-react";
import teaserPreview from "../../public/assets/brand/teaser-preview.jpg";

export default function Home() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col overflow-hidden">
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        videoUrl="https://www.youtube.com/watch?v=m1iTy0zJ8dU"
      />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={teaserPreview}
          alt="Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Gradient Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
      </div>

      <nav className="relative z-10 p-8 flex justify-between items-center">
        <Link href="/">
          <Logo className="w-20 drop-shadow-2xl" />
        </Link>
        {/* Menu Disabled */}
      </nav>

      <main className="flex-1 relative z-10 flex flex-col justify-end p-8 md:p-20 pb-32">
        <div className="max-w-5xl">
          <div className="font-mono text-xs tracking-[0.2em] mb-4 opacity-60 pl-1">
            LATEST RELEASE
          </div>
          <Link
            href="https://rommelnunez.github.io/OHB_Film_Website/v3/"
            target="_blank"
            className="group relative block w-fit"
          >
            <h1 className="font-display text-[15vw] leading-[0.85] tracking-tighter mb-12 drop-shadow-2xl mix-blend-screen transition-all duration-700 group-hover:tracking-normal group-hover:opacity-80 relative">
              OUR HERO,<br />BALTHAZAR
              <span className="text-[3vw] align-top ml-4 relative -top-[4vw] tracking-widest opacity-100 group-hover:text-red-500 transition-colors duration-500">2026</span>
            </h1>
          </Link>

          <div className="flex flex-row gap-6 items-center">
            <ExpandableButton
              icon={<Play className="w-6 h-6 fill-current" />}
              label="Watch Trailer"
              onClick={() => setIsLightboxOpen(true)}
            />
          </div>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
