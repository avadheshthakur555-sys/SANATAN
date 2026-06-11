"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowRight, Sparkles, BookOpen, MapPin, Landmark, Clock, Users, Scroll } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";

interface DropdownItem {
  name: string;
  href: string;
}

interface Segment {
  id: string;
  label: string;
  sanskrit: string;
  description: string;
  route: string;
  icon: string;
  iconComponent: React.ReactNode;
  subcategories: DropdownItem[];
}

const SEGMENTS: Segment[] = [
  {
    id: "scriptures",
    label: "Scriptures",
    sanskrit: "ज्ञान / Jnana (Scriptures)",
    description: "The foundational core of cosmic wisdom. Study the eternal Vedas, Principal Upanishads, Bhagavad Gita, and historic Puranas.",
    route: "/library",
    icon: "📚",
    iconComponent: <BookOpen className="w-5 h-5" />,
    subcategories: [
      { name: "Four Vedas", href: "/library?tab=vedas" },
      { name: "Principal Upanishads", href: "/library?tab=upanishads" },
      { name: "Bhagavad Gita", href: "/library/gita/chapter/1" },
      { name: "18 Mahapuranas", href: "/library?tab=puranas" }
    ]
  },
  {
    id: "deities",
    label: "Deities",
    sanskrit: "भक्ति / Bhakti (Deities)",
    description: "Witness pure consciousness manifested in divine form. Walk through the immersive journeys of Shiva, Vishnu, Durga, and Rama.",
    route: "/deities",
    icon: "🕉️",
    iconComponent: <Scroll className="w-5 h-5" />,
    subcategories: [
      { name: "Lord Shiva", href: "/deities/shiva" },
      { name: "Lord Vishnu", href: "/deities/vishnu" },
      { name: "Goddess Durga", href: "/deities/durga" },
      { name: "Lord Ganesha", href: "/deities/ganesha" },
      { name: "Lord Hanuman", href: "/deities/hanuman" }
    ]
  },
  {
    id: "temples",
    label: "Temples",
    sanskrit: "यज्ञ-तीर्थ / Karma (Sacred Places)",
    description: "Connect with divine energy centers. Map pilgrimage routes across the Interactive Atlas, Jyotirlingas, and Shakti Peethas.",
    route: "/temples",
    icon: "🛕",
    iconComponent: <Landmark className="w-5 h-5" />,
    subcategories: [
      { name: "Sacred Atlas Map", href: "/temples" },
      { name: "12 Jyotirlinga", href: "/jyotirlinga" },
      { name: "51 Shakti Peeth", href: "/temples?filter=Shakti Peethas" },
      { name: "Char Dham Shrines", href: "/temples?filter=Char Dham" }
    ]
  },
  {
    id: "timeline",
    label: "Timeline",
    sanskrit: "कालचक्र / Kaala (Timeline)",
    description: "Chronicle the cosmic cycles. Understand the four Yuga cycles, historical alignments, and timelines of avatars.",
    route: "/history",
    icon: "⏳",
    iconComponent: <Clock className="w-5 h-5" />,
    subcategories: [
      { name: "Yuga Cycles & Eras", href: "/history" },
      { name: "Avatar Chronicles", href: "/history" },
      { name: "Dharmic Timeline", href: "/history" }
    ]
  },
  {
    id: "sages",
    label: "Sages",
    sanskrit: "गुरु-शिष्य / Guru (Sages)",
    description: "Honor the ancient wisdom transmitters. Explore the teachings and lineages of the legendary Vedic Rishis and sages.",
    route: "/sages",
    icon: "🧘",
    iconComponent: <Users className="w-5 h-5" />,
    subcategories: [
      { name: "Saptarishi (Seven Sages)", href: "/sages" },
      { name: "Great Ascetics", href: "/sages" },
      { name: "Lineage & Guru Parampara", href: "/guru" }
    ]
  },
  {
    id: "knowledge",
    label: "Knowledge",
    sanskrit: "सदाचार / Vidya (Knowledge)",
    description: "Apply philosophy to daily life. Master the concepts of Dharma, Karma, Moksha, and the practical paths of Yoga.",
    route: "/knowledge",
    icon: "📜",
    iconComponent: <MapPin className="w-5 h-5" />,
    subcategories: [
      { name: "Dharma (Righteous Duty)", href: "/knowledge?tab=dharma" },
      { name: "Karma (Cosmic Cause)", href: "/knowledge?tab=karma" },
      { name: "Moksha (Liberation)", href: "/knowledge?tab=moksha" },
      { name: "Yoga (Union Practice)", href: "/knowledge?tab=yoga" }
    ]
  }
];

interface SanatanCompassProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SanatanCompass({ isOpen, onClose }: SanatanCompassProps) {
  const pathname = usePathname();
  const { playClick, playNavigate } = useSacredSound();

  const [activeIndex, setActiveIndex] = useState(0);
  const [visited, setVisited] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Responsive layout check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track progress and update visited segments based on current URL or navigation clicks
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("visited_sanatan_segments");
      const visitedArray = stored ? JSON.parse(stored) : [];
      
      const timeoutId = setTimeout(() => {
        setVisited(visitedArray);

        const matched = SEGMENTS.find(s => pathname.startsWith(s.route));
        if (matched && !visitedArray.includes(matched.id)) {
          const nextVisited = [...visitedArray, matched.id];
          localStorage.setItem("visited_sanatan_segments", JSON.stringify(nextVisited));
          setVisited(nextVisited);
        }
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [pathname]);

  const markSegmentVisited = (id: string) => {
    if (typeof window !== "undefined" && !visited.includes(id)) {
      const nextVisited = [...visited, id];
      localStorage.setItem("visited_sanatan_segments", JSON.stringify(nextVisited));
      setVisited(nextVisited);
    }
  };

  // Synthesize Temple Bell Chime
  const triggerBellSound = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Bell metallic resonance frequencies
      const frequencies = [261.63, 523.25, 659.25, 783.99, 1046.50, 1318.51];
      const gains = [0.8, 1.0, 0.65, 0.45, 0.25, 0.1];
      const decays = [2.0, 1.6, 1.2, 0.8, 0.5, 0.2];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.35, now);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);
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
    } catch {
      console.warn("Audio Context blocked by browser safety policy.");
    }
  };

  // Trigger bell when opening compass
  useEffect(() => {
    if (isOpen) {
      triggerBellSound();
    }
  }, [isOpen]);

  // Seeker recommendation engine
  const getRecommendation = () => {
    if (!visited.includes("scriptures")) {
      return {
        text: "Begin your journey at Jnana (Scriptures). Absorb the vibrations of the Vedas and Bhagavad Gita.",
        href: "/library",
        id: "scriptures",
        label: "Visit Scriptures"
      };
    }
    if (!visited.includes("deities")) {
      return {
        text: "Proceed to Bhakti (Devotion). Meditate on form by walking through the Lord Shiva & Lord Vishnu journeys.",
        href: "/deities",
        id: "deities",
        label: "Visit Deities"
      };
    }
    if (!visited.includes("temples")) {
      return {
        text: "Connect via Karma & Yatra (Pilgrimage). Explore temple coordinates and routes on the Interactive Map.",
        href: "/temples",
        id: "temples",
        label: "Visit Temples"
      };
    }
    if (!visited.includes("timeline")) {
      return {
        text: "Align with Kaala (Time). Understand cosmic eras, Yugas, and historical chronology.",
        href: "/history",
        id: "timeline",
        label: "Visit Timeline"
      };
    }
    if (!visited.includes("sages")) {
      return {
        text: "Honour the Gurus (Sages). Dive into the deep realizations and lineages of the Saptarishis.",
        href: "/sages",
        id: "sages",
        label: "Visit Sages"
      };
    }
    return {
      text: "Conclude with Sadhana (Daily Practice). Pose questions or test your Vedic memory with the AI Guru.",
      href: "/guru",
      id: "knowledge",
      label: "Consult AI Guru"
    };
  };

  const recommendation = getRecommendation();

  // Handle search changes and auto-focus match
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    
    if (val.trim()) {
      const matches = SEGMENTS.filter(
        (seg) =>
          seg.label.toLowerCase().includes(val.toLowerCase()) ||
          seg.sanskrit.toLowerCase().includes(val.toLowerCase()) ||
          seg.subcategories.some((sub) => sub.name.toLowerCase().includes(val.toLowerCase()))
      );
      if (matches.length > 0) {
        const matchIdx = SEGMENTS.findIndex((s) => s.id === matches[0].id);
        if (matchIdx !== -1) {
          setActiveIndex(matchIdx);
        }
      }
    }
  };

  const activeSegment = SEGMENTS[activeIndex];
  const rotateAngle = -activeIndex * 60;
  const progressPercent = Math.round((visited.length / 6) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 overflow-hidden select-none">
          {/* Blur backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#030107]/90 dark:bg-[#020005]/95 backdrop-blur-md"
          />

          {/* Compass Portal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-5xl rounded-none md:rounded-3xl border-0 md:border border-[var(--border-gold)]/40 overflow-y-auto bg-[#0a0613] text-white flex flex-col shadow-[0_0_80px_rgba(212,160,23,0.15)]"
          >
            {/* Background Sacred Geometry */}
            <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center overflow-hidden z-0">
              <svg className="w-[120%] h-[120%] text-[#D4A017] animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <circle cx="50" cy="50" r="45" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="35" strokeWidth="0.3" strokeDasharray="2 2" />
                <circle cx="50" cy="50" r="25" strokeWidth="0.2" />
                <line x1="50" y1="5" x2="50" y2="95" strokeWidth="0.2" />
                <line x1="5" y1="50" x2="95" y2="50" strokeWidth="0.2" />
              </svg>
            </div>

            {/* Header row */}
            <div className="relative z-10 p-5 md:p-6 border-b border-[var(--border-gold)]/20 flex justify-between items-center bg-black/30 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/40 flex items-center justify-center text-xl text-[var(--accent-gold)] animate-pulse">
                  🧭
                </div>
                <div>
                  <h2 className="font-serif text-lg md:text-xl font-extrabold uppercase tracking-widest text-[#FFD700]">
                    Sanatan Compass
                  </h2>
                  <p className="text-[9px] md:text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-0.5">
                    Seeker&apos;s Interactive Pathway Map
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Search Bar inside Compass */}
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search pathway..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-9 pr-4 py-1.5 rounded-lg border border-[var(--border-gold)]/20 bg-white/5 text-xs text-white placeholder-slate-400 w-44 md:w-56 focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                  />
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full border border-[var(--border-gold)]/30 hover:border-[var(--accent-gold)] hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
                  aria-label="Close Compass"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inner Content Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-[45%_55%] flex-grow overflow-hidden min-h-0">
              
              {/* Left Pane: Interactive Dial */}
              <div className="flex flex-col items-center justify-center p-6 md:p-8 border-b md:border-b-0 md:border-r border-[var(--border-gold)]/25 relative bg-[#090510]/50 shrink-0 select-none">
                
                {/* Compass Heading Labels */}
                <div className="absolute top-4 font-mono text-[9px] font-extrabold tracking-widest text-[var(--accent-gold)]/60 flex gap-12">
                  <span>NORTH • WISDOM</span>
                  <span>SOUTH • PRACTICE</span>
                </div>

                {/* Rotating Wheel Container */}
                <div className="relative flex items-center justify-center w-[250px] h-[250px] md:w-[360px] md:h-[360px] mt-2 mb-2">
                  
                  {/* Concentric Grid Overlay */}
                  <div className="absolute inset-0 rounded-full border border-[var(--border-gold)]/10" />
                  <div className="absolute inset-[30px] rounded-full border border-[var(--border-gold)]/15 border-dashed" />
                  <div className="absolute inset-[60px] rounded-full border border-[var(--border-gold)]/20" />
                  
                  <motion.div
                    animate={{ rotate: rotateAngle }}
                    transition={{ type: "spring", stiffness: 75, damping: 14 }}
                    className="relative w-full h-full rounded-full flex items-center justify-center z-10"
                  >
                    {/* Ring Degree Ticks */}
                    <div className="absolute inset-0 rounded-full border border-[var(--border-gold)]/20 pointer-events-none opacity-40">
                      {[...Array(24)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-[var(--accent-gold)]/50 origin-center"
                          style={{ transform: `translateX(-50%) rotate(${i * 15}deg)` }}
                        />
                      ))}
                    </div>

                    {/* Central Core Button */}
                    <div
                      onClick={() => { triggerBellSound(); playClick(); }}
                      className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[var(--accent-gold)] via-[#E6B800] to-[#FF8800] text-black shadow-[0_0_35px_rgba(212,160,23,0.45)] border border-[#FFF9C4] flex flex-col items-center justify-center font-bold font-sanskrit cursor-pointer z-30 hover:scale-105 transition-transform group"
                    >
                      <span className="text-2xl md:text-4xl leading-none">ॐ</span>
                      <span className="text-[6px] md:text-[7px] uppercase font-mono font-extrabold tracking-wider mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                        Chime
                      </span>
                    </div>

                    {/* Compass Sectors (6 items) */}
                    {SEGMENTS.map((seg, idx) => {
                      const angleDeg = idx * 60;
                      const angleRad = (angleDeg - 90) * (Math.PI / 180); // Offset by -90 to position first item at top
                      const isVisited = visited.includes(seg.id);
                      const isActive = activeIndex === idx;

                      // Position coordinates
                      const r = isMobile ? 85 : 125;
                      const x = r * Math.cos(angleRad);
                      const y = r * Math.sin(angleRad);

                      return (
                        <motion.button
                          key={seg.id}
                          onClick={() => { playClick(); setActiveIndex(idx); }}
                          className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center border transition-all z-20 cursor-pointer
                            ${isActive
                              ? "bg-[var(--accent-gold)] border-[#FFE57F] text-black shadow-[0_0_25px_rgba(212,160,23,0.6)] scale-110 font-bold"
                              : isVisited
                              ? "bg-white/10 dark:bg-black/60 border-[var(--accent-gold)]/40 text-[var(--accent-gold)] hover:bg-white/20"
                              : "bg-white/5 dark:bg-black/35 border-[var(--border-gold)]/25 text-slate-300 hover:bg-white/15 hover:border-[var(--accent-gold)]/50"
                            }`}
                          style={{
                            transform: `translate(${x}px, ${y}px)`
                          }}
                          // Negate the container's rotation angle so the icon and text remain upright
                          animate={{ rotate: -rotateAngle }}
                          transition={{ type: "spring", stiffness: 75, damping: 14 }}
                        >
                          <span className="text-base md:text-xl">{seg.icon}</span>
                          <span className="text-[6px] md:text-[8px] uppercase tracking-wider font-extrabold font-mono mt-0.5 whitespace-nowrap">
                            {seg.label}
                          </span>
                          {isVisited && !isActive && (
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-black flex items-center justify-center text-[7px] text-white">
                              ✓
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Explorer Progress Ring Bar */}
                <div className="w-full mt-4 flex flex-col items-center gap-1.5">
                  <div className="flex justify-between w-full max-w-[280px] text-[10px] font-mono font-bold text-slate-400">
                    <span>SEEKER PROGRESS</span>
                    <span className="text-[var(--accent-gold)]">{progressPercent}% EXPLORED</span>
                  </div>
                  <div className="w-full max-w-[280px] h-1.5 bg-white/5 dark:bg-black/40 border border-[var(--border-gold)]/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--accent-gold)] to-[#FF9100] rounded-full transition-all duration-700"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-[8px] uppercase tracking-widest text-slate-500 font-mono mt-1">
                    {visited.length} of 6 Divine Spheres Visited
                  </span>
                </div>
              </div>

              {/* Right Pane: Segment Details & Recommendation */}
              <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-none select-text">
                
                {/* Active Sector Display */}
                <div className="flex flex-col gap-4">
                  
                  {/* Category Title Plate */}
                  <div className="border-b border-[var(--border-gold)]/20 pb-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] bg-[var(--accent-gold)]/25 px-2.5 py-0.5 rounded text-[var(--accent-gold)] font-mono font-bold uppercase tracking-wider">
                        Active Quadrant
                      </span>
                      {visited.includes(activeSegment.id) && (
                        <span className="text-[9px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                          ✓ Visited
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-serif text-2xl md:text-3xl font-black text-[#FFD700] uppercase tracking-wider flex items-center gap-2">
                      {activeSegment.iconComponent}
                      <span>{activeSegment.label}</span>
                    </h3>
                    
                    <span className="text-xs md:text-sm text-[var(--accent-saffron)] font-serif italic block mt-1">
                      {activeSegment.sanskrit}
                    </span>
                  </div>

                  {/* Sector Description */}
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans mt-1">
                    {activeSegment.description}
                  </p>

                  {/* Subcategories (Direct Navigation Badges) */}
                  <div className="mt-3">
                    <span className="text-[9px] text-slate-400 uppercase font-mono font-black tracking-widest block mb-3">
                      Ecosystem Subcategories & Destinations:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeSegment.subcategories.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          onClick={() => {
                            playNavigate();
                            markSegmentVisited(activeSegment.id);
                            onClose();
                          }}
                          className="px-4 py-2.5 rounded-xl border border-[var(--border-gold)]/20 bg-white/5 hover:border-[var(--accent-gold)]/70 hover:bg-[var(--accent-gold)]/10 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-between no-underline group shadow-md"
                        >
                          <span className="truncate">{sub.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[var(--accent-gold)]" />
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Recommended Next Step Portal */}
                <div className="mt-6 p-4 rounded-xl border border-[var(--accent-gold)]/30 bg-gradient-to-r from-[#120a1c] to-[#09030e] relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
                  
                  {/* Particle Light Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-sweep" />

                  <div className="flex-grow">
                    <div className="flex items-center gap-1.5 text-[9px] text-[var(--accent-gold)] font-mono font-bold uppercase tracking-wider mb-1.5">
                      <Sparkles className="w-3 h-3 text-[var(--accent-gold)]" />
                      <span>Recommended Next Sadhana Path</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                      {recommendation.text}
                    </p>
                  </div>

                  <Link
                    href={recommendation.href}
                    onClick={() => {
                      playNavigate();
                      markSegmentVisited(recommendation.id);
                      onClose();
                    }}
                    className="px-4 py-2 rounded bg-gradient-to-r from-[#D4A017] to-[#B8860B] text-black font-extrabold text-[10px] uppercase tracking-wider shadow hover:shadow-[0_0_15px_rgba(212,160,23,0.3)] transition-all shrink-0 no-underline"
                  >
                    {recommendation.label} &rarr;
                  </Link>

                </div>

              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
