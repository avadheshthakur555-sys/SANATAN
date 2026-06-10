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

// Custom Jagged Torn-Paper Separator
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

// Volumetric Light Ray Overlay
const VolumetricLight = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 dark:opacity-40 z-0">
    <div className="absolute top-[-30%] left-[-15%] w-[130%] h-[160%] bg-[radial-gradient(circle_at_top_left,rgba(212,160,23,0.2)_0%,transparent_50%)] rotate-12" />
    <div className="absolute top-[-30%] right-[-15%] w-[130%] h-[160%] bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18)_0%,transparent_50%)] -rotate-12" />
  </div>
);

// Floating 3D Glass Shards matching the Pinterest layout
const GlassShard = ({ className = "", delay = 0, style = {} }: { className?: string; delay?: number; style?: React.CSSProperties }) => (
  <motion.div
    initial={{ y: 25, opacity: 0, rotate: 0 }}
    animate={{ y: [0, -15, 0], opacity: [0.35, 0.75, 0.35], rotate: [0, 8, 0] }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute border border-amber-500/20 bg-white/5 backdrop-blur-[2.5px] shadow-[0_0_25px_rgba(212,160,23,0.08)] rounded pointer-events-none z-10 ${className}`}
    style={style}
  />
);

// Reusable Museum Slide Frame matching the approved V2 slide compositions
const MuseumSlideFrame = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative border-double border-4 border-[var(--border-gold)]/40 p-6 md:p-10 bg-black/45 dark:bg-[#07030c]/80 backdrop-blur-md rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-500 ${className}`}>
    {/* Corner Filigrees */}
    <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[var(--accent-gold)]/80 pointer-events-none" />
    <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[var(--accent-gold)]/80 pointer-events-none" />
    <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[var(--accent-gold)]/80 pointer-events-none" />
    <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[var(--accent-gold)]/80 pointer-events-none" />
    
    {/* Inner thin lines */}
    <div className="absolute inset-1 border border-[var(--border-gold)]/10 pointer-events-none" />
    
    <div className="relative z-10 w-full h-full">
      {children}
    </div>
  </div>
);

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

  // Mouse tilt tracking for 3D preserve-3d effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // UI Interactive States
  const [activeIdentityCard, setActiveIdentityCard] = useState<number | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [activeScriptureNode, setActiveScriptureNode] = useState<string>("Puranas");
  const [hoveredMantraWord, setHoveredMantraWord] = useState<string | null>(null);
  const [activeTimelineStage, setActiveTimelineStage] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Tracks mouse movements for real-time 3D parallax offsets
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Watch dark mode changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new MutationObserver(() => {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      
      const timeoutId = setTimeout(() => {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
      }, 0);
      
      return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
      };
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

  // Build Next Reading links
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

  const activeScripture = deity.scriptures.find(s => s.category === activeScriptureNode) || deity.scriptures[0];

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark bg-[#020005]" : "bg-[#FAF8F5]"} text-[var(--text-primary)] transition-colors duration-500 overflow-x-hidden relative`}>
      <TempleDoor />

      {/* Atmospheric Starfield & Gold Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <GoldParticleField />
      </div>

      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none z-0 transition-all duration-1000"
        style={{ background: deity.bgGradient }}
      />

      <div className="relative z-20">
        <Breadcrumb items={[{ label: "Deities", href: "/deities" }, { label: deity.nameEnglish }]} />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO SECTION (Slide 1: Framed vertical portrait + gold card text)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 py-8 overflow-hidden z-10 border-b border-[var(--border-gold)]/20 select-none">
        
        {/* Volumetric Lights */}
        <VolumetricLight />
        
        {/* Floating Glass Shards */}
        <GlassShard className="w-10 h-10 top-[20%] left-[10%]" delay={0.5} style={{ clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 0% 80%)" }} />
        <GlassShard className="w-14 h-8 top-[35%] right-[8%]" delay={1.5} style={{ clipPath: "polygon(0 0, 100% 20%, 75% 100%, 20% 90%)" }} />
        <GlassShard className="w-8 h-12 bottom-[25%] left-[15%]" delay={2.5} style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
        <GlassShard className="w-12 h-10 bottom-[30%] right-[15%]" delay={0.2} style={{ clipPath: "polygon(100% 0, 85% 100%, 0 65%, 20% 10%)" }} />

        {/* Orbit Ring */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[540px] md:h-[540px] z-0 pointer-events-none opacity-40 dark:opacity-60 transition-transform duration-300"
          style={{ transform: `translate(-50%, -50%) translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)` }}
        >
          <div className="concentric-circle concentric-circle-1" />
          <div className="concentric-circle concentric-circle-2" />
          <div className="concentric-circle concentric-circle-3" />
        </div>

        {/* Sound Controls header */}
        <div className="w-full max-w-[1500px] mx-auto flex justify-between items-center z-20 mb-4 px-4">
          <button 
            onClick={() => { playNavigate(); router.push("/deities"); }}
            className="px-4 py-1.5 border border-[var(--border-gold)]/40 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hover:bg-[var(--border-gold)]/10 text-[10px] uppercase tracking-wider font-semibold rounded-full cursor-pointer transition-all"
          >
            ← Directory
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleAmbient}
              className={`p-2 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest px-3.5
                ${ambientActive 
                  ? "bg-[#D4A017] border-[#FFE485] text-black shadow-lg" 
                  : "bg-white/5 border-[var(--border-gold)]/40 text-[var(--accent-gold)] hover:bg-white/10"}`}
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
            >
              🔥 <span>Aarti Bells</span>
            </button>
          </div>
        </div>

        {/* 3D Depth Layered Artwork & Names (Slide 1 Layout: image left, framed metadata card right) */}
        <div 
          className="w-full max-w-[1500px] mx-auto z-10 flex-grow my-auto grid grid-cols-1 lg:grid-cols-[42%_58%] gap-8 md:gap-12 items-center px-4"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          {/* Left: Gold-Framed Deity Portrait */}
          <div className="flex justify-center" style={{ transform: `translateZ(30px)` }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              onClick={triggerBellSound}
              className="relative w-64 h-80 md:w-[350px] md:h-[460px] rounded-xl overflow-hidden border-double border-8 border-[var(--accent-gold)] bg-black/60 shadow-[0_25px_50px_rgba(0,0,0,0.9)] flex items-center justify-center shrink-0 z-10 group cursor-pointer"
            >
              <SacredImage 
                src={deity.heroImage} 
                alt={deity.nameEnglish} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                fallbackText={deity.nameSanskrit}
                type="deity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 border border-white/10 pointer-events-none group-hover:shadow-[inset_0_0_35px_rgba(255,215,0,0.4)] transition-shadow duration-500" />
              <div className="absolute bottom-5 flex items-center gap-1 bg-black/75 px-3 py-1.5 rounded-full text-[9px] uppercase tracking-wider text-[#FFD700] border border-[#FFD700]/30 opacity-0 group-hover:opacity-100 transition-opacity z-20 font-bold">
                🔔 Sound Bell
              </div>
            </motion.div>
          </div>

          {/* Right: Large Title Plates inside a Museum Slide Frame */}
          <div 
            className="flex flex-col justify-center text-left"
            style={{ transform: `translateZ(60px)` }}
          >
            <MuseumSlideFrame className="w-full select-text">
              <span className="text-stroke-gold text-5xl md:text-7xl lg:text-8xl font-black font-sanskrit tracking-widest drop-shadow-[0_4px_15px_rgba(212,160,23,0.35)] block mb-2 leading-none">
                {deity.nameSanskrit}
              </span>
              <div className="h-[2px] w-full bg-gradient-to-r from-[var(--accent-gold)] via-[var(--accent-gold)]/40 to-transparent mb-4" />
              
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-serif font-black uppercase tracking-widest pl-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {deity.nameEnglish}
                </h1>
                <h2 className="text-2xl md:text-3xl text-[var(--accent-saffron)] font-serif font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {deity.nameHindi}
                </h2>
              </div>
              
              <p className="text-xs md:text-sm text-slate-300 tracking-wide font-medium italic mt-6 leading-relaxed border-l-2 border-[var(--accent-gold)]/50 pl-4 py-1">
                &ldquo;{deity.meaning}&rdquo;
              </p>
              
              <div className="mt-8">
                <span className="text-[10px] md:text-xs text-[var(--accent-gold)] font-mono uppercase tracking-widest font-extrabold block">
                  Cosmic Authority & Status
                </span>
                <p className="text-sm md:text-base text-white font-serif mt-1 font-semibold leading-relaxed">
                  {deity.role}
                </p>
              </div>
            </MuseumSlideFrame>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center z-20 mt-4 select-none pt-4 text-center">
          <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={triggerBellSound}>
            <DiyaFlame intensity={aartiActive ? "aarti" : "normal"} />
            <span className="text-[8px] uppercase tracking-widest text-slate-400 font-mono font-bold mt-2">
              Inner Sanctum
            </span>
          </div>
          <div className="mt-4 animate-bounce text-[var(--accent-gold)] text-xs font-mono">
            Scroll &darr;
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. DIVINE ESSENCE (Slide 2: Split composition, text left, cards right)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 px-4 md:px-8 max-w-[1600px] mx-auto z-10 border-b border-[var(--border-gold)]/10">
        <MuseumSlideFrame>
          <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 md:gap-12 items-center">
            
            {/* Left side: Heading */}
            <div className="flex flex-col gap-4 text-left select-text">
              <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block">
                01 / Identity Core
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-black text-white leading-tight uppercase tracking-wider">
                Divine Persona & Essence
              </h2>
              <div className="h-[2px] w-24 bg-[var(--accent-gold)] mt-1 mb-2" />
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                The attributes and emblems of the deity are not arbitrary symbols. They describe pure cosmic principles, Abodes (Lokas), celestial numbers, colors, and planetary structures.
              </p>
            </div>

            {/* Right side: Interactive flip cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Titles & Epithets", val: deity.identity.titles.slice(0, 3).join(", "), icon: "👑" },
                { label: "Loka / Abode", val: deity.identity.loka, icon: "🌌" },
                { label: "Sacred Color", val: deity.identity.sacredColors.join(", "), icon: "🎨" },
                { label: "Sacred Number", val: deity.identity.sacredNumbers.join(", "), icon: "🔢" },
                { label: "Sacred Trees", val: deity.identity.sacredTrees.join(", "), icon: "🌳" },
                { label: "Consort Aspect", val: deity.identity.consort, icon: "🪷" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => { playClick(); setActiveIdentityCard(activeIdentityCard === idx ? null : idx); }}
                  className="relative h-36 rounded-xl border border-[var(--border-gold)]/35 overflow-hidden cursor-pointer group hover:border-[var(--accent-gold)]/60 transition-all bg-white/5 dark:bg-[#0c0515]/40 backdrop-blur-md"
                  style={{ transformStyle: "preserve-3d", perspective: "800px" }}
                >
                  <div 
                    className="w-full h-full p-4 flex flex-col justify-between items-center text-center transition-transform duration-500"
                    style={{ transform: activeIdentityCard === idx ? "rotateY(180deg)" : "none", transformStyle: "preserve-3d" }}
                  >
                    {/* FRONT */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-between items-center" style={{ backfaceVisibility: "hidden" }}>
                      <div className="w-10 h-10 rounded-full bg-[var(--accent-gold)]/15 flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono font-bold block">
                        {item.label}
                      </span>
                      <span className="text-[8px] text-[var(--accent-gold)] font-mono opacity-80">
                        Tap to expand
                      </span>
                    </div>

                    {/* BACK */}
                    <div 
                      className="absolute inset-0 p-4 flex flex-col justify-center items-center bg-black/55"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      <span className="text-[9px] uppercase tracking-wider text-[var(--accent-gold)] font-mono font-black mb-1">
                        {item.label}
                      </span>
                      <p className="text-[11px] text-white font-sans font-semibold px-1 leading-relaxed">
                        {item.val}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </MuseumSlideFrame>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. ORIGIN STORY (Slide 3: Horizontal scene left, narrative card right)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 px-4 md:px-8 max-w-[1600px] mx-auto z-10 border-b border-[var(--border-gold)]/10">
        <MuseumSlideFrame>
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 md:gap-12 items-center">
            
            {/* Left: Horizontal Gold Framed Painting */}
            <div className="flex justify-center relative">
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden border-double border-4 border-[var(--border-gold)]/50 bg-[#0d0718] p-2 shadow-2xl">
                <SacredImage 
                  src="" 
                  alt="Origin story depiction" 
                  className="w-full h-full object-cover rounded"
                  fallbackText="Genesis"
                  type="deity"
                />
              </div>
            </div>

            {/* Right: Editorial Narrative */}
            <div className="flex flex-col gap-4 select-text text-left">
              <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block">
                02 / Cosmic Genesis
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-black text-white uppercase tracking-wider">
                Origin & Ascent Story
              </h2>
              <div className="h-[2px] w-16 bg-[var(--accent-gold)] mb-1" />
              <p className="text-sm md:text-base text-slate-300 leading-relaxed font-serif italic border-l-2 border-[var(--accent-gold)]/50 pl-5 my-2">
                &ldquo;{deity.timeline[0].storyDetails}&rdquo;
              </p>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-sans">
                Manifested from the absolute cause, the divine presence descends to establish order, acting as the bridge between formless reality and the material plane.
              </p>
            </div>

          </div>
        </MuseumSlideFrame>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. MAJOR LEGENDS (Slide 4: Composite: text left, center gold ring, quote right)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 px-4 md:px-8 max-w-[1600px] mx-auto z-10 border-b border-[var(--border-gold)]/10">
        <MuseumSlideFrame>
          
          {/* Header row */}
          <div className="text-left mb-10 border-b border-[var(--border-gold)]/20 pb-4">
            <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block">
              03 / Major Legends Chapters
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-black text-white uppercase tracking-wider mt-1">
              Epic Narrative Cycle
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Select chronological chapters below to rotate the narrative dial
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[35%_30%_35%] gap-6 items-center">
            
            {/* Left Column: Legend Details */}
            <div className="flex flex-col gap-4 text-left select-text order-2 lg:order-1">
              <span className="text-[9px] text-[var(--accent-gold)] uppercase font-mono font-bold tracking-widest block border-b border-[var(--border-gold)]/20 pb-2">
                Chapter 0{activeTimelineStage + 1}: {deity.timeline[activeTimelineStage].stage}
              </span>
              <h3 className="font-serif text-lg md:text-xl font-bold text-white leading-snug">
                {deity.timeline[activeTimelineStage].title}
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                {deity.timeline[activeTimelineStage].description}
              </p>
              
              <div className="border-t border-[var(--border-gold)]/20 pt-4 mt-2">
                <span className="text-[9px] text-[var(--accent-saffron)] uppercase font-mono font-bold tracking-widest block mb-1">
                  📜 Sacred Record
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  {deity.timeline[activeTimelineStage].storyDetails}
                </p>
              </div>
            </div>

            {/* Center Column: Circular Gold Ring Portrait (Rotating Dial) */}
            <div className="flex flex-col items-center justify-center order-1 lg:order-2">
              <div 
                onClick={triggerBellSound}
                className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-[4px] border-double border-[var(--accent-gold)] bg-black/60 shadow-[0_0_35px_rgba(212,160,23,0.3)] flex items-center justify-center shrink-0 group cursor-pointer hover:border-[var(--accent-gold)] transition-colors duration-500"
              >
                <SacredImage 
                  src={deity.heroImage} 
                  alt={deity.nameEnglish} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fallbackText="OM"
                  type="deity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 border border-white/5 rounded-full pointer-events-none" />
              </div>
              
              {/* Timeline Horizontal Tabs */}
              <div className="flex flex-wrap gap-1.5 justify-center mt-6 w-full max-w-[280px]">
                {deity.timeline.map((stage, idx) => {
                  const isActive = activeTimelineStage === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => { playClick(); setActiveTimelineStage(idx); }}
                      className={`w-7 h-7 rounded-full text-[10px] font-mono font-bold border transition-all cursor-pointer flex items-center justify-center
                        ${isActive 
                          ? "bg-[var(--accent-gold)] border-[#FFE57F] text-black shadow-md font-black" 
                          : "bg-white/5 border-[var(--border-gold)]/20 text-slate-300 hover:text-white"}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Quotes & Translations */}
            <div className="flex flex-col gap-4 text-center items-center justify-center order-3 select-text bg-white/5 dark:bg-black/20 p-5 rounded-xl border border-[var(--border-gold)]/25 min-h-[180px]">
              {deity.timeline[activeTimelineStage].sanskritQuote ? (
                <>
                  <p className="font-sanskrit text-sm md:text-base text-[var(--accent-gold)] font-bold whitespace-pre-line leading-relaxed">
                    {deity.timeline[activeTimelineStage].sanskritQuote}
                  </p>
                  <div className="h-[1px] w-12 bg-[var(--border-gold)]/30 my-1" />
                  <p className="text-[11px] text-slate-300 italic leading-relaxed px-2">
                    &ldquo;{deity.timeline[activeTimelineStage].quoteTranslation}&rdquo;
                  </p>
                </>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  No scriptural verse matches this specific chronology block directly. Refer to Puranic logs below.
                </p>
              )}
            </div>

          </div>
        </MuseumSlideFrame>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. ATTRIBUTES (Slide 5: Domains text left, tall vertical image right)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 px-4 md:px-8 max-w-[1600px] mx-auto z-10 border-b border-[var(--border-gold)]/10">
        <MuseumSlideFrame>
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 md:gap-12 items-center">
            
            {/* Left: Info details and progress bars */}
            <div className="flex flex-col gap-5 select-text text-left">
              <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block">
                04 / Cosmic Radiance
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-black text-white uppercase tracking-wider">
                Divine Domains & Spheres
              </h2>
              <div className="h-[2px] w-16 bg-[var(--accent-gold)] mt-1 mb-2" />
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                Every deity governs specific cosmic principles and psychological domains. Meditating on these attributes aligns the mind with their respective cosmic frequencies.
              </p>

              <div className="flex flex-col gap-4 mt-3">
                {deity.identity.titles.map((title, idx) => {
                  const percentage = 100 - (idx * 8);
                  return (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[11px] font-bold text-white">
                        <span>{title}</span>
                        <span className="text-[var(--accent-gold)] font-mono">{percentage}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 dark:bg-black/45 rounded-full overflow-hidden border border-[var(--border-gold)]/20">
                        <div 
                          className="h-full bg-gradient-to-r from-[var(--accent-gold)] to-[#FFD700] rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Tall Vertical framed image */}
            <div className="flex justify-center">
              <div className="relative w-72 h-[340px] md:w-80 md:h-[400px] rounded-xl overflow-hidden border-double border-4 border-[var(--border-gold)]/50 bg-[#0d0718] p-2 shadow-2xl">
                <SacredImage 
                  src="" 
                  alt="Divine domain illustration" 
                  className="w-full h-full object-cover rounded"
                  fallbackText="Divine Form"
                  type="deity"
                />
              </div>
            </div>

          </div>
        </MuseumSlideFrame>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. SYMBOLS (Slide 6 layout: center grid of emblem medallions)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 px-4 md:px-8 max-w-[1600px] mx-auto z-10 border-b border-[var(--border-gold)]/10 text-center">
        <MuseumSlideFrame>
          <div className="mb-12 flex flex-col items-center">
            <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block mb-1">
              05 / Sacred Objects
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-black text-white uppercase tracking-wider">
              Cosmic Symbols & Medallions
            </h2>
            <div className="h-[2px] w-24 bg-[var(--accent-gold)] mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {deity.identity.symbols.map((sym, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-[var(--border-gold)]/30 bg-white/5 dark:bg-black/35 backdrop-blur-md flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--accent-gold)]/10 flex items-center justify-center text-xl text-[var(--accent-gold)] border border-[var(--border-gold)]/20">
                  🕉️
                </div>
                <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
                  {sym}
                </h4>
                <p className="text-[10px] text-slate-400 leading-normal font-sans">
                  Sacred emblem representing cosmic frequencies, used in meditation and visual contemplation.
                </p>
              </div>
            ))}
          </div>
        </MuseumSlideFrame>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. WEAPONS & MOUNT (Slide 6/8 layout: weapons list left, mount details card right)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 px-4 md:px-8 max-w-[1600px] mx-auto z-10 border-b border-[var(--border-gold)]/10">
        <MuseumSlideFrame>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Left: Weapons List */}
            <div className="flex flex-col gap-4 select-text text-left">
              <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block">
                06 / Divine Arsenal
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-black text-white uppercase tracking-wider">
                Weapons & Armaments
              </h2>
              <div className="h-[2px] w-16 bg-[var(--accent-gold)] mt-1 mb-2" />
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                Weapons wielded by deities represent metaphysical forces. For instance, a trident governs the three modes of nature (Gunas), and a discus represents the light of discrimination destroying ignorance.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {deity.identity.weapons.map((w, idx) => (
                  <span key={idx} className="px-3.5 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-gold)]/40 rounded text-[11px] font-bold text-white shadow">
                    ⚔️ {w}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Mount (Vahana) details card */}
            <div className="p-6 rounded-xl border border-[var(--border-gold)]/25 bg-[#0e0718]/40 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[var(--accent-gold)]/15 flex items-center justify-center text-4xl border border-[var(--border-gold)]/20 shadow">
                🐾
              </div>
              <h3 className="font-serif text-xl font-bold text-[#FFD700] uppercase tracking-wider">
                The Mount: {deity.identity.mount}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-md font-sans">
                The mount represents the animal instinct or force of nature controlled and ridden by the deity. Riding it shows supremacy over physical drives and integration of cosmic elements.
              </p>
            </div>

          </div>
        </MuseumSlideFrame>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. FAMILY & RELATIONS (Slide 7: lineage Tree Left, text Right)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 px-4 md:px-8 max-w-[1600px] mx-auto z-10 border-b border-[var(--border-gold)]/10">
        <MuseumSlideFrame>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Left: Lineage Tree Web */}
            <div className="flex justify-center bg-white/5 dark:bg-black/25 p-4 rounded-xl border border-[var(--border-gold)]/25 relative overflow-hidden">
              <svg className="w-full max-w-[360px] h-[220px] text-[var(--accent-gold)]" viewBox="0 0 300 220" fill="none">
                <rect width="100%" height="100%" fill="none" />
                {/* Nodes and Links */}
                {deity.relationships.family.map((rel, idx) => {
                  const angle = (idx * 2 * Math.PI) / deity.relationships.family.length;
                  const targetX = 150 + Math.cos(angle) * 90;
                  const targetY = 110 + Math.sin(angle) * 70;
                  return (
                    <g key={idx}>
                      <line x1="150" y1="110" x2={targetX} y2={targetY} stroke="rgba(212, 160, 23, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                      <g 
                        transform={`translate(${targetX - 35}, ${targetY - 18})`}
                        onClick={() => rel.slug && router.push(`/deities/${rel.slug}`)}
                        className={rel.slug ? "cursor-pointer" : ""}
                      >
                        <rect width="70" height="36" rx="4" fill={isDarkMode ? "#090410" : "#FAF6EE"} stroke="rgba(120,120,120,0.3)" strokeWidth="1" />
                        <text x="35" y="14" textAnchor="middle" fill="var(--text-primary)" fontSize="8" fontWeight="bold">{rel.name}</text>
                        <text x="35" y="26" textAnchor="middle" fill="var(--text-secondary)" fontSize="7" className="uppercase">{rel.relation}</text>
                      </g>
                    </g>
                  );
                })}
                {/* Central Core */}
                <circle cx="150" cy="110" r="22" fill="rgba(212, 160, 23, 0.2)" stroke="var(--accent-gold)" strokeWidth="1.5" />
                <text x="150" y="113" textAnchor="middle" fill="var(--text-primary)" fontSize="8.5" fontWeight="bold" fontFamily="var(--font-sanskrit)">
                  {deity.nameSanskrit}
                </text>
              </svg>
            </div>

            {/* Right: Relationship Description */}
            <div className="flex flex-col gap-4 select-text text-left">
              <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block">
                07 / Lineage Matrix
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-black text-white uppercase tracking-wider">
                Family & Cosmic Relations
              </h2>
              <div className="h-[2px] w-16 bg-[var(--accent-gold)] mt-1 mb-2" />
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                In cosmic history, family relationships are not biological, but represent the alignment and interactions of distinct universal energies. The consort is the active power (Shakti), and the children are the outputs of their cosmic union.
              </p>
              <ul className="list-disc pl-5 text-xs text-slate-400 flex flex-col gap-1.5 mt-2">
                {deity.relationships.family.map((rel, idx) => (
                  <li key={idx}>
                    <strong className="text-slate-200">{rel.name}</strong> ({rel.relation})
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </MuseumSlideFrame>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          9. TEMPLES (Slide 8 layout: split conclusion, text left, yatra right)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 px-4 md:px-8 max-w-[1600px] mx-auto z-10 border-b border-[var(--border-gold)]/10">
        <MuseumSlideFrame>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Left: Temple Information */}
            <div className="flex flex-col gap-4 select-text text-left">
              <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block">
                08 / Sacred Geography
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-black text-white uppercase tracking-wider">
                Pilgrimage Center & Shrines
              </h2>
              <div className="h-[2px] w-16 bg-[var(--accent-gold)] mt-1 mb-2" />
              
              <h3 className="font-serif text-lg font-bold text-[#FFD700] uppercase tracking-wide">
                {deity.geography[0].templeName} ({deity.geography[0].region})
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                {deity.geography[0].significance}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed font-sans italic border-l border-[var(--accent-gold)]/30 pl-4 py-0.5">
                Yatra route: {deity.geography[0].routeDescription}
              </p>
              <div className="mt-4">
                <a
                  href={deity.geography[0].mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4A017] to-[#B8860B] text-black font-extrabold text-xs uppercase tracking-wider shadow hover:shadow-[0_0_15px_rgba(212,160,23,0.3)] transition-all inline-block"
                >
                  Get Directions &rarr;
                </a>
              </div>
            </div>

            {/* Right: Temple Illustration / Map */}
            <div className="flex justify-center relative">
              <div className="relative w-80 h-64 md:w-[440px] md:h-[300px] rounded-xl overflow-hidden border border-[var(--border-gold)]/40 shadow-2xl bg-black/40 p-1">
                <SacredImage 
                  src="" 
                  alt="Sacred place depiction" 
                  className="w-full h-full object-cover rounded" 
                  fallbackText="🛕"
                  type="temple"
                />
                <div className="absolute bottom-4 left-4 bg-black/75 px-3 py-1.5 rounded border border-[var(--border-gold)]/30 text-[9px] uppercase tracking-wider font-mono text-[var(--accent-gold)]">
                  📍 {deity.geography[0].coordinates}
                </div>
              </div>
            </div>

          </div>
        </MuseumSlideFrame>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          10. MANTRAS (Slide composition, centering chants)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 px-4 md:px-8 max-w-[1600px] mx-auto z-10 border-b border-[var(--border-gold)]/10">
        <MuseumSlideFrame>
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 md:gap-12 items-center">
            
            {/* Left: Mantra details and word breakdown */}
            <div className="flex flex-col gap-6 select-text text-left">
              <div>
                <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block">
                  09 / Sacred Vibrations
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-black text-white uppercase tracking-wider mt-1">
                  Primary Mantras & Breakdown
                </h2>
                <div className="h-[2px] w-16 bg-[var(--accent-gold)] mt-2" />
              </div>

              <div className="p-6 rounded-xl bg-white/5 dark:bg-black/45 border border-[var(--border-gold)]/20 text-center">
                <p className="font-sanskrit text-lg md:text-2xl text-[var(--accent-gold)] font-bold whitespace-pre-line leading-relaxed">
                  {deity.mantras[0].text}
                </p>
                <p className="text-xs text-slate-400 italic mt-2.5">
                  {deity.mantras[0].transliteration}
                </p>
              </div>

              {/* Word breakdowns */}
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-mono font-bold tracking-widest block mb-3">
                  Word-by-Word Meanings:
                </span>
                <div className="flex flex-wrap gap-2">
                  {deity.mantras[0].breakdown.map((item, wIdx) => {
                    const isHovered = hoveredMantraWord === `m-${wIdx}`;
                    return (
                      <div
                        key={wIdx}
                        onMouseEnter={() => setHoveredMantraWord(`m-${wIdx}`)}
                        onMouseLeave={() => setHoveredMantraWord(null)}
                        className={`relative px-3 py-1.5 rounded border transition-all cursor-default text-xs
                          ${isHovered 
                            ? "bg-[var(--accent-gold)] border-[#FFD700] text-black shadow-md font-bold" 
                            : "bg-white/5 border-[var(--border-gold)]/20 text-slate-300"}`}
                      >
                        <span>{item.word}</span>
                        
                        {/* Tooltip */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.95 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded bg-black text-white text-[10px] border border-[var(--border-gold)] text-center leading-normal z-30 shadow-xl"
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
            </div>

            {/* Right: Sound synthesizer box */}
            <div className="flex justify-center">
              <div className="w-80 p-6 rounded-2xl border border-[var(--border-gold)]/40 bg-gradient-to-br from-[#100718] to-[#04010a] text-center flex flex-col items-center gap-4 shadow-2xl relative overflow-hidden">
                <div className="absolute top-[-30%] left-[-30%] w-[160%] h-[160%] bg-[radial-gradient(circle,rgba(212,160,23,0.15)_0%,transparent_50%)] pointer-events-none" />
                <DiyaFlame intensity={ambientActive ? "aarti" : "normal"} />
                <h4 className="font-serif text-base font-extrabold text-white mt-2">
                  Meditative Chants
                </h4>
                <p className="text-[10px] text-slate-400 max-w-[200px] leading-normal mx-auto font-sans">
                  Trigger the customized synthesized sound frequencies matching their cosmic energy.
                </p>
                <div className="flex flex-col gap-2 w-full mt-4">
                  <button
                    onClick={toggleAmbient}
                    className={`py-2.5 w-full rounded border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2
                      ${ambientActive 
                        ? "bg-[#D4A017] border-[#FFE485] text-black" 
                        : "bg-white/5 border-[var(--border-gold)]/40 text-[var(--accent-gold)]"}`}
                  >
                    {ambientActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    <span>{ambientActive ? "Stop Drone" : "Start Drone"}</span>
                  </button>
                  <button
                    onClick={triggerBellSound}
                    className="py-2.5 w-full rounded border border-[var(--border-gold)] bg-transparent text-[var(--accent-gold)] hover:bg-white/5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    🔔 Ring Temple Bell
                  </button>
                </div>
              </div>
            </div>

          </div>
        </MuseumSlideFrame>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          11. FESTIVALS (Sacred Cycles calendar grid)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 px-4 md:px-8 max-w-[1600px] mx-auto z-10 border-b border-[var(--border-gold)]/10 text-center">
        <MuseumSlideFrame>
          <div className="mb-12 flex flex-col items-center">
            <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block mb-1">
              10 / Sacred Cycles
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-black text-white uppercase tracking-wider">
              Lunar Festivals & Celebrations
            </h2>
            <div className="h-[2px] w-24 bg-[var(--accent-gold)] mt-2" />
          </div>

          <div className="max-w-4xl mx-auto flex flex-col gap-4 text-left">
            {deity.festivals.map((fest, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-[var(--border-gold)]/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 shadow"
              >
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                      {fest.name}
                    </h3>
                    <span className="text-[9px] bg-[var(--accent-gold)]/20 px-2.5 py-0.5 rounded text-[var(--accent-gold)] font-mono font-bold uppercase">
                      🌗 {fest.lunarDate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {fest.description}
                  </p>
                </div>
                <div className="w-full md:w-[30%] border-t md:border-t-0 md:border-l border-[var(--border-gold)]/20 pt-3 md:pt-0 pl-0 md:pl-4 flex flex-col gap-1">
                  <span className="text-[9px] text-[var(--accent-saffron)] uppercase font-mono font-bold tracking-widest block">
                    Customs & Rites
                  </span>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans italic">
                    {fest.regionalVariations}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MuseumSlideFrame>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          12. SCRIPTURE REFERENCES (Textual Authority nodes map)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 px-4 md:px-8 max-w-[1600px] mx-auto z-10 border-b border-[var(--border-gold)]/10">
        <MuseumSlideFrame>
          <div className="text-center mb-12 flex flex-col items-center">
            <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block mb-1">
              11 / Textual Authority
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-black text-white uppercase tracking-wider">
              Scripture Reference Connections
            </h2>
            <div className="h-[2px] w-24 bg-[var(--accent-gold)] mt-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 items-center bg-white/5 dark:bg-black/20 p-6 md:p-8 rounded-xl border border-[var(--border-gold)]/25">
            {/* Left: network SVG */}
            <div className="flex justify-center">
              <svg className="w-full max-w-[320px] h-[280px]" viewBox="0 0 300 300">
                <circle cx="150" cy="150" r="100" stroke="rgba(212, 160, 23, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
                {deity.scriptures.map((item, idx) => {
                  const angle = (idx * 2 * Math.PI) / deity.scriptures.length;
                  const targetX = 150 + Math.cos(angle) * 100;
                  const targetY = 150 + Math.sin(angle) * 100;
                  const isActive = activeScriptureNode === item.category;
                  return (
                    <g key={idx}>
                      <line x1="150" y1="150" x2={targetX} y2={targetY} stroke={isActive ? "var(--accent-gold)" : "rgba(212,160,23,0.2)"} strokeWidth={isActive ? 1.5 : 0.5} />
                      <circle 
                        cx={targetX} 
                        cy={targetY} 
                        r="16" 
                        onClick={() => { playClick(); setActiveScriptureNode(item.category); }}
                        fill={isActive ? "var(--accent-gold)" : isDarkMode ? "#0c0615" : "#FAF6EE"} 
                        stroke="var(--border-gold)" 
                        strokeWidth="1"
                        className="cursor-pointer"
                      />
                      <text x={targetX} y={targetY + 3} textAnchor="middle" fill={isActive ? "black" : "var(--text-primary)"} fontSize="6" fontWeight="bold">
                        {item.category.slice(0, 5)}
                      </text>
                    </g>
                  );
                })}
                <circle cx="150" cy="150" r="20" fill="rgba(212, 160, 23, 0.2)" stroke="var(--accent-gold)" strokeWidth="1" />
                <text x="150" y="153" textAnchor="middle" fill="var(--text-primary)" fontSize="7" fontWeight="bold">ॐ</text>
              </svg>
            </div>

            {/* Right: details info */}
            <div className="flex flex-col gap-4 text-left select-text">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScriptureNode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between border-b border-[var(--border-gold)]/20 pb-2">
                    <span className="text-[9px] bg-[var(--accent-gold)]/20 px-2.5 py-0.5 rounded text-[var(--accent-gold)] font-mono font-bold uppercase tracking-wider">
                      {activeScripture.category}
                    </span>
                    <span className="text-xs font-serif font-extrabold text-white">
                      {activeScripture.title}
                    </span>
                  </div>
                  <div className="bg-[var(--bg-primary)] p-4 rounded-lg border border-[var(--border-gold)]/20 text-center italic">
                    <p className="font-sanskrit text-sm md:text-base text-[var(--accent-gold)] font-bold whitespace-pre-line leading-relaxed">
                      {activeScripture.quote}
                    </p>
                    <div className="h-[1px] w-12 bg-[var(--border-gold)]/30 mx-auto my-1.5" />
                    <p className="text-[11px] text-slate-300">
                      &ldquo;{activeScripture.quoteTranslation}&rdquo;
                    </p>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {activeScripture.connection}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </MuseumSlideFrame>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          13. GALLERY (Museum Framed Grid)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 px-4 md:px-8 max-w-[1600px] mx-auto z-10 border-b border-[var(--border-gold)]/10 text-center">
        <MuseumSlideFrame>
          <div className="mb-12 flex flex-col items-center">
            <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block mb-1">
              12 / Sacred Art
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-black text-white uppercase tracking-wider">
              Rare Manuscripts & Sculptures
            </h2>
            <div className="h-[2px] w-24 bg-[var(--accent-gold)] mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {deity.gallery.map((item, idx) => (
              <div
                key={idx}
                onClick={() => { playClick(); setSelectedGalleryItem(item); }}
                className="p-5 rounded-xl border-double border-4 border-[var(--border-gold)]/20 bg-white/5 dark:bg-[#0c0615]/40 backdrop-blur-md cursor-pointer hover:scale-[1.03] transition-transform duration-300 flex flex-col text-left justify-between"
              >
                <div className="w-full h-40 rounded-lg bg-black/30 flex items-center justify-center border border-[var(--border-gold)]/15 mb-4 overflow-hidden relative group">
                  <SacredImage src="" alt={item.title} className="w-full h-full object-cover" fallbackText="🎨" type="deity" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Maximize2 className="w-6 h-6 text-[#FFD700]" />
                  </div>
                </div>
                <div>
                  <span className="text-[8px] bg-[var(--accent-gold)]/10 px-2 py-0.5 rounded text-[var(--accent-gold)] font-mono font-bold block w-fit mb-1.5 uppercase">
                    {item.type}
                  </span>
                  <h4 className="font-serif text-sm font-extrabold text-white">
                    {item.title}
                  </h4>
                  <span className="text-[9px] text-[var(--accent-saffron)] font-mono block mt-1">
                    {item.origin}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Lightbox */}
          <AnimatePresence>
            {selectedGalleryItem && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedGalleryItem(null)}
                  className="absolute inset-0 bg-black/95 backdrop-blur-md"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full max-w-2xl rounded-2xl border-double border-4 border-[var(--border-gold)] p-6 z-10 max-h-[90vh] overflow-y-auto bg-[#0b0514] text-white"
                >
                  <button 
                    onClick={() => setSelectedGalleryItem(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex flex-col gap-5 text-center items-center mt-4 select-text">
                    <div className="w-44 h-44 rounded-full bg-black/30 border-2 border-[var(--accent-gold)] flex items-center justify-center p-2">
                      <SacredImage src="" alt={selectedGalleryItem.title} className="w-full h-full object-cover rounded-full" fallbackText="🕉️" type="deity" />
                    </div>
                    <div>
                      <span className="text-[10px] bg-[var(--accent-gold)]/20 px-3 py-1 rounded-full text-[var(--accent-gold)] font-mono font-bold uppercase">
                        {selectedGalleryItem.type}
                      </span>
                      <h3 className="font-serif text-xl font-extrabold mt-3">
                        {selectedGalleryItem.title}
                      </h3>
                      <span className="text-[11px] text-[var(--accent-saffron)] font-mono font-bold block mt-1.5">
                        🏛️ {selectedGalleryItem.origin}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-xl font-sans mt-1">
                      {selectedGalleryItem.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </MuseumSlideFrame>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          14. RELATED DEITIES (Slide 9 layout: massive glowing golden crescent/solar eclipse ring)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-24 px-4 md:px-8 max-w-[1600px] mx-auto z-10 select-none">
        
        {/* Slide 9 Crescent Ring Showcase */}
        <div className="relative border-double border-4 border-[var(--border-gold)]/40 bg-[#060309] rounded-2xl p-16 text-center flex flex-col items-center justify-center min-h-[460px] shadow-3xl overflow-hidden">
          
          {/* Glowing Golden Solar Crescent/Eclipse Ring */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[480px] md:h-[480px] z-0 pointer-events-none opacity-60 flex items-center justify-center">
            {/* Massive concentric golden ring representing the solar arc */}
            <div className="absolute w-full h-full rounded-full border border-[var(--accent-gold)]/35 animate-spin-slow" />
            <div className="absolute inset-8 rounded-full border-[2px] border-[var(--accent-gold)]/20" />
            <div className="absolute inset-20 rounded-full border border-dashed border-[var(--accent-gold)]/15" />
            <div className="absolute inset-32 rounded-full bg-gradient-to-tr from-[var(--accent-gold)]/10 to-[#FF9100]/20 filter blur-3xl" />
          </div>

          {/* Seeker corner filigrees matching final slide */}
          <div className="absolute bottom-4 left-4 font-mono text-[8px] text-slate-500 uppercase tracking-widest">
            AUM TAT SAT • ACTIVE CONSCIOUSNESS
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[8px] text-slate-500 uppercase tracking-widest">
            SANATAN DHARMA ECOSYSTEM
          </div>

          <div className="z-10 max-w-2xl select-text">
            <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold block mb-3">
              Seeker&apos;s Gateways
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              The Inner Sanctum is Unlocked
            </h2>
            <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent mx-auto mt-4 mb-4" />
            <p className="text-xs md:text-sm text-slate-300 max-w-md mx-auto leading-relaxed mt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] font-serif italic">
              &ldquo;May the formless absolute residing within your heart guide your paths of study and action.&rdquo;
            </p>
          </div>

          <div className="z-10 flex flex-col sm:flex-row gap-4 w-full justify-center mt-10">
            <button
              onClick={() => { playNavigate(); router.push("/library"); }}
              className="px-6 py-3 rounded-lg border border-[var(--border-gold)] text-[var(--accent-gold)] hover:bg-[var(--border-gold)]/15 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg bg-black/40"
            >
              Browse Library Scriptures
            </button>
            <button
              onClick={() => { playNavigate(); router.push("/temples"); }}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#D4A017] via-[#FFB300] to-[#B8860B] text-black hover:shadow-[0_0_20px_rgba(212,160,23,0.45)] text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg"
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
