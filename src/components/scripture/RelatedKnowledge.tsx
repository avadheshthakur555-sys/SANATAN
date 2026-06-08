"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Users, Compass, BookOpenCheck, MapPin, 
  History, Landmark, ChevronRight, Sparkles 
} from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useSacredSound } from "@/lib/sacred-audio";

interface RelatedFigure {
  name: string;
  nameSanskrit: string;
  role: string;
  desc: string;
}

interface RelatedConcept {
  name: string;
  nameSanskrit: string;
  desc: string;
}

interface RelatedPhilosophy {
  name: string;
  nameSanskrit: string;
  desc: string;
}

interface RelatedTemple {
  name: string;
  sanskrit: string;
  type: string;
  location: string;
  href: string;
  desc: string;
}

interface RelatedEra {
  title: string;
  era: string;
  approximateDate: string;
  desc: string;
}

interface RelatedKnowledgeData {
  texts: { slug: string; title: string; titleSanskrit: string; desc: string }[];
  figures: RelatedFigure[];
  concepts: RelatedConcept[];
  philosophies: RelatedPhilosophy[];
  temples: RelatedTemple[];
  era: RelatedEra;
}

const KNOWLEDGE_RESOURCES: Record<string, RelatedKnowledgeData> = {
  gita: {
    texts: [
      { slug: "mahabharata", title: "Mahabharata", titleSanskrit: "महाभारत", desc: "The epic container where the Gita resides as Chapters 23-40 of Bhishma Parva." },
      { slug: "yoga-sutras", title: "Yoga Sutras", titleSanskrit: "योग सूत्र", desc: "Patanjali's manual detailing the practical psychology of mind stillness." },
      { slug: "brihadaranyaka", title: "Brihadaranyaka Upanishad", titleSanskrit: "बृहदारण्यक उपनिषद", desc: "Explores the non-dual identity of the individual soul and absolute reality." }
    ],
    figures: [
      { name: "Sri Krishna", nameSanskrit: "श्रीकृष्ण", role: "Divine Charioteer & Teacher", desc: "The Supreme Avatar who freezes time on the battlefield of Kurukshetra to guide Arjuna." },
      { name: "Arjuna", nameSanskrit: "अर्जुन", role: "Warrior Disciple", desc: "The Pandava prince representing humanity in despair, facing duty and moral crisis." },
      { name: "Sage Veda Vyasa", nameSanskrit: "वेदव्यास", role: "Cosmic Compiler", desc: "The legendary rishi who compiled the Vedas, authored the Mahabharata and Gita." },
      { name: "Sanjaya", nameSanskrit: "सञ्जय", role: "Divine Visionary", desc: "The disciple of Vyasa gifted with clairvoyance to narrate the battle to King Dhritarashtra." }
    ],
    concepts: [
      { name: "Nishkama Karma", nameSanskrit: "निष्काम कर्म", desc: "Action performed purely out of duty, completely detached from its personal rewards." },
      { name: "Sthitaprajna", nameSanskrit: "स्थितप्रज्ञ", desc: "The person of steady wisdom, undisturbed by joy or grief, anchored in absolute stillness." },
      { name: "Swadharma", nameSanskrit: "स्वधर्म", desc: "One's unique personal duty and path, aligned with their nature and cosmic order." }
    ],
    philosophies: [
      { name: "Karma Yoga", nameSanskrit: "कर्मयोग", desc: "The path of self-realization through dedicated, selfless work." },
      { name: "Bhakti Yoga", nameSanskrit: "भक्तियोग", desc: "The path of absolute loving surrender and connection to personal divinity." },
      { name: "Jnana Yoga", nameSanskrit: "ज्ञानयोग", desc: "The path of philosophical inquiry, separating the eternal Soul from transient matter." }
    ],
    temples: [
      { name: "Jyotisar Temple", sanskrit: "ज्योतिसर तीर्थ", type: "Sacred Site", location: "Kurukshetra, Haryana", href: "/temples", desc: "The legendary spot beneath a holy banyan tree where the Bhagavad Gita was spoken." },
      { name: "Kashi Vishwanath", sanskrit: "काशी विश्वनाथ मन्दिर", type: "Jyotirlinga", location: "Varanasi, UP", href: "/jyotirlinga/kashi-vishwanath", desc: "The temple of Lord Shiva, who is the cosmic destination of Gita's path of liberation." }
    ],
    era: {
      title: "Mahabharata & Bhagavad Gita",
      era: "Dvapara Yuga",
      approximateDate: "approx. 3102 BCE",
      desc: "The transition era where high virtue begins to interface with complex human moral dilemmas."
    }
  },
  rigveda: {
    texts: [
      { slug: "brihadaranyaka", title: "Brihadaranyaka Upanishad", titleSanskrit: "बृहदारण्यक उपनिषद", desc: "Deepens the Rigvedic mystical insights into logical non-dual inquiries." },
      { slug: "shiva-purana", title: "Shiva Purana", titleSanskrit: "शिव पुराण", desc: "Transforms Rigvedic elemental hymns of Rudra into narrative descriptions of Shiva." }
    ],
    figures: [
      { name: "Sage Vashistha", nameSanskrit: "वसिष्ठ ऋषि", role: "Vedic Seer", desc: "One of the seven primordial Saptarishis, receiver and author of Rigveda's 7th Mandala." },
      { name: "Sage Vishvamitra", nameSanskrit: "विश्वामित्र ऋषि", role: "Gayatri Seer", desc: "The warrior-turned-sage who realized the Gayatri Mantra of cosmic intelligence." },
      { name: "Agni Devata", nameSanskrit: "अग्नि देव", role: "Cosmic Messenger", desc: "The deity of fire, serving as the bridge through whom sacrificial prayers reach the cosmos." }
    ],
    concepts: [
      { name: "Rta", nameSanskrit: "ऋत", desc: "The fundamental self-regulating order of the cosmos that ensures stars, seasons, and karma remain balanced." },
      { name: "Ekam Sat", nameSanskrit: "एकं सत्", desc: "The primordial declaration: 'Truth is One, though sages call it by many names' (Ekam Sat Vipra Bahudha Vadanti)." },
      { name: "Gayatri Mantra", nameSanskrit: "गायत्री मन्त्र", desc: "The supreme solar chant invoking divine light to illuminate human intellect." }
    ],
    philosophies: [
      { name: "Purva Mimamsa", nameSanskrit: "पूर्व मीमांसा", desc: "The philosophical school emphasizing the absolute vibration, sound, and action of Vedic chants." },
      { name: "Vedic Henotheism", nameSanskrit: "एकेश्वरवाद", desc: "The worship of diverse cosmic deities as localized representations of a single absolute truth." }
    ],
    temples: [
      { name: "Badrinath Temple", sanskrit: "बद्रीनाथ मन्दिर", type: "Char Dham", location: "Garhwal Hills, Uttarakhand", href: "/temples", desc: "The sacred abode of Narayana where Vedic rishis performed extreme penance." }
    ],
    era: {
      title: "Codification of Vedas",
      era: "Vedic Period",
      approximateDate: "c. 1500 - 1000 BCE",
      desc: "The golden age of oral mantra recitation where cosmic vibrations were first transcribed into human language."
    }
  },
  mahabharata: {
    texts: [
      { slug: "gita", title: "Bhagavad Gita", titleSanskrit: "श्रीमद्भगवद्गीता", desc: "The philosophical heart of the epic spoken by Krishna on the eve of the great war." },
      { slug: "ramayana", title: "Ramayana", titleSanskrit: "रामायण", desc: "The companion epic mapping the earlier Treta Yuga, detailing the life of Lord Rama." }
    ],
    figures: [
      { name: "Bhishma Pitamah", nameSanskrit: "भीष्म पितामह", role: "Grand Patriarch", desc: "The symbol of unyielding vows, who lay on a bed of arrows to teach the duties of kingship." },
      { name: "King Yudhishthira", nameSanskrit: "युधिष्ठिर", role: "Dharmaraja", desc: "The eldest Pandava brother, who represents truthfulness and the trial of righteous leadership." },
      { name: "Draupadi", nameSanskrit: "द्रौपदी", role: "Empress of Resolve", desc: "The fire-born princess whose humiliation triggered the dissolution of the Kuru dynasty." }
    ],
    concepts: [
      { name: "Purushartha", nameSanskrit: "पुरुषार्थ", desc: "The four goals of human life: Dharma (duty), Artha (wealth), Kama (desire), and Moksha (liberation)." },
      { name: "Karmic Retribution", nameSanskrit: "कर्मफल", desc: "The inescapable feedback loop of action, returning to individual agents across generations." }
    ],
    philosophies: [
      { name: "Rajadharma", nameSanskrit: "राजधर्म", desc: "The science of ethical governance, justice, and the duty of a ruler toward their citizens." }
    ],
    temples: [
      { name: "Kurukshetra Battlefield", sanskrit: "कुरुक्षेत्र तीर्थ", type: "Historical Site", location: "Haryana", href: "/temples", desc: "The grand plain where millions assembled and fought for the restoration of Dharma." },
      { name: "Kedarnath Temple", sanskrit: "केदारनाथ मन्दिर", type: "Jyotirlinga", location: "Garhwal Himalayas, Uttarakhand", href: "/jyotirlinga/kedarnath", desc: "Established by the Pandavas as a site of repentance after the Mahabharata war." }
    ],
    era: {
      title: "Mahabharata & Bhagavad Gita",
      era: "Dvapara Yuga",
      approximateDate: "approx. 3102 BCE",
      desc: "An era defined by moral gray areas, testing the absolute application of righteousness in human affairs."
    }
  },
  ramayana: {
    texts: [
      { slug: "mahabharata", title: "Mahabharata", titleSanskrit: "महाभारत", desc: "The later epic containing Rama's story summarized for the Pandavas in exile." }
    ],
    figures: [
      { name: "Lord Rama", nameSanskrit: "श्री राम", role: "Maryada Purushottama", desc: "The Seventh Avatar of Vishnu, who exemplified absolute compliance with righteousness under all trials." },
      { name: "Sita Devi", nameSanskrit: "सीता", role: "Goddess of Earthly Grace", desc: "The avatar of Lakshmi, representing silent strength, endurance, and immaculate fidelity." },
      { name: "Hanuman Ji", nameSanskrit: "हनुमान", role: "Embodiment of Devotion", desc: "The monkey-deity who combined unmatched strength and wisdom with total selflessness." },
      { name: "Sage Valmiki", nameSanskrit: "वाल्मीकि ऋषि", role: "Adi Kavi", desc: "The former highwayman who transformed into the poet of the first Sanskrit epic." }
    ],
    concepts: [
      { name: "Maryada", nameSanskrit: "मर्यादा", desc: "Living within the boundaries of social, family, and ethical duties at all costs." },
      { name: "Bhakti", nameSanskrit: "भक्ति", desc: "Unconditional love and service, where the ego is surrendered to the divine presence." }
    ],
    philosophies: [
      { name: "Bhagavata Dharma", nameSanskrit: "भागवत धर्म", desc: "The path of living directly in union with the personal supreme deity through devotion." }
    ],
    temples: [
      { name: "Rameshwaram Temple", sanskrit: "रामेश्वरम मन्दिर", type: "Char Dham / Jyotirlinga", location: "Pamban Island, Tamil Nadu", href: "/jyotirlinga/rameshwaram", desc: "The site where Rama built a sand Shiva Lingam to worship Shiva before invading Lanka." }
    ],
    era: {
      title: "Era of Rama",
      era: "Treta Yuga",
      approximateDate: "Ancient Antiquity",
      desc: "The age where human dharma was ideal, clear, and perfectly modeled by the avatar."
    }
  },
  "shiva-purana": {
    texts: [
      { slug: "yoga-sutras", title: "Yoga Sutras", titleSanskrit: "योग सूत्र", desc: "Practical manual of the yoga path of which Shiva is the cosmic patron (Adiyogi)." },
      { slug: "rigveda", title: "Rigveda", titleSanskrit: "ऋग्वेद", desc: "Contains the early seeds of Shaiva thought in the hymns to Lord Rudra." }
    ],
    figures: [
      { name: "Lord Shiva", nameSanskrit: "शिव", role: "Mahadeva & Adiyogi", desc: "The ultimate consciousness, representing both absolute stillness and dynamic cosmic dissolution." },
      { name: "Devi Parvati", nameSanskrit: "पार्वती", role: "Jagadamba & Shakti", desc: "The goddess of power, manifestation, and intense ascetic devotion who anchors Shiva to the material plane." },
      { name: "Lord Ganesha", nameSanskrit: "गणेश", role: "Vighnaharta", desc: "The elephant-headed master of wisdom, remover of all obstacles, born from Parvati's grace." },
      { name: "Lord Kartikeya", nameSanskrit: "कार्तिकेय", role: "Devasenapati", desc: "The general of the celestial armies, representing cosmic defense and focused intent." }
    ],
    concepts: [
      { name: "Shiva-Shakti", nameSanskrit: "शिवशक्ति", desc: "The inseparable union of unchanging consciousness (Shiva) and active kinetic energy (Shakti)." },
      { name: "Linga", nameSanskrit: "लिङ्ग", desc: "The formless pillar of light representing the beginningless and endless nature of the absolute." },
      { name: "Tapas", nameSanskrit: "तपस्", desc: "Fierce, heat-generating meditation and self-discipline to transcend worldly boundaries." }
    ],
    philosophies: [
      { name: "Shaiva Siddhanta", nameSanskrit: "शैवसिद्धान्त", desc: "A system of dualist-nondualist yoga tracing the soul's path back to its source, Shiva." },
      { name: "Kashmir Shaivism", nameSanskrit: "प्रत्यभिज्ञा", desc: "A non-dual tantric philosophy emphasizing the direct recognition of the universe as Shiva's play." }
    ],
    temples: [
      { name: "Kedarnath Temple", sanskrit: "केदारनाथ मन्दिर", type: "Jyotirlinga", location: "Uttarakhand", href: "/jyotirlinga/kedarnath", desc: "The snow-covered mountain temple representing Shiva's aspect as the protector of seekers." },
      { name: "Somnath Temple", sanskrit: "सोमनाथ मन्दिर", type: "Jyotirlinga", location: "Gujarat", href: "/jyotirlinga/somnath", desc: "The 'Temple of the Moon God', representing the eternal rebuilding of faith over destruction." }
    ],
    era: {
      title: "Puranic Integration",
      era: "Golden Age",
      approximateDate: "c. 300 - 600 CE",
      desc: "The era where abstract Vedic realizations were translated into popular, narrative epic stories."
    }
  },
  brihadaranyaka: {
    texts: [
      { slug: "gita", title: "Bhagavad Gita", titleSanskrit: "श्रीमद्भगवद्गीता", desc: "Builds upon the Upanishadic self-realization to create a path of active duty." },
      { slug: "rigveda", title: "Rigveda", titleSanskrit: "ऋग्वेद", desc: "The primary veda of which this Upanishad is the concluding forest book (Aranyaka)." }
    ],
    figures: [
      { name: "Sage Yajnavalkya", nameSanskrit: "याज्ञवल्क्य ऋषि", role: "Non-Dual Rishi", desc: "The preeminent scholar who declared the identity of the individual soul and absolute consciousness." },
      { name: "Maitreyi", nameSanskrit: "मैत्रेयी", role: "Philosopher Wife", desc: "The wife of Yajnavalkya who rejected material wealth, asking: 'What shall I do with that which does not give me immortality?'" },
      { name: "Gargi Vachaknavi", nameSanskrit: "गार्गी वाचक्नवी", role: "Vedic Debater", desc: "The brilliant woman philosopher who publicly challenged Yajnavalkya with profound cosmological questions." }
    ],
    concepts: [
      { name: "Neti Neti", nameSanskrit: "नेति नेति", desc: "The analytical process of negation: 'Not this, Not that', to strip away false identities of the soul." },
      { name: "Aham Brahmasmi", nameSanskrit: "अहं ब्रह्मास्मि", desc: "The great realization: 'I am the absolute reality', recognizing universal divinity within the self." },
      { name: "Tamaso Ma Jyotirgamaya", nameSanskrit: "तमसो मा ज्योतिर्गमय", desc: "The sacred prayer: 'Lead me from darkness to light, from ignorance to truth, from death to immortality.'" }
    ],
    philosophies: [
      { name: "Advaita Vedanta", nameSanskrit: "अद्वैत वेदान्त", desc: "The pure non-dual philosophy declaring that Brahman is the only reality, and the world is its reflection." }
    ],
    temples: [
      { name: "Mithila Realm", sanskrit: "मिथिला धाम", type: "Sacred Region", location: "Bihar / Nepal border", href: "/temples", desc: "The ancient kingdom of Janaka, serving as the cultural cradle for high Upanishadic debates." }
    ],
    era: {
      title: "The Jnana Kanda Era",
      era: "Upanishadic Age",
      approximateDate: "c. 1000 - 600 BCE",
      desc: "The age of intense inward inquiry where outer fire rituals were internalized into mental meditation."
    }
  },
  "yoga-sutras": {
    texts: [
      { slug: "gita", title: "Bhagavad Gita", titleSanskrit: "श्रीमद्भगवद्गीता", desc: "Presents the theological and ethical applications of the yogic mental discipline." },
      { slug: "brihadaranyaka", title: "Brihadaranyaka Upanishad", titleSanskrit: "बृहदारण्यक उपनिषद", desc: "Explores the nature of consciousness that yoga seeks to isolate and quiet." }
    ],
    figures: [
      { name: "Sage Patanjali", nameSanskrit: "पतञ्जलि ऋषि", role: "Compiler of Yoga", desc: "The master grammarian and philosopher who codified the scattered practices of yoga into 196 sutras." },
      { name: "Sage Vyasa", nameSanskrit: "व्यास देव", role: "First Commentator", desc: "Wrote the Vyasa Bhashya, the oldest and most authoritative commentary explaining the concise sutras." }
    ],
    concepts: [
      { name: "Chitta Vritti Nirodha", nameSanskrit: "चित्तवृत्तिनिरोध", desc: "The absolute definition of yoga: 'The calming of the turbulent fluctuations of the mind-stuff.'" },
      { name: "Ashtanga", nameSanskrit: "अष्टाङ्ग", desc: "The eight limbs of yoga: Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, and Samadhi." },
      { name: "Kaivalya", nameSanskrit: "कैवल्य", desc: "The state of absolute independence and liberation, where consciousness is isolated from material nature." }
    ],
    philosophies: [
      { name: "Yoga Darshana", nameSanskrit: "योग दर्शन", desc: "The practical school of mental cultivation, meditation, and control." },
      { name: "Samkhya Dualism", nameSanskrit: "सांख्य", desc: "The analytical framework separating Purusha (Spirit) and Prakriti (Matter) that yoga uses as its roadmap." }
    ],
    temples: [
      { name: "Chidambaram Temple", sanskrit: "चिदंबरम नटराज मन्दिर", type: "Shiva Temple", location: "Tamil Nadu", href: "/temples", desc: "The temple where Patanjali is said to have witnessed Shiva's Tandava and composed yoga treatises." }
    ],
    era: {
      title: "Patanjali & Panini",
      era: "Sutra Literature",
      approximateDate: "c. 400 - 150 BCE",
      desc: "The age of standardizing, writing down, and framing vast oral traditions into highly compressed sutra codes."
    }
  },
  arthashastra: {
    texts: [
      { slug: "mahabharata", title: "Mahabharata", titleSanskrit: "महाभारत", desc: "Contains the Shanti Parva which discusses royal statecraft and political strategy." }
    ],
    figures: [
      { name: "Chanakya (Kautilya)", nameSanskrit: "चाणक्य", role: "Royal Prime Minister", desc: "The master strategist and professor of Taxila who united India and authored the Arthashastra." },
      { name: "Chandragupta Maurya", nameSanskrit: "चन्द्रगुप्त मौर्य", role: "Founder Emperor", desc: "The disciple of Chanakya who established the Mauryan Empire under Arthashastra guidelines." }
    ],
    concepts: [
      { name: "Saptanga", nameSanskrit: "सप्ताङ्ग", desc: "The seven limbs of a state: Ruler, Minister, Territory, Fort, Treasury, Army, and Ally." },
      { name: "Mandala Theory", nameSanskrit: "मण्डल सिद्धान्त", desc: "The geopolitics of circle alliances: 'Your neighbor is your natural adversary, and your neighbor's neighbor is your natural ally.'" },
      { name: "Dandaniti", nameSanskrit: "दण्डनीति", desc: "The administration of law, justice, and state-sanctioned punishment to prevent anarchy." }
    ],
    philosophies: [
      { name: "Anvikshiki", nameSanskrit: "आन्वीक्षिकी", desc: "The science of logical, critical thinking, which Chanakya claimed was the lamp of all sciences." }
    ],
    temples: [
      { name: "Taxila Ruins", sanskrit: "तक्षशिला", type: "Ancient University", location: "Historical Gandhara region", href: "/temples", desc: "The preeminent ancient university where Chanakya studied, taught, and planned the empire." }
    ],
    era: {
      title: "The Six Darshanas",
      era: "Philosophy Age",
      approximateDate: "c. 600 - 200 BCE",
      desc: "The era of high intellectual codification, debate, and creation of structured socio-political treatises."
    }
  }
};

const TRANSLATIONS = {
  EN: {
    title: "Sacred Relational Map",
    subtitle: "Dharmic Knowledge Connections",
    texts: "Associated Scriptures",
    figures: "Figures & Rishi Seers",
    concepts: "Philosophical Concepts",
    philosophies: "Schools of thought",
    temples: "Pilgrimages & Temples",
    era: "Historical Timeline",
    exploreText: "Explore Manuscript",
    exploreTemple: "Visit Sacred Site",
    viewTimeline: "View Yuga Timeline",
    approxDate: "Approx. Date",
    description: "Discover the interconnected web of deities, sages, concepts, and geographical sites that surround this sacred manuscript."
  },
  HI: {
    title: "सम्बद्ध ज्ञान चक्र",
    subtitle: "धार्मिक ज्ञान कड़ियाँ",
    texts: "सम्बद्ध शास्त्र",
    figures: "व्यक्तित्व एवं ऋषि",
    concepts: "दार्शनिक अवधारणाएं",
    philosophies: "विचारधाराएं",
    temples: "तीर्थ एवं मंदिर",
    era: "ऐतिहासिक समयरेखा",
    exploreText: "ग्रंथ का अन्वेषण करें",
    exploreTemple: "पवित्र स्थल देखें",
    viewTimeline: "युग कालक्रम देखें",
    approxDate: "अनुमानित समय",
    description: "इस पवित्र पांडुलिपि के चारों ओर देवी-देवताओं, ऋषियों, विचारों और भौगोलिक स्थानों के परस्पर जुड़े हुए जाल की खोज करें।"
  },
  SA: {
    title: "सम्बद्धज्ञानचक्रम्",
    subtitle: "धार्मिकज्ञानसम्बन्धाः",
    texts: "सम्बद्धाः ग्रन्थाः",
    figures: "ऋषयः पात्राणि च",
    concepts: "दार्शनिकविचाराः",
    philosophies: "दर्शनानि",
    temples: "तीर्थानि मन्दिराणि च",
    era: "ऐतिहासिककालरेखा",
    exploreText: "ग्रन्थस्य अन्वेषणं कुरु",
    exploreTemple: "पवित्रस्थानं पश्य",
    viewTimeline: "युगकालक्रमं पश्य",
    approxDate: "अनुमानितकालः",
    description: "अस्य ग्रन्थस्य सम्बद्धानां ऋषीणां, विचाराणां, मन्दिराणां च धार्मिकसम्बन्धानां चक्रम् अन्विष्यताम्।"
  }
};

interface RelatedKnowledgeProps {
  slug: string;
}

export default function RelatedKnowledge({ slug }: RelatedKnowledgeProps) {
  const { language } = useLanguageStore();
  const { playClick, playNavigate } = useSacredSound();
  const [activeTab, setActiveTab] = useState<"all" | "texts" | "figures" | "concepts" | "philosophies" | "temples" | "era">("all");

  const resource = KNOWLEDGE_RESOURCES[slug.toLowerCase()] || KNOWLEDGE_RESOURCES.gita;
  const labels = TRANSLATIONS[language] || TRANSLATIONS.EN;

  const tabOptions = [
    { id: "all", label: language === "HI" ? "सभी" : language === "SA" ? "सर्वम्" : "All Map", icon: Sparkles },
    { id: "texts", label: labels.texts, icon: BookOpen },
    { id: "figures", label: labels.figures, icon: Users },
    { id: "concepts", label: labels.concepts, icon: Compass },
    { id: "philosophies", label: labels.philosophies, icon: BookOpenCheck },
    { id: "temples", label: labels.temples, icon: Landmark },
    { id: "era", label: labels.era, icon: History }
  ] as const;

  const handleTabClick = (tabId: typeof activeTab) => {
    playClick();
    setActiveTab(tabId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="w-full bg-[#FCFAF2] dark:bg-[#0E0914] border border-[#D4AF37]/35 rounded-sm p-6 md:p-8 mt-12 shadow-sm relative overflow-hidden font-serif">
      {/* Decorative Golden Ornaments */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8C2D19] via-[#D4AF37] to-[#8C2D19]" />
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#D4AF37]/50" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#D4AF37]/50" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#D4AF37]/50" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#D4AF37]/50" />

      {/* Header Description */}
      <div className="text-center mb-8">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C2D19] dark:text-[#E07A5F] font-bold block mb-1">
          {labels.subtitle}
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-[#3E2723] dark:text-[#F4EAD4] tracking-wide uppercase">
          {labels.title}
        </h3>
        <p className="text-xs md:text-sm text-[#5D4037] dark:text-[#B2A497] max-w-2xl mx-auto mt-2 leading-relaxed italic">
          {labels.description}
        </p>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
      </div>

      {/* Interactive Tabs Menu */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 border-b border-[#D4AF37]/15 pb-4">
        {tabOptions.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-[10px] md:text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer
                ${isActive 
                  ? "bg-[#8C2D19] border-[#8C2D19] text-[#FAF7F0] shadow-md dark:bg-[#D4AF37] dark:border-[#D4AF37] dark:text-[#0E0914] font-bold" 
                  : "bg-white/40 dark:bg-white/5 border-[#D4AF37]/30 text-[#8D6E63] hover:text-[#3E2723] dark:hover:text-white hover:border-[#8C2D19] dark:hover:border-[#D4AF37]"}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Display Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* 1. Associated Scriptures */}
          {(activeTab === "all" || activeTab === "texts") && resource.texts.map((item) => (
            <motion.div
              key={item.slug}
              variants={itemVariants}
              className="bg-white/70 dark:bg-white/5 border border-[#D4AF37]/25 p-5 rounded-sm flex flex-col justify-between hover:border-[#8C2D19] dark:hover:border-[#D4AF37] hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(212,175,55,0.03)] transition-all duration-382 group"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-[#8C2D19] dark:text-[#FF8C00] bg-[#8C2D19]/5 px-2 py-0.5 rounded-sm">
                    {labels.texts}
                  </span>
                  <BookOpen className="w-4 h-4 text-[#D4AF37] group-hover:rotate-6 transition-transform" />
                </div>
                <h4 className="font-sanskrit text-sm font-semibold text-[#8C2D19] dark:text-[#D4AF37] leading-none">
                  {item.titleSanskrit}
                </h4>
                <h5 className="font-serif text-base font-bold text-[#3E2723] dark:text-white mt-1.5">
                  {item.title}
                </h5>
                <p className="text-xs text-[#5D4037] dark:text-[#A09385] leading-relaxed mt-2.5 italic">
                  {item.desc}
                </p>
              </div>
              <Link
                href={`/library/${item.slug}`}
                onClick={() => playNavigate()}
                className="inline-flex items-center gap-1 text-[10px] font-mono uppercase font-bold text-[#8C2D19] dark:text-[#D4AF37] hover:text-[#3E2723] dark:hover:text-white transition-colors border-b border-transparent hover:border-[#8C2D19] dark:hover:border-[#D4AF37] pb-0.5 mt-5 self-start no-underline"
              >
                <span>{labels.exploreText}</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}

          {/* 2. Key Historical Figures */}
          {(activeTab === "all" || activeTab === "figures") && resource.figures.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white/70 dark:bg-white/5 border border-[#D4AF37]/25 p-5 rounded-sm flex flex-col justify-between hover:border-[#8C2D19] dark:hover:border-[#D4AF37] hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(212,175,55,0.03)] transition-all duration-382 group"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-[#8D6E63] dark:text-gray-400 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-sm">
                    {labels.figures}
                  </span>
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className="font-serif text-base font-bold text-[#3E2723] dark:text-white">
                    {item.name}
                  </h4>
                  <span className="font-sanskrit text-xs text-[#D4AF37] font-semibold">
                    {item.nameSanskrit}
                  </span>
                </div>
                <span className="text-[9px] font-mono uppercase text-[#8C2D19] dark:text-[#FF8C00] tracking-wider block mt-1 font-bold">
                  {item.role}
                </span>
                <p className="text-xs text-[#5D4037] dark:text-[#A09385] leading-relaxed mt-3">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}

          {/* 3. Core Concepts */}
          {(activeTab === "all" || activeTab === "concepts") && resource.concepts.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white/70 dark:bg-white/5 border border-[#D4AF37]/25 p-5 rounded-sm flex flex-col justify-between hover:border-[#8C2D19] dark:hover:border-[#D4AF37] hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(212,175,55,0.03)] transition-all duration-382 group"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-[#8C2D19] dark:text-[#FF8C00] bg-[#8C2D19]/5 px-2 py-0.5 rounded-sm">
                    {labels.concepts}
                  </span>
                  <Compass className="w-4 h-4 text-[#D4AF37] group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className="font-serif text-base font-bold text-[#3E2723] dark:text-white">
                    {item.name}
                  </h4>
                  <span className="font-sanskrit text-xs text-[#C5A059] font-bold">
                    {item.nameSanskrit}
                  </span>
                </div>
                <p className="text-xs text-[#5D4037] dark:text-[#A09385] leading-relaxed mt-3">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}

          {/* 4. Philosophical Systems */}
          {(activeTab === "all" || activeTab === "philosophies") && resource.philosophies.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white/70 dark:bg-white/5 border border-[#D4AF37]/25 p-5 rounded-sm flex flex-col justify-between hover:border-[#8C2D19] dark:hover:border-[#D4AF37] hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(212,175,55,0.03)] transition-all duration-382 group"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-[#8D6E63] dark:text-gray-400 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-sm">
                    {labels.philosophies}
                  </span>
                  <BookOpenCheck className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className="font-serif text-base font-bold text-[#3E2723] dark:text-white">
                    {item.name}
                  </h4>
                  <span className="font-sanskrit text-xs text-[#C5A059] font-bold">
                    {item.nameSanskrit}
                  </span>
                </div>
                <p className="text-xs text-[#5D4037] dark:text-[#A09385] leading-relaxed mt-3">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}

          {/* 5. Geographic Vortexes / Temples */}
          {(activeTab === "all" || activeTab === "temples") && resource.temples.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white/70 dark:bg-white/5 border border-[#D4AF37]/25 p-5 rounded-sm flex flex-col justify-between hover:border-[#8C2D19] dark:hover:border-[#D4AF37] hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(212,175,55,0.03)] transition-all duration-382 group"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-[#8C2D19] dark:text-[#FF8C00] bg-[#8C2D19]/5 px-2 py-0.5 rounded-sm">
                    {labels.temples}
                  </span>
                  <Landmark className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <h4 className="font-sanskrit text-sm font-semibold text-[#8C2D19] dark:text-[#D4AF37] leading-none">
                  {item.sanskrit}
                </h4>
                <h5 className="font-serif text-base font-bold text-[#3E2723] dark:text-white mt-1.5">
                  {item.name}
                </h5>
                <div className="flex items-center gap-1 text-[10px] text-[#8D6E63] font-mono uppercase tracking-wider mt-1 font-bold">
                  <MapPin className="w-3 h-3 text-[#8C2D19] dark:text-[#D4AF37]" />
                  <span>{item.location}</span>
                </div>
                <p className="text-xs text-[#5D4037] dark:text-[#A09385] leading-relaxed mt-3">
                  {item.desc}
                </p>
              </div>
              <Link
                href={item.href}
                onClick={() => playNavigate()}
                className="inline-flex items-center gap-1 text-[10px] font-mono uppercase font-bold text-[#8C2D19] dark:text-[#D4AF37] hover:text-[#3E2723] dark:hover:text-white transition-colors border-b border-transparent hover:border-[#8C2D19] dark:hover:border-[#D4AF37] pb-0.5 mt-5 self-start no-underline"
              >
                <span>{labels.exploreTemple}</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}

          {/* 6. Timeline Era */}
          {(activeTab === "all" || activeTab === "era") && (
            <motion.div
              variants={itemVariants}
              className="bg-white/70 dark:bg-white/5 border border-[#D4AF37]/25 p-5 rounded-sm flex flex-col justify-between hover:border-[#8C2D19] dark:hover:border-[#D4AF37] hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(212,175,55,0.03)] transition-all duration-382 group md:col-span-2 lg:col-span-3"
            >
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-[#8D6E63] dark:text-gray-400 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-sm">
                      {labels.era}
                    </span>
                    <History className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <h4 className="font-mono text-xs text-[#8C2D19] dark:text-[#FF8C00] uppercase tracking-wider font-bold">
                    {resource.era.era}
                  </h4>
                  <h5 className="font-serif text-lg font-bold text-[#3E2723] dark:text-white mt-1">
                    {resource.era.title}
                  </h5>
                  <div className="text-[10px] font-mono text-[#8D6E63] dark:text-gray-400 mt-1 uppercase">
                    <strong>{labels.approxDate}:</strong> {resource.era.approximateDate}
                  </div>
                  <p className="text-xs text-[#5D4037] dark:text-[#A09385] leading-relaxed mt-3 italic max-w-3xl">
                    {resource.era.desc}
                  </p>
                </div>
                
                <Link
                  href="/history"
                  onClick={() => playNavigate()}
                  className="shrink-0 self-start md:self-center bg-[#8C2D19] dark:bg-[#D4AF37] hover:bg-[#A0351E] dark:hover:bg-[#FFD700] text-white dark:text-[#0E0914] px-4 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-md no-underline inline-flex items-center gap-1.5"
                >
                  <span>{labels.viewTimeline}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
