"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Scroll, Search, X, BookOpen, Quote, Calendar, GitCommit, LayoutGrid, List } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { id: "all", label: "All Sages" },
  { id: "vedic", label: "Vedic & Saptarishis" },
  { id: "epic", label: "Epic & Upanishadic" },
  { id: "classical", label: "Classical Philosophy" },
  { id: "bhakti", label: "Bhakti & Vedanta" },
  { id: "modern", label: "Modern Masters" }
];

interface Sage {
  name: string;
  sanskrit: string;
  era: string;
  category: "vedic" | "epic" | "classical" | "bhakti" | "modern";
  majorWork: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  quote?: string;
  teachings?: string[];
  lineage?: string;
  image: string; // Curated painting image path
  attributes: {
    name: string;
    label: string;
    icon: string; // SVG icon identifier
  }[];
}

const SAGES_DATA: Sage[] = [
  {
    name: "Sage Agastya",
    sanskrit: "अगस्त्य",
    era: "Vedic Period",
    category: "vedic",
    majorWork: "Lalitha Sahasranama, Agastya Samhita, Aditya Hrudayam",
    subtitle: "Pioneer of Tamil Grammar & Siddha Medicine",
    image: "/images/sages/agastya.png",
    description: "One of the legendary Saptarishis (Seven Great Seers), credited with pioneering early Tamil grammar, bringing Vedic culture to southern India, and presenting the Aditya Hrudayam to Lord Rama.",
    detailedDescription: "Sage Agastya is a revered Vedic sage who bridges the spiritual landscapes of northern and southern India. According to legend, his intense meditation enabled him to drink the oceans to help the Devas defeat hiding demons, and he humbled the Vindhya mountains when they grew too high. In Tamil tradition, he is revered as 'Agastiyar', the father of the Tamil language and Siddha medicine.",
    quote: "Surya is the soul of all universe, both animate and inanimate. Meditate on Him to conquer all enemies and obstacles.",
    teachings: [
      "Integration of Vedic rituals with internal yogic meditation (Pranayama).",
      "Worship of the supreme consciousness through the solar energy (Suryopasana).",
      "Pioneering natural healing methodologies using herbs, breathing, and metals."
    ],
    lineage: "Mind-born son of Brahma / Born from a water pitcher (Kumbh-bhava). Husband of Rishika Lopamudra.",
    attributes: [
      { name: "Kumbha", label: "Water Pitcher", icon: "kumbha" },
      { name: "Aditya", label: "Solar Disc", icon: "aditya" }
    ]
  },
  {
    name: "Sage Vashistha",
    sanskrit: "वसिष्ठ",
    era: "Vedic Period",
    category: "vedic",
    majorWork: "Rigveda Mandala 7, Vashistha Samhita, Yoga Vasistha",
    subtitle: "Guru of the Solar Dynasty & Royal Preceptor",
    image: "/images/sages/vashistha.png",
    description: "A preeminent Saptarishi and the royal preceptor (Guru) of the Solar Dynasty (Suryavansha), guiding ancestors of Lord Rama. He represents the pinnacle of spiritual composure and ascetic power.",
    detailedDescription: "Sage Vashistha is one of the pillars of the Vedic tradition. He owned the divine wish-fulfilling cow Kamadhenu, which symbolized the abundance of spiritual power over material might, successfully resisting the army of Vishwamitra. His dialogues with Lord Rama in the 'Yoga Vasistha' form one of the greatest treatises on non-dual philosophy (Advaita) and the nature of consciousness.",
    quote: "The world is as you perceive it. When the mind is purified, the universe is recognized as the play of pure consciousness.",
    teachings: [
      "Advaita Vedanta: The non-dual relationship between Atman and Brahman.",
      "The power of self-effort (Prarabdha) over passive reliance on fate.",
      "Mental dissolution (Manonasha) as the key to ultimate liberation (Moksha)."
    ],
    lineage: "One of the Saptarishis, mind-born son of Brahma. Husband of Arundhati.",
    attributes: [
      { name: "Kamadhenu", label: "Sacred Cow", icon: "kamadhenu" },
      { name: "Arundhati", label: "Twin Star", icon: "arundhati" }
    ]
  },
  {
    name: "Sage Vishwamitra",
    sanskrit: "विश्वामित्र",
    era: "Vedic Period",
    category: "vedic",
    majorWork: "Rigveda Mandala 3, Gayatri Mantra",
    subtitle: "The Brahmarishi who Received the Gayatri Mantra",
    image: "/images/sages/vishwamitra.png",
    description: "A powerful warrior king who achieved the status of Brahmarishi through thousands of years of extreme penance. He is the seer who received the Gayatri Mantra, the most sacred chant of Sanatan Dharma.",
    detailedDescription: "Originally King Kaushika, he renounced his throne and underwent rigorous tapasyas to challenge Sage Vashistha's spiritual power. Despite numerous trials, including temptations by Menaka, he transcended anger, ego, and desire to be recognized by Vashistha himself as a 'Brahmarishi'. He guided young Lord Rama and Lakshmana, imparting sacred weapons and introducing Rama to Sita.",
    quote: "Let us meditate on the glorious splendor of the divine Vivifier; may He illumine our minds.",
    teachings: [
      "Spiritual transformation is possible for any individual through pure willpower and penance.",
      "Transmission of the Gayatri Mantra for intellectual and spiritual illumination.",
      "Dharma must be protected by aligning courage (Kshatriya) with wisdom (Brahmana)."
    ],
    lineage: "Descendant of King Kusha. Guru of Lord Rama and Lakshmana.",
    attributes: [
      { name: "Gayatri", label: "Sun Halo", icon: "gayatri" },
      { name: "Kshatra", label: "Sacred Sword", icon: "kshatra" }
    ]
  },
  {
    name: "Sage Veda Vyasa",
    sanskrit: "वेदव्यास",
    era: "Dvapara Yuga",
    category: "epic",
    majorWork: "Vedas Classification, Mahabharata, 18 Puranas, Brahma Sutras",
    subtitle: "Compiler of the Vedas and Composer of Mahabharata",
    image: "/images/sages/vyasa.png",
    description: "The legendary compiler who classified the primordial single Veda into four distinct books (Rig, Yajur, Sama, Atharva) to ensure their preservation, and composed the Mahabharata epic and Puranas.",
    detailedDescription: "Born as Krishna Dvaipayana, Vyasa is considered an expansion of Lord Vishnu's intelligence. Recognizing that human memory would decline in Kali Yuga, he organized the Vedic hymns and taught them to his disciples. He witnessed the Kurukshetra war and composed the Mahabharata, embedding the Bhagavad Gita within it.",
    quote: "In all the eighteen Puranas, Vyasa has said only two things: helping others is virtue, and hurting others is sin.",
    teachings: [
      "Classification and preservation of Vedic knowledge for posterity.",
      "The priority of selfless service (Paropakara) and non-injury (Ahimsa).",
      "Compiling the histories (Itihasa) to teach ethical values to common people."
    ],
    lineage: "Son of Sage Parashara and Satyavati. Father of Sage Shukadeva.",
    attributes: [
      { name: "Scripture", label: "Manuscripts", icon: "scripture" },
      { name: "Lekhani", label: "Writing Quill", icon: "lekhani" }
    ]
  },
  {
    name: "Sage Valmiki",
    sanskrit: "वाल्मीकि",
    era: "Treta Yuga",
    category: "epic",
    majorWork: "Ramayana, Yoga Vasistha",
    subtitle: "Revered Adi Kavi and Author of Ramayana",
    image: "/images/sages/valmiki.png",
    description: "Revered as the Adi Kavi (the first poet) of Sanskrit literature. He composed the Ramayana epic detailing the life and righteousness of Lord Rama and received Sita in his forest hermitage.",
    detailedDescription: "Originally a highway robber named Ratnakara, he was transformed after Sage Narada taught him to repeat the name of Rama (initially as 'Mara' due to his sins). He sat in deep meditation for so long that an anthill (Valmika) grew around him, earning him the name Valmiki. He composed the Ramayana in the sublime Anustubh meter.",
    quote: "Even a small act of righteousness done with pure intent creates ripples across the cosmic fabric.",
    teachings: [
      "Maryada: The path of duty, honor, and boundaries exemplified by Lord Rama.",
      "Power of chanting and transformation of character.",
      "Providing refuge to the distressed and abandoned."
    ],
    lineage: "Disciple of Narada Muni. Guru of Rama's sons, Luv and Kush.",
    attributes: [
      { name: "Krauncha", label: "Heron Birds", icon: "krauncha" },
      { name: "Kusha", label: "Sacred Grass", icon: "kusha" }
    ]
  },
  {
    name: "Sage Patanjali",
    sanskrit: "पतञ्जलि",
    era: "c. 2nd Century BCE",
    category: "classical",
    majorWork: "Yoga Sutras, Mahabhasya, Patanjalatantra",
    subtitle: "The Great Philosopher who Codified Yoga Sutras",
    image: "/images/sages/patanjali.png",
    description: "The divine philosopher who codified the practices of mental control, breath, and meditation into the 196 aphorisms of the Yoga Sutras, establishing the foundation of Classical Yoga.",
    detailedDescription: "Patanjali is regarded as an incarnation of Ananta Shesha (the thousand-headed serpent of Lord Vishnu), symbolizing infinite patience and mastery over speech and body. He unified the ancient, scattered practices of Yoga into a structured, scientific eight-limbed system (Ashtanga Yoga), providing a clear pathway for mind control.",
    quote: "Yoga is the cessation of the fluctuations of the mind-stuff.",
    teachings: [
      "Ashtanga Yoga: Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, and Samadhi.",
      "Chitta-Vritti-Nirodha: Quieting the mind to allow the Seer (Drashta) to abide in its true nature.",
      "Kriya Yoga: Tapas (discipline), Svadhyaya (self-study), and Ishvara Pranidhana (surrender to God)."
    ],
    lineage: "Considered the student of Sage Nandikeshvara.",
    attributes: [
      { name: "Shesha", label: "Serpent Halo", icon: "shesha" },
      { name: "Ashtanga", label: "Yogic Lotus", icon: "ashtanga" }
    ]
  },
  {
    name: "Adi Shankaracharya",
    sanskrit: "आदि शङ्कराचार्य",
    era: "c. 788 CE – 820 CE",
    category: "bhakti",
    majorWork: "Prasthanatrayi Bhashya, Vivekachudamani, Bhaja Govindam, Soundarya Lahari",
    subtitle: "Reviver of Advaita Vedanta and Monastic Mathas",
    image: "/images/sages/shankara.png",
    description: "The philosopher-saint who consolidated Advaita Vedanta (non-dualism). He traveled across the subcontinent, revived temple traditions, and established the four monastic seats (Mathas).",
    detailedDescription: "Born in Kalady, Kerala, Shankara renounced the world at a young age. He walked across India twice, debating and defeating rival schools of philosophy to establish the supremacy of Advaita. He founded four Mathas at Sringeri, Puri, Dwarka, and Jyotirmath to safeguard the Vedic tradition, and composed sweet devotional hymns alongside dry logic.",
    quote: "Brahman is the only truth, the world is a projection, and the individual soul is none other than Brahman.",
    teachings: [
      "Advaita Vedanta: Non-duality of the Self and the Supreme.",
      "Jnana Yoga: Spiritual realization is achieved primarily through knowledge, not mere rituals.",
      "Sadhana Chatushtaya: The four prerequisites for a seeker: discrimination, dispassion, control, and yearning."
    ],
    lineage: "Disciple of Govinda Bhagavatpada, grand-disciple of Gaudapada.",
    attributes: [
      { name: "Kamandalu", label: "Water Pot", icon: "kamandalu" },
      { name: "Danda", label: "Sacred Staff", icon: "danda" }
    ]
  },
  {
    name: "Ramanujacharya",
    sanskrit: "रामानुजाचार्य",
    era: "1017 CE – 1137 CE",
    category: "bhakti",
    majorWork: "Sri Bhashya, Vedartha Sangraha, Gita Bhashya",
    subtitle: "Proponent of Vishishtadvaita and Social Reforms",
    image: "/images/sages/ramanuja.png",
    description: "The great theologian and philosopher of Vishishtadvaita (qualified non-dualism). He pioneered social reforms in temple worship and championed Bhakti (devotion) to Lord Vishnu as the path to liberation.",
    detailedDescription: "Ramanuja integrated the intellectual Upanishads with the emotional Tamil hymns of the Alvars. He spent much of his life at the Srirangam temple. He famously climbed the temple tower of Thirukoshtiyur to chant the sacred Ashtakshara Mantra aloud to everyone, breaking orthodox taboos to offer salvation to all classes of society.",
    quote: "The soul is real, the world is real, and both are body and parts of the Supreme Lord who is filled with infinite auspicious qualities.",
    teachings: [
      "Vishishtadvaita Vedanta: Qualified Non-dualism where the soul and world are real parts of Brahman.",
      "Prapatti: Complete surrender to Lord Vishnu as the ultimate and easiest path to liberation.",
      "Spiritual equality: Breaking caste barriers in devotion and temple entry."
    ],
    lineage: "Disciple of Yamunacharya's tradition. Founder of the Sri Vaishnava sampradaya.",
    attributes: [
      { name: "Anjali", label: "Folded Hands", icon: "anjali" },
      { name: "Tridanda", label: "Vaishnava Staff", icon: "tridanda" }
    ]
  },
  {
    name: "Chaitanya Mahaprabhu",
    sanskrit: "चैतन्य महाप्रभु",
    era: "1486 CE – 1534 CE",
    category: "bhakti",
    majorWork: "Siksastakam",
    subtitle: "Igniter of Gaudiya Vaishnavism & Congregational Sankirtana",
    image: "/images/sages/chaitanya.png",
    description: "A spiritual teacher who founded Gaudiya Vaishnavism. He popularized congregational chanting of the Hare Krishna Mahamantra (Sankirtana) and experienced ecstatic states of divine love, regarded as an incarnation of Radha and Krishna.",
    detailedDescription: "Born in Nabadwip, Bengal, Chaitanya was a brilliant logician who renounced the world at 24. He traveled extensively, chanting and dancing in divine ecstasy, inspiring millions to take up the name of God. He spent his final years in Puri, lost in deep moods of separation from Krishna.",
    quote: "One should chant the holy name of the Lord in a humble state of mind, feeling oneself lower than the straw in the street, more tolerant than a tree, and ready to offer all respect to others.",
    teachings: [
      "Achintya Bheda Abheda: Inconceivable, simultaneous oneness and difference between God and the soul.",
      "Nama-Sankirtana: Collective chanting of holy names as the supreme spiritual practice for this age.",
      "Prema: Unconditional, ecstatic love for Krishna as the highest goal of life."
    ],
    lineage: "Disciple of Ishvara Puri. Founder of the Gaudiya Vaishnava lineage.",
    attributes: [
      { name: "Khol", label: "Clay Drum", icon: "khol" },
      { name: "Kartal", label: "Hand Cymbals", icon: "kartal" }
    ]
  },
  {
    name: "Goswami Tulsidas",
    sanskrit: "तुलसीदास",
    era: "1532 CE – 1623 CE",
    category: "bhakti",
    majorWork: "Ramcharitmanas, Hanuman Chalisa, Vinaya Patrika",
    subtitle: "Author of the Beloved Ramcharitmanas",
    image: "/images/sages/tulsidas.png",
    description: "A great poet-saint and devotee of Lord Rama. He translated the epic story of Ramayana into the vernacular Awadhi language as the Ramcharitmanas, bringing the narrative of Rama to every home.",
    detailedDescription: "Abandoned as an infant, he was raised by a saint named Naraharidas. Urged by his wife to direct his intense attachment from her body to Lord Rama, he renounced home and settled in Varanasi and Ayodhya. He composed the Ramcharitmanas, expressing deep devotion and making Rama's virtues accessible to the masses.",
    quote: "Even if a person is a storehouse of all knowledge, without devotion to Rama, he is like a beautiful corpse.",
    teachings: [
      "Ekanthika Bhakti: Single-minded devotion to Lord Rama as the Supreme Reality.",
      "The power of chanting the name of Rama (Rama-Nama) to erase all sins.",
      "Satsang: The association of saintly people as the primary catalyst for spiritual awakening.",
    ],
    lineage: "Disciple of Naraharidas, in the lineage of Ramanandacharya.",
    attributes: [
      { name: "Rama Nama", label: "Bow & Arrow", icon: "ramanama" },
      { name: "Pustaka", label: "Holy Scripture", icon: "pustaka" }
    ]
  },
  {
    name: "Swami Vivekananda",
    sanskrit: "स्वामी विवेकानन्द",
    era: "1863 CE – 1902 CE",
    category: "modern",
    majorWork: "Raja Yoga, Karma Yoga, Jnana Yoga, Chicago Address",
    subtitle: "Spreader of Practical Vedanta and Yoga to the West",
    image: "/images/sages/vivekananda.png",
    description: "The chief disciple of Sri Ramakrishna who introduced Vedanta and Yoga to the Western world at the 1893 Parliament of Religions. He founded the Ramakrishna Mission to serve humanity as God.",
    detailedDescription: "Vivekananda was a brilliant intellectual who traveled the length and breadth of India as a wandering monk, witnessing the poverty and potential of the country. His speech in Chicago, starting with 'Sisters and brothers of America', shook the audience. He preached a practical, strength-giving Vedanta, urging youth to build character.",
    quote: "Arise, awake, and stop not till the goal is reached.",
    teachings: [
      "Practical Vedanta: Applying non-dual philosophy to elevate daily social and educational life.",
      "Character building: Religion is the manifestation of the divinity already in human beings.",
      "Universal tolerance and the rejection of fanaticism."
    ],
    lineage: "Chief Disciple of Sri Ramakrishna Paramahansa.",
    attributes: [
      { name: "Sannyasa", label: "Saffron Robe", icon: "sannyasa" },
      { name: "Jnana", label: "Global Vedanta", icon: "jnana" }
    ]
  },
  {
    name: "Sri Ramana Maharshi",
    sanskrit: "रमण महर्षि",
    era: "1879 CE – 1950 CE",
    category: "modern",
    majorWork: "Who Am I? (Nan Yar), Ulladu Narpadu",
    subtitle: "Silent Sage of Arunachala and Teacher of Self-Inquiry",
    image: "/images/sages/ramana.png",
    description: "The silent sage of Arunachala who taught self-inquiry (Atma-Vichara). He advocated persistently asking the question 'Who am I?' to pierce through ego-identity and realize the non-dual Self.",
    detailedDescription: "At age 16, he underwent a sudden, intense experience of death-simulation, which led him to realize that his true identity was the immortal Spirit, not the body. He left his home in Madurai and traveled to the sacred hill of Arunachala, where he remained for the rest of his life, radiating silent peace to visitors.",
    quote: "Your own self-realization is the greatest service you can render the world.",
    teachings: [
      "Atma-Vichara (Self-Inquiry): Tracing the origin of the 'I-thought' back to its source in the Heart.",
      "Silence (Mouna) as the most potent form of instruction.",
      "Surrender: Placing the burden of one's life in the hands of the divine power."
    ],
    lineage: "Independent sage, aligned with Advaita Vedanta.",
    attributes: [
      { name: "Arunachala", label: "Sacred Hill", icon: "arunachala" },
      { name: "Mouna", label: "Silent Lotus", icon: "mouna" }
    ]
  }
];

function AttributeIcon({ icon }: { icon: string }) {
  // Return specialized SVG icons for each unique attribute medallion
  if (icon === "kumbha") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Sacred Water Pitcher */}
        <path d="M30 65 L70 65 L60 88 L40 88 Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M22 65 L78 65" strokeWidth="3" />
        <path d="M32 65 C32 45 42 45 42 35 C42 25 35 25 35 15 L65 15 C65 25 58 25 58 35 C58 45 68 45 68 65" />
        <path d="M35 15 L65 15" strokeWidth="3.5" />
        <path d="M42 15 L42 8" />
        <path d="M58 15 L58 8" />
        <circle cx="50" cy="53" r="4" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "aditya") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Solar Disc */}
        <circle cx="50" cy="50" r="18" fill="currentColor" fillOpacity="0.15" />
        {/* Rays */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = (50 + 22 * Math.cos(angle)).toFixed(2);
          const y1 = (50 + 22 * Math.sin(angle)).toFixed(2);
          const x2 = (50 + 34 * Math.cos(angle)).toFixed(2);
          const y2 = (50 + 34 * Math.sin(angle)).toFixed(2);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="2.5" strokeLinecap="round" />;
        })}
        <circle cx="50" cy="50" r="10" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "kamadhenu") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Sacred Cow Symbol - Horn of Plenty / Cow Silhouette representation */}
        <path d="M15 45 C35 20, 65 20, 85 45 C65 70, 35 70, 15 45 Z" fill="currentColor" fillOpacity="0.08" />
        <path d="M30 40 L70 40" strokeWidth="2.5" />
        {/* Cow Horns */}
        <path d="M32 30 C30 15, 20 20, 15 10" strokeLinecap="round" />
        <path d="M68 30 C70 15, 80 20, 85 10" strokeLinecap="round" />
        <circle cx="50" cy="50" r="5" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "arundhati") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Twin Star (Alcor & Mizar) */}
        <polygon points="40,15 44,28 55,28 46,35 49,48 40,40 31,48 34,35 25,28 36,28" fill="currentColor" />
        <polygon points="65,48 68,58 78,58 70,64 73,74 65,68 57,74 60,64 52,58 62,58" fill="currentColor" opacity="0.7" />
        <line x1="40" y1="31" x2="65" y2="61" strokeDasharray="3,3" />
      </svg>
    );
  }
  if (icon === "gayatri") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Sun Halo */}
        <circle cx="50" cy="50" r="32" strokeDasharray="6,4" />
        <circle cx="50" cy="50" r="18" fill="currentColor" fillOpacity="0.1" />
        {/* Concentric Lotus inside */}
        <path d="M50 38 C45 45 42 50 50 62 C58 50 55 45 50 38 Z" fill="currentColor" />
        <path d="M38 50 C45 45 50 42 62 50 C50 58 45 55 38 50 Z" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "kshatra") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Sacred Sword */}
        <line x1="20" y1="80" x2="75" y2="25" strokeWidth="3" strokeLinecap="round" />
        <line x1="15" y1="85" x2="25" y2="75" strokeWidth="3" />
        <circle cx="15" cy="85" r="3" fill="currentColor" />
        {/* Hilt details */}
        <line x1="28" y1="78" x2="22" y2="72" strokeWidth="2.5" />
      </svg>
    );
  }
  if (icon === "scripture") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Palm Leaf Manuscripts */}
        <rect x="15" y="38" width="70" height="24" rx="2" fill="currentColor" fillOpacity="0.1" />
        <line x1="25" y1="46" x2="75" y2="46" strokeDasharray="4,4" />
        <line x1="25" y1="54" x2="75" y2="54" strokeDasharray="4,4" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "lekhani") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Writing Quill */}
        <path d="M80 20 C65 25 35 55 25 80 L35 75 C45 65 75 35 80 20 Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M80 20 Q55 35 20 80" strokeLinecap="round" />
        <line x1="20" y1="80" x2="27" y2="73" strokeWidth="2.5" />
      </svg>
    );
  }
  if (icon === "krauncha") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Two Heron Birds Flying */}
        <path d="M15 35 Q30 25 45 35 Q30 45 15 35" fill="currentColor" fillOpacity="0.1" />
        <path d="M15 35 L45 35" />
        <path d="M55 55 Q70 45 85 55 Q70 65 55 55" fill="currentColor" fillOpacity="0.1" />
        <path d="M55 55 L85 55" />
      </svg>
    );
  }
  if (icon === "kusha") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Bundle of Kusha Grass */}
        <path d="M35 85 C35 60 15 30 10 15 C25 30 45 60 45 85" strokeLinecap="round" />
        <path d="M50 85 C50 50 65 25 80 15 C65 30 50 60 50 85" strokeLinecap="round" />
        <path d="M42 85 C42 55 35 35 50 15 C45 35 42 60 42 85" strokeLinecap="round" />
        <rect x="30" y="70" width="25" height="4" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (icon === "shesha") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Serpent Canopy */}
        <path d="M20 70 C20 40 30 20 50 20 C70 20 80 40 80 70" strokeDasharray="3,3" />
        <path d="M35 60 C35 45 42 35 50 35 C58 35 65 45 65 60" />
        {/* Central snake head */}
        <path d="M50 35 L50 25" />
        <circle cx="50" cy="25" r="2.5" fill="currentColor" />
        {/* Left snake head */}
        <path d="M40 38 L35 30" />
        <circle cx="35" cy="30" r="2.5" fill="currentColor" />
        {/* Right snake head */}
        <path d="M60 38 L65 30" />
        <circle cx="65" cy="30" r="2.5" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "ashtanga") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Yogic Lotus (8 petals) */}
        <circle cx="50" cy="50" r="10" fill="currentColor" fillOpacity="0.2" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const cx = (50 + 20 * Math.cos(angle)).toFixed(2);
          const cy = (50 + 20 * Math.sin(angle)).toFixed(2);
          return <circle key={i} cx={cx} cy={cy} r="6" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1" />;
        })}
        <circle cx="50" cy="50" r="6" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "kamandalu") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Monk's Water Pot */}
        <path d="M35 50 C35 38 65 38 65 50 L60 80 L40 80 Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M30 50 L70 50" strokeWidth="3" />
        {/* Carrying Handle */}
        <path d="M35 50 C35 25 65 25 65 50" strokeWidth="2.5" />
        <rect x="40" y="80" width="20" height="6" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "danda") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Monastic Staff */}
        <line x1="50" y1="10" x2="50" y2="90" strokeWidth="3" strokeLinecap="round" />
        {/* Knots on stick */}
        <circle cx="50" cy="30" r="4" fill="currentColor" />
        <circle cx="50" cy="50" r="4" fill="currentColor" />
        <circle cx="50" cy="70" r="4" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "anjali") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Folded Hands */}
        <path d="M40 80 L44 40 C44 30 48 25 50 25 C52 25 56 30 56 40 L60 80 Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M40 80 C40 80 50 85 60 80" />
        <line x1="50" y1="25" x2="50" y2="83" strokeWidth="1.5" />
      </svg>
    );
  }
  if (icon === "tridanda") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Vaishnava Staff (Triple bundle staff) */}
        <line x1="46" y1="15" x2="46" y2="85" strokeWidth="1.5" />
        <line x1="50" y1="10" x2="50" y2="90" strokeWidth="2" />
        <line x1="54" y1="15" x2="54" y2="85" strokeWidth="1.5" />
        {/* Ties */}
        <rect x="42" y="25" width="16" height="3" fill="currentColor" />
        <rect x="42" y="55" width="16" height="3" fill="currentColor" />
        <rect x="42" y="75" width="16" height="3" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "khol") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Clay Mridangam Drum */}
        <path d="M25 50 C25 35, 75 35, 75 50 C75 65, 25 65, 25 50 Z" fill="currentColor" fillOpacity="0.1" />
        <ellipse cx="25" cy="50" rx="5" ry="12" fill="currentColor" />
        <ellipse cx="75" cy="50" rx="5" ry="12" fill="currentColor" />
        {/* Drum ties */}
        <line x1="25" y1="42" x2="75" y2="42" />
        <line x1="25" y1="58" x2="75" y2="58" />
        <line x1="25" y1="50" x2="75" y2="50" strokeDasharray="3,3" />
      </svg>
    );
  }
  if (icon === "kartal") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Cymbals */}
        <circle cx="35" cy="50" r="16" fill="currentColor" fillOpacity="0.1" />
        <circle cx="35" cy="50" r="5" fill="currentColor" />
        <circle cx="65" cy="50" r="16" fill="currentColor" fillOpacity="0.1" />
        <circle cx="65" cy="50" r="5" fill="currentColor" />
        {/* Connecting thread */}
        <path d="M35 50 C35 30 65 30 65 50" strokeDasharray="2,2" />
      </svg>
    );
  }
  if (icon === "ramanama") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Bow and Arrow */}
        <path d="M30 20 C60 20 60 80 30 80" strokeWidth="2.5" />
        <line x1="30" y1="20" x2="30" y2="80" strokeWidth="1" />
        {/* Arrow */}
        <line x1="20" y1="50" x2="75" y2="50" strokeWidth="2" strokeLinecap="round" />
        <polygon points="75,50 67,45 67,55" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "pustaka") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Holy Scripture Book */}
        <rect x="20" y="25" width="60" height="50" rx="3" fill="currentColor" fillOpacity="0.1" />
        <line x1="50" y1="25" x2="50" y2="75" strokeWidth="2.5" />
        <line x1="30" y1="40" x2="42" y2="40" />
        <line x1="30" y1="50" x2="42" y2="50" />
        <line x1="30" y1="60" x2="42" y2="60" />
        <line x1="58" y1="40" x2="70" y2="40" />
        <line x1="58" y1="50" x2="70" y2="50" />
        <line x1="58" y1="60" x2="70" y2="60" />
      </svg>
    );
  }
  if (icon === "sannyasa") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Monk's Turban / Folded Cloth Symbol */}
        <path d="M20 65 C20 45 35 30 50 30 C65 30 80 45 80 65 Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M15 65 L85 65 Q50 85 15 65 Z" fill="currentColor" />
        <path d="M25 45 C35 35 65 35 75 45" />
        <circle cx="50" cy="30" r="3" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "jnana") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Global Globe / Rays of light */}
        <circle cx="50" cy="50" r="30" fill="currentColor" fillOpacity="0.1" />
        <path d="M20 50 L80 50" />
        <path d="M50 20 L50 80" />
        <path d="M26 32 C35 40 35 60 26 68" />
        <path d="M74 32 C65 40 65 60 74 68" />
      </svg>
    );
  }
  if (icon === "arunachala") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Sacred Mountain */}
        <polygon points="50,15 85,85 15,85" fill="currentColor" fillOpacity="0.1" />
        <polyline points="50,15 50,85" strokeWidth="1.5" />
        {/* Shading */}
        <polyline points="50,15 65,55 50,85" strokeWidth="1.2" />
        <polyline points="50,15 35,55 50,85" strokeWidth="1.2" />
      </svg>
    );
  }
  if (icon === "mouna") {
    return (
      <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Silent Lotus / Finger on lips representation */}
        <path d="M50 80 C35 75 25 55 35 40 C40 32 50 20 50 20 C50 20 60 32 65 40 C75 55 65 75 50 80 Z" fill="currentColor" fillOpacity="0.15" />
        {/* Center dot of silence */}
        <circle cx="50" cy="50" r="5" fill="currentColor" />
        <line x1="50" y1="50" x2="50" y2="78" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  return null;
}

export default function SagesPage() {
  const { playClick, playOm } = useSacredSound();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [selectedSage, setSelectedSage] = useState<Sage | null>(null);

  const handleFilterChange = (filterId: string) => {
    playClick();
    setActiveFilter(filterId);
  };

  const handleSageClick = (sage: Sage) => {
    playOm();
    setSelectedSage(sage);
  };

  const handleCloseModal = () => {
    playClick();
    setSelectedSage(null);
  };

  const filteredSages = useMemo(() => {
    return SAGES_DATA.filter((sage) => {
      const matchesCategory = activeFilter === "all" || sage.category === activeFilter;
      const matchesSearch =
        sage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sage.sanskrit.includes(searchTerm) ||
        sage.era.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sage.majorWork.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sage.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  // Order categories chronologically for the timeline: vedic -> epic -> classical -> bhakti -> modern
  const sortedTimelineSages = useMemo(() => {
    const order = { vedic: 0, epic: 1, classical: 2, bhakti: 3, modern: 4 };
    return [...filteredSages].sort((a, b) => order[a.category] - order[b.category]);
  }, [filteredSages]);

  return (
    <div className="ag-page-enter flex flex-col min-h-screen bg-gradient-to-b from-[#0a0b0d] via-[#121316] to-[#050607] text-[#F4EFEB] pb-10">
      <Breadcrumb items={[{ label: "Sages & Rishis" }]} />
      
      <div className="flex-grow max-w-7xl mx-auto px-6 w-full pb-16 pt-2">
        
        {/* Classical Renaissance Hero Banner (Virgil & Dante style layout) */}
        <div className="max-w-6xl mx-auto mb-16 mt-6 bg-[#0e0f12] border border-[#b8860b]/40 outline outline-1 outline-offset-4 outline-[#b8860b]/20 rounded-xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.8)] relative">
          {/* Subtle overlay gradients */}
          <div className="absolute inset-0 bg-radial-gradient(circle at left, rgba(14,15,18,0) 0%, rgba(5,6,7,0.85) 100%) pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10 items-stretch min-h-[380px]">
            {/* Left side text information (60% width) */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center text-left border-b lg:border-b-0 lg:border-r border-[#b8860b]/20">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4A017] font-mono mb-2 block">
                ऋषयो मन्त्रद्रष्टारः — THE SEERS OF WISDOM
              </span>
              
              <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-normal text-[#F4EFEB] leading-tight mb-2">
                Sages &amp; Rishis of Bharat
              </h1>
              
              <p className="font-cursive text-2xl md:text-3xl text-[#D4A017] mb-6 select-none">
                Eternal tales of spiritual search and cosmic vision
              </p>
              
              <div className="w-24 h-[1.5px] bg-gradient-to-r from-[#b8860b] to-transparent mb-6" />
              
              <p className="font-serif text-sm md:text-base text-[#D8D0C5] leading-relaxed max-w-xl">
                Explore the profiles, teachings, and spiritual lineages of the primordial seers (Rishis) who received the cosmic vibration of truth, the codifiers of the six logical Darshanas, and the Sanyasis who revived the path of knowledge and devotion.
              </p>
            </div>
            
            {/* Right side integrated classical painting (40% width) */}
            <div className="lg:col-span-5 relative flex items-center justify-center p-8 lg:p-0 bg-black/30 overflow-hidden min-h-[300px] lg:min-h-auto">
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0e0f12] via-transparent to-transparent z-10 pointer-events-none" />
              {/* Painting Frame */}
              <div className="w-[85%] h-[85%] lg:w-[80%] lg:h-[80%] border-4 border-[#b8860b]/30 outline outline-1 outline-offset-4 outline-[#b8860b]/15 rounded-t-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] relative group">
                <Image
                  src="/images/sages_hero.png"
                  alt="Vedic Sages Contemplation"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center filter brightness-90 saturate-[1.1] transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search, Filter & View Mode Console */}
        <div className="max-w-5xl mx-auto mb-16 bg-[#0e0f12]/90 border border-[#b8860b]/30 outline outline-1 outline-offset-4 outline-[#b8860b]/15 rounded-xl p-6 backdrop-blur-md flex flex-col gap-6 select-none shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Search bar and View Mode Toggle */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
            <div className="relative w-full md:max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b8860b]/70" />
              <input
                type="text"
                placeholder="Search sage by name, works, teachings or era..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/60 border border-[#b8860b]/35 focus:border-[#b8860b] rounded-xl text-xs outline-none text-[#F5F0E8] transition-all font-serif"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-[#b8860b]/20 shrink-0">
              <button
                onClick={() => { playClick(); setViewMode("grid"); }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer border ${
                  viewMode === "grid"
                    ? "bg-[#b8860b]/15 text-[#D4A017] border-[#b8860b]/40"
                    : "text-gray-400 border-transparent hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Grid View
              </button>
              <button
                onClick={() => { playClick(); setViewMode("timeline"); }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer border ${
                  viewMode === "timeline"
                    ? "bg-[#b8860b]/15 text-[#D4A017] border-[#b8860b]/40"
                    : "text-gray-400 border-transparent hover:text-white"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                Timeline View
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-t border-[#b8860b]/15 pt-4">
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleFilterChange(cat.id)}
                  className={`px-3 py-1.5 rounded-lg border text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer outline-none ${
                    isActive
                      ? "bg-[#b8860b]/20 border-[#b8860b] text-[#D4A017] shadow-[0_0_12px_rgba(212,160,23,0.15)]"
                      : "bg-transparent border-transparent text-gray-400 hover:text-[#F4EFEB] hover:bg-white/5"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className="max-w-5xl mx-auto relative min-h-[400px]">
          {viewMode === "grid" ? (
            /* Gods of Olympus Alternating Layout Grid */
            <div className="flex flex-col gap-16">
              <AnimatePresence mode="popLayout">
                {filteredSages.map((sage, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div
                      layout
                      key={sage.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleSageClick(sage)}
                      className="cursor-pointer"
                    >
                      <Card
                        className="bg-[#0e0f12] border-2 border-[#b8860b]/40 outline outline-1 outline-offset-4 outline-[#b8860b]/20 p-6 md:p-8 rounded-xl flex flex-col md:flex-row gap-8 items-stretch justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-[#b8860b]/80 transition-all duration-300"
                      >
                        {/* Overlay Marble texture / gradient effect */}
                        <div className="absolute inset-0 bg-radial-gradient(circle at center, rgba(184,134,11,0.02) 0%, transparent 100%) pointer-events-none" />

                        {/* Content Row structured with alternating order */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full z-10">
                          
                          {/* Column 1: Portrait Image (Columns 1-4 for Even, Columns 9-12 for Odd) */}
                          <div className={`col-span-12 md:col-span-4 flex justify-center items-center ${isEven ? "md:order-1" : "md:order-3"}`}>
                            {/* Statue/Painting frame */}
                            <div className="w-[200px] h-[280px] md:w-full md:h-[320px] border-2 border-[#b8860b]/30 outline outline-1 outline-offset-4 outline-[#b8860b]/15 rounded-lg overflow-hidden relative shadow-2xl bg-black/40 group-hover:outline-[#b8860b]/40 group-hover:border-[#b8860b]/60 transition-all duration-300">
                              <Image
                                src={sage.image}
                                alt={sage.name}
                                fill
                                sizes="(max-width: 768px) 200px, 300px"
                                className="object-cover object-center filter brightness-95 saturate-[1.1] transition-transform duration-700 group-hover:scale-105"
                              />
                            </div>
                          </div>

                          {/* Column 2: Text details & Gold Leaf Wreath title (Columns 5-9 for Even, Columns 5-9 for Odd) */}
                          <div className="col-span-12 md:col-span-5 flex flex-col justify-center items-center text-center md:order-2 px-2">
                            {/* Gold Wreath surrounding Title */}
                            <div className="flex items-center justify-center gap-3 w-full border-b border-[#b8860b]/25 pb-3 mb-4 select-none">
                              {/* Left Branch */}
                              <svg className="w-8 h-5 text-[#b8860b]/80" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M5 18 C15 10, 30 14, 35 15" />
                                <circle cx="10" cy="12" r="1.5" fill="currentColor" />
                                <circle cx="18" cy="11" r="1.5" fill="currentColor" />
                                <circle cx="26" cy="12" r="1.5" fill="currentColor" />
                                <circle cx="32" cy="14" r="1.5" fill="currentColor" />
                              </svg>
                              
                              <div className="text-center">
                                <h3 className="font-sanskrit text-xs font-bold text-[#D4A017] tracking-widest leading-none text-sanskrit font-normal">
                                  {sage.sanskrit}
                                </h3>
                                <h4 className="font-serif text-xl md:text-2xl font-black text-[#F4EFEB] tracking-wider uppercase mt-1">
                                  {sage.name}
                                </h4>
                              </div>

                              {/* Right Branch */}
                              <svg className="w-8 h-5 text-[#b8860b]/80 scale-x-[-1]" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M5 18 C15 10, 30 14, 35 15" />
                                <circle cx="10" cy="12" r="1.5" fill="currentColor" />
                                <circle cx="18" cy="11" r="1.5" fill="currentColor" />
                                <circle cx="26" cy="12" r="1.5" fill="currentColor" />
                                <circle cx="32" cy="14" r="1.5" fill="currentColor" />
                              </svg>
                            </div>

                            {/* Gold Subtitle / Epithet */}
                            <h5 className="text-[10px] uppercase font-black text-[#D4A017] tracking-widest font-serif mb-4 leading-normal max-w-xs">
                              {sage.subtitle}
                            </h5>

                            <p className="font-serif text-xs text-gray-300 leading-relaxed text-center max-w-sm mb-4">
                              {sage.description}
                            </p>

                            <div className="w-20 h-[1px] bg-[#b8860b]/20 mb-3" />

                            <div className="text-[9px] text-gray-400 flex items-center justify-center gap-1.5 font-serif max-w-xs leading-normal">
                              <Scroll className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                              <span>
                                <span className="font-bold text-[#b8860b]">Works:</span> {sage.majorWork}
                              </span>
                            </div>
                          </div>

                          {/* Column 3: Medallions of Attributes (Columns 10-12 for Even, Columns 1-4 for Odd) */}
                          <div className={`col-span-12 md:col-span-3 flex flex-row md:flex-col justify-center items-center gap-8 ${isEven ? "md:order-3" : "md:order-1"}`}>
                            {sage.attributes.map((attr, idx) => (
                              <div key={idx} className="flex flex-col items-center select-none group/medallion">
                                <span className="text-[8px] uppercase tracking-widest text-gray-400 font-serif mb-2">
                                  {idx === 0 ? "PRIMARY ATTRIBUTE" : "SECONDARY ATTRIBUTE"}
                                </span>
                                {/* Gold Medallion */}
                                <div className="w-20 h-20 rounded-full border-2 border-[#b8860b]/40 bg-black/55 flex items-center justify-center shadow-2xl relative group-hover:border-[#b8860b]/70 group-hover/medallion:scale-105 transition-all duration-300">
                                  {/* Concentric inner ring */}
                                  <div className="absolute inset-1 rounded-full border border-[#b8860b]/15 pointer-events-none" />
                                  <AttributeIcon icon={attr.icon} />
                                </div>
                                <span className="text-[10px] font-black text-[#D4A017] tracking-widest font-serif mt-2 uppercase">
                                  {attr.name}
                                </span>
                                <span className="text-[8px] text-gray-400 font-serif mt-0.5 max-w-[90px] text-center leading-tight">
                                  {attr.label}
                                </span>
                              </div>
                            ))}
                          </div>

                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            /* Chronological Timeline View */
            <div className="relative pl-6 md:pl-10 border-l border-[#b8860b]/30 py-4 flex flex-col gap-8">
              <AnimatePresence mode="popLayout">
                {sortedTimelineSages.map((sage, index) => (
                  <motion.div
                    layout
                    key={`timeline-${sage.name}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
                    className="relative flex flex-col md:flex-row gap-4 md:items-start group cursor-pointer"
                    onClick={() => handleSageClick(sage)}
                  >
                    {/* Timeline Node Point */}
                    <div className="absolute -left-[31px] md:-left-[47px] top-2.5 w-4 h-4 rounded-full border border-[#b8860b] bg-[#0a0b0d] flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E25822] group-hover:bg-[#D4A017]" />
                    </div>

                    <div className="bg-[#0e0f12]/60 hover:bg-[#0e0f12]/90 border border-[#b8860b]/30 outline outline-1 outline-offset-4 outline-[#b8860b]/10 hover:border-[#b8860b]/60 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full transition-all duration-300 shadow-md">
                      <div className="flex flex-col gap-1.5 text-left max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[8px] md:text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-[#b8860b]/30 bg-black/20 text-[#D4A017]">
                            {sage.category.toUpperCase()}
                          </span>
                          <span className="text-[9px] text-gray-400 font-mono flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#b8860b]" />
                            {sage.era}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg font-bold text-[#F4EFEB] leading-tight flex items-baseline gap-2">
                          {sage.name}
                          <span className="font-sanskrit text-xs text-[#D4A017] text-sanskrit font-normal">
                            ({sage.sanskrit})
                          </span>
                        </h4>
                        <p className="font-serif text-xs text-[#D4A017] font-bold tracking-wider uppercase -mt-0.5">
                          {sage.subtitle}
                        </p>
                        <p className="font-serif text-xs text-gray-300 line-clamp-2 leading-relaxed mt-1">
                          {sage.description}
                        </p>
                      </div>

                      {/* Right Section: Major Works */}
                      <div className="border-t md:border-t-0 md:border-l border-[#b8860b]/15 pt-3.5 md:pt-0 md:pl-5 flex items-start gap-2 max-w-xs w-full shrink-0 text-left">
                        <Scroll className="w-4 h-4 text-[#b8860b] mt-0.5 shrink-0" />
                        <div className="flex flex-col gap-0.5 font-serif">
                          <span className="text-[8px] uppercase tracking-wider font-bold text-[#b8860b]">Major Works</span>
                          <span className="text-[10px] text-gray-400 font-medium line-clamp-2">{sage.majorWork}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Empty State */}
          {filteredSages.length === 0 && (
            <div className="text-center py-20 bg-[#0e0f12]/20 border border-[#b8860b]/20 rounded-2xl flex flex-col items-center gap-4 max-w-md mx-auto">
              <span className="text-4xl block">🧘</span>
              <p className="text-sm text-gray-400 font-mono">No sages found matching your query.</p>
              <button
                onClick={() => {
                  playClick();
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
                className="px-4 py-2 border border-[#b8860b]/40 text-[#D4A017] hover:text-white hover:bg-white/5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer outline-none transition-all"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Details Canvas Modal (AnimatePresence) */}
      <AnimatePresence>
        {selectedSage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
          >
            {/* Backdrop click close */}
            <div className="absolute inset-0 cursor-default" onClick={handleCloseModal} />

            {/* Modal Body styled as classic museum canvas */}
            <motion.div
              initial={{ scale: 0.92, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="bg-[#0e0f12] border border-[#b8860b]/40 outline outline-1 outline-offset-4 outline-[#b8860b]/20 max-w-4xl w-full p-6 md:p-10 overflow-hidden relative text-left z-10 max-h-[92vh] overflow-y-auto rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer border border-transparent hover:border-[#b8860b]/40"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
                
                {/* Left Panel: Portrait Image in Modal (4 Columns) */}
                <div className="md:col-span-4 flex flex-col items-center justify-start border-b md:border-b-0 md:border-r border-[#b8860b]/25 pb-6 md:pb-0 md:pr-8 select-none">
                  {/* Portrait Frame */}
                  <div className="w-[180px] h-[250px] border-2 border-[#b8860b]/40 outline outline-1 outline-offset-4 outline-[#b8860b]/20 rounded-lg overflow-hidden relative bg-black/55 shadow-[0_10px_30px_rgba(0,0,0,0.7)] mb-6">
                    <Image
                      src={selectedSage.image}
                      alt={selectedSage.name}
                      fill
                      sizes="180px"
                      className="object-cover object-center filter brightness-95 saturate-[1.1]"
                    />
                  </div>
                  
                  <h3 className="font-sanskrit text-2xl font-bold text-[#D4A017] text-sanskrit text-center leading-normal">
                    {selectedSage.sanskrit}
                  </h3>
                  
                  <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-2 font-mono text-center">
                    Sanskrit Representation
                  </p>

                  {/* Attributes in Modal */}
                  <div className="flex gap-4 mt-6">
                    {selectedSage.attributes.map((attr, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border border-[#b8860b]/30 bg-black/40 flex items-center justify-center relative scale-90">
                          <AttributeIcon icon={attr.icon} />
                        </div>
                        <span className="text-[8px] font-bold text-[#D4A017] tracking-wider font-serif mt-1 uppercase text-center max-w-[60px] leading-tight">
                          {attr.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Panel: Content Details in Modal (8 Columns) */}
                <div className="md:col-span-8 flex flex-col gap-6">
                  {/* Header info */}
                  <div className="flex flex-col gap-1 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-[#D4A017] font-mono">
                        {selectedSage.category.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#b8860b]" />
                        {selectedSage.era}
                      </span>
                    </div>
                    
                    <h2 className="font-serif text-3xl font-black text-[#F4EFEB] tracking-wide mt-1 uppercase">
                      {selectedSage.name}
                    </h2>
                    
                    <p className="font-serif text-xs font-bold text-[#D4A017] tracking-wider uppercase leading-none mt-1 select-none">
                      {selectedSage.subtitle}
                    </p>

                    {selectedSage.lineage && (
                      <p className="text-[10px] text-gray-400 mt-3 flex items-center gap-1.5 font-serif">
                        <GitCommit className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                        <span><span className="font-bold text-[#b8860b]">Lineage:</span> {selectedSage.lineage}</span>
                      </p>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-col gap-6 font-serif text-sm text-gray-200">
                    {/* Quote styled like classical excerpt */}
                    {selectedSage.quote && (
                      <div className="bg-black/50 border border-[#b8860b]/20 p-4 rounded-lg italic text-gray-300 relative">
                        <Quote className="w-8 h-8 text-[#b8860b]/10 absolute -top-1.5 -left-1 pointer-events-none" />
                        <p className="relative z-10 pl-2 leading-relaxed">
                          &ldquo;{selectedSage.quote}&rdquo;
                        </p>
                      </div>
                    )}

                    {/* Biography */}
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs uppercase font-bold text-[#b8860b] tracking-widest flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        Biography &amp; Significance
                      </h4>
                      <p className="leading-relaxed text-gray-300 text-xs md:text-sm">
                        {selectedSage.detailedDescription}
                      </p>
                    </div>

                    {/* Core Teachings */}
                    {selectedSage.teachings && selectedSage.teachings.length > 0 && (
                      <div className="flex flex-col gap-2 bg-black/30 p-4 rounded-xl border border-[#b8860b]/15">
                        <h4 className="text-xs uppercase font-bold text-[#b8860b] tracking-widest flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          Core Teachings &amp; Philosophy
                        </h4>
                        <ul className="list-disc list-inside flex flex-col gap-1.5 pl-1.5 text-xs text-gray-300 leading-relaxed">
                          {selectedSage.teachings.map((teaching, i) => (
                            <li key={i} className="list-item">
                              {teaching}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Major Works */}
                    <div className="border-t border-[#b8860b]/20 pt-4 flex flex-col gap-2">
                      <h4 className="text-xs uppercase font-bold text-[#b8860b] tracking-widest flex items-center gap-1.5">
                        <Scroll className="w-3.5 h-3.5" />
                        Major Works &amp; Texts
                      </h4>
                      <p className="text-xs text-[#D4A017] italic leading-relaxed">
                        {selectedSage.majorWork}
                      </p>
                    </div>

                    {/* Grounding Sound Trigger */}
                    <div className="flex justify-center pt-2 select-none">
                      <button
                        onClick={playOm}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#b8860b]/15 hover:bg-[#b8860b]/35 text-[#D4A017] border border-[#b8860b]/40 hover:border-[#b8860b]/60 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(212,160,23,0.15)] outline-none"
                      >
                        🧘 Play Sacred Om Drone
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
