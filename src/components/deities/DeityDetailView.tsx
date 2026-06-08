"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  GraduationCap, 
  Compass, 
  Smile, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Info,
  MapPin,
  Calendar,
  Layers,
  Award,
  Link2,
  Bell,
  Sun,
  Flame,
  ArrowRight,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import { DEITIES_DATA, DeityDetail, DeityEpisode, ScholarVerse, DeityFamilyRelation } from "@/lib/deities-data";
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

// Localization Dictionary
const LOCALIZATION = {
  EN: {
    backDir: "Back to Directory",
    backEncy: "Back to Encyclopaedia",
    whoTheyAre: "Who They Are",
    names: "Sacred Names",
    sanskritName: "Sanskrit Name",
    meaning: "Cosmic Meaning",
    role: "Cosmic Role",
    divineFunc: "Divine Function",
    vehicle: "Divine Vehicle",
    weapons: "Weapons",
    objects: "Sacred Objects",
    divineDomain: "Divine Domain",
    originStory: "Origin & Ascent",
    episodes: "Sacred Legends",
    teachings: "Eternal Teachings",
    familyTree: "Cosmic Lineage",
    scriptures: "Associated Scriptures",
    temples: "Sacred Temples",
    festivals: "Major Festivals",
    mantras: "Primary Mantras",
    meditation: "Meditation Essence",
    storyMode: "Story Mode",
    scholarMode: "Scholar Mode",
    visualMode: "Visual Mode",
    kidsMode: "Kids Mode",
    moral: "Moral Lesson",
    funFacts: "Fun Facts",
    bellTitle: "Ring Temple Bell",
    aartiTitle: "Perform Aarti",
    droneTitle: "Vedic Drone",
    active: "Active",
    offering: "Inner Sanctum Altar",
    interactiveHelp: "Click below to sound the temple bells or ignite the sacred flame."
  },
  HI: {
    backDir: "निर्देशिका पर वापस",
    backEncy: "विश्वकोश पर वापस",
    whoTheyAre: "वे कौन हैं",
    names: "पवित्र नाम",
    sanskritName: "संस्कृत नाम",
    meaning: "ब्रह्मांडीय अर्थ",
    role: "ब्रह्मांडीय भूमिका",
    divineFunc: "दिव्य कार्य",
    vehicle: "दिव्य वाहन",
    weapons: "अस्त्र-शस्त्र",
    objects: "पवित्र वस्तुएं",
    divineDomain: "दिव्य क्षेत्र",
    originStory: "उत्पत्ति और प्रभाव",
    episodes: "दिव्य कथाएँ",
    teachings: "शाश्वत शिक्षाएँ",
    familyTree: "पारिवारिक वंशवृक्ष",
    scriptures: "सम्बद्ध ग्रन्थ",
    temples: "प्रमुख मन्दिर",
    festivals: "मुख्य उत्सव",
    mantras: "महामन्त्र",
    meditation: "ध्यान स्वरूप",
    storyMode: "कथा मोड",
    scholarMode: "विद्वान मोड",
    visualMode: "दृश्य मोड",
    kidsMode: "बाल मोड",
    moral: "नैतिक शिक्षा",
    funFacts: "रोचक तथ्य",
    bellTitle: "घंटी बजाएं",
    aartiTitle: "आरती करें",
    droneTitle: "वैदिक सुर",
    active: "सक्रिय",
    offering: "गर्भगृह वेदी",
    interactiveHelp: "मन्दिर की घंटी बजाने या पवित्र दीया जलाने के लिए नीचे क्लिक करें।"
  },
  SA: {
    backDir: "निर्देशिकां प्रति",
    backEncy: "ज्ञानकोशं प्रति",
    whoTheyAre: "के ते",
    names: "पवित्र नामानि",
    sanskritName: "संस्कृत नाम",
    meaning: "ब्रह्माण्डीयार्थः",
    role: "ब्रह्माण्डभूमिका",
    divineFunc: "दिव्यकार्यम्",
    vehicle: "वाहनम्",
    weapons: "आयुधानि",
    objects: "पवित्रवस्तूनि",
    divineDomain: "दिव्य क्षेत्रम्",
    originStory: "उत्पत्ति कथा",
    episodes: "मुख्यप्रसङ्गाः",
    teachings: "शाश्वतशिक्षाः",
    familyTree: "पारिवारिकवंशवृक्षः",
    scriptures: "सम्बद्धग्रन्थाः",
    temples: "मन्दिराणि",
    festivals: "उत्सवाः",
    mantras: "महामन्त्राः",
    meditation: "ध्यान स्वरूपम्",
    storyMode: "आख्यान रूपम्",
    scholarMode: "पण्डित रूपम्",
    visualMode: "चित्र रूपम्",
    kidsMode: "बाल रूपम्",
    moral: "नैतिक पाठः",
    funFacts: "रोचक तथ्यानि",
    bellTitle: "घण्टानादः",
    aartiTitle: "आरती",
    droneTitle: "वैदिक नादः",
    active: "सक्रियम्",
    offering: "गर्भगृह वेदी",
    interactiveHelp: "घण्टानादं कर्तुं वा दीपं प्रज्वालयितुं अधः नुदन्तु।"
  }
};

const DEITY_STYLES: Record<string, {
  auricColor: string;
  glowIntensity: string;
  borderColor: string;
  bgDecorations: React.ReactNode;
}> = {
  shiva: {
    auricColor: "rgba(100, 180, 255, 0.25)",
    glowIntensity: "blur-[50px] shadow-[0_0_60px_rgba(100,180,255,0.3)]",
    borderColor: "border-sky-500/30",
    bgDecorations: (
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 flex items-center justify-center scale-150">
        <span className="font-sanskrit text-9xl">🔱</span>
      </div>
    )
  },
  vishnu: {
    auricColor: "rgba(30, 200, 180, 0.25)",
    glowIntensity: "blur-[50px] shadow-[0_0_60px_rgba(30,200,180,0.3)]",
    borderColor: "border-teal-500/30",
    bgDecorations: (
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 flex items-center justify-center scale-150">
        <span className="font-sanskrit text-9xl">🐚</span>
      </div>
    )
  },
  brahma: {
    auricColor: "rgba(255, 120, 100, 0.25)",
    glowIntensity: "blur-[50px] shadow-[0_0_60px_rgba(255,120,100,0.3)]",
    borderColor: "border-rose-400/30",
    bgDecorations: (
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 flex items-center justify-center scale-150">
        <span className="font-sanskrit text-9xl">🪷</span>
      </div>
    )
  },
  saraswati: {
    auricColor: "rgba(240, 248, 255, 0.35)",
    glowIntensity: "blur-[50px] shadow-[0_0_60px_rgba(240,248,255,0.4)]",
    borderColor: "border-slate-300/30",
    bgDecorations: (
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 flex items-center justify-center scale-150">
        <span className="font-sanskrit text-9xl">🪕</span>
      </div>
    )
  },
  lakshmi: {
    auricColor: "rgba(255, 215, 0, 0.3)",
    glowIntensity: "blur-[50px] shadow-[0_0_60px_rgba(255,215,0,0.45)]",
    borderColor: "border-amber-400/30",
    bgDecorations: (
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 flex items-center justify-center scale-150">
        <span className="font-sanskrit text-9xl">🪷</span>
      </div>
    )
  },
  parvati: {
    auricColor: "rgba(233, 30, 99, 0.25)",
    glowIntensity: "blur-[50px] shadow-[0_0_60px_rgba(233,30,99,0.3)]",
    borderColor: "border-pink-500/30",
    bgDecorations: (
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 flex items-center justify-center scale-150">
        <span className="font-sanskrit text-9xl">🏔️</span>
      </div>
    )
  },
  ganesha: {
    auricColor: "rgba(251, 146, 60, 0.3)",
    glowIntensity: "blur-[50px] shadow-[0_0_60px_rgba(251,146,60,0.4)]",
    borderColor: "border-orange-500/30",
    bgDecorations: (
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 flex items-center justify-center scale-150">
        <span className="font-sanskrit text-9xl">🐘</span>
      </div>
    )
  },
  kartikeya: {
    auricColor: "rgba(56, 189, 248, 0.25)",
    glowIntensity: "blur-[50px] shadow-[0_0_60px_rgba(56,189,248,0.3)]",
    borderColor: "border-sky-400/30",
    bgDecorations: (
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 flex items-center justify-center scale-150">
        <span className="font-sanskrit text-9xl">🦚</span>
      </div>
    )
  },
  hanuman: {
    auricColor: "rgba(234, 88, 12, 0.35)",
    glowIntensity: "blur-[50px] shadow-[0_0_60px_rgba(234,88,12,0.45)]",
    borderColor: "border-amber-600/30",
    bgDecorations: (
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 flex items-center justify-center scale-150">
        <span className="font-sanskrit text-9xl">🐒</span>
      </div>
    )
  },
  durga: {
    auricColor: "rgba(220, 38, 38, 0.3)",
    glowIntensity: "blur-[50px] shadow-[0_0_60px_rgba(220,38,38,0.45)]",
    borderColor: "border-red-500/30",
    bgDecorations: (
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 flex items-center justify-center scale-150">
        <span className="font-sanskrit text-9xl">🦁</span>
      </div>
    )
  },
  kali: {
    auricColor: "rgba(139, 92, 246, 0.3)",
    glowIntensity: "blur-[50px] shadow-[0_0_60px_rgba(139,92,246,0.5)]",
    borderColor: "border-purple-600/30",
    bgDecorations: (
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 flex items-center justify-center scale-150">
        <span className="font-sanskrit text-9xl">🩸</span>
      </div>
    )
  },
  rama: {
    auricColor: "rgba(245, 158, 11, 0.3)",
    glowIntensity: "blur-[50px] shadow-[0_0_60px_rgba(245,158,11,0.4)]",
    borderColor: "border-amber-500/30",
    bgDecorations: (
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 flex items-center justify-center scale-150">
        <span className="font-sanskrit text-9xl">🏹</span>
      </div>
    )
  },
  krishna: {
    auricColor: "rgba(34, 197, 94, 0.25)",
    glowIntensity: "blur-[50px] shadow-[0_0_60px_rgba(34,197,94,0.35)]",
    borderColor: "border-emerald-500/30",
    bgDecorations: (
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 flex items-center justify-center scale-150">
        <span className="font-sanskrit text-9xl">🪈</span>
      </div>
    )
  }
};

export default function DeityDetailView({ slug }: DeityDetailViewProps) {
  const router = useRouter();
  const deity = DEITIES_DATA[slug];
  const ds = DEITY_STYLES[slug] || {
    auricColor: "rgba(212, 160, 23, 0.15)",
    glowIntensity: "blur-[40px] shadow-[0_0_40px_rgba(212,160,23,0.2)]",
    borderColor: "border-[var(--border-gold)]/35",
    bgDecorations: null
  };
  const currentLang = useLanguageStore((state) => state.language);
  const { playClick, playNavigate } = useSacredSound();

  const [activeMode, setActiveMode] = useState<"story" | "scholar" | "visual" | "kids">("story");
  const [aartiActive, setAartiActive] = useState(false);
  const [mantraActive, setMantraActive] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);
  const [selectedEpisodeIdx, setSelectedEpisodeIdx] = useState(0);

  // Web Audio Context refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const aartiIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check dark mode state for styling
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

  // Clean up sounds on navigation
  useEffect(() => {
    return () => {
      stopAartiLoop();
      stopMantraDrone();
    };
  }, []);

  if (!deity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-[var(--bg-primary)]">
        <h2 className="text-2xl font-serif font-bold text-red-500 mb-2">Deity Profile Not Found</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">The requested deity profile could not be loaded.</p>
        <Link href="/deities" className="no-underline">
          <button className="px-5 py-2 border border-[var(--border-gold)] text-[var(--accent-gold)] rounded">
            Return to Deities Directory
          </button>
        </Link>
      </div>
    );
  }

  const t = LOCALIZATION[currentLang] || LOCALIZATION.EN;

  // Synthesis for metallic bell sound
  function triggerBellSound() {
    if (typeof window === "undefined") return;
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 500);

    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Pure copper alloy harmonic peaks
      const freqs = [261.63, 523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      const gains = [0.9, 1.0, 0.7, 0.5, 0.3, 0.15, 0.05];
      const decays = [2.2, 1.8, 1.4, 1.0, 0.7, 0.4, 0.15];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.35, now);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);
      masterGain.connect(ctx.destination);

      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        // Sine/Triangle mixes model warm metals
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

  // Aarti bell loop
  function startAartiLoop() {
    triggerBellSound();
    aartiIntervalRef.current = setInterval(() => {
      triggerBellSound();
    }, 1100);
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

  // Sound Om frequency drone (approx 136.1 Hz)
  function startMantraDrone() {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
      const now = ctx.currentTime;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.18, now + 1.2);
      masterGain.connect(ctx.destination);
      droneGainRef.current = masterGain;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(200, now);
      filter.connect(masterGain);

      // 136.1 Hz (Sitar tuning frequency / cosmic C#)
      const osc1 = ctx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(136.1, now);
      osc1.connect(filter);
      osc1.start(now);
      osc1Ref.current = osc1;

      // Soft detune harmony
      const osc2 = ctx.createOscillator();
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(136.5, now);
      osc2.connect(filter);
      osc2.start(now);
      osc2Ref.current = osc2;

    } catch (e) {
      console.warn("Drone audio blocked.");
    }
  }

  function stopMantraDrone() {
    const gain = droneGainRef.current;
    const ctx = audioCtxRef.current;
    if (ctx && gain) {
      const now = ctx.currentTime;
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.linearRampToValueAtTime(0, now + 0.5);
        setTimeout(() => {
          try {
            osc1Ref.current?.stop();
            osc2Ref.current?.stop();
            ctx.close();
          } catch (e) {}
        }, 600);
      } catch (e) {}
    }
    audioCtxRef.current = null;
    droneGainRef.current = null;
    osc1Ref.current = null;
    osc2Ref.current = null;
  }

  function toggleMantra() {
    playClick();
    if (mantraActive) {
      stopMantraDrone();
      setMantraActive(false);
    } else {
      startMantraDrone();
      setMantraActive(true);
    }
  }

  const getNextReadItems = (): NextReadItem[] => {
    const items: NextReadItem[] = [];
    if (deity.slug === "shiva") {
      items.push({
        category: "Sacred Shrines",
        titleEnglish: "12 Jyotirlingas",
        titleSanskrit: "द्वादश ज्योतिर्लिङ्गानि",
        description: "Explore the self-manifested pillars of Lord Shiva across the sacred land.",
        href: "/jyotirlinga"
      });
      items.push({
        category: "Deities",
        titleEnglish: "Lord Ganesha",
        titleSanskrit: "गणेश",
        description: "Explore the Remover of Obstacles, Ganesha's profile.",
        href: "/deities/ganesha"
      });
    } else if (deity.slug === "vishnu" || deity.slug === "krishna" || deity.slug === "rama") {
      items.push({
        category: "Scriptures",
        titleEnglish: "Bhagavad Gita",
        titleSanskrit: "श्रीमद्भगवद्गीता",
        description: "Listen to the supreme teachings spoken directly by Lord Krishna.",
        href: "/library/gita/chapter/1"
      });
      items.push({
        category: "Deities",
        titleEnglish: deity.slug === "krishna" ? "Lord Rama" : "Lord Krishna",
        titleSanskrit: deity.slug === "krishna" ? "राम" : "कृष्ण",
        description: "Explore the profiles of Vishnu's divine avatars.",
        href: deity.slug === "krishna" ? "/deities/rama" : "/deities/krishna"
      });
    } else {
      items.push({
        category: "History",
        titleEnglish: "Cosmic Timecycles",
        titleSanskrit: "इतिहास कालचक्र",
        description: "Explore the yugas, eras, and sages of our cosmic history.",
        href: "/history"
      });
      items.push({
        category: "Scriptures",
        titleEnglish: "Vedic Hymns",
        titleSanskrit: "वेदाः",
        description: "Read the oldest records of spiritual realizations.",
        href: "/library"
      });
    }
    return items;
  };

  // SVG Family Tree Renderer
  const renderFamilyTreeSVG = () => {
    // Collect related family nodes
    const familyRelations = deity.familyTree;
    if (familyRelations.length === 0) return null;

    // We render a clean SVG triptych of relation boxes
    // Deity in center, links to left/right/top/bottom based on relation
    const centerX = 150;
    const centerY = 110;
    
    return (
      <div className="w-full flex justify-center py-6 bg-white/5 dark:bg-black/20 rounded-xl border border-[var(--border-gold)]/35 overflow-hidden">
        <svg className="w-full max-w-[420px] h-[220px] text-[var(--accent-gold)]" viewBox="0 0 300 220" fill="none">
          {/* Background matrix mesh grid */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(212, 160, 23, 0.03)" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Connector Lines */}
          {familyRelations.map((rel, idx) => {
            const angle = (idx * 2 * Math.PI) / familyRelations.length;
            const targetX = centerX + Math.cos(angle) * 90;
            const targetY = centerY + Math.sin(angle) * 70;
            return (
              <g key={`line-${idx}`}>
                <line 
                  x1={centerX} 
                  y1={centerY} 
                  x2={targetX} 
                  y2={targetY} 
                  stroke="rgba(212, 160, 23, 0.35)" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4"
                  className="animate-[dash_20s_linear_infinite]"
                />
                <circle cx={targetX} cy={targetY} r="3" fill="var(--accent-gold)" />
              </g>
            );
          })}

          {/* Central Active Node */}
          <g transform={`translate(${centerX - 45}, ${centerY - 22})`} className="cursor-default">
            <rect 
              width="90" 
              height="44" 
              rx="6" 
              fill="rgba(212, 160, 23, 0.15)" 
              stroke="var(--accent-gold)" 
              strokeWidth="2"
            />
            {/* Glow ring */}
            <rect 
              width="94" 
              height="48" 
              x="-2"
              y="-2"
              rx="8" 
              stroke="var(--accent-gold)" 
              strokeWidth="0.5"
              className="animate-pulse opacity-40"
            />
            <text x="45" y="20" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="bold" fontFamily="var(--font-sans)">
              {deity.nameEnglish}
            </text>
            <text x="45" y="34" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontFamily="var(--font-sanskrit)">
              {deity.nameSanskrit}
            </text>
          </g>

          {/* Related Nodes */}
          {familyRelations.map((rel, idx) => {
            const angle = (idx * 2 * Math.PI) / familyRelations.length;
            const targetX = centerX + Math.cos(angle) * 90;
            const targetY = centerY + Math.sin(angle) * 70;

            return (
              <g 
                key={`node-${idx}`} 
                transform={`translate(${targetX - 40}, ${targetY - 20})`}
                onClick={() => {
                  if (rel.slug) {
                    playNavigate();
                    router.push(`/deities/${rel.slug}`);
                  }
                }}
                className={rel.slug ? "cursor-pointer group" : "cursor-default"}
              >
                <rect 
                  width="80" 
                  height="36" 
                  rx="4" 
                  fill={isDarkMode ? "#0c0615" : "#F4ECE0"} 
                  stroke={rel.slug ? "var(--border-gold)" : "rgba(120, 120, 120, 0.2)"} 
                  strokeWidth="1"
                  className="group-hover:stroke-[var(--accent-gold)] transition-all duration-300"
                />
                <text x="40" y="14" textAnchor="middle" fill="var(--text-primary)" fontSize="8.5" fontWeight="bold" fontFamily="var(--font-sans)">
                  {rel.name}
                </text>
                <text x="40" y="27" textAnchor="middle" fill="var(--text-secondary)" fontSize="7" className="uppercase" fontFamily="var(--font-sans)">
                  {rel.relation}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  // Render SVG Timeline
  const renderTimelineSVG = () => {
    return (
      <div className="w-full py-4 bg-white/5 dark:bg-black/20 rounded-xl border border-[var(--border-gold)]/35 px-4 overflow-x-auto select-none">
        <div className="min-w-[500px] flex flex-col gap-6 relative py-4">
          <div className="absolute top-[48px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-[var(--border-gold)]/10 via-[var(--accent-gold)]/50 to-[var(--border-gold)]/10" />
          
          <div className="flex justify-between items-start">
            {deity.temples.map((temple, idx) => {
              const cleanedName = temple.replace(/\(.*?\)/g, "").trim();
              return (
                <div key={idx} className="flex flex-col items-center text-center w-[30%] relative">
                  {/* Timeline point */}
                  <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-gold)] flex items-center justify-center z-10 mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-[10px] text-[var(--accent-gold)] font-bold">0{idx + 1}</span>
                  </div>
                  <span className="text-[11px] font-bold text-[var(--text-primary)] font-serif block truncate max-w-full">
                    {cleanedName}
                  </span>
                  <span className="text-[9px] text-[var(--text-secondary)] uppercase tracking-wider block mt-1">
                    Major Altar
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark bg-[#030107]" : "bg-[#FAF7F2]"} text-[var(--text-primary)] transition-colors duration-500 overflow-x-hidden relative`}>
      <TempleDoor />

      <div className="absolute inset-0 pointer-events-none z-10">
        <GoldParticleField />
      </div>

      {/* Cinematic Gradient Backdrop */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none z-0 transition-all duration-1000"
        style={{ background: deity.bgGradient }}
      />

      {/* Deity Specific Background Watermark & Ornaments */}
      {ds.bgDecorations}

      <div className="relative z-20">
        <Breadcrumb items={[{ label: "Deities", href: "/deities" }, { label: deity.nameEnglish }]} />
      </div>

      {/* ────────────────────────────────────────────────────────
          TRIPTYCH HERO SYSTEM (20% | 60% | 20%)
          ──────────────────────────────────────────────────────── */}
      <section className="relative w-full py-10 px-4 md:px-8 lg:px-12 border-b border-[var(--border-gold)]/35 overflow-hidden z-10 select-none">
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[22%_56%_22%] gap-6 items-stretch w-full max-w-7xl mx-auto">
          
          {/* LEFT PANEL: WHO THEY ARE (22% focus) */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col gap-4 p-5 rounded-xl border border-[var(--border-gold)]/30 backdrop-blur-md justify-between
              ${isDarkMode ? "bg-white/5 shadow-2xl" : "bg-[#FAF7F2]/85 shadow-md"}`}
          >
            <div>
              {/* Header Title with Temple Ornament */}
              <div className="border-b border-[var(--border-gold)]/30 pb-2.5 mb-4 flex flex-col gap-1">
                <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold">
                  {t.whoTheyAre}
                </span>
                <h3 className="font-serif text-lg font-extrabold text-[var(--text-primary)]">
                  {deity.nameEnglish}
                </h3>
              </div>

              {/* Data Blocks */}
              <div className="flex flex-col gap-3 text-xs leading-relaxed select-text">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-bold block mb-0.5">
                    {t.sanskritName}
                  </span>
                  <span className="text-base font-bold text-[var(--text-sanskrit)] dark:text-[var(--accent-gold)] font-sanskrit">
                    {deity.nameSanskrit}
                  </span>
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-bold block mb-0.5">
                    {t.meaning}
                  </span>
                  <p className="text-[11px] text-[var(--text-secondary)] italic">
                    &ldquo;{deity.meaning}&rdquo;
                  </p>
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-bold block mb-0.5">
                    {t.role}
                  </span>
                  <p className="text-[11px] text-[var(--text-primary)] font-medium">
                    {deity.role}
                  </p>
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-bold block mb-0.5">
                    {t.divineFunc}
                  </span>
                  <p className="text-[11px] text-[var(--text-primary)]">
                    {deity.divineFunction}
                  </p>
                </div>
              </div>
            </div>

            {/* Symbols and Attributes */}
            <div className="border-t border-[var(--border-gold)]/20 pt-4 flex flex-col gap-3 select-text text-xs">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-bold block mb-1">
                  {t.vehicle}
                </span>
                <span className="inline-block px-2 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-gold)]/25 rounded text-[11px] font-semibold text-[var(--text-primary)]">
                  🐾 {deity.vehicle}
                </span>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-bold block mb-1">
                  {t.weapons}
                </span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {deity.weapons.map((w, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-gold)]/20 rounded text-[10px] text-[var(--text-secondary)] font-medium">
                      ⚔️ {w}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-bold block mb-1">
                  {t.objects}
                </span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {deity.sacredObjects.map((o, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-gold)]/20 rounded text-[10px] text-[var(--text-secondary)] font-medium">
                      🪷 {o}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CENTER PANEL: THE INNER SANCTUM ARTWORK (56% focus) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col justify-between items-center text-center relative p-6 rounded-xl border overflow-hidden ${ds.borderColor}`}
            style={{ minHeight: "450px" }}
          >
            {/* Concentric glowing temple mandala behind the image */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 z-0 pointer-events-none opacity-40 dark:opacity-70">
              <div className="concentric-circle concentric-circle-1" />
              <div className="concentric-circle concentric-circle-2" />
              <div className="concentric-circle concentric-circle-3" />
              <div className={`absolute inset-10 rounded-full ${ds.auricColor} filter blur-xl`} />
              {aartiActive && (
                <>
                  <div className="om-pulse-ring om-pulse-ring-1" />
                  <div className="om-pulse-ring om-pulse-ring-2" />
                </>
              )}
            </div>

            {/* Navigation back and title */}
            <div className="w-full flex justify-between items-center z-10 mb-4">
              <button 
                onClick={() => { playNavigate(); router.push("/deities"); }}
                className="px-2.5 py-1 border border-[var(--border-gold)]/40 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hover:bg-[var(--border-gold)]/10 text-[9px] uppercase tracking-wider font-semibold rounded cursor-pointer transition-all"
              >
                ← {t.backDir}
              </button>

              <span className="font-sanskrit text-sm font-bold text-[var(--text-sanskrit)] dark:text-[var(--accent-gold)] tracking-widest drop-shadow-[0_0_8px_rgba(212,160,23,0.3)]">
                ॐ नमः शिवाय
              </span>
            </div>

            {/* Massive Deity Artwork (70% Visual focus) */}
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-[var(--border-gold)]/50 bg-[#16121a]/80 shadow-2xl flex items-center justify-center shrink-0 z-10 group cursor-pointer hover:border-[var(--accent-gold)] transition-colors duration-500">
              <SacredImage 
                src={deity.heroImage} 
                alt={deity.nameEnglish} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                fallbackText={deity.nameSanskrit}
                type="deity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              {/* Divine Aura Glow */}
              <div className="absolute inset-0 border border-white/5 rounded-full pointer-events-none group-hover:shadow-[inset_0_0_20px_rgba(255,215,0,0.2)] transition-shadow duration-500" />
            </div>

            {/* Sacred Typography & Interactive Bell Trigger */}
            <div className="z-10 mt-4 flex flex-col items-center gap-1.5">
              <span className="font-sanskrit text-4xl text-[#FFD700] font-bold tracking-widest drop-shadow-[0_4px_10px_rgba(212,160,23,0.4)]">
                {deity.nameSanskrit}
              </span>
              <h2 className="text-xl md:text-2xl text-[var(--text-primary)] font-serif font-extrabold uppercase tracking-wide">
                {deity.nameEnglish}
              </h2>
              <span className="text-[10px] text-[var(--accent-gold)] font-mono uppercase tracking-widest font-bold">
                {deity.role}
              </span>
            </div>

            {/* Sound offering shelf */}
            <div className="w-full mt-6 pt-4 border-t border-[var(--border-gold)]/20 z-10 flex flex-wrap justify-center gap-3">
              <button 
                onClick={triggerBellSound}
                className={`px-3.5 py-1.5 rounded bg-gradient-to-r from-[#D4A017] to-[#B8860B] text-black font-extrabold text-[10px] uppercase tracking-wider shadow-md cursor-pointer transition-all hover:shadow-[0_0_10px_rgba(212,160,23,0.3)] flex items-center gap-1.5 ${bellRinging ? "scale-95" : ""}`}
                title={t.bellTitle}
              >
                🔔 {t.bellTitle}
              </button>

              <button 
                onClick={toggleAarti}
                className={`px-3.5 py-1.5 rounded text-[10px] uppercase tracking-wider font-extrabold border transition-all flex items-center gap-1.5 cursor-pointer
                  ${aartiActive 
                    ? "bg-[#FF4D00] border-[#FF8C00] text-white animate-pulse" 
                    : "bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] border-[var(--border-gold)]/40 text-[var(--accent-gold)]"}`}
                title={t.aartiTitle}
              >
                🔥 {aartiActive ? `${t.aartiTitle} (${t.active})` : t.aartiTitle}
              </button>

              <button 
                onClick={toggleMantra}
                className={`px-3.5 py-1.5 rounded text-[10px] uppercase tracking-wider font-extrabold border transition-all flex items-center gap-1.5 cursor-pointer
                  ${mantraActive 
                    ? "bg-[var(--accent-gold)] border-[#FFD700] text-black shadow-lg" 
                    : "bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] border-[var(--border-gold)]/40 text-[var(--accent-gold)]"}`}
                title={t.droneTitle}
              >
                🧘 {mantraActive ? `${t.droneTitle} (${t.active})` : t.droneTitle}
              </button>
            </div>
          </motion.div>

          {/* RIGHT PANEL: DIVINE DOMAIN (22% focus) */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col gap-4 p-5 rounded-xl border border-[var(--border-gold)]/30 backdrop-blur-md justify-between
              ${isDarkMode ? "bg-white/5 shadow-2xl" : "bg-[#FAF7F2]/85 shadow-md"}`}
          >
            {/* Domain Title */}
            <div>
              <div className="border-b border-[var(--border-gold)]/30 pb-2.5 mb-4 flex flex-col gap-1">
                <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold">
                  {t.divineDomain}
                </span>
                <h3 className="font-serif text-lg font-extrabold text-[var(--text-primary)]">
                  Cosmic Radiance
                </h3>
              </div>

              {/* Power / Domain Diagram (Engraving meters) */}
              <div className="flex flex-col gap-4 mt-2">
                {deity.domains.map((dom, idx) => {
                  // Generate custom deterministic layout indicators for domains
                  const intensityVal = 95 - (idx * 8); 
                  return (
                    <div key={idx} className="flex flex-col gap-1 select-text">
                      <div className="flex justify-between items-center text-[10px] font-semibold text-[var(--text-primary)]">
                        <span>{dom}</span>
                        <span className="text-[var(--accent-gold)] font-mono font-bold">{intensityVal}%</span>
                      </div>
                      <div className="w-full h-1 bg-[var(--bg-secondary)] rounded-full overflow-hidden border border-[var(--border-gold)]/10">
                        <div 
                          className="h-full bg-gradient-to-r from-[var(--accent-gold)] to-[#FFD700] rounded-full transition-all duration-1000"
                          style={{ width: `${intensityVal}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inner Sanctum Altar Box */}
            <div className="bg-[var(--bg-secondary)] p-3.5 rounded-lg border border-[var(--border-gold)]/20 text-center flex flex-col items-center gap-1.5">
              <DiyaFlame intensity={aartiActive ? "aarti" : "normal"} onClick={triggerBellSound} />
              <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-mono font-bold block mt-1.5">
                {t.offering}
              </span>
              <p className="text-[9px] text-[var(--text-secondary)] max-w-[150px] leading-tight mt-0.5">
                {t.interactiveHelp}
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          MODE SWITCHER TABS
          ──────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 w-full py-6 z-20">
        <div className="flex flex-wrap items-center justify-center border-b border-[var(--border-gold)]/30 pb-0.5 gap-1 select-none">
          {(["story", "scholar", "visual", "kids"] as const).map((mode) => {
            const isActive = activeMode === mode;
            let label = t.storyMode;
            let icon = <BookOpen className="w-3.5 h-3.5" />;
            
            if (mode === "scholar") {
              label = t.scholarMode;
              icon = <GraduationCap className="w-3.5 h-3.5" />;
            } else if (mode === "visual") {
              label = t.visualMode;
              icon = <Compass className="w-3.5 h-3.5" />;
            } else if (mode === "kids") {
              label = t.kidsMode;
              icon = <Smile className="w-3.5 h-3.5" />;
            }

            return (
              <button
                key={mode}
                onClick={() => { playClick(); setActiveMode(mode); }}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs uppercase tracking-wider font-extrabold transition-all border-b-2 cursor-pointer
                  ${isActive 
                    ? "border-[var(--accent-gold)] text-[var(--accent-gold)] font-black" 
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
              >
                {icon}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          DYNAMIC ALTARE DETAILS (BELOW HERO)
          ──────────────────────────────────────────────────────── */}
      <section className="flex-grow max-w-4xl mx-auto px-4 w-full pb-16 z-20 relative select-text">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className={`p-6 md:p-8 rounded-xl border border-[var(--border-gold)]/25 shadow-sm min-h-[350px]
              ${isDarkMode 
                ? "bg-gradient-to-br from-[#0c0615] via-[#050209] to-[#0d0716]" 
                : "bg-gradient-to-br from-[#FAF7F2] via-[#FDFDFB] to-[#FAF7F2]"}`}
          >
            {/* STORY MODE: Pinterest-style Editorial Columns */}
            {activeMode === "story" && (
              <div className="columns-1 md:columns-2 gap-6 space-y-6 [column-fill:_auto] w-full">
                
                {/* Card 1: Origin & Ascent */}
                <div className="break-inside-avoid p-5 rounded-lg border border-[var(--border-gold)]/15 bg-white/5 dark:bg-black/10 shadow-sm flex flex-col gap-3">
                  <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold">
                    ✨ {t.originStory}
                  </span>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-serif italic select-text relative pl-4 border-l-2 border-[var(--accent-gold)]/40">
                    &ldquo;{deity.originStory}&rdquo;
                  </p>
                </div>

                {/* Card 2: Sacred Legends / Episodes */}
                <div className="break-inside-avoid p-5 rounded-lg border border-[var(--border-gold)]/15 bg-white/5 dark:bg-black/10 shadow-sm flex flex-col gap-4">
                  <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold">
                    📖 {t.episodes}
                  </span>
                  
                  {/* Episode tabs */}
                  <div className="flex flex-wrap gap-1.5 mb-1">
                    {deity.majorEpisodes.map((ep, idx) => (
                      <button
                        key={idx}
                        onClick={() => { playClick(); setSelectedEpisodeIdx(idx); }}
                        className={`px-2 py-1 text-[10px] font-semibold border rounded transition-all cursor-pointer ${
                          selectedEpisodeIdx === idx 
                            ? "bg-[var(--border-gold)]/25 border-[var(--accent-gold)] text-[var(--accent-gold)] font-bold" 
                            : "bg-transparent border-[var(--border-gold)]/20 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {ep.title}
                      </button>
                    ))}
                  </div>

                  {/* Active Episode Content */}
                  {deity.majorEpisodes[selectedEpisodeIdx] && (
                    <motion.div 
                      key={selectedEpisodeIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col gap-3 bg-[var(--bg-secondary)] p-4 rounded border border-[var(--border-gold)]/15"
                    >
                      <h5 className="font-serif text-sm font-bold text-[var(--text-primary)] border-b border-[var(--border-gold)]/10 pb-1.5 flex justify-between items-center gap-2">
                        <span>{deity.majorEpisodes[selectedEpisodeIdx].title}</span>
                        {deity.majorEpisodes[selectedEpisodeIdx].scripture && (
                          <span className="text-[8px] bg-[var(--bg-primary)] px-1.5 py-0.5 rounded text-[var(--accent-gold)] font-mono font-bold border border-[var(--border-gold)]/20 uppercase whitespace-nowrap">
                            {deity.majorEpisodes[selectedEpisodeIdx].scripture}
                          </span>
                        )}
                      </h5>

                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed select-text font-sans">
                        {deity.majorEpisodes[selectedEpisodeIdx].narrative}
                      </p>

                      {deity.majorEpisodes[selectedEpisodeIdx].moralText && (
                        <div className="border-t border-[var(--border-gold)]/10 pt-2 flex flex-col gap-1">
                          <span className="text-[9px] text-[var(--accent-saffron)] uppercase font-mono font-bold tracking-wider">
                            💡 {t.moral}
                          </span>
                          <p className="text-xs text-[var(--text-primary)] font-medium italic">
                            &ldquo;{deity.majorEpisodes[selectedEpisodeIdx].moralText}&rdquo;
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Card 3: Eternal Teachings */}
                <div className="break-inside-avoid p-5 rounded-lg border border-[var(--border-gold)]/15 bg-white/5 dark:bg-black/10 shadow-sm flex flex-col gap-3">
                  <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold">
                    🕉️ {t.teachings}
                  </span>
                  <ul className="flex flex-col gap-3 list-none pl-0 text-xs text-[var(--text-secondary)]">
                    {deity.teachings.map((teach, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start bg-[var(--bg-secondary)]/30 border border-[var(--border-gold)]/10 p-2.5 rounded hover:border-[var(--accent-gold)]/30 transition-colors">
                        <span className="text-[var(--accent-gold)] font-mono font-bold shrink-0">0{idx + 1}.</span>
                        <p className="select-text leading-relaxed font-sans">{teach}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* SCHOLAR MODE: Pinterest-style Editorial Columns */}
            {activeMode === "scholar" && (
              <div className="columns-1 md:columns-2 gap-6 space-y-6 [column-fill:_auto] w-full">
                
                {/* Card 1: Scriptural Authority Intro */}
                <div className="break-inside-avoid p-5 rounded-lg border border-[var(--border-gold)]/15 bg-white/5 dark:bg-black/10 shadow-sm flex flex-col gap-2">
                  <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold">
                    🏛️ Scriptural Authority
                  </span>
                  <h4 className="font-serif text-sm font-bold text-[var(--text-primary)]">
                    Vedic and Puranic Canon
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
                    The divine presence and dynamic nature of {deity.nameEnglish} are detailed across canonical texts, established through sacred mantras, hymns, and pilgrimages that form the core of Vedic cosmology.
                  </p>
                </div>

                {/* Card 2: Associated Scriptures & Pilgrimages */}
                <div className="break-inside-avoid p-5 rounded-lg border border-[var(--border-gold)]/15 bg-white/5 dark:bg-black/10 shadow-sm flex flex-col gap-4">
                  {/* Connected Scriptures */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-[var(--accent-gold)] uppercase font-mono font-bold tracking-widest">
                      📖 {t.scriptures}
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {deity.scriptures.map((scrip, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-gold)]/20 text-[var(--text-primary)] text-[9px] font-bold uppercase tracking-wider rounded">
                          {scrip}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pilgrimages and temples */}
                  <div className="flex flex-col gap-2 border-t border-[var(--border-gold)]/10 pt-3">
                    <span className="text-[10px] text-[var(--accent-gold)] uppercase font-mono font-bold tracking-widest">
                      🛕 {t.temples}
                    </span>
                    <ul className="list-disc pl-4 text-xs text-[var(--text-secondary)] flex flex-col gap-1.5 font-sans">
                      {deity.temples.map((temple, idx) => (
                        <li key={idx} className="select-text">{temple}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card 3: Meditation Essence */}
                <div className="break-inside-avoid p-5 rounded-lg border border-[var(--border-gold)]/15 bg-white/5 dark:bg-black/10 shadow-sm flex flex-col gap-2">
                  <span className="text-[10px] text-[var(--accent-gold)] uppercase font-mono font-bold tracking-widest">
                    🧘 {t.meditation}
                  </span>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed select-text font-serif italic">
                    {deity.meditationMeaning}
                  </p>
                </div>

                {/* Card 4/5...: Mantras */}
                {deity.mantras.map((mantra, idx) => (
                  <div key={idx} className="break-inside-avoid bg-white/5 dark:bg-black/15 border border-[var(--border-gold)]/25 p-5 rounded-lg flex flex-col gap-3 text-center shadow-sm">
                    <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-mono block text-left">
                      Mantra {idx + 1}
                    </span>
                    <p className="font-sanskrit text-lg text-[var(--text-sanskrit)] dark:text-[var(--accent-gold)] font-bold leading-normal whitespace-pre-line drop-shadow-sm select-text">
                      {mantra.text}
                    </p>
                    <p className="text-[11px] text-[var(--text-secondary)] italic select-text">
                      {mantra.translation}
                    </p>
                    <div className="border-t border-[var(--border-gold)]/15 pt-2.5 text-left">
                      <span className="text-[9px] text-[var(--accent-gold)] uppercase font-mono font-bold block mb-1">
                        Meaning
                      </span>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed select-text font-sans">
                        &ldquo;{mantra.meaning}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VISUAL MODE: Infographics, timelines, maps */}
            {activeMode === "visual" && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1 border-b border-[var(--border-gold)]/20 pb-3">
                  <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold">
                    Visual Synthesis
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[var(--text-primary)]">
                    Lineage Maps and Timeline
                  </h4>
                </div>

                {/* SVG Family Map */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] text-[var(--accent-gold)] uppercase font-mono font-bold tracking-widest">
                    {t.familyTree}
                  </span>
                  {renderFamilyTreeSVG()}
                </div>

                {/* Timeline map */}
                <div className="flex flex-col gap-2.5 border-t border-[var(--border-gold)]/25 pt-5 mt-2">
                  <span className="text-[10px] text-[var(--accent-gold)] uppercase font-mono font-bold tracking-widest">
                    Sacred Geography Epochs
                  </span>
                  {renderTimelineSVG()}
                </div>

                {/* Festivals and Celebrations */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-gold)]/30 rounded-xl p-4 flex flex-col gap-2.5">
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono tracking-widest block font-bold border-b border-[var(--border-gold)]/20 pb-1.5 mb-1">
                    {t.festivals}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {deity.festivals.map((fest) => (
                      <span 
                        key={fest} 
                        className="px-2.5 py-1 bg-[var(--bg-primary)] border border-[var(--border-gold)]/30 text-[var(--accent-saffron)] font-bold text-[11px] rounded-full shadow-sm"
                      >
                        🎉 {fest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* KIDS MODE: Simple, fun, interactive */}
            {activeMode === "kids" && (
              <div className="flex flex-col gap-6">
                {/* Simplified Summary Card */}
                <div className="flex flex-col gap-3 bg-amber-500/10 border border-amber-500/30 p-5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌟</span>
                    <h4 className="font-serif text-base font-bold text-[var(--text-primary)]">
                      Meet {deity.nameEnglish}!
                    </h4>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed select-text font-sans">
                    {deity.kidsSimplified.summary}
                  </p>
                </div>

                {/* Fun Facts Slider */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] text-[var(--accent-gold)] uppercase font-mono font-bold tracking-widest">
                    🎈 {t.funFacts}
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {deity.kidsSimplified.funFacts.map((fact, idx) => (
                      <div key={idx} className="bg-white/5 dark:bg-black/10 border border-[var(--border-gold)]/20 p-4 rounded-lg flex flex-col gap-2">
                        <div className="w-6 h-6 rounded-full bg-[var(--accent-gold)]/20 flex items-center justify-center text-[10px] font-bold text-[var(--accent-gold)]">
                          {idx + 1}
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed select-text font-sans">
                          {fact}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mount / Animal Companion Card */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-gold)]/25 p-4 rounded-lg flex items-center gap-4 flex-col sm:flex-row select-text">
                  <div className="w-14 h-14 rounded-full bg-[var(--accent-gold)]/20 flex items-center justify-center text-3xl">
                    🐾
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-mono font-bold block">
                      Mount / Vehicle
                    </span>
                    <h5 className="font-bold text-sm text-[var(--text-primary)] mt-0.5">{deity.vehicle}</h5>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-1">
                      {deity.nameEnglish} loves to travel on the back of {deity.vehicle}, showing the special connection between the divine and nature.
                    </p>
                  </div>
                </div>

                {/* Moral Box */}
                <div className="border-t border-[var(--border-gold)]/20 pt-4 flex flex-col gap-2 bg-gradient-to-r from-orange-500/5 to-transparent p-4 rounded-lg border-l-4 border-l-[var(--accent-saffron)]">
                  <span className="text-[10px] text-[var(--accent-saffron)] uppercase font-mono font-bold tracking-widest">
                    💡 Moral Lesson
                  </span>
                  <p className="text-sm font-semibold text-[var(--text-primary)] select-text italic">
                    &ldquo;{deity.kidsSimplified.moralLesson}&rdquo;
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
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
