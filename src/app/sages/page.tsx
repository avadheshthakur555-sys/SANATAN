"use client";

import React, { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { User, Scroll } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";

interface Sage {
  name: string;
  sanskrit: string;
  era: string;
  majorWork: string;
  description: string;
}

const SAGES_DATA: Sage[] = [
  {
    name: "Sage Veda Vyasa",
    sanskrit: "वेदव्यास",
    era: "Dvapara Yuga",
    majorWork: "Vedas Compilation, Mahabharata, 18 Puranas",
    description: "The legendary compiler who classified the primordial single Veda into four distinct books to preserve them through Kali Yuga, and wrote the Mahabharata epic."
  },
  {
    name: "Sage Valmiki",
    sanskrit: "वाल्मीकि",
    era: "Treta Yuga",
    majorWork: "Ramayana, Yoga Vasistha",
    description: "Revered as the Adi Kavi (the first poet) of Sanskrit literature, who composed the Ramayana detailing the lifecycle and virtues of Lord Rama."
  },
  {
    name: "Sage Patanjali",
    sanskrit: "पतञ्जलि",
    era: "c. 2nd Century BCE",
    majorWork: "Yoga Sutras, Mahabhasya",
    description: "The divine scholar who codified the ancient techniques of mental control and meditation into the 196 aphorisms of the Yoga Sutras."
  },
  {
    name: "Adi Shankaracharya",
    sanskrit: "आदि शङ्कराचार्य",
    era: "c. 788 CE – 820 CE",
    majorWork: "Brahmasutra Bhashya, Vivekachudamani",
    description: "The great philosopher and saint who consolidated the Advaita Vedanta school of non-dualism and established the four monastic seats (Mathas) across India."
  },
  {
    name: "Sage Agastya",
    sanskrit: "अगस्त्य",
    era: "Vedic Period",
    majorWork: "Lalitha Sahasranama, Agastya Gita",
    description: "One of the legendary Saptarishis (Seven Great Seers), credited with spreading Vedic wisdom to Southern India and pioneering early Tamil language grammar."
  }
];

export default function SagesPage() {
  const { playSuccess } = useSacredSound();

  return (
    <div className="ag-page-enter flex flex-col min-h-screen">
      <Breadcrumb items={[{ label: "Sages & Rishis" }]} />
      
      <div className="flex-grow max-w-7xl mx-auto px-6 w-full pb-12 pt-2">
        {/* Title */}
        <SectionHeading>Ancient Sages & Rishis</SectionHeading>

        <p className="font-body text-sm md:text-base text-[var(--text-secondary)] text-center max-w-3xl mx-auto mb-10 -mt-2">
          Explore the profiles of the Rishis, seers, and philosophers who received the cosmic vibration of truth and structured it as scripture, logic, and spiritual methodology.
        </p>

        {/* Sages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {SAGES_DATA.map((sage, idx) => (
            <Card
              key={idx}
              onClick={playSuccess}
              className="bg-white/5 border border-[var(--border-gold)] p-6 hover-lift rounded-xl flex flex-col justify-between h-[230px] cursor-pointer group relative"
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center w-full">
                  <User className="w-5 h-5 text-[var(--color-saffron)]" />
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[var(--accent-gold)]/10 text-[var(--accent-gold)]">
                    {sage.era}
                  </span>
                </div>

                <div>
                  <h3 className="font-sanskrit text-sm font-semibold text-[var(--color-maroon)] dark:text-[var(--accent-gold)] leading-tight">
                    {sage.sanskrit}
                  </h3>
                  <h4 className="font-heading text-lg font-bold text-[var(--text-primary)] mt-0.5">
                    {sage.name}
                  </h4>
                </div>

                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {sage.description}
                </p>
              </div>

              <div className="border-t border-[var(--border-gold)]/10 pt-3 text-[11px] text-[var(--text-secondary)] flex items-center gap-1">
                <Scroll className="w-3.5 h-3.5 text-[var(--color-saffron)]" />
                <span><span className="font-bold text-[var(--color-saffron)]">Works:</span> {sage.majorWork}</span>
              </div>
            </Card>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
}
