"use client";

import Link from "next/link";
import { PrismScene } from "@/components/v5/PrismScene";

export default function RedirectShowcase() {
  const variants = [
    { id: "1", name: "MINIMALIST", desc: "Clean, bottom-aligned typography with 3D background." },
    { id: "2", name: "DATA RAIL", desc: "V4-inspired sidebar navigation with viewport focus." },
    { id: "3", name: "HOVER REVEAL", desc: "V2-inspired centered title that emerges on interaction." },
    { id: "4", name: "SPLIT SCREEN", desc: "V3-inspired side-by-side layout with trailer-style CTA." },
    { id: "5", name: "INTERACTIVE MONOLITH", desc: "Large background typography with portal-style interaction." },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-20 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20">
          <div className="text-[10px] tracking-[0.4em] opacity-30 mb-4">WG / LABS / REDIRECTS</div>
          <h1 className="text-4xl md:text-6xl font-display tracking-tighter mb-4">OUR HERO BALTHAZAR</h1>
          <p className="text-xs opacity-50 max-w-xl">
            Select a variation below to preview different redirect experiences for the OHB production site. 
            All variants maintain the 3D rotating WG logo.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {variants.map((variant) => (
            <Link 
              key={variant.id}
              href={`/ohbwg/${variant.id}`}
              className="group border border-white/5 p-6 hover:bg-white/5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="text-[10px] opacity-30 group-hover:opacity-100 transition-opacity">VARIANT_00{variant.id}</div>
                <h2 className="text-xl tracking-tighter group-hover:translate-x-1 transition-transform">{variant.name}</h2>
                <p className="text-[10px] opacity-40 mt-1">{variant.desc}</p>
              </div>
              <div className="text-[10px] tracking-widest opacity-20 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {"PREVIEW >>"}
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-40 pt-8 border-t border-white/5 opacity-20 text-[10px] flex justify-between">
           <div>WG WEBSITE V5</div>
           <div>(C) 2026 WORLDWIDE GLOBAL</div>
        </footer>
      </div>

      {/* Background Ambience */}
      <div className="fixed inset-0 z-[-1] opacity-20 pointer-events-none">
          <PrismScene inverted={false} />
      </div>
    </div>
  );
}
