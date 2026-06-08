"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { BookOpen, MapPin, Sparkles, Compass, Flame, Scroll } from "lucide-react";

interface CategoryItem {
  slug: string;
  sanskrit: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  linkText: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    slug: "library",
    sanskrit: "शास्त्र",
    title: "Scriptures",
    description: "Explore Shruti & Smriti texts, Vedas, Upanishads & Bhagavad Gita",
    icon: BookOpen,
    linkText: "Explore Scriptures"
  },
  {
    slug: "temples",
    sanskrit: "मन्दिर",
    title: "Temples",
    description: "Discover sacred architecture, Jyotirlingas, Shakti Peethas & Char Dham",
    icon: MapPin,
    linkText: "Discover Temples"
  },
  {
    slug: "deities",
    sanskrit: "देवता",
    title: "Deities",
    description: "Learn about the Trimurti, Tridevi, and their celestial avatars",
    icon: Sparkles,
    linkText: "Meet Deities"
  },
  {
    slug: "yugas",
    sanskrit: "युग",
    title: "Yugas",
    description: "Understand cosmic epochs: Satya, Treta, Dvapara & Kali Yuga",
    icon: Compass,
    linkText: "View Timeline"
  },
  {
    slug: "rituals",
    sanskrit: "विधि",
    title: "Rituals",
    description: "Study sacred yajnas, sanskaras, and daily spiritual practices",
    icon: Flame,
    linkText: "Study Rituals"
  },
  {
    slug: "sages",
    sanskrit: "ऋषि",
    title: "Sages",
    description: "Read stories of Rishis, philosophers, and keepers of ancient wisdom",
    icon: Scroll,
    linkText: "Read Bios"
  }
];

const FeaturedScriptures = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-section-alt to-bg select-none border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <SectionHeading>Sacred Portals</SectionHeading>
        
        <p className="font-body text-sm md:text-base text-[var(--text-secondary)] text-center max-w-2xl mx-auto mb-14 -mt-2">
          Step through the portals of ancient wisdom to discover the eternal foundations of Sanatan Dharma.
        </p>

        {/* Categories Grid */}
        <div 
          ref={containerRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-618 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {CATEGORIES.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.slug}
                href={`/${category.slug}`}
                className="category-card group hover-lift border border-[var(--border-gold)] p-6 rounded-xl flex flex-col justify-between h-[200px]"
              >
                <div className="flex flex-col gap-3">
                  {/* Icon & Sanskrit Subheading row */}
                  <div className="flex justify-between items-center w-full">
                    <IconComponent className="w-6 h-6 text-[var(--color-saffron)]" />
                    <span 
                      className="font-sanskrit text-sm font-semibold text-[var(--color-saffron)] opacity-70"
                      style={{ fontFamily: "var(--font-sanskrit)" }}
                    >
                      {category.sanskrit}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] leading-none mt-1">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>

                {/* Explore Link */}
                <div className="text-[var(--color-saffron)] text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-382 mt-4">
                  <span>{category.linkText}</span>
                  <span>→</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
});

FeaturedScriptures.displayName = "FeaturedScriptures";
export default FeaturedScriptures;
