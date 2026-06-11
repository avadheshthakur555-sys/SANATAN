"use client";

import React, { memo } from "react";
import Link from "next/link";
import { Book, Landmark, Sparkles, Calendar, FileText } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";

interface RelatedItem {
  label: string;
  href: string;
  sub?: string;
}

interface RelatedContentDiscoveryProps {
  category: "shiva" | "vishnu" | "devi" | "ganesha" | "hanuman" | "general";
}

const RelatedContentDiscovery = memo<RelatedContentDiscoveryProps>(({ category }) => {
  const { playNavigate } = useSacredSound();

  // Generate data based on category
  const getRelatedData = (): {
    scriptures: RelatedItem[];
    temples: RelatedItem[];
    deities: RelatedItem[];
    festivals: RelatedItem[];
    articles: RelatedItem[];
  } => {
    switch (category) {
      case "shiva":
        return {
          scriptures: [
            { label: "Shiva Purana", href: "/library/shiva-purana", sub: "18 Mahapuranas" },
            { label: "Yajurveda", href: "/library?tab=vedas", sub: "Vedas" },
            { label: "Shvetashvatara", href: "/library/shvetashvatara", sub: "Upanishads" }
          ],
          temples: [
            { label: "Kedarnath Temple", href: "/jyotirlinga/kedarnath", sub: "Garhwal Himalayas" },
            { label: "Somnath Temple", href: "/jyotirlinga/somnath", sub: "Veraval, Gujarat" },
            { label: "Kashi Vishwanath", href: "/jyotirlinga/kashi-vishwanath", sub: "Varanasi, UP" }
          ],
          deities: [
            { label: "Lord Ganesha", href: "/deities/ganesha", sub: "Son of Shiva" },
            { label: "Devi Parvati", href: "/deities/parvati", sub: "Consort of Shiva" },
            { label: "Lord Hanuman", href: "/deities/hanuman", sub: "Rudra Avatar" }
          ],
          festivals: [
            { label: "Maha Shivratri", href: "/deities/shiva", sub: "Great Night of Shiva" },
            { label: "Shravan Somvar", href: "/deities/shiva", sub: "Holy Mondays" },
            { label: "Pradosh Vrat", href: "/deities/shiva", sub: "Bi-monthly Fast" }
          ],
          articles: [
            { label: "Yoga & Meditation", href: "/knowledge?tab=yoga", sub: "Adiyogi Philosophy" },
            { label: "The Science of Temples", href: "/rituals", sub: "Sacred Energy Vortexes" },
            { label: "Cosmic Cycles (Yugas)", href: "/history", sub: "Ticking of Kaal Chakra" }
          ]
        };

      case "vishnu":
      case "hanuman":
        return {
          scriptures: [
            { label: "Bhagavad Gita", href: "/library/gita/chapter/1", sub: "Song of God" },
            { label: "Valmiki Ramayana", href: "/library/ramayana", sub: "Life of Rama" },
            { label: "Bhagavata Purana", href: "/library/bhavata-purana", sub: "Avatar Chronicles" }
          ],
          temples: [
            { label: "Badrinath Temple", href: "/temples?filter=Char Dham", sub: "Northern Char Dham" },
            { label: "Dwarkadhish Temple", href: "/temples?filter=Char Dham", sub: "Kingdom of Krishna" },
            { label: "Sri Ranganathaswamy", href: "/temples?filter=Divya Desams", sub: "Largest Temple Complex" }
          ],
          deities: [
            { label: "Lord Rama", href: "/deities/rama", sub: "7th Avatar of Vishnu" },
            { label: "Lord Krishna", href: "/deities/krishna", sub: "8th Avatar of Vishnu" },
            { label: "Devi Lakshmi", href: "/deities/lakshmi", sub: "Consort of Vishnu" }
          ],
          festivals: [
            { label: "Krishna Janmashtami", href: "/deities/krishna", sub: "Appearance of Krishna" },
            { label: "Rama Navami", href: "/deities/rama", sub: "Appearance of Rama" },
            { label: "Vaikuntha Ekadashi", href: "/deities/vishnu", sub: "Gates of Vaikuntha" }
          ],
          articles: [
            { label: "Nishkama Karma", href: "/knowledge?tab=karma", sub: "Unattached Actions" },
            { label: "The Dashavatar Cycle", href: "/history", sub: "Evolutionary Incarnations" },
            { label: "Puja Vidhi & Upasana", href: "/rituals", sub: "Vedic Ritual Guides" }
          ]
        };

      case "devi":
        return {
          scriptures: [
            { label: "Devi Mahatmya", href: "/library/markandeya-purana", sub: "Glory of Mother Goddess" },
            { label: "Devi Bhagavata", href: "/library?tab=puranas", sub: "18 Mahapuranas" },
            { label: "Sri Sukta", href: "/library?tab=vedas", sub: "Rigvedic Hymns" }
          ],
          temples: [
            { label: "Kamakhya Temple", href: "/temples?filter=Shakti Peethas", sub: "Sacred Peetha, Assam" },
            { label: "Vaishno Devi Temple", href: "/temples?filter=Shakti Peethas", sub: "Holy Cave, J&K" },
            { label: "Meenakshi Amman", href: "/temples", sub: "Madurai, Tamil Nadu" }
          ],
          deities: [
            { label: "Devi Durga", href: "/deities/durga", sub: "Warrior Mother" },
            { label: "Devi Lakshmi", href: "/deities/lakshmi", sub: "Goddess of Wealth" },
            { label: "Devi Saraswati", href: "/deities/saraswati", sub: "Goddess of Wisdom" }
          ],
          festivals: [
            { label: "Shardiya Navratri", href: "/deities/durga", sub: "Nine Nights of Mother" },
            { label: "Durga Puja", href: "/deities/durga", sub: "Victory over Mahishasura" },
            { label: "Vasant Panchami", href: "/deities/saraswati", sub: "Saraswati Appearance" }
          ],
          articles: [
            { label: "The Concept of Shakti", href: "/knowledge?tab=dharma", sub: "Cosmic Feminine Energy" },
            { label: "Dharma & Cosmic Order", href: "/knowledge?tab=dharma", sub: "Foundational Pillars" },
            { label: "Vedic Sound Meditations", href: "/rituals", sub: "Mantra Sound Wave Science" }
          ]
        };

      case "ganesha":
        return {
          scriptures: [
            { label: "Ganesha Purana", href: "/library?tab=puranas", sub: "Upapuranas Collection" },
            { label: "Rigveda Hymns", href: "/library?tab=vedas", sub: "Ganapati Invocations" },
            { label: "Mudgala Purana", href: "/library?tab=puranas", sub: "Eight Avatars of Ganesha" }
          ],
          temples: [
            { label: "Siddhivinayak", href: "/temples", sub: "Prabhadevi, Mumbai" },
            { label: "Dagdusheth Halwai", href: "/temples", sub: "Pune, Maharashtra" },
            { label: "Trinetra Ganesha", href: "/temples", sub: "Ranthambore, Rajasthan" }
          ],
          deities: [
            { label: "Lord Shiva", href: "/deities/shiva", sub: "Father of Ganesha" },
            { label: "Devi Parvati", href: "/deities/parvati", sub: "Mother of Ganesha" },
            { label: "Lord Kartikeya", href: "/deities/kartikeya", sub: "Brother of Ganesha" }
          ],
          festivals: [
            { label: "Ganesh Chaturthi", href: "/deities/ganesha", sub: "Grand Rebirth Festival" },
            { label: "Sankashti Chaturthi", href: "/deities/ganesha", sub: "Monthly Obstacle Removal" },
            { label: "Anant Chaturdashi", href: "/deities/ganesha", sub: "Visarjan Day Chants" }
          ],
          articles: [
            { label: "Removing Obstacles", href: "/knowledge?tab=dharma", sub: "Ganesha's Symbolic Meaning" },
            { label: "Yoga & Pranayama", href: "/knowledge?tab=yoga", sub: "Root Chakra Awakening" },
            { label: "Puja Beginnings Guide", href: "/rituals", sub: "Why Ganesha is Worshipped First" }
          ]
        };

      default:
        return {
          scriptures: [
            { label: "Bhagavad Gita", href: "/library/gita/chapter/1", sub: "Essential Philosophy" },
            { label: "Rigveda Samhita", href: "/library?tab=vedas", sub: "Oldest Vedic Collection" },
            { label: "Isha Upanishad", href: "/library?tab=upanishads", sub: "Non-dual Core Wisdom" }
          ],
          temples: [
            { label: "Kedarnath Temple", href: "/jyotirlinga/kedarnath", sub: "Garhwal Himalayas" },
            { label: "Badrinath Temple", href: "/temples?filter=Char Dham", sub: "Alaknanda River Valley" },
            { label: "Kamakhya Temple", href: "/temples?filter=Shakti Peethas", sub: "Assam Hills Sanctum" }
          ],
          deities: [
            { label: "Lord Shiva", href: "/deities/shiva", sub: "Destroyer & Ascetic" },
            { label: "Lord Vishnu", href: "/deities/vishnu", sub: "Preserver & Ruler" },
            { label: "Devi Durga", href: "/deities/durga", sub: "Divine Warrior Mother" }
          ],
          festivals: [
            { label: "Maha Shivratri", href: "/deities/shiva", sub: "Shiva Night Vigil" },
            { label: "Navratri", href: "/deities/durga", sub: "Nine Forms of Devi" },
            { label: "Diwali (Lakshmi Puja)", href: "/deities/lakshmi", sub: "Festival of Lights" }
          ],
          articles: [
            { label: "The Four Purusharthas", href: "/knowledge", sub: "Dharma, Karma, Moksha, Yoga" },
            { label: "Evolution of Cosmic Yugas", href: "/history", sub: "Cycles of Sacred Time" },
            { label: "Temple Sacred Geometry", href: "/rituals", sub: "Golden Ratio Formats" }
          ]
        };
    }
  };

  const data = getRelatedData();

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12 relative z-20 border-t border-[#D4A01720] mt-12 bg-black/30 rounded-2xl select-text">
      
      {/* Title */}
      <div className="text-center mb-8">
        <h3 className="font-serif text-2xl text-white font-bold uppercase tracking-wider">
          Related Discoveries • परस्पर सम्बद्ध कोष
        </h3>
        <p className="text-xs text-[#9CA3AF] mt-1.5 font-serif max-w-xl mx-auto leading-relaxed">
          Navigate seamlessly through connected realms of scriptures, temples, festivals, and philosophies with a single click.
        </p>
        <div className="w-20 h-[1.5px] bg-[#D4A017] mx-auto mt-3" />
      </div>

      {/* Grid of 5 categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        
        {/* Related Scriptures */}
        <div className="flex flex-col gap-3.5 bg-[#0F0F14]/75 border border-[#B8860B20] rounded-xl p-4 hover:border-[#D4A01740] transition-colors">
          <div className="flex items-center gap-2 text-[#FFD700] border-b border-[#B8860B15] pb-2">
            <Book className="w-4 h-4" />
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider">Scriptures</h4>
          </div>
          <div className="flex flex-col gap-2.5">
            {data.scriptures.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={playNavigate}
                className="flex flex-col text-left group no-underline"
              >
                <span className="text-xs font-bold text-white group-hover:text-[#FFD700] transition-colors line-clamp-1">
                  {item.label}
                </span>
                <span className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">{item.sub}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Temples */}
        <div className="flex flex-col gap-3.5 bg-[#0F0F14]/75 border border-[#B8860B20] rounded-xl p-4 hover:border-[#D4A01740] transition-colors">
          <div className="flex items-center gap-2 text-[#FFD700] border-b border-[#B8860B15] pb-2">
            <Landmark className="w-4 h-4" />
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider">Temples</h4>
          </div>
          <div className="flex flex-col gap-2.5">
            {data.temples.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={playNavigate}
                className="flex flex-col text-left group no-underline"
              >
                <span className="text-xs font-bold text-white group-hover:text-[#FFD700] transition-colors line-clamp-1">
                  {item.label}
                </span>
                <span className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">{item.sub}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Deities */}
        <div className="flex flex-col gap-3.5 bg-[#0F0F14]/75 border border-[#B8860B20] rounded-xl p-4 hover:border-[#D4A01740] transition-colors">
          <div className="flex items-center gap-2 text-[#FFD700] border-b border-[#B8860B15] pb-2">
            <Sparkles className="w-4 h-4" />
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider">Deities</h4>
          </div>
          <div className="flex flex-col gap-2.5">
            {data.deities.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={playNavigate}
                className="flex flex-col text-left group no-underline"
              >
                <span className="text-xs font-bold text-white group-hover:text-[#FFD700] transition-colors line-clamp-1">
                  {item.label}
                </span>
                <span className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">{item.sub}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Festivals */}
        <div className="flex flex-col gap-3.5 bg-[#0F0F14]/75 border border-[#B8860B20] rounded-xl p-4 hover:border-[#D4A01740] transition-colors">
          <div className="flex items-center gap-2 text-[#FFD700] border-b border-[#B8860B15] pb-2">
            <Calendar className="w-4 h-4" />
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider">Festivals</h4>
          </div>
          <div className="flex flex-col gap-2.5">
            {data.festivals.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={playNavigate}
                className="flex flex-col text-left group no-underline"
              >
                <span className="text-xs font-bold text-white group-hover:text-[#FFD700] transition-colors line-clamp-1">
                  {item.label}
                </span>
                <span className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">{item.sub}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        <div className="flex flex-col gap-3.5 bg-[#0F0F14]/75 border border-[#B8860B20] rounded-xl p-4 hover:border-[#D4A01740] transition-colors">
          <div className="flex items-center gap-2 text-[#FFD700] border-b border-[#B8860B15] pb-2">
            <FileText className="w-4 h-4" />
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider">Articles</h4>
          </div>
          <div className="flex flex-col gap-2.5">
            {data.articles.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={playNavigate}
                className="flex flex-col text-left group no-underline"
              >
                <span className="text-xs font-bold text-white group-hover:text-[#FFD700] transition-colors line-clamp-1">
                  {item.label}
                </span>
                <span className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">{item.sub}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
});

RelatedContentDiscovery.displayName = "RelatedContentDiscovery";
export default RelatedContentDiscovery;
