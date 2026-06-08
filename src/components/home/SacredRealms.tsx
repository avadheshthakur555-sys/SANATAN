"use client";

import React, { memo } from "react";
import Link from "next/link";
import { Book, Compass, Sun, Eye, Landmark, UserCheck, Music, Users } from "lucide-react";

interface RealmItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

const REALMS: RealmItem[] = [
  { icon: Book, label: "Gita", href: "/library/gita" },
  { icon: Compass, label: "Vedas", href: "/library?filter=vedas" },
  { icon: Sun, label: "Upanishads", href: "/library?filter=upanishads" },
  { icon: Eye, label: "Puranas", href: "/library?filter=puranas" },
  { icon: Landmark, label: "Temples", href: "/temples" },
  { icon: UserCheck, label: "Deities", href: "/deities" },
  { icon: Music, label: "Mantras", href: "/deities" },
  { icon: Users, label: "Sages", href: "/sages" }
];

const SacredRealms = memo(() => {
  return (
    <section className="py-16 bg-bg select-none flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-6 w-full text-center">
        
        {/* Title */}
        <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[var(--accent-gold)] tracking-wide mb-2">
          Explore Sacred Realms
        </h2>
        <p className="font-body text-xs md:text-sm text-[var(--text-secondary)] mb-12 max-w-xl mx-auto">
          Navigate directly to specific spiritual assets, chronicles, and sonic practices.
        </p>

        {/* Icons Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-6 justify-center max-w-5xl mx-auto">
          {REALMS.map((realm, idx) => {
            const IconComp = realm.icon;
            return (
              <Link 
                key={idx} 
                href={realm.href}
                className="flex flex-col items-center gap-3 group no-underline"
              >
                {/* Circular Icon Container */}
                <div className="w-16 h-16 rounded-full border border-[var(--border-gold)] bg-card-bg backdrop-blur-md flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:border-[var(--color-saffron)] group-hover:shadow-md transition-all duration-382">
                  <IconComp className="w-6 h-6 text-[var(--color-saffron)] group-hover:rotate-12 transition-transform duration-382" />
                </div>
                
                {/* Label */}
                <span className="font-heading text-xs font-bold text-[var(--color-maroon)] dark:text-[var(--accent-gold)] group-hover:text-[var(--color-saffron)] transition-colors duration-382">
                  {realm.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Vertical Golden Divider Line */}
        <div className="w-full flex justify-center mt-20">
          <div className="w-[1px] h-24 bg-gradient-to-b from-[var(--color-saffron)] via-[var(--accent-gold)] to-transparent opacity-60" />
        </div>

      </div>
    </section>
  );
});

SacredRealms.displayName = "SacredRealms";
export default SacredRealms;
