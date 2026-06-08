"use client";

import React, { useState } from "react";

interface SacredImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  type?: "deity" | "temple" | "scripture";
}

export default function SacredImage({ src, alt, className = "", fallbackText = "ॐ", type = "deity" }: SacredImageProps) {
  const [hasError, setHasError] = useState(!src);

  if (hasError) {
    const isDeity = type === "deity";
    const isTemple = type === "temple";
    const bgGradient = isDeity
      ? "from-[#1a120c] via-[#2a1708] to-[#120703]"
      : isTemple
      ? "from-[#110d12] via-[#201525] to-[#070308]"
      : "from-[#080d16] via-[#101c2e] to-[#03060a]";

    const seedSymbol = isDeity ? "ॐ" : isTemple ? "🛕" : "📖";

    return (
      <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br ${bgGradient} border border-[#D4A01740] rounded-xl overflow-hidden select-none ${className}`}>
        {/* Sacred geometric backdrop decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <svg className="w-5/6 h-5/6 text-[#D4A017] animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
            <circle cx="50" cy="50" r="45" strokeDasharray="2 2" />
            <polygon points="50,5 95,50 50,95 5,50" />
            <polygon points="50,15 85,50 50,85 15,50" />
            <circle cx="50" cy="50" r="25" />
          </svg>
        </div>

        {/* Central visual text */}
        <div className="relative z-10 flex flex-col items-center text-center p-4">
          <span className="text-3xl text-[#FFD700] font-sanskrit mb-1.5 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">
            {seedSymbol}
          </span>
          <span className="text-[10px] text-[#9CA3AF] uppercase font-mono tracking-widest block max-w-[85%] truncate">
            {fallbackText}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
