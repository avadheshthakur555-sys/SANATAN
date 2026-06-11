"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Volume2, Bookmark, Share2, Copy, Check, Settings, Eye, EyeOff, Scroll } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";

interface ChapterData {
  number: number;
  titleSanskrit: string;
  titleEnglish: string;
  verseCount: number;
  summary: string;
}

interface VerseData {
  id: string;
  verseNumber: string;
  textSanskrit: string;
  textTransliteration: string;
  translationHindi: string;
  translationEnglish: string;
  wordMeanings: string; // JSON string array of {word, iast, meaning_en, meaning_hi}
  commentaries: string; // JSON string array of {author, text_en, text_hi}
  references: string;
  relatedConcepts: string;
  audioUrl?: string | null;
  chapterNumber?: number;
}

interface ScriptureReaderClientProps {
  scriptureSlug: string;
  scriptureTitleEnglish: string;
  chapters: ChapterData[];
  activeChapterNumber: number;
  activeChapterTitleSanskrit: string;
  activeChapterTitleEnglish: string;
  activeChapterSummary: string;
  verses: VerseData[];
}

export default function ScriptureReaderClient({
  scriptureSlug,
  scriptureTitleEnglish,
  chapters,
  activeChapterNumber,
  activeChapterTitleSanskrit,
  activeChapterTitleEnglish,
  activeChapterSummary,
  verses,
}: ScriptureReaderClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedVerseId, setCopiedVerseId] = useState<string | null>(null);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem("sanatan-bookmarked-verses");
        if (stored) {
          setBookmarkedVerses(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load bookmarks", e);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  
  // Custom display settings
  const [textSize, setTextSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [showSanskrit, setShowSanskrit] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showHindi, setShowHindi] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [showMeanings, setShowMeanings] = useState(true);
  const [showCommentaries, setShowCommentaries] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [readingMode, setReadingMode] = useState<"focus" | "scholar" | "story">("scholar");

  // Dynamic active commentary author index per verse
  const [activeCommentaryAuthor, setActiveCommentaryAuthor] = useState<Record<string, string>>({});

  const { playClick, playSuccess, playNavigate, playOm } = useSacredSound();

  // Progress Bar Percentage based on chapter count
  const totalChaptersCount = chapters.length;
  const progressPercentage = totalChaptersCount > 0 ? (activeChapterNumber / totalChaptersCount) * 100 : 0;

  // Text-To-Speech Sanskrit reader
  const handleListenChant = (text: string) => {
    playOm();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "sa-IN"; // Set language to Sanskrit (India)
        utterance.rate = 0.75; // Slower speed for clear pronunciation
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }, 1000);
    }
  };

  const handleCopyVerse = async (v: VerseData) => {
    const textToCopy = `${v.textSanskrit}\n\n${v.textTransliteration}\n\nHI: ${v.translationHindi}\n\nEN: ${v.translationEnglish}\n\n${scriptureTitleEnglish} Chapter ${activeChapterNumber} Verse ${v.verseNumber}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      playSuccess();
      setCopiedVerseId(v.id);
      setTimeout(() => setCopiedVerseId(null), 2000);
    } catch (e) {
      console.error("Failed to copy verse text", e);
    }
  };

  const handleBookmarkVerse = (id: string) => {
    playSuccess();
    setBookmarkedVerses(prev => {
      const updated = {
        ...prev,
        [id]: !prev[id]
      };
      try {
        localStorage.setItem("sanatan-bookmarked-verses", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save bookmarks", e);
      }
      return updated;
    });
  };

  const handleShareVerse = (v: VerseData) => {
    playSuccess();
    if (navigator.share) {
      navigator.share({
        title: `${scriptureTitleEnglish} Chapter ${activeChapterNumber} Verse ${v.verseNumber}`,
        text: `${v.textSanskrit}\n- ${scriptureTitleEnglish} ${activeChapterNumber}.${v.verseNumber}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Text size classes mapping
  const textSizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const titleSizeClasses = {
    sm: "text-lg",
    base: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <div className="relative flex flex-col lg:flex-row gap-8 items-start w-full min-h-screen">
      
      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => { playClick(); setIsSidebarOpen(false); }}
        />
      )}

      {/* LEFT SIDEBAR Chapter Selection */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[280px] bg-[var(--bg-secondary)] border-r border-[var(--border-gold)]/40 p-6 z-50 flex flex-col gap-6 transform transition-transform duration-300 lg:sticky lg:top-[94px] lg:translate-x-0 lg:z-30 lg:rounded-xl lg:border lg:flex-shrink-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${readingMode === "focus" ? "lg:hidden" : ""}
        `}
      >
        {/* Mobile Header */}
        <div className="flex justify-between items-center lg:hidden">
          <span className="font-serif text-[var(--accent-gold)] font-bold text-sm truncate max-w-[200px]">{scriptureTitleEnglish}</span>
          <button
            onClick={() => { playClick(); setIsSidebarOpen(false); }}
            className="p-1 rounded bg-[var(--bg-primary)] border border-[var(--border-gold)]/30 text-[var(--text-primary)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Title */}
        <div className="hidden lg:block">
          <h3 className="font-serif text-[var(--accent-gold)] text-lg font-bold uppercase tracking-wider truncate">
            {scriptureTitleEnglish}
          </h3>
          <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest mt-1">
            Chapter Directory
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full">
          <div className="flex justify-between text-[10px] text-[var(--text-secondary)] mb-1 font-mono">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-1.5 w-full bg-[var(--bg-primary)] border border-[var(--border-gold)]/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-saffron)] rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Chapter List */}
        <div className="flex-grow overflow-y-auto pr-1 flex flex-col gap-2 scrollbar-thin scrollbar-thumb-white/5">
          <Link
            href={`/library/${scriptureSlug}/chapter/all`}
            onClick={() => {
              playNavigate();
              setIsSidebarOpen(false);
            }}
            className={`flex items-center justify-between p-2.5 rounded-lg border transition-all duration-300 group no-underline cursor-pointer mb-2
              ${activeChapterNumber === 0
                ? "bg-[var(--bg-primary)] border-[var(--accent-gold)] text-[var(--accent-gold)] shadow-[0_2px_12px_rgba(212,160,23,0.15)]"
                : "border-dashed border-[var(--border-gold)]/30 text-[var(--text-secondary)] hover:bg-[var(--bg-primary)]/40 hover:border-[var(--border-gold)]/30 hover:text-[var(--text-primary)]"
              }
            `}
          >
            <div className="flex items-center gap-2">
              <Scroll className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
              <div className="flex flex-col">
                <span className="font-sanskrit text-xs leading-normal">सम्पूर्ण ग्रन्थः</span>
                <span className="text-[9px] text-[var(--text-secondary)] font-semibold">All Chapters Mode</span>
              </div>
            </div>
          </Link>

          {chapters.map((chap) => {
            const isActive = chap.number === activeChapterNumber;
            return (
              <Link
                key={chap.number}
                href={`/library/${scriptureSlug}/chapter/${chap.number}`}
                onClick={() => {
                  playNavigate();
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center justify-between p-2.5 rounded-lg border transition-all duration-300 group no-underline cursor-pointer
                  ${isActive
                    ? "bg-[var(--bg-primary)] border-[var(--accent-gold)] text-[var(--accent-gold)] shadow-[0_2px_12px_rgba(212,160,23,0.06)] dark:shadow-[0_2px_12px_rgba(212,160,23,0.15)]"
                    : "border-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-primary)]/40 hover:border-[var(--border-gold)]/30 hover:text-[var(--text-primary)]"
                  }
                `}
              >
                <div className="flex items-center gap-2 max-w-[190px]">
                  <div className={`w-1.5 h-1.5 rotate-45 rounded-full transition-colors shrink-0
                    ${isActive ? "bg-[var(--accent-gold)]" : "bg-transparent group-hover:bg-[var(--accent-saffron)]"}
                  `} />
                  <div className="flex flex-col truncate">
                    <span className="font-sanskrit text-xs leading-normal">
                      अध्याय {chap.number}
                    </span>
                    <span className="text-[9px] text-[var(--text-secondary)] font-semibold truncate">
                      Ch {chap.number}: {chap.titleEnglish}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-[var(--bg-primary)] border border-[var(--border-gold)]/20 px-1.5 py-0.5 rounded-full shrink-0 text-[var(--text-secondary)]">
                  {chap.verseCount}v
                </span>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* RIGHT MAIN READING CANVAS */}
      <div className={`flex-1 w-full flex flex-col gap-6
        ${readingMode === "focus" ? "lg:max-w-4xl lg:mx-auto" : "lg:max-w-[calc(100%-312px)]"}
      `}>
        
        {/* Chapter Header Controls */}
        <div className="ag-glass-premium p-6 flex flex-col gap-4 border border-[var(--border-gold)]/40 w-full">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => { playClick(); setIsSidebarOpen(true); }}
              className="lg:hidden px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-gold)]/40 rounded text-[var(--accent-gold)] font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              ☰ Chapters
            </button>

            <div className="flex items-center gap-4">
              {/* Reading Modes Switcher */}
              <div className="flex bg-[var(--bg-secondary)] border border-[var(--border-gold)]/40 p-0.5 rounded-lg text-xs font-mono">
                {[
                  { id: "focus", label: "Focus", desc: "Clean, distraction-free reading" },
                  { id: "scholar", label: "Scholar", desc: "Detailed commentaries and word breakdowns" },
                  { id: "story", label: "Story", desc: "Visual storytelling and character overlays" }
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => { playClick(); setReadingMode(m.id as "focus" | "scholar" | "story"); }}
                    className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1
                      ${readingMode === m.id 
                        ? "bg-[var(--accent-gold)] text-[var(--bg-primary)] font-bold shadow-md" 
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    title={m.desc}
                  >
                    <span>{m.id === "focus" ? "🕯️" : m.id === "scholar" ? "🎓" : "🕉️"}</span>
                    <span className="hidden sm:inline">{m.label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => { playClick(); setShowSettings(!showSettings); }}
                className={`p-2 border rounded-lg transition-colors cursor-pointer ${showSettings ? "bg-[var(--accent-gold)] border-[var(--accent-gold)] text-[var(--bg-primary)]" : "bg-[var(--bg-secondary)] border border-[var(--border-gold)]/40 text-[var(--text-secondary)] hover:text-[var(--accent-gold)]"}`}
                title="Reading Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Collapsible Reader Controls Panel */}
          {showSettings && (
            <div className="bg-[var(--bg-primary)]/80 p-4 rounded-xl border border-[var(--border-gold)]/40 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[var(--accent-gold)] uppercase tracking-wider block font-bold">Text Size</span>
                <div className="flex gap-2">
                  {(["sm", "base", "lg", "xl"] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => { playClick(); setTextSize(size); }}
                      className={`px-3 py-1 rounded border capitalize font-semibold cursor-pointer ${textSize === size ? "bg-[var(--border-gold)]/25 border-[var(--accent-gold)] text-[var(--accent-gold)]" : "bg-transparent border-[var(--border-gold)]/20 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[var(--accent-gold)] uppercase tracking-wider block font-bold">Visible Content</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Sanskrit", state: showSanskrit, set: setShowSanskrit },
                    { label: "IAST Transliteration", state: showTransliteration, set: setShowTransliteration },
                    { label: "Hindi", state: showHindi, set: setShowHindi },
                    { label: "English", state: showEnglish, set: setShowEnglish },
                    { label: "Word Meanings", state: showMeanings, set: setShowMeanings },
                    { label: "Commentaries", state: showCommentaries, set: setShowCommentaries },
                  ].map((toggle, idx) => (
                    <button
                      key={idx}
                      onClick={() => { playClick(); toggle.set(!toggle.state); }}
                      className={`px-2.5 py-1 rounded border flex items-center gap-1.5 cursor-pointer ${toggle.state ? "bg-[var(--border-gold)]/20 border-[var(--accent-gold)] text-[var(--accent-gold)]" : "bg-transparent border-[var(--border-gold)]/20 text-[var(--text-secondary)]"}`}
                    >
                      {toggle.state ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {toggle.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chapter Names & Navigation Row */}
          <div className="flex flex-col items-center text-center gap-2 border-t border-[var(--border-gold)]/20 pt-4 mt-2">
            <span className="font-sanskrit text-2xl md:text-3xl text-[var(--accent-gold)] font-bold">
              {activeChapterTitleSanskrit}
            </span>
            <h2 className="text-[var(--text-primary)] font-serif text-xl md:text-2xl font-bold uppercase tracking-wider">
              {activeChapterNumber === 0 ? "Complete Scripture" : `Chapter ${activeChapterNumber}: ${activeChapterTitleEnglish}`}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] max-w-xl leading-relaxed mt-1 italic">
              {activeChapterSummary}
            </p>
          </div>

          {/* Next/Prev Chapter Navigation Buttons */}
          {activeChapterNumber > 0 ? (
            <div className="flex justify-between items-center border-t border-[var(--border-gold)]/20 pt-4 w-full">
              {activeChapterNumber > 1 ? (
                <Link
                  href={`/library/${scriptureSlug}/chapter/${activeChapterNumber - 1}`}
                  onClick={playNavigate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-gold)]/40 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-gold)] rounded-lg hover:bg-[var(--border-gold)]/10 transition-colors no-underline cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev Chapter
                </Link>
              ) : (
                <div className="w-20" />
              )}

              <Link
                href="/library"
                onClick={playNavigate}
                className="text-[10px] text-[var(--text-secondary)] hover:text-[var(--accent-gold)] uppercase tracking-widest font-mono font-bold no-underline"
              >
                📚 Library Index
              </Link>

              {activeChapterNumber < totalChaptersCount ? (
                <Link
                  href={`/library/${scriptureSlug}/chapter/${activeChapterNumber + 1}`}
                  onClick={playNavigate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-gold)]/40 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-gold)] rounded-lg hover:bg-[var(--border-gold)]/10 transition-colors no-underline cursor-pointer"
                >
                  Next Chapter <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <div className="w-20" />
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center border-t border-[var(--border-gold)]/20 pt-4 w-full">
              <Link
                href={`/library/${scriptureSlug}`}
                onClick={playNavigate}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-[var(--accent-gold)]/40 text-xs text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10 rounded-lg transition-colors no-underline cursor-pointer uppercase tracking-widest font-bold font-mono"
              >
                📖 Back to Scripture Overview
              </Link>
            </div>
          )}
        </div>

        {/* Verses Column */}
        <div className="flex flex-col gap-8 w-full select-text pb-20">
          {verses.map((verse) => {
            // Parse word meanings JSON
            let parsedMeanings: { word: string; iast: string; meaning_en: string; meaning_hi: string }[] = [];
            try {
              parsedMeanings = JSON.parse(verse.wordMeanings);
            } catch {
              parsedMeanings = [];
            }

            // Parse commentaries JSON
            let parsedCommentaries: { author: string; text_en: string; text_hi: string }[] = [];
            try {
              parsedCommentaries = JSON.parse(verse.commentaries);
            } catch {
              parsedCommentaries = [];
            }

            // Get active commentary author for this verse
            const activeAuthor = activeCommentaryAuthor[verse.id] || (parsedCommentaries[0]?.author || "");
             if (readingMode === "focus") {
               return (
                 <article
                   key={verse.id}
                   id={`verse-${verse.verseNumber}`}
                   className="py-12 border-b border-[#D4A017]/10 last:border-b-0 flex flex-col items-center gap-6 text-center select-text transition-all"
                 >
                   {/* Subtle Verse Indicator */}
                   <span className="text-[10px] font-mono tracking-widest text-[#D4A017] uppercase opacity-65 font-bold">
                     — {verse.chapterNumber || activeChapterNumber}.{verse.verseNumber} —
                   </span>

                   {/* Sanskrit text */}
                   {showSanskrit && (
                     <p className={`font-sanskrit text-[#8C2D19] dark:text-[#F5C242] font-bold leading-loose whitespace-pre-line select-text ${titleSizeClasses[textSize]} max-w-2xl`}>
                       {verse.textSanskrit}
                     </p>
                   )}

                   {/* Transliteration */}
                   {showTransliteration && (
                     <p className={`text-gray-400 dark:text-gray-500 italic select-text ${textSizeClasses[textSize]} max-w-xl`}>
                       {verse.textTransliteration}
                     </p>
                   )}

                   {/* English/Hindi translations in thin elegant fonts */}
                   {showEnglish && (
                     <p className={`text-[#3E2723]/80 dark:text-[#F5F2EB]/80 leading-relaxed font-serif select-text max-w-xl text-sm md:text-base font-light italic mt-2`}>
                       &ldquo;{verse.translationEnglish}&rdquo;
                     </p>
                   )}

                   {showHindi && (
                     <p className={`text-[#8C2D19]/75 dark:text-[#F97316]/75 leading-relaxed font-serif select-text max-w-xl text-sm md:text-base font-light`}>
                       &ldquo;{verse.translationHindi}&rdquo;
                     </p>
                   )}
                 </article>
               );
             }

             return (
               <article
                 key={verse.id}
                 id={`verse-${verse.verseNumber}`}
                 className="relative flex flex-col gap-6 bg-[#FAF7F0] dark:bg-[#120C1E]/45 p-6 md:p-8 border border-[#D4A01720] hover:border-[#D4A01750] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-sm transition-all"
               >
                 {/* Verse Indicator and Toolbar */}
                 <div className="flex justify-between items-center border-b border-[#D4A01710] pb-3 w-full">
                   <span className="font-mono text-xs text-[#D4A017] font-bold">
                     VERSE {verse.chapterNumber || activeChapterNumber}.{verse.verseNumber}
                   </span>
                   
                   <div className="flex gap-2.5">
                     <button
                       onClick={() => handleListenChant(verse.textSanskrit)}
                       className="p-1.5 rounded bg-white/5 border border-white/10 hover:border-[#D4A017] text-[var(--text-primary)] hover:text-[#D4A017] transition-colors cursor-pointer"
                       title="Listen Chanting"
                     >
                       <Volume2 className="w-4 h-4" />
                     </button>
                     <button
                       onClick={() => handleBookmarkVerse(verse.id)}
                       className={`p-1.5 rounded bg-white/5 border border-white/10 transition-colors cursor-pointer ${bookmarkedVerses[verse.id] ? "text-[#FF8C00] border-[#FF8C00]" : "text-[var(--text-primary)] hover:text-[#FF8C00] hover:border-[#FF8C00]"}`}
                       title="Bookmark Verse"
                     >
                       <Bookmark className="w-4 h-4" />
                     </button>
                     <button
                       onClick={() => handleShareVerse(verse)}
                       className="p-1.5 rounded bg-white/5 border border-white/10 hover:border-white text-[var(--text-primary)] transition-colors cursor-pointer"
                       title="Share Verse"
                     >
                       <Share2 className="w-4 h-4" />
                     </button>
                     <button
                       onClick={() => handleCopyVerse(verse)}
                       className="p-1.5 rounded bg-white/5 border border-white/10 hover:border-white text-[var(--text-primary)] transition-colors flex items-center justify-center cursor-pointer min-w-[32px]"
                       title="Copy Verse"
                     >
                       {copiedVerseId === verse.id ? <Check className="w-4 h-4 text-green-500 animate-pulse" /> : <Copy className="w-4 h-4" />}
                     </button>
                   </div>
                 </div>

                 {/* 1. Sanskrit Original Text */}
                 {showSanskrit && (
                   <div className="text-center py-4 w-full">
                     <p className={`font-sanskrit text-[#8C2D19] dark:text-[#FFD700] font-bold leading-loose whitespace-pre-line select-text ${titleSizeClasses[textSize]} drop-shadow-[0_0_5px_rgba(255,215,0,0.05)]`}>
                       {verse.textSanskrit}
                     </p>
                   </div>
                 )}

                 {/* 2. IAST Transliteration */}
                 {showTransliteration && (
                   <div className="text-center pb-2 w-full border-b border-[#D4A01710]">
                     <p className={`text-gray-400 dark:text-gray-500 italic leading-relaxed select-text ${textSizeClasses[textSize]}`}>
                       {verse.textTransliteration}
                     </p>
                   </div>
                 )}

                 {/* 3. Word meanings (Pills) */}
                 {readingMode === "scholar" && showMeanings && parsedMeanings.length > 0 && (
                   <div className="flex flex-col gap-2 bg-[#FAF7F0]/85 dark:bg-[#0a0614]/35 p-4 rounded border border-[#D4AF37]/20 w-full">
                     <span className="text-[10px] text-[#8C2D19] dark:text-[#F97316] uppercase font-mono tracking-widest block font-bold">
                       Word Meanings • पदार्थ
                     </span>
                     <div className="flex flex-wrap gap-2 mt-1">
                       {parsedMeanings.map((m, idx) => (
                         <div 
                           key={idx} 
                           className="bg-[#FAF7F0] dark:bg-[#120C1E]/55 border border-[#D4AF37]/25 hover:border-[#D4AF37]/45 rounded-sm p-2 text-xs text-left transition-all max-w-[200px]"
                         >
                           <span className="font-sanskrit text-[#8C2D19] dark:text-[#FFD700] font-bold block">{m.word}</span>
                           <span className="text-[9px] text-[#8D6E63] dark:text-gray-400 font-mono italic block mt-0.5">{m.iast}</span>
                           <span className="text-[#3E2723] dark:text-gray-300 block mt-1 leading-normal font-medium">{m.meaning_en}</span>
                           {m.meaning_hi && (
                             <span className="text-[#8D6E63] dark:text-gray-400 block text-[9px] leading-normal mt-0.5">{m.meaning_hi}</span>
                           )}
                         </div>
                       ))}
                     </div>
                   </div>
                 )}

                 {/* 4. Parallel Translations (Hindi & English) */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-2">
                   {showHindi && (
                     <div className="flex flex-col gap-2 bg-[#FAF7F0]/65 dark:bg-[#0a0614]/25 p-4 rounded border border-[#D4AF37]/15">
                       <span className="text-[10px] text-[#8C2D19] dark:text-[#F97316] uppercase font-mono tracking-widest block font-bold">Hindi • अनुवाद</span>
                       <p className={`text-[#3E2723] dark:text-gray-300 leading-relaxed select-text font-medium ${textSizeClasses[textSize]}`}>
                         {verse.translationHindi}
                       </p>
                     </div>
                   )}
                   {showEnglish && (
                     <div className="flex flex-col gap-2 bg-[#FAF7F0]/65 dark:bg-[#0a0614]/25 p-4 rounded border border-[#D4AF37]/15">
                       <span className="text-[10px] text-[#8C2D19] dark:text-[#F97316] uppercase font-mono tracking-widest block font-bold">English • Translation</span>
                       <p className={`text-[#8D6E63] dark:text-gray-400 leading-relaxed select-text ${textSizeClasses[textSize]}`}>
                         {verse.translationEnglish}
                       </p>
                     </div>
                   )}
                 </div>

                 {/* 5. Commentary tabs and text */}
                 {readingMode === "scholar" && showCommentaries && parsedCommentaries.length > 0 && (
                   <div className="flex flex-col gap-3 bg-[#FAF7F0]/85 dark:bg-[#0a0614]/35 border border-[#D4AF37]/25 p-4 rounded w-full mt-2">
                     {/* Authors toggle tabs */}
                     <div className="flex items-center gap-2 border-b border-[#D4AF37]/15 pb-2">
                       <span className="text-[10px] text-[#8C2D19] dark:text-[#F97316] uppercase font-mono tracking-widest block font-bold mr-2">Commentary:</span>
                       {parsedCommentaries.map((comm) => (
                         <button
                           key={comm.author}
                           onClick={() => {
                             playClick();
                             setActiveCommentaryAuthor(prev => ({
                               ...prev,
                               [verse.id]: comm.author
                             }));
                           }}
                           className={`px-3 py-1 rounded text-[10px] font-semibold uppercase tracking-wider border transition-all cursor-pointer ${activeAuthor === comm.author ? "bg-[#D4AF37]/15 border-[#D4AF37]/50 text-[#8C2D19] dark:text-[#FFD700]" : "bg-transparent border-transparent text-gray-500 hover:text-[var(--text-primary)]"}`}
                         >
                           {comm.author}
                         </button>
                       ))}
                     </div>

                     {/* Commentary Content */}
                     {parsedCommentaries.map((comm) => {
                       if (comm.author !== activeAuthor) return null;
                       return (
                         <div key={comm.author} className="flex flex-col gap-2 mt-1">
                           {comm.text_hi && (
                             <p className={`text-[#3E2723] dark:text-gray-300 italic leading-relaxed select-text ${textSizeClasses[textSize]}`}>
                               {comm.text_hi}
                             </p>
                           )}
                           {comm.text_en && (
                             <p className={`text-[#8D6E63] dark:text-gray-400 italic leading-relaxed select-text ${textSizeClasses[textSize]}`}>
                               {comm.text_en}
                             </p>
                           )}
                         </div>
                       );
                     })}
                   </div>
                 )}

                 {/* 6. Story Mode Overlay */}
                 {readingMode === "story" && (
                   <div className="flex flex-col gap-3 bg-[linear-gradient(135deg,_rgba(212,175,55,0.06),_rgba(140,45,25,0.03))] dark:bg-[linear-gradient(135deg,_rgba(212,175,55,0.03),_rgba(140,45,25,0.01))] border border-[#D4AF37]/35 p-5 rounded mt-2 text-xs font-serif text-[var(--text-primary)] w-full">
                     <div className="flex items-center gap-2 border-b border-[#D4AF37]/20 pb-2 mb-1 w-full justify-between flex-wrap">
                       <div className="flex items-center gap-2">
                         <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF8C00] font-bold">Dialogue Context & Storytelling</span>
                         <span className="text-[#D4AF37]">•</span>
                         <span className="text-[9px] text-[var(--text-secondary)]">Narrative Insight</span>
                       </div>
                       <Link href="/history" className="text-[9px] font-mono text-[#D4AF37] hover:underline uppercase tracking-wide">
                         View Historical Timeline &rarr;
                       </Link>
                     </div>
                     
                     <div className="border-l-2 border-[#D4AF37] pl-3 py-1 bg-[#D4AF37]/5 rounded-r">
                       <p className="text-xs leading-relaxed italic text-[#3E2723] dark:text-gray-300">
                         {scriptureSlug.toLowerCase() === "gita" ? (
                           `On the battlefield of Kurukshetra, Sri Krishna is speaking directly to Arjuna. At this moment, Arjuna represents the searching human heart, asking Krishna (representing the Higher Self) for clarity of action. Krishna guides him to understand that the immortal soul (Atman) does not die, and that action must be done as a selfless duty (Karma Yoga).`
                         ) : (
                           `This verse represents an eternal stream of oral transmission. Originating in ancient hermitages (Gurukulas), these dialogic teachings were preserved via strict mnemonic chant patterns (like Patha) before being written down.`
                         )}
                       </p>
                     </div>
                     
                     {/* Character breakdown */}
                     {scriptureSlug.toLowerCase() === "gita" && (
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 pt-2 border-t border-[#D4AF37]/10 w-full text-left">
                         <div>
                           <strong className="text-[#FF8C00] block mb-0.5 text-[10px]">Sri Krishna (Speaker)</strong>
                           <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">The divine charioteer representing ultimate universal consciousness and inner guide.</span>
                         </div>
                         <div>
                           <strong className="text-[var(--accent-gold)] block mb-0.5 text-[10px]">Arjuna (Seeker)</strong>
                           <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">The skilled archer in crisis, representing human moral dilemmas and the path of learning.</span>
                         </div>
                       </div>
                     )}
                   </div>
                 )}
               </article>
             );
          })}
        </div>

      </div>

    </div>
  );
}
