"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  MapPin,
  Calendar,
  Compass,
  Layers,
  ArrowRight,
  Maximize2,
  X,
  Play,
  Pause,
  ChevronRight,
  Info
} from "lucide-react";

import { ENHANCED_DEITIES_DATA, EnhancedDeity, TimelineStage, GalleryItem, GeographyItem, ScriptureRelation, FestivalItem, EnhancedMantra } from "@/lib/deities-enhanced-data";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useSacredSound } from "@/lib/sacred-audio";

import DiyaFlame from "../ui/DiyaFlame";
import TempleDoor from "../ui/TempleDoor";
import GoldParticleField from "../effects/GoldParticleField";
import SacredImage from "../ui/SacredImage";
import RelatedContentDiscovery from "../layout/RelatedContentDiscovery";
import Breadcrumb from "../ui/Breadcrumb";
import NextReading, { NextReadItem } from "../ui/NextReading";

interface DeityDetailViewProps {
  slug: string;
}

// Custom Jagged Torn-Paper Separator for Section 3
const TornPaperDivider = ({ position = "top", color = "var(--bg-primary)" }: { position?: "top" | "bottom"; color?: string }) => {
  const isTop = position === "top";
  return (
    <div className={`w-full overflow-hidden leading-[0] ${isTop ? "-mb-px" : "-mt-px"} relative z-30`} style={{ color }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[25px] md:h-[45px]"
        style={{ transform: isTop ? "rotate(180deg)" : "none" }}
      >
        <path
          d="M0,0 L1200,0 L1200,80 L1170,75 L1140,85 L1110,65 L1080,78 L1050,70 L1020,83 L990,65 L960,85 L930,72 L900,80 L870,68 L840,88 L810,75 L780,82 L750,70 L720,90 L690,73 L660,85 L630,68 L600,82 L570,75 L540,85 L510,68 L480,80 L450,72 L420,83 L390,70 L360,82 L330,65 L300,80 L270,72 L240,85 L210,68 L180,80 L150,73 L120,82 L90,68 L60,85 L30,70 L0,78 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default function DeityDetailView({ slug }: DeityDetailViewProps) {
  const router = useRouter();
  const deity = ENHANCED_DEITIES_DATA[slug];
  const currentLang = useLanguageStore((state) => state.language);
  const { playClick, playNavigate } = useSacredSound();

  // Audio Context & Synth States
  const [ambientActive, setAmbientActive] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);
  const [aartiActive, setAartiActive] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const aartiIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // UI Interactive States
  const [activeIdentityCard, setActiveIdentityCard] = useState<number | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [activeScriptureNode, setActiveScriptureNode] = useState<string>("Puranas");
  const [relationshipView, setRelationshipView] = useState<"family" | "avatars" | "gurus">("family");
  const [hoveredMantraWord, setHoveredMantraWord] = useState<string | null>(null);
  const [activeTimelineStage, setActiveTimelineStage] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Watch dark mode changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new MutationObserver(() => {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      requestAnimationFrame(() => {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
      });
      return () => observer.disconnect();
    }
  }, []);

  // Cleanup sounds on unmount
  useEffect(() => {
    return () => {
      stopAmbientDrone();
      stopAartiLoop();
    };
  }, []);

  if (!deity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-[var(--bg-primary)]">
        <h2 className="text-2xl font-serif font-bold text-red-500 mb-2">Immersive Journey Not Found</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">The requested deity path could not be loaded.</p>
        <button 
          onClick={() => router.push("/deities")}
          className="px-5 py-2 border border-[var(--border-gold)] text-[var(--accent-gold)] rounded cursor-pointer hover:bg-[var(--border-gold)]/10"
        >
          Return to Temple Directory
        </button>
      </div>
    );
  }

  // Synthesize Temple Bell Chime
  function triggerBellSound() {
    if (typeof window === "undefined") return;
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 500);

    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Bell metallic resonance frequencies
      const frequencies = [261.63, 523.25, 659.25, 783.99, 1046.50, 1318.51];
      const gains = [0.8, 1.0, 0.65, 0.45, 0.25, 0.1];
      const decays = [2.0, 1.6, 1.2, 0.8, 0.5, 0.2];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.3, now);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
      masterGain.connect(ctx.destination);

      frequencies.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(f, now);

        gainNode.gain.setValueAtTime(gains[idx], now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + decays[idx]);

        osc.connect(gainNode);
        gainNode.connect(masterGain);

        osc.start(now);
        osc.stop(now + decays[idx] + 0.1);
      });
    } catch (e) {
      console.warn("Audio Context blocked by browser safety policy.");
    }
  }

  // Aarti Bell Loop (Ringing every 1.2 seconds)
  function startAartiLoop() {
    triggerBellSound();
    aartiIntervalRef.current = setInterval(() => {
      triggerBellSound();
    }, 1200);
  }

  function stopAartiLoop() {
    if (aartiIntervalRef.current) {
      clearInterval(aartiIntervalRef.current);
      aartiIntervalRef.current = null;
    }
  }

  function toggleAarti() {
    playClick();
    if (aartiActive) {
      stopAartiLoop();
      setAartiActive(false);
    } else {
      startAartiLoop();
      setAartiActive(true);
    }
  }

  // Synthesize Meditative Tanpura/AUM Drone
  function startAmbientDrone() {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
      const now = ctx.currentTime;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.15, now + 1.5);
      masterGain.connect(ctx.destination);
      droneGainRef.current = masterGain;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(180, now);
      filter.connect(masterGain);

      // Root cosmic oscillator
      const osc1 = ctx.createOscillator();
      osc1.type = deity.mantraAmbience.type;
      osc1.frequency.setValueAtTime(deity.mantraAmbience.frequency, now);
      osc1.connect(filter);
      osc1.start(now);
      osc1Ref.current = osc1;

      // Harmony oscillator (slightly detuned for organic beating)
      const osc2 = ctx.createOscillator();
      osc2.type = deity.mantraAmbience.type;
      osc2.frequency.setValueAtTime(deity.mantraAmbience.frequency * 1.5 + 0.3, now); // Fifth chord detune
      osc2.connect(filter);
      osc2.start(now);
      osc2Ref.current = osc2;

    } catch (e) {
      console.warn("Drone audio could not start.");
    }
  }

  function stopAmbientDrone() {
    const gain = droneGainRef.current;
    const ctx = audioCtxRef.current;
    if (ctx && gain) {
      const now = ctx.currentTime;
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.linearRampToValueAtTime(0, now + 0.6);
        setTimeout(() => {
          try {
            osc1Ref.current?.stop();
            osc2Ref.current?.stop();
            ctx.close();
          } catch (e) {}
        }, 700);
      } catch (e) {}
    }
    audioCtxRef.current = null;
    droneGainRef.current = null;
    osc1Ref.current = null;
    osc2Ref.current = null;
  }

  function toggleAmbient() {
    playClick();
    if (ambientActive) {
      stopAmbientDrone();
      setAmbientActive(false);
    } else {
      startAmbientDrone();
      setAmbientActive(true);
    }
  }

  // Build Next Reading links based on current deity
  const getNextReadItems = (): NextReadItem[] => {
    const items: NextReadItem[] = [];
    deity.relatedDeitySlugs.forEach((relSlug) => {
      const relDeity = ENHANCED_DEITIES_DATA[relSlug];
      if (relDeity) {
        items.push({
          category: "Divine Journeys",
          titleEnglish: relDeity.nameEnglish,
          titleSanskrit: relDeity.nameSanskrit,
          description: relDeity.role,
          href: `/deities/${relSlug}`
        });
      }
    });
    return items.slice(0, 2);
  };

  // Dynamic Scripture Relation Details
  const activeScripture = deity.scriptures.find(s => s.category === activeScriptureNode) || deity.scriptures[0];

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark bg-[#030107]" : "bg-[#FAF7F2]"} text-[var(--text-primary)] transition-colors duration-500 overflow-x-hidden relative`}>
      <TempleDoor />

      {/* Atmospheric backgrounds */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <GoldParticleField />
      </div>

      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none z-0 transition-all duration-1000"
        style={{ background: deity.bgGradient }}
      />

      <div className="relative z-20">
        <Breadcrumb items={[{ label: "Deities", href: "/deities" }, { label: deity.nameEnglish }]} />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 1: DIVINE HERO (Cinematic Fullscreen Entrance)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-between items-center px-4 py-8 overflow-hidden z-10 border-b border-[var(--border-gold)]/20">
        
        {/* Glowing Mandala & Radiance Rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[480px] md:h-[480px] z-0 pointer-events-none opacity-40 dark:opacity-60">
          <div className="concentric-circle concentric-circle-1" />
          <div className="concentric-circle concentric-circle-2" />
          <div className="concentric-circle concentric-circle-3" />
          <div className="absolute inset-16 rounded-full bg-gradient-to-tr from-[var(--accent-gold)]/10 to-[#FFD700]/10 filter blur-2xl" />
          {ambientActive && (
            <>
              <div className="om-pulse-ring om-pulse-ring-1" />
              <div className="om-pulse-ring om-pulse-ring-2" />
            </>
          )}
        </div>

        {/* Header Controls */}
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center z-10 mb-4 px-2">
          <button 
            onClick={() => { playNavigate(); router.push("/deities"); }}
            className="px-4 py-1.5 border border-[var(--border-gold)]/40 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hover:bg-[var(--border-gold)]/10 text-[10px] uppercase tracking-wider font-semibold rounded-full cursor-pointer transition-all"
          >
            ← Directory
          </button>

          {/* Sound Ambience Controller */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAmbient}
              className={`p-2 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest px-3.5
                ${ambientActive 
                  ? "bg-[#D4A017] border-[#FFE485] text-black shadow-lg" 
                  : "bg-white/5 border-[var(--border-gold)]/40 text-[var(--accent-gold)] hover:bg-white/10"}`}
              title="Toggle Vedic Tanpura Ambient Drone"
            >
              {ambientActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>Drone</span>
            </button>
            
            <button
              onClick={toggleAarti}
              className={`p-2 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest px-3.5
                ${aartiActive 
                  ? "bg-[#FF5500] border-[#FF8800] text-white shadow-lg animate-pulse" 
                  : "bg-white/5 border-[var(--border-gold)]/40 text-[var(--accent-gold)] hover:bg-white/10"}`}
              title="Toggle Temple Bell आरती"
            >
              🔥 <span>Aarti Bells</span>
            </button>
          </div>
        </div>

        {/* Central Divine Masterpiece */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto z-10 flex-grow my-auto">
          {/* Main Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={triggerBellSound}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-3 border-[var(--accent-gold)] bg-[#100b16]/75 shadow-2xl flex items-center justify-center shrink-0 z-10 group cursor-pointer hover:border-[var(--accent-gold)] transition-colors duration-500 floating-idle mb-6"
          >
            <SacredImage 
              src={deity.heroImage} 
              alt={deity.nameEnglish} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              fallbackText={deity.nameSanskrit}
              type="deity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 border border-white/5 rounded-full pointer-events-none group-hover:shadow-[inset_0_0_25px_rgba(255,215,0,0.35)] transition-shadow duration-500" />
            
            {/* Visual sound hint */}
            <div className="absolute bottom-4 flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider text-[#FFD700] border border-[#FFD700]/30 opacity-0 group-hover:opacity-100 transition-opacity">
              🔔 Ring Bell
            </div>
          </motion.div>

          {/* Titles & Sacred Name Plate */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <span className="font-sanskrit text-4xl md:text-5xl text-[#FFD700] font-bold tracking-widest drop-shadow-[0_4px_12px_rgba(212,160,23,0.5)]">
              {deity.nameSanskrit}
            </span>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl text-[var(--text-primary)] font-serif font-extrabold uppercase tracking-widest pl-2">
                {deity.nameEnglish}
              </h1>
              <span className="hidden md:inline text-[var(--border-gold)] font-bold text-lg">•</span>
              <h2 className="text-xl md:text-2xl text-[var(--accent-saffron)] font-serif font-medium">
                {deity.nameHindi}
              </h2>
            </div>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] tracking-wide font-medium italic max-w-xl px-4 mt-2">
              &ldquo;{deity.meaning}&rdquo;
            </p>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent mt-3" />
            <span className="text-[10px] md:text-[11px] text-[var(--accent-gold)] font-mono uppercase tracking-widest font-bold mt-1 max-w-2xl px-4">
              {deity.role}
            </span>
          </div>
        </div>

        {/* Section 1 Footer (Interactive Diya and Help) */}
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center z-10 mt-6 select-none border-t border-[var(--border-gold)]/10 pt-4 px-4 text-center">
          <div className="flex flex-col items-center gap-1.5 cursor-pointer" onClick={triggerBellSound}>
            <DiyaFlame intensity={aartiActive ? "aarti" : "normal"} />
            <span className="text-[9px] uppercase tracking-widest text-[var(--text-secondary)] font-mono font-bold mt-2">
              Inner Sanctum Altar
            </span>
            <p className="text-[9px] text-[var(--text-secondary)] max-w-xs mt-0.5">
              Click the bells, start the drone, or tap the flame to invite cosmic blessings.
            </p>
          </div>
          <div className="mt-4 animate-bounce text-[var(--accent-gold)] text-xs font-mono">
            Scroll Down &darr;
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 2: DIVINE IDENTITY (Interactive Cards Grid)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-16 px-4 md:px-8 max-w-7xl mx-auto z-10">
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block mb-1">
            Visual Anatomy
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
            Divine Attributes & Symbolism
          </h2>
          <div className="h-[2px] w-20 bg-[var(--accent-gold)] mt-2" />
          <p className="text-xs text-[var(--text-secondary)] max-w-md mt-2">
            Click any card to unveil the cosmic significance behind their items, abodes, weapons, and sacred forces.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Titles & Epithets", val: deity.identity.titles.join(", "), icon: "👑" },
            { label: "Sacred Weapons", val: deity.identity.weapons.join(", "), icon: "⚔️" },
            { label: "Sacred Symbols", val: deity.identity.symbols.join(", "), icon: "🔱" },
            { label: "Divine Mount", val: deity.identity.mount, icon: "🐾" },
            { label: "Consort / Aspect", val: deity.identity.consort, icon: "🪷" },
            { label: "Cosmic Loka", val: deity.identity.loka, icon: "🌌" },
            { label: "Sacred Colors", val: deity.identity.sacredColors.join(", "), icon: "🎨" },
            { label: "Sacred Numbers", val: deity.identity.sacredNumbers.join(", "), icon: "🔢" },
            { label: "Sacred Trees", val: deity.identity.sacredTrees.join(", "), icon: "🌳" },
            { label: "Sacred Animals", val: deity.identity.sacredAnimals.join(", "), icon: "🦁" }
          ].map((item, idx) => {
            const isFlipped = activeIdentityCard === idx;
            return (
              <div
                key={idx}
                onClick={() => { playClick(); setActiveIdentityCard(isFlipped ? null : idx); }}
                className="relative h-[160px] cursor-pointer group rounded-xl border border-[var(--border-gold)]/30 overflow-hidden"
                style={{ perspective: "1000px" }}
              >
                {/* Golden card frame glow */}
                <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none group-hover:border-[var(--accent-gold)] transition-colors duration-500 z-20" />
                
                <motion.div
                  className="w-full h-full relative"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* FRONT SIDE */}
                  <div 
                    className={`absolute inset-0 p-5 flex flex-col justify-between items-center text-center rounded-xl bg-gradient-to-br
                      ${isDarkMode 
                        ? "from-[#0d0716] to-[#040108] shadow-2xl" 
                        : "from-white to-[#F9F6F0] shadow-md"}`}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--accent-gold)]/10 flex items-center justify-center text-xl">
                      {item.icon}
                    </div>
                    <span className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-mono font-bold block">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-[var(--accent-gold)] font-mono flex items-center gap-1 opacity-70 group-hover:opacity-100">
                      Tap to reveal &rarr;
                    </span>
                  </div>

                  {/* BACK SIDE */}
                  <div 
                    className={`absolute inset-0 p-4 flex flex-col justify-center items-center text-center rounded-xl border-2 border-[var(--accent-gold)]/40 bg-gradient-to-br
                      ${isDarkMode 
                        ? "from-[#140b21] to-[#08020e]" 
                        : "from-[#FBF8F3] to-[#F1E8D9]"}`}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                  >
                    <span className="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-mono font-extrabold mb-1">
                      {item.label}
                    </span>
                    <p className="text-xs text-[var(--text-primary)] leading-normal font-sans font-medium px-1">
                      {item.val}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 3: LIFE JOURNEY TIMELINE (Story Mode Scroll)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="w-full relative py-4 bg-[var(--bg-secondary)] overflow-hidden">
        <TornPaperDivider position="top" color={isDarkMode ? "#030107" : "#FAF7F2"} />

        <section className="relative w-full py-16 px-4 md:px-8 max-w-4xl mx-auto z-20">
          <div className="text-center mb-12 flex flex-col items-center">
            <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block mb-1">
              Mitological Chronology
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
              Life Journey Timeline
            </h2>
            <div className="h-[2px] w-20 bg-[var(--accent-gold)] mt-2" />
            <p className="text-xs text-[var(--text-secondary)] max-w-md mt-2">
              Embark upon the path of their divine incarnation. Scroll to explore the chapters of their sacred legends.
            </p>
          </div>

          {/* Timeline Scroll Display */}
          <div className="grid grid-cols-1 md:grid-cols-[28%_72%] gap-6 items-stretch">
            {/* Left Timeline Guide index */}
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 border-b md:border-b-0 md:border-r border-[var(--border-gold)]/20 pr-0 md:pr-4">
              {deity.timeline.map((stage, idx) => {
                const isActive = activeTimelineStage === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => { playClick(); setActiveTimelineStage(idx); }}
                    className={`flex items-center gap-3 px-3 py-2 text-[10px] md:text-xs text-left uppercase tracking-wider font-extrabold transition-all border rounded md:border-0 shrink-0 cursor-pointer
                      ${isActive 
                        ? "bg-[var(--accent-gold)] text-black md:bg-transparent md:text-[var(--accent-gold)] md:font-black" 
                        : "bg-transparent text-[var(--text-secondary)] border-[var(--border-gold)]/20 hover:text-[var(--text-primary)]"}`}
                  >
                    <span className="font-mono text-[9px] md:text-[10px] w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{stage.stage}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Active Chapter Presentation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTimelineStage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={`flex flex-col gap-6 p-6 md:p-8 rounded-xl border border-[var(--border-gold)]/25
                  ${isDarkMode 
                    ? "bg-[#0b0514] shadow-2xl" 
                    : "bg-white shadow-md"}`}
              >
                <div>
                  <div className="flex justify-between items-center border-b border-[var(--border-gold)]/20 pb-2 mb-4">
                    <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold">
                      Chapter 0{activeTimelineStage + 1}: {deity.timeline[activeTimelineStage].stage}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)]">
                      Lila Record
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-extrabold text-[var(--text-primary)] mb-3">
                    {deity.timeline[activeTimelineStage].title}
                  </h3>
                  <p className="text-sm text-[var(--text-primary)] font-medium leading-relaxed mb-4">
                    {deity.timeline[activeTimelineStage].description}
                  </p>
                </div>

                {deity.timeline[activeTimelineStage].sanskritQuote && (
                  <div className="p-4 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-gold)]/20 text-center flex flex-col gap-2">
                    <p className="font-sanskrit text-base md:text-lg text-[var(--text-sanskrit)] dark:text-[var(--accent-gold)] font-bold whitespace-pre-line leading-relaxed">
                      {deity.timeline[activeTimelineStage].sanskritQuote}
                    </p>
                    {deity.timeline[activeTimelineStage].quoteTranslation && (
                      <p className="text-xs text-[var(--text-secondary)] italic leading-normal">
                        &ldquo;{deity.timeline[activeTimelineStage].quoteTranslation}&rdquo;
                      </p>
                    )}
                  </div>
                )}

                <div className="border-t border-[var(--border-gold)]/20 pt-4">
                  <span className="text-[10px] text-[var(--accent-saffron)] uppercase font-mono font-bold tracking-widest block mb-1">
                    📜 Sacred Narrative
                  </span>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans select-text">
                    {deity.timeline[activeTimelineStage].storyDetails}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <TornPaperDivider position="bottom" color={isDarkMode ? "#030107" : "#FAF7F2"} />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 4: RARE IMAGE GALLERY (Museum Catalog)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-16 px-4 md:px-8 max-w-7xl mx-auto z-10">
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block mb-1">
            Ancient Exhibition
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
            Rare Museum Image Gallery
          </h2>
          <div className="h-[2px] w-20 bg-[var(--accent-gold)] mt-2" />
          <p className="text-xs text-[var(--text-secondary)] max-w-md mt-2">
            Behold ancient sculptures, manuscripts, and regional paintings cataloged across centuries.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deity.gallery.map((item, idx) => (
            <div
              key={idx}
              onClick={() => { playClick(); setSelectedGalleryItem(item); }}
              className={`flex flex-col justify-between p-5 rounded-xl border border-[var(--border-gold)]/30 cursor-pointer group transition-all hover:scale-[1.02]
                ${isDarkMode 
                  ? "bg-gradient-to-br from-[#0c0615] via-[#050209] to-[#0d0716] shadow-2xl" 
                  : "bg-white shadow-md"}`}
            >
              {/* Premium fallback drawing representation */}
              <div className="relative w-full h-44 rounded-lg overflow-hidden bg-black/30 flex items-center justify-center border border-[var(--border-gold)]/25 mb-4 group-hover:border-[var(--accent-gold)] transition-colors">
                <SacredImage 
                  src="" 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                  fallbackText={deity.nameSanskrit}
                  type="deity"
                />
                {/* Hover overlay zoom */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <Maximize2 className="w-6 h-6 text-[#FFD700] scale-90 group-hover:scale-100 transition-transform" />
                </div>
              </div>

              <div>
                <span className="text-[8px] bg-[var(--accent-gold)]/10 px-2 py-0.5 rounded text-[var(--accent-gold)] font-mono font-bold border border-[var(--border-gold)]/30 uppercase tracking-widest block w-fit mb-1.5">
                  {item.type}
                </span>
                <h4 className="font-serif text-sm font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[10px] text-[var(--text-secondary)] font-mono block mt-1">
                  Origin: {item.origin}
                </p>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mt-2.5 line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Light-box */}
        <AnimatePresence>
          {selectedGalleryItem && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedGalleryItem(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />

              {/* Content Panel */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`relative w-full max-w-2xl rounded-2xl border border-[var(--border-gold)] p-6 z-10 max-h-[90vh] overflow-y-auto
                  ${isDarkMode 
                    ? "bg-[#0b0514] text-white" 
                    : "bg-white text-[var(--text-primary)]"}`}
              >
                <button 
                  onClick={() => setSelectedGalleryItem(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-[var(--text-secondary)] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col gap-5 text-center items-center mt-4 select-text">
                  <div className="w-48 h-48 rounded-full bg-black/30 border-2 border-[var(--accent-gold)] flex items-center justify-center p-2">
                    <SacredImage 
                      src="" 
                      alt={selectedGalleryItem.title} 
                      className="w-full h-full object-cover rounded-full" 
                      fallbackText={deity.nameSanskrit}
                      type="deity"
                    />
                  </div>
                  
                  <div>
                    <span className="text-[10px] bg-[var(--accent-gold)]/20 px-3 py-1 rounded-full text-[var(--accent-gold)] font-mono font-bold uppercase tracking-widest">
                      {selectedGalleryItem.type}
                    </span>
                    <h3 className="font-serif text-xl font-extrabold mt-3">
                      {selectedGalleryItem.title}
                    </h3>
                    <span className="text-[11px] text-[var(--accent-saffron)] font-mono font-bold block mt-1.5">
                      🏛️ {selectedGalleryItem.origin}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl font-sans mt-1">
                    {selectedGalleryItem.description}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 5: SACRED GEOGRAPHY (Pilgrimage Atlas)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-16 px-4 md:px-8 max-w-7xl mx-auto z-10 border-t border-[var(--border-gold)]/15">
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block mb-1">
            Pilgrimage Atlas
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
            Sacred Geography & Temples
          </h2>
          <div className="h-[2px] w-20 bg-[var(--accent-gold)] mt-2" />
          <p className="text-xs text-[var(--text-secondary)] max-w-md mt-2">
            Journey to the major geographic spots and historic temples dedicated to their memory.
          </p>
        </div>

        {/* Geography Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deity.geography.map((place, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between p-6 rounded-xl border border-[var(--border-gold)]/30 backdrop-blur-md
                ${isDarkMode 
                  ? "bg-white/5 shadow-2xl" 
                  : "bg-white shadow-md"}`}
            >
              <div>
                <div className="flex justify-between items-start border-b border-[var(--border-gold)]/10 pb-2 mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[var(--accent-saffron)]" />
                    <h3 className="font-serif text-base font-extrabold text-[var(--text-primary)]">
                      {place.templeName}
                    </h3>
                  </div>
                  <span className="text-[9px] text-[var(--text-secondary)] uppercase font-mono font-bold">
                    {place.coordinates}
                  </span>
                </div>
                
                <span className="text-[9px] text-[var(--accent-gold)] uppercase font-mono font-bold tracking-widest block mb-1">
                  Region: {place.region}
                </span>
                
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed select-text font-sans">
                  {place.significance}
                </p>
                
                <div className="border-t border-[var(--border-gold)]/10 pt-3 mt-4">
                  <span className="text-[9px] text-[var(--accent-saffron)] uppercase font-mono font-bold tracking-widest block mb-1">
                    ⛰️ Yatra / Pilgrimage route
                  </span>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-sans italic">
                    {place.routeDescription}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <a
                  href={place.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4A017] to-[#B8860B] text-black font-extrabold text-[10px] uppercase tracking-wider shadow hover:shadow-lg transition-all"
                >
                  Visit Sacred Altar &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 6: SCRIPTURE CONNECTIONS (Interactive Node Network)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-16 px-4 md:px-8 max-w-5xl mx-auto z-10 border-t border-[var(--border-gold)]/15">
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block mb-1">
            Textual Authority
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
            Scriptural Network Connections
          </h2>
          <div className="h-[2px] w-20 bg-[var(--accent-gold)] mt-2" />
          <p className="text-xs text-[var(--text-secondary)] max-w-md mt-2">
            Click on any scripture category to trace how their dynamic legends are woven through Vedic and Puranic literature.
          </p>
        </div>

        {/* Network Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-8 items-center bg-white/5 dark:bg-black/20 p-6 md:p-8 rounded-2xl border border-[var(--border-gold)]/25">
          
          {/* Interactive SVG Node Diagram */}
          <div className="w-full flex justify-center py-4">
            <svg className="w-full max-w-[340px] h-[300px] text-[var(--accent-gold)]" viewBox="0 0 300 300" fill="none">
              <rect width="100%" height="100%" rx="15" fill="none" />
              
              {/* Radial connecting tracks */}
              <circle cx="150" cy="150" r="100" stroke="rgba(212, 160, 23, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="150" cy="150" r="50" stroke="rgba(212, 160, 23, 0.1)" strokeWidth="0.5" />

              {/* Connecting lines from active node */}
              {deity.scriptures.map((item, idx) => {
                const angle = (idx * 2 * Math.PI) / deity.scriptures.length;
                const targetX = 150 + Math.cos(angle) * 100;
                const targetY = 150 + Math.sin(angle) * 100;
                const isActive = activeScriptureNode === item.category;

                return (
                  <line
                    key={idx}
                    x1="150"
                    y1="150"
                    x2={targetX}
                    y2={targetY}
                    stroke={isActive ? "var(--accent-gold)" : "rgba(212, 160, 23, 0.2)"}
                    strokeWidth={isActive ? "1.5" : "0.5"}
                    strokeDasharray={isActive ? "none" : "3 3"}
                  />
                );
              })}

              {/* Central Deity Core Node */}
              <g transform="translate(125, 125)">
                <circle cx="25" cy="25" r="25" fill="rgba(212, 160, 23, 0.12)" stroke="var(--accent-gold)" strokeWidth="1.5" />
                <circle cx="25" cy="25" r="28" stroke="var(--accent-gold)" strokeWidth="0.5" className="animate-pulse opacity-40" />
                <text x="25" y="29" textAnchor="middle" fill="var(--text-primary)" fontSize="8.5" fontWeight="bold" fontFamily="var(--font-sanskrit)">
                  {deity.nameSanskrit}
                </text>
              </g>

              {/* Outer Scripture Category Nodes */}
              {deity.scriptures.map((item, idx) => {
                const angle = (idx * 2 * Math.PI) / deity.scriptures.length;
                const targetX = 150 + Math.cos(angle) * 100;
                const targetY = 150 + Math.sin(angle) * 100;
                const isActive = activeScriptureNode === item.category;

                return (
                  <g
                    key={idx}
                    transform={`translate(${targetX - 22}, ${targetY - 22})`}
                    onClick={() => { playClick(); setActiveScriptureNode(item.category); }}
                    className="cursor-pointer"
                  >
                    <circle 
                      cx="22" 
                      cy="22" 
                      r="20" 
                      fill={isActive ? "var(--accent-gold)" : isDarkMode ? "#090410" : "#F8F5EF"} 
                      stroke={isActive ? "#FFD700" : "rgba(212, 160, 23, 0.35)"} 
                      strokeWidth={isActive ? "1.5" : "1"}
                    />
                    <text 
                      x="22" 
                      y="25" 
                      textAnchor="middle" 
                      fill={isActive ? "black" : "var(--text-primary)"} 
                      fontSize="7" 
                      fontWeight="bold"
                    >
                      {item.category.slice(0, 6)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Scripture Detail Description panel */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScriptureNode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center justify-between border-b border-[var(--border-gold)]/20 pb-2">
                  <span className="text-[10px] bg-[var(--accent-gold)]/25 px-2.5 py-0.5 rounded text-[var(--accent-gold)] font-mono font-bold uppercase tracking-widest">
                    {activeScripture.category}
                  </span>
                  <span className="text-xs font-serif font-extrabold text-[var(--text-primary)]">
                    {activeScripture.title}
                  </span>
                </div>

                <div className="bg-[var(--bg-primary)] p-4 rounded-lg border border-[var(--border-gold)]/20 text-center italic select-text flex flex-col gap-1.5">
                  <p className="font-sanskrit text-sm md:text-base text-[var(--text-sanskrit)] dark:text-[var(--accent-gold)] font-bold whitespace-pre-line leading-relaxed">
                    {activeScripture.quote}
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-normal">
                    &ldquo;{activeScripture.quoteTranslation}&rdquo;
                  </p>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans mt-1">
                  <span className="text-[10px] text-[var(--accent-saffron)] uppercase font-mono font-bold block mb-0.5">
                    Cosmic Connection
                  </span>
                  {activeScripture.connection}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 7: FESTIVALS (Lunar Calendar & Regional Rites)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-16 px-4 md:px-8 max-w-4xl mx-auto z-10 border-t border-[var(--border-gold)]/15">
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block mb-1">
            Sacred Calendar
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
            Major Festivals & Celebrations
          </h2>
          <div className="h-[2px] w-20 bg-[var(--accent-gold)] mt-2" />
          <p className="text-xs text-[var(--text-secondary)] max-w-md mt-2">
            Explore regional calendars, lunar cycles, and devotional customs linked to their worship.
          </p>
        </div>

        {/* Festival items cards */}
        <div className="flex flex-col gap-4">
          {deity.festivals.map((fest, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border border-[var(--border-gold)]/30 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center
                ${isDarkMode ? "bg-white/5" : "bg-white"}`}
            >
              <div className="flex items-start gap-3 flex-grow">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-saffron)]/10 flex items-center justify-center text-xl shrink-0">
                  🎉
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-serif text-base font-extrabold text-[var(--text-primary)]">
                      {fest.name}
                    </h3>
                    <span className="text-[9px] bg-[var(--accent-gold)]/20 px-2 py-0.5 rounded text-[var(--accent-gold)] font-mono font-bold uppercase tracking-wider">
                      🌓 {fest.lunarDate}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
                    {fest.description}
                  </p>
                </div>
              </div>

              {/* Regional variations box */}
              <div className="w-full md:w-[30%] border-t md:border-t-0 md:border-l border-[var(--border-gold)]/20 pt-3 md:pt-0 pl-0 md:pl-4 flex flex-col gap-1">
                <span className="text-[9px] text-[var(--accent-saffron)] uppercase font-mono font-bold tracking-widest block">
                  Regional Customs
                </span>
                <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed font-sans italic">
                  {fest.regionalVariations}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 8: DIVINE RELATIONSHIPS (Lineage Tree Graph)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-16 px-4 md:px-8 max-w-4xl mx-auto z-10 border-t border-[var(--border-gold)]/15">
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block mb-1">
            Lineage Maps
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
            Divine Relationships Graph
          </h2>
          <div className="h-[2px] w-20 bg-[var(--accent-gold)] mt-2" />
          <p className="text-xs text-[var(--text-secondary)] max-w-md mt-2">
            Toggle between Family, Incarnations (Avatars), and Guru lineages to explore their relational networks.
          </p>
        </div>

        {/* Tree Selector Tabs */}
        <div className="flex justify-center border-b border-[var(--border-gold)]/20 pb-0.5 mb-8 gap-2">
          {([
            { id: "family", label: "Family Tree" },
            { id: "avatars", label: "Avatar Tree" },
            { id: "gurus", label: "Guru / Lineage" }
          ] as const).map((tab) => {
            const isActive = relationshipView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { playClick(); setRelationshipView(tab.id); }}
                className={`px-4 py-2.5 text-xs uppercase tracking-wider font-extrabold transition-all border-b-2 cursor-pointer
                  ${isActive 
                    ? "border-[var(--accent-gold)] text-[var(--accent-gold)] font-black" 
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* SVG Network Graph */}
        <div className="w-full flex justify-center py-6 bg-white/5 dark:bg-black/20 rounded-2xl border border-[var(--border-gold)]/25 overflow-hidden">
          <svg className="w-full max-w-[440px] h-[260px] text-[var(--accent-gold)]" viewBox="0 0 300 220" fill="none">
            {/* Background grid */}
            <pattern id="tree-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(212, 160, 23, 0.03)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#tree-grid)" />

            {/* Central Node */}
            <g transform="translate(105, 88)" className="z-20">
              <rect width="90" height="44" rx="6" fill="rgba(212, 160, 23, 0.15)" stroke="var(--accent-gold)" strokeWidth="2" />
              <rect width="94" height="48" x="-2" y="-2" rx="8" stroke="var(--accent-gold)" strokeWidth="0.5" className="animate-pulse opacity-40" />
              <text x="45" y="20" textAnchor="middle" fill="var(--text-primary)" fontSize="9.5" fontWeight="bold">
                {deity.nameEnglish}
              </text>
              <text x="45" y="34" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontFamily="var(--font-sanskrit)">
                {deity.nameSanskrit}
              </text>
            </g>

            {/* FAMILY VIEW */}
            {relationshipView === "family" && (
              <g>
                {deity.relationships.family.map((rel, idx) => {
                  const angle = (idx * 2 * Math.PI) / deity.relationships.family.length;
                  const targetX = 150 + Math.cos(angle) * 95;
                  const targetY = 110 + Math.sin(angle) * 75;

                  return (
                    <g key={idx}>
                      <line x1="150" y1="110" x2={targetX} y2={targetY} stroke="rgba(212, 160, 23, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx={targetX} cy={targetY} r="3" fill="var(--accent-gold)" />
                      <g 
                        transform={`translate(${targetX - 38}, ${targetY - 18})`}
                        onClick={() => {
                          if (rel.slug) {
                            playNavigate();
                            router.push(`/deities/${rel.slug}`);
                          }
                        }}
                        className={rel.slug ? "cursor-pointer group" : "cursor-default"}
                      >
                        <rect 
                          width="76" 
                          height="36" 
                          rx="4" 
                          fill={isDarkMode ? "#090410" : "#FAF6EE"} 
                          stroke={rel.slug ? "var(--border-gold)" : "rgba(120, 120, 120, 0.25)"} 
                          strokeWidth="1" 
                        />
                        <text x="38" y="14" textAnchor="middle" fill="var(--text-primary)" fontSize="8" fontWeight="bold">
                          {rel.name}
                        </text>
                        <text x="38" y="26" textAnchor="middle" fill="var(--text-secondary)" fontSize="7" className="uppercase font-mono">
                          {rel.relation}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </g>
            )}

            {/* AVATAR VIEW */}
            {relationshipView === "avatars" && (
              <g>
                {deity.relationships.avatars.length === 0 ? (
                  <text x="150" y="180" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontStyle="italic">
                    Formless Supreme: No material incarnations seed.
                  </text>
                ) : (
                  deity.relationships.avatars.map((av, idx) => {
                    const count = deity.relationships.avatars.length;
                    const angle = Math.PI - (idx * Math.PI) / (count - 1 || 1); // Arc top layout
                    const targetX = 150 + Math.cos(angle) * 105;
                    const targetY = 110 + Math.sin(angle) * 80;

                    return (
                      <g key={idx}>
                        <line x1="150" y1="110" x2={targetX} y2={targetY} stroke="rgba(212, 160, 23, 0.35)" strokeWidth="1" />
                        <g 
                          transform={`translate(${targetX - 38}, ${targetY - 16})`}
                          onClick={() => {
                            if (av.slug) {
                              playNavigate();
                              router.push(`/deities/${av.slug}`);
                            }
                          }}
                          className={av.slug ? "cursor-pointer" : "cursor-default"}
                        >
                          <rect 
                            width="76" 
                            height="32" 
                            rx="4" 
                            fill={isDarkMode ? "#090410" : "#FAF6EE"} 
                            stroke={av.slug ? "var(--accent-gold)" : "rgba(120, 120, 120, 0.2)"} 
                            strokeWidth="1" 
                          />
                          <text x="38" y="14" textAnchor="middle" fill="var(--text-primary)" fontSize="7.5" fontWeight="bold">
                            {av.name}
                          </text>
                          <text x="38" y="24" textAnchor="middle" fill="var(--text-secondary)" fontSize="6" className="uppercase block overflow-hidden max-w-full">
                            Manifestation
                          </text>
                        </g>
                      </g>
                    );
                  })
                )}
              </g>
            )}

            {/* GURU VIEW */}
            {relationshipView === "gurus" && (
              <g>
                {deity.relationships.gurus.length === 0 ? (
                  <text x="150" y="180" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontStyle="italic">
                    Adi Guru: Represents the primordial source of learning.
                  </text>
                ) : (
                  deity.relationships.gurus.map((guru, idx) => {
                    const count = deity.relationships.gurus.length;
                    const angle = Math.PI + (idx * Math.PI) / (count - 1 || 1); // Arc bottom layout
                    const targetX = 150 + Math.cos(angle) * 95;
                    const targetY = 110 + Math.sin(angle) * 75;

                    return (
                      <g key={idx}>
                        <line x1="150" y1="110" x2={targetX} y2={targetY} stroke="rgba(212, 160, 23, 0.35)" strokeWidth="1" />
                        <g transform={`translate(${targetX - 40}, ${targetY - 18})`}>
                          <rect width="80" height="36" rx="4" fill={isDarkMode ? "#090410" : "#FAF6EE"} stroke="rgba(120, 120, 120, 0.2)" strokeWidth="1" />
                          <text x="40" y="14" textAnchor="middle" fill="var(--text-primary)" fontSize="7.5" fontWeight="bold">
                            {guru.name}
                          </text>
                          <text x="40" y="26" textAnchor="middle" fill="var(--text-secondary)" fontSize="6.5" className="block max-w-full font-serif text-[6px]">
                            {guru.role.slice(0, 18)}...
                          </text>
                        </g>
                      </g>
                    );
                  })
                )}
              </g>
            )}
          </svg>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 9: MANTRAS & STOTRAS (Word-by-Word Chants)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-16 px-4 md:px-8 max-w-4xl mx-auto z-10 border-t border-[var(--border-gold)]/15">
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block mb-1">
            Chanting Sanctum
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
            Sacred Mantras & Stotras
          </h2>
          <div className="h-[2px] w-20 bg-[var(--accent-gold)] mt-2" />
          <p className="text-xs text-[var(--text-secondary)] max-w-md mt-2">
            Recite the primordial hymns. Hover over words to inspect their literal and mystical Sanskrit definitions.
          </p>
        </div>

        {/* Mantras List */}
        <div className="flex flex-col gap-6">
          {deity.mantras.map((mantra, mIdx) => (
            <div
              key={mIdx}
              className={`p-6 md:p-8 rounded-xl border border-[var(--border-gold)]/25 flex flex-col gap-5
                ${isDarkMode 
                  ? "bg-gradient-to-br from-[#0c0615] via-[#050209] to-[#0d0716] shadow-2xl" 
                  : "bg-white shadow-md"}`}
            >
              {/* Mantra Heading & Sound trigger */}
              <div className="flex justify-between items-center border-b border-[var(--border-gold)]/15 pb-3">
                <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold">
                  Mantra 0{mIdx + 1}: Chanting Plate
                </span>
                <button
                  onClick={triggerBellSound}
                  className="px-3 py-1 rounded-full bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] font-mono text-[9px] uppercase tracking-widest border border-[var(--border-gold)]/40 hover:bg-[var(--accent-gold)]/25 cursor-pointer flex items-center gap-1.5"
                >
                  🔔 <span>Ring Chime</span>
                </button>
              </div>

              {/* Sanskrit Text with hover trigger words */}
              <div className="text-center select-text py-4 flex flex-col gap-3">
                <p className="font-sanskrit text-xl md:text-2xl text-[var(--text-sanskrit)] dark:text-[var(--accent-gold)] font-bold whitespace-pre-line leading-relaxed">
                  {mantra.text}
                </p>
                <p className="text-xs md:text-sm text-[var(--text-secondary)] italic leading-normal px-4">
                  {mantra.transliteration}
                </p>
              </div>

              {/* Word-by-Word Translation breakdown */}
              <div className="border-t border-[var(--border-gold)]/15 pt-4">
                <span className="text-[9px] text-[var(--accent-gold)] uppercase font-mono font-bold tracking-widest block mb-3">
                  🔍 Mystical Word-by-Word Breakdown
                </span>
                <div className="flex flex-wrap gap-2">
                  {mantra.breakdown.map((item, wIdx) => {
                    const isHovered = hoveredMantraWord === `${mIdx}-${wIdx}`;
                    return (
                      <div
                        key={wIdx}
                        onMouseEnter={() => setHoveredMantraWord(`${mIdx}-${wIdx}`)}
                        onMouseLeave={() => setHoveredMantraWord(null)}
                        className={`relative px-3 py-1.5 rounded border transition-all cursor-default select-text
                          ${isHovered 
                            ? "bg-[var(--accent-gold)] border-[#FFD700] text-black shadow-md font-bold" 
                            : "bg-[var(--bg-secondary)]/50 border-[var(--border-gold)]/20 text-[var(--text-primary)]"}`}
                      >
                        <span className="text-xs md:text-sm font-serif block">
                          {item.word}
                        </span>
                        
                        {/* Word tooltip definition */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded bg-black text-white text-[10px] font-sans border border-[var(--border-gold)] text-center leading-normal z-30 shadow-xl"
                            >
                              <span className="font-bold text-[#FFD700] block mb-0.5">{item.word}</span>
                              {item.meaning}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timeless Meaning */}
              <div className="border-t border-[var(--border-gold)]/15 pt-4">
                <span className="text-[9px] text-[var(--accent-saffron)] uppercase font-mono font-bold tracking-widest block mb-1">
                  💡 Cosmic Essence Meaning
                </span>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed select-text font-serif italic">
                  &ldquo;{mantra.meaning}&rdquo;
                </p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 10: EXPLORE THE DIVINE WORLD (CTAs)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-16 px-4 md:px-8 max-w-4xl mx-auto z-10 border-t border-[var(--border-gold)]/15 select-none">
        <div className="bg-gradient-to-br from-[#120a1c] via-[#020005] to-[#100619] rounded-2xl border border-[var(--border-gold)] p-8 text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">
          
          {/* Subtle concentric circles in CTA */}
          <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center scale-150">
            <svg className="w-5/6 h-5/6 text-[#D4A017] rotate-slow" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="45" />
            </svg>
          </div>

          <div className="z-10">
            <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block mb-1">
              Gateway Matrix
            </span>
            <h2 className="font-serif text-xl md:text-2xl font-extrabold text-white">
              Continue Your Devotional Journey
            </h2>
            <p className="text-xs text-slate-400 max-w-md mt-2 mx-auto leading-relaxed">
              Ascend to the library to study their canonical scriptures, or map pilgrimage paths in the Interactive Sacred Atlas.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="z-10 flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={() => { playNavigate(); router.push("/library"); }}
              className="px-6 py-2.5 rounded-lg border border-[var(--border-gold)] text-[var(--accent-gold)] hover:bg-[var(--border-gold)]/10 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Browse Library Scriptures
            </button>
            <button
              onClick={() => { playNavigate(); router.push("/temples"); }}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#D4A017] to-[#B8860B] text-black hover:shadow-[0_0_15px_rgba(212,160,23,0.3)] text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
            >
              Explore Sacred Temples Map
            </button>
          </div>
        </div>
      </section>

      {/* Recommended Journey reading */}
      <NextReading items={getNextReadItems()} />

      {/* Discovery of Related scriptures/articles */}
      <RelatedContentDiscovery
        category={
          (() => {
            const s = deity.slug.toLowerCase();
            if (s === "shiva") return "shiva";
            if (s === "vishnu" || s === "rama" || s === "krishna") return "vishnu";
            if (s === "durga" || s === "kali" || s === "saraswati" || s === "lakshmi" || s === "parvati") return "devi";
            if (s === "ganesha") return "ganesha";
            if (s === "hanuman") return "hanuman";
            return "general";
          })()
        }
      />
    </div>
  );
}
