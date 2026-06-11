"use client";

import React, { useState } from "react";
import Link from "next/link";

interface JyotirlingaPlace {
  id: string;
  name: string;
  nameSanskrit: string;
  slug: string;
  type: string;
  description: string;
  latitude: number;
  longitude: number;
  state: string;
  country: string;
  mainDeity: string;
  significance: string;
  images: string; // JSON string array
  historicalEra: string | null;
  architecture: string | null;
  order: number;
}

interface JyotirlingaCatalogProps {
  initialPlaces: JyotirlingaPlace[];
}

// Convert numbers to Roman numerals for premium numbering
const toRoman = (num: number): string => {
  const romanMap: Record<number, string> = {
    12: "XII", 11: "XI", 10: "X", 9: "IX", 8: "VIII",
    7: "VII", 6: "VI", 5: "V", 4: "IV", 3: "III", 2: "II", 1: "I"
  };
  return romanMap[num] || num.toString();
};

export default function JyotirlingaCatalog({ initialPlaces }: JyotirlingaCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState("all");

  const getRegion = (state: string): "north" | "south" | "east" | "west" => {
    const s = state.toLowerCase();
    if (s.includes("uttarakhand") || s.includes("uttar pradesh") || s.includes("madhya pradesh")) {
      return "north";
    }
    if (s.includes("tamil nadu") || s.includes("andhra pradesh") || s.includes("karnataka") || s.includes("kerala")) {
      return "south";
    }
    if (s.includes("jharkhand") || s.includes("bihar") || s.includes("odisha") || s.includes("bengal")) {
      return "east";
    }
    return "west"; // Gujarat, Maharashtra etc.
  };

  const filteredPlaces = initialPlaces.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameSanskrit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const region = getRegion(p.state);
    const matchesRegion = activeRegion === "all" || region === activeRegion;

    return matchesSearch && matchesRegion;
  });

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Search and Filters panel */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-section-alt border border-[var(--border-color)] p-4 rounded-xl shadow-lg">
        {/* Search */}
        <div className="w-full md:w-72 relative">
          <input
            type="text"
            placeholder="Search Jyotirlinga, state, era..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg border border-[var(--border-color)] hover:border-gold focus:border-saffron rounded-lg px-4 py-2 text-sm text-text-main placeholder-text-muted/60 outline-none transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted hover:text-text-main"
            >
              Clear
            </button>
          )}
        </div>

        {/* Region tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
          {["all", "north", "south", "east", "west"].map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-4 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${activeRegion === region ? "bg-gold/10 border-gold text-gold-light shadow-md" : "bg-transparent border-transparent text-text-muted hover:text-text-main"}`}
            >
              {region === "all" ? "All Regions" : `${region}ern`}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-text-muted tracking-wide">
        Showing {filteredPlaces.length} of {initialPlaces.length} Holy Shrines
      </div>

      {/* Grid of Shrines */}
      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => {
            return (
              <div 
                key={place.id}
                className="ag-glass-premium flex flex-col justify-between overflow-hidden transition-all relative group"
              >
                {/* Traditional Order Banner */}
                <div className="absolute top-3 left-3 bg-gold text-bg font-bold font-serif text-[10px] px-2 py-0.5 rounded shadow z-10">
                  Shrine {toRoman(place.order)}
                </div>

                <div className="absolute top-3 right-3 bg-bg border border-[var(--border-color)] text-gold font-semibold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded z-10">
                  {place.state}
                </div>

                {/* Visual Cover (Card top) */}
                <div className="w-full h-44 bg-section-alt border-b border-[var(--border-color)] relative flex items-center justify-center overflow-hidden">
                  {/* Styled SVG backdrop to resemble temple spire silhouette in absence of physical files */}
                  <div className="absolute inset-0 bg-gradient-to-b from-section-alt/80 to-bg/95 z-0 opacity-80" />
                  
                  {/* Sacred graphics decoration */}
                  <svg className="w-28 h-28 text-gold/10 group-hover:text-gold/25 transition-all duration-700 spin-cosmic-slow absolute" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                    <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                  
                  {/* Sanctum Om Logo */}
                  <div className="relative z-10 flex flex-col items-center gap-1.5">
                    <span className="text-3xl text-gold font-sanskrit group-hover:scale-110 transition-transform duration-500 block">ॐ</span>
                    <span className="text-[10px] text-text-muted tracking-widest uppercase font-mono block">Shiva Jyoti</span>
                  </div>
                </div>

                {/* Info Details */}
                <div className="p-6 flex flex-col gap-4 flex-grow justify-between">
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="font-sanskrit text-lg text-gold-light block">{place.nameSanskrit}</span>
                      <h3 className="text-text-main font-serif text-xl font-bold mt-0.5 group-hover:text-gold transition-colors">
                        {place.name}
                      </h3>
                    </div>
                    
                    <p className="text-xs text-text-muted line-clamp-3 leading-relaxed mt-1">
                      {place.description}
                    </p>
                  </div>

                  <div className="border-t border-[var(--border-color)] pt-4 mt-2 flex items-center justify-between text-xs text-text-muted">
                    <div>
                      <span className="block text-[9px] uppercase font-mono tracking-wider opacity-60">Era</span>
                      <span className="text-text-main font-semibold">{place.historicalEra || "Ancient"}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase font-mono tracking-wider opacity-60">Architecture</span>
                      <span className="text-text-main font-semibold">{place.architecture ? place.architecture.split(" ")[0] : "Nagara"}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link
                      href={`/jyotirlinga/${place.slug}`}
                      className="w-full py-2 bg-section-alt hover:bg-gold border border-[var(--border-color)] hover:border-gold text-gold hover:text-bg font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center transition-all duration-300 no-underline cursor-pointer"
                    >
                      Enter Shrine Experience →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-section-alt border border-[var(--border-color)] rounded-xl flex flex-col items-center justify-center gap-3">
          <span className="text-4xl">🕉️</span>
          <h4 className="text-text-main font-serif text-lg font-bold">No Shrines Found</h4>
          <p className="text-xs text-text-muted max-w-sm leading-relaxed">
            Your search query did not match any Jyotirlinga. Try selecting &ldquo;All Regions&rdquo; or checking spelling.
          </p>
        </div>
      )}
    </div>
  );
}
