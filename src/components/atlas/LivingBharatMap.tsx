"use client";

import React, { useState } from "react";
import { Compass, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSacredSound } from "@/lib/sacred-audio";
import { motion, AnimatePresence } from "framer-motion";

interface PlaceSummary {
  name: string;
  category: "Char Dham" | "Jyotirlingas" | "Shakti Peethas" | "Divya Desams";
  location: string;
  deity: string;
  significance: string;
  xPos: string;
  yPos: string;
}

interface LivingBharatMapProps {
  places: PlaceSummary[];
  selectedPlace: PlaceSummary | null;
  onPlaceSelect: (place: PlaceSummary) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  clearSelection: () => void;
}

export default function LivingBharatMap({
  places,
  selectedPlace,
  onPlaceSelect,
  activeFilter,
  onFilterChange,
}: LivingBharatMapProps) {
  const [hoveredPlace, setHoveredPlace] = useState<PlaceSummary | null>(null);
  const { playClick, playSuccess } = useSacredSound();

  const getMarkerColor = (category: string) => {
    switch (category) {
      case "Jyotirlingas":
        return "#FF8C00"; // Saffron
      case "Char Dham":
        return "#FFD700"; // Gold
      case "Shakti Peethas":
        return "#D32F2F"; // Crimson Red
      case "Divya Desams":
        return "#2563EB"; // Royal Blue
      default:
        return "#9C27B0";
    }
  };

  const getTempleSlug = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("kedarnath")) return "kedarnath";
    if (n.includes("somnath")) return "somnath";
    if (n.includes("kashi vishwanath")) return "kashi-vishwanath";
    if (n.includes("rameshwaram") || n.includes("rameswaram")) return "rameshwaram";
    if (n.includes("badrinath")) return "badrinath";
    if (n.includes("kamakhya")) return "kamakhya";
    if (n.includes("vaishno devi")) return "vaishno-devi";
    if (n.includes("ranganathaswamy")) return "ranganathaswamy";
    if (n.includes("tirumala")) return "tirumala-venkateswara";
    if (n.includes("jagannath")) return "jagannath-puri";
    if (n.includes("dwarka")) return "dwarkadhish";
    return n.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const getTempleThumbnail = (name: string) => {
    const slug = getTempleSlug(name);
    if (slug === "kedarnath") return "/images/temples/kedarnath.jpg";
    if (slug === "somnath") return "/images/temples/somnath.jpg";
    return "/images/hero-temple-sanctum.png";
  };

  // Connect Char Dham sites (Badrinath, Puri, Rameshwaram, Dwarka)
  const isCharDhamRouteVisible = activeFilter === "all" || activeFilter === "Char Dham";

  return (
    <div className="w-full flex flex-col items-center gap-6 select-none bg-[#0a0614]/25 border border-[#D4AF37]/15 p-6 rounded-2xl backdrop-blur-md shadow-xl">
      {/* Title / Header */}
      <div className="flex items-center justify-between w-full border-b border-[#D4AF37]/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-[#D4AF37] font-bold">
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>Living Sacred Bharat Map</span>
        </div>
        <span className="text-[9px] text-gray-500 font-mono">5000+ Years Pilgrimage Routes</span>
      </div>

      {/* Category Filters Bar */}
      <div className="flex flex-wrap gap-2 justify-center w-full">
        {["All", "Char Dham", "Jyotirlingas", "Shakti Peethas", "Divya Desams"].map((category) => (
          <button
            key={category}
            onClick={() => {
              playClick();
              onFilterChange(category === "All" ? "all" : category);
            }}
            className={`px-3 py-1.5 rounded-full border text-[9px] font-semibold uppercase tracking-wider transition-all cursor-pointer outline-none
              ${
                (activeFilter === "all" && category === "All") || activeFilter === category
                  ? "bg-[#D4AF37]/15 border-[#FFD700] text-[#FFD700] shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                  : "bg-transparent border-white/5 text-gray-400 hover:text-white hover:border-[#D4AF37]/30"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Schematic Map Box */}
      <div className="w-full max-w-md aspect-[4/5] bg-[#030107]/60 border border-[#D4AF37]/25 rounded-2xl relative overflow-hidden flex items-center justify-center p-4">
        {/* Animated grid lines behind the map */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Abstract shape representing India with high-end glassmorphism glows */}
        <div className="absolute inset-10 border border-[#D4AF37]/10 rounded-[35%_65%_70%_30%_/_30%_40%_60%_70%] bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-transparent rotate-12 pointer-events-none" />

        {/* Char Dham Pilgrimage Route (Animated SVG Lines) */}
        {isCharDhamRouteVisible && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <style>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: -40;
                }
              }
              .char-dham-path {
                animation: dash 2.5s linear infinite;
              }
            `}</style>
            {/* Badrinath (52%, 22%) -> Puri (68%, 52%) */}
            <line x1="52%" y1="22%" x2="68%" y2="52%" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="6,4" className="char-dham-path" opacity="0.6" />
            {/* Puri (68%, 52%) -> Rameswaram (51%, 85%) */}
            <line x1="68%" y1="52%" x2="51%" y2="85%" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="6,4" className="char-dham-path" opacity="0.6" />
            {/* Rameswaram (51%, 85%) -> Dwarkadhish (25%, 46%) */}
            <line x1="51%" y1="85%" x2="25%" y2="46%" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="6,4" className="char-dham-path" opacity="0.6" />
            {/* Dwarkadhish (25%, 46%) -> Badrinath (52%, 22%) */}
            <line x1="25%" y1="46%" x2="52%" y2="22%" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="6,4" className="char-dham-path" opacity="0.6" />
          </svg>
        )}

        {/* Hotspots */}
        {places.map((p) => {
          const isSelected = selectedPlace?.name === p.name;
          const isHovered = hoveredPlace?.name === p.name;
          const isVisible = activeFilter === "all" || p.category === activeFilter;
          const color = getMarkerColor(p.category);

          return (
            <button
              key={p.name}
              onClick={() => {
                playSuccess();
                onPlaceSelect(p);
              }}
              onMouseEnter={() => setHoveredPlace(p)}
              onMouseLeave={() => setHoveredPlace(null)}
              className={`absolute group cursor-pointer outline-none border-none p-0 z-20 transition-all duration-300
                ${isVisible ? "opacity-100 scale-100" : "opacity-20 scale-75 pointer-events-none"}
              `}
              style={{ left: p.xPos, top: p.yPos }}
              aria-label={p.name}
            >
              {/* Saffron/Gold Ping animations */}
              {(isSelected || isHovered) && (
                <span 
                  className="absolute -inset-3.5 rounded-full animate-ping opacity-60"
                  style={{ backgroundColor: `${color}30` }}
                />
              )}
              <span 
                className="absolute -inset-1.5 rounded-full group-hover:animate-pulse"
                style={{ backgroundColor: `${color}15` }}
              />

              {/* Marker Dot */}
              <span
                className={`relative block w-3.5 h-3.5 rounded-full border border-black shadow-lg transition-transform duration-300
                  ${isSelected ? "scale-125" : "group-hover:scale-110"}
                `}
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}`,
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Living Preview / Tooltip Card */}
      <div className="w-full min-h-[90px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {hoveredPlace || selectedPlace ? (
            <motion.div
              key={(hoveredPlace || selectedPlace)!.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full flex items-center gap-4 bg-[#0A0614]/80 border border-[#D4AF37]/35 p-3 rounded-xl shadow-lg relative overflow-hidden"
            >
              {/* Thumbnail with arched shape */}
              <div 
                className="w-16 h-16 rounded-t-full rounded-b-md border border-[#D4AF37]/30 bg-cover bg-center bg-no-repeat flex-shrink-0"
                style={{ backgroundImage: `url(${getTempleThumbnail((hoveredPlace || selectedPlace)!.name)})` }}
              />

              {/* Info text */}
              <div className="flex-grow text-left">
                <span 
                  className="text-[9px] font-mono uppercase tracking-widest font-bold"
                  style={{ color: getMarkerColor((hoveredPlace || selectedPlace)!.category) }}
                >
                  {(hoveredPlace || selectedPlace)!.category}
                </span>
                <h4 className="font-serif text-sm font-bold text-white mt-0.5">
                  {(hoveredPlace || selectedPlace)!.name}
                </h4>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#FF8C00]" />
                  <span>{(hoveredPlace || selectedPlace)!.location}</span>
                </div>
              </div>

              {/* Link button */}
              <Link
                href={`/temples/${getTempleSlug((hoveredPlace || selectedPlace)!.name)}`}
                onClick={playClick}
                className="flex items-center justify-center p-2 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] hover:text-white hover:bg-[#D4AF37] transition-all"
                title="Enter Pilgrimage"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <motion.span
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="text-xs text-gray-500 font-mono italic"
            >
              Hover or click a glowing coordinates marker to begin darshan
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
