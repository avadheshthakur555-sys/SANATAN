"use client";

import React, { memo, useState } from "react";
import { Bookmark, Share2, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import Card from "@/components/ui/Card";
import AudioPlayer from "./AudioPlayer";
import { useSacredSound } from "@/lib/sacred-audio";

export interface WordMeaning {
  word: string;
  iast?: string;
  meaning_en: string;
  meaning_hi: string;
}

export interface VerseCardProps {
  verseNumber: string;
  textSanskrit: string;
  textTransliteration: string;
  translationHindi: string;
  translationEnglish: string;
  wordMeanings: string; // JSON string of WordMeaning[]
  commentary: string; // JSON string of { shankaracharya?: string, ramanujacharya?: string, madhvacharya?: string }
  audioUrl?: string | null;
}

const VerseCard = memo<VerseCardProps>(({
  verseNumber,
  textSanskrit,
  textTransliteration,
  translationHindi,
  translationEnglish,
  wordMeanings,
  commentary,
  audioUrl = ""
}) => {
  const [showWords, setShowWords] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commTab, setCommTab] = useState<"shankaracharya" | "ramanujacharya">("shankaracharya");
  
  const { playClick, playSuccess } = useSacredSound();

  const parsedWords = React.useMemo(() => {
    try {
      return JSON.parse(wordMeanings) as WordMeaning[];
    } catch {
      return [];
    }
  }, [wordMeanings]);

  const parsedComm = React.useMemo(() => {
    try {
      return JSON.parse(commentary) as { shankaracharya?: string; ramanujacharya?: string };
    } catch {
      return {};
    }
  }, [commentary]);

  const handleCopy = async () => {
    const textToCopy = `${textSanskrit}\n\n${textTransliteration}\n\nHI: ${translationHindi}\n\nEN: ${translationEnglish}\n\nVerse ${verseNumber}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      playSuccess();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleBookmark = () => {
    playSuccess();
    setBookmarked(!bookmarked);
  };

  const handleShare = () => {
    playSuccess();
    if (navigator.share) {
      navigator.share({
        title: `Verse ${verseNumber}`,
        text: textSanskrit,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Verse link copied to clipboard!");
    }
  };

  return (
    <Card className="flex flex-col gap-phi-lg bg-[var(--bg-card)] border border-[var(--border-gold)] p-phi-xl shadow-divine-sm">
      
      {/* Top Header: Verse Label and Reciter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-phi-md border-b border-[var(--border-gold)]/20 pb-phi-md">
        <span className="font-heading text-phi-base font-bold text-[var(--accent-saffron)] flex items-center gap-phi-xs">
          <span>📿</span>
          <span>Verse {verseNumber}</span>
        </span>
        <AudioPlayer audioUrl={audioUrl || ""} verseText={textSanskrit} />
      </div>

      {/* Sanskrit Sloka */}
      <p className="font-sanskrit text-phi-xl text-[var(--text-sanskrit)] dark:text-[var(--accent-gold)] leading-relaxed text-center whitespace-pre-line font-bold ag-sanskrit select-text py-phi-sm">
        {textSanskrit}
      </p>

      {/* Transliteration */}
      <p className="font-body text-phi-base text-[var(--text-secondary)] italic leading-relaxed text-center whitespace-pre-line select-text">
        {textTransliteration}
      </p>

      {/* Word-by-Word Meaning Toggle */}
      {parsedWords.length > 0 && (
        <div className="border-t border-b border-[var(--border-gold)]/10 py-phi-sm">
          <button
            onClick={() => { playClick(); setShowWords(!showWords); }}
            className="flex items-center gap-phi-xs text-phi-sm font-semibold text-[var(--accent-gold)] hover:text-[var(--accent-saffron)] transition-colors cursor-pointer outline-none bg-transparent border-none p-0 select-none"
          >
            <span>Word-by-word meanings</span>
            {showWords ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showWords && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-phi-sm mt-phi-md select-text">
              {parsedWords.map((item, idx) => (
                <div key={idx} className="p-phi-sm bg-[var(--bg-secondary)] border border-[var(--border-gold)]/20 rounded-phi-md flex flex-col gap-[2px]">
                  <span className="font-sanskrit text-phi-sm font-bold text-[var(--text-sanskrit)]">{item.word}</span>
                  {item.iast && <span className="text-[10px] text-gray-400 italic">{item.iast}</span>}
                  <span className="text-phi-xs text-[var(--text-primary)] mt-[2px]">{item.meaning_en}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Translations */}
      <div className="flex flex-col gap-phi-md select-text">
        <p className="font-body text-phi-base text-[var(--text-primary)] leading-relaxed">
          <span className="font-bold text-[var(--accent-saffron)] mr-phi-xs">हिन्दी अनुवाद:</span>
          {translationHindi}
        </p>
        <p className="font-body text-phi-sm md:text-phi-base text-[var(--text-secondary)] leading-relaxed">
          <span className="font-bold text-[var(--accent-gold)] mr-phi-xs">English:</span>
          {translationEnglish}
        </p>
      </div>

      {/* Commentary Tabs */}
      <div className="border-t border-[var(--border-gold)]/20 pt-phi-md select-none">
        <span className="text-phi-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold block mb-phi-sm">
          Commentaries &bull; भाष्य
        </span>
        <div className="flex gap-phi-xs border-b border-[var(--border-gold)]/10 pb-[1px] mb-phi-md">
          {["shankaracharya", "ramanujacharya"].map((tab) => {
            const label = tab === "shankaracharya" ? "Adi Shankaracharya" : "Ramanujacharya";
            const isTabActive = commTab === tab;
            return (
              <button
                key={tab}
                onClick={() => { playClick(); setCommTab(tab as "shankaracharya" | "ramanujacharya"); }}
                className={`px-phi-md py-phi-sm text-phi-xs md:text-phi-sm font-semibold transition-all duration-382 border-b-2 cursor-pointer outline-none ${
                  isTabActive
                    ? "border-[var(--accent-saffron)] text-[var(--accent-saffron)] font-bold"
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Commentary Text */}
        <div className="p-phi-md bg-[var(--bg-secondary)] border border-[var(--border-gold)]/20 rounded-phi-md select-text text-phi-sm leading-relaxed text-[var(--text-secondary)]">
          {commTab === "shankaracharya" && (parsedComm.shankaracharya || "No commentary available from Adi Shankaracharya for this verse.")}
          {commTab === "ramanujacharya" && (parsedComm.ramanujacharya || "No commentary available from Ramanujacharya for this verse.")}
        </div>
      </div>

      {/* Footer action buttons */}
      <div className="flex items-center justify-end gap-phi-md border-t border-[var(--border-gold)]/10 pt-phi-md mt-phi-sm select-none">
        <button
          onClick={handleBookmark}
          className={`p-phi-sm rounded-full transition-colors duration-382 cursor-pointer border ${
            bookmarked
              ? "bg-[var(--accent-saffron)]/10 border-[var(--accent-saffron)] text-[var(--accent-saffron)]"
              : "bg-transparent border-[var(--border-gold)]/30 text-[var(--text-secondary)] hover:text-[var(--accent-saffron)]"
          }`}
          aria-label="Bookmark verse"
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>

        <button
          onClick={handleShare}
          className="p-phi-sm rounded-full bg-transparent border border-[var(--border-gold)]/30 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-382 cursor-pointer"
          aria-label="Share verse"
        >
          <Share2 className="w-4 h-4" />
        </button>

        <button
          onClick={handleCopy}
          className="p-phi-sm rounded-full bg-transparent border border-[var(--border-gold)]/30 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-382 cursor-pointer min-w-[34px] flex items-center justify-center"
          aria-label="Copy verse text"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

    </Card>
  );
});

VerseCard.displayName = "VerseCard";
export default VerseCard;
