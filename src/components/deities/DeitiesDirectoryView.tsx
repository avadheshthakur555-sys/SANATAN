"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { DEITIES_DATA, DeityDetail } from "@/lib/deities-data";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useSacredSound } from "@/lib/sacred-audio";
import SacredImage from "../ui/SacredImage";
import Breadcrumb from "../ui/Breadcrumb";
import GoldParticleField from "../effects/GoldParticleField";

// Sanskrit Numerals mapping
const SANSKRIT_NUMBERS = ["१", "२", "३", "४", "५", "६", "७", "८", "९", "१०", "११", "१२", "१३"];

export default function DeitiesDirectoryView() {
  const currentLang = useLanguageStore((state) => state.language);
  const { playClick } = useSacredSound();
  const [activeSlug, setActiveSlug] = useState<string>("shiva");
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
  const activeDeity = DEITIES_DATA[activeSlug] || deitiesList[0];

  const handleDeityHover = (slug: string) => {
    if (slug !== activeSlug) {
      setActiveSlug(slug);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark bg-[#030107]" : "bg-[#FAF7F2]"} text-[var(--text-primary)] transition-colors duration-500 overflow-x-hidden relative`}>
      <GoldParticleField />

      {/* Cosmic aura behind the active deity */}
      <div 
        className="absolute right-0 top-0 w-[50vw] h-[100vh] opacity-10 pointer-events-none z-0 transition-all duration-1000"
        style={{ background: activeDeity.bgGradient }}
      />

      <Breadcrumb items={[{ label: "Deities" }]} />

      {/* Page Header */}
      <header className="relative text-center py-12 px-6 border-b border-[var(--border-gold)]/20 overflow-hidden z-10 select-none">
        <span className="font-sanskrit text-4xl text-[#FFD700] font-bold tracking-widest drop-shadow-md mb-2 block">
          देव देवियाँ
        </span>
        <h1 className="text-3xl md:text-5xl text-[var(--text-primary)] font-serif font-bold uppercase tracking-wider">
          Sacred Deities Directory
        </h1>
        <p className="font-body text-xs md:text-sm text-[var(--text-secondary)] max-w-2xl mt-4 leading-relaxed mx-auto">
          Explore the divine manifestations and profiles of ultimate consciousness.
          Each entry acts as a portal into their names, weapons, temples, and stories.
        </p>
      </header>

      {/* Main Exhibition Layout */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 md:py-12 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 items-start">
          
          {/* LEFT COLUMN: The Ancient Manuscript Index */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold pl-2 block">
              Manuscript Folios (१ - १३)
            </span>
            
            <div className="flex flex-col border border-[var(--border-gold)]/35 rounded-xl overflow-hidden divide-y divide-[var(--border-gold)]/20 shadow-md">
              {deitiesList.map((deity, idx) => {
                const isActive = activeSlug === deity.slug;
                return (
                  <div
                    key={deity.slug}
                    onMouseEnter={() => handleDeityHover(deity.slug)}
                    onClick={() => playClick()}
                    className={`flex items-center gap-4 p-4 md:p-6 transition-all duration-300 relative select-text
                      ${isActive 
                        ? (isDarkMode ? "bg-white/5" : "bg-[#F3EBE0]") 
                        : "hover:bg-white/2 dark:hover:bg-white/1"}`}
                  >
                    {/* Active accent vertical bar */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent-gold)]" />
                    )}

                    {/* Sanskrit Number */}
                    <div className="font-sanskrit text-lg md:text-xl font-bold text-[var(--accent-gold)] w-8 text-center shrink-0">
                      {SANSKRIT_NUMBERS[idx]}
                    </div>

                    {/* Emblem Avatar (Small icon circle) */}
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[var(--border-gold)]/30 bg-[#161218]/90 flex items-center justify-center shrink-0">
                      <SacredImage 
                        src={deity.heroImage} 
                        alt={deity.nameEnglish} 
                        className="w-full h-full object-cover"
                        fallbackText={deity.nameSanskrit}
                        type="deity"
                      />
                    </div>

                    {/* Core Info */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <span className="font-sanskrit text-lg font-bold text-[var(--text-sanskrit)] dark:text-[var(--accent-gold)]">
                          {deity.nameSanskrit}
                        </span>
                        <h3 className="font-serif text-sm md:text-base font-extrabold text-[var(--text-primary)]">
                          {deity.nameEnglish}
                        </h3>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mt-1 line-clamp-1">
                        {deity.role}
                      </p>
                    </div>

                    {/* Consort info & explore arrow */}
                    <div className="text-right shrink-0 hidden sm:flex flex-col items-end gap-1 select-none">
                      <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)]">Consort</span>
                      <span className="text-[10px] font-bold text-[var(--text-primary)]">{deity.consort}</span>
                    </div>

                    <Link 
                      href={`/deities/${deity.slug}`}
                      className="p-2 border border-[var(--border-gold)]/20 hover:border-[var(--accent-gold)] rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <ChevronRight className="w-4 h-4 text-[var(--accent-gold)]" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: The Sticky Live-Glowing Showcase */}
          <div className="sticky top-24 hidden lg:flex flex-col gap-5 select-none">
            <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold pl-2 block">
              Digital Altar Darshan
            </span>

            <div className={`border border-[var(--border-gold)]/35 rounded-xl p-6 flex flex-col items-center justify-between text-center min-h-[460px] shadow-2xl relative overflow-hidden backdrop-blur-md
              ${isDarkMode ? "bg-white/5" : "bg-[#FAF7F2]/90"}`}>
              
              {/* Concentric rings behind showcase */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 z-0 pointer-events-none opacity-40">
                <div className="concentric-circle concentric-circle-1" />
                <div className="concentric-circle concentric-circle-2" />
                <div className="concentric-circle concentric-circle-3" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDeity.slug}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-4 w-full z-10"
                >
                  {/* Large showcase image */}
                  <div className="w-44 h-44 rounded-full overflow-hidden border-2 border-[var(--border-gold)]/40 bg-[#140e1a]/95 flex items-center justify-center shadow-xl group">
                    <SacredImage 
                      src={activeDeity.heroImage} 
                      alt={activeDeity.nameEnglish} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fallbackText={activeDeity.nameSanskrit}
                      type="deity"
                    />
                  </div>

                  {/* Text details */}
                  <div className="mt-2 flex flex-col items-center gap-1">
                    <span className="font-sanskrit text-3xl text-[#FFD700] font-bold tracking-widest drop-shadow-[0_0_8px_rgba(212,160,23,0.3)]">
                      {activeDeity.nameSanskrit}
                    </span>
                    <h2 className="text-xl font-serif font-bold text-[var(--text-primary)]">
                      {activeDeity.nameEnglish}
                    </h2>
                    <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold">
                      {activeDeity.divineFunction}
                    </span>
                  </div>

                  {/* Primary Mantra */}
                  <div className="w-full bg-white/3 dark:bg-black/20 p-3 rounded border border-[var(--border-gold)]/10 text-center select-text">
                    <span className="text-[8px] uppercase tracking-wider text-[var(--text-secondary)] font-mono block mb-1">
                      Mantra
                    </span>
                    <p className="font-sanskrit text-base text-[var(--text-sanskrit)] dark:text-[var(--accent-gold)] font-bold">
                      {activeDeity.mantras[0].text}
                    </p>
                    <p className="text-[10px] text-[var(--text-secondary)] mt-1 truncate">
                      {activeDeity.mantras[0].translation}
                    </p>
                  </div>

                  {/* Description summary */}
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed select-text line-clamp-3">
                    {activeDeity.originStory}
                  </p>

                  <Link href={`/deities/${activeDeity.slug}`} className="no-underline w-full mt-4">
                    <button className="w-full py-2.5 bg-gradient-to-r from-[#D4A017] to-[#B8860B] hover:from-[#FFD700] hover:to-[#D4A017] text-black font-extrabold text-[11px] uppercase tracking-wider rounded-lg shadow hover:shadow-[#D4A01720] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5">
                      <span>Explore Premium Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// Simple chevron component
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
