"use client";

import React, { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Search, Download } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";

const MobileNav = memo(() => {
  const pathname = usePathname();
  const { playClick, playNavigate } = useSacredSound();

  const tabs = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/library", label: "Library", icon: <BookOpen className="w-5 h-5" /> },
    { href: "#search", label: "Search", icon: <Search className="w-5 h-5" />, isAction: true },
    { href: "/downloads", label: "Downloads", icon: <Download className="w-5 h-5" /> },
  ];

  const handleTabClick = (e: React.MouseEvent, tab: typeof tabs[number]) => {
    if (tab.isAction) {
      e.preventDefault();
      playClick();
      window.dispatchEvent(new CustomEvent("open-search"));
    } else {
      playNavigate();
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[64px] bg-[var(--bg-card)]/90 backdrop-blur-md border-t border-[var(--border-gold)] z-40 md:hidden flex items-center justify-around px-phi-sm select-none">
      {tabs.map((tab) => {
        const isActive = tab.isAction ? false : pathname === tab.href;
        
        return (
          <Link
            key={tab.label}
            href={tab.href}
            onClick={(e) => handleTabClick(e, tab)}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-[2px] transition-all duration-382 no-underline cursor-pointer ${
              isActive 
                ? "text-[var(--accent-saffron)] scale-110" 
                : "text-[var(--text-secondary)] active:scale-95"
            }`}
            aria-label={tab.label}
          >
            <div className={`transition-transform duration-382 ${isActive ? "animate-bounce" : ""}`}>
              {tab.icon}
            </div>
            <span className="text-[10px] font-medium tracking-wide">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
});

MobileNav.displayName = "MobileNav";
export default MobileNav;
