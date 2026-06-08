"use client";

import React, { useState, useMemo, memo, useEffect, useRef, startTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, BookOpen, Download, AlertCircle, MapPin, ChevronRight, X, LayoutGrid, Landmark, Library, Scroll, List } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";

interface StaticScripture {
  id: string;
  emoji: string;
  titleSanskrit: string;
  titleEnglish: string;
  titleHindi?: string;
  category: string;
  categoryName: string;
  totalChapters: number;
  totalVerses: number;
  description: string;
  languages: string[];
  slug: string;
  isFeatured?: boolean;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  readingTime?: string;
  importanceScore?: number;
  whyReadThis?: string;
  primaryTeachings?: string[];
  relatedScriptures?: string[];
}

const ALL_SCRIPTURES: StaticScripture[] = [
  { 
    id: "gita", 
    emoji: "🕉️", 
    titleSanskrit: "श्रीमद्भगवद्गीता", 
    titleEnglish: "Bhagavad Gita", 
    titleHindi: "श्रीमद्भगवद्गीता",
    category: "gita", 
    categoryName: "Gita", 
    totalChapters: 18, 
    totalVerses: 700, 
    description: "The dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra, detailing paths of action, devotion, and knowledge.", 
    languages: ["SA", "HI", "EN"], 
    slug: "gita", 
    isFeatured: true,
    difficulty: "Beginner",
    readingTime: "4 Hours",
    importanceScore: 10,
    whyReadThis: "The ultimate guide to duty, selfless action, and self-realization in times of personal and moral crisis.",
    primaryTeachings: ["Karma Yoga (Selfless Action)", "Jnana Yoga (Path of Knowledge)", "Bhakti Yoga (Path of Devotion)", "Immortality of the Soul (Atman)"],
    relatedScriptures: ["mahabharata", "yoga-sutras", "isha"]
  },
  { 
    id: "rigveda", 
    emoji: "📕", 
    titleSanskrit: "ऋग्वेद", 
    titleEnglish: "Rigveda", 
    titleHindi: "ऋग्वेद",
    category: "vedas", 
    categoryName: "Vedas", 
    totalChapters: 10, 
    totalVerses: 10552, 
    description: "The most ancient book of hymns and cosmic prayers dedicated to fire, air, water, and universal consciousness.", 
    languages: ["SA", "HI", "EN"], 
    slug: "rigveda",
    difficulty: "Advanced",
    readingTime: "50 Hours",
    importanceScore: 10,
    whyReadThis: "The root source of all Dharmic cosmic vision, containing the oldest prayers and philosophical questions of humanity.",
    primaryTeachings: ["Cosmic Order (Rta)", "Unity of Truth (Ekam Sat)", "Devotion to Nature Elements", "Origin of the Universe (Nasadiya Sukta)"],
    relatedScriptures: ["yajurveda", "samaveda", "atharvaveda"]
  },
  { 
    id: "yajurveda", 
    emoji: "📗", 
    titleSanskrit: "यजुर्वेद", 
    titleEnglish: "Yajurveda", 
    titleHindi: "यजुर्वेद", 
    category: "vedas", 
    categoryName: "Vedas", 
    totalChapters: 40, 
    totalVerses: 1875, 
    description: "A compilation of ritual prose and formulas for fire sacrifices (Yajnas) and cosmic alignment.", 
    languages: ["SA", "HI", "EN"], 
    slug: "yajurveda",
    difficulty: "Advanced",
    readingTime: "15 Hours",
    importanceScore: 9,
    whyReadThis: "Essential guidelines for actions and sacrifice, framing ritualistic actions into internal spiritual processes.",
    primaryTeachings: ["Action with Awareness", "Vedic Fire Sacrifices", "Cosmic Alignment", "Mantra Vibrations"],
    relatedScriptures: ["rigveda", "samaveda", "atharvaveda"]
  },
  { 
    id: "samaveda", 
    emoji: "📘", 
    titleSanskrit: "सामवेद", 
    titleEnglish: "Samaveda", 
    titleHindi: "सामवेद", 
    category: "vedas", 
    categoryName: "Vedas", 
    totalChapters: 2, 
    totalVerses: 1875, 
    description: "Sanskrit chants and hymns set to musical notations, representing the root of Indian classical music.", 
    languages: ["SA", "HI", "EN"], 
    slug: "samaveda",
    difficulty: "Intermediate",
    readingTime: "12 Hours",
    importanceScore: 9,
    whyReadThis: "The root of sonic spirituality and music, teaching how melody and vibration can elevate consciousness to cosmic truth.",
    primaryTeachings: ["Nada Brahma (Sound as Divine)", "Musical Mantra Chanting", "Devotional Ecstasy", "Cosmic Resonance"],
    relatedScriptures: ["rigveda", "yajurveda", "atharvaveda"]
  },
  { 
    id: "atharvaveda", 
    emoji: "📙", 
    titleSanskrit: "अथर्ववेद", 
    titleEnglish: "Atharvaveda", 
    titleHindi: "अथर्ववेद", 
    category: "vedas", 
    categoryName: "Vedas", 
    totalChapters: 20, 
    totalVerses: 5977, 
    description: "Daily life wisdom, medicine, healing formulas, cosmology, and social duties for domestic harmony.", 
    languages: ["SA", "HI", "EN"], 
    slug: "atharvaveda",
    difficulty: "Intermediate",
    readingTime: "22 Hours",
    importanceScore: 9,
    whyReadThis: "Practical spiritual guidelines for daily life, including medicine, marriage, trade, and social harmony.",
    primaryTeachings: ["Ayurvedic Healing Roots", "Social Harmony", "Domestic Rituals", "Cosmological Protection"],
    relatedScriptures: ["rigveda", "yajurveda", "samaveda"]
  },
  { 
    id: "isha", 
    emoji: "🌿", 
    titleSanskrit: "ईशोपनिषद्", 
    titleEnglish: "Isha Upanishad", 
    titleHindi: "ईशोपनिषद", 
    category: "upanishads", 
    categoryName: "Upanishads", 
    totalChapters: 1, 
    totalVerses: 18, 
    description: "The nature of the omnipresent Divine in all creation, emphasizing action with detachment.", 
    languages: ["SA", "HI", "EN"], 
    slug: "isha",
    difficulty: "Beginner",
    readingTime: "1 Hour",
    importanceScore: 10,
    whyReadThis: "Declares the omnipresence of the Divine within every particle of the universe, reconciling spiritual life with active worldly duties.",
    primaryTeachings: ["Omnipresence of Brahman", "Action with Detachment (Nishkama Karma)", "Synthesis of Knowledge and Action", "Unity of Self and Universe"],
    relatedScriptures: ["katha", "kena", "gita"]
  },
  { 
    id: "kena", 
    emoji: "🌿", 
    titleSanskrit: "केनोपनिषद्", 
    titleEnglish: "Kena Upanishad", 
    titleHindi: "केनोपनिषद", 
    category: "upanishads", 
    categoryName: "Upanishads", 
    totalChapters: 4, 
    totalVerses: 35, 
    description: "An inquiry into the ultimate power behind sensory perceptions, thoughts, and breath.", 
    languages: ["SA", "HI", "EN"], 
    slug: "kena",
    difficulty: "Beginner",
    readingTime: "1 Hour",
    importanceScore: 10,
    whyReadThis: "Investigates the unseen catalyst behind our sensory functions, revealing that the mind, eyes, and breath operate by the power of Brahman.",
    primaryTeachings: ["Brahman as the Ultimate Cause", "Inadequacy of Intellect Alone", "Flash of Divine Revelation (Pratibodha)", "Senses as Instruments of Soul"],
    relatedScriptures: ["isha", "katha", "mundaka"]
  },
  { 
    id: "katha", 
    emoji: "🌿", 
    titleSanskrit: "कठोपनिषद्", 
    titleEnglish: "Katha Upanishad", 
    titleHindi: "कठोपनिषद", 
    category: "upanishads", 
    categoryName: "Upanishads", 
    totalChapters: 2, 
    totalVerses: 120, 
    description: "Nachiketa's dialogue with Yama (Lord of Death) regarding the immortality of the Atman.", 
    languages: ["SA", "HI", "EN"], 
    slug: "katha",
    difficulty: "Intermediate",
    readingTime: "2 Hours",
    importanceScore: 10,
    whyReadThis: "The legendary dialogue on what happens after death, providing a map of self-realization using the famous chariot metaphor.",
    primaryTeachings: ["Chariot Metaphor of Self", "Select the Good (Shreyas) over the Pleasant (Preyas)", "Immortality of the Soul (Atman)", "Yoga as Stillness of Senses"],
    relatedScriptures: ["gita", "isha", "mundaka"]
  },
  { 
    id: "prashna", 
    emoji: "🌿", 
    titleSanskrit: "प्रश्नोपनिषद्", 
    titleEnglish: "Prashna Upanishad", 
    titleHindi: "प्रश्नोपनिषद", 
    category: "upanishads", 
    categoryName: "Upanishads", 
    totalChapters: 6, 
    totalVerses: 67, 
    description: "Six philosophical questions answered by Sage Pippalada about creation and vital energy.", 
    languages: ["SA", "HI", "EN"], 
    slug: "prashna",
    difficulty: "Intermediate",
    readingTime: "2 Hours",
    importanceScore: 9,
    whyReadThis: "Offers answers to six fundamental questions about life, prana (life-force), and the source of consciousness.",
    primaryTeachings: ["Prana as Life Force", "Six Cosmic Questions", "Creation of life through Rayi and Prana", "The Sixteen Parts of Man"],
    relatedScriptures: ["kena", "mundaka", "isha"]
  },
  { 
    id: "mundaka", 
    emoji: "🌿", 
    titleSanskrit: "मुण्डकोपनिषद्", 
    titleEnglish: "Mundaka Upanishad", 
    titleHindi: "मुण्डकोपनिषद", 
    category: "upanishads", 
    categoryName: "Upanishads", 
    totalChapters: 3, 
    totalVerses: 64, 
    description: "The division between higher self-knowledge and lower worldly knowledge. Features the two birds metaphor.", 
    languages: ["SA", "HI", "EN"], 
    slug: "mundaka",
    difficulty: "Intermediate",
    readingTime: "2 Hours",
    importanceScore: 10,
    whyReadThis: "Distinguishes between higher spiritual knowledge and lower intellectual knowledge, using the metaphor of two birds on a single tree.",
    primaryTeachings: ["Higher (Para) vs Lower (Apara) Vidya", "Metaphor of the Two Birds", "Truth Alone Triumphs (Satyameva Jayate)", "Brahman as the Bow and Atman as the Arrow"],
    relatedScriptures: ["mandukya", "katha", "gita"]
  },
  { 
    id: "mandukya", 
    emoji: "🌿", 
    titleSanskrit: "माण्डूक्योपनिषद्", 
    titleEnglish: "Mandukya Upanishad", 
    titleHindi: "माण्डूक्योपनिषद", 
    category: "upanishads", 
    categoryName: "Upanishads", 
    totalChapters: 1, 
    totalVerses: 12, 
    description: "An analysis of the four states of consciousness via the symbol OM.", 
    languages: ["SA", "HI", "EN"], 
    slug: "mandukya",
    difficulty: "Advanced",
    readingTime: "1 Hour",
    importanceScore: 10,
    whyReadThis: "The shortest and most profound Upanishad, mapping out the four states of consciousness (Waking, Dreaming, Deep Sleep, and Turiya) through OM.",
    primaryTeachings: ["Four States of Consciousness", "Turiya (The Fourth State)", "OM as the sound representation of reality", "Non-dualism (Ajativada)"],
    relatedScriptures: ["mundaka", "brihadaranyaka", "gita"]
  },
  { 
    id: "aitareya", 
    emoji: "🌿", 
    titleSanskrit: "ऐतरेयोपनिषद्", 
    titleEnglish: "Aitareya Upanishad", 
    titleHindi: "ऐतरेयोपनिषद", 
    category: "upanishads", 
    categoryName: "Upanishads", 
    totalChapters: 3, 
    totalVerses: 33, 
    description: "Traces the creation of the universe and cosmic energies, declaring consciousness as Brahman.", 
    languages: ["SA", "HI", "EN"], 
    slug: "aitareya",
    difficulty: "Advanced",
    readingTime: "2 Hours",
    importanceScore: 9,
    whyReadThis: "Contains the great declaration 'Prajnanam Brahma' (Consciousness is Brahman) and describes the spiritual birth of the soul.",
    primaryTeachings: ["Consciousness as Brahman", "Three Births of the Soul", "Creation of Cosmic Purusha", "The Senses and Deities"],
    relatedScriptures: ["taittiriya", "chandogya", "brihadaranyaka"]
  },
  { 
    id: "taittiriya", 
    emoji: "🌿", 
    titleSanskrit: "तैत्तिरीयोपनिषद्", 
    titleEnglish: "Taittiriya Upanishad", 
    titleHindi: "तैत्तिरीयोपनिषद", 
    category: "upanishads", 
    categoryName: "Upanishads", 
    totalChapters: 3, 
    totalVerses: 31, 
    description: "Defines the five sheaths of human personality (Koshas) and ethical guidelines for students.", 
    languages: ["SA", "HI", "EN"], 
    slug: "taittiriya",
    difficulty: "Intermediate",
    readingTime: "3 Hours",
    importanceScore: 10,
    whyReadThis: "Explores the five layers (sheaths) of human existence (Pancha Kosha) and offers instructions for righteous living.",
    primaryTeachings: ["Five Sheaths (Pancha Koshas)", "Student's Oath of Truth and Duty", "Brahman as Truth, Knowledge, and Infinity", "Gradation of Cosmic Joy"],
    relatedScriptures: ["aitareya", "chandogya", "gita"]
  },
  { 
    id: "chandogya", 
    emoji: "🌿", 
    titleSanskrit: "छान्दोग्योपनिषद्", 
    titleEnglish: "Chandogya Upanishad", 
    titleHindi: "छान्दोग्योपनिषद", 
    category: "upanishads", 
    categoryName: "Upanishads", 
    totalChapters: 8, 
    totalVerses: 628, 
    description: "Famous Upanishadic dialogue declaring 'Tat Tvam Asi' (That Thou Art).", 
    languages: ["SA", "HI", "EN"], 
    slug: "chandogya",
    difficulty: "Advanced",
    readingTime: "10 Hours",
    importanceScore: 10,
    whyReadThis: "Famous for the phrase 'Tat Tvam Asi' (That Thou Art) and the description of the mystical chants and path of the soul.",
    primaryTeachings: ["Tat Tvam Asi (That Thou Art)", "Meditation on OM (Udgitha)", "The Story of Satyakama Jabala", "Satyaloka and Reincarnation Paths"],
    relatedScriptures: ["brihadaranyaka", "isha", "gita"]
  },
  { 
    id: "brihadaranyaka", 
    emoji: "🌿", 
    titleSanskrit: "बृहदारण्यकोपनिषद्", 
    titleEnglish: "Brihadaranyaka Upanishad", 
    titleHindi: "बृहदारण्यक उपनिषद",
    category: "upanishads", 
    categoryName: "Upanishads", 
    totalChapters: 6, 
    totalVerses: 435, 
    description: "The largest Upanishad, exploring direct non-dual realization with Sage Yajnavalkya.", 
    languages: ["SA", "HI", "EN"], 
    slug: "brihadaranyaka",
    difficulty: "Advanced",
    readingTime: "12 Hours",
    importanceScore: 10,
    whyReadThis: "The largest Upanishad, exploring direct non-dual realization, the identity of Atman and Brahman, and deep mystical dialogues.",
    primaryTeachings: ["Neti Neti (Not this, Not that)", "Atman is Brahman", "Lead me from darkness to light (Tamaso ma jyotirgamaya)", "Unity of Consciousness"],
    relatedScriptures: ["chandogya", "isha", "gita"]
  },
  { 
    id: "shvetashvatara", 
    emoji: "🌿", 
    titleSanskrit: "श्वेताश्वतरोपनिषद्", 
    titleEnglish: "Shvetashvatara Upanishad", 
    titleHindi: "श्वेताश्वतरोपनिषद", 
    category: "upanishads", 
    categoryName: "Upanishads", 
    totalChapters: 6, 
    totalVerses: 113, 
    description: "Focuses on personal devotion (Bhakti) to Rudra-Shiva as the supreme cause of the cosmos.", 
    languages: ["SA", "HI", "EN"], 
    slug: "shvetashvatara",
    difficulty: "Intermediate",
    readingTime: "3 Hours",
    importanceScore: 9,
    whyReadThis: "Bridges non-dualism with personal devotion (Bhakti) to Rudra-Shiva as the supreme cause of the universe.",
    primaryTeachings: ["Bhakti to Rudra-Shiva", "Brahman as the Lord of Maya", "Spiritual Meditation (Dhyana)", "Yoga Practice and Mind Control"],
    relatedScriptures: ["katha", "isha", "shiva-purana"]
  },
  { id: "kaushitaki", emoji: "🌿", titleSanskrit: "कौषीतक्युपनिषद्", titleEnglish: "Kaushitaki Upanishad", titleHindi: "कौषीतक्युपनिषद", category: "upanishads", categoryName: "Upanishads", totalChapters: 4, totalVerses: 78, description: "Inquiries into the path of the soul after death, vital energy, and ultimate reality.", languages: ["SA", "HI", "EN"], slug: "kaushitaki" },
  { id: "maitri", emoji: "🌿", titleSanskrit: "मैत्रायणीयोपनिषद्", titleEnglish: "Maitri Upanishad", titleHindi: "मैत्रायणीयोपनिषद", category: "upanishads", categoryName: "Upanishads", totalChapters: 7, totalVerses: 117, description: "Explores the nature of the soul, meditation techniques, and freedom from cosmic illusion.", languages: ["SA", "HI", "EN"], slug: "maitri" },
  { 
    id: "brahma-p", 
    emoji: "🔱", 
    titleSanskrit: "ब्रह्म पुराण", 
    titleEnglish: "Brahma Purana", 
    titleHindi: "ब्रह्म पुराण", 
    category: "puranas", 
    categoryName: "Puranas", 
    totalChapters: 245, 
    totalVerses: 10000, 
    description: "Known as Adi Purana, details the legends of creation, solar dynasty, and sacred spots.", 
    languages: ["SA", "HI", "EN"], 
    slug: "brahma-purana",
    difficulty: "Intermediate",
    readingTime: "20 Hours",
    importanceScore: 8,
    whyReadThis: "Known as the Adi Purana, it provides the foundation of Puranic cosmology, geography, and pilgrimages.",
    primaryTeachings: ["Cosmology & Creation", "Solar and Lunar Dynasties", "Sacred Geography (Teerthas)", "Glories of Lord Jagannatha"],
    relatedScriptures: ["vishnu-purana", "padma-purana"]
  },
  { id: "padma-p", emoji: "🔱", titleSanskrit: "पद्म पुराण", titleEnglish: "Padma Purana", titleHindi: "पद्म पुराण", category: "puranas", categoryName: "Puranas", totalChapters: 654, totalVerses: 55000, description: "Detailed treatises on cosmological space, geography of earth, and devotion to Lord Vishnu.", languages: ["SA", "HI", "EN"], slug: "padma-purana" },
  { 
    id: "vishnu-p", 
    emoji: "🔱", 
    titleSanskrit: "विष्णु पुराण", 
    titleEnglish: "Vishnu Purana", 
    titleHindi: "विष्णु पुराण", 
    category: "puranas", 
    categoryName: "Puranas", 
    totalChapters: 6, 
    totalVerses: 23000, 
    description: "Details the creation of the material universe, avatars, and description of the four Yugas.", 
    languages: ["SA", "HI", "EN"], 
    slug: "vishnu-purana",
    difficulty: "Intermediate",
    readingTime: "15 Hours",
    importanceScore: 9,
    whyReadThis: "A comprehensive guide to cosmology, the avatars of Vishnu (particularly Krishna), and the cyclical nature of time (Yugas).",
    primaryTeachings: ["Avatar descent for cosmic balance", "Four Yugas (Satya, Treta, Dvapara, Kali)", "Srishti (Creation) and Pralaya (Dissolution)", "Devotion (Bhakti) as a path of liberation"],
    relatedScriptures: ["bhagavata-purana", "padma-purana"]
  },
  { 
    id: "shiva-p", 
    emoji: "🔱", 
    titleSanskrit: "शिव पुराण", 
    titleEnglish: "Shiva Purana", 
    titleHindi: "शिव पुराण",
    category: "puranas", 
    categoryName: "Puranas", 
    totalChapters: 12, 
    totalVerses: 24000, 
    description: "Dedicated to the glories of Lord Shiva, cosmic dissolution, worship methods, and philosophies.", 
    languages: ["SA", "HI", "EN"], 
    slug: "shiva-purana",
    difficulty: "Intermediate",
    readingTime: "18 Hours",
    importanceScore: 8,
    whyReadThis: "A guide to the cosmic mysteries of dissolution, dynamic energy, and absolute stillness through the legends of Lord Shiva.",
    primaryTeachings: ["Formless Divinity (Linga)", "Power of Meditation and Tapas", "Devotion to Shiva-Shakti", "Cosmic Dissolution (Pralaya)"],
    relatedScriptures: ["linga-purana", "skanda-purana"]
  },
  { 
    id: "bhagavata-p", 
    emoji: "🔱", 
    titleSanskrit: "श्रीमद्भागवत पुराण", 
    titleEnglish: "Bhagavata Purana", 
    titleHindi: "श्रीमद्भागवत पुराण", 
    category: "puranas", 
    categoryName: "Puranas", 
    totalChapters: 12, 
    totalVerses: 18000, 
    description: "Focuses on Lord Krishna's divine sports, avatars, and the ecstatic path of devotion (Bhakti).", 
    languages: ["SA", "HI", "EN"], 
    slug: "bhagavata-purana",
    difficulty: "Intermediate",
    readingTime: "25 Hours",
    importanceScore: 10,
    whyReadThis: "The crown jewel of Vaishnava devotion, depicting the life and sports of Lord Krishna and detailing the nine forms of Bhakti.",
    primaryTeachings: ["Ecstatic Devotion (Bhakti)", "Life and Leelas of Lord Krishna", "Surrender (Sharanagati)", "Dharma in the Kali Yuga"],
    relatedScriptures: ["gita", "vishnu-purana", "ramayana"]
  },
  { id: "narada-p", emoji: "🔱", titleSanskrit: "नारद पुराण", titleEnglish: "Narada Purana", titleHindi: "नारद पुराण", category: "puranas", categoryName: "Puranas", totalChapters: 2, totalVerses: 25000, description: "Discourses by Sage Narada on devotional duties, temple worship, and the greatness of scriptures.", languages: ["SA", "HI", "EN"], slug: "narada-purana" },
  { id: "markandeya-p", emoji: "🔱", titleSanskrit: "मार्कण्डेय पुराण", titleEnglish: "Markandeya Purana", titleHindi: "मार्कण्डेय पुराण", category: "puranas", categoryName: "Puranas", totalChapters: 137, totalVerses: 9000, description: "Includes the Devi Mahatmya (Durga Saptashati), glorifying the Supreme Mother.", languages: ["SA", "HI", "EN"], slug: "markandeya-purana" },
  { id: "agni-p", emoji: "🔱", titleSanskrit: "अग्नि पुराण", titleEnglish: "Agni Purana", titleHindi: "अग्नि पुराण", category: "puranas", categoryName: "Puranas", totalChapters: 383, totalVerses: 15400, description: "An encyclopedic scripture describing medicine, weapon arts, astrology, metrics, and statecraft.", languages: ["SA", "HI", "EN"], slug: "agni-purana" },
  { id: "bhavishya-p", emoji: "🔱", titleSanskrit: "भविष्य पुराण", titleEnglish: "Bhavishya Purana", titleHindi: "भविष्य पुराण", category: "puranas", categoryName: "Puranas", totalChapters: 5, totalVerses: 14500, description: "Includes prophecies and descriptions of the future dynasties, kingdoms, and modern age.", languages: ["SA", "HI", "EN"], slug: "bhavishya-purana" },
  { id: "brahmavaivarta-p", emoji: "🔱", titleSanskrit: "ब्रह्मवैवर्त पुराण", titleEnglish: "Brahma Vaivarta Purana", titleHindi: "ब्रह्मवैवर्त पुराण", category: "puranas", categoryName: "Puranas", totalChapters: 4, totalVerses: 18000, description: "Glorifies the eternal playground (Goloka) and the divine relationships of Radha and Krishna.", languages: ["SA", "HI", "EN"], slug: "brahmavaivarta-purana" },
  { id: "linga-p", emoji: "🔱", titleSanskrit: "लिङ्ग पुराण", titleEnglish: "Linga Purana", titleHindi: "लिङ्ग पुराण", category: "puranas", categoryName: "Puranas", totalChapters: 2, totalVerses: 11000, description: "Expositions on the meaning of Linga (symbol of cosmic formlessness) and Shiva's forms.", languages: ["SA", "HI", "EN"], slug: "linga-purana" },
  { id: "varaha-p", emoji: "🔱", titleSanskrit: "वराह पुराण", titleEnglish: "Varaha Purana", titleHindi: "वराह पुराण", category: "puranas", categoryName: "Puranas", totalChapters: 218, totalVerses: 10000, description: "Dedicated to the Varaha (boar) avatar of Vishnu, containing code of prayers and holy places.", languages: ["SA", "HI", "EN"], slug: "varaha-purana" },
  { 
    id: "skanda-p", 
    emoji: "🔱", 
    titleSanskrit: "स्कन्द पुराण", 
    titleEnglish: "Skanda Purana", 
    titleHindi: "स्कन्द पुराण", 
    category: "puranas", 
    categoryName: "Puranas", 
    totalChapters: 7, 
    totalVerses: 81100, 
    description: "The largest Purana, filled with legends of Kartikeya, Shiva, pilgrimage maps, and legends.", 
    languages: ["SA", "HI", "EN"], 
    slug: "skanda-purana",
    difficulty: "Advanced",
    readingTime: "60 Hours",
    importanceScore: 8,
    whyReadThis: "The largest Purana, detailing the adventures of Kartikeya (Skanda), the geography of pilgrimage sites (Kashi, Kedarnath), and devotional rituals.",
    primaryTeachings: ["Asceticism and Devotion", "Pilgrimage Geography of India", "Legends of Kartikeya and Shiva", "Virtue of Charity and Satya"],
    relatedScriptures: ["shiva-purana", "linga-purana"]
  },
  { id: "vamana-p", emoji: "🔱", titleSanskrit: "वामन पुराण", titleEnglish: "Vamana Purana", titleHindi: "वामन पुराण", category: "puranas", categoryName: "Puranas", totalChapters: 95, totalVerses: 10000, description: "Focuses on the dwarf incarnation of Lord Vishnu and legends of King Bali.", languages: ["SA", "HI", "EN"], slug: "vamana-purana" },
  { id: "kurma-p", emoji: "🔱", titleSanskrit: "कूर्म पुराण", titleEnglish: "Kurma Purana", titleHindi: "कूर्म पुराण", category: "puranas", categoryName: "Puranas", totalChapters: 4, totalVerses: 17000, description: "Details the tortoise avatar of Vishnu, describing yogic secrets.", languages: ["SA", "HI", "EN"], slug: "kurma-purana" },
  { id: "matsya-p", emoji: "🔱", titleSanskrit: "मत्स्य पुराण", titleEnglish: "Matsya Purana", titleHindi: "मत्स्य पुराण", category: "puranas", categoryName: "Puranas", totalChapters: 290, totalVerses: 14000, description: "Told by the fish incarnation of Vishnu during the great deluge, detailing temple structures.", languages: ["SA", "HI", "EN"], slug: "matsya-purana" },
  { 
    id: "garuda-p", 
    emoji: "🔱", 
    titleSanskrit: "गरुड़ पुराण", 
    titleEnglish: "Garuda Purana", 
    titleHindi: "गरुड़ पुराण", 
    category: "puranas", 
    categoryName: "Puranas", 
    totalChapters: 3, 
    totalVerses: 19000, 
    description: "Detailed descriptions of the afterlife transit, karma consequences, death, and liberation.", 
    languages: ["SA", "HI", "EN"], 
    slug: "garuda-purana",
    difficulty: "Intermediate",
    readingTime: "12 Hours",
    importanceScore: 9,
    whyReadThis: "Explores the mystery of death, the afterlife journey of the soul, laws of karma, and the ultimate path to liberation.",
    primaryTeachings: ["Karma and Afterlife Journey", "Rites for the Departed", "Dharma and Moral Virtues", "Liberation (Moksha) through Jnana"],
    relatedScriptures: ["vishnu-purana", "bhagavata-purana"]
  },
  { id: "brahmanda-p", emoji: "🔱", titleSanskrit: "ब्रह्माण्ड पुराण", titleEnglish: "Brahmanda Purana", titleHindi: "ब्रह्माण्ड पुराण", category: "puranas", categoryName: "Puranas", totalChapters: 4, totalVerses: 12000, description: "Includes the Lalita Sahasranama and details the geometry of the cosmic egg (Brahmanda).", languages: ["SA", "HI", "EN"], slug: "brahmanda-purana" },
  { 
    id: "ramayana", 
    emoji: "🏹", 
    titleSanskrit: "वाल्मीकि रामायण", 
    titleEnglish: "Valmiki Ramayana", 
    titleHindi: "रामायण",
    category: "epics", 
    categoryName: "Epics", 
    totalChapters: 7, 
    totalVerses: 24000, 
    description: "The historical epic charting the life, principles, and battles of Lord Rama, the ideal avatar.", 
    languages: ["SA", "HI", "EN"], 
    slug: "ramayana",
    difficulty: "Beginner",
    readingTime: "30 Hours",
    importanceScore: 9,
    whyReadThis: "The epic of the ideal human and ideal king, mapping out family duties, devotion, and structural righteousness.",
    primaryTeachings: ["Maryada (Righteous Conduct)", "Unconditional Devotion (Hanuman's path)", "Fulfillment of Vows", "Victory of Good over Evil"],
    relatedScriptures: ["mahabharata", "ramcharitmanas"]
  },
  { 
    id: "mahabharata", 
    emoji: "⚔️", 
    titleSanskrit: "महाभारत", 
    titleEnglish: "Mahabharata", 
    titleHindi: "महाभारत",
    category: "epics", 
    categoryName: "Epics", 
    totalChapters: 18, 
    totalVerses: 100000, 
    description: "The longest epic poem ever composed, tracking the complex web of dharma, duty, and war.", 
    languages: ["SA", "HI", "EN"], 
    slug: "mahabharata",
    difficulty: "Intermediate",
    readingTime: "120 Hours",
    importanceScore: 10,
    whyReadThis: "The world's longest epic, exploring every possible human dilemma, relationships, politics, and the ultimate triumph of Dharma.",
    primaryTeachings: ["Triumph of Dharma", "Complexity of Moral Choices", "Devotion and Sacrifice", "Duty over Personal Desires"],
    relatedScriptures: ["gita", "ramayana"]
  },
  { 
    id: "ramcharitmanas", 
    emoji: "🛕", 
    titleSanskrit: "रामचरितमानस", 
    titleEnglish: "Ramcharitmanas", 
    titleHindi: "रामचरितमानस", 
    category: "epics", 
    categoryName: "Epics", 
    totalChapters: 7, 
    totalVerses: 12800, 
    description: "The devotional retelling of Rama's story in Awadhi dialect by Saint-poet Tulsidas.", 
    languages: ["SA", "HI", "EN"], 
    slug: "ramcharitmanas",
    difficulty: "Beginner",
    readingTime: "18 Hours",
    importanceScore: 10,
    whyReadThis: "Goswami Tulsidas's epic devotional masterpiece that brought the story of Rama to the masses in beautiful Awadhi verses.",
    primaryTeachings: ["Unconditional Bhakti", "Ideal Relationships and Conduct", "Selfless Service and Surrender", "The Power of Rama's Name"],
    relatedScriptures: ["ramayana", "gita"]
  },
  { 
    id: "yoga-sutras", 
    emoji: "🧘", 
    titleSanskrit: "पातञ्जलयोगसूत्राणि", 
    titleEnglish: "Yoga Sutras", 
    titleHindi: "योग सूत्र",
    category: "philosophy", 
    categoryName: "Philosophy", 
    totalChapters: 4, 
    totalVerses: 196, 
    description: "Sage Patanjali's aphorisms on the 8-limbed path of yoga, mind control, and deep samadhi.", 
    languages: ["SA", "HI", "EN"], 
    slug: "yoga-sutras",
    difficulty: "Intermediate",
    readingTime: "6 Hours",
    importanceScore: 10,
    whyReadThis: "The scientific handbook of mind control and consciousness expansion, outlining the exact steps to reach Samadhi.",
    primaryTeachings: ["Eight Limbs of Yoga (Ashtanga)", "Stillness of Mind (Chitta Vritti Nirodha)", "Self-Discipline (Yama & Niyama)", "Detached Awareness (Vairagya)"],
    relatedScriptures: ["gita", "brahma-sutras"]
  },
  { 
    id: "brahma-sutras", 
    emoji: "🧘", 
    titleSanskrit: "ब्रह्मसूत्राणि", 
    titleEnglish: "Brahma Sutras", 
    titleHindi: "ब्रह्मसूत्र", 
    category: "philosophy", 
    categoryName: "Philosophy", 
    totalChapters: 4, 
    totalVerses: 555, 
    description: "Badarayana's foundational text systematizing the teachings of the Upanishads.", 
    languages: ["SA", "HI", "EN"], 
    slug: "brahma-sutras",
    difficulty: "Advanced",
    readingTime: "15 Hours",
    importanceScore: 10,
    whyReadThis: "The foundational text of Vedanta philosophy, systematically reconciling all apparent contradictions in Upanishadic teachings.",
    primaryTeachings: ["Systematized Upanishadic Truth", "Nature of Brahman and Atman", "Refutation of Dualism and Materialism", "Path to Moksha"],
    relatedScriptures: ["gita", "yoga-sutras"]
  },
  { id: "nyaya-sutras", emoji: "🧘", titleSanskrit: "न्यायसूत्राणि", titleEnglish: "Nyaya Sutras", titleHindi: "न्यायसूत्र", category: "philosophy", categoryName: "Philosophy", totalChapters: 5, totalVerses: 528, description: "Sage Gautama's work on logic, methods of reasoning, and philosophical debate structures.", languages: ["SA", "HI", "EN"], slug: "nyaya-sutras" },
  { id: "samkhya-karika", emoji: "🧘", titleSanskrit: "सांख्यकारिका", titleEnglish: "Samkhya Karika", titleHindi: "सांख्यकारिका", category: "philosophy", categoryName: "Philosophy", totalChapters: 1, totalVerses: 72, description: "Ishvara Krishna's dualistic philosophy dividing reality into Purusha (spirit) and Prakriti (matter).", languages: ["SA", "HI", "EN"], slug: "samkhya-karika" },
  { id: "vaisheshika-sutras", emoji: "🧘", titleSanskrit: "वैशेषिकसूत्राणि", titleEnglish: "Vaisheshika Sutras", titleHindi: "वैशेषिकसूत्र", category: "philosophy", categoryName: "Philosophy", totalChapters: 10, totalVerses: 370, description: "Sage Kanada's natural philosophy outlining the atomic structure of the universe (Anu).", languages: ["SA", "HI", "EN"], slug: "vaisheshika-sutras" },
  { id: "mimamsa-sutras", emoji: "🧘", titleSanskrit: "मीमांसासूत्राणि", titleEnglish: "Mimamsa Sutras", titleHindi: "मीमांसासूत्र", category: "philosophy", categoryName: "Philosophy", totalChapters: 12, totalVerses: 2700, description: "Sage Jaimini's framework for interpreting Vedic actions and sacrificial duties.", languages: ["SA", "HI", "EN"], slug: "mimamsa-sutras" },
  { id: "manusmriti", emoji: "📜", titleSanskrit: "मनुस्मृति", titleEnglish: "Manusmriti", titleHindi: "मनुस्मृति", category: "others", categoryName: "Others", totalChapters: 12, totalVerses: 2684, description: "An ancient legal code and framework mapping out traditional duties of society.", languages: ["SA", "HI", "EN"], slug: "manusmriti" },
  { 
    id: "arthashastra", 
    emoji: "📜", 
    titleSanskrit: "अर्थशास्त्रम्", 
    titleEnglish: "Arthashastra", 
    titleHindi: "अर्थशास्त्र",
    category: "others", 
    categoryName: "Others", 
    totalChapters: 15, 
    totalVerses: 6000, 
    description: "Chanakya's masterpiece on statecraft, political economy, military strategy, and state spy networks.", 
    languages: ["SA", "HI", "EN"], 
    slug: "arthashastra",
    difficulty: "Intermediate",
    readingTime: "24 Hours",
    importanceScore: 8,
    whyReadThis: "Chanakya's classic on governance, statecraft, economy, and foreign policy, revealing the pragmatic requirements of a stable empire.",
    primaryTeachings: ["Saptanga Theory of State", "State Economy & Treasury Importance", "Foreign Diplomacy (Mandala Theory)", "Pragmatic Governance and Espionage"],
    relatedScriptures: ["manusmriti", "charaka-samhita"]
  },
  { 
    id: "charaka-samhita", 
    emoji: "📜", 
    titleSanskrit: "चरकसंहिता", 
    titleEnglish: "Charaka Samhita", 
    titleHindi: "चरकसंहिता", 
    category: "others", 
    categoryName: "Others", 
    totalChapters: 8, 
    totalVerses: 9200, 
    description: "The core foundational medical scripture of Ayurveda detailing body wellness, pathology, and herbs.", 
    languages: ["SA", "HI", "EN"], 
    slug: "charaka-samhita",
    difficulty: "Intermediate",
    readingTime: "30 Hours",
    importanceScore: 9,
    whyReadThis: "The foundational pillars of Ayurveda, teaching holistic wellness, preventive health, pathology, and natural treatments.",
    primaryTeachings: ["Three Doshas (Vata, Pitta, Kapha)", "Preventive Health & Dinacharya", "Dietetics and Herbal Medicine", "Mind-Body Balance"],
    relatedScriptures: ["atharvaveda", "arthashastra"]
  },
  { 
    id: "natya-shastra", 
    emoji: "📜", 
    titleSanskrit: "नाट्यशास्त्रम्", 
    titleEnglish: "Natya Shastra", 
    titleHindi: "नाट्यशास्त्र", 
    category: "others", 
    categoryName: "Others", 
    totalChapters: 36, 
    totalVerses: 6000, 
    description: "Sage Bharata's encyclopedic guide to performing arts, dance, theatre, music, and emotional theory.", 
    languages: ["SA", "HI", "EN"], 
    slug: "natya-shastra",
    difficulty: "Intermediate",
    readingTime: "25 Hours",
    importanceScore: 9,
    whyReadThis: "The ultimate encyclopedia of Indian performing arts, dance, drama, and the profound aesthetic theory of Rasa (emotions).",
    primaryTeachings: ["Rasa Theory (Eight Core Emotions)", "Performance as a Path of Devotion", "Theatre Architecture and Mudras", "Musical and Poetic Meters"],
    relatedScriptures: ["samaveda", "arthashastra"]
  },
  { id: "kama-sutra", emoji: "📜", titleSanskrit: "कामसूत्रम्", titleEnglish: "Kama Sutra", titleHindi: "कामसूत्र", category: "others", categoryName: "Others", totalChapters: 36, totalVerses: 1250, description: "Vatsyayana's guide to human relationships, social manners, arts, and emotional lifestyle.", languages: ["SA", "HI", "EN"], slug: "kama-sutra" },
  { id: "pancharatra", emoji: "📜", titleSanskrit: "पाञ्चरात्र", titleEnglish: "Pancharatra Agamas", titleHindi: "पाञ्चरात्र आगम", category: "others", categoryName: "Others", totalChapters: 108, totalVerses: 20000, description: "Agamic texts outlining ritual worship systems, temple worship ceremonies, and devotion.", languages: ["SA", "HI", "EN"], slug: "pancharatra-agamas" },
];

const ACTIVE_SLUGS = new Set([
  "gita", "rigveda", "yajurveda", "samaveda", "atharvaveda",
  "isha", "kena", "katha", "prashna", "mundaka", "mandukya", "aitareya", "taittiriya", "chandogya", "brihadaranyaka", "shvetashvatara", "kaushitaki", "maitri",
  "brahma-purana", "padma-purana", "vishnu-purana", "shiva-purana", "bhagavata-purana", "narada-purana", "markandeya-purana", "agni-purana", "bhavishya-purana", "brahmavaivarta-purana", "linga-purana", "varaha-purana", "skanda-purana", "vamana-purana", "kurma-purana", "matsya-purana", "garuda-purana", "brahmanda-purana",
  "ramayana", "mahabharata", "ramcharitmanas",
  "yoga-sutras", "brahma-sutras", "nyaya-sutras", "samkhya-karika", "vaisheshika-sutras", "mimamsa-sutras",
  "manusmriti", "arthashastra", "charaka-samhita", "natya-shastra", "kama-sutra", "pancharatra-agamas"
]);

// --- SVG Artwork Components ---

const HavanKundSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="fire-glow" cx="50%" cy="80%" r="60%">
        <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#8C2D19" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="flame1" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#FF4500"/>
        <stop offset="50%" stopColor="#FFD700"/>
        <stop offset="100%" stopColor="#FFE082" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="flame2" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#FF6B00"/>
        <stop offset="60%" stopColor="#FFB300"/>
        <stop offset="100%" stopColor="#FFF9C4" stopOpacity="0"/>
      </linearGradient>
    </defs>
    {/* Ground glow */}
    <ellipse cx="200" cy="260" rx="140" ry="20" fill="url(#fire-glow)" opacity="0.8"/>
    {/* Stone altar base */}
    <rect x="120" y="220" width="160" height="50" rx="4" fill="#5D4037" stroke="#3E2723" strokeWidth="2"/>
    <rect x="110" y="215" width="180" height="15" rx="3" fill="#4E342E" stroke="#3E2723" strokeWidth="1.5"/>
    {/* Altar decorative lines */}
    <line x1="130" y1="230" x2="270" y2="230" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
    <line x1="135" y1="240" x2="265" y2="240" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
    {/* Sanskrit border on altar */}
    <text x="200" y="248" textAnchor="middle" fontSize="8" fill="#D4AF37" opacity="0.7" fontFamily="serif">ॐ स्वाहा • अग्नये स्वाहा • ॐ</text>
    {/* Kund (pit) opening */}
    <ellipse cx="200" cy="218" rx="75" ry="12" fill="#2C1810"/>
    {/* Main flame core */}
    <path d="M200 218 C185 190 170 160 180 120 C185 100 200 90 200 218Z" fill="url(#flame1)" opacity="0.9"/>
    <path d="M200 218 C215 190 230 160 220 120 C215 100 200 90 200 218Z" fill="url(#flame1)" opacity="0.9"/>
    {/* Secondary flames */}
    <path d="M185 218 C172 195 165 170 175 140 C180 125 190 115 185 218Z" fill="url(#flame2)" opacity="0.8"/>
    <path d="M215 218 C228 195 235 170 225 140 C220 125 210 115 215 218Z" fill="url(#flame2)" opacity="0.8"/>
    {/* Outer wisps */}
    <path d="M175 218 C160 205 158 185 168 165 C172 155 175 218Z" fill="#FF8C00" opacity="0.5"/>
    <path d="M225 218 C240 205 242 185 232 165 C228 155 225 218Z" fill="#FF8C00" opacity="0.5"/>
    {/* Sparks */}
    <circle cx="170" cy="150" r="2" fill="#FFD700" opacity="0.8"/>
    <circle cx="230" cy="135" r="1.5" fill="#FFD700" opacity="0.7"/>
    <circle cx="195" cy="100" r="1" fill="#FFE082" opacity="0.9"/>
    <circle cx="210" cy="110" r="1.5" fill="#FFE082" opacity="0.6"/>
    <circle cx="185" cy="125" r="1" fill="#FFD700" opacity="0.7"/>
    {/* Smoke wisps */}
    <path d="M200 90 Q195 70 205 50 Q210 35 200 20" stroke="#8D8D8D" strokeWidth="1.5" fill="none" opacity="0.3"/>
    <path d="M188 110 Q180 90 190 70 Q195 55 185 40" stroke="#9E9E9E" strokeWidth="1" fill="none" opacity="0.2"/>
    <path d="M212 105 Q222 85 212 65 Q208 50 218 35" stroke="#9E9E9E" strokeWidth="1" fill="none" opacity="0.2"/>
    {/* Stars / cosmic dots */}
    <circle cx="80" cy="40" r="1" fill="#FFE082" opacity="0.6"/>
    <circle cx="320" cy="60" r="1.5" fill="#FFE082" opacity="0.5"/>
    <circle cx="350" cy="30" r="1" fill="#D4AF37" opacity="0.7"/>
    <circle cx="50" cy="80" r="1" fill="#D4AF37" opacity="0.5"/>
  </svg>
);

const BanyanDiyaSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="diya-glow" cx="50%" cy="60%" r="40%">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#196F3D" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="trunk-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4E342E"/>
        <stop offset="50%" stopColor="#6D4C41"/>
        <stop offset="100%" stopColor="#4E342E"/>
      </linearGradient>
    </defs>
    {/* Night sky */}
    <rect width="400" height="300" fill="#0D1B2A" opacity="0.6"/>
    {/* Stars */}
    {[[30,20],[80,45],[350,25],[370,60],[320,15],[60,70],[340,80],[90,30],[310,40]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r={i%2===0?1:1.5} fill="#E8D5A3" opacity={0.4+i*0.05}/>
    ))}
    {/* Diya glow aura */}
    <ellipse cx="200" cy="210" rx="100" ry="60" fill="url(#diya-glow)"/>
    {/* Tree trunk */}
    <rect x="185" y="130" width="30" height="140" rx="6" fill="url(#trunk-grad)"/>
    {/* Aerial roots */}
    <line x1="160" y1="160" x2="155" y2="260" stroke="#5D4037" strokeWidth="3" opacity="0.7"/>
    <line x1="240" y1="155" x2="248" y2="260" stroke="#5D4037" strokeWidth="3" opacity="0.7"/>
    <line x1="135" y1="175" x2="130" y2="265" stroke="#5D4037" strokeWidth="2" opacity="0.5"/>
    <line x1="268" y1="170" x2="274" y2="265" stroke="#5D4037" strokeWidth="2" opacity="0.5"/>
    {/* Canopy - large banyan leaves */}
    <ellipse cx="200" cy="100" rx="120" ry="70" fill="#145A32" opacity="0.9"/>
    <ellipse cx="150" cy="110" rx="70" ry="45" fill="#196F3D" opacity="0.8"/>
    <ellipse cx="250" cy="108" rx="70" ry="45" fill="#196F3D" opacity="0.8"/>
    <ellipse cx="200" cy="80" rx="80" ry="40" fill="#1D8348"/>
    <ellipse cx="170" cy="90" rx="50" ry="30" fill="#239B56" opacity="0.7"/>
    <ellipse cx="230" cy="88" rx="50" ry="30" fill="#239B56" opacity="0.7"/>
    {/* Hanging leaves detail */}
    <path d="M120 130 Q110 145 115 158" stroke="#145A32" strokeWidth="2" fill="none"/>
    <path d="M280 128 Q292 143 287 156" stroke="#145A32" strokeWidth="2" fill="none"/>
    {/* Diya (clay lamp) */}
    <path d="M185 215 Q185 228 200 230 Q215 228 215 215 L210 210 L190 210 Z" fill="#BF8040" stroke="#8C5A2C" strokeWidth="1"/>
    <path d="M197 210 Q200 200 203 210" fill="none" stroke="#BF8040" strokeWidth="2"/>
    {/* Oil in diya */}
    <ellipse cx="200" cy="211" rx="10" ry="4" fill="#D4A520" opacity="0.6"/>
    {/* Diya flame */}
    <path d="M200 210 C197 200 195 190 200 180 C205 190 203 200 200 210Z" fill="#FFD700"/>
    <path d="M200 205 C198 197 197 192 200 185 C203 192 202 197 200 205Z" fill="#FFEB3B" opacity="0.9"/>
    <circle cx="200" cy="183" r="2" fill="#FFF9C4" opacity="0.8"/>
    {/* Sage silhouette */}
    <ellipse cx="200" cy="262" rx="18" ry="6" fill="#1A0A00" opacity="0.4"/>
    <path d="M190 255 Q192 235 196 230 L200 228 L204 230 Q208 235 210 255 Z" fill="#2C1A00" opacity="0.7"/>
    <circle cx="200" cy="225" r="8" fill="#3E2723" opacity="0.6"/>
  </svg>
);

const ChariotBowSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7B241C"/>
        <stop offset="60%" stopColor="#E65100"/>
        <stop offset="100%" stopColor="#D4A520"/>
      </linearGradient>
      <linearGradient id="wheel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4AF37"/>
        <stop offset="100%" stopColor="#8C6914"/>
      </linearGradient>
    </defs>
    {/* Sunset sky */}
    <rect width="400" height="300" fill="url(#sky-grad)"/>
    {/* Ground / dust */}
    <ellipse cx="200" cy="290" rx="300" ry="40" fill="#5D4037" opacity="0.6"/>
    <rect x="0" y="270" width="400" height="30" fill="#4E342E" opacity="0.5"/>
    {/* Dharma Chakra (chariot wheel) */}
    <circle cx="140" cy="230" r="55" fill="none" stroke="url(#wheel-grad)" strokeWidth="6"/>
    <circle cx="140" cy="230" r="45" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
    <circle cx="140" cy="230" r="12" fill="url(#wheel-grad)" stroke="#8C6914" strokeWidth="2"/>
    {/* Spokes */}
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i) => {
      const rad = deg * Math.PI / 180;
      const x2 = (140 + 43 * Math.cos(rad)).toFixed(4);
      const y2 = (230 + 43 * Math.sin(rad)).toFixed(4);
      return <line key={i} x1={140} y1={230} x2={x2} y2={y2} stroke="#D4AF37" strokeWidth="2.5"/>;
    })}
    {/* Bow */}
    <path d="M300 120 Q360 180 300 240" fill="none" stroke="#8C6914" strokeWidth="5" strokeLinecap="round"/>
    <path d="M302 120 Q356 180 302 240" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
    {/* Bowstring */}
    <line x1="300" y1="122" x2="300" y2="238" stroke="#F5E6A3" strokeWidth="1.5"/>
    {/* Arrow on bow */}
    <line x1="260" y1="175" x2="305" y2="178" stroke="#8C6914" strokeWidth="3"/>
    <polygon points="308,178 300,174 300,182" fill="#D4AF37"/>
    {/* Feathers */}
    <path d="M260 175 Q255 170 252 175 Q255 180 260 175Z" fill="#8C2D19"/>
    <path d="M255 175 Q250 169 247 174 Q250 179 255 175Z" fill="#8C2D19" opacity="0.7"/>
    {/* Om symbol in sky */}
    <text x="50" y="80" fontSize="40" fill="#FFD700" opacity="0.15" fontFamily="serif">ॐ</text>
    {/* Sun setting */}
    <circle cx="200" cy="200" r="35" fill="#FFB300" opacity="0.3"/>
    <circle cx="200" cy="200" r="25" fill="#FF8F00" opacity="0.4"/>
  </svg>
);

const CosmicOceanSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="cosmic-center" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#1565C0" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#0D1B2A" stopOpacity="1"/>
      </radialGradient>
      <linearGradient id="serpent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1A237E"/>
        <stop offset="50%" stopColor="#283593"/>
        <stop offset="100%" stopColor="#1A237E"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#cosmic-center)"/>
    {/* Ocean waves */}
    <path d="M0 200 Q50 185 100 200 Q150 215 200 200 Q250 185 300 200 Q350 215 400 200 L400 300 L0 300Z" fill="#0D47A1" opacity="0.6"/>
    <path d="M0 215 Q60 200 120 215 Q180 230 240 215 Q300 200 360 215 Q380 220 400 215 L400 300 L0 300Z" fill="#0A3A8A" opacity="0.7"/>
    <path d="M0 230 Q80 218 160 230 Q240 242 320 230 Q360 223 400 230 L400 300 L0 300Z" fill="#082D70" opacity="0.8"/>
    {/* Ananta-Shesha serpent coils */}
    <path d="M60 190 Q120 160 180 190 Q240 220 300 190 Q340 170 380 185" fill="none" stroke="url(#serpent-grad)" strokeWidth="14" strokeLinecap="round" opacity="0.9"/>
    <path d="M60 190 Q120 160 180 190 Q240 220 300 190 Q340 170 380 185" fill="none" stroke="#3949AB" strokeWidth="8" strokeLinecap="round"/>
    {/* Serpent scales detail */}
    <path d="M60 190 Q120 160 180 190 Q240 220 300 190 Q340 170 380 185" fill="none" stroke="#5C6BC0" strokeWidth="2" strokeDasharray="10,8" strokeLinecap="round" opacity="0.5"/>
    {/* Serpent head */}
    <ellipse cx="375" cy="183" rx="20" ry="12" fill="#283593" stroke="#3949AB" strokeWidth="1.5"/>
    <circle cx="369" cy="180" r="3" fill="#FFD700" opacity="0.8"/>
    <path d="M390 183 Q398 180 395 186Q398 183 390 186Z" fill="#1A237E"/>
    {/* Serpent hoods (multiple heads) */}
    <path d="M355 172 Q363 155 371 170" fill="#1A237E" stroke="#3949AB" strokeWidth="1"/>
    <path d="M370 168 Q380 150 388 165" fill="#1A237E" stroke="#3949AB" strokeWidth="1"/>
    {/* Divine lotus on water */}
    <ellipse cx="200" cy="195" rx="30" ry="10" fill="#E91E63" opacity="0.3"/>
    {/* Lotus petals */}
    {[0,45,90,135,180,225,270,315].map((deg,i) => {
      const rad = deg * Math.PI / 180;
      const x = (200 + 22 * Math.cos(rad)).toFixed(4);
      const y = (193 + 8 * Math.sin(rad)).toFixed(4);
      return <ellipse key={i} cx={x} cy={y} rx="10" ry="5" fill="#F48FB1" opacity={0.6} transform={`rotate(${deg}, ${x}, ${y})`}/>;
    })}
    <circle cx="200" cy="192" r="8" fill="#FFD700" opacity="0.7"/>
    {/* Stars in cosmic sky */}
    {[[30,30],[80,20],[150,40],[310,25],[360,15],[50,60],[350,55]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r={i%2===0?1.5:1} fill="#E8D5A3" opacity={0.5+i*0.04}/>
    ))}
    {/* Om in the cosmos */}
    <text x="200" y="90" textAnchor="middle" fontSize="35" fill="#FFD700" opacity="0.12" fontFamily="serif">ॐ</text>
    <text x="200" y="90" textAnchor="middle" fontSize="35" fill="#D4AF37" opacity="0.06" fontFamily="serif">ॐ</text>
  </svg>
);

const DarshanGeometrySVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="mind-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#37474F" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#102027" stopOpacity="1"/>
      </radialGradient>
    </defs>
    <rect width="400" height="300" fill="url(#mind-glow)"/>
    {/* Meditator silhouette */}
    <path d="M175 280 Q178 250 182 240 L185 235 L200 230 L215 235 L218 240 Q222 250 225 280Z" fill="#263238" opacity="0.8"/>
    <circle cx="200" cy="222" r="12" fill="#263238" opacity="0.8"/>
    {/* Central mandala / lotus */}
    <circle cx="200" cy="140" r="70" fill="none" stroke="#546E7A" strokeWidth="0.5" opacity="0.4"/>
    <circle cx="200" cy="140" r="55" fill="none" stroke="#607D8B" strokeWidth="0.5" opacity="0.5"/>
    <circle cx="200" cy="140" r="40" fill="none" stroke="#78909C" strokeWidth="0.8" opacity="0.5"/>
    <circle cx="200" cy="140" r="20" fill="none" stroke="#90A4AE" strokeWidth="1" opacity="0.6"/>
    {/* Hexagram (two interlocked triangles = Shatkona / Darshana symbol) */}
    <polygon points="200,80 232,135 168,135" fill="none" stroke="#80DEEA" strokeWidth="1.5" opacity="0.7"/>
    <polygon points="200,200 232,145 168,145" fill="none" stroke="#80DEEA" strokeWidth="1.5" opacity="0.7"/>
    {/* Six Darshana lines radiating */}
    {[0,60,120,180,240,300].map((deg,i) => {
      const rad = deg * Math.PI / 180;
      const x2 = (200 + 68 * Math.cos(rad)).toFixed(4);
      const y2 = (140 + 68 * Math.sin(rad)).toFixed(4);
      const colors = ["#E91E63","#9C27B0","#3F51B5","#00BCD4","#4CAF50","#FF9800"];
      return <line key={i} x1={200} y1={140} x2={x2} y2={y2} stroke={colors[i]} strokeWidth="1.5" opacity="0.7"/>;
    })}
    {/* Darshana labels */}
    <text x="200" y="68" textAnchor="middle" fontSize="7" fill="#E91E63" opacity="0.8">Sankhya</text>
    <text x="238" y="118" fontSize="7" fill="#9C27B0" opacity="0.8">Yoga</text>
    <text x="234" y="170" fontSize="7" fill="#3F51B5" opacity="0.8">Nyaya</text>
    <text x="200" y="220" textAnchor="middle" fontSize="7" fill="#00BCD4" opacity="0.8">Vaisheshika</text>
    <text x="134" y="170" fontSize="7" fill="#4CAF50" opacity="0.8">Mimamsa</text>
    <text x="128" y="118" fontSize="7" fill="#FF9800" opacity="0.8">Vedanta</text>
    {/* Center dot / Bindu */}
    <circle cx="200" cy="140" r="4" fill="#FFD700" opacity="0.9"/>
    <circle cx="200" cy="140" r="2" fill="#FFFFFF" opacity="0.8"/>
    {/* Light beams from head of meditator */}
    <line x1="200" y1="210" x2="200" y2="145" stroke="#FFD700" strokeWidth="1" opacity="0.3" strokeDasharray="3,4"/>
  </svg>
);

const HerbsScrollSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="scroll-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D7B87A"/>
        <stop offset="50%" stopColor="#E8CFA0"/>
        <stop offset="100%" stopColor="#C9A96E"/>
      </linearGradient>
      <linearGradient id="herb-green" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2E7D32"/>
        <stop offset="100%" stopColor="#1B5E20"/>
      </linearGradient>
    </defs>
    {/* Scroll background */}
    <rect x="40" y="20" width="320" height="260" rx="8" fill="url(#scroll-bg)" stroke="#8C6914" strokeWidth="3"/>
    {/* Scroll rolled ends */}
    <ellipse cx="40" cy="150" rx="15" ry="130" fill="#C9A96E" stroke="#8C6914" strokeWidth="2"/>
    <ellipse cx="360" cy="150" rx="15" ry="130" fill="#C9A96E" stroke="#8C6914" strokeWidth="2"/>
    {/* Inner scroll border */}
    <rect x="55" y="35" width="290" height="230" rx="4" fill="none" stroke="#8C6914" strokeWidth="1" opacity="0.4" strokeDasharray="6,3"/>
    {/* Sanskrit header */}
    <text x="200" y="60" textAnchor="middle" fontSize="11" fill="#5D4037" fontFamily="serif" fontWeight="bold">चरकसंहिता • अर्थशास्त्र • नाट्यशास्त्र</text>
    <line x1="70" y1="68" x2="330" y2="68" stroke="#8C6914" strokeWidth="1" opacity="0.5"/>
    {/* Mortar and pestle */}
    <ellipse cx="130" cy="185" rx="35" ry="15" fill="#795548" stroke="#5D4037" strokeWidth="2"/>
    <path d="M100 185 Q105 210 130 215 Q155 210 160 185Z" fill="#6D4C41" stroke="#5D4037" strokeWidth="1.5"/>
    <ellipse cx="130" cy="185" rx="30" ry="10" fill="#8D6E63"/>
    {/* Pestle */}
    <rect x="125" y="145" width="10" height="45" rx="5" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
    <ellipse cx="130" cy="145" rx="8" ry="5" fill="#6D4C41"/>
    {/* Herbs in mortar */}
    <ellipse cx="130" cy="185" rx="20" ry="6" fill="#388E3C" opacity="0.7"/>
    {/* Herb plants */}
    <path d="M250 230 Q252 210 255 195 Q260 180 265 195 Q270 210 272 230Z" fill="url(#herb-green)"/>
    <path d="M260 195 Q270 185 280 190 Q278 198 268 200Z" fill="#388E3C"/>
    <path d="M258 205 Q248 195 240 200 Q242 208 252 209Z" fill="#388E3C"/>
    <path d="M275 215 Q282 205 290 210 Q290 218 280 220Z" fill="#388E3C"/>
    <path d="M230 230 Q233 215 237 205 Q243 192 247 205 Q250 215 250 230Z" fill="url(#herb-green)"/>
    <path d="M237 205 Q230 195 225 200 Q226 208 235 210Z" fill="#4CAF50" opacity="0.8"/>
    {/* Scales of justice / Arthashastra */}
    <rect x="295" y="120" width="2" height="70" fill="#8C6914"/>
    <line x1="270" y1="135" x2="320" y2="135" stroke="#8C6914" strokeWidth="2"/>
    {/* Balance pans */}
    <path d="M270 135 Q265 148 260 150 Q268 152 278 150 Q275 148 270 135Z" fill="#D4AF37" opacity="0.8"/>
    <path d="M320 135 Q315 148 310 150 Q318 152 328 150 Q325 148 320 135Z" fill="#D4AF37" opacity="0.8"/>
    {/* Decorative corner motifs */}
    <text x="70" y="100" fontSize="16" fill="#8C6914" opacity="0.3" fontFamily="serif">ॐ</text>
    <text x="305" y="100" fontSize="16" fill="#8C6914" opacity="0.3" fontFamily="serif">ॐ</text>
    <text x="70" y="250" fontSize="16" fill="#8C6914" opacity="0.3" fontFamily="serif">ॐ</text>
    <text x="305" y="250" fontSize="16" fill="#8C6914" opacity="0.3" fontFamily="serif">ॐ</text>
  </svg>
);

// --- Artifact Card Component ---

interface ArtifactCardProps {
  scripture: StaticScripture;
  accentColor: string;
  onRead: (s: StaticScripture) => boolean;
  onDownload: (s: StaticScripture) => void;
}

const ArtifactCard = ({ scripture: s, accentColor, onRead, onDownload }: ArtifactCardProps) => {
  const isActive = ACTIVE_SLUGS.has(s.slug);

  return (
    <div
      className="group relative flex flex-col bg-[#FAF7F0] border border-[#D4AF37]/30 overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgba(61,32,15,0.18)] hover:-translate-y-1 hover:scale-[1.02]"
      style={{ borderTop: `3px solid ${accentColor}` }}
    >
      {/* Artifact header banner with Sanskrit title */}
      <div
        className="relative h-20 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}08)` }}
      >
        {/* Decorative corner ornaments */}
        <div className="absolute top-1 left-1 w-4 h-4 border-t border-l opacity-40" style={{ borderColor: accentColor }}/>
        <div className="absolute top-1 right-1 w-4 h-4 border-t border-r opacity-40" style={{ borderColor: accentColor }}/>
        <div className="absolute bottom-1 left-1 w-4 h-4 border-b border-l opacity-40" style={{ borderColor: accentColor }}/>
        <div className="absolute bottom-1 right-1 w-4 h-4 border-b border-r opacity-40" style={{ borderColor: accentColor }}/>
        {/* Background Sanskrit watermark */}
        <span className="absolute text-6xl font-bold opacity-[0.04] select-none font-sanskrit" style={{ color: accentColor }}>
          {s.titleSanskrit.split(' ')[0]}
        </span>
        <div className="relative z-10 text-center px-3">
          <p className="font-sanskrit text-sm font-bold leading-tight" style={{ color: accentColor }}>{s.titleSanskrit}</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#5D4037] mt-0.5 opacity-70">{s.categoryName} Collection</p>
        </div>
      </div>

      {/* Exhibit plaque bottom */}
      <div className="flex-1 p-3 flex flex-col gap-2">
        {/* Title */}
        <div>
          <h4 className="font-serif font-bold text-sm text-[#3E2723] leading-snug">{s.titleEnglish}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm text-[#FAF7F0]" style={{ background: accentColor }}>
              {s.categoryName}
            </span>
            <span className="text-[9px] font-mono text-[#5D4037]">{s.totalVerses.toLocaleString()} Verses</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[10px] text-[#5D4037] leading-relaxed italic flex-1">&ldquo;{s.description}&rdquo;</p>

        {/* Stats row */}
        <div className="flex gap-3 text-[9px] font-mono text-[#8C6914] border-t border-[#D4AF37]/20 pt-2">
          <span>📖 {s.totalChapters} Ch.</span>
          <span className="flex gap-1">{s.languages.map(l => <span key={l} className="bg-[#3E2723]/5 px-1 rounded">{l}</span>)}</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-1.5 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100">
          {isActive ? (
            <Link
              href={`/library/${s.slug}`}
              onClick={() => onRead(s)}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all no-underline text-[#FAF7F0] font-serif"
              style={{ background: accentColor }}
            >
              <BookOpen className="w-3 h-3" />
              <span>Read</span>
            </Link>
          ) : (
            <button
              onClick={() => onRead(s)}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all text-[#FAF7F0] font-serif"
              style={{ background: accentColor }}
            >
              <BookOpen className="w-3 h-3" />
              <span>Read</span>
            </button>
          )}
          <button
            onClick={() => onDownload(s)}
            className="flex items-center justify-center gap-1 py-1.5 px-2 text-[10px] font-bold uppercase tracking-wider border rounded-sm transition-all font-serif bg-transparent"
            style={{ borderColor: `${accentColor}60`, color: accentColor }}
          >
            <Download className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Active indicator dot */}
      {isActive && (
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-600 opacity-70" title="Available to read"/>
      )}
    </div>
  );
};

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

interface MuseumExhibitCardProps {
  scripture: StaticScripture;
  accentColor: string;
  onRead: (s: StaticScripture) => boolean;
  onDownload: (s: StaticScripture) => void;
}

const MuseumExhibitCard = ({ scripture: s, accentColor, onRead, onDownload }: MuseumExhibitCardProps) => {
  const [whyReadExpanded, setWhyReadExpanded] = useState(false);
  const isActive = ACTIVE_SLUGS.has(s.slug);
  const isCrownJewel = !!s.whyReadThis;
  const imagePath = getScriptureImage(s.slug);

  const renderStars = (score: number) => {
    const total = 10;
    const filled = Math.min(score, total);
    return (
      <div className="flex items-center gap-0.5" title={`Importance: ${score}/10`}>
        {Array.from({ length: total }).map((_, i) => (
          <span 
            key={i} 
            className={`text-xs ${i < filled ? "text-[#D4AF37] font-bold" : "text-gray-300 dark:text-gray-700"}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div 
      className="relative flex flex-col bg-[#FAF7F0] dark:bg-[#120C1E]/40 border border-[#D4AF37]/35 dark:border-amber-500/15 rounded-sm shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
      style={{ 
        borderTop: `4px solid ${accentColor}`,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 0h100v100H0z' fill='%23faf7f0' fill-opacity='.02'/%3E%3Cpath d='M10 10c15 0 15 30 30 30s15-30 30-30 15 30 30 30' stroke='%23e6dfc8' stroke-width='0.5' fill='none' opacity='0.08'/%3E%3C/svg%3E")`
      }}
    >
      {/* Sanskrit watermark in back */}
      <div className="absolute top-4 right-4 text-7xl font-bold opacity-[0.03] select-none font-sanskrit text-[#3E2723] dark:text-amber-500 pointer-events-none">
        {s.titleSanskrit.split(' ')[0]}
      </div>

      {/* Decorative corner borders */}
      <div className="absolute top-2 left-2 w-5 h-5 border-t border-l opacity-30" style={{ borderColor: accentColor }}/>
      <div className="absolute top-2 right-2 w-5 h-5 border-t border-r opacity-30" style={{ borderColor: accentColor }}/>
      <div className="absolute bottom-2 left-2 w-5 h-5 border-b border-l opacity-30" style={{ borderColor: accentColor }}/>
      <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r opacity-30" style={{ borderColor: accentColor }}/>

      {/* 60% Height Hero Artwork (only for Crown Jewels) */}
      {isCrownJewel && imagePath && (
        <div className="w-full h-48 sm:h-56 relative overflow-hidden group">
          {/* Watercolor vignette overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none" style={{
            background: `radial-gradient(ellipse 85% 85% at center, transparent 35%, var(--bg-primary) 100%)`
          }} />
          <img 
            src={imagePath} 
            alt={s.titleEnglish} 
            className="w-full h-full object-cover select-none filter sepia-[0.05] contrast-[1.03] saturate-[1.1] group-hover:scale-105 transition-transform duration-[2000ms] mix-blend-multiply dark:mix-blend-normal dark:opacity-85"
          />
          {/* Gold banner overlay */}
          <div className="absolute top-3 left-3 z-20 px-2 py-0.5 bg-[#D4AF37]/90 text-[#1A0A00] text-[9px] font-mono font-bold tracking-wider uppercase shadow-md rounded-sm">
            👑 Crown Jewel
          </div>
        </div>
      )}

      <div className="flex-1 p-5 md:p-6 flex flex-col gap-4">
        {/* Title Block Stacked */}
        <div className="border-b border-[#D4AF37]/25 pb-3">
          <p className="font-sanskrit text-base font-bold text-[#8C2D19] dark:text-[#F97316]">{s.titleSanskrit}</p>
          <h3 className="font-serif text-lg md:text-xl font-bold text-[#3E2723] dark:text-[#F5F2EB] mt-0.5">{s.titleEnglish}</h3>
          {s.titleHindi && s.titleHindi !== s.titleSanskrit && (
            <p className="text-xs text-[#8D6E63] dark:text-amber-500/80 font-serif italic mt-0.5">({s.titleHindi})</p>
          )}
          <p className="text-[9px] font-mono uppercase tracking-widest text-[#8D6E63] dark:text-gray-400 mt-1">{s.categoryName} Collection</p>
        </div>

        {/* Metadata Badges */}
        <div className="flex flex-wrap gap-1.5">
          {s.difficulty && (
            <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#3E2723]/5 border border-[#3E2723]/15 text-[#3E2723] dark:bg-white/5 dark:border-white/10 dark:text-white/80">
              {s.difficulty}
            </span>
          )}
          {s.readingTime && (
            <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#3E2723]/5 border border-[#3E2723]/15 text-[#3E2723] dark:bg-white/5 dark:border-white/10 dark:text-white/80">
              ⏱ {s.readingTime}
            </span>
          )}
          <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#3E2723]/5 border border-[#3E2723]/15 text-[#3E2723] dark:bg-white/5 dark:border-white/10 dark:text-white/80">
            📖 {s.totalChapters} Chapters
          </span>
          <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#3E2723]/5 border border-[#3E2723]/15 text-[#3E2723] dark:bg-white/5 dark:border-white/10 dark:text-white/80">
            📜 {s.totalVerses.toLocaleString()} Shlokas
          </span>
        </div>

        {/* Importance Score Stars */}
        {s.importanceScore && (
          <div className="flex items-center justify-between border-b border-[#D4AF37]/15 pb-2">
            <span className="text-[9px] font-mono uppercase tracking-wider text-[#8D6E63] dark:text-gray-400">Importance Rating</span>
            {renderStars(s.importanceScore)}
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-[#5D4037] dark:text-gray-300 leading-relaxed italic font-serif">
          &ldquo;{s.description}&rdquo;
        </p>

        {isCrownJewel && (
          <div className="flex flex-col gap-3.5 border-t border-[#D4AF37]/15 pt-3 text-xs">
            {/* Expandable Why Read This */}
            {s.whyReadThis && (
              <div className="bg-[#FAF7F0]/65 dark:bg-[#0a0614]/35 border border-[#D4AF37]/20 dark:border-amber-500/10 rounded p-2.5 transition-all">
                <button
                  onClick={() => setWhyReadExpanded(!whyReadExpanded)}
                  className="w-full flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-[#8C2D19] dark:text-[#F97316] font-bold"
                >
                  <span>Why Read This</span>
                  <span className="text-[10px]">{whyReadExpanded ? "▲ Collapse" : "▼ Expand"}</span>
                </button>
                {whyReadExpanded && (
                  <p className="text-xs text-[#5D4037] dark:text-gray-300 leading-relaxed font-serif mt-1.5 animate-in slide-in-from-top-1 duration-200">
                    {s.whyReadThis}
                  </p>
                )}
              </div>
            )}
            
            {/* Primary Teachings */}
            {s.primaryTeachings && s.primaryTeachings.length > 0 && (
              <div>
                <h5 className="font-mono text-[9px] uppercase tracking-wider text-[#8C2D19] dark:text-[#F97316] font-bold mb-1.5">Primary Teachings</h5>
                <div className="flex flex-wrap gap-1">
                  {s.primaryTeachings.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-0.5 rounded-sm bg-[#EAE2CF]/30 dark:bg-white/5 border border-[#E4D5B7] dark:border-white/10 text-[10px] font-serif text-[#3E2723] dark:text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Scriptures */}
            {s.relatedScriptures && s.relatedScriptures.length > 0 && (
              <div>
                <h5 className="font-mono text-[9px] uppercase tracking-wider text-[#8C2D19] dark:text-[#F97316] font-bold mb-1">Related Scriptures</h5>
                <div className="flex gap-1.5 flex-wrap mt-1">
                  {s.relatedScriptures.map(rel => {
                    const relScr = ALL_SCRIPTURES.find(scr => scr.slug === rel);
                    if (!relScr) return null;
                    return (
                      <span key={rel} className="px-2 py-0.5 rounded-sm border border-[#D4AF37]/20 dark:border-amber-500/10 text-[10px] font-serif bg-[#FAF7F0]/40 dark:bg-[#120C1E]/20 text-[#5D4037] dark:text-gray-400">
                        {relScr.titleEnglish}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions Row */}
        <div className="flex gap-2 border-t border-[#D4AF37]/15 pt-4 mt-auto">
          {isActive ? (
            <Link
              href={`/library/${s.slug}`}
              onClick={() => onRead(s)}
              className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all no-underline text-[#FAF7F0] font-serif shadow-sm hover:shadow-md"
              style={{ background: accentColor }}
            >
              <BookOpen className="w-4 h-4" />
              <span>Enter Study Sanctum</span>
            </Link>
          ) : (
            <button
              onClick={() => onRead(s)}
              className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all text-[#FAF7F0] font-serif"
              style={{ background: accentColor }}
            >
              <BookOpen className="w-4 h-4" />
              <span>Enter Study Sanctum</span>
            </button>
          )}
          <button
            onClick={() => onDownload(s)}
            className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold uppercase tracking-wider border rounded-sm transition-all font-serif bg-transparent"
            style={{ borderColor: `${accentColor}60`, color: accentColor }}
            title="Download PDF scroll"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Exhibits List Component (Supports Grid, Museum, Shelf, Manuscript, Collection layouts) ---

interface ExhibitsListProps {
  scriptures: StaticScripture[];
  layout: "grid" | "museum" | "shelf" | "manuscript" | "collection";
  accentColor: string;
  onRead: (s: StaticScripture) => boolean;
  onDownload: (s: StaticScripture) => void;
}

const ExhibitsList = ({ scriptures, layout, accentColor, onRead, onDownload }: ExhibitsListProps) => {
  if (layout === "museum") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {scriptures.map(s => (
          <MuseumExhibitCard
            key={s.id}
            scripture={s}
            accentColor={accentColor}
            onRead={onRead}
            onDownload={onDownload}
          />
        ))}
      </div>
    );
  }

  if (layout === "shelf") {
    const categoriesGrouped = scriptures.reduce((acc, s) => {
      if (!acc[s.categoryName]) acc[s.categoryName] = [];
      acc[s.categoryName].push(s);
      return acc;
    }, {} as Record<string, StaticScripture[]>);

    return (
      <div className="relative p-6 md:p-10 bg-[#2D1A0A] border-8 border-double border-[#8C6914]/40 rounded shadow-inner flex flex-col gap-14">
        {/* Wooden textures */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_rgba(0,0,0,0.8)_100%)]"/>
        
        {Object.entries(categoriesGrouped).map(([catName, list], catIdx) => (
          <div key={catName} className="relative w-full">
            {/* Category header hanging on shelf */}
            <div className="inline-block px-4 py-1.5 border border-[#D4AF37]/30 bg-[#1A0A00] text-[#D4AF37] font-serif text-xs uppercase tracking-widest rounded-sm mb-6 shadow-md relative z-10">
              🏛️ {catName} Shelf
            </div>

            {/* The shelf row */}
            <div className="relative flex flex-nowrap items-end gap-4 pl-4 pr-4 pb-4 overflow-x-auto scrollbar-custom border-b-8 border-[#3D2512] shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
              {/* Shelf top wood trim */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#513018] border-t border-[#8C6914]/20" />
              
              {list.map((s, idx) => {
                // Dynamic sizing for books to look organic
                const bookColors = ["#8C2D19", "#1E8449", "#1A5276", "#D4AC0D", "#7E57C2", "#3E2723", "#A11B1B", "#2E7D32"];
                const bookColor = bookColors[s.titleEnglish.length % bookColors.length];
                const isActive = ACTIVE_SLUGS.has(s.slug);
                
                // Heights range: 130px to 170px; widths range: 36px to 48px
                const bookHeight = 130 + (s.titleEnglish.length % 4) * 12;
                const bookWidth = 36 + (s.titleSanskrit.length % 3) * 6;

                return (
                  <div key={s.id} className="group relative flex flex-col items-center select-none cursor-pointer mt-4">
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full mb-3 hidden group-hover:flex flex-col items-center w-48 p-2 bg-[#1A0A00] text-white border border-[#D4AF37]/50 rounded text-center shadow-xl z-20">
                      <span className="text-[11px] font-bold font-serif leading-tight">{s.titleEnglish}</span>
                      <span className="text-[9px] font-sanskrit text-[#D4AF37] mt-0.5">{s.titleSanskrit}</span>
                      <span className="text-[8px] font-mono text-white/50 mt-1">{s.totalChapters} Ch | {s.totalVerses.toLocaleString()} Verses</span>
                      <span className="text-[8px] font-mono font-bold mt-1 text-green-400">{isActive ? "AVAILABLE TO READ" : "UNDER DIGITAL RESTORATION"}</span>
                    </div>

                    {/* Book Spine */}
                    <div 
                      className="relative transition-all duration-300 transform origin-bottom hover:-translate-y-2 hover:rotate-1 shadow-[4px_0_8px_rgba(0,0,0,0.5)] flex items-center justify-center border-r border-[#000]/20 rounded-sm"
                      style={{ 
                        backgroundColor: bookColor, 
                        height: `${bookHeight}px`,
                        width: `${bookWidth}px`
                      }}
                    >
                      {/* 3D highlights */}
                      <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-white/15 to-transparent pointer-events-none" />
                      <div className="absolute inset-y-0 right-0 w-[25%] bg-gradient-to-l from-black/30 to-transparent pointer-events-none" />
                      {/* Decorative Gold bands on spine */}
                      <div className="absolute top-4 left-0 right-0 h-1 bg-[#D4AF37]/40 border-t border-b border-black/10 pointer-events-none" />
                      <div className="absolute bottom-8 left-0 right-0 h-1 bg-[#D4AF37]/40 border-t border-b border-black/10 pointer-events-none" />

                      {/* Book vertical spine title */}
                      <div className="text-[9px] font-serif font-bold text-[#FAF7F0] tracking-wider uppercase rotate-90 select-none whitespace-nowrap overflow-hidden text-ellipsis w-[100px] text-center opacity-90">
                        {s.titleEnglish}
                      </div>

                      {/* Gold emblem on spine bottom */}
                      <div className="absolute bottom-2.5 text-center text-[#D4AF37] text-[8px] font-bold font-serif select-none opacity-80">
                        ॐ
                      </div>
                    </div>

                    {/* Quick links when hovering book base */}
                    <div className="absolute top-[80%] left-1/2 -translate-x-1/2 hidden group-hover:flex gap-1.5 z-20 bg-[#FAF7F0] border border-[#D4AF37] p-1 rounded shadow-lg">
                      {isActive ? (
                        <Link
                          href={`/library/${s.slug}`}
                          onClick={() => onRead(s)}
                          className="px-2 py-1 bg-[#8C2D19] text-white text-[8px] font-serif font-bold uppercase rounded-sm no-underline"
                        >
                          Read
                        </Link>
                      ) : (
                        <button
                          onClick={() => onRead(s)}
                          className="px-2 py-1 bg-[#8C2D19] text-white text-[8px] font-serif font-bold uppercase rounded-sm"
                        >
                          Read
                        </button>
                      )}
                      <button
                        onClick={() => onDownload(s)}
                        className="px-1.5 py-1 border border-[#8C2D19]/30 text-[#8C2D19] text-[8px] font-serif font-bold uppercase rounded-sm bg-transparent"
                      >
                        📥
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (layout === "manuscript") {
    return (
      <div className="flex flex-col gap-10">
        {scriptures.map(s => {
          const isActive = ACTIVE_SLUGS.has(s.slug);
          return (
            <div 
              key={s.id}
              className="relative bg-[#F4EAD4] border-x-8 border-double border-[#8C6914]/40 p-6 md:p-10 rounded-sm shadow-md flex flex-col md:flex-row gap-6 items-center"
              style={{
                backgroundImage: `radial-gradient(circle at center, rgba(244,234,212,0.92) 0%, rgba(230,216,187,0.97) 100%), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 0h100v100H0z' fill='%23f4ead4' fill-opacity='.05'/%3E%3Cpath d='M10 10c15 0 15 30 30 30s15-30 30-30 15 30 30 30' stroke='%23d7c5a0' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3C/svg%3E")`
              }}
            >
              {/* Scroll roller graphics */}
              <div className="absolute top-0 bottom-0 -left-6 w-3 bg-gradient-to-r from-[#5D4037] to-[#8D6E63] border-l-2 border-r-2 border-[#3E2723] rounded-sm hidden md:block" />
              <div className="absolute top-0 bottom-0 -right-6 w-3 bg-gradient-to-r from-[#8D6E63] to-[#5D4037] border-l-2 border-r-2 border-[#3E2723] rounded-sm hidden md:block" />

              {/* Scroll Content Left: Sanskrit/Hindi Calligraphy */}
              <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-[#8C6914]/30 pb-4 md:pb-0 md:pr-6 text-center md:text-left">
                <span className="text-3xl font-bold font-sanskrit text-[#8C2D19] drop-shadow-sm select-text block">
                  {s.titleSanskrit}
                </span>
                {s.titleHindi && (
                  <span className="text-sm font-bold font-serif text-[#C5A059] block mt-1 select-text">
                    ({s.titleHindi})
                  </span>
                )}
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5D4037] mt-3 block">
                  {s.categoryName} Scroll
                </span>
              </div>

              {/* Scroll Content Right: English Title, description, and tags */}
              <div className="flex-1 flex flex-col gap-3">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#3E2723] leading-snug">{s.titleEnglish}</h3>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-[#8C6914] mt-1.5">
                    <span>📚 {s.totalChapters} Chapters</span>
                    <span>•</span>
                    <span>📜 {s.totalVerses.toLocaleString()} Shlokas</span>
                  </div>
                </div>

                <p className="text-xs text-[#5D4037]/90 leading-relaxed italic font-serif font-light tracking-wide bg-[#FAF7F0]/40 p-2.5 border border-[#D4AF37]/20 rounded-sm">
                  &ldquo;{s.description}&rdquo;
                </p>

                {/* Archivist Note / Scholarly Annotation */}
                <div className="p-2.5 bg-[#FAF7F0]/60 border border-[#D4AF37]/20 rounded-sm text-[10px] text-[#8C6914] font-serif leading-relaxed italic">
                  <span className="font-bold font-mono text-[9px] uppercase tracking-wide block mb-0.5 text-[#8C2D19]">📖 Archivist Annotation</span>
                  {s.category === "vedas" && "A primary revelation (Shruti) of the Vedic period, originally sung by hotris around the sacred fire."}
                  {s.category === "upanishads" && "A Vedanta text emphasizing self-inquiry (Atman realization) over ritualistic actions."}
                  {s.category === "epics" && "An epic history (Itihasa) documenting cosmic values through historical narratives."}
                  {s.category === "gita" && "A spiritual discourse synthesizing karma, jnana, and bhakti on the battlefield of Kurukshetra."}
                  {s.category === "puranas" && "A traditional mytho-philosophical text explaining cosmic cycles and deities."}
                  {s.category === "philosophy" && "A rational philosophical handbook (Darshana Sutras) outlining systematic steps to truth."}
                  {s.category === "others" && "A classical treatise on empirical science, medicine, governance, or fine arts."}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
                  <span className="text-[9px] font-mono text-[#8D6E63] uppercase tracking-wide">
                    Preserved in: {s.languages.join(", ")}
                  </span>
                  
                  <div className="flex gap-2">
                    {isActive ? (
                      <Link
                        href={`/library/${s.slug}`}
                        onClick={() => onRead(s)}
                        className="px-4 py-1.5 bg-[#8C2D19] text-white text-[10px] font-serif font-bold uppercase tracking-wider rounded-sm transition-all no-underline shadow-sm hover:bg-[#3E2723]"
                      >
                        Unroll Scroll
                      </Link>
                    ) : (
                      <button
                        onClick={() => onRead(s)}
                        className="px-4 py-1.5 bg-[#8C2D19] text-white text-[10px] font-serif font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
                      >
                        Unroll Scroll
                      </button>
                    )}
                    <button
                      onClick={() => onDownload(s)}
                      className="px-2.5 py-1.5 border border-[#8C2D19]/30 text-[#8C2D19] text-[10px] font-serif font-bold rounded-sm bg-transparent transition-all hover:bg-[#8C2D19]/5"
                    >
                      📥 Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (layout === "collection") {
    return (
      <div className="overflow-x-auto border border-[#D4AF37]/30 bg-[#FAF7F0] shadow-sm rounded-sm">
        <table className="w-full text-left border-collapse font-serif text-[#3E2723]">
          <thead>
            <tr className="bg-[#FAF7F0] border-b border-[#D4AF37]/45 text-[10px] font-mono uppercase tracking-widest text-[#8C2D19]">
              <th className="py-3 px-4">Exhibit</th>
              <th className="py-3 px-4">Sanskrit Title</th>
              <th className="py-3 px-4">Collection</th>
              <th className="py-3 px-4">Chapters</th>
              <th className="py-3 px-4">Verses</th>
              <th className="py-3 px-4">Languages</th>
              <th className="py-3 px-4">Difficulty</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D4AF37]/20 text-xs">
            {scriptures.map(s => {
              const isActive = ACTIVE_SLUGS.has(s.slug);
              return (
                <tr key={s.id} className="hover:bg-[#EAE2CF]/20 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#3E2723]">{s.titleEnglish}</td>
                  <td className="py-3.5 px-4 font-sanskrit text-sm text-[#8C2D19]">{s.titleSanskrit}</td>
                  <td className="py-3.5 px-4 font-mono text-[10px] text-[#8D6E63] uppercase">{s.categoryName}</td>
                  <td className="py-3.5 px-4 font-mono">{s.totalChapters}</td>
                  <td className="py-3.5 px-4 font-mono">{s.totalVerses.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono text-[10px]">{s.languages.join(", ")}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-sm text-[9px] font-mono uppercase ${
                      s.difficulty === "Advanced" ? "bg-red-100 text-red-800" :
                      s.difficulty === "Intermediate" ? "bg-amber-100 text-amber-800" :
                      s.difficulty === "Beginner" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {s.difficulty || "General"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[10px]">
                    {isActive ? (
                      <span className="text-green-600 font-bold">● Available</span>
                    ) : (
                      <span className="text-amber-600">◌ Restoring</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex gap-2 justify-center">
                      {isActive ? (
                        <Link
                          href={`/library/${s.slug}`}
                          onClick={() => onRead(s)}
                          className="px-2.5 py-1 bg-[#8C2D19] text-white text-[10px] font-bold uppercase rounded-sm no-underline hover:bg-[#3E2723] transition-colors"
                        >
                          Read
                        </Link>
                      ) : (
                        <button
                          onClick={() => onRead(s)}
                          className="px-2.5 py-1 bg-[#8C2D19] text-white text-[10px] font-bold uppercase rounded-sm hover:bg-[#3E2723] transition-colors"
                        >
                          Read
                        </button>
                      )}
                      <button
                        onClick={() => onDownload(s)}
                        className="p-1 border border-[#8C2D19]/30 text-[#8C2D19] text-[10px] rounded-sm bg-transparent hover:bg-[#8C2D19]/10"
                        title="Download PDF scroll"
                      >
                        📥
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // Default Grid View
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {scriptures.map(s => (
        <ArtifactCard
          key={s.id}
          scripture={s}
          accentColor={accentColor}
          onRead={onRead}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
};


// --- Museum Hall Section Component ---

interface MuseumHallProps {
  id: string;
  layout: "grid" | "museum" | "shelf" | "manuscript" | "collection";
  hallNumber: string;
  hallName: string;
  hallNameSanskrit: string;
  era: string;
  historicalContext: string;
  atmosphere: string;
  accentColor: string;
  bgFrom: string;
  bgTo: string;
  artworkComponent: React.ReactNode;
  scriptures: StaticScripture[];
  onRead: (s: StaticScripture) => boolean;
  onDownload: (s: StaticScripture) => void;
}

const MuseumHall = ({
  id, hallNumber, hallName, hallNameSanskrit, era, historicalContext, atmosphere,
  accentColor, bgFrom, bgTo, artworkComponent, scriptures, layout, onRead, onDownload
}: MuseumHallProps) => {
  return (
    <section id={id} className="relative w-full overflow-hidden">
      {/* Hall header — full-width cinematic panel */}
      <div
        className="relative w-full min-h-[320px] flex items-stretch overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})` }}
      >
        {/* Decorative Sanskrit border top */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        />

        {/* Background Sanskrit text watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-sanskrit text-[200px] font-bold opacity-[0.025] text-white leading-none">
            {hallNameSanskrit.split(' ')[0]}
          </span>
        </div>

        {/* LEFT: Artwork panel */}
        <div className="w-full md:w-5/12 relative flex items-center justify-center p-8">
          <div className="relative w-full max-w-xs">
            {/* Ornate frame around artwork */}
            <div
              className="absolute -inset-2 border opacity-30"
              style={{ borderColor: accentColor }}
            />
            <div
              className="absolute -inset-3 border opacity-15"
              style={{ borderColor: accentColor }}
            />
            {/* Corner ornaments */}
            {[['top-0 left-0','border-t-2 border-l-2'],['top-0 right-0','border-t-2 border-r-2'],['bottom-0 left-0','border-b-2 border-l-2'],['bottom-0 right-0','border-b-2 border-r-2']].map(([pos, borders], i) => (
              <div key={i} className={`absolute ${pos} w-5 h-5 ${borders}`} style={{ borderColor: accentColor }}/>
            ))}
            {artworkComponent}
          </div>
        </div>

        {/* RIGHT: Hall introduction text */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-10">
          {/* Hall number */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px]" style={{ background: accentColor }}/>
            <span
              className="text-[10px] font-mono uppercase tracking-[0.25em] font-bold"
              style={{ color: accentColor }}
            >
              {hallNumber}
            </span>
          </div>

          {/* Hall name */}
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-white leading-tight mb-1">
            {hallName}
          </h2>
          <p className="font-sanskrit text-lg mb-4" style={{ color: accentColor }}>
            {hallNameSanskrit}
          </p>

          {/* Era badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm mb-4 self-start text-xs font-mono uppercase tracking-wider"
            style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}40`, color: accentColor }}
          >
            <MapPin className="w-3 h-3" />
            {era}
          </div>

          {/* Historical context */}
          <p className="text-white/80 text-sm leading-relaxed mb-3 font-serif italic">
            &ldquo;{historicalContext}&rdquo;
          </p>

          {/* Atmosphere note */}
          <p className="text-white/50 text-xs leading-relaxed">
            {atmosphere}
          </p>

          {/* Exhibit count */}
          <div className="mt-4 flex items-center gap-2">
            <div className="h-[1px] w-6" style={{ background: accentColor }}/>
            <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: accentColor }}>
              {scriptures.length} Sacred Exhibit{scriptures.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Decorative Sanskrit border bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }}
        />
      </div>

      {/* Exhibit grid */}
      <div className="p-6 md:p-8 bg-[#FAF7F0] border-b border-[#D4AF37]/20">
        {/* Section divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, ${accentColor}60, transparent)` }}/>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold" style={{ color: accentColor }}>
            Sacred Exhibits
          </span>
          <div className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60)` }}/>
        </div>

        <ExhibitsList
          scriptures={scriptures}
          layout={layout}
          accentColor={accentColor}
          onRead={onRead}
          onDownload={onDownload}
        />
      </div>
    </section>
  );
};

// --- Main Museum Component ---

const LibraryBrowser = memo(() => {
  const searchParams = useSearchParams();
  const tab = searchParams ? searchParams.get("tab") : null;

  const [searchQuery, setSearchQuery] = useState("");
  const [layout, setLayout] = useState<"grid" | "museum" | "shelf" | "manuscript" | "collection">("grid");
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    // Derive initial active category from URL tab param if valid — avoids setState-in-effect
    const validTabs = ["all", "vedas", "upanishads", "epics", "gita", "puranas", "philosophy", "others"];
    return (tab && validTabs.includes(tab)) ? tab : "all";
  });
  const [alertText, setAlertText] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { playClick, playSuccess, playNavigate } = useSacredSound();

  const categories = [
    { id: "all", label: "All Halls" },
    { id: "vedas", label: "Vedas Hall" },
    { id: "upanishads", label: "Upanishad Chamber" },
    { id: "epics", label: "Epic Gallery" },
    { id: "gita", label: "Gita Sanctum" },
    { id: "puranas", label: "Purana Vault" },
    { id: "philosophy", label: "Philosophy Wing" },
    { id: "others", label: "Sciences Collection" },
  ];

  // Sync category when tab param changes after mount
  useEffect(() => {
    const validTabs = ["all", "vedas", "upanishads", "epics", "gita", "puranas", "philosophy", "others"];
    const next = (tab && validTabs.includes(tab)) ? tab : "all";
    startTransition(() => setActiveCategory(next));
  }, [tab]);

  const handleRead = (s: StaticScripture): boolean => {
    if (ACTIVE_SLUGS.has(s.slug)) {
      playNavigate();
      return true;
    } else {
      playSuccess();
      setAlertText(`The manuscript of "${s.titleEnglish}" is being digitised. Visit the Gita, Vedas, or Upanishads while we restore this exhibit.`);
      setTimeout(() => setAlertText(null), 6000);
      return false;
    }
  };

  const handleDownload = (s: StaticScripture) => {
    playSuccess();
    setAlertText(`Sacred PDF scrolls of "${s.titleEnglish}" are available in the Downloads Centre — all formats free for eternity.`);
    setTimeout(() => setAlertText(null), 6000);
  };

  // Museum halls definition
  const halls = useMemo(() => [
    {
      id: "vedas-hall",
      category: "vedas",
      hallNumber: "Hall I",
      hallName: "The Vedas Hall",
      hallNameSanskrit: "श्रुति मण्डप",
      era: "c. 1500 BCE — Primordial Age",
      historicalContext: "In the forests of ancient Bharat, enlightened Rishis heard the cosmic vibration of existence itself. What they cognized in deep states of samadhi became the four Vedas — eternal revelations beyond human authorship.",
      atmosphere: "Step into a sacred hall ablaze with the primordial fire of creation. Here, ancient hymns echo through pillars of carved sandstone and golden flame.",
      accentColor: "#C0392B",
      bgFrom: "#2C0A0A",
      bgTo: "#5D1A0A",
      artwork: <HavanKundSVG />,
    },
    {
      id: "upanishad-chamber",
      category: "upanishads",
      hallNumber: "Hall II",
      hallName: "The Upanishad Chamber",
      hallNameSanskrit: "वेदान्त गुहा",
      era: "c. 800–200 BCE — Age of Enquiry",
      historicalContext: "Beneath the ancient banyan trees of Brahmavarta, seekers sat at the feet of Rishis and questioned the deepest truths. Who am I? What is Brahman? Their dialogues became the Upanishads — humanity's greatest philosophical achievement.",
      atmosphere: "A forest hermitage at twilight. The flickering of a single diya illuminates palm-leaf manuscripts. Silence is the only teacher here.",
      accentColor: "#1E8449",
      bgFrom: "#0A1F0A",
      bgTo: "#0D3320",
      artwork: <BanyanDiyaSVG />,
    },
    {
      id: "epic-gallery",
      category: "epics",
      hallNumber: "Hall III",
      hallName: "The Epic Gallery",
      hallNameSanskrit: "इतिहास दीर्घा",
      era: "c. 1000–500 BCE — Age of Heroes",
      historicalContext: "On the fields of Kurukshetra and the forests of Panchavati, the dharmic ideals of civilization were forged through trial and sacrifice. The Ramayana and Mahabharata are not merely stories — they are maps of the human soul.",
      atmosphere: "Magnificent sandstone walls carved with epic battles. The setting sun turns the horizon golden as the Dharma Chakra stands eternal.",
      accentColor: "#D4AC0D",
      bgFrom: "#1A1200",
      bgTo: "#3A2800",
      artwork: <ChariotBowSVG />,
    },
    {
      id: "purana-vault",
      category: "puranas",
      hallNumber: "Hall IV",
      hallName: "The Purana Vault",
      hallNameSanskrit: "पुराण कोष्ठक",
      era: "c. 300 BCE–1000 CE — Age of Stories",
      historicalContext: "Deep in the cosmic ocean of time, Sage Vyasa wove together the legends of creation, the avatars of Vishnu, the tandava of Shiva, and the grace of Devi. The 18 Mahapuranas are the sacred mythology of an eternal civilization.",
      atmosphere: "A deep-ocean treasury lit by bioluminescent copper plaques. The serpent Ananta holds all the worlds in his coils — and every story in his memory.",
      accentColor: "#1A5276",
      bgFrom: "#020D1A",
      bgTo: "#0A2040",
      artwork: <CosmicOceanSVG />,
    },
    {
      id: "philosophy-wing",
      category: "philosophy",
      hallNumber: "Hall V",
      hallName: "The Philosophy Wing",
      hallNameSanskrit: "दर्शन कक्ष",
      era: "c. 600 BCE–200 CE — Age of Reason",
      historicalContext: "Six schools of systematic thought arose to organize the vastness of Vedic wisdom into rigorous intellectual frameworks. From the atoms of Kanada to the samadhi of Patanjali, these are humanity's greatest philosophical achievements.",
      atmosphere: "A hall of pure geometry. Lines of light intersect in perfect hexagonal symmetry. A solitary meditator sits at the centre of it all.",
      accentColor: "#5D6D7E",
      bgFrom: "#0D1117",
      bgTo: "#1A2332",
      artwork: <DarshanGeometrySVG />,
    },
    {
      id: "sciences-collection",
      category: "others",
      hallNumber: "Hall VI",
      hallName: "Ayurveda & Sciences",
      hallNameSanskrit: "विज्ञान शाला",
      era: "c. 700 BCE–500 CE — Classical Era",
      historicalContext: "From the healing arts of Charaka and Sushruta to the political genius of Chanakya, ancient Bharat produced some of the world's earliest systematic sciences. This collection preserves that priceless intellectual inheritance.",
      atmosphere: "A warm archival library of scrolled manuscripts, mortar and pestle, balance scales, and dancing figurines. The scent of sandalwood hangs in the air.",
      accentColor: "#1E8449",
      bgFrom: "#0A1A08",
      bgTo: "#112810",
      artwork: <HerbsScrollSVG />,
    },
  ], []);

  // Active search/filter state
  const isFiltered = searchQuery.trim() !== "" || activeCategory !== "all";

  const filteredScriptures = useMemo(() => {
    return ALL_SCRIPTURES.filter(s => {
      const matchesCategory = activeCategory === "all" || s.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || s.titleEnglish.toLowerCase().includes(q) || s.titleSanskrit.includes(q) || s.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  // Group scriptures by category for the museum halls
  const scripturesByCategory = useMemo(() => {
    const grouped: Record<string, StaticScripture[]> = {};
    ALL_SCRIPTURES.forEach(s => {
      if (!grouped[s.category]) grouped[s.category] = [];
      grouped[s.category].push(s);
    });
    return grouped;
  }, []);

  const gitaScripture = ALL_SCRIPTURES.find(s => s.slug === "gita")!;

  return (
    <div className="w-full flex flex-col bg-[#FAF7F0] text-[#3E2723] select-text font-serif">

      {/* Toast Alert */}
      {alertText && (
        <div className="fixed top-[94px] left-1/2 transform -translate-x-1/2 z-[100] bg-[#FAF7F0] border-double border-4 border-[#8C2D19] text-[#8C2D19] px-6 py-3 flex items-center gap-3 shadow-2xl max-w-lg w-[90%] animate-bounce">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-semibold leading-normal">{alertText}</span>
          <button onClick={() => setAlertText(null)} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* MUSEUM ENTRANCE — Grand Portal             */}
      {/* ═══════════════════════════════════════════ */}
      <div className="relative bg-[#1A0A00] text-white overflow-hidden">
        {/* Parchment texture overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(0deg, #D4AF37 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #D4AF37 0px, transparent 1px, transparent 40px)`,
        }}/>

        {/* Top ornamental border */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"/>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-16 text-center">
          {/* Museum designation */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-16 bg-[#D4AF37]/50"/>
            <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#D4AF37]">Nalanda Digital Archives • Est. c. 427 CE</span>
            <div className="h-[1px] w-16 bg-[#D4AF37]/50"/>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-none mb-2 tracking-wide">
            THE SACRED MUSEUM
          </h1>
          <h2 className="font-serif text-xl md:text-2xl font-light text-[#D4AF37]/80 tracking-widest mb-1">
            OF KNOWLEDGE
          </h2>
          <p className="font-sanskrit text-base text-[#D4AF37] mb-8">
            ज्ञानं परमं ध्येयम् — Knowledge is the Highest Goal
          </p>

          <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8 italic font-serif">
            Welcome to a living repository of humanity&apos;s greatest intellectual legacy. Walk through the halls of the Vedas, sit in the Upanishadic forests, witness the battles of the Epics, and descend into the Purana Vault. Every scripture here is a priceless artifact preserved through millennia.
          </p>

          {/* Museum stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { num: "50+", label: "Ancient Scriptures" },
              { num: "500K+", label: "Sacred Verses" },
              { num: "6", label: "Thematic Halls" },
              { num: "3000+", label: "Years of Wisdom" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="font-serif text-2xl font-bold text-[#D4AF37]">{num}</div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-white/40 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Navigation icons for halls */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { href: "#vedas-hall", label: "Vedas Hall", color: "#C0392B" },
              { href: "#upanishad-chamber", label: "Upanishad Chamber", color: "#1E8449" },
              { href: "#epic-gallery", label: "Epic Gallery", color: "#D4AC0D" },
              { href: "#gita-sanctum", label: "Gita Sanctum", color: "#D4AF37" },
              { href: "#purana-vault", label: "Purana Vault", color: "#1A5276" },
              { href: "#philosophy-wing", label: "Philosophy Wing", color: "#5D6D7E" },
              { href: "#sciences-collection", label: "Sciences", color: "#1E8449" },
            ].map(({ href, label, color }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[10px] font-mono uppercase tracking-wider transition-all hover:opacity-90 text-white"
                style={{ border: `1px solid ${color}60`, background: `${color}15` }}
              >
                <ChevronRight className="w-3 h-3" style={{ color }}/>
                {label}
              </a>
            ))}
          </div>

          {/* Unified Search & Room Selector Console */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="bg-[#FAF7F0]/90 dark:bg-[#120C1E]/60 border border-[#D4AF37]/40 dark:border-amber-500/20 p-5 rounded shadow-xl backdrop-blur-md relative">
              {/* Corner ornaments */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-[#D4AF37]/30"/>
              <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-[#D4AF37]/30"/>
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-[#D4AF37]/30"/>
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-[#D4AF37]/30"/>

              <div className="flex flex-col md:flex-row items-stretch gap-4">
                {/* Search Input Box */}
                <div className="flex-1 flex items-center gap-3 bg-[#FAF7F0] dark:bg-[#030107]/40 border border-[#D4AF37]/30 dark:border-amber-500/10 rounded px-3 py-2 transition-all focus-within:border-[#8C2D19] dark:focus-within:border-amber-500">
                  <Search className="w-4 h-4 text-[#8C2D19] dark:text-[#F97316]" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search the sacred scriptures (e.g. Gita, Upanishads, Ayurveda)..."
                    className="flex-1 bg-transparent text-[#3E2723] dark:text-white text-sm placeholder-[#3E2723]/50 dark:placeholder-white/40 outline-none font-serif"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="text-[#8C2D19] dark:text-[#F97316] hover:scale-110 transition-transform"><X className="w-4 h-4"/></button>
                  )}
                </div>

                {/* Layout Selector Quick Control */}
                <div className="flex items-center justify-center gap-1 border-t md:border-t-0 md:border-l border-[#D4AF37]/25 pt-3 md:pt-0 md:pl-4">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#5D4037] dark:text-gray-400 mr-1 hidden sm:inline">Layout:</span>
                  <div className="flex gap-1">
                    {[
                      { id: "grid", icon: <LayoutGrid className="w-3.5 h-3.5" />, tooltip: "Grid Layout" },
                      { id: "museum", icon: <Landmark className="w-3.5 h-3.5" />, tooltip: "Museum Layout" },
                      { id: "shelf", icon: <Library className="w-3.5 h-3.5" />, tooltip: "Shelf Layout" },
                      { id: "manuscript", icon: <Scroll className="w-3.5 h-3.5" />, tooltip: "Scroll Layout" },
                      { id: "collection", icon: <List className="w-3.5 h-3.5" />, tooltip: "Table Layout" }
                    ].map(l => (
                      <button
                        key={l.id}
                        onClick={() => { playClick(); setLayout(l.id as typeof layout); }}
                        title={l.tooltip}
                        className={`p-2 rounded-sm transition-all border ${
                          layout === l.id 
                            ? "bg-[#8C2D19] border-[#8C2D19] text-[#FAF7F0] shadow-md" 
                            : "border-[#D4AF37]/25 text-[#8C2D19] dark:text-amber-500 hover:bg-[#8C2D19]/10"
                        }`}
                      >
                        {l.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Room Selector Tabs */}
              <div className="mt-4 border-t border-[#D4AF37]/20 pt-4">
                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8C2D19] dark:text-[#F97316] font-bold mb-2 text-center md:text-left">Exhibition Room Chambers</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { playClick(); setActiveCategory(cat.id); }}
                      className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-sm border transition-all hover:scale-[1.02] ${
                        activeCategory === cat.id
                          ? "bg-[#8C2D19] border-[#8C2D19] text-[#FAF7F0] font-bold shadow-md"
                          : "border-[#D4AF37]/30 dark:border-amber-500/10 text-[#3E2723]/95 dark:text-white/80 hover:bg-[#8C2D19]/10 hover:border-[#8C2D19]/50"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"/>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* SEARCH RESULTS CHAMBER (when active)       */}
      {/* ═══════════════════════════════════════════ */}
      {isFiltered && (
        <div className="w-full bg-[#FAF7F0]">
          {/* Chamber header */}
          <div className="px-6 md:px-10 py-6 border-b border-[#D4AF37]/25 flex items-center justify-between flex-wrap gap-3">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#8C2D19] font-bold">Archive Search Results</span>
              <h3 className="font-serif text-xl font-bold text-[#3E2723] mt-0.5">
                {filteredScriptures.length} Exhibit{filteredScriptures.length !== 1 ? 's' : ''} Found
                {searchQuery && <span className="font-normal text-sm text-[#5D4037]"> &mdash; &ldquo;{searchQuery}&rdquo;</span>}
              </h3>
            </div>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#8C2D19]/40 text-[#8C2D19] text-[10px] font-mono uppercase tracking-wider hover:bg-[#8C2D19]/10 transition-all"
            >
              <X className="w-3 h-3"/> Clear Filters
            </button>
          </div>

          {filteredScriptures.length === 0 ? (
            <div className="text-center py-16 text-[#5D4037]">
              <p className="font-sanskrit text-2xl mb-2">नास्ति</p>
              <p className="font-serif text-sm">No manuscripts found. Try a different search term.</p>
            </div>
          ) : (
            <div className="p-6 md:p-8">
              <ExhibitsList
                scriptures={filteredScriptures}
                layout={layout}
                accentColor="#8C2D19"
                onRead={handleRead}
                onDownload={handleDownload}
              />
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* FULL MUSEUM TOUR (when no search active)   */}
      {/* ═══════════════════════════════════════════ */}
      {!isFiltered && (
        <>
          {/* ─── CENTRAL SANCTUM: BHAGAVAD GITA HERO ─── */}
          <section id="gita-sanctum" className="relative bg-[#100800] text-white overflow-hidden">
            {/* Grid texture */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `repeating-linear-gradient(0deg, #D4AF37 0, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, #D4AF37 0, transparent 1px, transparent 50px)`
            }}/>

            <div className="relative z-10 flex flex-col lg:flex-row items-center min-h-[500px]">
              {/* Left: Open manuscript artwork */}
              <div className="w-full lg:w-5/12 flex items-center justify-center p-10 lg:p-14 relative">
                <div className="relative w-full max-w-sm">
                  {/* Outer frame */}
                  <div className="absolute -inset-4 border border-[#D4AF37]/20"/>
                  <div className="absolute -inset-6 border border-[#D4AF37]/10"/>
                  {/* Gold corner ornaments */}
                  {[['top-0 left-0'],['top-0 right-0'],['bottom-0 left-0'],['bottom-0 right-0']].map(([pos],i) => (
                    <div key={i} className={`absolute ${pos} text-[#D4AF37] text-2xl font-bold select-none`}>✦</div>
                  ))}
                  {/* Manuscript SVG */}
                  <svg viewBox="0 0 400 300" className="w-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="gita-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="#100800" stopOpacity="0"/>
                      </radialGradient>
                      <linearGradient id="page-l" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#D7C4A5"/>
                        <stop offset="100%" stopColor="#F5E6CC"/>
                      </linearGradient>
                      <linearGradient id="page-r" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F5E6CC"/>
                        <stop offset="100%" stopColor="#D7C4A5"/>
                      </linearGradient>
                    </defs>
                    {/* Light rays */}
                    <circle cx="200" cy="150" r="180" fill="url(#gita-glow)"/>
                    <g opacity="0.15">
                      <polygon points="200,150 80,0 160,0" fill="#FFD700"/>
                      <polygon points="200,150 240,0 320,0" fill="#FFD700"/>
                      <polygon points="200,150 0,80 0,20" fill="#FFD700"/>
                      <polygon points="200,150 400,80 400,20" fill="#FFD700"/>
                    </g>
                    {/* Book */}
                    <rect x="60" y="40" width="280" height="220" rx="6" fill="#5D4037" stroke="#3E2723" strokeWidth="3"/>
                    {/* Pages */}
                    <path d="M70 55 Q165 48 198 58 L198 248 Q165 240 70 248Z" fill="url(#page-l)" stroke="#8C2D19" strokeWidth="0.8"/>
                    <path d="M330 55 Q235 48 202 58 L202 248 Q235 240 330 248Z" fill="url(#page-r)" stroke="#8C2D19" strokeWidth="0.8"/>
                    {/* Spine */}
                    <path d="M198 58 C200 54 200 54 202 58 L202 248 C200 250 200 250 198 248Z" fill="#3E2723"/>
                    {/* Left page text */}
                    <g fill="#3E2723" fontSize="8.5" fontFamily="serif" opacity="0.85">
                      <text x="85" y="90" fontWeight="bold">यद्यपि ये पापयोनयः</text>
                      <text x="85" y="108">स्त्रियो वैश्यास्तथा शूद्राः</text>
                      <text x="85" y="126" fontStyle="italic">तेऽपि यान्ति परां गतिम् ।</text>
                      <text x="85" y="155" fontWeight="bold">न मे पार्थास्ति कर्तव्यं</text>
                      <text x="85" y="173">त्रिषु लोकेषु किञ्चन ।</text>
                      <text x="85" y="200" fontStyle="italic">नानवाप्तमवाप्तव्यं</text>
                      <text x="85" y="218">वर्त एव च कर्मणि ॥</text>
                    </g>
                    {/* Right page text */}
                    <g fill="#3E2723" fontSize="8.5" fontFamily="serif" opacity="0.85">
                      <text x="210" y="90" fontWeight="bold">श्रेयान्स्वधर्मो विगुणः</text>
                      <text x="210" y="108">परधर्मात्स्वनुष्ठितात् ।</text>
                      <text x="210" y="126" fontStyle="italic">स्वधर्मे निधनं श्रेयः</text>
                      <text x="210" y="144">परधर्मो भयावहः ॥</text>
                      <text x="210" y="175" fontWeight="bold">ॐ तत्सत् इति श्रीमद्</text>
                      <text x="210" y="193">भगवद्गीतासूपनिषत्सु</text>
                      <text x="210" y="211" fontStyle="italic">ब्रह्मविद्यायां योगशास्त्रे</text>
                      <text x="210" y="229">श्रीकृष्णार्जुनसंवादे ॥</text>
                    </g>
                    {/* Gold lotus center decoration */}
                    <circle cx="200" cy="153" r="8" fill="#D4AF37" opacity="0.08"/>
                    <circle cx="200" cy="153" r="3" fill="#D4AF37" opacity="0.15"/>
                  </svg>
                </div>
              </div>

              {/* Right: Gita hero text */}
              <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-10 bg-[#D4AF37]/60"/>
                  <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#D4AF37]">Central Sanctum · Crown Jewel of the Archive</span>
                </div>

                <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-white leading-tight mb-2">
                  Bhagavad Gita
                </h2>
                <p className="font-sanskrit text-xl text-[#D4AF37] mb-4">श्रीमद्भगवद्गीता</p>

                <div className="flex items-center gap-2 mb-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 border border-[#D4AF37]/40 text-[#D4AF37]">
                    Mahabharat · c. 500 BCE
                  </span>
                  <span className="text-[10px] font-mono text-white/30">18 Chapters · 700 Verses</span>
                </div>

                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4 italic font-serif">
                  &ldquo;On the greatest battlefield ever conceived &mdash; the mind of Arjuna &mdash; the Supreme Divine spoke the eternal synthesis of Karma, Bhakti, and Jnana. These 700 verses have guided humanity through every crisis of faith for over two thousand years.&rdquo;
                </p>

                {/* Famous shloka */}
                <div className="border border-[#D4AF37]/25 p-4 mb-6 bg-[#D4AF37]/5">
                  <p className="font-sanskrit text-sm text-[#D4AF37] leading-relaxed mb-1">
                    यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।<br/>
                    अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥
                  </p>
                  <p className="text-white/50 text-[10px] font-serif italic">
                    &ldquo;Whenever dharma declines and adharma rises, I manifest myself.&rdquo; &mdash; Bhagavad Gita 4.7
                  </p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <Link
                    href="/library/gita"
                    onClick={() => playNavigate()}
                    className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#1A0A00] text-xs font-bold uppercase tracking-widest hover:bg-[#FFD700] transition-all no-underline font-serif"
                  >
                    <BookOpen className="w-4 h-4"/>
                    Enter the Gita
                  </Link>
                  <button
                    onClick={() => handleDownload(gitaScripture)}
                    className="flex items-center gap-2 px-6 py-3 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37]/10 transition-all font-serif bg-transparent"
                  >
                    <Download className="w-4 h-4"/>
                    Download Scroll
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"/>
          </section>

          {/* ─── 6 MUSEUM HALLS ─── */}
          {halls.map(hall => (
            <MuseumHall
              key={hall.id}
              id={hall.id}
              hallNumber={hall.hallNumber}
              hallName={hall.hallName}
              hallNameSanskrit={hall.hallNameSanskrit}
              era={hall.era}
              historicalContext={hall.historicalContext}
              atmosphere={hall.atmosphere}
              accentColor={hall.accentColor}
              bgFrom={hall.bgFrom}
              bgTo={hall.bgTo}
              artworkComponent={hall.artwork}
              scriptures={scripturesByCategory[hall.category] || []}
              layout={layout}
              onRead={handleRead}
              onDownload={handleDownload}
            />
          ))}

          {/* ─── MUSEUM FOOTER INSCRIPTION ─── */}
          <div className="bg-[#1A0A00] text-white py-10 px-6 text-center">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mb-8"/>
            <p className="font-sanskrit text-lg text-[#D4AF37] mb-2">सर्वे भवन्तु सुखिनः</p>
            <p className="text-white/40 text-xs font-mono uppercase tracking-widest">May All Beings Be Happy • Knowledge is Free Forever</p>
            <p className="text-white/20 text-[9px] font-mono mt-4 uppercase tracking-widest">Nalanda Digital Archives · Sacred Museum of Knowledge · सनातन विद्या</p>
          </div>
        </>
      )}

    </div>
  );
});

LibraryBrowser.displayName = "LibraryBrowser";
export default LibraryBrowser;
