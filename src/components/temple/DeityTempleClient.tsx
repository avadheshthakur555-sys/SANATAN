"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import DiyaFlame from "../ui/DiyaFlame";
import TempleDoor from "../ui/TempleDoor";
import GoldParticleField from "../effects/GoldParticleField";
import SacredImage from "../ui/SacredImage";
import RelatedContentDiscovery from "../layout/RelatedContentDiscovery";
import Breadcrumb from "../ui/Breadcrumb";
import NextReading, { NextReadItem } from "../ui/NextReading";

export interface DeityDetail {
  heroImage?: string;
  templeImage?: string;
  gallery?: string[];
  relatedScriptures?: string[];
  slug: string;
  nameEnglish: string;
  nameSanskrit: string;
  role: string;
  consort: string;
  attributes: string[];
  description: string;
  mantra: string;
  mantraTrans: string;
  mantraMeaning: string;
  storyTitle: string;
  storyText: string;
  temples: string[];
  
  // Expanded Experience Info
  templeTimeline: { year: string; event: string; details: string }[];
  festivals: string[];
  pilgrimages: { name: string; state: string; coords: [number, number]; significance: string }[];
  symbols: { name: string; icon: string; description: string }[];
  bgGradient: string;
}

interface DeityTempleClientProps {
  deity: DeityDetail;
}

export default function DeityTempleClient({ deity }: DeityTempleClientProps) {
  const [aartiActive, setAartiActive] = useState(false);
  const [mantraActive, setMantraActive] = useState(false);
  const [activePilgrimageIdx, setActivePilgrimageIdx] = useState(0);
  const [bellRinging, setBellRinging] = useState(false);
  
  const aartiIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Ref-based audio nodes for drone control
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  const getNextReadItems = (): NextReadItem[] => {
    const s = deity.slug.toLowerCase();
    const items: NextReadItem[] = [];
    
    if (s === "shiva") {
      items.push({
        category: "Sacred Places",
        titleEnglish: "12 Jyotirlingas",
        titleSanskrit: "द्वादश ज्योतिर्लिङ्गानि",
        description: "Explore the 12 sacred self-manifested shrines of Lord Shiva across India.",
        href: "/jyotirlinga"
      });
      items.push({
        category: "Deities",
        titleEnglish: "Lord Ganesha",
        titleSanskrit: "गणेश",
        description: "Discover the Remover of Obstacles, son of Shiva and Parvati.",
        href: "/deities/ganesha"
      });
      items.push({
        category: "Scriptures",
        titleEnglish: "Bhagavad Gita",
        titleSanskrit: "श्रीमद्भगवद्गीता",
        description: "Study the divine dialogue on duty, meditation, and ultimate reality.",
        href: "/library/gita/chapter/1"
      });
    } else if (s === "vishnu" || s === "rama" || s === "krishna") {
      items.push({
        category: "Scriptures",
        titleEnglish: "Bhagavad Gita",
        titleSanskrit: "श्रीमद्भगवद्गीता",
        description: "Study the divine dialogue spoken by Lord Krishna on the battlefield of Kurukshetra.",
        href: "/library/gita/chapter/1"
      });
      items.push({
        category: "Sacred Places",
        titleEnglish: "Char Dham Pilgrimage",
        titleSanskrit: "चार धाम",
        description: "Learn about the four holy abodes of Lord Vishnu establishing the cardinal directions of Bharat.",
        href: "/temples?filter=Char Dham"
      });
      items.push({
        category: "Deities",
        titleEnglish: s === "krishna" ? "Lord Rama" : "Lord Krishna",
        titleSanskrit: s === "krishna" ? "राम" : "कृष्ण",
        description: s === "krishna" 
          ? "Explore the life of the seventh avatar of Lord Vishnu, Rama." 
          : "Explore the life of the eighth avatar of Lord Vishnu, Krishna.",
        href: s === "krishna" ? "/deities/rama" : "/deities/krishna"
      });
    } else {
      items.push({
        category: "Sages",
        titleEnglish: "Ancient Rishis & Sages",
        titleSanskrit: "ऋषयः",
        description: "Meet the seers who compiled the Vedas, Upanishads, and other sacred systems.",
        href: "/sages"
      });
      items.push({
        category: "Timeline",
        titleEnglish: "Sacred Timeline",
        titleSanskrit: "इतिहास कालचक्र",
        description: "Trace the history and evolution of Sanatan teachings through major eras.",
        href: "/history"
      });
      items.push({
        category: "Atlas",
        titleEnglish: "Sacred Bharat Map",
        titleSanskrit: "तीर्थ क्षेत्र",
        description: "Visualize all holy energy points, temples, and rivers on the Sacred Atlas.",
        href: "/temples"
      });
    }
    return items;
  };


  // Web Audio Synthesizer: Resonant metallic copper temple bell
  const triggerBellSound = () => {
    if (typeof window === "undefined") return;
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 800);

    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Resonant frequency peaks for high quality bell chime
      const freqs = [220, 440, 554.37, 659.25, 880, 1200, 1760];
      const gains = [0.8, 1.0, 0.6, 0.5, 0.35, 0.2, 0.1];
      const decays = [2.5, 2.0, 1.6, 1.2, 0.8, 0.5, 0.2];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.4, now);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
      masterGain.connect(ctx.destination);

      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        // Alternating types models the rich texture of bell alloys
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
      console.warn("Web Audio API not supported or blocked by browser policies.");
    }
  };

  // Start continuous rhythmic aarti bells
  const startAartiLoop = () => {
    triggerBellSound();
    aartiIntervalRef.current = setInterval(() => {
      triggerBellSound();
    }, 1200);
  };

  const stopAartiLoop = () => {
    if (aartiIntervalRef.current) {
      clearInterval(aartiIntervalRef.current);
      aartiIntervalRef.current = null;
    }
  };

  const toggleAarti = () => {
    if (aartiActive) {
      stopAartiLoop();
      setAartiActive(false);
    } else {
      startAartiLoop();
      setAartiActive(true);
    }
  };

  // Synthesize meditative vocal drone (Om frequency)
  const startMantraDrone = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
      const now = ctx.currentTime;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.2, now + 1.5);
      masterGain.connect(ctx.destination);
      droneGainRef.current = masterGain;

      // Low pass filter to make the drone warm and soothing
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(250, now);
      filter.connect(masterGain);

      // Fundamental frequency representing cosmic AUM (approx 136.1 Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(136.1, now);
      osc1.connect(filter);
      osc1.start(now);
      osc1Ref.current = osc1;

      // Harmony / Detune for chorus effect
      const osc2 = ctx.createOscillator();
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(136.6, now); // Slightly detuned
      osc2.connect(filter);
      osc2.start(now);
      osc2Ref.current = osc2;

    } catch (e) {
      console.warn(e);
    }
  };

  const stopMantraDrone = () => {
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
        }, 800);
      } catch (e) {}
    }
    audioCtxRef.current = null;
    droneGainRef.current = null;
    osc1Ref.current = null;
    osc2Ref.current = null;
  };

  const toggleMantra = () => {
    if (mantraActive) {
      stopMantraDrone();
      setMantraActive(false);
    } else {
      startMantraDrone();
      setMantraActive(true);
    }
  };

  // Clean up sound loops on unmount
  useEffect(() => {
    return () => {
      stopAartiLoop();
      stopMantraDrone();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] select-text overflow-x-hidden relative">
      {/* 1. Temple Opening Door Overlay */}
      <TempleDoor />

      {/* Gold particle system overlay for high visual immersion */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <GoldParticleField />
      </div>

      {/* Background cinematic gradient overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none z-0 transition-all duration-1000"
        style={{ background: deity.bgGradient }}
      />

      {/* Universal Breadcrumb */}
      <div className="relative z-20">
        <Breadcrumb items={[{ label: "Deities", href: "/deities" }, { label: deity.nameEnglish }]} />
      </div>

      {/* 2. Full-Width Cinematic Hero Block */}
      <section className="relative w-full h-[60vh] flex items-center justify-center border-b border-[var(--border-gold)]/30 overflow-hidden hero-cosmic select-none">
        {deity.heroImage && (
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <SacredImage 
              src={deity.heroImage} 
              alt={deity.nameEnglish} 
              className="w-full h-full object-cover opacity-35 filter brightness-75 contrast-125"
              fallbackText={deity.nameEnglish}
              type="deity"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030204]/40 via-transparent to-[var(--bg-primary)]" />
          </div>
        )}
        
        {/* Sacred Concentric Rings relocated behind the title text */}

        {/* Floating hanging brass bells */}
        <div className="absolute top-0 left-12 md:left-24 lg:left-48 flex flex-col items-center origin-top animate-bounce" style={{ animationDuration: "5s" }}>
          <div className="w-1 h-32 bg-[#D4A01760]"></div>
          <button 
            onClick={triggerBellSound}
            className={`w-12 h-16 bg-[#D4A017] hover:bg-[#FFD700] rounded-b-full shadow-lg border-x-4 border-b-4 border-[#8B6508] cursor-pointer transition-transform relative outline-none flex items-center justify-center ${bellRinging ? "rotate-12 duration-100" : "duration-500"}`}
            title="Click to ring the temple bell"
          >
            <div className="w-3 h-3 rounded-full bg-[#8B6508] absolute bottom-[-4px]"></div>
          </button>
        </div>

        <div className="absolute top-0 right-12 md:right-24 lg:right-48 flex flex-col items-center origin-top animate-bounce" style={{ animationDuration: "6.5s" }}>
          <div className="w-1 h-24 bg-[#D4A01760]"></div>
          <button 
            onClick={triggerBellSound}
            className={`w-10 h-14 bg-[#D4A017] hover:bg-[#FFD700] rounded-b-full shadow-lg border-x-4 border-b-4 border-[#8B6508] cursor-pointer transition-transform relative outline-none flex items-center justify-center ${bellRinging ? "-rotate-12 duration-100" : "duration-500"}`}
            title="Ring bell"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#8B6508] absolute bottom-[-3px]"></div>
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center flex flex-col items-center gap-4 px-4 max-w-2xl mt-12">
          <Link
            href="/deities"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-gold)]/40 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] rounded-full hover:bg-[var(--border-gold)]/10 transition-all no-underline font-semibold text-[10px] uppercase tracking-widest cursor-pointer mb-2"
          >
            ← Back to Deities
          </Link>
          <div className="relative my-2 py-4 w-full flex items-center justify-center">
            {/* Sacred Concentric Rings centered behind the Sanskrit name */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 z-0 pointer-events-none">
              <div className="concentric-circle concentric-circle-1" />
              <div className="concentric-circle concentric-circle-2" />
              <div className="concentric-circle concentric-circle-3" />
              <div className="concentric-circle concentric-circle-core flex items-center justify-center opacity-95">
                {/* Empty to avoid text overlap */}
              </div>
              {aartiActive && (
                <>
                  <div className="om-pulse-ring om-pulse-ring-1" />
                  <div className="om-pulse-ring om-pulse-ring-2" />
                  <div className="om-pulse-ring om-pulse-ring-3" />
                </>
              )}
            </div>

            {/* The Sanskrit name on top */}
            <span className="relative z-10 font-sanskrit text-5xl md:text-6xl text-[#FFD700] font-bold tracking-wide drop-shadow-[0_0_15px_rgba(212,160,23,0.5)]">
              {deity.nameSanskrit}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl text-[var(--text-primary)] font-serif font-bold uppercase tracking-wider mt-1 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
            {deity.nameEnglish}
          </h1>
          <p className="text-xs md:text-sm text-[#D4A017] uppercase tracking-widest font-mono font-bold">
            {deity.role}
          </p>
        </div>

        {/* Bottom fading mask */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none z-0"></div>
      </section>

      {/* 3. Immersive Altar Control Center */}
      <section className="max-w-6xl mx-auto px-4 w-full py-8 relative z-20">
        <div className="ag-glass-premium p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#D4A01730] relative overflow-hidden">
          
          {/* Diya Flame interactive zone */}
          <div className="flex flex-col items-center justify-center bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-gold)]/20 min-w-[200px]">
            <DiyaFlame 
              intensity={aartiActive ? "aarti" : "normal"} 
              onClick={triggerBellSound}
            />
            <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono tracking-widest mt-2 block text-center">
              Inner Sanctum Diya
            </span>
            <span className="text-[9px] text-[var(--accent-gold)] opacity-60 text-center block">
              Click Diya to ignite prayers
            </span>
          </div>

          {/* Interactive triggers */}
          <div className="flex-grow flex flex-col gap-4 text-center md:text-left">
            <h3 className="text-xl font-serif text-[var(--text-primary)] font-bold">Devotional Offerings</h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-md leading-relaxed">
              Engage with the deity&apos;s energy. Offer virtual prayers by sounding the copper bells, lighting the flame, or playing the sacred primordial mantra drone.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-2">
              <button 
                onClick={triggerBellSound}
                className="px-5 py-2.5 bg-gradient-to-r from-[#D4A017] to-[#B8860B] hover:from-[#FFD700] hover:to-[#D4A017] text-black font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg hover:shadow-[#D4A01730] transition-all transform hover:-translate-y-0.5 cursor-pointer active:translate-y-0 flex items-center gap-2"
              >
                🔔 Ring Bell
              </button>
              <button 
                onClick={toggleAarti}
                className={`px-5 py-2.5 text-xs uppercase tracking-wider font-bold rounded-lg border transition-all flex items-center gap-2 cursor-pointer ${aartiActive ? "bg-[#FF4D00] border-[#FF8C00] text-white shadow-[#FF4D0040] animate-pulse" : "bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] border-[var(--border-gold)]/40 text-[var(--accent-gold)]"}`}
              >
                🔥 {aartiActive ? "Perform Aarti (Active)" : "Offer Aarti"}
              </button>
              <button 
                onClick={toggleMantra}
                className={`px-5 py-2.5 text-xs uppercase tracking-wider font-bold rounded-lg border transition-all flex items-center gap-2 cursor-pointer ${mantraActive ? "bg-[#D4A017] border-[#FFD700] text-black shadow-[#D4A01740]" : "bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] border-[var(--border-gold)]/40 text-[var(--accent-gold)]"}`}
              >
                🧘 {mantraActive ? "Mantra Chanting (Active)" : "Chant Mantra"}
              </button>
            </div>
          </div>

          {/* Consort Info Box */}
          <div className="border-l border-[var(--border-gold)]/20 pl-0 md:pl-8 flex flex-col gap-2.5 w-full md:w-auto text-center md:text-left min-w-[200px]">
            <div>
              <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono tracking-widest block font-bold">Consort Energy</span>
              <span className="text-[var(--text-primary)] font-serif text-lg font-bold block mt-0.5">{deity.consort}</span>
            </div>
            <div>
              <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono tracking-widest block font-bold mb-1">Attributes</span>
              <div className="flex flex-wrap gap-1 w-full justify-center md:justify-start">
                {deity.attributes.map((attr) => (
                  <span key={attr} className="text-[10px] text-[var(--text-secondary)] bg-[var(--bg-secondary)] border border-[var(--border-gold)]/30 px-2 py-0.5 rounded">
                    {attr}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Details: Description & Mantra */}
      <section className="max-w-6xl mx-auto px-4 w-full py-6 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 relative z-20">
        
        {/* Description & Narrative */}
        <div className="ag-glass-premium p-6 md:p-8 flex flex-col gap-4">
          <h3 className="text-xs font-semibold text-[#D4A017] uppercase tracking-widest border-b border-[var(--border-gold)]/20 pb-2">
            Cosmic Essence • परिचय
          </h3>
          <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed select-text font-serif">
            {deity.description}
          </p>

          <h3 className="text-xs font-semibold text-[#D4A017] uppercase tracking-widest border-b border-[var(--border-gold)]/20 pb-2 mt-4">
            Sacred Legend • दिव्य कथा
          </h3>
          <div>
            <h4 className="text-[var(--text-primary)] font-serif text-lg font-bold mb-2">
              {deity.storyTitle}
            </h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed select-text">
              {deity.storyText}
            </p>
          </div>
          {deity.relatedScriptures && deity.relatedScriptures.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[var(--border-gold)]/20">
              <h4 className="text-[#D4A017] text-xs font-semibold uppercase tracking-widest mb-2 font-bold">Related Scriptures</h4>
              <div className="flex flex-wrap gap-2">
                {deity.relatedScriptures.map((scrip, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-[var(--bg-secondary)] border border-[var(--border-gold)]/30 text-[var(--accent-gold)] text-[10px] font-bold uppercase tracking-wider rounded">
                    📖 {scrip}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mantra Focus */}
        <div className="ag-glass-premium p-6 md:p-8 text-center flex flex-col gap-6 items-center justify-center border border-[#D4A01750]">
          <div className="text-left w-full border-b border-[#D4A01715] pb-2">
            <span className="text-xs font-semibold text-[#D4A017] uppercase tracking-widest block">
              Primordial Mantra • महामन्त्र
            </span>
          </div>
          
          <div className="flex-grow flex flex-col items-center justify-center gap-4 py-4">
            <p className="font-sanskrit text-3xl md:text-4xl text-[#FFD700] font-bold leading-normal whitespace-pre-line select-text drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">
              {deity.mantra}
            </p>
            <p className="text-sm text-[var(--text-secondary)] italic select-text tracking-wider">
              {deity.mantraTrans}
            </p>
          </div>

          <div className="text-xs md:text-sm text-[var(--text-secondary)] border-t border-[var(--border-gold)]/20 pt-4 w-full text-left leading-relaxed">
            <span className="font-bold text-[#D4A017] uppercase tracking-wider block mb-1">Mantra Meaning</span>
            &ldquo;{deity.mantraMeaning}&rdquo;
          </div>
        </div>
      </section>

      {/* 5. Divine Symbols Darshan Gallery */}
      <section className="max-w-6xl mx-auto px-4 w-full py-8 relative z-20">
        <h3 className="text-lg font-serif text-[#FFD700] uppercase tracking-widest mb-6 text-center">
          Divine Symbols • दिव्य आयुध
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deity.symbols.map((sym, idx) => (
            <div 
              key={idx} 
              className="ag-glass-premium p-6 flex flex-col items-center text-center gap-3 border border-[var(--border-gold)]/30 hover:border-[var(--accent-gold)]/60 transition-all"
            >
              <div className="text-4xl p-4 bg-[var(--bg-secondary)] border border-[var(--border-gold)]/30 rounded-full text-[#FFD700] w-20 h-20 flex items-center justify-center shadow-lg floating-idle" style={{ animationDelay: `${idx * 0.5}s` }}>
                {sym.icon}
              </div>
              <h4 className="text-[var(--text-primary)] font-serif text-base font-bold uppercase tracking-wider mt-2">
                {sym.name}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xs">
                {sym.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Pilgrimage Map & Route Atlas */}
      <section className="max-w-6xl mx-auto px-4 w-full py-8 relative z-20">
        <div className="ag-glass-premium p-6 md:p-8 border border-[#D4A01730]">
          <h3 className="text-xs font-semibold text-[#D4A017] uppercase tracking-widest border-b border-[#D4A01715] pb-2 mb-6">
            Pilgrimage Atlas • प्रमुख तीर्थ एवं देवस्थान
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
            {/* Interactive map display using vector SVG representation of India */}
            <div className="flex flex-col bg-[var(--bg-secondary)] border border-[var(--border-gold)]/30 rounded-xl p-4 relative min-h-[380px] justify-between overflow-hidden">
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono tracking-widest block font-bold">Pilgrimage Mapping</span>
                <span className="text-[var(--text-primary)] font-serif text-sm font-bold block">Bharat Sacred Coordinates</span>
              </div>

              {/* Simulated India Outline Map SVG */}
              <div className="flex-grow flex items-center justify-center p-4 relative z-0">
                <svg className="w-full max-w-[320px] h-[300px] text-[#D4A01720]" viewBox="0 0 200 240" fill="currentColor">
                  {/* Styled simplified shape of India */}
                  <path d="M100 10 L115 15 L125 30 L115 50 L125 60 L140 65 L155 80 L170 95 L180 110 L190 125 L160 130 L150 145 L130 150 L120 160 L110 180 L105 200 L100 230 L95 200 L90 180 L80 160 L70 150 L50 145 L40 130 L10 125 L20 110 L30 95 L45 80 L60 65 L75 60 L85 50 L75 30 L85 15 Z" />
                  
                  {/* Reference grids */}
                  <line x1="100" y1="0" x2="100" y2="240" stroke="rgba(212,160,23,0.05)" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="200" y2="120" stroke="rgba(212,160,23,0.05)" strokeDasharray="3 3" />

                  {/* Active temple locations marked as points */}
                  {deity.pilgrimages.map((p, idx) => {
                    // Map real latitudes/longitudes to layout coordinates
                    // Latitude range in India: ~8 to ~37, Longitude: ~68 to ~97
                    // Coordinates normalized for standard mapping display
                    const normalizedX = 30 + ((p.coords[1] - 68) / (97 - 68)) * 140;
                    const normalizedY = 210 - ((p.coords[0] - 8) / (37 - 8)) * 180;
                    
                    const isActive = activePilgrimageIdx === idx;
                    
                    return (
                      <g 
                        key={idx} 
                        className="cursor-pointer group outline-none focus:outline-none"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setActivePilgrimageIdx(idx);
                          }
                        }}
                        onClick={() => setActivePilgrimageIdx(idx)}
                      >
                        {isActive && (
                          <circle cx={normalizedX} cy={normalizedY} r="10" fill="#FF8C00" className="animate-ping opacity-35" />
                        )}
                        <circle 
                          cx={normalizedX} 
                          cy={normalizedY} 
                          r={isActive ? "5" : "3.5"} 
                          fill={isActive ? "#FFD700" : "#D4A017"} 
                          className="transition-all duration-300 stroke-[var(--bg-primary)] stroke-1 hover:fill-[#FFD700]" 
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Hotspots annotations */}
                {deity.pilgrimages.map((p, idx) => {
                  const normalizedX = 30 + ((p.coords[1] - 68) / (97 - 68)) * 140;
                  const normalizedY = 210 - ((p.coords[0] - 8) / (37 - 8)) * 180;
                  const isActive = activePilgrimageIdx === idx;

                  if (!isActive) return null;

                  return (
                    <div 
                      key={idx}
                      className="absolute bg-[var(--bg-primary)] border border-[var(--accent-gold)] p-2 rounded shadow-2xl text-[10px] text-[var(--text-primary)] z-10"
                      style={{
                        left: `${(normalizedX / 200) * 100}%`,
                        top: `${(normalizedY / 240) * 100 - 15}%`,
                        transform: "translate(-50%, -100%)",
                      }}
                    >
                      <span className="font-bold">{p.name}</span>
                    </div>
                  );
                })}
              </div>

              <div className="text-[9px] text-[#9CA3AF] text-center border-t border-[#D4A01710] pt-2">
                Click dots on the map to switch pilgrimage sites and view coordinates
              </div>
            </div>

            {/* Selected Pilgrimage details */}
            <div className="flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {deity.pilgrimages.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePilgrimageIdx(idx)}
                      className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold border rounded-lg transition-all cursor-pointer ${activePilgrimageIdx === idx ? "bg-[var(--border-gold)]/25 border-[var(--accent-gold)] text-[var(--accent-gold)]" : "bg-transparent border-[var(--border-gold)]/20 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>

                <div className="bg-[var(--bg-secondary)] border border-[var(--border-gold)]/30 rounded-xl p-6 flex flex-col gap-4 mt-2">
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono tracking-widest block font-bold">Selected Sanctum</span>
                      <h4 className="text-[var(--text-primary)] font-serif text-xl font-bold mt-0.5">
                        {deity.pilgrimages[activePilgrimageIdx].name}
                      </h4>
                    </div>
                    {deity.templeImage && (
                      <div className="w-full h-40 rounded-lg overflow-hidden border border-[var(--border-gold)]/20">
                        <SacredImage 
                          src={deity.templeImage} 
                          alt={deity.pilgrimages[activePilgrimageIdx].name} 
                          className="w-full h-full object-cover"
                          fallbackText={deity.pilgrimages[activePilgrimageIdx].name}
                          type="temple"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-y border-[var(--border-gold)]/20 py-3 text-xs">
                    <div>
                      <span className="text-[var(--text-secondary)] block font-mono">STATE</span>
                      <span className="text-[var(--text-primary)] font-bold block mt-0.5">{deity.pilgrimages[activePilgrimageIdx].state}</span>
                    </div>
                    <div>
                      <span className="text-[var(--text-secondary)] block font-mono">COORDINATES</span>
                      <span className="text-[var(--accent-gold)] font-bold block mt-0.5">
                        {deity.pilgrimages[activePilgrimageIdx].coords[0].toFixed(4)}° N, {deity.pilgrimages[activePilgrimageIdx].coords[1].toFixed(4)}° E
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono tracking-widest block font-bold mb-1">Spiritual Significance</span>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {deity.pilgrimages[activePilgrimageIdx].significance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Major festivals related to the Deity */}
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-gold)]/30 rounded-xl p-4 flex flex-col gap-2">
                <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono tracking-widest block font-bold border-b border-[var(--border-gold)]/20 pb-1.5 mb-1">
                  Major Festivals • उत्सव
                </span>
                <div className="flex flex-wrap gap-2">
                  {deity.festivals.map((fest) => (
                    <span 
                      key={fest} 
                      className="px-2.5 py-1 bg-[var(--bg-primary)] border border-[var(--border-gold)]/30 text-[var(--accent-saffron)] font-semibold text-xs rounded-full shadow-sm"
                    >
                      🎉 {fest}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Sacred Gallery • दिव्य दर्शन */}
      {deity.gallery && deity.gallery.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 w-full py-8 relative z-20 border-t border-[#D4A01715]">
          <h3 className="text-lg font-serif text-[#FFD700] uppercase tracking-widest mb-6 text-center">
            Sacred Gallery • दिव्य दर्शन
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {deity.gallery.map((imgUrl, index) => (
              <div key={index} className="ag-glass-premium p-2 border border-[#D4A01720] hover:border-[#FFD700] transition-all rounded-xl overflow-hidden group">
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden">
                  <SacredImage 
                    src={imgUrl} 
                    alt={`${deity.nameEnglish} Darshan ${index + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    fallbackText={`${deity.nameEnglish} Darshan`}
                    type="deity"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Temple Historical Timeline */}
      <section className="max-w-6xl mx-auto px-4 w-full py-8 relative z-20">
        <h3 className="text-lg font-serif text-[#FFD700] uppercase tracking-widest mb-8 text-center">
          Temple History Timeline • ऐतिहासिक घटनाक्रम
        </h3>

        <div className="relative border-l border-[#D4A01730] ml-4 md:ml-8 pl-6 md:pl-8 flex flex-col gap-8">
          {deity.templeTimeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline circle point */}
              <div className="absolute -left-[35px] md:-left-[43px] top-1.5 w-4 h-4 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-gold)] group-hover:bg-[#FFD700] transition-colors flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] group-hover:bg-[var(--bg-primary)] transition-colors" />
              </div>

              <div className="ag-glass-premium p-6 border border-[var(--border-gold)]/20 hover:border-[var(--border-gold)]/40 transition-all flex flex-col gap-2">
                <span className="text-[#FF8C00] font-mono text-sm font-bold tracking-wider">
                  {item.year}
                </span>
                <h4 className="text-[var(--text-primary)] font-serif text-base font-bold">
                  {item.event}
                </h4>
                <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Next Recommended Journey */}
      <NextReading items={getNextReadItems()} />

      {/* Related Content Discovery section */}
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
