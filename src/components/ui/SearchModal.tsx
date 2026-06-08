"use client";

import React, { memo, useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Book, FileText, User, Landmark, Sparkles } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";

interface SearchScripture {
  id: string;
  slug: string;
  titleHindi: string;
  titleEnglish: string;
}

interface SearchDeity {
  slug: string;
  nameSanskrit: string;
  nameEnglish: string;
}

interface SearchVerse {
  id: string;
  verseNumber: number;
  textSanskrit: string;
  textTransliteration: string;
  translationEnglish: string;
  scripture: {
    slug: string;
    titleEnglish: string;
  };
  chapter: {
    chapterNumber: number;
  };
}

interface SearchTemple {
  slug: string;
  name: string;
  nameSanskrit: string;
  type: string;
  state: string;
}

interface SearchFestival {
  name: string;
  deitySlug: string;
  description: string;
}

interface SearchResult {
  scriptures: SearchScripture[];
  verses: SearchVerse[];
  deities: SearchDeity[];
  temples: SearchTemple[];
  festivals: SearchFestival[];
}

const SearchModal = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult>({ scriptures: [], verses: [], deities: [], temples: [], festivals: [] });
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const { playClick, playSuccess, playNavigate } = useSacredSound();
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Open on keybind Ctrl+K or Cmd+K
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        playClick();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);

    const handleOpenEvent = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-search", handleOpenEvent);

    // Load recent searches
    try {
      const stored = localStorage.getItem("recent_searches");
      if (stored) setRecent(JSON.parse(stored));
    } catch (_) {}

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
      window.removeEventListener("open-search", handleOpenEvent);
    };
  }, []);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
      setActiveIndex(-1);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults({ scriptures: [], verses: [], deities: [], temples: [], festivals: [] });
    }
  }, [isOpen]);

  // 2. Debounced API search after 382ms (1/phi * 618)
  useEffect(() => {
    if (!query.trim()) {
      setResults({ scriptures: [], verses: [], deities: [], temples: [], festivals: [] });
      setActiveIndex(-1);
      return;
    }

    setLoading(true);
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setActiveIndex(-1); // Reset highlight index on new search results
        }
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    }, 382);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Flatten results for keyboard arrow-key navigation
  const flatResults = useMemo(() => {
    if (!query.trim()) return [];
    const list: { label: string; href: string }[] = [];
    
    results.scriptures.forEach((s) => {
      list.push({ label: s.titleEnglish, href: `/library/${s.slug}` });
    });
    results.deities.forEach((d) => {
      list.push({ label: d.nameEnglish, href: `/deities/${d.slug}` });
    });
    results.temples.forEach((t) => {
      let filterVal = "all";
      if (t.type === "SHAKTI_PEETHA") filterVal = "Shakti Peethas";
      else if (t.type === "CHAR_DHAM") filterVal = "Char Dham";
      const href = t.type === "JYOTIRLINGA" ? `/jyotirlinga/${t.slug}` : `/temples?filter=${encodeURIComponent(filterVal)}`;
      list.push({ label: t.name, href });
    });
    results.festivals.forEach((f) => {
      list.push({ label: f.name, href: `/deities/${f.deitySlug}` });
    });
    results.verses.forEach((v) => {
      list.push({ label: `${v.scripture.titleEnglish} ${v.chapter.chapterNumber}.${v.verseNumber}`, href: `/library/${v.scripture.slug}/chapter/${v.chapter.chapterNumber}` });
    });

    return list;
  }, [results, query]);

  // Handle active index key selection
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!isOpen || flatResults.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % flatResults.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + flatResults.length) % flatResults.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < flatResults.length) {
          handleSelectResult(flatResults[activeIndex].href, query);
        }
      }
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [isOpen, flatResults, activeIndex, query]);

  const handleSelectResult = (url: string, rawQuery: string) => {
    playNavigate();
    
    // Save to recents
    if (rawQuery.trim().length > 1) {
      const updated = [rawQuery, ...recent.filter((r) => r !== rawQuery)].slice(0, 5);
      setRecent(updated);
      localStorage.setItem("recent_searches", JSON.stringify(updated));
    }

    setIsOpen(false);
    router.push(url);
  };

  const clearRecent = () => {
    playClick();
    setRecent([]);
    localStorage.removeItem("recent_searches");
  };

  // Close when clicking overlay
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  if (!isOpen) return null;

  const hasResults = 
    results.scriptures.length > 0 || 
    results.verses.length > 0 || 
    results.deities.length > 0 ||
    results.temples.length > 0 ||
    results.festivals.length > 0;

  return (
    <div className="fixed inset-0 bg-black/70 dark:bg-[#0A0A0F]/80 backdrop-blur-md z-50 flex items-start justify-center pt-[10%] px-phi-lg select-none">
      <div 
        ref={modalRef}
        className="w-full max-w-2xl bg-[var(--bg-secondary)] border border-[var(--border-gold)]/40 rounded-phi-xl overflow-hidden flex flex-col max-h-[75vh] ag-page-enter shadow-[0_15px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_50px_rgba(0,0,0,0.95)]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-phi-md border-b border-[var(--border-gold)]/20 px-phi-lg py-phi-md">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scripture, deities, temples, or festivals..."
            className="flex-1 bg-transparent text-phi-base outline-none text-[var(--text-primary)] font-body py-1"
          />
          {loading && (
            <span className="w-4 h-4 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full animate-spin shrink-0" />
          )}
          <button 
            onClick={() => setIsOpen(false)}
            className="p-[4px] hover:bg-[var(--bg-secondary)] rounded-full text-gray-400 hover:text-[var(--text-primary)] cursor-pointer outline-none transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-phi-lg flex flex-col gap-phi-lg scrollbar-thin">
          
          {/* Recent Searches */}
          {!query && recent.length > 0 && (
            <div className="flex flex-col gap-phi-xs">
              <div className="flex justify-between items-center text-phi-xs text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-phi-xs">
                <span>Recent Searches</span>
                <button onClick={clearRecent} className="text-red-500 hover:underline cursor-pointer outline-none bg-transparent border-none">
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-phi-xs">
                {recent.map((item) => (
                  <button
                    key={item}
                    onClick={() => { playClick(); setQuery(item); }}
                    className="px-phi-md py-[4px] bg-[var(--bg-primary)] border border-[var(--border-gold)]/30 rounded-full text-phi-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-gold)] cursor-pointer outline-none"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions & Categories empty state */}
          {!query && (
            <div className="flex flex-col gap-6 py-4 select-text">
              {/* Quick Actions Shortcuts */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                  Quick Navigation Shortcuts
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleSelectResult("/library/gita/chapter/1", "Bhagavad Gita")}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-gold)]/30 hover:border-[var(--accent-gold)]/60 text-left hover:bg-[var(--border-gold)]/10 transition-all cursor-pointer text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <Book className="w-4 h-4 text-[var(--accent-gold)]" />
                    <span>Read Bhagavad Gita</span>
                  </button>
                  <button
                    onClick={() => handleSelectResult("/jyotirlinga", "12 Jyotirlingas")}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-gold)]/30 hover:border-[var(--accent-gold)]/60 text-left hover:bg-[var(--border-gold)]/10 transition-all cursor-pointer text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <Landmark className="w-4 h-4 text-[var(--accent-saffron)]" />
                    <span>Explore 12 Jyotirlingas</span>
                  </button>
                  <button
                    onClick={() => handleSelectResult("/guru", "AI Guru")}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-gold)]/30 hover:border-[var(--accent-gold)]/60 text-left hover:bg-[var(--border-gold)]/10 transition-all cursor-pointer text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    <span>Ask AI Guru</span>
                  </button>
                </div>
              </div>

              {/* Browse by Category Pills */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                  Browse by Category
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Vedas", href: "/library?tab=vedas" },
                    { label: "Upanishads", href: "/library?tab=upanishads" },
                    { label: "Puranas", href: "/library?tab=puranas" },
                    { label: "Deities Directory", href: "/deities" },
                    { label: "Sacred Atlas", href: "/temples" },
                    { label: "Timeline", href: "/history" },
                  ].map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => handleSelectResult(cat.href, cat.label)}
                      className="px-3 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-gold)]/30 hover:border-[var(--accent-gold)]/60 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer transition-all hover:bg-[var(--border-gold)]/10 rounded-full"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center py-4 border-t border-[var(--border-gold)]/20 mt-4 text-[var(--text-secondary)]">
                <p className="text-[11px] leading-normal">Use <kbd className="px-1.5 py-0.5 bg-[var(--bg-primary)] rounded border border-[var(--border-gold)]/30 font-mono text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-[var(--bg-primary)] rounded border border-[var(--border-gold)]/30 font-mono text-[10px]">↓</kbd> keys to navigate suggestions. Press <kbd className="px-1.5 py-0.5 bg-[var(--bg-primary)] rounded border border-[var(--border-gold)]/30 font-mono text-[10px]">ESC</kbd> to exit.</p>
              </div>
            </div>
          )}
                    {/* Results grouped */}
          {query && hasResults && (
            <div className="flex flex-col gap-phi-lg select-text">
              
              {/* Scriptures Results */}
              {results.scriptures && results.scriptures.length > 0 && (
                <div className="flex flex-col gap-phi-xs">
                  <div className="flex justify-between items-center select-none mb-phi-xs border-b border-[var(--border-gold)]/20 pb-1">
                    <span className="text-phi-xs text-[var(--accent-gold)] font-bold uppercase tracking-wider">
                      Scriptures
                    </span>
                    <span className="text-[10px] bg-[var(--bg-primary)] px-2 py-0.5 rounded border border-[var(--border-gold)]/30 text-[var(--accent-gold)] font-semibold">{results.scriptures.length} matches</span>
                  </div>
                  {results.scriptures.map((s) => {
                    const targetHref = `/library/${s.slug}`;
                    const isHighlighted = flatResults[activeIndex]?.href === targetHref;
                    return (
                      <button
                        key={s.id}
                        onClick={() => handleSelectResult(targetHref, query)}
                        className={`w-full flex items-center gap-phi-md p-phi-sm rounded-phi-md text-left border cursor-pointer outline-none group transition-all
                          ${isHighlighted 
                            ? "bg-[var(--border-gold)]/20 border-[var(--accent-gold)] text-[var(--text-primary)]" 
                            : "bg-transparent border-transparent hover:bg-[var(--border-gold)]/10 hover:border-[var(--border-gold)]/35 text-[var(--text-secondary)]"}`}
                      >
                        <Book className="w-4 h-4 text-[var(--accent-gold)]" />
                        <div className="flex flex-col">
                          <span className="font-sanskrit text-phi-sm font-bold text-[var(--text-sanskrit)]">{s.titleHindi}</span>
                          <span className="text-phi-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)]">{s.titleEnglish}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Deities Results */}
              {results.deities && results.deities.length > 0 && (
                <div className="flex flex-col gap-phi-xs">
                  <div className="flex justify-between items-center select-none mb-phi-xs border-b border-[var(--border-gold)]/20 pb-1">
                    <span className="text-phi-xs text-[var(--accent-saffron)] font-bold uppercase tracking-wider">
                      Deities
                    </span>
                    <span className="text-[10px] bg-[var(--bg-primary)] px-2 py-0.5 rounded border border-[var(--border-gold)]/30 text-[var(--accent-saffron)] font-semibold">{results.deities.length} matches</span>
                  </div>
                  {results.deities.map((d) => {
                    const targetHref = `/deities/${d.slug}`;
                    const isHighlighted = flatResults[activeIndex]?.href === targetHref;
                    return (
                      <button
                        key={d.slug}
                        onClick={() => handleSelectResult(targetHref, query)}
                        className={`w-full flex items-center gap-phi-md p-phi-sm rounded-phi-md text-left border cursor-pointer outline-none group transition-all
                          ${isHighlighted 
                            ? "bg-[var(--border-gold)]/20 border-[var(--accent-gold)] text-[var(--text-primary)]" 
                            : "bg-transparent border-transparent hover:bg-[var(--border-gold)]/10 hover:border-[var(--border-gold)]/35 text-[var(--text-secondary)]"}`}
                      >
                        <User className="w-4 h-4 text-[var(--accent-saffron)]" />
                        <div className="flex flex-col">
                          <span className="font-sanskrit text-phi-sm font-bold text-[var(--text-sanskrit)]">{d.nameSanskrit}</span>
                          <span className="text-phi-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)]">{d.nameEnglish}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Temples Results */}
              {results.temples && results.temples.length > 0 && (
                <div className="flex flex-col gap-phi-xs">
                  <div className="flex justify-between items-center select-none mb-phi-xs border-b border-[var(--border-gold)]/20 pb-1">
                    <span className="text-phi-xs text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
                      Sacred Places & Temples
                    </span>
                    <span className="text-[10px] bg-[var(--bg-primary)] px-2 py-0.5 rounded border border-[var(--border-gold)]/30 text-cyan-600 dark:text-cyan-400 font-semibold">{results.temples.length} matches</span>
                  </div>
                  {results.temples.map((t) => {
                    let filterVal = "all";
                    if (t.type === "SHAKTI_PEETHA") filterVal = "Shakti Peethas";
                    else if (t.type === "CHAR_DHAM") filterVal = "Char Dham";
                    const targetHref = t.type === "JYOTIRLINGA" ? `/jyotirlinga/${t.slug}` : `/temples?filter=${encodeURIComponent(filterVal)}`;
                    const isHighlighted = flatResults[activeIndex]?.href === targetHref;
                    return (
                      <button
                        key={t.slug}
                        onClick={() => handleSelectResult(targetHref, query)}
                        className={`w-full flex items-center gap-phi-md p-phi-sm rounded-phi-md text-left border cursor-pointer outline-none group transition-all
                          ${isHighlighted 
                            ? "bg-[var(--border-gold)]/20 border-[var(--accent-gold)] text-[var(--text-primary)]" 
                            : "bg-transparent border-transparent hover:bg-[var(--border-gold)]/10 hover:border-[var(--border-gold)]/35 text-[var(--text-secondary)]"}`}
                      >
                        <Landmark className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        <div className="flex flex-col">
                          <span className="font-sanskrit text-phi-sm font-bold text-[var(--text-sanskrit)]">{t.nameSanskrit}</span>
                          <span className="text-phi-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)]">
                            {t.name} &bull; <span className="text-xs text-[var(--text-secondary)] font-sans">{t.state}</span>
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Festivals Results */}
              {results.festivals && results.festivals.length > 0 && (
                <div className="flex flex-col gap-phi-xs">
                  <div className="flex justify-between items-center select-none mb-phi-xs border-b border-[var(--border-gold)]/20 pb-1">
                    <span className="text-phi-xs text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider">
                      Sacred Festivals
                    </span>
                    <span className="text-[10px] bg-[var(--bg-primary)] px-2 py-0.5 rounded border border-[var(--border-gold)]/30 text-orange-600 dark:text-orange-400 font-semibold">{results.festivals.length} matches</span>
                  </div>
                  {results.festivals.map((f, index) => {
                    const targetHref = `/deities/${f.deitySlug}`;
                    const isHighlighted = flatResults[activeIndex]?.href === targetHref;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelectResult(targetHref, query)}
                        className={`w-full flex items-center gap-phi-md p-phi-sm rounded-phi-md text-left border cursor-pointer outline-none group transition-all
                          ${isHighlighted 
                            ? "bg-[var(--border-gold)]/20 border-[var(--accent-gold)] text-[var(--text-primary)]" 
                            : "bg-transparent border-transparent hover:bg-[var(--border-gold)]/10 hover:border-[var(--border-gold)]/35 text-[var(--text-secondary)]"}`}
                      >
                        <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <div className="flex flex-col">
                          <span className="text-phi-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)]">{f.name}</span>
                          <span className="text-xs text-[var(--text-secondary)] leading-normal line-clamp-1 font-sans">{f.description}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Verses Results */}
              {results.verses && results.verses.length > 0 && (
                <div className="flex flex-col gap-phi-xs">
                  <div className="flex justify-between items-center select-none mb-phi-xs border-b border-[var(--border-gold)]/20 pb-1">
                    <span className="text-phi-xs text-orange-500 font-bold uppercase tracking-wider">
                      Verses
                    </span>
                    <span className="text-[10px] bg-[var(--bg-primary)] px-2 py-0.5 rounded border border-[var(--border-gold)]/30 text-orange-500 font-semibold">{results.verses.length} matches</span>
                  </div>
                  {results.verses.map((v) => {
                    const targetHref = `/library/${v.scripture.slug}/chapter/${v.chapter.chapterNumber}`;
                    const isHighlighted = flatResults[activeIndex]?.href === targetHref;
                    return (
                      <button
                        key={v.id}
                        onClick={() => handleSelectResult(targetHref, query)}
                        className={`w-full flex items-start gap-phi-md p-phi-sm rounded-phi-md text-left border cursor-pointer outline-none group transition-all
                          ${isHighlighted 
                            ? "bg-[var(--border-gold)]/20 border-[var(--accent-gold)] text-[var(--text-primary)]" 
                            : "bg-transparent border-transparent hover:bg-[var(--border-gold)]/10 hover:border-[var(--border-gold)]/35 text-[var(--text-secondary)]"}`}
                      >
                        <FileText className="w-4 h-4 text-orange-500 mt-[2px]" />
                        <div className="flex flex-col">
                          <span className="text-phi-xs font-mono font-bold text-[var(--accent-gold)]">
                            {v.scripture.titleEnglish} &bull; Ch {v.chapter.chapterNumber} Ver {v.verseNumber}
                          </span>
                          <span className="font-sanskrit text-phi-sm text-[var(--text-sanskrit)] mt-[2px]">{v.textSanskrit}</span>
                          <span className="text-phi-xs text-[var(--text-secondary)] mt-[2px] line-clamp-1 italic">{v.textTransliteration}</span>
                          <span className="text-phi-xs text-[var(--text-primary)] mt-[2px] line-clamp-2">{v.translationEnglish}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* No results prompt */}
          {query && !hasResults && !loading && (
            <div className="text-center py-phi-2xl text-[var(--text-secondary)]">
              <span className="text-3xl block mb-phi-sm">🕉️</span>
              <p className="text-phi-sm text-white">No matches found for &ldquo;{query}&rdquo;.</p>
              <p className="text-xs text-gray-500 mt-2">Try searching with a different term like &quot;Gita&quot;, &quot;Shiva&quot;, &quot;Kedarnath&quot;, or &quot;Shivratri&quot;.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
});

SearchModal.displayName = "SearchModal";
export default SearchModal;
