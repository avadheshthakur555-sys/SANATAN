"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";

export interface NextReadItem {
  titleSanskrit?: string;
  titleEnglish: string;
  description: string;
  href: string;
  category: string;
}

interface NextReadingProps {
  items: NextReadItem[];
  title?: string;
}

export default function NextReading({ items, title = "Continue Your Journey" }: NextReadingProps) {
  const { playNavigate } = useSacredSound();

  if (!items || items.length === 0) return null;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12 relative z-20 border-t border-[var(--border-gold)]/35 mt-12">
      <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
        <Compass className="w-5 h-5 text-[var(--accent-gold)] animate-spin-slow" />
        <h3 className="text-lg font-serif text-[var(--accent-gold)] uppercase tracking-wider">
          {title}
        </h3>
      </div>

      {/* Grid: Row on desktop, horizontal scroll on mobile */}
      <div className="flex overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-3 gap-6 scrollbar-thin snap-x snap-mandatory">
        {items.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            onClick={() => playNavigate()}
            className="group flex-shrink-0 w-[280px] md:w-auto snap-start bg-[var(--bg-secondary)] border border-[var(--border-gold)]/40 hover:border-[var(--accent-gold)] p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(184,134,11,0.06)] dark:hover:shadow-[0_8px_30px_rgba(184,134,11,0.15)] no-underline"
          >
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent-gold)] block mb-2 font-mono">
                {item.category}
              </span>
              
              {item.titleSanskrit && (
                <span className="font-sanskrit text-sm text-[var(--accent-gold)]/80 font-semibold block mb-1">
                  {item.titleSanskrit}
                </span>
              )}
              
              <h4 className="text-[var(--text-primary)] font-serif text-base font-bold group-hover:text-[var(--accent-gold)] transition-colors leading-snug">
                {item.titleEnglish}
              </h4>
              
              <p className="text-[var(--text-secondary)] text-xs leading-relaxed mt-2 line-clamp-3">
                {item.description}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[var(--accent-gold)] font-bold uppercase tracking-wider mt-4 pt-3 border-t border-[var(--border-gold)]/20">
              <span>Explore Portal</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
