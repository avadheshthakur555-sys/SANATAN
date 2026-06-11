"use client";

import React, { memo, useEffect, useRef, useState } from "react";

interface StatItemProps {
  icon: string;
  targetNumber: number;
  suffix?: string;
  label: string;
}

const StatItem = memo<StatItemProps>(({ icon, targetNumber, suffix = "", label }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1618; // φ-seconds = 1618ms
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) approximation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easedProgress * targetNumber);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isVisible, targetNumber]);

  return (
    <div 
      ref={itemRef} 
      className="flex flex-col items-center justify-center p-phi-md ag-float select-none text-center cursor-default min-w-[120px]"
    >
      <span className="text-[32px] mb-phi-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">{icon}</span>
      <span className="font-heading text-phi-xl md:text-phi-2xl font-extrabold text-[var(--accent-gold)]">
        {count > 0 ? count.toLocaleString("en-US") : "0"}{suffix}
      </span>
      <span className="text-phi-xs md:text-phi-sm text-[var(--text-secondary)] font-semibold mt-[2px] uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
});

StatItem.displayName = "StatItem";

const StatsBar = memo(() => {
  const barRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        }
      },
      { threshold: 0.1 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: "📕", targetNumber: 4, suffix: "", label: "Vedas" },
    { icon: "📗", targetNumber: 108, suffix: "+", label: "Upanishads" },
    { icon: "📘", targetNumber: 18, suffix: "", label: "Puranas" },
    { icon: "📒", targetNumber: 700, suffix: "", label: "Gita Shlokas" },
    { icon: "📙", targetNumber: 100000, suffix: "+", label: "Mahabharata Verses" },
  ];

  return (
    <div 
      ref={barRef}
      className={`w-full py-phi-xl bg-[var(--bg-secondary)] dark:bg-[var(--bg-card)] border-y border-[var(--border-gold)] transition-all duration-618 ease-divine ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-phi-lg">
        {/* Responsive layout: 5 cols on desktop, grid on mobile/tablet */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-phi-lg justify-items-center">
          {stats.map((stat, idx) => (
            <div key={idx} className={idx === 4 ? "col-span-2 md:col-span-1" : ""}>
              <StatItem 
                icon={stat.icon} 
                targetNumber={stat.targetNumber} 
                suffix={stat.suffix} 
                label={stat.label} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

StatsBar.displayName = "StatsBar";
export default StatsBar;
