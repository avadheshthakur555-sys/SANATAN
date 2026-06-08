"use client";

import React, { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { 
  BookOpen, Download, Volume2, Bookmark, Heart, 
  MapPin, Clock, Award, Compass, Search, ChevronRight, Play, Check, AlertCircle, Scroll 
} from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useSacredSound } from "@/lib/sacred-audio";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import RelatedKnowledge from "@/components/scripture/RelatedKnowledge";

const getScriptureImage = (slug: string): string => {
  switch (slug) {
    case "gita":
      return "/images/hero-temple-sanctum.png";
    case "rigveda":
      return "/images/vedic-revelation.png";
    case "mahabharata":
      return "/images/mahabharata-era.png";
    case "ramayana":
      return "/images/ramayana-era.png";
    case "shiva-purana":
    case "shiva-p":
      return "/images/deities/shiva.png";
    case "brihadaranyaka":
      return "/images/upanishadic-wisdom.png";
    case "yoga-sutras":
      return "/images/cosmic-space.png";
    case "arthashastra":
      return "/images/civilization-journey.png";
    default:
      return "";
  }
};

// Local static metadata matching LibraryBrowser ALL_SCRIPTURES
const METADATA_LOOKUP: Record<string, {
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readingTime: string;
  importanceScore: number;
  whyReadThis: string;
  primaryTeachings: string[];
  relatedScriptures: string[];
  titleHindi: string;
}> = {
  gita: {
    titleHindi: "श्रीमद्भगवद्गीता",
    difficulty: "Beginner",
    readingTime: "4 Hours",
    importanceScore: 10,
    whyReadThis: "The ultimate guide to duty, selfless action, and self-realization in times of personal and moral crisis.",
    primaryTeachings: ["Karma Yoga (Selfless Action)", "Jnana Yoga (Path of Knowledge)", "Bhakti Yoga (Path of Devotion)", "Immortality of the Soul (Atman)"],
    relatedScriptures: ["mahabharata", "yoga-sutras", "isha"]
  },
  rigveda: {
    titleHindi: "ऋग्वेद",
    difficulty: "Advanced",
    readingTime: "50 Hours",
    importanceScore: 10,
    whyReadThis: "The root source of all Dharmic cosmic vision, containing the oldest prayers and philosophical questions of humanity.",
    primaryTeachings: ["Cosmic Order (Rta)", "Unity of Truth (Ekam Sat)", "Devotion to Nature Elements", "Origin of the Universe (Nasadiya Sukta)"],
    relatedScriptures: ["yajurveda", "samaveda", "atharvaveda"]
  },
  mahabharata: {
    titleHindi: "महाभारत",
    difficulty: "Intermediate",
    readingTime: "120 Hours",
    importanceScore: 10,
    whyReadThis: "The world's longest epic, exploring every possible human dilemma, relationships, politics, and the ultimate triumph of Dharma.",
    primaryTeachings: ["Triumph of Dharma", "Complexity of Moral Choices", "Devotion and Sacrifice", "Duty over Personal Desires"],
    relatedScriptures: ["gita", "ramayana"]
  },
  ramayana: {
    titleHindi: "रामायण",
    difficulty: "Beginner",
    readingTime: "30 Hours",
    importanceScore: 9,
    whyReadThis: "The epic of the ideal human and ideal king, mapping out family duties, devotion, and structural righteousness.",
    primaryTeachings: ["Maryada (Righteous Conduct)", "Unconditional Devotion (Hanuman's path)", "Fulfillment of Vows", "Victory of Good over Evil"],
    relatedScriptures: ["mahabharata", "ramcharitmanas"]
  },
  "shiva-purana": {
    titleHindi: "शिव पुराण",
    difficulty: "Intermediate",
    readingTime: "18 Hours",
    importanceScore: 8,
    whyReadThis: "A guide to the cosmic mysteries of dissolution, dynamic energy, and absolute stillness through the legends of Lord Shiva.",
    primaryTeachings: ["Formless Divinity (Linga)", "Power of Meditation and Tapas", "Devotion to Shiva-Shakti", "Cosmic Dissolution (Pralaya)"],
    relatedScriptures: ["linga-purana", "skanda-purana"]
  },
  brihadaranyaka: {
    titleHindi: "बृहदारण्यक उपनिषद",
    difficulty: "Advanced",
    readingTime: "12 Hours",
    importanceScore: 10,
    whyReadThis: "The largest Upanishad, exploring direct non-dual realization, the identity of Atman and Brahman, and deep mystical dialogues.",
    primaryTeachings: ["Neti Neti (Not this, Not that)", "Atman is Brahman", "Lead me from darkness to light (Tamaso ma jyotirgamaya)", "Unity of Consciousness"],
    relatedScriptures: ["chandogya", "isha", "gita"]
  },
  "yoga-sutras": {
    titleHindi: "योग सूत्र",
    difficulty: "Intermediate",
    readingTime: "6 Hours",
    importanceScore: 10,
    whyReadThis: "The scientific handbook of mind control and consciousness expansion, outlining the exact steps to reach Samadhi.",
    primaryTeachings: ["Eight Limbs of Yoga (Ashtanga)", "Stillness of Mind (Chitta Vritti Nirodha)", "Self-Discipline (Yama & Niyama)", "Detached Awareness (Vairagya)"],
    relatedScriptures: ["gita", "brahma-sutras"]
  },
  arthashastra: {
    titleHindi: "अर्थशास्त्र",
    difficulty: "Intermediate",
    readingTime: "24 Hours",
    importanceScore: 8,
    whyReadThis: "Chanakya's classic on governance, statecraft, economy, and foreign policy, revealing the pragmatic requirements of a stable empire.",
    primaryTeachings: ["Saptanga Theory of State", "State Economy & Treasury Importance", "Foreign Diplomacy (Mandala Theory)", "Pragmatic Governance and Espionage"],
    relatedScriptures: ["manusmriti", "charaka-samhita"]
  }
};

const KNOWLEDGE_LOOKUP: Record<string, {
  figures: { name: string; nameSanskrit: string; role: string; desc: string }[];
  concepts: { name: string; nameSanskrit: string; desc: string }[];
  philosophies: { name: string; nameSanskrit: string; desc: string }[];
}> = {
  gita: {
    figures: [
      { name: "Sri Krishna", nameSanskrit: "श्रीकृष्ण", role: "Divine Speaker", desc: "The Supreme Avatar who froze time to deliver the Gita to Arjuna." },
      { name: "Arjuna", nameSanskrit: "अर्जुन", role: "Disciple Archer", desc: "The Pandava prince who represents humanity faltering on the battlefield of life." },
      { name: "Veda Vyasa", nameSanskrit: "वेदव्यास", role: "Compiler Sage", desc: "The legendary compiler who authored the Mahabharata and classified the Vedas." }
    ],
    concepts: [
      { name: "Nishkama Karma", nameSanskrit: "निष्काम कर्म", desc: "Selfless action performed without attachment to personal fruits or results." },
      { name: "Atman", nameSanskrit: "आत्मन्", desc: "The immortal, birthless, and uncreated individual soul identical to Brahman." },
      { name: "Dharma", nameSanskrit: "धर्म", desc: "Cosmic righteousness, duty, and moral order guiding human behavior." }
    ],
    philosophies: [
      { name: "Advaita Vedanta", nameSanskrit: "अद्वैत वेदान्त", desc: "Non-dual philosophy identifying the individual soul with universal consciousness." },
      { name: "Samkhya", nameSanskrit: "सांख्य", desc: "Dualistic philosophy dividing reality into Purusha (Spirit) and Prakriti (Matter)." }
    ]
  },
  rigveda: {
    figures: [
      { name: "Agni", nameSanskrit: "अग्नि", role: "Divine Fire Messenger", desc: "The fire deity through whom all sacrificial offerings are conveyed to the cosmos." },
      { name: "Indra", nameSanskrit: "इन्द्र", role: "Lord of Thunder", desc: "The cosmic hero who releases glacier-fed rivers and represents heroic strength." },
      { name: "Vashistha Rishi", nameSanskrit: "वसिष्ठ", role: "Vedic Seer", desc: "One of the Saptarishis, author of the seventh Mandala of the Rigveda." }
    ],
    concepts: [
      { name: "Rta", nameSanskrit: "ऋत", desc: "The self-regulating cosmic order, truth, and rhythmic harmony of the universe." },
      { name: "Ekam Sat", nameSanskrit: "एकं सत्", desc: "The ultimate truth is one, though sages name it differently (Ekam Sat Vipra Bahudha Vadanti)." }
    ],
    philosophies: [
      { name: "Purva Mimamsa", nameSanskrit: "पूर्व मीमांसा", desc: "Vedic hermeneutics emphasizing the absolute authority of sound, mantra, and ritual duty." }
    ]
  }
};

// SVG Icon components for the Cinematic Header
const ScriptureArtwork = ({ slug }: { slug: string }) => {
  const c = slug.toLowerCase();
  
  if (c === "gita") {
    return (
      <svg viewBox="0 0 200 200" className="w-40 h-40 text-[#D4AF37] stroke-current fill-none stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="70" strokeDasharray="4 2" />
        <circle cx="100" cy="100" r="80" />
        <circle cx="100" cy="100" r="15" fill="#D4AF37" fillOpacity="0.1" />
        {Array.from({ length: 12 }).map((_, i) => {
          const rad = (i * 30 * Math.PI) / 180;
          const x2 = (100 + 70 * Math.cos(rad)).toFixed(4);
          const y2 = (100 + 70 * Math.sin(rad)).toFixed(4);
          return (
            <line key={i} x1="100" y1="100" x2={x2} y2={y2} />
          );
        })}
        {/* Bow */}
        <path d="M50 140 Q150 180 150 120" stroke="#8C2D19" strokeWidth="3" />
        <line x1="50" y1="138" x2="148" y2="118" stroke="#FAF7F0" strokeWidth="0.8" />
        {/* Peacock feather */}
        <path d="M100 20 Q120 40 100 80 Q80 120 100 100" stroke="#1E8449" strokeWidth="2" />
      </svg>
    );
  }
  
  if (c.includes("veda")) {
    return (
      <svg viewBox="0 0 200 200" className="w-40 h-40 text-[#C0392B] stroke-current fill-none stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="120" width="100" height="35" rx="3" fill="#3E2723" />
        <rect x="40" y="115" width="120" height="8" rx="2" fill="#8C2D19" />
        <ellipse cx="100" cy="116" rx="40" ry="6" fill="#1A0A00" />
        {/* Flames */}
        <path d="M100 115 C90 95 80 75 90 50 C95 40 100 30 100 115Z" fill="#E65100" opacity="0.9" />
        <path d="M100 115 C110 95 120 75 110 50 C105 40 100 30 100 115Z" fill="#FF8F00" opacity="0.9" />
        <circle cx="100" cy="55" r="1.5" fill="#FFD700" />
        <circle cx="90" cy="70" r="1" fill="#FFD700" />
        <circle cx="110" cy="75" r="2" fill="#FFD700" />
      </svg>
    );
  }

  if (c === "ramayana" || c === "ramcharitmanas") {
    return (
      <svg viewBox="0 0 200 200" className="w-40 h-40 text-[#D4AC0D] stroke-current fill-none stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
        {/* Bow */}
        <path d="M40 100 Q100 20 160 100" stroke="#D4AC0D" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="42" y1="100" x2="158" y2="100" stroke="#FAF7F0" strokeWidth="0.8" />
        {/* Arrow */}
        <line x1="100" y1="100" x2="100" y2="30" stroke="#8C2D19" strokeWidth="2" />
        <polygon points="100,22 95,33 105,33" fill="#D4AC0D" />
        {/* Sun symbol */}
        <circle cx="100" cy="100" r="12" fill="#E65100" opacity="0.2" />
      </svg>
    );
  }

  // Fallback: Sacred Palm-leaf Manuscript Scroll
  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40 text-[#8C6914] stroke-current fill-none stroke-[1.2]" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="70" width="140" height="60" rx="3" fill="#F4EAD4" stroke="#8C6914" strokeWidth="2" />
      {/* Scroll rods */}
      <line x1="28" y1="65" x2="28" y2="135" stroke="#3E2723" strokeWidth="4" />
      <line x1="172" y1="65" x2="172" y2="135" stroke="#3E2723" strokeWidth="4" />
      <line x1="40" y1="85" x2="160" y2="85" stroke="#8C6914" opacity="0.4" />
      <line x1="40" y1="100" x2="160" y2="100" stroke="#8C6914" opacity="0.4" />
      <line x1="40" y1="115" x2="160" y2="115" stroke="#8C6914" opacity="0.4" />
      <text x="100" y="104" textAnchor="middle" fontSize="12" fill="#8C2D19" fontFamily="serif" fontWeight="bold">ॐ नमः</text>
    </svg>
  );
};

const TRANSLATIONS = {
  EN: {
    startReading: "Begin Reading",
    downloadScroll: "Download PDF Scroll",
    listenInvocation: "Listen to Invocation",
    bookmark: "Bookmark Scripture",
    bookmarked: "Bookmarked",
    author: "Rishi / Author",
    era: "Era / Period",
    chapters: "Chapters",
    verses: "Verses",
    difficulty: "Difficulty",
    readingTime: "Reading Time",
    primaryTeachings: "Primary Teachings",
    whyReadThis: "Why Read This",
    relatedKnowledge: "Related Knowledge System",
    relatedTexts: "Related Texts",
    relatedFigures: "Related Figures",
    relatedConcepts: "Related Concepts",
    philosophies: "Philosophies",
    chaptersList: "Chapters Directory",
    searchPlaceholder: "Search chapter title or summary...",
    noChapters: "No chapters digitized yet.",
    returnToLibrary: "Return to Library",
    studySanctum: "Study Sanctum",
    restoring: "This exhibit is under digital restoration. Please visit other active scriptures while we restore it."
  },
  HI: {
    startReading: "पढ़ना शुरू करें",
    downloadScroll: "पीडीएफ स्क्रॉल डाउनलोड करें",
    listenInvocation: "मंगलाचरण सुनें",
    bookmark: "बुकमार्क करें",
    bookmarked: "बुकमार्क किया गया",
    author: "ऋषि / लेखक",
    era: "काल / युग",
    chapters: "अध्याय",
    verses: "श्लोक",
    difficulty: "कठिनाई",
    readingTime: "पठन समय",
    primaryTeachings: "मुख्य शिक्षाएं",
    whyReadThis: "इसे क्यों पढ़ें",
    relatedKnowledge: "सम्बन्धित ज्ञान चक्र",
    relatedTexts: "सम्बन्धित ग्रन्थ",
    relatedFigures: "सम्बन्धित व्यक्तित्व",
    relatedConcepts: "सम्बन्धित अवधारणाएं",
    philosophies: "दर्शन",
    chaptersList: "अध्याय सूची",
    searchPlaceholder: "अध्याय का शीर्षक या सारांश खोजें...",
    noChapters: "अभी कोई अध्याय डिजिटल नहीं किया गया है।",
    returnToLibrary: "पुस्तकालय पर वापस जाएँ",
    studySanctum: "अध्ययन गर्भगृह",
    restoring: "यह पांडुलिपि डिजिटल संरक्षण में है। जब तक हम इसे पुनर्स्थापित करते हैं, कृपया अन्य सक्रिय ग्रंथों को पढ़ें।"
  },
  SA: {
    startReading: "पठनम् आरभ्यताम्",
    downloadScroll: "पत्रम् डाउनलोड् कुरु",
    listenInvocation: "मंगलाचरणं श्रूयताम्",
    bookmark: "चिह्नीकुरु",
    bookmarked: "चिह्नितम्",
    author: "ऋषिः / रचयिता",
    era: "कालः / युगम्",
    chapters: "अध्यायाः",
    verses: "श्लोकाः",
    difficulty: "काठिन्यस्तरः",
    readingTime: "पठनसमयः",
    primaryTeachings: "मुख्यशिक्षाः",
    whyReadThis: "किमर्थं पठनीयम्",
    relatedKnowledge: "सम्बद्धज्ञानचक्रम्",
    relatedTexts: "सम्बद्धाः ग्रन्थाः",
    relatedFigures: "सम्बद्धाः पुरुषाः",
    relatedConcepts: "सम्बद्धाः विचाराः",
    philosophies: "दर्शनानि",
    chaptersList: "अध्यायसूचिका",
    searchPlaceholder: "अध्यायशीर्षकं अन्विष्यताम्...",
    noChapters: "अध्यायाः अद्यापि अङ्कीकृताः न सन्ति।",
    returnToLibrary: "पुस्तकालयं प्रति निवर्तताम्",
    studySanctum: "अध्ययनगर्भगृहम्",
    restoring: "ग्रन्थस्यास्य अङ्कीकरणं प्रचलति। तावत् अन्यान् ग्रन्थान् पठन्तु।"
  }
};

interface ChapterInput {
  id: string;
  chapterNumber: number;
  titleSanskrit: string;
  titleHindi: string;
  titleEnglish: string;
  summary: string;
  totalVerses: number;
}

interface ScriptureInput {
  id: string;
  titleSanskrit: string;
  titleHindi: string;
  titleEnglish: string;
  slug: string;
  description: string;
  totalChapters: number;
  totalVerses: number;
  pdfUrl?: string | null;
  coverImage?: string | null;
  authorRishi?: string | null;
  periodEra?: string | null;
  chapters: ChapterInput[];
}

interface ScriptureDetailClientProps {
  scripture: ScriptureInput;
  nextReadItems: {
    category: string;
    titleEnglish: string;
    titleSanskrit: string;
    description: string;
    href: string;
  }[];
}

export default function ScriptureDetailClient({ scripture, nextReadItems }: ScriptureDetailClientProps) {
  const { language } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  const [chapterSearch, setChapterSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"texts" | "figures" | "concepts" | "philosophies">("texts");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { playClick, playSuccess, playNavigate, playOm } = useSacredSound();

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
      // Read initial bookmark state from localStorage
      const bookmarked = localStorage.getItem(`bookmark_scripture_${scripture.slug}`) === "true";
      setIsBookmarked(bookmarked);
    });
  }, [scripture.slug]);

  const currentLang = mounted ? language : "EN";
  const labels = TRANSLATIONS[currentLang] || TRANSLATIONS.EN;

  // Enrich with local metadata
  const localMeta = METADATA_LOOKUP[scripture.slug] || {
    difficulty: "Intermediate",
    readingTime: "8 Hours",
    importanceScore: 8,
    whyReadThis: scripture.description,
    primaryTeachings: ["Dharma (Righteousness)", "Self-Realization"],
    relatedScriptures: ["gita"]
  };

  const knowledge = KNOWLEDGE_LOOKUP[scripture.slug] || {
    figures: [
      { name: "Sage Veda Vyasa", nameSanskrit: "वेदव्यास", role: "Sage Compiler", desc: "The writer of the Puranas and compiler of Vedic scriptures." }
    ],
    concepts: [
      { name: "Dharma", nameSanskrit: "धर्म", desc: "Moral righteousness and cosmic order." },
      { name: "Karma", nameSanskrit: "कर्म", desc: "The law of cause and effect governing actions." }
    ],
    philosophies: [
      { name: "Vedanta", nameSanskrit: "वेदान्त", desc: "End of the Vedas, exploring ultimate reality and non-dualism." }
    ]
  };

  const handleListenInvocation = () => {
    playOm();
    setToastMessage(currentLang === "HI" ? "मंगलाचरण आरंभ हो रहा है..." : currentLang === "SA" ? "मंगलाचरणम् आरभ्यते..." : "Playing sacred invocation sound...");
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleBookmark = () => {
    playSuccess();
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    localStorage.setItem(`bookmark_scripture_${scripture.slug}`, String(nextState));
    setToastMessage(
      nextState 
        ? (currentLang === "HI" ? "ग्रन्थ बुकमार्क में जोड़ा गया" : currentLang === "SA" ? "ग्रन्थः चिह्नीकृतः" : "Scripture bookmarked successfully") 
        : (currentLang === "HI" ? "ग्रन्थ बुकमार्क से हटाया गया" : currentLang === "SA" ? "ग्रन्थः विचिह्नीकृतः" : "Scripture removed from bookmarks")
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDownload = () => {
    playSuccess();
    setToastMessage(currentLang === "HI" ? "पांडुलिपि पत्रक डाउनलोड आरम्भ..." : currentLang === "SA" ? "ग्रन्थपत्रस्य अधोभारणम्..." : "PDF scroll download initiated...");
    
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const chapterListHtml = scripture.chapters.map(ch => `
      <div class="chapter-card">
        <h3>Chapter ${ch.chapterNumber}: ${ch.titleEnglish} (${ch.titleSanskrit})</h3>
        <p><strong>Summary:</strong> ${ch.summary}</p>
        <p class="verses-count">Total Verses: ${ch.totalVerses}</p>
      </div>
    `).join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>${scripture.titleEnglish} - Sacred Scroll</title>
          <style>
            body {
              font-family: 'Georgia', serif;
              background-color: #FAF7F0;
              color: #3E2723;
              padding: 40px;
              line-height: 1.6;
            }
            h1 {
              text-align: center;
              color: #8C2D19;
              border-bottom: 2px double #D4AF37;
              padding-bottom: 12px;
              font-size: 32px;
              margin-bottom: 5px;
            }
            .subtitle {
              text-align: center;
              font-size: 20px;
              color: #D4AF37;
              font-weight: bold;
              margin-bottom: 25px;
            }
            .meta-table {
              width: 100%;
              margin: 20px 0 30px;
              border-collapse: collapse;
              font-family: monospace;
              font-size: 13px;
            }
            .meta-table td {
              padding: 8px 12px;
              border: 1px solid rgba(212, 175, 55, 0.3);
            }
            .description {
              font-style: italic;
              background: #FFFDFC;
              border-left: 3px solid #8C2D19;
              padding: 15px;
              margin-bottom: 40px;
              font-size: 15px;
            }
            .chapter-card {
              background: white;
              border: 1px solid #D4AF37;
              border-radius: 4px;
              padding: 20px;
              margin-bottom: 20px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.05);
              page-break-inside: avoid;
            }
            .chapter-card h3 {
              margin-top: 0;
              color: #8C2D19;
              border-bottom: 1px dashed #D4AF37;
              padding-bottom: 8px;
            }
            .verses-count {
              font-size: 12px;
              color: #7D6B58;
              font-weight: bold;
            }
            .print-btn {
              display: block;
              width: fit-content;
              margin: 40px auto 0;
              padding: 12px 24px;
              background-color: #8C2D19;
              color: white;
              border: none;
              border-radius: 4px;
              font-size: 14px;
              font-weight: bold;
              cursor: pointer;
              box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }
            @media print {
              .print-btn { display: none; }
              body { padding: 20px; background-color: white; }
            }
          </style>
        </head>
        <body>
          <h1>${scripture.titleEnglish.toUpperCase()}</h1>
          <div class="subtitle">${scripture.titleSanskrit}</div>
          
          <table class="meta-table">
            <tr>
              <td><strong>Rishi/Author:</strong> ${scripture.authorRishi || "Ancient Vedic Seers"}</td>
              <td><strong>Historical Period:</strong> ${scripture.periodEra || "Mythic Era"}</td>
            </tr>
            <tr>
              <td><strong>Total Chapters:</strong> ${scripture.totalChapters}</td>
              <td><strong>Total Verses:</strong> ${scripture.totalVerses}</td>
            </tr>
          </table>

          <div class="description">
            &ldquo;${scripture.description}&rdquo;
          </div>

          <h2>Chapters Directory</h2>
          ${chapterListHtml}

          <button onclick="window.print()" class="print-btn">
            Save / Print Sacred PDF Scroll
          </button>
        </body>
      </html>
    `);
    printWindow.document.close();

    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter Chapters
  const filteredChapters = scripture.chapters.filter(chap => {
    const q = chapterSearch.toLowerCase();
    return (
      chap.titleEnglish.toLowerCase().includes(q) ||
      chap.titleSanskrit.includes(q) ||
      chap.summary.toLowerCase().includes(q)
    );
  });

  const scriptureTitle = currentLang === "SA" ? scripture.titleSanskrit : currentLang === "HI" ? (scripture.titleHindi || scripture.titleEnglish) : scripture.titleEnglish;
  const scriptureDesc = scripture.description;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F0] text-[#3E2723] select-text relative overflow-x-hidden font-serif">
      {/* Background Watermarks */}
      <div className="absolute top-[10%] left-[-150px] w-[500px] h-[500px] opacity-[0.025] text-[#D4AF37] pointer-events-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[0.3]">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="38" strokeDasharray="3 2" />
        </svg>
      </div>

      {/* Toast notifications */}
      {toastMessage && (
        <div className="fixed top-[94px] left-1/2 transform -translate-x-1/2 z-[100] bg-[#FAF7F0] border-double border-4 border-[#8C2D19] text-[#8C2D19] px-6 py-3 flex items-center gap-3 shadow-2xl max-w-lg w-[90%] animate-bounce">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-semibold leading-normal">{toastMessage}</span>
        </div>
      )}

      {/* Universal Breadcrumbs */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-6 relative z-20">
        <Breadcrumb items={[{ label: "Library", href: "/library" }, { label: scriptureTitle }]} />
      </div>

      {/* Cinematic Full-Width Hero Section (50vh) */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center bg-[#100800] text-white py-16 overflow-hidden border-b border-[#D4AF37]/35 mt-4">
        {/* Artwork Background */}
        {(() => {
          const heroBgImage = getScriptureImage(scripture.slug);
          return heroBgImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none scale-105"
              style={{ 
                backgroundImage: `url(${heroBgImage})`,
                filter: "blur(4px) sepia(0.25) brightness(0.4)"
              }}
            />
          );
        })()}
        {/* Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#100800] via-[#100800]/85 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10" />

        {/* Content Wrapper */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 md:px-8 w-full flex flex-col lg:flex-row items-center gap-10">
          {/* Left: Floating artwork with golden borders & aura */}
          <div className="shrink-0 relative flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%) pointer-events-none animate-pulse" />
            <div className="relative border-2 border-[#D4AF37]/50 p-2.5 bg-[#1A0A00] shadow-2xl rounded-sm">
              {/* Decorative Corner Ornaments */}
              {[['top-1 left-1','border-t border-l'],['top-1 right-1','border-t border-r'],['bottom-1 left-1','border-b border-l'],['bottom-1 right-1','border-b border-r']].map(([pos, borders], i) => (
                <div key={i} className={`absolute ${pos} w-3 h-3 ${borders} border-[#D4AF37]/50`} />
              ))}
              <ScriptureArtwork slug={scripture.slug} />
            </div>
          </div>

          {/* Right: Text descriptions & actions */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
              <span className="font-sanskrit text-2xl md:text-3xl text-[#D4AF37] font-bold tracking-wide drop-shadow-md select-text">
                {scripture.titleSanskrit}
              </span>
              {scripture.titleHindi && currentLang !== "SA" && (
                <span className="text-xs font-bold text-[#8C2D19] bg-[#FAF7F0] px-2 py-0.5 rounded-sm">
                  {scripture.titleHindi}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-extrabold uppercase tracking-wider text-white select-text leading-tight">
              {scripture.titleEnglish}
            </h1>

            {/* Core details badges */}
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start text-xs font-mono py-1.5 w-full">
              {scripture.authorRishi && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
                  <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{labels.author}: <strong className="text-white">{scripture.authorRishi}</strong></span>
                </span>
              )}
              {scripture.periodEra && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#FF8C00]" />
                  <span>{labels.era}: <strong className="text-[#FF8C00]">{scripture.periodEra}</strong></span>
                </span>
              )}
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
                <BookOpen className="w-3.5 h-3.5 text-white/50" />
                <span>{labels.chapters}: <strong className="text-white">{scripture.totalChapters}</strong></span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
                <Award className="w-3.5 h-3.5 text-white/50" />
                <span>{labels.verses}: <strong className="text-white">{scripture.totalVerses.toLocaleString()}</strong></span>
              </span>
            </div>

            <p className="text-sm md:text-base text-white/80 leading-relaxed select-text font-serif italic max-w-3xl">
              &ldquo;{scriptureDesc}&rdquo;
            </p>

            {/* Quick action buttons toolbar */}
            <div className="flex flex-wrap gap-3 mt-4 w-full justify-center lg:justify-start">
              {scripture.chapters.length > 0 ? (
                <>
                  <Link href={`/library/${scripture.slug}/chapter/1`} className="no-underline">
                    <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#FFD700] text-[#1A0A00] font-bold text-xs uppercase tracking-widest transition-all rounded-sm shadow-md cursor-pointer">
                      <BookOpen className="w-4 h-4" />
                      <span>{labels.startReading}</span>
                    </button>
                  </Link>
                  <Link href={`/library/${scripture.slug}/chapter/all`} className="no-underline">
                    <button className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#D4AF37]/35 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-bold text-xs uppercase tracking-widest transition-all rounded-sm bg-transparent cursor-pointer">
                      <Scroll className="w-4 h-4" />
                      <span>Read All Chapters</span>
                    </button>
                  </Link>
                </>
              ) : (
                <button 
                  onClick={() => alert(labels.restoring)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white/40 font-bold text-xs uppercase tracking-widest rounded-sm cursor-not-allowed border border-white/10"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{labels.startReading}</span>
                </button>
              )}

              <button
                onClick={handleListenInvocation}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#D4AF37]/35 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-bold text-xs uppercase tracking-widest transition-all rounded-sm bg-transparent cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>{labels.listenInvocation}</span>
              </button>

              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#D4AF37]/35 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-bold text-xs uppercase tracking-widest transition-all rounded-sm bg-transparent cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{labels.downloadScroll}</span>
              </button>

              <button
                onClick={handleToggleBookmark}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 border font-bold text-xs uppercase tracking-widest transition-all rounded-sm bg-transparent cursor-pointer
                  ${isBookmarked 
                    ? "border-[#8C2D19] text-[#8C2D19] bg-[#8C2D19]/5" 
                    : "border-[#D4AF37]/35 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                <span>{isBookmarked ? labels.bookmarked : labels.bookmark}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow max-w-6xl mx-auto px-4 w-full pb-20 pt-8 relative z-20">

        {/* Structured "About This Scripture" Section */}
        {localMeta.whyReadThis && (
          <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
            {/* Why Read This Panel */}
            <div className="bg-[#FAF7F0] dark:bg-[#120C1E]/40 border-l-4 border-[#D4AF37] p-5 rounded-r shadow-sm">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#8C2D19] dark:text-[#F97316] font-bold mb-2 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>{labels.whyReadThis}</span>
              </h3>
              <p className="text-xs md:text-sm text-[#3E2723] dark:text-gray-300 leading-relaxed italic font-serif">
                &ldquo;{localMeta.whyReadThis}&rdquo;
              </p>
            </div>

            {/* Primary Teachings Panel */}
            <div className="bg-[#FAF7F0] dark:bg-[#120C1E]/40 border-l-4 border-[#8C2D19] p-5 rounded-r shadow-sm">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#8C2D19] dark:text-[#F97316] font-bold mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#8C2D19]" />
                <span>{labels.primaryTeachings}</span>
              </h3>
              <ul className="list-none pl-0 flex flex-col gap-1 text-[11px] text-[#5D4037] dark:text-gray-300 leading-relaxed font-serif">
                {localMeta.primaryTeachings.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-[#D4AF37] font-bold">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Scriptures/Texts Panel */}
            <div className="bg-[#FAF7F0] dark:bg-[#120C1E]/40 border-l-4 border-[#8C2D19] p-5 rounded-r shadow-sm">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#8C2D19] dark:text-[#F97316] font-bold mb-2 flex items-center gap-1.5">
                <Scroll className="w-4 h-4 text-[#8C2D19]" />
                <span>{labels.relatedTexts}</span>
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {localMeta.relatedScriptures.map(rel => (
                  <Link 
                    key={rel} 
                    href={`/library/${rel}`}
                    onClick={() => playNavigate()}
                    className="px-2.5 py-1 rounded-sm border border-[#D4AF37]/35 text-[10px] font-bold font-serif bg-[#FAF7F0]/40 dark:bg-white/5 hover:bg-[#8C2D19]/5 text-[#8C2D19] hover:text-[#3E2723] transition-colors no-underline uppercase"
                  >
                    {rel.replace('-', ' ')}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Two-Column Grid: Left (Chapters List), Right (Related Knowledge / Metadata Plaque) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: Chapters List Directory */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/30 pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#8C2D19] uppercase tracking-wide">
                {labels.chaptersList}
              </h2>
              
              {/* Search Bar for chapters */}
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D6E63]" />
                <input
                  type="text"
                  value={chapterSearch}
                  onChange={e => setChapterSearch(e.target.value)}
                  placeholder={labels.searchPlaceholder}
                  className="w-full pl-9 pr-4 py-2 bg-[#FAF7F0] border border-[#D4AF37]/45 text-xs rounded-sm placeholder-[#3E2723]/45 outline-none font-serif"
                />
              </div>
            </div>

            {filteredChapters.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredChapters.map((chap) => (
                  <Card
                    key={chap.id}
                    href={`/library/${scripture.slug}/chapter/${chap.chapterNumber}`}
                    className="group relative flex flex-col md:flex-row justify-between bg-[#FAF7F0] border border-[#D4AF37]/30 hover:border-[#8C2D19] hover:shadow-[0_8px_30px_rgba(140,45,25,0.06)] cursor-pointer p-6 rounded-sm transition-all"
                  >
                    {/* Chapter details left */}
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[10px] text-[#8D6E63] font-mono font-bold uppercase tracking-wider">
                        <span>Adhyaya {chap.chapterNumber}</span>
                        <span>{chap.totalVerses} {labels.verses}</span>
                      </div>
                      <div className="flex items-baseline gap-3 mt-1 flex-wrap">
                        <h3 className="font-sanskrit text-lg text-[#8C2D19] font-bold leading-tight">
                          {chap.titleSanskrit}
                        </h3>
                        <h4 className="font-serif text-base text-[#3E2723] font-bold">
                          {chap.titleEnglish}
                        </h4>
                      </div>
                      <p className="text-xs text-[#5D4037] leading-relaxed line-clamp-3 mt-2 select-text font-serif italic">
                        &ldquo;{chap.summary}&rdquo;
                      </p>
                    </div>

                    {/* Arrow action right */}
                    <div className="shrink-0 self-end md:self-center mt-4 md:mt-0 md:pl-4 text-[#8C2D19] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>{labels.studySanctum}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#FAF7F0] border border-[#D4AF37]/30 rounded-sm flex flex-col items-center justify-center gap-3">
                <span className="text-4xl">📜</span>
                <h4 className="text-[#3E2723] font-serif text-base font-bold">{labels.noChapters}</h4>
                <p className="text-xs text-[#8D6E63] max-w-sm leading-relaxed">
                  {labels.restoring}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: Enriched Exhibit Plaque & Related Knowledge System */}
          <div className="flex flex-col gap-6 sticky top-[94px]">
            
            {/* Exhibit Details Plaque */}
            <div className="bg-[#FAF7F0] border border-[#D4AF37]/40 p-6 rounded-sm shadow-sm relative overflow-hidden">
              {/* Decorative headers */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4AF37]" />
              <div className="border-b border-[#D4AF37]/25 pb-3 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C2D19] font-bold">Exhibit Specifications</span>
                <h3 className="font-serif text-lg font-bold text-[#3E2723] mt-0.5">millennial archives</h3>
              </div>

              <div className="flex flex-col gap-4 text-xs">
                {localMeta.difficulty && (
                  <div className="flex justify-between items-center py-1.5 border-b border-[#D4AF37]/15">
                    <span className="text-[#8D6E63] font-mono uppercase tracking-wide flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      {labels.difficulty}
                    </span>
                    <span className="font-bold text-[#3E2723]">{localMeta.difficulty}</span>
                  </div>
                )}

                {localMeta.readingTime && (
                  <div className="flex justify-between items-center py-1.5 border-b border-[#D4AF37]/15">
                    <span className="text-[#8D6E63] font-mono uppercase tracking-wide flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {labels.readingTime}
                    </span>
                    <span className="font-bold text-[#3E2723]">{localMeta.readingTime}</span>
                  </div>
                )}

                <div className="flex justify-between items-center py-1.5 border-b border-[#D4AF37]/15">
                  <span className="text-[#8D6E63] font-mono uppercase tracking-wide flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    Importance Score
                  </span>
                  <span className="font-bold text-[#8C6914]">{localMeta.importanceScore || 8}/10</span>
                </div>

                {localMeta.whyReadThis && (
                  <div className="mt-2">
                    <h5 className="font-mono text-[9px] uppercase tracking-wider text-[#8C2D19] font-bold mb-1">{labels.whyReadThis}</h5>
                    <p className="text-[11px] text-[#5D4037] leading-relaxed italic">{localMeta.whyReadThis}</p>
                  </div>
                )}

                {localMeta.primaryTeachings && localMeta.primaryTeachings.length > 0 && (
                  <div className="mt-2 border-t border-[#D4AF37]/15 pt-3">
                    <h5 className="font-mono text-[9px] uppercase tracking-wider text-[#8C2D19] font-bold mb-1.5">{labels.primaryTeachings}</h5>
                    <ul className="list-none pl-0 flex flex-col gap-1.5">
                      {localMeta.primaryTeachings.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] text-[#5D4037] leading-tight">
                          <span className="text-[#D4AF37] font-bold">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Related Knowledge System */}
            <div className="bg-[#FAF7F0] border border-[#D4AF37]/40 p-6 rounded-sm shadow-sm relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#8C2D19]" />
              
              <div className="border-b border-[#D4AF37]/25 pb-3 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C2D19] font-bold">{labels.relatedKnowledge}</span>
                <h3 className="font-serif text-lg font-bold text-[#3E2723] mt-0.5">Dharmic Relational Map</h3>
              </div>

              {/* Tabs selector */}
              <div className="flex border-b border-[#D4AF37]/15 mb-4 text-[9px] font-mono uppercase tracking-wider">
                <button
                  onClick={() => { playClick(); setActiveTab("texts"); }}
                  className={`flex-1 pb-2 font-bold text-center border-b-2 transition-all
                    ${activeTab === "texts" ? "border-[#8C2D19] text-[#8C2D19]" : "border-transparent text-[#8D6E63] hover:text-[#3E2723]"}`}
                >
                  Texts
                </button>
                <button
                  onClick={() => { playClick(); setActiveTab("figures"); }}
                  className={`flex-1 pb-2 font-bold text-center border-b-2 transition-all
                    ${activeTab === "figures" ? "border-[#8C2D19] text-[#8C2D19]" : "border-transparent text-[#8D6E63] hover:text-[#3E2723]"}`}
                >
                  Figures
                </button>
                <button
                  onClick={() => { playClick(); setActiveTab("concepts"); }}
                  className={`flex-1 pb-2 font-bold text-center border-b-2 transition-all
                    ${activeTab === "concepts" ? "border-[#8C2D19] text-[#8C2D19]" : "border-transparent text-[#8D6E63] hover:text-[#3E2723]"}`}
                >
                  Concepts
                </button>
                <button
                  onClick={() => { playClick(); setActiveTab("philosophies"); }}
                  className={`flex-1 pb-2 font-bold text-center border-b-2 transition-all
                    ${activeTab === "philosophies" ? "border-[#8C2D19] text-[#8C2D19]" : "border-transparent text-[#8D6E63] hover:text-[#3E2723]"}`}
                >
                  Philos
                </button>
              </div>

              {/* Tab Content Panels */}
              <div className="text-xs">
                {activeTab === "texts" && (
                  <div className="flex flex-col gap-3">
                    <h5 className="font-mono text-[9px] uppercase tracking-wider text-[#8C2D19] font-bold">{labels.relatedTexts}</h5>
                    <div className="flex flex-col gap-2">
                      {localMeta.relatedScriptures.map(rel => {
                        // Normally we'd search in dynamic list, fallback to slug matching
                        return (
                          <Link 
                            key={rel} 
                            href={`/library/${rel}`}
                            onClick={() => playNavigate()}
                            className="flex items-center justify-between p-2 border border-[#D4AF37]/25 rounded-sm hover:border-[#8C2D19] hover:bg-[#EAE2CF]/10 transition-all text-left no-underline"
                          >
                            <div>
                              <span className="font-bold text-[#3E2723] block text-xs">{rel.toUpperCase()}</span>
                              <span className="text-[10px] text-[#8D6E63] font-serif">Explore manuscript</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-[#8C2D19]" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === "figures" && (
                  <div className="flex flex-col gap-3">
                    <h5 className="font-mono text-[9px] uppercase tracking-wider text-[#8C2D19] font-bold">{labels.relatedFigures}</h5>
                    <div className="flex flex-col gap-3">
                      {knowledge.figures.map((fig, idx) => (
                        <div key={idx} className="p-2.5 border border-[#D4AF37]/25 rounded-sm bg-[#FAF7F0]/40">
                          <div className="flex justify-between items-baseline">
                            <strong className="text-[#3E2723]">{fig.name}</strong>
                            <span className="font-sanskrit text-[10px] text-[#C5A059]">{fig.nameSanskrit}</span>
                          </div>
                          <span className="text-[9px] text-[#8C2D19] font-mono uppercase tracking-wider block mt-0.5">{fig.role}</span>
                          <p className="text-[10.5px] text-[#5D4037] leading-relaxed mt-1">{fig.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "concepts" && (
                  <div className="flex flex-col gap-3">
                    <h5 className="font-mono text-[9px] uppercase tracking-wider text-[#8C2D19] font-bold">{labels.relatedConcepts}</h5>
                    <div className="flex flex-col gap-3">
                      {knowledge.concepts.map((con, idx) => (
                        <div key={idx} className="p-2.5 border border-[#D4AF37]/25 rounded-sm bg-[#FAF7F0]/40">
                          <div className="flex justify-between items-baseline">
                            <strong className="text-[#3E2723]">{con.name}</strong>
                            <span className="font-sanskrit text-[10px] text-[#C5A059]">{con.nameSanskrit}</span>
                          </div>
                          <p className="text-[10.5px] text-[#5D4037] leading-relaxed mt-1">{con.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "philosophies" && (
                  <div className="flex flex-col gap-3">
                    <h5 className="font-mono text-[9px] uppercase tracking-wider text-[#8C2D19] font-bold">{labels.philosophies}</h5>
                    <div className="flex flex-col gap-3">
                      {knowledge.philosophies.map((ph, idx) => (
                        <div key={idx} className="p-2.5 border border-[#D4AF37]/25 rounded-sm bg-[#FAF7F0]/40">
                          <div className="flex justify-between items-baseline">
                            <strong className="text-[#3E2723]">{ph.name}</strong>
                            <span className="font-sanskrit text-[10px] text-[#C5A059]">{ph.nameSanskrit}</span>
                          </div>
                          <p className="text-[10.5px] text-[#5D4037] leading-relaxed mt-1">{ph.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        <RelatedKnowledge slug={scripture.slug} />

      </main>

      {/* Continue Your Journey */}
      <div className="bg-[#FAF7F0] border-t border-[#D4AF37]/25 pt-12 pb-16">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C2D19] font-bold">Suggested Path</span>
            <h3 className="font-serif text-2xl font-bold text-[#3E2723] mt-0.5">Continue Your Study Journey</h3>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nextReadItems.map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#FAF7F0] border border-[#D4AF37]/30 p-5 rounded-sm flex flex-col gap-3 shadow-sm hover:shadow-md hover:border-[#8C2D19] transition-all"
              >
                <div className="flex justify-between items-baseline">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#8D6E63]">{item.category}</span>
                  <span className="font-sanskrit text-xs text-[#C5A059]">{item.titleSanskrit}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#3E2723]">{item.titleEnglish}</h4>
                <p className="text-xs text-[#5D4037] leading-relaxed italic">{item.description}</p>
                <Link 
                  href={item.href}
                  onClick={() => playNavigate()}
                  className="text-xs font-serif font-bold text-[#8C2D19] hover:text-[#3E2723] transition-colors border-b border-[#8C2D19]/40 pb-0.5 mt-auto self-start no-underline"
                >
                  Unfold Path &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
