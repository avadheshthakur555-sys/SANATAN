"use client";

import React, { memo } from "react";
import Link from "next/link";
import { useSacredSound } from "@/lib/sacred-audio";

export interface ChapterItem {
  number: number;
  titleSanskrit: string;
  titleEnglish: string;
  verseCount: number;
}

export interface SidebarProps {
  chapters: ChapterItem[];
  activeChapterNumber?: number;
  progressPercentage?: number;
  scriptureSlug: string;
  className?: string;
  onSelectChapter?: () => void;
}

const Sidebar = memo<SidebarProps>(({
  chapters,
  activeChapterNumber,
  progressPercentage = 0,
  scriptureSlug,
  className = "",
  onSelectChapter,
}) => {
  const { playNavigate } = useSacredSound();

  const handleNav = () => {
    playNavigate();
    if (onSelectChapter) {
      onSelectChapter();
    }
  };

  return (
    <aside className={`w-full ag-glass rounded-phi-xl p-phi-lg sticky top-[94px] select-none ${className}`}>
      {/* Title */}
      <h3 className="font-heading text-phi-lg font-bold mb-phi-md uppercase tracking-wider text-[var(--accent-gold)]">
        Grantha Adhyayas
      </h3>

      {/* Progress Bar */}
      <div className="mb-phi-xl">
        <div className="flex justify-between text-phi-sm text-[var(--text-secondary)] mb-phi-xs">
          <span>Reading Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="h-[6px] bg-[var(--bg-primary)] rounded-full overflow-hidden border border-[var(--border-gold)]/40">
          <div 
            className="h-full bg-gradient-to-r from-[var(--accent-saffron)] to-[var(--accent-gold)] rounded-full transition-all duration-618 ease-divine"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Chapter List */}
      <div className="flex flex-col gap-phi-sm max-h-[50vh] overflow-y-auto pr-phi-xs scrollbar-thin">
        {chapters.map((chap) => {
          const isActive = activeChapterNumber === chap.number;
          return (
            <Link
              key={chap.number}
              href={`/library/${scriptureSlug}/chapter/${chap.number}`}
              onClick={handleNav}
              className={`flex items-center justify-between p-phi-sm rounded-phi-md border transition-all duration-382 no-underline cursor-pointer group ${
                isActive
                  ? "bg-[var(--bg-primary)] border-[var(--accent-saffron)] text-[var(--accent-saffron)] shadow-[0_2px_10px_rgba(249,115,22,0.1)]"
                  : "bg-transparent border-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] hover:border-[var(--border-gold)]"
              }`}
            >
              <div className="flex items-center gap-phi-sm">
                {/* Active Indicator Saffron Dot */}
                {isActive ? (
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-saffron)] shadow-[0_0_6px_rgba(249,115,22,0.8)] animate-pulse" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-[var(--accent-gold)]/40 transition-colors" />
                )}
                <div className="flex flex-col">
                  <span className={`font-sanskrit text-phi-sm leading-tight ${isActive ? "text-[var(--accent-saffron)]" : "text-[var(--text-sanskrit)]"}`}>
                    अध्याय {chap.number}: {chap.titleSanskrit}
                  </span>
                  <span className="text-phi-xs text-[var(--text-secondary)]">
                    Chapter {chap.number}: {chap.titleEnglish}
                  </span>
                </div>
              </div>
              <span className="text-phi-xs font-mono font-semibold px-phi-sm py-[2px] bg-[var(--bg-primary)] rounded-full border border-[var(--border-gold)]/20">
                {chap.verseCount}v
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;
