"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { BookOpen, ChevronDown, ChevronUp, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ───────────────────────── Data Types ───────────────────────── */

interface Citation {
  book: string;
  chapter: number;
  verse: string;
  textSanskrit: string;
  textTransliteration: string;
  textEnglish: string;
  textHindi: string;
  wordMeanings: Array<{ word: string; meaning_en?: string; meaning_hi?: string; iast?: string }>;
  commentaries: Array<{ author?: string; text_en?: string; text_hi?: string }>;
}

interface Message {
  id: string;
  sender: "user" | "guru";
  text: string;
  citations?: Citation[];
  relatedConcepts?: string[];
}

let messageIdCounter = 0;
const generateMsgId = () => {
  messageIdCounter++;
  return `msg-${Date.now()}-${messageIdCounter}`;
};

const SUGGESTED_QUESTIONS = [
  "What does Krishna say about anger in the Gita?",
  "Explain the meaning of Dharma vs Karma.",
  "What is the nature of Atman (Soul)?",
  "How to deal with grief and anxiety?",
  "What happened in Kurukshetra at the start of the war?"
];

const MODES = [
  { mode: "Scholar", label: "Scholar" },
  { mode: "Story", label: "Storytelling" },
  { mode: "Simple", label: "Simple" },
  { mode: "Child", label: "Kids" },
  { mode: "Meditation", label: "Contemplative" }
];

/* ───────────────────────── Response Parser ───────────────────────── */

function parseGuruResponse(text: string) {
  const sections = {
    directAnswer: "",
    scripturalInsight: "",
    historicalContext: "",
    relatedScriptures: "",
    furtherExploration: "",
    generalText: ""
  };

  const directAnswerMatch = text.match(/###? Direct Answer:?\n([\s\S]*?)(?=###?|$)/i);
  const scripturalInsightMatch = text.match(/###? Scriptural Insight:?\n([\s\S]*?)(?=###?|$)/i);
  const historicalContextMatch = text.match(/###? Historical Context:?\n([\s\S]*?)(?=###?|$)/i);
  const relatedScripturesMatch = text.match(/###? Related Scriptures:?\n([\s\S]*?)(?=###?|$)/i);
  const furtherExplorationMatch = text.match(/###? Further Exploration:?\n([\s\S]*?)(?=###?|$)/i);

  if (directAnswerMatch) sections.directAnswer = directAnswerMatch[1].trim();
  if (scripturalInsightMatch) sections.scripturalInsight = scripturalInsightMatch[1].trim();
  if (historicalContextMatch) sections.historicalContext = historicalContextMatch[1].trim();
  if (relatedScripturesMatch) sections.relatedScriptures = relatedScripturesMatch[1].trim();
  if (furtherExplorationMatch) sections.furtherExploration = furtherExplorationMatch[1].trim();

  if (!directAnswerMatch && !scripturalInsightMatch && !historicalContextMatch && !relatedScripturesMatch && !furtherExplorationMatch) {
    sections.generalText = text;
  }

  return sections;
}

/* ───────────────────────── Main Component ───────────────────────── */

export default function ChatConsole() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "guru",
      text: "### Direct Answer\nPranam seeker of truth. I am your Digital Rishi — an eternal guide through the sacred archives of Dharma.\n\n### Scriptural Insight\nI draw from the Vedas, Upanishads, Bhagavad Gita, Puranas, and the lineages of the ancient seers.\n\n### Further Exploration\nAsk: \"What is the nature of Atman?\" or select an inquiry below.",
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedCitationIndex, setExpandedCitationIndex] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState("Scholar");
  const [darshanOpen, setDarshanOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [conversationActive, setConversationActive] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = useCallback(async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setConversationActive(true);

    const userMsg: Message = {
      id: generateMsgId(),
      sender: "user",
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/guru", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: textToSend, mode: activeMode })
      });

      if (!response.ok) throw new Error("Failed to contact the divine oracle.");
      const data = await response.json();

      const guruMsg: Message = {
        id: generateMsgId(),
        sender: "guru",
        text: data.answer,
        citations: data.citations || [],
        relatedConcepts: data.relatedConcepts || []
      };

      setMessages(prev => [...prev, guruMsg]);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Please check your connection and query the rishi again.";
      const errorMsg: Message = {
        id: generateMsgId(),
        sender: "guru",
        text: `### Direct Answer\nThe connection timed out. ${errorMessage}\n\n### Further Exploration\nContemplate in silence or retry your inquiry when ready.`
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }, [loading, activeMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const resetChat = () => {
    setConversationActive(false);
    setMessages([
      {
        id: "welcome",
        sender: "guru",
        text: "### Direct Answer\nPranam seeker of truth. I am your Digital Rishi.\n\n### Further Exploration\nState what you seek in the dharmic archives.",
      }
    ]);
  };

  const toggleCitation = (id: string) => {
    setExpandedCitationIndex(prev => (prev === id ? null : id));
  };

  /* ───────────────── Render Message ───────────────── */

  function renderMessage(msg: Message) {
    return (
      <div
        key={msg.id}
        className={`flex flex-col gap-1.5 text-left animate-fade-in ${msg.sender === "user" ? "items-end" : "items-start"}`}
      >
        <span className={`text-[9px] uppercase font-mono tracking-widest block font-bold ${msg.sender === "user" ? "text-[#B8860B]/80" : "text-[#FFD700]/80"}`}>
          {msg.sender === "user" ? "Seeker" : "Rishi"}
        </span>

        <div className="w-full">
          {msg.sender === "guru" ? (() => {
            const parsed = parseGuruResponse(msg.text);
            if (parsed.generalText) {
              return <p className="text-[14px] leading-relaxed text-gray-200 font-sans font-light select-text">{parsed.generalText}</p>;
            }
            return (
              <div className="space-y-5">
                {parsed.directAnswer && (
                  <p className="text-[16px] sm:text-[17px] text-gray-100 leading-relaxed font-serif italic font-light select-text">
                    &ldquo;{parsed.directAnswer}&rdquo;
                  </p>
                )}
                {parsed.scripturalInsight && (
                  <div className="space-y-1.5 pl-4 border-l border-[#B8860B]/35">
                    <span className="text-[8px] uppercase font-mono tracking-widest text-[#FFE485]/70 block font-bold">Scriptural Insight</span>
                    <p className="text-[13px] text-gray-300 leading-relaxed font-serif whitespace-pre-line select-text">{parsed.scripturalInsight}</p>
                  </div>
                )}
                {parsed.historicalContext && (
                  <div className="space-y-1.5 pl-4 border-l border-white/10">
                    <span className="text-[8px] uppercase font-mono tracking-widest text-gray-500 block">Context</span>
                    <p className="text-[12px] text-gray-400 leading-relaxed select-text">{parsed.historicalContext}</p>
                  </div>
                )}
                {parsed.relatedScriptures && (
                  <div className="space-y-1.5 pl-4 border-l border-white/5">
                    <span className="text-[8px] uppercase font-mono tracking-widest text-gray-500 block">Related Scriptures</span>
                    <p className="text-[12px] text-gray-400 leading-relaxed select-text">{parsed.relatedScriptures}</p>
                  </div>
                )}
                {parsed.furtherExploration && (
                  <div className="bg-gradient-to-r from-[#B8860B]/5 to-transparent p-3 rounded-lg border-l border-[#B8860B]/25">
                    <span className="text-[8px] uppercase font-mono tracking-widest text-[#F97316]/80 block font-bold mb-1">Further Exploration</span>
                    <p className="text-[12px] text-gray-300 leading-relaxed italic select-text">&ldquo;{parsed.furtherExploration}&rdquo;</p>
                  </div>
                )}
              </div>
            );
          })() : (
            <p className="text-[14px] text-gray-200 leading-relaxed font-sans font-light select-text max-w-[90%] bg-white/[0.02] border border-white/5 rounded-xl px-4 py-2.5">
              {msg.text}
            </p>
          )}
        </div>

        {/* Citations */}
        {msg.sender === "guru" && msg.citations && msg.citations.length > 0 && (
          <div className="mt-2 w-full border-t border-white/5 pt-2">
            <button
              onClick={() => toggleCitation(msg.id)}
              className="flex items-center gap-1 text-[9px] font-mono tracking-widest text-[#FFD700]/70 hover:text-[#FFD700] uppercase transition-colors border-none bg-transparent cursor-pointer outline-none"
            >
              <BookOpen className="w-3 h-3" />
              <span>Sources ({msg.citations.length})</span>
              {expandedCitationIndex === msg.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {expandedCitationIndex === msg.id && (
              <div className="space-y-3 pl-3 pt-2 border-l border-white/5 animate-fade-in text-[12px] text-gray-400 mt-2">
                {msg.citations.map((cit, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-[11px] font-serif text-[#FFD700]/80 font-semibold block">
                      {cit.book} — Ch. {cit.chapter}, Verse {cit.verse}
                    </span>
                    <p className="font-sanskrit text-[#F97316]/90 text-[13px] leading-relaxed whitespace-pre-line">{cit.textSanskrit}</p>
                    <p className="italic text-xs text-gray-500 leading-relaxed">&ldquo;{cit.textEnglish}&rdquo;</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Related Concepts */}
        {msg.sender === "guru" && msg.relatedConcepts && msg.relatedConcepts.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5 w-full">
            <span className="text-[8px] uppercase font-mono tracking-widest text-gray-600 font-bold">Concepts:</span>
            {msg.relatedConcepts.map((concept, idx) => (
              <Link
                key={idx}
                href={`/graph?node=${concept.toLowerCase()}`}
                className="text-[9px] font-bold text-[#FFD700]/70 hover:text-white px-2 py-0.5 rounded border border-[#B8860B]/20 hover:border-[#FFD700] bg-black/20 transition-all no-underline inline-block"
              >
                {concept}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
     RENDER
  ──────────────────────────────────────────────────────────────── */

  return (
    <div className="flex w-full h-full relative overflow-hidden select-none">

      {/* ═══════════════ FULL-SCREEN BACKGROUND ═══════════════ */}
      {/* Temple + cosmic atmosphere — fills entire viewport, no black voids */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient — deep sacred maroon-to-black */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0515] via-[#0a0a1a] to-[#050208]" />

        {/* Temple warm light wash — top center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_65%_20%,rgba(184,134,11,0.08)_0%,transparent_70%)]" />

        {/* Cosmic nebula left */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_15%_60%,rgba(88,28,135,0.06)_0%,transparent_70%)]" />

        {/* Golden fog bottom — where Guru sits */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_40%_at_62%_95%,rgba(184,134,11,0.1)_0%,transparent_60%)]" />

        {/* Warm ambient light rays */}
        <div className="absolute top-0 left-[30%] w-[40%] h-full opacity-[0.03] bg-[linear-gradient(180deg,rgba(255,215,0,0.4)_0%,transparent_60%)]" />

        {/* Subtle grain/texture overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
      </div>

      {/* ═══════════════ FLOATING PARTICLES (full screen) ═══════════════ */}
      {mounted && (
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`star-${i}`}
              animate={{
                y: [0, -(60 + i * 8), 0],
                opacity: [0.05, 0.4, 0.05]
              }}
              transition={{
                duration: 8 + (i % 5) * 2,
                repeat: Infinity,
                delay: (i * 0.7) % 6,
                ease: "easeInOut"
              }}
              className="absolute rounded-full bg-[#FFE485]"
              style={{
                left: `${5 + (i * 4.7) % 90}%`,
                top: `${15 + (i * 7.3) % 70}%`,
                width: `${1 + (i % 3)}px`,
                height: `${1 + (i % 3)}px`,
                filter: "blur(0.3px)"
              }}
            />
          ))}
        </div>
      )}
      {/* ═══════════════ LEFT PANEL — 50% ═══════════════ */}
      <div className="w-full lg:w-[50%] h-full flex flex-col justify-between relative z-20 px-6 sm:px-8 md:px-12 py-10">

        {/* Glass scrim behind left content for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent lg:via-black/50 lg:to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full w-full max-w-xl mx-auto lg:mx-0 justify-between gap-6">

          {/* ── Title Block ── */}
          <div className="flex-shrink-0">
            <span className="text-[9px] uppercase font-mono tracking-[0.35em] text-[#FFE485]/50 font-bold block mb-2">
              Digital Rishi · AI Oracle
            </span>
            <h1 className="font-serif text-[38px] sm:text-[48px] xl:text-[56px] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFE485] via-[#F5C242] to-[#B8860B] leading-[0.9]">
              AI Guru
            </h1>
            <p className="text-[13px] sm:text-[14px] text-gray-400 leading-relaxed mt-3 font-serif max-w-sm">
              Inquire upon the eternal wisdom of the Vedas, Upanishads, Gita, and the sacred lineages of the ancient seers.
            </p>

            {/* Mobile Darshan toggle */}
            <button
              onClick={() => setDarshanOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 mt-3 rounded-full border border-[#B8860B]/30 text-[10px] uppercase font-mono font-bold text-[#FFD700] bg-[#B8860B]/5 hover:bg-[#B8860B]/10 transition-all cursor-pointer outline-none"
            >
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "15s" }} />
              <span>View Rishi</span>
            </button>
          </div>

          {/* ── Conversation Area (always visible, scrollable and flex-growing) ── */}
          <div className="flex-grow overflow-y-auto h-0 space-y-6 pr-2 mb-4 scrollbar-none">
            {messages.map((msg) => renderMessage(msg))}

            {loading && (
              <div className="flex flex-col gap-1 items-start animate-pulse">
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#B8860B] block font-bold">Rishi</span>
                <div className="text-xs font-mono uppercase tracking-widest text-gray-500 flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-ping" />
                  <span>Consulting scriptural core...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Bottom Section: Modes, Suggestions and Input ── */}
          <div className="flex-shrink-0 flex flex-col gap-4">
            
            {/* ── Mode Switcher ── */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
              <div className="flex gap-3 overflow-x-auto scrollbar-none">
                {MODES.map((m) => (
                  <button
                    key={m.mode}
                    type="button"
                    onClick={() => setActiveMode(m.mode)}
                    className={`text-[9px] font-mono tracking-widest uppercase py-1 relative cursor-pointer outline-none transition-colors border-none bg-transparent shrink-0 ${activeMode === m.mode ? "text-[#FFD700] font-extrabold" : "text-gray-600 hover:text-gray-400"}`}
                  >
                    {m.label}
                    {activeMode === m.mode && (
                      <motion.span
                        layoutId="modeDot"
                        className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FFD700]"
                      />
                    )}
                  </button>
                ))}
              </div>
              {conversationActive && (
                <button
                  onClick={resetChat}
                  className="text-[9px] font-mono tracking-widest uppercase text-gray-600 hover:text-[#FFD700] transition-colors border-none bg-transparent cursor-pointer outline-none shrink-0"
                >
                  Clear
                </button>
              )}
            </div>

            {/* ── Suggested Prompts as Premium Grid Cards ── */}
            {!conversationActive && (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-gray-500 font-bold block">
                  Select a pathway of inquiry
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SUGGESTED_QUESTIONS.map((q, idx) => {
                    let icon = "🔮";
                    if (q.includes("anger")) icon = "🔥";
                    else if (q.includes("Dharma")) icon = "⚖️";
                    else if (q.includes("Atman")) icon = "🧘";
                    else if (q.includes("grief")) icon = "🌊";
                    else if (q.includes("Kurukshetra")) icon = "⚔️";
                    
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(q)}
                        className="text-left p-3 rounded-xl border border-[var(--border-gold)]/30 hover:border-[var(--accent-gold)] bg-[var(--bg-secondary)] hover:bg-[var(--border-gold)]/10 text-xs text-gray-300 hover:text-[#FFD700] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex items-start gap-2.5 group"
                      >
                        <span className="text-base group-hover:scale-110 transition-transform">{icon}</span>
                        <span className="font-serif leading-snug">{q}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Input Bar (fixed at bottom) ── */}
            <form onSubmit={handleSubmit} className="relative flex items-center mt-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                placeholder="Inquire of the Rishi..."
                className="w-full bg-transparent border-b border-white/15 focus:border-[#FFD700] py-3 pr-10 text-sm text-white placeholder-gray-600 outline-none transition-colors font-serif"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#FFD700] disabled:text-gray-700 hover:scale-110 transition-transform bg-transparent border-none cursor-pointer outline-none"
                aria-label="Send query"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

          </div>

        </div>
      </div>


      {/* ═══════════════ RIGHT PANEL — 50% · GURU PRESENCE ═══════════════ */}
      <div className="hidden lg:flex lg:w-[50%] h-full relative z-10 items-center justify-center overflow-hidden">

        {/* ── HALO — centered behind Guru ── */}
        <div className="absolute z-[2] inset-0 flex items-center justify-center">
          {/* Outer radial glow */}
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[380px] h-[380px] xl:w-[480px] xl:h-[480px] rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(255,215,0,0.14) 0%, rgba(255,228,133,0.07) 40%, rgba(184,134,11,0.02) 65%, transparent 80%)",
              filter: "blur(25px)"
            }}
          />

          {/* Inner sacred circle */}
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
              boxShadow: [
                "0 0 40px rgba(255,215,0,0.25), inset 0 0 20px rgba(255,228,133,0.1)",
                "0 0 80px rgba(255,215,0,0.45), inset 0 0 40px rgba(255,228,133,0.2)",
                "0 0 40px rgba(255,215,0,0.25), inset 0 0 20px rgba(255,228,133,0.1)"
              ]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] xl:w-[350px] xl:h-[350px] rounded-full border border-[#FFE485]/25"
          />

          {/* Mandala ring — slowly spinning */}
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] xl:w-[440px] xl:h-[440px] text-[#F5C242]/12"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="0.12" strokeDasharray="1.5,2" />
            <circle cx="50" cy="50" r="43" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="3,4" />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              return (
                <circle
                  key={i}
                  cx={(50 + 43 * Math.cos(angle)).toFixed(3)}
                  cy={(50 + 43 * Math.sin(angle)).toFixed(3)}
                  r="1.8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.1"
                />
              );
            })}
          </motion.svg>
        </div>

        {/* ── GURU FIGURE — Centered, 65vh tall ── */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            scale: [1, 1.005, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute z-[5] flex justify-center items-center pointer-events-none"
          style={{ height: "65vh", width: "auto" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/maharishi-guru.png"
            alt="Enlightened Maharishi Guru"
            className="h-full w-auto object-contain select-none pointer-events-none"
            style={{
              filter: "drop-shadow(0 0 50px rgba(245,194,66,0.2))",
              maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)"
            }}
          />

          {/* Third Eye glow */}
          <motion.div
            animate={{
              opacity: [0.35, 0.95, 0.35],
              scale: [0.9, 1.3, 0.9]
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-10 w-1.5 h-1.5 rounded-full bg-[#FFD700] blur-[0.5px] shadow-[0_0_14px_#FFD700]"
            style={{ top: "33%", left: "51.5%" }}
          />
        </motion.div>

        {/* ── Floating Sanskrit glyphs on right side ── */}
        {mounted && ["🕉️", "धर्म", "ज्ञान", "सत्य", "ध्यान", "कर्म", "शान्ति", "मोक्ष"].map((glyph, i) => (
          <motion.div
            key={`glyph-${i}`}
            animate={{
              y: [0, -(40 + i * 12), 0],
              opacity: [0.02, 0.15, 0.02],
              rotate: [0, (i % 2 === 0 ? 25 : -25), 0]
            }}
            transition={{
              duration: 14 + i * 2,
              repeat: Infinity,
              delay: i * 0.9,
              ease: "easeInOut"
            }}
            className="absolute text-[#FFE485]/10 font-sanskrit z-[1] pointer-events-none select-none"
            style={{
              left: `${10 + (i * 11.5) % 80}%`,
              top: `${20 + (i * 9.3) % 55}%`,
              fontSize: `${16 + (i % 4) * 3}px`
            }}
          >
            {glyph}
          </motion.div>
        ))}
      </div>

      {/* ═══════════════ MOBILE DARSHAN OVERLAY ═══════════════ */}
      <AnimatePresence>
        {darshanOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-[#0c0515] to-[#050208] flex flex-col justify-end items-center overflow-hidden lg:hidden"
          >
            {/* Close */}
            <button
              onClick={() => setDarshanOpen(false)}
              className="absolute top-5 right-5 px-4 py-2 rounded-full border border-white/10 bg-black/80 text-[10px] font-mono font-bold uppercase text-[#FFD700] hover:text-white transition-colors cursor-pointer outline-none z-50"
            >
              ✕ Close
            </button>

            {/* Halo for mobile */}
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 z-[2]">
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-[280px] h-[280px] rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)",
                  filter: "blur(20px)"
                }}
              />
            </div>

            {/* Guru for mobile */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="w-[280px] h-[70vh] z-[5] flex justify-center items-end pointer-events-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/maharishi-guru.png"
                alt="Maharishi Guru"
                className="h-full w-auto object-contain object-bottom select-none"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(245,194,66,0.12))",
                  maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
