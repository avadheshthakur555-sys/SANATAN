"use client";

import React, { useEffect, useState } from "react";

export default function TempleDoor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    // Start door opening animation shortly after mount
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 400);

    // Completely unmount/hide door markup after transition completes (2.2s + 0.4s buffer)
    const renderTimer = setTimeout(() => {
      setIsRendered(false);
    }, 3000);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(renderTimer);
    };
  }, []);

  if (!isRendered) return null;

  return (
    <>
      <div className={`temple-door-container ${isOpen ? "open" : ""} ${!isRendered ? "hidden-doors" : ""}`}>
        {/* Left Door */}
        <div className="temple-door-left">
          {/* Detailed carved patterns on the left panel */}
          <div className="absolute inset-4 border border-[#D4A017] opacity-20 pointer-events-none rounded-sm"></div>
          <div className="absolute inset-8 border border-[#D4A017] opacity-10 pointer-events-none rounded-sm"></div>
          
          {/* Half Medallion */}
          <div className="absolute right-0 w-32 h-64 border-y border-l border-[#D4A017] rounded-l-full bg-[#110b07] flex items-center justify-end pr-2 shadow-2xl">
            <svg className="w-24 h-48 text-[#D4A017] opacity-80" viewBox="0 0 100 200" fill="currentColor">
              {/* Half Mandala */}
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
              {/* Left half of OM */}
              <path d="M 100 65 A 35 35 0 0 0 70 100 A 35 35 0 0 0 100 135" fill="none" stroke="currentColor" strokeWidth="4" />
              {/* Traditional patterns */}
              <path d="M 100 30 C 50 30 50 170 100 170" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          
          <div className="absolute top-12 left-12 text-[#D4A017] opacity-40 font-serif text-sm tracking-widest uppercase">
            शुभ
          </div>
          
          {/* Brass ring knocker left */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#D4A017] flex items-center justify-center shadow-lg">
            <div className="w-12 h-12 rounded-full border-4 border-[#D4A017] absolute -right-2"></div>
          </div>
        </div>

        {/* Right Door */}
        <div className="temple-door-right">
          {/* Detailed carved patterns on the right panel */}
          <div className="absolute inset-4 border border-[#D4A017] opacity-20 pointer-events-none rounded-sm"></div>
          <div className="absolute inset-8 border border-[#D4A017] opacity-10 pointer-events-none rounded-sm"></div>
          
          {/* Half Medallion */}
          <div className="absolute left-0 w-32 h-64 border-y border-r border-[#D4A017] rounded-r-full bg-[#110b07] flex items-center justify-start pl-2 shadow-2xl">
            <svg className="w-24 h-48 text-[#D4A017] opacity-80" viewBox="0 0 100 200" fill="currentColor">
              {/* Half Mandala */}
              <circle cx="0" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="0" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="0" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
              {/* Right half of OM */}
              <path d="M 0 65 A 35 35 0 0 1 30 100 A 35 35 0 0 1 0 135" fill="none" stroke="currentColor" strokeWidth="4" />
              {/* Bindu/Chandrabindu left portion */}
              <path d="M 0 50 Q 15 50 15 40" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="10" cy="30" r="3" />
              {/* Traditional patterns */}
              <path d="M 0 30 C 50 30 50 170 0 170" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          
          <div className="absolute top-12 right-12 text-[#D4A017] opacity-40 font-serif text-sm tracking-widest uppercase">
            लाभ
          </div>
          
          {/* Brass ring knocker right */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#D4A017] flex items-center justify-center shadow-lg">
            <div className="w-12 h-12 rounded-full border-4 border-[#D4A017] absolute -left-2"></div>
          </div>
        </div>
      </div>
      {/* Behind-the-doors backdrop overlay for smooth scene blending */}
      {isOpen && <div className="temple-door-overlay" />}
    </>
  );
}
