"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, ArrowRight, Search, Landmark } from "lucide-react";

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

export default function BharatMap() {
  const [places, setPlaces] = useState<SacredPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedPlace, setSelectedPlace] = useState<SacredPlace | null>(null);
  const [hoveredPlace, setHoveredPlace] = useState<SacredPlace | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const res = await fetch("/api/atlas");
        if (res.ok) {
          const data = await res.json();
          setPlaces(data);
          // Default select the first place
          if (data.length > 0) {
            setSelectedPlace(data[0]);
          }
        }
      } catch (e) {
        console.error("Failed to load sacred places:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchPlaces();
  }, []);

  // Simple equirectangular projection mapping to SVG space (width 500, height 600)
  const getXY = (lat: number, lng: number) => {
    const minLng = 66.0;
    const maxLng = 98.0;
    const minLat = 5.5;
    const maxLat = 37.5;

    const x = ((lng - minLng) / (maxLng - minLng)) * 380 + 60; 
    const y = 600 - (((lat - minLat) / (maxLat - minLat)) * 480 + 60); 
    return { x, y };
  };

  const filteredPlaces = places.filter(place => {
    const matchesType = selectedType === "ALL" || place.type === selectedType;
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          place.nameSanskrit.includes(searchTerm) ||
                          place.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          place.mainDeity.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "JYOTIRLINGA": return "#FF8C00"; // Saffron
      case "CHAR_DHAM": return "#FFD700"; // Gold
      case "SHAKTI_PEETHA": return "#D32F2F"; // Crimson Red
      default: return "#9C27B0"; // Purple
    }
  };

  const getTypeLabel = (type: string) => {
    return type.replace("_", " ");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-phi-xl w-full select-none">
      
      {/* Left Sidebar: List of Temples & Filters */}
      <div className="lg:col-span-4 flex flex-col gap-phi-lg bg-[#0F0F14]/80 border border-[#B8860B30] rounded-2xl p-phi-lg backdrop-blur-md h-[720px]">
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-phi-md top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search temples, deities, states..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-phi-xl pr-phi-lg py-phi-sm bg-black border border-[#B8860B20] focus:border-[#FFD700] rounded-lg text-phi-xs text-white outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-phi-sm">
          {["ALL", "JYOTIRLINGA", "CHAR_DHAM", "SHAKTI_PEETHA"].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-phi-md py-phi-sm rounded text-[10px] uppercase font-mono tracking-wider transition-all border cursor-pointer outline-none
                ${selectedType === type
                  ? "bg-[#B8860B15] text-[#FFD700] border-[#FFD700]"
                  : "bg-black/40 text-gray-400 border-white/5 hover:border-[#B8860B30]"
                }
              `}
            >
              {getTypeLabel(type)}
            </button>
          ))}
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto space-y-phi-sm pr-1 scrollbar-thin scrollbar-track-black scrollbar-thumb-white/10">
          {loading ? (
            <div className="text-center py-phi-3xl text-gray-500 flex flex-col items-center gap-phi-md">
              <div className="w-6 h-6 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-phi-xs uppercase tracking-widest text-[#B8860B]">Locating Sacred Coordinates...</span>
            </div>
          ) : filteredPlaces.length === 0 ? (
            <div className="text-center py-phi-3xl text-gray-500 font-mono text-phi-xs">
              No sacred sites match your criteria.
            </div>
          ) : (
            filteredPlaces.map(place => {
              const isSelected = selectedPlace?.id === place.id;
              return (
                <div
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className={`p-phi-md rounded-xl border transition-all cursor-pointer text-left
                    ${isSelected
                      ? "bg-[#1A1108]/60 border-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.1)]"
                      : "bg-black/30 border-white/5 hover:border-[#B8860B20] hover:bg-white/2"
                    }
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif text-[#FFD700] text-phi-sm font-semibold">{place.name}</h4>
                      <p className="text-[10px] font-sanskrit text-gray-400 mt-0.5">{place.nameSanskrit}</p>
                    </div>
                    <span className="text-[9px] font-mono tracking-wider px-phi-sm py-0.5 rounded bg-white/5 text-gray-300 uppercase">
                      {getTypeLabel(place.type)}
                    </span>
                  </div>
                  <div className="mt-phi-md flex items-center justify-between text-[11px] text-gray-500">
                    <span>Deity: <strong className="text-gray-300 font-semibold">{place.mainDeity}</strong></span>
                    <span>{place.state}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Center/Right: Interactive SVG Map Container */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#0F0F14]/80 border border-[#B8860B30] rounded-2xl p-phi-lg backdrop-blur-md relative h-[720px] overflow-hidden">
        
        {/* Holographic Compass Grid Overlay */}
        <div className="absolute top-phi-lg left-phi-lg flex items-center gap-phi-xs text-[10px] uppercase font-mono tracking-widest text-[#B8860B] font-bold z-10">
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>Bharatvarsha Coordinate Grid</span>
        </div>

        {/* Interactive SVG */}
        <div className="relative w-full h-full max-w-[500px] max-h-[600px] flex items-center justify-center mt-phi-lg">
          <svg
            viewBox="0 0 500 600"
            className="w-full h-full select-none"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.5))" }}
          >
            {/* SVG Background grids */}
            <circle cx="250" cy="300" r="240" fill="none" stroke="rgba(184,134,11,0.05)" strokeDasharray="3,3" />
            <circle cx="250" cy="300" r="160" fill="none" stroke="rgba(184,134,11,0.04)" />
            <circle cx="250" cy="300" r="80" fill="none" stroke="rgba(184,134,11,0.03)" />
            
            {/* Latitude/Longitude lines */}
            <line x1="50" y1="300" x2="450" y2="300" stroke="rgba(184,134,11,0.04)" strokeDasharray="5,5" />
            <line x1="250" y1="50" x2="250" y2="550" stroke="rgba(184,134,11,0.04)" strokeDasharray="5,5" />

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
              fill="rgba(184,134,11,0.02)"
              stroke="rgba(184,134,11,0.25)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-500 hover:fill-saffron/5"
            />

            {/* Glowing Map Coordinate Nodes */}
            {filteredPlaces.map(place => {
              const { x, y } = getXY(place.latitude, place.longitude);
              const isSelected = selectedPlace?.id === place.id;
              const isHovered = hoveredPlace?.id === place.id;
              const color = getMarkerColor(place.type);

              return (
                <g 
                  key={place.id}
                  onMouseEnter={() => setHoveredPlace(place)}
                  onMouseLeave={() => setHoveredPlace(null)}
                  onClick={() => setSelectedPlace(place)}
                  className="cursor-pointer group outline-none focus:outline-none"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedPlace(place);
                    }
                  }}
                >
                  {/* Dynamic Pulsing Anchor Circles */}
                  {(isSelected || isHovered) && (
                    <>
                      <circle
                        cx={x}
                        cy={y}
                        r="14"
                        fill="none"
                        stroke={color}
                        strokeWidth="1"
                        className="animate-ping opacity-30"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        fill="none"
                        stroke={color}
                        strokeWidth="1.5"
                        className="animate-pulse"
                      />
                    </>
                  )}
                  {/* Standard Base Circle Glow */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? "6" : "4.5"}
                    fill={color}
                    stroke="#000"
                    strokeWidth="1"
                    className="transition-all duration-300 group-hover:scale-125"
                    style={{ filter: `drop-shadow(0 0 6px ${color})` }}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Hover/Focus Mini Overlay Tooltip inside the map */}
        {(hoveredPlace || selectedPlace) && (
          <div className="absolute bottom-phi-lg left-phi-lg right-phi-lg bg-black/90 border border-[#B8860B40] rounded-xl p-phi-md flex items-center justify-between text-left animate-fade-in z-20">
            <div>
              <span className="text-[9px] font-mono text-[#FFD700] uppercase tracking-widest font-bold">
                {getTypeLabel((hoveredPlace || selectedPlace)!.type)}
              </span>
              <h5 className="font-serif text-white text-phi-sm font-bold">
                {(hoveredPlace || selectedPlace)!.name}
              </h5>
            </div>
            <div className="text-[10px] text-right font-mono text-gray-400">
              <p>Lat: {(hoveredPlace || selectedPlace)!.latitude.toFixed(4)}° N</p>
              <p>Lng: {(hoveredPlace || selectedPlace)!.longitude.toFixed(4)}° E</p>
            </div>
          </div>
        )}

      </div>

      {/* Right Details Panel: Extended Metadata Inspector */}
      <div className="lg:col-span-3 flex flex-col gap-phi-lg bg-[#0F0F14]/80 border border-[#B8860B30] rounded-2xl p-phi-xl backdrop-blur-md h-[720px] text-left overflow-y-auto scrollbar-thin scrollbar-track-black scrollbar-thumb-white/10">
        {selectedPlace ? (
          <div className="space-y-phi-xl animate-fade-in">
            {/* Header */}
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8860B] font-bold flex items-center gap-phi-xs">
                <Landmark className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>{getTypeLabel(selectedPlace.type)}</span>
              </span>
              <h3 className="font-serif text-[#FFD700] text-phi-lg font-extrabold mt-phi-xs">{selectedPlace.name}</h3>
              <p className="text-phi-xs font-sanskrit text-gray-400 italic mt-0.5">{selectedPlace.nameSanskrit}</p>
            </div>

            {/* Geographical details */}
            <div className="grid grid-cols-2 gap-phi-md bg-black/40 border border-white/5 rounded-xl p-phi-md font-mono text-[11px] text-gray-400">
              <div>
                <span className="text-gray-500 block text-[9px] uppercase">State</span>
                <span className="text-white font-semibold">{selectedPlace.state}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[9px] uppercase">Country</span>
                <span className="text-white font-semibold">{selectedPlace.country}</span>
              </div>
              <div className="mt-phi-sm">
                <span className="text-gray-500 block text-[9px] uppercase">Latitude</span>
                <span className="text-white">{selectedPlace.latitude.toFixed(4)}° N</span>
              </div>
              <div className="mt-phi-sm">
                <span className="text-gray-500 block text-[9px] uppercase">Longitude</span>
                <span className="text-white">{selectedPlace.longitude.toFixed(4)}° E</span>
              </div>
            </div>

            {/* Descriptive Content */}
            <div className="space-y-phi-md text-phi-xs text-gray-300 leading-relaxed">
              <div className="space-y-phi-xs">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8860B] font-bold block">Description</span>
                <p className="bg-white/2 p-phi-sm rounded border border-white/5">{selectedPlace.description}</p>
              </div>

              <div className="space-y-phi-xs">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8860B] font-bold block">Significance</span>
                <p className="bg-white/2 p-phi-sm rounded border border-white/5">{selectedPlace.significance}</p>
              </div>
            </div>

            {/* Extended Attributes */}
            <div className="space-y-phi-md border-t border-[#B8860B20] pt-phi-xl text-phi-xs text-gray-300">
              <div className="flex justify-between items-center py-phi-sm border-b border-white/5">
                <span className="text-gray-500 font-mono text-[10px] uppercase">Main Deity</span>
                <span className="text-[#FFD700] font-bold">{selectedPlace.mainDeity}</span>
              </div>
              {selectedPlace.historicalEra && (
                <div className="flex justify-between items-center py-phi-sm border-b border-white/5">
                  <span className="text-gray-500 font-mono text-[10px] uppercase">Historical Era</span>
                  <span className="text-white font-semibold">{selectedPlace.historicalEra}</span>
                </div>
              )}
              {selectedPlace.architecture && (
                <div className="space-y-phi-xs py-phi-sm">
                  <span className="text-gray-500 font-mono text-[10px] uppercase block">Architecture Style</span>
                  <span className="text-white bg-[#1A1A24] px-phi-md py-phi-sm rounded border border-[#B8860B15] block font-semibold">
                    {selectedPlace.architecture}
                  </span>
                </div>
              )}
            </div>

            {/* Explore further links */}
            <Link
              href={`/temples`}
              className="flex items-center justify-center gap-phi-sm w-full py-phi-md border border-[#B8860B30] hover:border-[#FFD700] text-phi-xs font-bold text-[#FFD700] hover:text-white uppercase tracking-wider rounded-xl transition-all hover:bg-[#B8860B08] no-underline cursor-pointer"
            >
              <span>Explore All Places</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 font-mono text-phi-xs">
            Select a sacred place on the map to inspect its details.
          </div>
        )}
      </div>

    </div>
  );
}
