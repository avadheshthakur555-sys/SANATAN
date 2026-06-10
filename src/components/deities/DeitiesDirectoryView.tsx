"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { DEITIES_DATA } from "@/lib/deities-data";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useSacredSound } from "@/lib/sacred-audio";
import SacredImage from "../ui/SacredImage";
import Breadcrumb from "../ui/Breadcrumb";
import GoldParticleField from "../effects/GoldParticleField";

// Sanskrit Numerals mapping
const SANSKRIT_NUMBERS = ["१", "२", "३", "४", "५", "६", "७", "८", "९", "१०", "११", "१२", "१३"];

const CATEGORIES = [
  { id: "all", label: "ALL MANIFESTATIONS" },
  { id: "trimurti", label: "THE TRIMURTI" },
  { id: "tridevi", label: "THE TRIDEVI" },
  { id: "avatars", label: "AVATARS & HEROES" },
  { id: "guardians", label: "SACRED GUARDIANS" }
];

export default function DeitiesDirectoryView() {
  const currentLang = useLanguageStore((state) => state.language);
  const { playClick, playNavigate } = useSacredSound();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new MutationObserver(() => {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      
      const dark = document.documentElement.classList.contains("dark");
      requestAnimationFrame(() => {
        setIsDarkMode(dark);
      });
      
      return () => observer.disconnect();
    }
  }, []);

  const deitiesList = Object.values(DEITIES_DATA);

  const filteredDeities = deitiesList.filter((deity) => {
    // Category filter
    if (activeCategory === "trimurti") {
      if (!["shiva", "vishnu", "brahma"].includes(deity.slug)) return false;
    } else if (activeCategory === "tridevi") {
      if (!["saraswati", "lakshmi", "parvati", "durga", "kali"].includes(deity.slug)) return false;
    } else if (activeCategory === "avatars") {
      if (!["rama", "krishna"].includes(deity.slug)) return false;
    } else if (activeCategory === "guardians") {
      if (!["ganesha", "kartikeya", "hanuman"].includes(deity.slug)) return false;
    }

    // Search query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchEnglish = deity.nameEnglish.toLowerCase().includes(q);
      const matchSanskrit = deity.nameSanskrit.includes(q);
      const matchRole = deity.role.toLowerCase().includes(q);
      const matchFunction = deity.divineFunction.toLowerCase().includes(q);
      return matchEnglish || matchSanskrit || matchRole || matchFunction;
    }

    return true;
  });

  return (
    <div 
      className="flex flex-col min-h-screen text-[var(--text-primary)] transition-colors duration-500 overflow-x-hidden relative"
      style={{
        background: "radial-gradient(circle at 50% 15%, #20150e 0%, #0d0806 70%, #040201 100%)",
      }}
    >
      <GoldParticleField />

      <Breadcrumb items={[{ label: "Deities" }]} />

      {/* Page Header matching the premium REANIQUE layout */}
      <header className="relative text-center pt-16 pb-8 px-6 overflow-hidden z-10 select-none max-w-5xl mx-auto">
        <span className="font-serif text-[10px] text-[#A5824B] uppercase tracking-[0.25em] font-extrabold block mb-3">
          सनातन दर्शन • SANATAN DARSHAN
        </span>
        <h1 className="text-4xl md:text-6xl text-white font-serif font-black uppercase tracking-[0.12em] drop-shadow-md">
          Sacred Deities Directory
        </h1>
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#A5824B]/60 to-transparent mx-auto mt-6 mb-4" />
        <p className="font-serif italic text-sm text-slate-300 max-w-2xl leading-relaxed mx-auto">
          &ldquo;The absolute consciousness manifests in various divine forms to guide seekers, restore cosmic balance, and reveal universal truths.&rdquo;
        </p>

        {/* Premium Search input scroll */}
        <div className="mt-8 max-w-md mx-auto relative group">
          <input
            type="text"
            placeholder="Search the sacred scrolls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1b120c]/60 border border-[#A5824B]/35 rounded-full py-2.5 pl-11 pr-4 text-xs font-serif text-white placeholder-slate-400 focus:outline-none focus:border-[#A5824B]/80 transition-colors shadow-inner"
          />
          <Search className="w-4 h-4 text-[#A5824B]/60 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#A5824B] transition-colors" />
        </div>

        {/* Dynamic Category Navigation Scroll */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center select-none max-w-4xl mx-auto px-4">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { playClick(); setActiveCategory(cat.id); }}
                className={`px-4 py-2 border text-[9px] font-mono tracking-widest font-black rounded-full cursor-pointer transition-all duration-300
                  ${isActive 
                    ? "bg-gradient-to-r from-[#B8860B] to-[#DAA520] border-[#FFE485] text-black shadow-lg" 
                    : "bg-[#160f0a]/80 border-[#A5824B]/25 text-[#A5824B] hover:text-white hover:bg-[#20150e]/50"}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Exhibition Card Grid */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-6 md:py-10 z-10 relative">
        {filteredDeities.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-serif italic text-slate-400 text-sm">No scrolls found matching the search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredDeities.map((deity, idx) => {
              const sansNumber = SANSKRIT_NUMBERS[deitiesList.findIndex(d => d.slug === deity.slug)];
              
              // We render cards in a Link component to navigate to their premium detail view page
              return (
                <Link 
                  href={`/deities/${deity.slug}`} 
                  key={deity.slug}
                  onClick={() => playNavigate()}
                  className="no-underline block"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.3) }}
                  >
                    {/* Unified Premium Card: Full Bleed Portrait with Gold-Amber Gradient Overlay */}
                    <div className="relative h-[280px] rounded-3xl overflow-hidden border border-[#A5824B]/35 shadow-2xl bg-[#1C120B] hover:scale-[1.015] hover:border-[#FFE485]/60 hover:shadow-[0_15px_30px_rgba(165,130,75,0.25)] transition-all duration-500 group cursor-pointer flex flex-col justify-end p-6 text-left">
                      <SacredImage 
                        src={deity.heroImage} 
                        alt={deity.nameEnglish} 
                        className="absolute inset-0 w-full h-full object-cover opacity-70 sepia-[0.1] contrast-[1.1] group-hover:scale-105 transition-transform duration-700 scale-102" 
                        type="deity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-transparent z-0" />
                      <div className="absolute inset-3 border border-[#FFE485]/20 rounded-2xl pointer-events-none z-10" />
                      
                      <div className="relative z-10 flex flex-col justify-between h-full">
                        <span className="font-serif text-[8px] uppercase tracking-[0.2em] text-[#FFE485]/70 font-black">MANIFESTATION {sansNumber}</span>
                        <div>
                          <span className="font-sanskrit text-lg font-bold text-[#FFE485]">{deity.nameSanskrit}</span>
                          <h3 className="font-serif text-3xl font-black uppercase tracking-wider text-white mt-1 leading-none">{deity.nameEnglish}</h3>
                          <p className="text-[11px] text-[#FAF5EF]/85 font-serif leading-relaxed line-clamp-2 mt-2 max-w-sm">{deity.role}</p>
                          <span className="text-[9px] font-serif italic text-[#FFE485] font-extrabold flex items-center gap-1 mt-3 group-hover:translate-x-1 transition-transform">
                            Explore Folio &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
