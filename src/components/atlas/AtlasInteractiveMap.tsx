"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Compass, MapPin, Navigation, ArrowRight, Eye, Search, Locate, ShieldAlert, Landmark } from "lucide-react";
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

const jyotirlingaSlugs = [
  "somnath",
  "mallikarjuna",
  "mahakaleshwar",
  "omkareshwar",
  "kedarnath",
  "bhimashankar",
  "kashi-vishwanath",
  "trimbakeshwar",
  "vaidyanath",
  "nageshwar",
  "rameshwaram",
  "grishneshwar"
];

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
  const [mapProvider, setMapProvider] = useState<"bharat" | "google">("bharat");
  const [hoveredPlace, setHoveredPlace] = useState<SacredPlace | null>(null);

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

  // Projection mapping to SVG space (width 500, height 600)
  const getXY = (lat: number, lng: number) => {
    const minLng = 66.0;
    const maxLng = 98.0;
    const minLat = 5.5;
    const maxLat = 37.5;

    const x = ((lng - minLng) / (maxLng - minLng)) * 380 + 60;
    const y = 600 - (((lat - minLat) / (maxLat - minLat)) * 480 + 60);
    return { x, y };
  };

  // Compute and sort places based on user coordinates proximity
  const sortedPlaces = useMemo(() => {
    if (!userCoords) {
      return places.map((p) => ({ ...p, distance: null }));
    }

    return places
      .map((p) => {
        const dist = getDistance(userCoords.latitude, userCoords.longitude, p.latitude, p.longitude);
        return { ...p, distance: dist };
      })
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }, [places, userCoords]);

  // Distance from user to selected temple
  const distanceToSelected = useMemo(() => {
    if (!userCoords || !selectedPlace) return null;
    return getDistance(userCoords.latitude, userCoords.longitude, selectedPlace.latitude, selectedPlace.longitude);
  }, [userCoords, selectedPlace]);

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

  const getMarkerColor = (type: string) => {
    switch (type.toUpperCase()) {
      case "JYOTIRLINGA": return "#FF8C00";
      case "CHAR_DHAM": return "#FFD700";
      case "SHAKTI_PEETHA": return "#D32F2F";
      case "DIVYA_DESAM": return "#2563EB";
      default: return "#D4AF37";
    }
  };

  // Compute route points for SVG drawing
  const routePoints = useMemo(() => {
    const getCoordsBySlug = (slug: string) => {
      const p = places.find(place => place.slug === slug);
      return p ? getXY(p.latitude, p.longitude) : null;
    };

    if (activeRoute === "char_dham") {
      const badri = getCoordsBySlug("badrinath");
      const puri = getCoordsBySlug("jagannath-puri");
      const ramesh = getCoordsBySlug("rameshwaram");
      const dwarka = getCoordsBySlug("dwarkadhish");
      
      if (badri && puri && ramesh && dwarka) {
        return [badri, puri, ramesh, dwarka, badri];
      }
    }

    if (activeRoute === "jyotirlinga") {
      return jyotirlingaSlugs
        .map(getCoordsBySlug)
        .filter((pt): pt is { x: number; y: number } => pt !== null);
    }

    return [];
  }, [activeRoute, places]);

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

        {/* RIGHT COLUMN: Premium Map Pane (Col-span 7) */}
        <div className="lg:col-span-7 bg-[#030107]/85 border border-[#A5824B]/35 rounded-3xl relative overflow-hidden h-[520px] shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between">
          
          {/* Header Map Toolbar */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 p-4 border-b border-[#A5824B]/15 bg-black/60 backdrop-blur-md">
            
            {/* Map Source Tabs */}
            <div className="flex bg-[#0A0614] border border-[#A5824B]/25 rounded-xl p-0.5">
              <button
                onClick={() => { playClick(); setMapProvider("bharat"); }}
                className={`px-3.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5
                  ${mapProvider === "bharat" ? "bg-[#A5824B]/15 text-[#FFE485]" : "text-gray-400 hover:text-white"}`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Bharat Atlas</span>
              </button>
              
              <button
                onClick={() => { playClick(); setMapProvider("google"); }}
                className={`px-3.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5
                  ${mapProvider === "google" ? "bg-[#A5824B]/15 text-[#FFE485]" : "text-gray-400 hover:text-white"}`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </button>
            </div>

            {/* Google Map Mode & View toggles (Only visible when google is active) */}
            {mapProvider === "google" ? (
              <div className="flex gap-2">
                <div className="flex bg-[#0A0614] border border-[#A5824B]/25 rounded-xl p-0.5">
                  <button
                    onClick={() => { playClick(); setMapMode("temple"); }}
                    className={`px-2.5 py-1.2 rounded-lg text-[8.5px] font-bold uppercase tracking-wider transition-all cursor-pointer
                      ${mapMode === "temple" ? "bg-[#A5824B]/15 text-[#FFE485]" : "text-gray-400 hover:text-white"}`}
                  >
                    Sanctuary
                  </button>
                  <button
                    onClick={() => { 
                      if (userCoords) {
                        playClick(); 
                        setMapMode("nearby"); 
                      }
                    }}
                    disabled={!userCoords}
                    className={`px-2.5 py-1.2 rounded-lg text-[8.5px] font-bold uppercase tracking-wider transition-all cursor-pointer
                      ${!userCoords ? "opacity-30 cursor-not-allowed" : ""}
                      ${mapMode === "nearby" ? "bg-[#A5824B]/15 text-[#FFE485]" : "text-gray-400 hover:text-white"}`}
                  >
                    Nearby
                  </button>
                </div>

                <div className="flex bg-[#0A0614] border border-[#A5824B]/25 rounded-xl p-0.5">
                  <button
                    onClick={() => { playClick(); setViewStyle("dark"); }}
                    className={`px-2.5 py-1.2 rounded-lg text-[8.5px] font-bold uppercase tracking-wider transition-all cursor-pointer
                      ${viewStyle === "dark" ? "bg-[#A5824B]/15 text-[#FFE485]" : "text-gray-400 hover:text-white"}`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => { playClick(); setViewStyle("satellite"); }}
                    className={`px-2.5 py-1.2 rounded-lg text-[8.5px] font-bold uppercase tracking-wider transition-all cursor-pointer
                      ${viewStyle === "satellite" ? "bg-[#A5824B]/15 text-[#FFE485]" : "text-gray-400 hover:text-white"}`}
                  >
                    Satellite
                  </button>
                </div>
              </div>
            ) : (
              <span className="text-[9.5px] text-[#FFE485]/80 font-mono tracking-wide hidden sm:inline-block">
                {activeRoute === "char_dham" ? "Char Dham Pilgrimage Loop Active" : activeRoute === "jyotirlinga" ? "12 Jyotirlinga Fire Trail Active" : "Sacred Coordinates Map"}
              </span>
            )}

          </div>

          {/* Map Viewer Container */}
          <div className="w-full h-full relative z-10 flex-grow overflow-hidden">
            {mapProvider === "google" ? (
              mapIframeUrl ? (
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
              )
            ) : (
              // BHARAT SVG GEOMETRIC MAP
              <div className="w-full h-full relative flex items-center justify-center p-4 bg-gradient-to-b from-[#090510] to-[#030107]">
                
                {/* Style tag for dynamic keyframe animation */}
                <style>{`
                  @keyframes svgDash {
                    to {
                      stroke-dashoffset: -40;
                    }
                  }
                  .route-anim-path {
                    animation: svgDash 2s linear infinite;
                  }
                `}</style>

                {/* Holographic Compass Grid Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(165,130,75,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(165,130,75,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                <svg
                  viewBox="0 0 500 600"
                  className="w-full h-full max-w-[420px] max-h-[500px] select-none"
                  style={{ filter: "drop-shadow(0 0 10px rgba(0,0,0,0.7))" }}
                >
                  {/* Concentric spiritual rings */}
                  <circle cx="250" cy="300" r="235" fill="none" stroke="rgba(165,130,75,0.05)" strokeDasharray="3,3" />
                  <circle cx="250" cy="300" r="160" fill="none" stroke="rgba(165,130,75,0.03)" />
                  <circle cx="250" cy="300" r="80" fill="none" stroke="rgba(165,130,75,0.02)" />
                  
                  {/* Axis indicators */}
                  <line x1="50" y1="300" x2="450" y2="300" stroke="rgba(165,130,75,0.03)" strokeDasharray="5,5" />
                  <line x1="250" y1="50" x2="250" y2="550" stroke="rgba(165,130,75,0.03)" strokeDasharray="5,5" />

                  {/* HIGH-QUALITY STYLIZED OUTLINE OF INDIA */}
                  <path
                    d="M 230 40 
                       L 245 42 
                       L 260 55 
                       L 275 80 
                       L 280 120 
                       L 280 150 
                       L 300 160 
                       L 330 162 
                       L 350 180 
                       L 375 180 
                       L 390 190 
                       L 430 180 
                       L 460 175 
                       L 480 200 
                       L 470 220 
                       L 440 222 
                       L 430 250 
                       L 405 252 
                       L 380 260 
                       L 370 300 
                       L 350 340 
                       L 330 390 
                       L 315 440 
                       L 300 480 
                       L 275 540 
                       L 265 570 
                       L 260 560 
                       L 255 540 
                       L 240 500 
                       L 228 460 
                       L 220 440 
                       L 210 400 
                       L 200 380 
                       L 190 350 
                       L 180 320 
                       L 175 300 
                       L 170 275 
                       L 135 285 
                       L 115 270 
                       L 120 245 
                       L 130 220 
                       L 145 200 
                       L 160 160 
                       L 175 130 
                       L 185 100 
                       L 200 80 
                       L 210 55 
                       Z"
                    fill="rgba(165,130,75,0.03)"
                    stroke="rgba(165,130,75,0.25)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Pilgrimage Route Line Overlays */}
                  {activeRoute && routePoints.length > 1 && (
                    <polyline
                      points={routePoints.map(p => `${p.x},${p.y}`).join(" ")}
                      fill="none"
                      stroke={activeRoute === "char_dham" ? "#FFD700" : "#FF8C00"}
                      strokeWidth="1.3"
                      strokeDasharray="6,4"
                      className="route-anim-path"
                      style={{
                        filter: `drop-shadow(0 0 5px ${activeRoute === "char_dham" ? "#FFD700" : "#FF8C00"})`
                      }}
                    />
                  )}

                  {/* Coordinate nodes map markers */}
                  {places.map(place => {
                    const { x, y } = getXY(place.latitude, place.longitude);
                    const isSelected = selectedPlace?.id === place.id;
                    const isHovered = hoveredPlace?.id === place.id;
                    const color = getMarkerColor(place.type);

                    return (
                      <g
                        key={place.id}
                        onMouseEnter={() => setHoveredPlace(place)}
                        onMouseLeave={() => setHoveredPlace(null)}
                        onClick={() => { playSuccess(); onPlaceSelect(place); }}
                        className="cursor-pointer group outline-none"
                      >
                        {/* Dynamic outer glow circle on select or hover */}
                        {(isSelected || isHovered) && (
                          <>
                            <circle
                              cx={x}
                              cy={y}
                              r="15"
                              fill="none"
                              stroke={color}
                              strokeWidth="0.75"
                              className="animate-ping opacity-45"
                            />
                            <circle
                              cx={x}
                              cy={y}
                              r="8"
                              fill="none"
                              stroke={color}
                              strokeWidth="1"
                              className="animate-pulse"
                            />
                          </>
                        )}
                        {/* Anchor Pin Node */}
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? "5.5" : "4"}
                          fill={color}
                          stroke="#000000"
                          strokeWidth="1"
                          className="transition-all duration-300 group-hover:scale-125"
                          style={{
                            filter: `drop-shadow(0 0 5px ${color})`
                          }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Hover / Selection status box inside the SVG view */}
                {(hoveredPlace || selectedPlace) && (
                  <div className="absolute bottom-4 left-4 right-4 bg-black/90 border border-[#A5824B]/35 rounded-xl p-3 flex items-center justify-between text-left animate-fade-in z-20">
                    <div>
                      <span
                        className="text-[8px] font-mono uppercase tracking-widest font-extrabold"
                        style={{ color: getMarkerColor((hoveredPlace || selectedPlace)!.type) }}
                      >
                        {(hoveredPlace || selectedPlace)!.type.replace("_", " ")}
                      </span>
                      <h5 className="font-serif text-white text-xs font-bold mt-0.5">
                        {(hoveredPlace || selectedPlace)!.name}
                      </h5>
                    </div>
                    <div className="text-[9px] text-right font-mono text-slate-400">
                      <p>{(hoveredPlace || selectedPlace)!.latitude.toFixed(3)}°N</p>
                      <p>{(hoveredPlace || selectedPlace)!.longitude.toFixed(3)}°E</p>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* Geolocation status warning banner (Only in Google Map nearby mode) */}
            {mapProvider === "google" && !userCoords && !geoLoading && (
              <div className="absolute top-4 left-4 right-4 bg-yellow-950/70 border border-yellow-800/40 rounded-xl p-2.5 backdrop-blur-md z-30 flex items-center gap-2 text-[10px] text-yellow-300">
                <ShieldAlert className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span><strong>No Geolocation:</strong> Enable location access to show nearby temples and distance.</span>
              </div>
            )}
          </div>

          {/* Bottom Navigation Pills: list of other temples */}
          <div className="relative z-20 bg-[#0e0717]/85 border-t border-[#A5824B]/15 p-4 backdrop-blur-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none py-1 flex-grow pr-4">
              {sortedPlaces.slice(0, 15).map((p) => {
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
