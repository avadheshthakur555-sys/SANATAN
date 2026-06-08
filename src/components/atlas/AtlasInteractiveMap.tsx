"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Compass, MapPin, ZoomIn, ZoomOut, RotateCcw, Image, Navigation, ArrowRight, Eye, Grid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [mapType, setMapType] = useState<"cartography" | "satellite">("cartography");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredPlace, setHoveredPlace] = useState<SacredPlace | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom & pan when filter or route changes (during render to avoid cascading updates)
  const [prevFilter, setPrevFilter] = useState(activeFilter);
  const [prevRoute, setPrevRoute] = useState(activeRoute);

  if (activeFilter !== prevFilter || activeRoute !== prevRoute) {
    setPrevFilter(activeFilter);
    setPrevRoute(activeRoute);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  const handleZoomIn = () => {
    playClick();
    setZoom((z) => Math.min(z + 0.5, 3));
  };

  const handleZoomOut = () => {
    playClick();
    setZoom((z) => Math.max(z - 0.5, 1));
  };

  const handleReset = () => {
    playClick();
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Dragging to Pan (Artistic Cartography View)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (mapType !== "cartography") return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || mapType !== "cartography") return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Convert lat/lng to percentage coordinates on map projection
  const getCoordinates = (lat: number, lng: number) => {
    // Normalizing coordinates for projection inside India bounding box
    // West: ~68°E, East: ~97°E, South: ~8°N, North: ~37°N
    const minLng = 68.0;
    const maxLng = 97.5;
    const minLat = 7.5;
    const maxLat = 37.0;

    const x = ((lng - minLng) / (maxLng - minLng)) * 80 + 10; // offset boundaries
    const y = 90 - ((lat - minLat) / (maxLat - minLat)) * 80;
    return { x: `${x}%`, y: `${y}%` };
  };

  const getMarkerColor = (type: string) => {
    switch (type.toUpperCase()) {
      case "JYOTIRLINGA":
        return "#FF8C00"; // Saffron
      case "CHAR_DHAM":
        return "#FFD700"; // Gold
      case "SHAKTI_PEETHA":
        return "#D32F2F"; // Crimson Red
      case "DIVYA_DESAM":
        return "#2563EB"; // Royal Blue
      default:
        return "#D4AF37";
    }
  };

  const getTempleImagesList = (jsonStr: string): string[] => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {}
    return ["/images/hero-temple-sanctum.png"];
  };

  // Find active route nodes for rendering path lines
  const getRouteCoordinatesList = () => {
    if (!activeRoute) return [];

    let routeKeys: string[] = [];
    if (activeRoute === "char_dham") {
      routeKeys = ["badrinath", "jagannath-puri", "rameshwaram", "dwarkadhish"];
    } else if (activeRoute === "jyotirlinga") {
      routeKeys = [
        "somnath", "mallikarjuna", "mahakaleshwar", "omkareshwar", "kedarnath",
        "bhimashankar", "kashi-vishwanath", "trimbakeshwar", "vaidyanath",
        "nageshwar", "rameshwaram", "grishneshwar"
      ];
    } else {
      return [];
    }

    const coords = routeKeys
      .map((slug) => places.find((p) => p.slug === slug))
      .filter((p): p is SacredPlace => !!p)
      .map((p) => {
        const xy = getCoordinates(p.latitude, p.longitude);
        return { name: p.name, x: xy.x, y: xy.y };
      });

    // Close the loop for Char Dham
    if (activeRoute === "char_dham" && coords.length > 0) {
      coords.push(coords[0]);
    }
    return coords;
  };

  const routeCoords = getRouteCoordinatesList();

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Map Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/15 pb-4">
        {/* Toggle Toggles */}
        <div className="flex bg-[#0A0614] border border-[#D4AF37]/25 rounded-lg p-0.5 z-10">
          <button
            onClick={() => { playClick(); setMapType("cartography"); }}
            className={`px-3 py-1.5 rounded text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5
              ${mapType === "cartography" ? "bg-[#D4AF37]/15 text-[#FFD700]" : "text-gray-400 hover:text-white"}`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Sacred Cartography</span>
          </button>
          <button
            onClick={() => { 
              playClick(); 
              setMapType("satellite");
              if (!selectedPlace && places.length > 0) {
                onPlaceSelect(places[0]);
              }
            }}
            className={`px-3 py-1.5 rounded text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5
              ${mapType === "satellite" ? "bg-[#D4AF37]/15 text-[#FFD700]" : "text-gray-400 hover:text-white"}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Google Satellite view</span>
          </button>
        </div>

        {/* Zoom Controls (only for SVG cartography) */}
        {mapType === "cartography" && (
          <div className="flex items-center gap-1.5 bg-[#0A0614] border border-[#D4AF37]/25 rounded-lg p-0.5 z-10">
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded hover:bg-white/5 text-[#FFD700] hover:text-white cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded hover:bg-white/5 text-[#FFD700] hover:text-white cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded hover:bg-white/5 text-[#FFD700] hover:text-white cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Map Viewport Area */}
        <div className="lg:col-span-8 bg-[#030107]/80 border border-[#D4AF37]/35 rounded-2xl relative overflow-hidden h-[500px] flex items-center justify-center">
          
          {mapType === "cartography" ? (
            /* Cartography View (SVG) */
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={`w-full h-full relative cursor-grab active:cursor-grabbing select-none transition-shadow`}
            >
              {/* Starry Night Sky and grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,8,25,0.4)_0%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              {/* Map Contents Container (Handles Zoom / Pan) */}
              <div
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transformOrigin: "center center",
                  transition: isDragging ? "none" : "transform 0.2s ease"
                }}
                className="w-full h-full absolute inset-0 flex items-center justify-center"
              >
                {/* SVG Outline representation of India */}
                <svg
                  className="w-full max-w-[420px] h-[450px] text-[#D4AF37]/5 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.08)]"
                  viewBox="0 0 200 240"
                  fill="currentColor"
                >
                  <path d="M100 10 L115 15 L125 30 L115 50 L125 60 L140 65 L155 80 L170 95 L180 110 L190 125 L160 130 L150 145 L130 150 L120 160 L110 180 L105 200 L100 230 L95 200 L90 180 L80 160 L70 150 L50 145 L40 130 L10 125 L20 110 L30 95 L45 80 L60 65 L75 60 L85 50 L75 30 L85 15 Z" />
                </svg>

                {/* Draw Route Connection Lines */}
                {activeRoute && routeCoords.length > 1 && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <style>{`
                      @keyframes dash {
                        to {
                          stroke-dashoffset: -80;
                        }
                      }
                      .sacred-path-line {
                        animation: dash 3.5s linear infinite;
                      }
                    `}</style>
                    {routeCoords.map((coord, idx) => {
                      if (idx === routeCoords.length - 1 && activeRoute !== "char_dham") return null;
                      const next = routeCoords[(idx + 1) % routeCoords.length];
                      return (
                        <line
                          key={idx}
                          x1={coord.x}
                          y1={coord.y}
                          x2={next.x}
                          y2={next.y}
                          stroke="#FFD700"
                          strokeWidth="1.5"
                          strokeDasharray="8,6"
                          className="sacred-path-line"
                          opacity="0.85"
                          style={{ filter: "drop-shadow(0 0 4px #FFD700)" }}
                        />
                      );
                    })}
                  </svg>
                )}

                {/* Hotspot Markers */}
                {places.map((place) => {
                  const isSelected = selectedPlace?.id === place.id;
                  const isHovered = hoveredPlace?.id === place.id;
                  const isVisible = activeFilter === "all" || place.type === activeFilter.toUpperCase().replace(" ", "_");
                  
                  // Check if matching active route nodes
                  let isRouteNode = true;
                  if (activeRoute === "char_dham") {
                    isRouteNode = ["badrinath", "jagannath-puri", "rameshwaram", "dwarkadhish"].includes(place.slug);
                  } else if (activeRoute === "jyotirlinga") {
                    isRouteNode = place.type === "JYOTIRLINGA";
                  }

                  const showMarker = isVisible && isRouteNode;
                  const color = getMarkerColor(place.type);
                  const { x, y } = getCoordinates(place.latitude, place.longitude);

                  return (
                    <div
                      key={place.id}
                      className={`absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500
                        ${showMarker ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"}`}
                      style={{ left: x, top: y }}
                    >
                      {/* Glow rings */}
                      {(isSelected || isHovered) && (
                        <span
                          className="absolute -inset-3.5 rounded-full animate-ping opacity-60"
                          style={{ backgroundColor: `${color}35` }}
                        />
                      )}
                      <span
                        className="absolute -inset-1.5 rounded-full hover:animate-pulse"
                        style={{ backgroundColor: `${color}20` }}
                      />

                      {/* Hotspot Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playSuccess();
                          onPlaceSelect(place);
                        }}
                        onMouseEnter={() => setHoveredPlace(place)}
                        onMouseLeave={() => setHoveredPlace(null)}
                        className="w-full h-full rounded-full border border-black shadow-[0_0_12px_rgba(0,0,0,0.8)] cursor-pointer outline-none transition-transform duration-300 hover:scale-125"
                        style={{
                          backgroundColor: color,
                          boxShadow: `0 0 10px ${color}`
                        }}
                        aria-label={place.name}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Drag instruction overlay */}
              {zoom > 1 && (
                <div className="absolute bottom-4 left-4 bg-black/60 border border-[#D4AF37]/25 px-2.5 py-1 rounded text-[9px] text-gray-400 font-mono pointer-events-none uppercase">
                  Drag with mouse to pan
                </div>
              )}
            </div>
          ) : (
            /* Satellite View (Google Maps Integration) */
            <div className="w-full h-full relative p-1">
              {selectedPlace ? (
                <iframe
                  title={`${selectedPlace.name} Google Map Location`}
                  className="w-full h-full rounded-2xl border border-[var(--border-gold)]/20"
                  src={`https://maps.google.com/maps?q=${selectedPlace.latitude},${selectedPlace.longitude}&t=k&z=15&output=embed`}
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center text-gray-500 font-mono text-phi-xs p-6">
                  Select a sacred place on the map to inspect its real satellite coordinates.
                </div>
              )}
            </div>
          )}

          {/* Floating Image Preview on Hover */}
          <AnimatePresence>
            {hoveredPlace && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0A0614]/95 border border-[#D4AF37]/50 rounded-xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-35 flex items-center gap-3 w-72 pointer-events-none"
              >
                <div
                  className="w-14 h-14 rounded-lg bg-cover bg-center bg-no-repeat border border-[#D4AF37]/35 flex-shrink-0"
                  style={{ backgroundImage: `url(${getTempleImagesList(hoveredPlace.images)[0]})` }}
                />
                <div className="flex-1 text-left min-w-0">
                  <span
                    className="text-[8px] uppercase tracking-widest font-mono font-bold block"
                    style={{ color: getMarkerColor(hoveredPlace.type) }}
                  >
                    {hoveredPlace.type.replace("_", " ")}
                  </span>
                  <h5 className="text-white text-xs font-bold truncate mt-0.5 font-serif">
                    {hoveredPlace.name}
                  </h5>
                  <div className="flex items-center gap-1 text-[9px] text-gray-400 mt-1">
                    <MapPin className="w-3 h-3 text-[#FF8C00]" />
                    <span className="truncate">{hoveredPlace.state}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Selected Sanctuary Details Sidebar */}
        <div className="lg:col-span-4 bg-[#0A0614]/80 border border-[#D4AF37]/35 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md min-h-[500px]">
          {selectedPlace ? (
            <div className="flex flex-col gap-4 text-left h-full justify-between select-text">
              <div className="space-y-4">
                {/* Image block */}
                <div className="relative w-full h-32 rounded-xl overflow-hidden border border-[#D4AF37]/20 flex-shrink-0">
                  <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-500 hover:scale-105"
                    style={{ backgroundImage: `url(${getTempleImagesList(selectedPlace.images)[0]})` }}
                  />
                  <div className="absolute top-2 right-2 bg-black/60 border border-[#D4AF37]/30 px-2 py-0.5 rounded-full text-[8px] uppercase tracking-widest font-mono font-bold text-[#FFD700]">
                    {selectedPlace.type.replace("_", " ")}
                  </div>
                </div>

                <div>
                  <span className="font-sanskrit text-lg text-[#FFD700] block tracking-wide">
                    {selectedPlace.nameSanskrit}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mt-0.5 leading-snug">
                    {selectedPlace.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF8C00]" />
                    <span>{selectedPlace.state}, Bharat</span>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#D4AF37]/15" />

                <div className="space-y-2 text-xs text-gray-300 leading-relaxed line-clamp-4">
                  <strong>Lore:</strong> {selectedPlace.description}
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-[#D4AF37]/15 pt-3 text-[10px] text-gray-400">
                  <div>
                    <span className="block font-mono text-[8px] uppercase text-gray-500">Deity Worshipped</span>
                    <span className="font-bold text-white mt-0.5 block">{selectedPlace.mainDeity}</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[8px] uppercase text-gray-500">Coordinates</span>
                    <span className="font-mono font-bold text-[#FFD700] mt-0.5 block">
                      {selectedPlace.latitude.toFixed(4)}°N, {selectedPlace.longitude.toFixed(4)}°E
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-auto">
                <Link
                  href={`/temples/${selectedPlace.slug}`}
                  onClick={playClick}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-[#D4A017] to-[#B8860B] hover:from-[#FFD700] hover:to-[#D4A017] text-black font-extrabold text-[11px] uppercase tracking-wider rounded-xl shadow-lg hover:shadow-[#D4A01720] transition-all transform hover:-translate-y-0.5 cursor-pointer no-underline select-none"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Enter Sanctuary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 font-mono text-phi-xs py-12">
              <Compass className="w-10 h-10 text-[#D4AF37]/25 animate-spin-slow mb-4" />
              <span>Select coordinates marker on map to view details.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
