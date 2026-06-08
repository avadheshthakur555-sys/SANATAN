"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

interface Yuga {
  name: string;
  sanskritName: string;
  duration: string;
  color: string;
  glow: string;
  events: string[];
  avatars: string[];
}

const YUGAS_DATA: Yuga[] = [
  {
    name: "Satya Yuga",
    sanskritName: "सत्ययुग",
    duration: "1,728,000 Academic / 4 Divine Parts",
    color: "#D4A017", // Gold
    glow: "rgba(212, 160, 23, 0.4)",
    events: [
      "Era of absolute truth, purity, and virtue (100% Dharma).",
      "Humanity dedicates itself entirely to spiritual wisdom and meditation.",
      "The average human lifespan is said to have reached 100,000 years."
    ],
    avatars: ["Matsya (Fish)", "Kurma (Tortoise)", "Varaha (Boar)", "Narasimha (Man-Lion)"]
  },
  {
    name: "Treta Yuga",
    sanskritName: "त्रेतायुग",
    duration: "1,296,000 Academic / 3 Divine Parts",
    color: "#F97316", // Saffron
    glow: "rgba(249, 115, 22, 0.4)",
    events: [
      "Dharma declines to three-fourths; introductory rites and sacrifices begin.",
      "Emperor rule and societal duties established to preserve order.",
      "Lifespan diminishes to approximately 10,000 years."
    ],
    avatars: ["Vamana (Dwarf)", "Parashurama (Warrior with Axe)", "Rama (King of Ayodhya)"]
  },
  {
    name: "Dvapara Yuga",
    sanskritName: "द्वापरयुग",
    duration: "864,000 Academic / 2 Divine Parts",
    color: "#991B1B", // Maroon
    glow: "rgba(153, 27, 27, 0.4)",
    events: [
      "Dharma drops to one-half; Vedas are divided, and scripture is written down.",
      "Great empires rise, leading to the Mahabharata conflict.",
      "Lifespan settles around 1,000 years."
    ],
    avatars: ["Krishna (The Divine Teacher)", "Balarama (The Strong)"]
  },
  {
    name: "Kali Yuga",
    sanskritName: "कलियुग",
    duration: "432,000 Academic / 1 Divine Part",
    color: "#6D28D9", // Spiritual Violet
    glow: "rgba(109, 40, 217, 0.4)",
    events: [
      "The current age of darkness, discord, and material density.",
      "Virtuous qualities are reduced to one-fourth (25% Dharma).",
      "Human lifespan stabilizes around 100 years."
    ],
    avatars: ["Kalki (The Future Rider - Prophesied)"]
  }
];

const TimelinePreview = memo(() => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const activeYuga = YUGAS_DATA[selectedIdx];

  return (
    <section className="py-phi-3xl bg-[var(--bg-primary)] select-none">
      <div className="max-w-7xl mx-auto px-phi-lg flex flex-col items-center">
        
        {/* Section Heading */}
        <SectionHeading>Journey Through Yugas</SectionHeading>

        {/* Timeline Container */}
        <div 
          ref={containerRef}
          className={`w-full max-w-4xl mt-phi-xl flex flex-col items-center gap-phi-2xl transition-all duration-618 ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Timeline Bar (Horizontal on Desktop, Vertical on Mobile) */}
          <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-phi-xl py-phi-lg">
            
            {/* Connecting line (Desktop) */}
            <div 
              className="absolute left-[5%] right-[5%] top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-[var(--accent-gold)] via-[var(--accent-saffron)] to-[var(--accent-purple)] hidden md:block opacity-40"
              style={{ zIndex: 0 }}
            />
            
            {/* Connecting line (Mobile) */}
            <div 
              className="absolute top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[var(--accent-gold)] via-[var(--accent-saffron)] to-[var(--accent-purple)] md:hidden opacity-40"
              style={{ zIndex: 0 }}
            />

            {YUGAS_DATA.map((yuga, index) => {
              const isSelected = selectedIdx === index;
              return (
                <button
                  key={yuga.name}
                  onClick={() => setSelectedIdx(index)}
                  className="relative z-10 flex flex-col md:flex-col items-center justify-center gap-phi-sm bg-[var(--bg-card)] border border-[var(--border-gold)] hover:border-[var(--accent-gold)] p-phi-md rounded-phi-xl cursor-pointer select-none outline-none transition-all duration-382 ag-float active:scale-95 text-center min-w-[150px]"
                  style={{
                    boxShadow: isSelected ? `0 0 15px ${yuga.glow}` : "none",
                    borderColor: isSelected ? yuga.color : "var(--border-gold)"
                  }}
                >
                  {/* Dot */}
                  <span 
                    className="w-phi-lg h-phi-lg rounded-full animate-pulse transition-all duration-382"
                    style={{ 
                      backgroundColor: yuga.color,
                      boxShadow: `0 0 8px ${yuga.glow}` 
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="font-sanskrit text-phi-base font-bold text-[var(--text-sanskrit)]">
                      {yuga.sanskritName}
                    </span>
                    <span className="text-phi-sm font-semibold text-[var(--text-primary)]">
                      {yuga.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Yuga Detail Card */}
          <div 
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-gold)] rounded-phi-xl p-phi-xl flex flex-col md:grid md:grid-cols-[1fr_1.618fr] gap-phi-xl shadow-divine-md relative min-h-[220px]"
            style={{ 
              borderLeft: `5px solid ${activeYuga.color}`,
              boxShadow: `0 10px 30px ${activeYuga.glow.replace("0.4", "0.06")}`
            }}
          >
            {/* Left Col: Info */}
            <div className="flex flex-col gap-phi-md">
              <div>
                <h3 className="font-heading text-phi-xl font-extrabold text-[var(--text-primary)] leading-tight">
                  {activeYuga.name}
                </h3>
                <span className="font-sanskrit text-phi-lg font-bold text-[var(--text-sanskrit)]">
                  {activeYuga.sanskritName}
                </span>
              </div>
              <div>
                <span className="text-phi-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold block mb-[2px]">
                  Duration
                </span>
                <span className="text-phi-sm font-semibold font-mono text-[var(--text-primary)]">
                  {activeYuga.duration}
                </span>
              </div>
              <div>
                <span className="text-phi-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold block mb-[2px]">
                  Key Avatars
                </span>
                <div className="flex flex-wrap gap-phi-xs mt-[4px]">
                  {activeYuga.avatars.map((avatar) => (
                    <span 
                      key={avatar} 
                      className="text-phi-xs font-semibold px-phi-sm py-[2px] bg-[var(--bg-primary)] border border-[var(--border-gold)]/40 rounded-full"
                    >
                      {avatar}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Timeline Events */}
            <div className="flex flex-col justify-center gap-phi-md">
              <span className="text-phi-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                Characteristics & Epochs
              </span>
              <ul className="flex flex-col gap-phi-sm list-none p-0 m-0">
                {activeYuga.events.map((event, idx) => (
                  <li key={idx} className="flex items-start gap-phi-sm text-phi-sm md:text-phi-base leading-relaxed text-[var(--text-secondary)]">
                    <span className="text-[var(--accent-saffron)] mt-[4px]">✦</span>
                    <span>{event}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Explore full link */}
          <Link href="/history" className="no-underline mt-phi-md z-10">
            <Button variant="gold" size="lg" className="font-semibold shadow-divine-sm">
              Explore Full Timeline →
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
});

TimelinePreview.displayName = "TimelinePreview";
export default TimelinePreview;
