"use client";

import React, { useState, useMemo } from "react";
import { Download, ChevronDown, ChevronRight, Search, ArrowUpDown, Info } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";
import Footer from "@/components/layout/Footer";

interface ScriptureDownload {
  id: string;
  nameEnglish: string;
  nameSanskrit: string;
  category: string;
  languages: string[]; // ['SA', 'HI', 'EN']
  formats: string[]; // ['PDF', 'ePub', 'TXT']
  size: string;
  sizeBytes: number;
  attribution: string;
}

const DOWNLOAD_DATA: ScriptureDownload[] = [
  // GITA
  {
    id: "gita",
    nameEnglish: "Bhagavad Gita (Complete)",
    nameSanskrit: "श्रीमद्भगवद्गीता",
    category: "Gita",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "ePub", "TXT"],
    size: "4.8 MB",
    sizeBytes: 5033164,
    attribution: "Gita Press Gorakhpur Edition"
  },
  // VEDAS
  {
    id: "rigveda",
    nameEnglish: "Rigveda Sanhita",
    nameSanskrit: "ऋग्वेद संहिता",
    category: "Vedas",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "TXT"],
    size: "18.2 MB",
    sizeBytes: 19084083,
    attribution: "Vedic Research Institute"
  },
  {
    id: "yajurveda",
    nameEnglish: "Yajurveda Sanhita",
    nameSanskrit: "यजुर्वेद संहिता",
    category: "Vedas",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "TXT"],
    size: "12.4 MB",
    sizeBytes: 13002342,
    attribution: "Vedic Research Institute"
  },
  {
    id: "samaveda",
    nameEnglish: "Samaveda Sanhita",
    nameSanskrit: "सामवेद संहिता",
    category: "Vedas",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "TXT"],
    size: "9.1 MB",
    sizeBytes: 9542041,
    attribution: "Vedic Research Institute"
  },
  {
    id: "atharvaveda",
    nameEnglish: "Atharvaveda Sanhita",
    nameSanskrit: "अथर्ववेद संहिता",
    category: "Vedas",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "TXT"],
    size: "15.6 MB",
    sizeBytes: 16357785,
    attribution: "Vedic Research Institute"
  },
  // UPANISHADS
  {
    id: "isha-up",
    nameEnglish: "Isha Upanishad",
    nameSanskrit: "ईशोपनिषद्",
    category: "Upanishads",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "ePub", "TXT"],
    size: "1.2 MB",
    sizeBytes: 1258291,
    attribution: "Vedanta Society Archives"
  },
  {
    id: "kena-up",
    nameEnglish: "Kena Upanishad",
    nameSanskrit: "केनोपनिषद्",
    category: "Upanishads",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "ePub"],
    size: "1.1 MB",
    sizeBytes: 1153433,
    attribution: "Vedanta Society Archives"
  },
  {
    id: "katha-up",
    nameEnglish: "Katha Upanishad",
    nameSanskrit: "कठोपनिषद्",
    category: "Upanishads",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "ePub", "TXT"],
    size: "1.6 MB",
    sizeBytes: 1677721,
    attribution: "Vedanta Society Archives"
  },
  {
    id: "prashna-up",
    nameEnglish: "Prashna Upanishad",
    nameSanskrit: "प्रश्नोपनिषद्",
    category: "Upanishads",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "ePub"],
    size: "1.3 MB",
    sizeBytes: 1363148,
    attribution: "Vedanta Society Archives"
  },
  {
    id: "mundaka-up",
    nameEnglish: "Mundaka Upanishad",
    nameSanskrit: "मुण्डकोपनिषद्",
    category: "Upanishads",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "ePub", "TXT"],
    size: "1.4 MB",
    sizeBytes: 1468006,
    attribution: "Vedanta Society Archives"
  },
  {
    id: "mandukya-up",
    nameEnglish: "Mandukya Upanishad",
    nameSanskrit: "माण्डूक्योपनिषद्",
    category: "Upanishads",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "ePub", "TXT"],
    size: "0.8 MB",
    sizeBytes: 838860,
    attribution: "Vedanta Society Archives"
  },
  // PURANAS
  {
    id: "vishnu-purana",
    nameEnglish: "Vishnu Purana",
    nameSanskrit: "विष्णु पुराण",
    category: "Puranas",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "ePub"],
    size: "8.6 MB",
    sizeBytes: 9017753,
    attribution: "Gita Press Translation"
  },
  {
    id: "shiva-purana",
    nameEnglish: "Shiva Purana",
    nameSanskrit: "शिव पुराण",
    category: "Puranas",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "ePub"],
    size: "9.2 MB",
    sizeBytes: 9646899,
    attribution: "Gita Press Translation"
  },
  {
    id: "bhagavata-purana",
    nameEnglish: "Bhagavata Purana",
    nameSanskrit: "श्रीमद्भागवत पुराण",
    category: "Puranas",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "ePub", "TXT"],
    size: "14.1 MB",
    sizeBytes: 14784921,
    attribution: "Gita Press Translation"
  },
  // EPICS
  {
    id: "ramayana",
    nameEnglish: "Valmiki Ramayana",
    nameSanskrit: "वाल्मीकि रामायण",
    category: "Epics",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "ePub"],
    size: "11.2 MB",
    sizeBytes: 11744051,
    attribution: "Sanskrit Academy Publications"
  },
  {
    id: "mahabharata",
    nameEnglish: "Mahabharata (Complete)",
    nameSanskrit: "महाभारत",
    category: "Epics",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "TXT"],
    size: "34.5 MB",
    sizeBytes: 36175872,
    attribution: "Bhandarkar Oriental Research Institute"
  },
  {
    id: "ramcharitmanas",
    nameEnglish: "Ramcharitmanas",
    nameSanskrit: "रामचरितमानस",
    category: "Epics",
    languages: ["HI", "EN"],
    formats: ["PDF", "ePub", "TXT"],
    size: "7.1 MB",
    sizeBytes: 7444889,
    attribution: "Gita Press Gorakhpur"
  },
  // PHILOSOPHY
  {
    id: "yoga-sutras",
    nameEnglish: "Yoga Sutras of Patanjali",
    nameSanskrit: "पातञ्जलयोगसूत्राणि",
    category: "Philosophy",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "ePub", "TXT"],
    size: "2.1 MB",
    sizeBytes: 2202009,
    attribution: "Raja Yoga Translation Series"
  },
  {
    id: "brahma-sutras",
    nameEnglish: "Brahma Sutras",
    nameSanskrit: "ब्रह्मसूत्राणि",
    category: "Philosophy",
    languages: ["SA", "EN"],
    formats: ["PDF", "TXT"],
    size: "3.4 MB",
    sizeBytes: 3565158,
    attribution: "Sri Ramakrishna Mission Publication"
  },
  // OTHERS
  {
    id: "arthashastra",
    nameEnglish: "Arthashastra",
    nameSanskrit: "अर्थशास्त्रम्",
    category: "Others",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF", "ePub"],
    size: "5.3 MB",
    sizeBytes: 5557452,
    attribution: "Shamasastry Translation Archives"
  },
  {
    id: "charaka-samhita",
    nameEnglish: "Charaka Samhita (Ayurveda)",
    nameSanskrit: "चरकसंहिता",
    category: "Others",
    languages: ["SA", "HI", "EN"],
    formats: ["PDF"],
    size: "14.2 MB",
    sizeBytes: 14889779,
    attribution: "Ayurveda Research Board of India"
  }
];

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"name" | "size">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    Gita: true,
    Vedas: true,
    Upanishads: true,
    Puranas: true,
    Epics: true,
    Philosophy: true,
    Others: true
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { playClick, playSuccess } = useSacredSound();

  const handleDownload = (scripture: ScriptureDownload, format: string) => {
    playSuccess();
    setToastMessage(`Downloading "${scripture.nameEnglish}" in ${format} format...`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const toggleCategory = (cat: string) => {
    playClick();
    setExpandedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const handleSort = (field: "name" | "size") => {
    playClick();
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Grouped and sorted data
  const processedGroups = useMemo(() => {
    // 1. Filter raw data
    const filtered = DOWNLOAD_DATA.filter(item => 
      item.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameSanskrit.includes(searchQuery) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Sort filtered data
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;
      if (sortField === "name") {
        comparison = a.nameEnglish.localeCompare(b.nameEnglish);
      } else {
        comparison = a.sizeBytes - b.sizeBytes;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    // 3. Group by Category
    const groups: Record<string, ScriptureDownload[]> = {};
    sorted.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });

    return groups;
  }, [searchQuery, sortField, sortOrder]);

  return (
    <div className="flex flex-col min-h-screen bg-[#050508] text-[#F5F0E8] select-text">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#0F0F14] border border-[#B8860B] text-[#FFD700] rounded-xl px-6 py-4 flex items-center gap-3 shadow-[0_12px_40px_rgba(184,134,11,0.25)] max-w-md w-full animate-bounce">
          <Info className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-semibold leading-normal">{toastMessage}</span>
        </div>
      )}

      {/* 1. HERO HEADER */}
      <section className="w-full pt-16 pb-8 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] bg-clip-text text-transparent leading-normal tracking-wide">
          ग्रन्थ डाउनलोड
        </h1>
        <h2 className="text-lg md:text-xl text-[#9CA3AF] mt-2 font-serif">
          Universal Knowledge Download Center
        </h2>
        <p className="text-xs md:text-sm text-[#9CA3AF] mt-4 leading-relaxed max-w-2xl mx-auto">
          Offline access to original Sanskrit texts, transliterations, Hindi/English translations, and ebooks. Free from advertisements or fees, belonging to the heritage of all humanity.
        </p>
      </section>

      {/* 2. CONTROLS STRIP */}
      <div className="max-w-5xl mx-auto w-full px-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-4 pr-10 py-2.5 bg-[#0F0F14] border border-[#B8860B20] focus:border-[#FFD700] rounded-lg text-xs outline-none text-[#F5F0E8] placeholder-gray-500"
          />
        </div>

        {/* Sort triggers */}
        <div className="flex gap-3 select-none flex-shrink-0">
          <button
            onClick={() => handleSort("name")}
            className={`flex items-center gap-1 px-3 py-2 rounded border text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer
              ${sortField === "name" ? "border-[#FFD700] text-[#FFD700] bg-[#B8860B10]" : "border-[#B8860B20] text-[#9CA3AF]"}`}
          >
            <span>Sort by Name</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
          <button
            onClick={() => handleSort("size")}
            className={`flex items-center gap-1 px-3 py-2 rounded border text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer
              ${sortField === "size" ? "border-[#FFD700] text-[#FFD700] bg-[#B8860B10]" : "border-[#B8860B20] text-[#9CA3AF]"}`}
          >
            <span>Sort by Size</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* 3. TABLE LAYOUT BY CATEGORY */}
      <main className="flex-grow max-w-5xl mx-auto px-4 w-full pb-16">
        <div className="flex flex-col gap-6 w-full">
          {Object.keys(processedGroups).map((cat) => {
            const isExpanded = expandedCategories[cat] !== false;
            const items = processedGroups[cat];
            return (
              <div key={cat} className="border border-[#B8860B20] bg-[#0F0F14]/40 rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(cat)}
                  className="w-full flex items-center justify-between px-6 py-4 bg-[#0F0F14] border-b border-[#B8860B10] cursor-pointer outline-none select-none text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#FFD700] text-sm font-bold font-serif uppercase tracking-wider">{cat}</span>
                    <span className="text-[10px] text-[#9CA3AF] bg-black border border-[#B8860B10] px-2 py-0.5 rounded-full font-mono font-semibold">
                      {items.length} items
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-[#B8860B]" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[#B8860B]" />
                  )}
                </button>

                {/* Table list rows */}
                {isExpanded && (
                  <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs min-w-[700px]">
                      <thead>
                        <tr className="bg-black/40 border-b border-[#B8860B10] text-[#9CA3AF] font-semibold select-none">
                          <th className="px-6 py-3.5">Scripture</th>
                          <th className="px-4 py-3.5">Category</th>
                          <th className="px-4 py-3.5">Language</th>
                          <th className="px-4 py-3.5">Formats</th>
                          <th className="px-4 py-3.5">Est. Size</th>
                          <th className="px-6 py-3.5 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((row) => (
                          <tr key={row.id} className="border-b border-[#B8860B10]/40 hover:bg-[#B8860B04] transition-colors">
                            
                            {/* Scripture details */}
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <span className="font-sanskrit text-sm text-[#FFD700] font-bold leading-normal">{row.nameSanskrit}</span>
                                <span className="text-white font-serif text-sm font-semibold mt-0.5">{row.nameEnglish}</span>
                                <span className="text-[9px] text-[#9CA3AF] mt-1 select-none font-mono">Source: {row.attribution}</span>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="px-4 py-4 select-none">
                              <span className="text-[9px] font-semibold text-[#B8860B] bg-[#B8860B15] border border-[#B8860B20] px-2 py-0.5 rounded-full uppercase tracking-wider">
                                {row.category}
                              </span>
                            </td>

                            {/* Language flags */}
                            <td className="px-4 py-4 select-none">
                              <div className="flex items-center gap-1.5 font-semibold text-[10px]">
                                {row.languages.includes("SA") && <span>🇮🇳 SA</span>}
                                {row.languages.includes("HI") && <span>🇮🇳 HI</span>}
                                {row.languages.includes("EN") && <span>🇬🇧 EN</span>}
                              </div>
                            </td>

                            {/* Format badges */}
                            <td className="px-4 py-4 select-none">
                              <div className="flex items-center gap-1.5">
                                {row.formats.map(f => (
                                  <span key={f} className="text-[9px] font-bold text-white bg-black border border-white/10 px-1.5 py-0.5 rounded">
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </td>

                            {/* Estimated Size */}
                            <td className="px-4 py-4 font-mono text-[#9CA3AF]">
                              {row.size}
                            </td>

                            {/* Actions button */}
                            <td className="px-6 py-4 text-right select-none">
                              <div className="flex justify-end gap-1.5">
                                {row.formats.map((fmt) => (
                                  <button
                                    key={fmt}
                                    onClick={() => handleDownload(row, fmt)}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-[#B8860B] hover:bg-[#FFD700] text-black font-extrabold text-[10px] uppercase tracking-wider rounded transition-colors cursor-pointer border-none"
                                    aria-label={`Download ${row.nameEnglish} as ${fmt}`}
                                  >
                                    <Download className="w-3 h-3 flex-shrink-0" />
                                    <span>{fmt}</span>
                                  </button>
                                ))}
                              </div>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Humanity free message */}
        <div className="mt-12 text-center select-none bg-gradient-to-r from-transparent via-[#B8860B10] to-transparent border-t border-b border-[#B8860B20] py-6 px-4 max-w-2xl mx-auto rounded-xl">
          <p className="text-sm md:text-base text-[#FFD700] font-serif italic">
            &ldquo;All downloads are free. These texts belong to all of humanity.&rdquo;
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
