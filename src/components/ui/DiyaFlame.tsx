"use client";

import React, { useState } from "react";

interface DiyaFlameProps {
  intensity?: "normal" | "high" | "aarti";
  onClick?: () => void;
  interactive?: boolean;
}

export default function DiyaFlame({ intensity = "normal", onClick, interactive = true }: DiyaFlameProps) {
  const [localActive, setLocalActive] = useState(false);

  const handleClick = () => {
    if (!interactive) return;
    setLocalActive(!localActive);
    if (onClick) {
      onClick();
    }
  };

  const isFlaring = intensity === "aarti" || intensity === "high" || localActive;

  return (
    <div 
      className={`relative flex flex-col items-center justify-center select-none ${interactive ? "cursor-pointer group" : ""}`}
      onClick={handleClick}
      title={interactive ? "Click to offer prayers / toggle Diya flame" : ""}
    >
      {/* Flame Container */}
      <div className="relative w-16 h-24 flex items-end justify-center mb-[-4px]">
        {/* Outer Aura Glow */}
        <div className={`absolute bottom-2 w-12 h-16 rounded-full bg-orange-500 blur-xl opacity-30 transition-all duration-500 ${isFlaring ? "scale-150 opacity-60 bg-amber-400" : "group-hover:opacity-45"}`}></div>
        
        {/* Main Flame SVG */}
        <svg 
          className={`w-12 h-20 transition-all duration-300 ${isFlaring ? "diya-flame-active" : "diya-flame"}`} 
          viewBox="0 0 100 150" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Flame Outer Layer (Yellow-Orange) */}
          <path 
            d="M50 10C50 10 90 60 90 95C90 120 72 138 50 138C28 138 10 120 10 95C10 60 50 10 50 10Z" 
            fill="url(#flameOuter)" 
            className="transition-all duration-300"
          />
          
          {/* Flame Middle Layer (Yellow) */}
          <path 
            d="M50 35C50 35 78 72 78 98C78 116 65 128 50 128C35 128 22 116 22 98C22 72 50 35 50 35Z" 
            fill="url(#flameInner)" 
            className="transition-all duration-300"
          />
          
          {/* Flame Core (Blue-White) */}
          <path 
            d="M50 65C50 65 65 90 65 105C65 115 58 122 50 122C42 122 35 115 35 105C35 90 50 65 50 65Z" 
            fill="url(#flameCore)" 
            className="transition-all duration-300"
          />

          <defs>
            <radialGradient id="flameOuter" cx="50%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="35%" stopColor="#FFA036" />
              <stop offset="85%" stopColor="#FF4D00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D43F00" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="flameInner" cx="50%" cy="80%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#FFF677" />
              <stop offset="80%" stopColor="#FF9100" />
              <stop offset="100%" stopColor="#FF4000" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="flameCore" x1="50%" y1="65%" x2="50%" y2="122%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#8EE3FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#004CFF" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Clay Diya Body */}
      <svg 
        className="w-20 h-10 text-[#C05621] drop-shadow-md transition-transform duration-300 group-hover:scale-105" 
        viewBox="0 0 120 60" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Diya Base */}
        <path d="M10 20C10 20 20 50 60 50C100 50 110 20 110 20C110 20 100 35 60 35C20 35 10 20 10 20Z" fill="url(#clayGrad)" />
        {/* Diya Lip / Rim */}
        <path d="M5 20C5 20 20 12 60 12C100 12 115 20 115 20C115 20 100 28 60 28C20 28 5 20 5 20Z" fill="url(#clayRim)" />
        {/* Wick point */}
        <path d="M54 22L66 22L60 14Z" fill="#1A202C" />

        <defs>
          <linearGradient id="clayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C05621" />
            <stop offset="60%" stopColor="#7B341E" />
            <stop offset="100%" stopColor="#4A1D0F" />
          </linearGradient>
          <linearGradient id="clayRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9C4221" />
            <stop offset="50%" stopColor="#DD6B20" />
            <stop offset="100%" stopColor="#9C4221" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Interactive Ripple rings when flaring */}
      {isFlaring && (
        <div className="absolute bottom-1 w-24 h-6 border border-[#FF8C00] rounded-full opacity-20 animate-ping pointer-events-none"></div>
      )}
    </div>
  );
}
