"use client";

import React, { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Flame, Compass, Heart } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";

interface Ritual {
  name: string;
  sanskrit: string;
  category: "Yajnas" | "Sanskaras" | "Daily Practices";
  description: string;
  purpose: string;
  icon: React.ComponentType<{ className?: string }>;
}

const RITUALS_DATA: Ritual[] = [
  {
    name: "Homa / Yajna",
    sanskrit: "यज्ञ / होम",
    category: "Yajnas",
    description: "A sacred fire ritual where offerings (ghee, grains, herbs) are made into consecrated fire while chanting Sanskrit mantras.",
    purpose: "Purifying the atmosphere, invoking celestial energies, and maintaining cosmic balance.",
    icon: Flame
  },
  {
    name: "Sandhyavandanam",
    sanskrit: "सन्ध्यावन्दनम्",
    category: "Daily Practices",
    description: "A daily ritual performed three times a day (sunrise, noon, sunset) involving Gayatri mantra recitation, pranayama, and water libations.",
    purpose: "Cultivating mental clarity, spiritual focus, and alignment with the solar energy cycles.",
    icon: Compass
  },
  {
    name: "Upanayana",
    sanskrit: "उपनयनम्",
    category: "Sanskaras",
    description: "The sacred thread ceremony marking the initiation of a child into formal spiritual education and study of scriptures.",
    purpose: "Signifying a second or spiritual birth (Dwija) and undertaking of ethical responsibilities.",
    icon: Heart
  },
  {
    name: "Vivaha Sanskara",
    sanskrit: "विवाह संस्कार",
    category: "Sanskaras",
    description: "The sacred wedding sacrament involving circumambulating the fire seven times (Saptapadi) and vows of mutual support.",
    purpose: "Uniting two souls to walk the path of Dharma, Artha, Kama, and Moksha together.",
    icon: Heart
  },
  {
    name: "Japa Meditation",
    sanskrit: "जप",
    category: "Daily Practices",
    description: "The meditative repetition of a divine name or mantra using a rosary (mala) containing 108 beads.",
    purpose: "Quietening the mind, cultivating devotion, and raising vibrational frequency.",
    icon: Compass
  }
];

export default function RitualsPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Yajnas" | "Sanskaras" | "Daily Practices">("All");
  const { playSuccess, playClick } = useSacredSound();

  const handleRitualClick = () => {
    playSuccess();
  };

  const filteredRituals = RITUALS_DATA.filter((ritual) => {
    return activeCategory === "All" || ritual.category === activeCategory;
  });

  return (
    <div className="ag-page-enter flex flex-col min-h-screen">
      <Breadcrumb items={[{ label: "Sacred Rituals" }]} />
      
      <div className="flex-grow max-w-7xl mx-auto px-6 w-full pb-12 pt-2">
        {/* Title */}
        <SectionHeading>Sacred Rituals & Vidhi</SectionHeading>

        <p className="font-body text-sm md:text-base text-[var(--text-secondary)] text-center max-w-3xl mx-auto mb-10 -mt-2">
          Explore the metaphysical sciences of Sanatan rituals, designed to align individual awareness with the cosmic order through mantra vibration, fire elements, and lifecycle ceremonies.
        </p>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto justify-center mb-10 pb-2">
          {(["All", "Yajnas", "Sanskaras", "Daily Practices"] as const).map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "primary" : "ghost"}
              size="sm"
              onClick={() => { playClick(); setActiveCategory(cat); }}
              className="whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRituals.map((ritual, idx) => {
            const Icon = ritual.icon;
            return (
              <Card
                key={idx}
                className="hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#B8860B15] text-[#FFD700] border border-[#B8860B30]">
                    <Icon className="w-6 h-6 animate-pulse-slow" />
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <h3 className="font-serif text-lg font-bold text-white leading-tight">
                        {ritual.name}
                      </h3>
                      <span className="font-sanskrit text-sm text-[#FFD700]/70 font-semibold">
                        {ritual.sanskrit}
                      </span>
                    </div>
                    <span className="inline-block mt-1 text-[10px] uppercase tracking-wider bg-[#B8860B20] text-[#FFD700] px-2 py-0.5 rounded font-bold font-mono">
                      {ritual.category}
                    </span>
                    <p className="font-body text-xs text-[var(--text-secondary)] mt-3 leading-relaxed">
                      {ritual.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-[#B8860B10]">
                      <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                        Metaphysical Purpose
                      </span>
                      <p className="font-body text-xs text-gray-400 mt-1 italic">
                        &ldquo;{ritual.purpose}&rdquo;
                      </p>
                    </div>
                    <div className="mt-5">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleRitualClick}
                        className="w-full text-center"
                      >
                        Initiate Vidhi Guide
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
