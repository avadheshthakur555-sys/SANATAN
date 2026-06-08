"use client";

import React, { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import GoldParticleField from "@/components/effects/GoldParticleField";
import { useSacredSound } from "@/lib/sacred-audio";

const AnimatedCount = memo(({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex flex-col items-center px-4 md:px-6">
      <span className="font-heading text-lg md:text-xl font-extrabold text-[var(--accent-saffron)]">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-[10px] md:text-xs text-[var(--text-secondary)] font-semibold uppercase tracking-wider mt-[2px]">
        {label}
      </span>
    </div>
  );
});

AnimatedCount.displayName = "AnimatedCount";

const HeroSection = memo(() => {
  const { playOm } = useSacredSound();

  const handleSearchClick = () => {
    window.dispatchEvent(new CustomEvent("open-search"));
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center hero-cosmic text-text-main overflow-hidden select-none px-6 pt-[80px] pb-12 border-b border-[var(--border-gold)]">
      {/* Background Starfield Particles - exactly 108 gold particles (density="high") */}
      <GoldParticleField enabled={true} density="high" />

      {/* Main Core Container */}
      <div className="max-w-4xl w-full text-center flex flex-col items-center gap-8 z-10">
        
        {/* Glowing OM symbol with 3 pulsing concentric rings - Law 3 */}
        <div className="relative flex items-center justify-center w-56 h-56 mb-4">
          <div className="om-pulse-ring om-pulse-ring-1" />
          <div className="om-pulse-ring om-pulse-ring-2" />
          <div className="om-pulse-ring om-pulse-ring-3" />
          
          <button
            onClick={playOm}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F97316] to-[#D4A017] flex items-center justify-center shadow-[0_0_35px_rgba(249,115,22,0.6)] cursor-pointer border-none outline-none z-10 hover:scale-105 active:scale-95 transition-transform duration-382 floating-idle"
            aria-label="Play Om drone chant"
          >
            <span className="text-white text-4xl font-bold font-sanskrit">ॐ</span>
          </button>
        </div>

        {/* Sanskrit Prayer - Brihadaranyaka Upanishad */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-3 w-full items-center"
        >
          <h1 className="font-sanskrit text-2xl md:text-3xl lg:text-4xl text-text-main tracking-wide leading-relaxed px-4 text-center w-full max-w-3xl select-text block">
            ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥
          </h1>
          <p className="font-serif text-sm md:text-base text-[var(--text-secondary)] italic w-full max-w-2xl mx-auto leading-relaxed px-4 block">
            &ldquo;Lead me from the unreal to the real. Lead me from darkness to light. Lead me from death to immortality.&rdquo;
          </p>
        </motion.div>

        {/* Divider line */}
        <div className="w-[108px] h-[1px] bg-gradient-to-r from-transparent via-[var(--border-gold)] to-transparent my-1" />

        {/* Integrated Stats Row - Dark Glass Base */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-row items-center justify-center divide-x divide-[var(--border-color)] bg-card-bg border border-[var(--border-gold)] py-3.5 px-8 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.04)] max-w-lg mx-auto backdrop-blur-md"
        >
          <AnimatedCount target={4} label="Vedas" suffix="+" />
          <AnimatedCount target={108} label="Upanishads" suffix="+" />
          <AnimatedCount target={18} label="Puranas" />
          <AnimatedCount target={700} label="Gita Verses" />
        </motion.div>

        {/* Primary Interactive Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full max-w-xl px-4 mt-2"
        >
          <div 
            onClick={handleSearchClick}
            className="flex items-center gap-3 bg-card-bg border border-[var(--border-gold)] hover:border-[var(--accent-saffron)] shadow-md dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-full px-5 py-3.5 cursor-pointer transition-all duration-382 group hover:shadow-[0_0_25px_rgba(249,115,22,0.15)]"
          >
            <Search className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-saffron)] transition-colors" />
            <span className="text-sm md:text-base text-[var(--text-secondary)] select-none text-left flex-grow">
              Search scriptures, temples, deities...
            </span>
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-[var(--text-secondary)] bg-section-alt border border-[var(--border-color)] rounded">
              ⌘K
            </kbd>
          </div>
          <span className="text-[10px] text-[var(--text-secondary)] tracking-wider block mt-2.5 uppercase font-medium">
            Press Cmd+K / Ctrl+K to search anywhere
          </span>
        </motion.div>

      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
