"use client";

import React, { useState, useEffect, memo } from "react";
import { AlertCircle, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";

const LayoutDebugger = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [mainWidth, setMainWidth] = useState(0);
  const [heroWidth, setHeroWidth] = useState(0);
  const [vedasWidth, setVedasWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const [showOutlines, setShowOutlines] = useState(false);

  const { playClick } = useSacredSound();

  useEffect(() => {
    setIsClient(true);
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      
      const mainEl = document.querySelector("main");
      if (mainEl) setMainWidth(mainEl.clientWidth);

      const heroEl = document.getElementById("hero");
      if (heroEl) setHeroWidth(heroEl.clientWidth);

      const vedasEl = document.getElementById("vedas");
      if (vedasEl) setVedasWidth(vedasEl.clientWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isClient) return null;

  // Active Breakpoint calculation
  const getBreakpoint = (width: number) => {
    if (width >= 1440) return "XL (Desktop 1440+)";
    if (width >= 1024) return "LG (Laptop 1024+)";
    if (width >= 768) return "MD (Tablet 768+)";
    if (width >= 480) return "XS (Mobile 480+)";
    return "Base Mobile (<480)";
  };

  const isCollapsed = viewportWidth > 320 && (mainWidth < 300 || heroWidth < 300);
  const hasWidthConflict = mainWidth > viewportWidth || heroWidth > viewportWidth;

  return (
    <div className="fixed bottom-20 right-6 z-50 select-none font-mono">
      {/* Outlines CSS injection */}
      {showOutlines && (
        <style dangerouslySetInnerHTML={{ __html: `
          main, section, .max-w-6xl, .max-w-4xl, .max-w-5xl { outline: 2px solid red !important; outline-offset: -2px; }
          div { outline: 2px solid blue !important; outline-offset: -1px; }
          p, h1, h2, h3, h4, span { outline: 2px solid green !important; }
        `}} />
      )}

      {/* Floating Audit Toggle Button */}
      <button
        onClick={() => {
          playClick();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0F0F14]/90 border border-[#B8860B] text-[#FFD700] hover:text-white hover:bg-[#B8860B]/20 shadow-[0_4px_20px_rgba(184,134,11,0.25)] transition-all cursor-pointer text-xs uppercase tracking-wider font-bold"
      >
        <span>🛠️ Layout Audit</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>

      {/* Audit Panel */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 bg-[#0F0F14] border border-[#B8860B40] rounded-xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] flex flex-col gap-4 animate-fade-in text-xs text-[#9CA3AF] backdrop-blur-md">
          <div className="flex justify-between items-center border-b border-[#B8860B15] pb-2">
            <span className="text-[#FFD700] font-bold uppercase tracking-wider">Audit Report</span>
            <span className="text-[10px] text-gray-500 font-sans">Live UI telemetry</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {/* Viewport Width */}
            <div className="flex justify-between items-center">
              <span>Root Viewport:</span>
              <span className="text-white font-bold">{viewportWidth}px</span>
            </div>

            {/* Main Wrapper */}
            <div className="flex justify-between items-center">
              <span>Main Container:</span>
              <span className="text-white font-bold">{mainWidth}px</span>
            </div>

            {/* Hero Section */}
            <div className="flex justify-between items-center">
              <span>Hero Width:</span>
              <span className="text-white font-bold">{heroWidth}px</span>
            </div>

            {/* Vedas Section */}
            <div className="flex justify-between items-center">
              <span>Vedas Section:</span>
              <span className="text-white font-bold">{vedasWidth}px</span>
            </div>

            {/* Active Breakpoint */}
            <div className="flex justify-between items-center">
              <span>Breakpoint:</span>
              <span className="text-[#FFD700] font-bold">{getBreakpoint(viewportWidth)}</span>
            </div>
          </div>

          <div className="border-t border-[#B8860B15] pt-3 mt-1 flex flex-col gap-2">
            {/* Outlines visualization checkbox toggle */}
            <label className="flex items-center gap-2 text-[#FFD700] cursor-pointer py-1 select-none">
              <input
                type="checkbox"
                checked={showOutlines}
                onChange={(e) => {
                  playClick();
                  setShowOutlines(e.target.checked);
                }}
                className="rounded border-[#B8860B] bg-[#0F0F14] text-[#B8860B] focus:ring-[#B8860B] cursor-pointer"
              />
              <span className="text-[11px] uppercase tracking-wider font-bold">Show Outlines (R/B/G)</span>
            </label>

            {/* Status indicators */}
            {isCollapsed ? (
              <div className="flex items-start gap-2 text-red-500 bg-red-950/20 border border-red-500/20 rounded p-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span><strong>COLLAPSE DETECTED:</strong> Container width is compressed. Check flex shrink settings.</span>
              </div>
            ) : hasWidthConflict ? (
              <div className="flex items-start gap-2 text-yellow-500 bg-yellow-950/20 border border-yellow-500/20 rounded p-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span><strong>OVERFLOW CONFLICT:</strong> Element width exceeds root viewport causing scroll.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-500 bg-green-950/20 border border-green-500/20 rounded p-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>✅ All Layout Constraints Aligned to φ</span>
              </div>
            )}

            <div className="text-[10px] text-gray-500 leading-normal mt-1 border-t border-[#B8860B10] pt-2">
              Auto-responsive scaling active. Viewport is stretched fluidly under standard and custom media breakpoints.
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

LayoutDebugger.displayName = "LayoutDebugger";
export default LayoutDebugger;
