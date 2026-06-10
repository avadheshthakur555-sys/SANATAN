"use client";

import React, { memo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Sparkles, ArrowRight, Compass } from "lucide-react";
import LanguageToggle from "@/components/ui/LanguageToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useSacredSound } from "@/lib/sacred-audio";
import SanatanCompass from "@/components/ui/SanatanCompass";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Scriptures", href: "/library" },
  { label: "Temples", href: "/temples" },
  { label: "Deities", href: "/deities" },
  { label: "Knowledge", href: "/knowledge" }
];

const Header = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [compassOpen, setCompassOpen] = useState(false);
  const pathname = usePathname();
  const { playClick, playNavigate } = useSacredSound();

  const handleNavClick = () => {
    playNavigate();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 z-40 glass-header select-none shadow-[0_4px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between gap-4 relative">
        
        {/* Left: Brand Logo */}
        <Link 
          href="/" 
          onClick={handleNavClick}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity no-underline cursor-pointer flex-shrink-0"
        >
          <div className="w-9 h-9 rounded bg-gradient-to-br from-[var(--accent-gold)] to-[var(--gold-light)] flex items-center justify-center shadow-[0_0_10px_rgba(184,134,11,0.3)] border border-white/10">
            <span className="text-black text-lg font-bold font-sanskrit">ॐ</span>
          </div>
        </Link>

        {/* Center: Desktop Menu (Direct Links) */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-5 flex-grow justify-center mx-4">
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href.split("?")[0]);

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className={`group relative text-[11px] xl:text-[13px] font-semibold transition-colors duration-300 no-underline cursor-pointer py-4
                  ${isActive 
                    ? "text-[var(--accent-gold)] font-extrabold" 
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }
                `}
              >
                <span>{link.label}</span>
                
                {/* Underline indicator */}
                <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-gold)] to-[var(--gold-light)] transition-all duration-300 origin-center
                  ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                `} />
              </Link>
            );
          })}

          <Link
            href="/history"
            onClick={handleNavClick}
            className={`group relative text-[11px] xl:text-[13px] font-semibold transition-colors duration-300 no-underline cursor-pointer py-4
              ${pathname === "/history" ? "text-[var(--accent-gold)] font-extrabold" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}
            `}
          >
            <span>Timeline</span>
            <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-gold)] to-[var(--gold-light)] transition-all duration-300 origin-center
              ${pathname === "/history" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
            `} />
          </Link>

          <Link
            href="/sages"
            onClick={handleNavClick}
            className={`group relative text-[11px] xl:text-[13px] font-semibold transition-colors duration-300 no-underline cursor-pointer py-4
              ${pathname === "/sages" ? "text-[var(--accent-gold)] font-extrabold" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}
            `}
          >
            <span>Sages</span>
            <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-gold)] to-[var(--gold-light)] transition-all duration-300 origin-center
              ${pathname === "/sages" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
            `} />
          </Link>
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-4 flex-shrink-0">

          {/* Sanatan Compass Trigger (Desktop) */}
          <button
            onClick={() => {
              playClick();
              setCompassOpen(true);
            }}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-gold)]/50 text-[var(--accent-gold)] hover:text-[var(--text-primary)] bg-gradient-to-r hover:from-[var(--accent-gold)]/10 hover:to-[var(--border-gold)]/20 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
            aria-label="Sanatan Compass"
          >
            <Compass className="w-3.5 h-3.5 animate-spin-slow text-[var(--accent-gold)]" />
            <span>Compass</span>
          </button>

          {/* Search Trigger (Desktop) */}
          <button
            onClick={() => {
              playClick();
              window.dispatchEvent(new CustomEvent("open-search"));
            }}
            className="hidden xl:flex p-2 rounded-full border border-[var(--border-gold)]/30 text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language selector (Desktop) */}
          <div className="hidden xl:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* AI Guru Quick Link */}
          <Link
            href="/guru"
            onClick={handleNavClick}
            className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full border border-[var(--border-gold)]/40 text-[var(--accent-gold)] hover:text-[var(--text-primary)] bg-[var(--border-gold)]/10 hover:bg-[var(--border-gold)]/25 hover:border-[var(--accent-gold)] text-[10px] font-bold uppercase tracking-wider transition-all no-underline cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[var(--accent-gold)]" />
            <span>AI Guru</span>
          </Link>

          {/* Mobile Hamburger menu Button */}
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(true);
            }}
            className="lg:hidden p-2 rounded-full border border-[var(--border-gold)]/30 text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* MOBILE FULL-SCREEN DRAWER MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[var(--bg-primary)]/98 backdrop-blur-md z-50 flex flex-col p-4 overflow-y-auto animate-fade-in select-none">
          
          {/* Header row in mobile overlay */}
          <div className="flex justify-between items-center border-b border-[var(--border-gold)]/20 pb-4">
            <Link 
              href="/" 
              onClick={handleNavClick}
              className="flex items-center gap-2 no-underline"
            >
              <div className="w-8 h-8 rounded bg-gradient-to-br from-[var(--accent-gold)] to-[var(--gold-light)] flex items-center justify-center">
                <span className="text-black text-sm font-bold font-sanskrit">ॐ</span>
              </div>
            </Link>
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-full border border-[var(--border-gold)]/40 text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-secondary)] cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search bar inside Mobile drawer */}
          <div className="relative mt-4 w-full">
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent("open-search"));
              }}
              className="w-full flex items-center gap-2 pl-3 pr-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-gold)]/40 rounded-xl text-xs text-[var(--text-secondary)] text-left cursor-pointer"
            >
              <Search className="w-4 h-4 text-[var(--text-secondary)]" />
              <span>Search scriptures, temples, deities...</span>
            </button>
          </div>

          {/* List of links */}
          <nav className="flex flex-col gap-4 mt-6">
            
            {/* Sanatan Compass Mobile Trigger */}
            <button
              onClick={() => {
                playClick();
                setCompassOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between py-3 px-4 bg-gradient-to-r from-[var(--accent-gold)]/10 to-[var(--border-gold)]/5 border border-[var(--border-gold)]/40 rounded-xl text-xs text-[var(--accent-gold)] font-bold uppercase tracking-wider text-left transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[var(--accent-gold)] animate-spin-slow" />
                <span>Sanatan Compass</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--accent-gold)]" />
            </button>

            <Link
              href="/"
              onClick={handleNavClick}
              className="flex justify-between items-center py-2 text-[var(--text-primary)] hover:text-[var(--accent-gold)] border-b border-[var(--border-gold)]/20 no-underline"
            >
              <span className="font-serif text-base font-bold">Home</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </Link>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className="flex justify-between items-center py-2 text-[var(--text-primary)] hover:text-[var(--accent-gold)] border-b border-[var(--border-gold)]/20 no-underline"
              >
                <span className="font-serif text-base font-bold">{link.label}</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </Link>
            ))}

            <Link
              href="/history"
              onClick={handleNavClick}
              className="flex justify-between items-center py-2 text-[var(--text-primary)] hover:text-[var(--accent-gold)] border-b border-[var(--border-gold)]/20 no-underline"
            >
              <span className="font-serif text-base font-bold">Timeline</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link
              href="/sages"
              onClick={handleNavClick}
              className="flex justify-between items-center py-2 text-[var(--text-primary)] hover:text-[var(--accent-gold)] border-b border-[var(--border-gold)]/20 no-underline"
            >
              <span className="font-serif text-base font-bold">Sages & Rishis</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </Link>
          </nav>

          {/* Footer buttons inside mobile overlay */}
          <div className="mt-auto border-t border-[var(--border-gold)]/25 pt-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-[var(--text-secondary)]">Theme & Language</span>
              <div className="flex items-center gap-3">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}

      </header>

      {/* Sanatan Compass Modal */}
      <SanatanCompass isOpen={compassOpen} onClose={() => setCompassOpen(false)} />
    </>
  );
});

Header.displayName = "Header";
export default Header;
