"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Compass, MapPin, Navigation, ArrowRight, Eye, Search, Locate, ShieldAlert } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";

interface SacredPlace {
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
}

interface AtlasInteractiveMapProps {
  places: SacredPlace[];
  selectedPlace: SacredPlace | null;
  onPlaceSelect: (place: SacredPlace) => void;
  activeFilter: string;
  activeRoute: string | null;
}

export default function AtlasInteractiveMap({
  places,
  selectedPlace,
  onPlaceSelect,
  activeFilter,
  activeRoute
}: AtlasInteractiveMapProps) {
  const { playClick, playSuccess } = useSacredSound();

  // Geolocation & Map settings
  const [userCoords, setUserCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [geoLoading, setGeoLoading] = useState(true);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [mapMode, setMapMode] = useState<"temple" | "nearby">("temple");
  const [viewStyle, setViewStyle] = useState<"dark" | "satellite">("dark");

  // Track browser geolocation on mount
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setGeoLoading(false);
        },
        (error) => {
          console.warn("Geolocation prompt skipped/denied:", error);
          setGeoError(error.message);
          setGeoLoading(false);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setTimeout(() => setGeoLoading(false), 0);
    }
  }, []);

  // Distance calculator (Haversine formula)
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Compute and sort places based on user coordinates proximity
  const sortedPlaces = useMemo(() => {
    const visible = places.filter((p) => {
      const mappedType = activeFilter === "all" ? "all" : activeFilter.toUpperCase().replace(" ", "_");
      const matchesCategory = mappedType === "all" || p.type === mappedType;

      let matchesRoute = true;
      if (activeRoute === "char_dham") {
        matchesRoute = ["badrinath", "jagannath-puri", "rameshwaram", "dwarkadhish"].includes(p.slug);
      } else if (activeRoute === "jyotirlinga") {
        matchesRoute = p.type === "JYOTIRLINGA";
      }
      return matchesCategory && matchesRoute;
    });

    if (!userCoords) {
      return visible.map((p) => ({ ...p, distance: null }));
    }

    return visible
      .map((p) => {
        const dist = getDistance(userCoords.latitude, userCoords.longitude, p.latitude, p.longitude);
        return { ...p, distance: dist };
      })
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }, [places, userCoords, activeFilter, activeRoute]);

  // Distance from user to selected temple
  const distanceToSelected = useMemo(() => {
    if (!userCoords || !selectedPlace) return null;
    return getDistance(userCoords.latitude, userCoords.longitude, selectedPlace.latitude, selectedPlace.longitude);
  }, [userCoords, selectedPlace]);

  // Image list extraction helper
  const getTempleImagesList = (jsonStr: string): string[] => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {}
    return ["/images/hero-temple-sanctum.png"];
  };

  // Dynamic Map URLs
  const mapIframeUrl = useMemo(() => {
    if (mapMode === "nearby" && userCoords) {
      const suffix = viewStyle === "satellite" ? "&t=k" : "";
      return `https://maps.google.com/maps?q=hindu+temple+near+${userCoords.latitude},${userCoords.longitude}&z=12&output=embed${suffix}`;
    }
    if (selectedPlace) {
      const suffix = viewStyle === "satellite" ? "&t=k" : "";
      return `https://maps.google.com/maps?q=${selectedPlace.latitude},${selectedPlace.longitude}&z=14&output=embed${suffix}`;
    }
    return "";
  }, [mapMode, selectedPlace, userCoords, viewStyle]);

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Premium Editorial Info Panel (Col-span 5) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#0e0717]/85 to-[#040206]/95 border border-[#A5824B]/35 rounded-3xl p-6 md:p-8 flex flex-col justify-between backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.85)] min-h-[520px]">
          {selectedPlace ? (
            <div className="flex flex-col gap-4 text-left h-full justify-between select-text relative">
              <div className="space-y-4">
                
                {/* Visual Category Label */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-[#A5824B] uppercase tracking-[0.25em] font-extrabold block">
                    {selectedPlace.type.replace("_", " ")}
                  </span>
                  
                  {userCoords && distanceToSelected !== null && (
                    <span className="text-[9px] bg-[#FF8C00]/15 px-2.5 py-0.5 rounded border border-[#FF8C00]/30 font-mono text-[#FF8C00] font-bold flex items-center gap-1">
                      <Locate className="w-3 h-3 text-[#FF8C00] animate-pulse" />
                      <span>{distanceToSelected.toFixed(1)} km away</span>
                    </span>
                  )}
                </div>

                {/* Main Titles */}
                <div>
                  <span className="font-serif italic text-2xl text-[#FFE485]/80 block mb-1">
                    {selectedPlace.nameSanskrit}
                  </span>
                  <h2 className="font-serif text-4xl sm:text-5xl font-black text-white leading-tight uppercase tracking-wider">
                    {selectedPlace.name}.
                  </h2>
                  <span className="text-[9px] uppercase tracking-widest text-[#A5824B] font-black block mt-2">
                    &#9679; {selectedPlace.state.toUpperCase()}, BHARAT
                  </span>
                </div>

                {/* Editorial Thin Divider Line */}
                <div className="h-[1px] w-24 bg-gradient-to-r from-[#A5824B]/60 to-transparent my-6" />

                {/* Lore descriptions */}
                <div className="space-y-3">
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                    {selectedPlace.description}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed font-serif italic border-l border-[#A5824B]/35 pl-4">
                    {selectedPlace.significance}
                  </p>
                </div>

                {/* Details Meta Grid */}
                <div className="grid grid-cols-2 gap-4 border-t border-[#A5824B]/15 pt-4 text-xs">
                  <div>
                    <span className="block font-mono text-[8px] uppercase text-gray-500">Main Deity</span>
                    <span className="font-bold text-white mt-0.5 block">{selectedPlace.mainDeity}</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[8px] uppercase text-gray-500">Coordinates</span>
                    <span className="font-mono font-bold text-[#FFE485] mt-0.5 block">
                      {selectedPlace.latitude.toFixed(4)}°N, {selectedPlace.longitude.toFixed(4)}°E
                    </span>
                  </div>
                </div>

              </div>

              {/* Navigation Directions Link */}
              <div className="pt-6 border-t border-[#A5824B]/15 mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.latitude},${selectedPlace.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#D4A017] to-[#B8860B] hover:from-[#FFD700] hover:to-[#D4A017] text-black font-extrabold text-[10px] uppercase tracking-wider rounded-full shadow-lg hover:shadow-[0_8px_20px_rgba(212,160,23,0.3)] transition-all transform hover:-translate-y-0.5 cursor-pointer no-underline select-none"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Visit Sanctuary (Directions)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <Link
                  href={`/temples/${selectedPlace.slug}`}
                  className="flex items-center justify-center gap-1 px-4 py-3 border border-[#A5824B]/40 hover:border-[#FFE485] text-slate-300 hover:text-white font-bold text-[10px] uppercase tracking-wider rounded-full transition-all no-underline select-none bg-white/5"
                >
                  <span>Read Scripture</span>
                </Link>
              </div>

              {/* Seekers telemetry footer */}
              <div className="mt-6 pt-4 border-t border-[#A5824B]/10 flex items-center gap-3 text-slate-500 select-none">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full border border-black bg-slate-800 flex items-center justify-center text-[7px] text-[#FFE485] font-bold">ॐ</div>
                  <div className="w-6 h-6 rounded-full border border-black bg-slate-700 flex items-center justify-center text-[7px] text-[#FFE485] font-bold">🛕</div>
                  <div className="w-6 h-6 rounded-full border border-black bg-slate-600 flex items-center justify-center text-[7px] text-[#FFE485] font-bold">🧘</div>
                </div>
                <span className="text-[9px] font-mono uppercase tracking-wider">10k+ pilgrims traveled here recently</span>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 font-mono text-xs py-12">
              <Compass className="w-10 h-10 text-[#A5824B]/25 animate-spin-slow mb-4" />
              <span>Select coordinates marker on map to view details.</span>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Premium Google Map Pane (Col-span 7) */}
        <div className="lg:col-span-7 bg-[#030107]/85 border border-[#A5824B]/35 rounded-3xl relative overflow-hidden h-[520px] shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between">
          
          {/* Header Map Toolbar */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 p-4 border-b border-[#A5824B]/15 bg-black/60 backdrop-blur-md">
            
            {/* Map Mode Tabs */}
            <div className="flex bg-[#0A0614] border border-[#A5824B]/25 rounded-xl p-0.5">
              <button
                onClick={() => { playClick(); setMapMode("temple"); }}
                className={`px-3.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5
                  ${mapMode === "temple" ? "bg-[#A5824B]/15 text-[#FFE485]" : "text-gray-400 hover:text-white"}`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Selected Sanctuary</span>
              </button>
              
              <button
                onClick={() => { 
                  if (userCoords) {
                    playClick(); 
                    setMapMode("nearby"); 
                    if (sortedPlaces.length > 0) {
                      onPlaceSelect(sortedPlaces[0]);
                    }
                  }
                }}
                disabled={!userCoords}
                className={`px-3.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5
                  ${!userCoords ? "opacity-35 cursor-not-allowed text-gray-600" : ""}
                  ${mapMode === "nearby" ? "bg-[#A5824B]/15 text-[#FFE485]" : "text-gray-400 hover:text-white"}`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Nearby Temples Search</span>
              </button>
            </div>

            {/* Satellite vs Sepia Dark Toggles */}
            <div className="flex bg-[#0A0614] border border-[#A5824B]/25 rounded-xl p-0.5">
              <button
                onClick={() => { playClick(); setViewStyle("dark"); }}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1
                  ${viewStyle === "dark" ? "bg-[#A5824B]/15 text-[#FFE485]" : "text-gray-400 hover:text-white"}`}
              >
                <Compass className="w-3 h-3" />
                <span>Dark Map</span>
              </button>
              <button
                onClick={() => { playClick(); setViewStyle("satellite"); }}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1
                  ${viewStyle === "satellite" ? "bg-[#A5824B]/15 text-[#FFE485]" : "text-gray-400 hover:text-white"}`}
              >
                <Eye className="w-3 h-3" />
                <span>Satellite</span>
              </button>
            </div>

          </div>

          {/* Real Interactive Google Map frame */}
          <div className="w-full h-full relative z-10 flex-grow">
            {mapIframeUrl ? (
              <iframe
                title="Sacred Sanctuary Navigation Map"
                className="w-full h-full border-0 transition-all duration-700"
                src={mapIframeUrl}
                allowFullScreen
                loading="lazy"
                style={{
                  filter: viewStyle === "dark" 
                    ? "invert(90%) hue-rotate(195deg) contrast(110%) brightness(95%) sepia(10%) saturate(120%)" 
                    : "none"
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center text-gray-500 font-mono text-xs p-6 bg-black/40">
                <Compass className="w-10 h-10 text-[#A5824B]/25 animate-spin-slow mb-4" />
                <span>Loading map frame coordinates...</span>
              </div>
            )}
            
            {/* Geolocation status warning banner */}
            {!userCoords && !geoLoading && (
              <div className="absolute top-4 left-4 right-4 bg-yellow-950/70 border border-yellow-800/40 rounded-xl p-2.5 backdrop-blur-md z-30 flex items-center gap-2 text-[10px] text-yellow-300">
                <ShieldAlert className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span><strong>No Geolocation:</strong> Access denied or timed out. Enable browser location to list nearby temples and compute distances.</span>
              </div>
            )}
          </div>

          {/* Bottom Navigation Pills: list of other temples (TravelPost reference style) */}
          <div className="relative z-20 bg-[#0e0717]/85 border-t border-[#A5824B]/15 p-4 backdrop-blur-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none py-1 flex-grow pr-4">
              {sortedPlaces.slice(0, 10).map((p) => {
                const isSelected = selectedPlace?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => { playSuccess(); onPlaceSelect(p); }}
                    className={`px-4 py-2 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 border
                      ${isSelected 
                        ? "bg-[#FFE485] border-[#FFE485] text-black shadow-md font-black" 
                        : "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-[#A5824B]/50"}`}
                  >
                    <span>{p.name}</span>
                    {p.distance !== null && p.distance !== undefined && (
                      <span className={`ml-1.5 text-[8.5px] ${isSelected ? "text-slate-800" : "text-[#FF8C00] font-black"}`}>
                        ({p.distance.toFixed(0)} km)
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest shrink-0 hidden sm:block font-bold">
              Trails list
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
