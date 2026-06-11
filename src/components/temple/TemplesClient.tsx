"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { Compass, Search, MapPin, Landmark, ArrowRight, Sparkles, Filter, Navigation, Calendar, BookOpen } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import GoldParticleField from "@/components/effects/GoldParticleField";
import AtlasInteractiveMap from "@/components/atlas/AtlasInteractiveMap";
import { motion, AnimatePresence } from "framer-motion";

export interface SacredPlace {
  id: string;
  name: string;
  nameSanskrit: string;
  slug: string;
  type: string; // "JYOTIRLINGA" | "CHAR_DHAM" | "SHAKTI_PEETHA" | "DIVYA_DESAM"
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
}

interface TemplesClientProps {
  initialPlaces: SacredPlace[];
}

export default function TemplesClient({ initialPlaces }: TemplesClientProps) {
  const { playClick, playSuccess, playNavigate } = useSacredSound();
  const containerRef = useRef<HTMLDivElement>(null);

  const [places] = useState<SacredPlace[]>(initialPlaces);
  const [selectedPlace, setSelectedPlace] = useState<SacredPlace | null>(
    initialPlaces.length > 0 ? initialPlaces[0] : null
  );
  
  // Filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeRoute, setActiveRoute] = useState<string | null>(null);
  const [deityFilter, setDeityFilter] = useState<string>("all");
  const [terrainFilter, setTerrainFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");

  // Sync route and filters
  const handleRouteSelect = (route: string | null) => {
    playClick();
    setActiveRoute(route);
    if (route === "char_dham") {
      setActiveFilter("Char Dham");
    } else if (route === "jyotirlinga") {
      setActiveFilter("Jyotirlingas");
    } else {
      setActiveFilter("all");
    }
  };

  const handleCollectionSelect = (colName: string) => {
    playClick();
    setActiveRoute(null);
    setActiveFilter(colName);
  };

  // Helper projection logic
  const getMarkerColor = (type: string) => {
    switch (type.toUpperCase()) {
      case "JYOTIRLINGA": return "#FF8C00";
      case "CHAR_DHAM": return "#FFD700";
      case "SHAKTI_PEETHA": return "#D32F2F";
      case "DIVYA_DESAM": return "#2563EB";
      default: return "#D4AF37";
    }
  };

  const getTempleImagesList = (jsonStr: string): string[] => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {}
    return ["/images/hero-temple-sanctum.png"];
  };

  // Derived filter logic
  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      // 1. Category tab filter
      const mappedType = activeFilter === "all" ? "all" : activeFilter.toUpperCase().replace(" ", "_");
      const matchesCategory = mappedType === "all" || p.type === mappedType;

      // 2. Route node matches
      let matchesRoute = true;
      if (activeRoute === "char_dham") {
        matchesRoute = ["badrinath", "jagannath-puri", "rameshwaram", "dwarkadhish"].includes(p.slug);
      } else if (activeRoute === "jyotirlinga") {
        matchesRoute = p.type === "JYOTIRLINGA";
      }

      // 3. Search query
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.nameSanskrit.includes(searchTerm) ||
        p.state.toLowerCase().includes(searchTerm.toLowerCase());

      // 4. Deity filters
      const matchesDeity =
        deityFilter === "all" ||
        p.mainDeity.toLowerCase().includes(deityFilter.toLowerCase());

      // 5. Region / State classification
      let matchesRegion = true;
      if (regionFilter !== "all") {
        const north = ["uttarakhand", "jammu & kashmir", "jammu", "kashmir", "himachal pradesh"];
        const south = ["tamil nadu", "andhra pradesh", "karnataka", "kerala"];
        const west = ["gujarat", "maharashtra", "rajasthan"];
        const east = ["odisha", "assam", "west bengal"];
        const central = ["uttar pradesh", "madhya pradesh", "chhattisgarh", "jharkhand", "bihar"];
        
        const stateLower = p.state.toLowerCase();
        if (regionFilter === "himalayan") matchesRegion = north.some(s => stateLower.includes(s));
        else if (regionFilter === "south") matchesRegion = south.some(s => stateLower.includes(s));
        else if (regionFilter === "west") matchesRegion = west.some(s => stateLower.includes(s));
        else if (regionFilter === "east") matchesRegion = east.some(s => stateLower.includes(s));
        else if (regionFilter === "central") matchesRegion = central.some(s => stateLower.includes(s));
      }

      // 6. Terrain classification
      let matchesTerrain = true;
      if (terrainFilter !== "all") {
        const descLower = p.description.toLowerCase() + " " + p.significance.toLowerCase();
        if (terrainFilter === "mountain") {
          matchesTerrain = descLower.includes("mountain") || descLower.includes("hills") || descLower.includes("peaks") || descLower.includes("altitude");
        } else if (terrainFilter === "river") {
          matchesTerrain = descLower.includes("river") || descLower.includes("bank") || descLower.includes("ganga") || descLower.includes("kaveri") || descLower.includes("narmada");
        } else if (terrainFilter === "coast") {
          matchesTerrain = descLower.includes("sea") || descLower.includes("coast") || descLower.includes("beach") || descLower.includes("island") || descLower.includes("ocean");
        } else if (terrainFilter === "cave") {
          matchesTerrain = descLower.includes("cave") || descLower.includes("subterranean") || descLower.includes("rock");
        }
      }

      return matchesCategory && matchesRoute && matchesSearch && matchesDeity && matchesRegion && matchesTerrain;
    });
  }, [places, searchTerm, activeFilter, activeRoute, deityFilter, regionFilter, terrainFilter]);

  // Derive selected place from filtered places to avoid cascading render state updates
  const activeSelectedPlace = useMemo(() => {
    if (selectedPlace && filteredPlaces.some(p => p.id === selectedPlace.id)) {
      return selectedPlace;
    }
    return filteredPlaces[0] || null;
  }, [filteredPlaces, selectedPlace]);

  return (
    <div className="min-h-screen w-full bg-black text-[#F5F0E8] relative overflow-hidden flex flex-col items-center">
      {/* Background Starry Universe & Sacred Cosmic Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,0,15,0.75)_0%,rgba(0,0,0,1)_100%)] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(184,134,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(184,134,11,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      <div className="absolute inset-0 pointer-events-none z-10">
        <GoldParticleField />
      </div>

      <div className="w-full max-w-7xl px-6 relative z-10">
        {/* Universal Breadcrumb */}
        <Breadcrumb items={[{ label: "Sacred Atlas" }]} />

        {/* SECTION 1: CINEMATIC ATLAS HERO */}
        <header className="w-full text-center py-10 flex flex-col items-center gap-4 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 text-[#FFD700] uppercase font-mono tracking-widest text-[10px] font-bold bg-[#B8860B10] px-4 py-1.5 rounded-full border border-[#B8860B30] hover:shadow-[0_0_15px_rgba(184,134,11,0.2)] transition-all"
          >
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Sacred Geography of Bharatvarsha</span>
          </motion.div>
          
          <h1 className="font-serif text-[#FFD700] text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mt-2 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] uppercase">
            Sacred Atlas
          </h1>
          
          <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed mx-auto">
            Embark on a virtual pilgrimage across the cosmic lines of Bharat. Map, inspect, and experience the energy fields of the 12 Jyotirlingas, Char Dham, Shakti Peethas, and Divya Desams.
          </p>
        </header>

        {/* SECTION 2: INTERACTIVE BHARAT MAP CONTAINER */}
        <section ref={containerRef} className="w-full mb-12 bg-white/3 border border-[#D4AF37]/25 p-5 md:p-8 rounded-3xl backdrop-blur-md shadow-2xl relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#D4AF37]/10 to-transparent pointer-events-none rounded-tr-3xl" />
          <AtlasInteractiveMap
            places={filteredPlaces}
            selectedPlace={activeSelectedPlace}
            onPlaceSelect={(p) => { playSuccess(); setSelectedPlace(p); }}
            activeFilter={activeFilter}
            activeRoute={activeRoute}
          />
        </section>

        {/* SECTION 5: TEMPLE COLLECTIONS (GRID GROUPS) */}
        <section className="w-full mb-16 select-none">
          <h3 className="font-serif text-lg text-[#FFD700] uppercase tracking-widest text-center mb-8">
            Sacred Collections • देवस्थान विभाग
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "Jyotirlingas",
                title: "12 Jyotirlingas",
                sanskrit: "द्वादश ज्योतिर्लिङ्गानि",
                desc: "The infinite pillars of light and cosmic fire manifested by Lord Shiva.",
                color: "#FF8C00",
                bg: "from-[#FF8C00]/10 via-transparent to-transparent"
              },
              {
                id: "Char Dham",
                title: "Char Dham",
                sanskrit: "चतुर्धाम",
                desc: "The four sacred cardinal abodes of Lord Vishnu spanning across India.",
                color: "#FFD700",
                bg: "from-[#FFD700]/10 via-transparent to-transparent"
              },
              {
                id: "Shakti Peethas",
                title: "Shakti Peethas",
                sanskrit: "शक्तिपीठानि",
                desc: "Fifty-one energy seats of the Divine Mother representing cosmic power.",
                color: "#D32F2F",
                bg: "from-[#D32F2F]/10 via-transparent to-transparent"
              },
              {
                id: "Divya Desams",
                title: "Divya Desams",
                sanskrit: "दिव्य देशम्",
                desc: "Sacred Vishnu abodes hailed in ancient Tamil scriptures of the Alvars.",
                color: "#2563EB",
                bg: "from-[#2563EB]/10 via-transparent to-transparent"
              }
            ].map((col) => {
              const isActive = activeFilter === col.id;
              return (
                <button
                  key={col.id}
                  onClick={() => handleCollectionSelect(col.id)}
                  className={`relative p-6 rounded-2xl border text-left flex flex-col justify-between h-56 transition-all duration-300 group cursor-pointer outline-none bg-gradient-to-b ${col.bg}
                    ${isActive
                      ? "border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.15)] bg-black/60"
                      : "border-[#D4AF37]/20 bg-black/30 hover:border-[#D4AF37]/50"}`}
                >
                  {/* Top line with category color */}
                  <div
                    className="absolute top-0 inset-x-0 h-1 rounded-t-2xl transition-all duration-300"
                    style={{ backgroundColor: col.color, opacity: isActive ? 1 : 0.4 }}
                  />

                  <div className="space-y-2">
                    <span className="font-sanskrit text-sm font-bold text-gray-500 group-hover:text-white transition-colors">{col.sanskrit}</span>
                    <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors">{col.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">{col.desc}</p>
                  </div>

                  <div className="flex items-center justify-between w-full pt-4 mt-auto border-t border-[#D4AF37]/10 text-[10px] font-mono uppercase tracking-wider font-bold">
                    <span style={{ color: col.color }}>Explore Chamber</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: PILGRIMAGE ROUTES */}
        <section className="w-full mb-16">
          <div className="bg-[#0A0614]/85 border border-[#D4AF37]/35 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-md relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="lg:w-1/2 flex flex-col gap-4 text-left">
              <span className="text-[10px] text-[#FFD700] uppercase font-mono tracking-widest font-bold">Pilgrimage Trails</span>
              <h3 className="font-serif text-2xl md:text-3xl text-white font-bold leading-tight">
                Sacred Pilgrimage Yatras
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
                Experience the traditional energy loops mapped out by sages. Selecting a path overlays the journey circuit directly onto the interactive map, charting the spiritual milestones of Bharat.
              </p>
              
              <div className="flex flex-col gap-2 mt-2">
                {[
                  { id: "char_dham", label: "The Char Dham Loop", desc: "Northern, Eastern, Southern & Western corners" },
                  { id: "jyotirlinga", label: "The 12 Jyotirlinga Fire Trail", desc: "12 supreme self-manifested Shiva temples" },
                  { id: null, label: "View All Coordinates", desc: "Release route line locks and browse freely" }
                ].map((route) => {
                  const isActive = activeRoute === route.id;
                  return (
                    <button
                      key={route.id ?? "all"}
                      onClick={() => handleRouteSelect(route.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer outline-none
                        ${isActive 
                          ? "bg-[#D4AF37]/15 border-[#FFD700] text-[#FFD700]" 
                          : "bg-black/40 border-white/5 text-gray-400 hover:border-[#D4AF37]/35 hover:text-white"}`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold font-serif block">{route.label}</span>
                        <span className="text-[10px] opacity-75 font-sans block">{route.desc}</span>
                      </div>
                      <Navigation className={`w-4 h-4 transition-transform duration-500 ${isActive ? "rotate-45 text-[#FFD700]" : "opacity-30"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visual preview or yatra coordinates steps display */}
            <div className="lg:w-1/2 w-full bg-black/60 border border-[#D4AF37]/20 rounded-xl p-5 md:p-6 flex flex-col justify-between h-[360px] text-left">
              <div className="space-y-4">
                <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest font-bold">Route Leginerary</span>
                <h4 className="font-serif text-lg font-bold text-[#FFD700]">
                  {activeRoute === "char_dham" ? "Char Dham Pilgrimage Route" : activeRoute === "jyotirlinga" ? "12 Jyotirlinga Pilgrimage Route" : "All Coordinates Active"}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans -mt-2">
                  {activeRoute === "char_dham" 
                    ? "Historically established by Adi Shankaracharya in the 8th century to bind the cardinal energy gates of Bharatvarsha."
                    : activeRoute === "jyotirlinga"
                    ? "Vedic energy vortexes located in dense forests, mountain peaks, and river beds, radiating cosmic awareness."
                    : "Inspect any coordinates from all 19 major sacred spots. Toggle state filters below to narrow search."}
                </p>

                <div className="w-full h-[1px] bg-[#D4AF37]/15" />

                <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
                  {activeRoute === "char_dham" ? (
                    [
                      { step: "1", name: "Badrinath Temple", state: "Uttarakhand (North)" },
                      { step: "2", name: "Jagannath Puri Temple", state: "Odisha (East)" },
                      { step: "3", name: "Rameshwaram Temple", state: "Tamil Nadu (South)" },
                      { step: "4", name: "Dwarkadhish Temple", state: "Gujarat (West)" }
                    ].map((s) => (
                      <div key={s.step} className="flex items-center gap-3 text-xs">
                        <span className="w-5 h-5 rounded-full bg-[#FFD700] text-black font-bold flex items-center justify-center text-[10px] shrink-0">{s.step}</span>
                        <div>
                          <span className="text-white font-bold block">{s.name}</span>
                          <span className="text-[10px] text-gray-500 block">{s.state}</span>
                        </div>
                      </div>
                    ))
                  ) : activeRoute === "jyotirlinga" ? (
                    [
                      { step: "1", name: "Somnath", state: "Gujarat" },
                      { step: "2", name: "Mallikarjuna", state: "Andhra Pradesh" },
                      { step: "3", name: "Mahakaleshwar", state: "Madhya Pradesh" },
                      { step: "4", name: "Omkareshwar", state: "Madhya Pradesh" },
                      { step: "5", name: "Kedarnath", state: "Uttarakhand" },
                      { step: "6", name: "Bhimashankar", state: "Maharashtra" },
                      { step: "7", name: "Kashi Vishwanath", state: "Uttar Pradesh" },
                      { step: "8", name: "Trimbakeshwar", state: "Maharashtra" },
                      { step: "9", name: "Vaidyanath", state: "Jharkhand" },
                      { step: "10", name: "Nageshwar", state: "Gujarat" },
                      { step: "11", name: "Rameshwaram", state: "Tamil Nadu" },
                      { step: "12", name: "Grishneshwar", state: "Maharashtra" }
                    ].map((s) => (
                      <div key={s.step} className="flex items-center gap-3 text-xs">
                        <span className="w-5 h-5 rounded-full bg-[#FF8C00] text-black font-bold flex items-center justify-center text-[10px] shrink-0">{s.step}</span>
                        <div>
                          <span className="text-white font-bold block">{s.name}</span>
                          <span className="text-[10px] text-gray-500 block">{s.state}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-gray-500 font-mono text-[11px] gap-2">
                      <BookOpen className="w-6 h-6 opacity-30 text-[#D4AF37]" />
                      <span>Select a specific yatra loop to list route steps.</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[9px] text-[#9CA3AF] font-mono border-t border-[#D4AF37]/10 pt-2 mt-auto">
                {activeRoute ? "Visualization loop lines active on Sacred Cartography map" : "Browse all coordinates"}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: SACRED GEOGRAPHY EXPLORER (FILTERS CONSOLE) */}
        <section className="w-full mb-8">
          <div className="bg-[#0F0F14]/70 border border-[#B8860B30] rounded-2xl p-6 flex flex-col gap-6 text-left relative z-20 select-none">
            <div className="flex items-center gap-2 border-b border-[#B8860B15] pb-3">
              <Filter className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="font-serif text-lg text-white font-bold uppercase tracking-wider">Sacred Geography Explorer</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search filter */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Search Name or State</span>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search e.g. Kedarnath..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-black border border-[#B8860B25] focus:border-[#FFD700] rounded-lg text-xs outline-none text-[#F5F0E8] transition-all"
                  />
                </div>
              </div>

              {/* Deity Filter */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Deity Focus</span>
                <select
                  value={deityFilter}
                  onChange={(e) => setDeityFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-[#B8860B25] focus:border-[#FFD700] rounded-lg text-xs outline-none text-[#F5F0E8] transition-all cursor-pointer"
                >
                  <option value="all">All Deities</option>
                  <option value="shiva">Lord Shiva</option>
                  <option value="vishnu">Lord Vishnu</option>
                  <option value="shakti">Divine Mother (Sati/Shakti)</option>
                </select>
              </div>

              {/* Region Filter */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Geographic Region</span>
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-[#B8860B25] focus:border-[#FFD700] rounded-lg text-xs outline-none text-[#F5F0E8] transition-all cursor-pointer"
                >
                  <option value="all">All Regions</option>
                  <option value="himalayan">Himalayan Peaks (North)</option>
                  <option value="south">Southern Plains (South)</option>
                  <option value="west">Western Shoreline (West)</option>
                  <option value="east">Eastern Delta (East)</option>
                  <option value="central">Central Heartland (Central)</option>
                </select>
              </div>

              {/* Terrain Filter */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Terrain Type</span>
                <select
                  value={terrainFilter}
                  onChange={(e) => setTerrainFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-[#B8860B25] focus:border-[#FFD700] rounded-lg text-xs outline-none text-[#F5F0E8] transition-all cursor-pointer"
                >
                  <option value="all">All Terrains</option>
                  <option value="mountain">Mountain Peaks & Valleys</option>
                  <option value="river">River Banks</option>
                  <option value="coast">Sea Coasts & Islands</option>
                  <option value="cave">Cave Sanctums</option>
                </select>
              </div>
            </div>

            {/* Clear All Filters button */}
            {(searchTerm || activeFilter !== "all" || activeRoute || deityFilter !== "all" || terrainFilter !== "all" || regionFilter !== "all") && (
              <div className="flex justify-end pt-2 border-t border-[#B8860B10]">
                <button
                  onClick={() => {
                    playClick();
                    setSearchTerm("");
                    setActiveFilter("all");
                    setActiveRoute(null);
                    setDeityFilter("all");
                    setTerrainFilter("all");
                    setRegionFilter("all");
                  }}
                  className="text-[10px] font-mono font-bold text-red-400 hover:text-red-300 hover:underline cursor-pointer bg-transparent border-none outline-none"
                >
                  Reset All Filters & Routes
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: FEATURED SACRED DESTINATIONS (VISUAL GRID CARDS) */}
        <section className="w-full mb-16 select-text">
          <div className="flex justify-between items-baseline mb-8">
            <h3 className="font-serif text-2xl text-white font-bold uppercase tracking-wider">
              Sacred Destinations • देवस्थान मन्दिर
            </h3>
            <span className="text-xs text-gray-500 font-mono">Showing {filteredPlaces.length} Holy Shrines</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPlaces.map((place) => {
                const imgUrl = getTempleImagesList(place.images)[0];
                const typeColor = getMarkerColor(place.type);
                return (
                  <motion.div
                    layout
                    key={place.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-black border border-[#D4AF37]/20 rounded-2xl overflow-hidden group hover:border-[#FFD700] hover:shadow-[0_12px_30px_rgba(212,175,55,0.15)] transition-all duration-300 flex flex-col justify-between h-[400px]"
                  >
                    {/* Background card image with gradient overlay */}
                    <div className="absolute inset-0 z-0 pointer-events-none select-none">
                      <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${imgUrl})` }}
                      />
                      {/* Gradient masking out the image from top/middle to give high readability to details */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-[#050406]/30" />
                    </div>

                    {/* Card Content Top header */}
                    <div className="relative z-10 p-5 flex justify-between items-start select-none w-full">
                      <span
                        className="text-[9px] uppercase tracking-widest font-mono font-bold px-2.5 py-0.5 rounded-full border bg-black/60 shadow-md"
                        style={{ color: typeColor, borderColor: `${typeColor}40` }}
                      >
                        {place.type.replace("_", " ")}
                      </span>
                    </div>

                    {/* Card Content details */}
                    <div className="relative z-10 p-5 flex flex-col gap-3 mt-auto w-full text-left">
                      <div className="space-y-0.5">
                        <span className="font-sanskrit text-sm font-bold text-[#FFD700] block tracking-wide">
                          {place.nameSanskrit}
                        </span>
                        <h4 className="font-serif text-xl font-bold text-white leading-tight group-hover:text-[#FFD700] transition-colors">
                          {place.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#FF8C00] shrink-0" />
                          <span>{place.state}, Bharat</span>
                        </div>
                      </div>

                      {/* Line divider */}
                      <div className="w-full h-[0.5px] bg-[#D4AF37]/15 my-0.5" />

                      {/* Description */}
                      <p className="text-[11px] text-gray-300 leading-relaxed font-sans line-clamp-3">
                        {place.significance}
                      </p>

                      {/* Info footer metadata row */}
                      <div className="flex justify-between items-center pt-2 border-t border-[#D4AF37]/10 text-[10px] text-gray-400">
                        <div>
                          <span className="block font-mono text-[8px] uppercase text-gray-500">Main Deity</span>
                          <span className="font-bold text-white">{place.mainDeity}</span>
                        </div>
                        <Link
                          href={`/temples/${place.slug}`}
                          onClick={() => { playNavigate(); }}
                          className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#FFD700] text-[#FFD700] hover:text-black font-extrabold uppercase tracking-wider text-[9px] transition-all no-underline"
                        >
                          <span>Enter</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredPlaces.length === 0 && (
            <div className="text-center py-24 bg-[#0F0F14]/30 border border-[#B8860B15] rounded-2xl flex flex-col items-center gap-4">
              <span className="text-4xl block">🕉️</span>
              <p className="text-sm text-gray-400 font-mono">No sacred destinations match the active explorer filters.</p>
              <button
                onClick={() => {
                  playClick();
                  setSearchTerm("");
                  setActiveFilter("all");
                  setActiveRoute(null);
                  setDeityFilter("all");
                  setTerrainFilter("all");
                  setRegionFilter("all");
                }}
                className="px-4 py-2 border border-[#D4AF37]/30 text-[#D4AF37] hover:text-white rounded text-[10px] font-bold uppercase tracking-wider hover:bg-white/5 cursor-pointer outline-none"
              >
                Clear Explorer Filters
              </button>
            </div>
          )}
        </section>

        {/* SECTION 7: CALL TO PILGRIMAGE FOOTER */}
        <section className="w-full mb-16 text-center select-none">
          <div className="bg-gradient-to-r from-[#1A1108] via-[#0A0614] to-[#1A1108] border border-[#D4AF37]/35 rounded-3xl p-10 md:p-14 relative overflow-hidden flex flex-col items-center gap-4 shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
            <span className="text-[#FF8C00] font-sanskrit text-5xl md:text-6xl font-bold tracking-wide drop-shadow-[0_0_12px_rgba(255,140,0,0.25)] block">
              तीर्थ क्षेत्र
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-white font-extrabold uppercase tracking-wider mt-2">
              Walk the Paths of the Rishis
            </h3>
            <p className="text-xs md:text-sm text-gray-400 max-w-xl leading-relaxed font-sans">
              Every shrine is a vortex of consciousness. Explore the detail chambers, tune in to dynamic audio synths (bell chimes, aarti loops, and meditative drones), and organize your pilgrimage step-by-step.
            </p>
            <div className="w-16 h-[1.5px] bg-[#D4AF37] my-2" />
            <button
              onClick={() => {
                playSuccess();
                if (places.length > 0) {
                  const firstNode = places.find(p => p.slug === "kedarnath") || places[0];
                  setSelectedPlace(firstNode);
                  window.scrollTo({ top: containerRef.current?.offsetTop || 350, behavior: "smooth" });
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#D4A017] to-[#B8860B] hover:from-[#FFD700] hover:to-[#D4A017] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-[#D4A01730] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 mt-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Begin Atlas Pilgrimage</span>
            </button>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}
