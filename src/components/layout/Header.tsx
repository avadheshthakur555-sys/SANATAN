"use client";

import React, { memo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ChevronDown, ChevronUp, Sparkles, ArrowRight } from "lucide-react";
import LanguageToggle from "@/components/ui/LanguageToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useSacredSound } from "@/lib/sacred-audio";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  items: DropdownItem[];
}

const NAV_LINKS: NavLink[] = [
  {
    label: "Scriptures",
    href: "/library",
    items: [
      { label: "Vedas", href: "/library?tab=vedas" },
      { label: "Upanishads", href: "/library?tab=upanishads" },
      { label: "Bhagavad Gita", href: "/library/gita/chapter/1" },
      { label: "Ramayana", href: "/library?tab=epics" },
      { label: "Mahabharata", href: "/library?tab=epics" },
      { label: "Puranas", href: "/library?tab=puranas" }
    ]
  },
  {
    label: "Temples",
    href: "/temples",
    items: [
      { label: "Sacred Atlas (Map)", href: "/temples" },
      { label: "12 Jyotirlinga", href: "/jyotirlinga" },
      { label: "51 Shakti Peeth", href: "/temples?filter=Shakti Peethas" },
      { label: "Char Dham", href: "/temples?filter=Char Dham" }
    ]
  },
  {
    label: "Deities",
    href: "/deities",
    items: [
      { label: "Shiva", href: "/deities/shiva" },
      { label: "Vishnu", href: "/deities/vishnu" },
      { label: "Devi", href: "/deities/durga" },
      { label: "Ganesha", href: "/deities/ganesha" },
      { label: "Hanuman", href: "/deities/hanuman" }
    ]
  },
  {
    label: "Knowledge",
    href: "/knowledge",
    items: [
      { label: "Dharma", href: "/knowledge?tab=dharma" },
      { label: "Karma", href: "/knowledge?tab=karma" },
      { label: "Moksha", href: "/knowledge?tab=moksha" },
      { label: "Yoga", href: "/knowledge?tab=yoga" }
    ]
  }
];

const Header = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);

  const pathname = usePathname();
  const { playClick, playNavigate } = useSacredSound();

  const handleNavClick = () => {
    playNavigate();
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleMobileGroup = (label: string) => {
    playClick();
    setMobileExpandedGroup((prev) => (prev === label ? null : label));
  };

  return (
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

        {/* Center: Desktop Menu with Hover Dropdowns (6 primary items) */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-5 flex-grow justify-center mx-4">
          {/* Dropdown Items */}
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href.split("?")[0]);
            const isOpen = activeDropdown === link.label;

            return (
              <div
                key={link.label}
                className="relative py-4"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  onClick={handleNavClick}
                  className={`group relative flex items-center gap-1 text-[11px] xl:text-[13px] font-semibold transition-colors duration-300 no-underline cursor-pointer py-4
                    ${isActive 
                      ? "text-[var(--accent-gold)] font-extrabold" 
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }
                  `}
                >
                  <span>{link.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  
                  {/* Underline indicator */}
                  <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-gold)] to-[var(--gold-light)] transition-all duration-300 origin-center
                    ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                  `} />
                </Link>

                {/* Desktop Mega Menu Dropdown */}
                {isOpen && (
                  <div className="absolute top-[48px] left-1/2 -translate-x-1/2 w-60 bg-[var(--bg-secondary)] border border-[var(--border-gold)]/40 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.7)] p-4 flex flex-col gap-1 z-50 animate-fade-in">
                    {link.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={handleNavClick}
                        className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent-gold)] py-2 px-3 rounded hover:bg-[var(--accent-gold)]/10 transition-all no-underline block"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Direct Link Items */}
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

          <Link
            href="/library"
            onClick={handleNavClick}
            className={`group relative text-[11px] xl:text-[13px] font-semibold transition-colors duration-300 no-underline cursor-pointer py-4
              ${pathname === "/library" && !pathname.includes("/gita") ? "text-[var(--accent-gold)] font-extrabold" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}
            `}
          >
            <span>Library</span>
            <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-gold)] to-[var(--gold-light)] transition-all duration-300 origin-center
              ${pathname === "/library" && !pathname.includes("/gita") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
            `} />
          </Link>
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-4 flex-shrink-0">

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

          {/* List of links with expandable dropdown accordions */}
          <nav className="flex flex-col gap-4 mt-6">
            <Link
              href="/"
              onClick={handleNavClick}
              className="flex justify-between items-center py-2 text-[var(--text-primary)] hover:text-[var(--accent-gold)] border-b border-[var(--border-gold)]/20 no-underline"
            >
              <span className="font-serif text-base font-bold">Home</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </Link>

            {NAV_LINKS.map((link) => {
              const isGroupExpanded = mobileExpandedGroup === link.label;
              return (
                <div key={link.label} className="border-b border-[var(--border-gold)]/20 pb-2">
                  <div
                    onClick={() => toggleMobileGroup(link.label)}
                    className="flex justify-between items-center py-2 cursor-pointer text-[var(--text-primary)] hover:text-[var(--accent-gold)]"
                  >
                    <span className="font-serif text-base font-bold">{link.label}</span>
                    {isGroupExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>

                  {isGroupExpanded && (
                    <div className="flex flex-col gap-2 pl-4 mt-2 border-l border-[var(--border-gold)]/30 animate-fade-in">
                      {link.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={handleNavClick}
                          className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] py-1 no-underline block"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

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

            <Link
              href="/library"
              onClick={handleNavClick}
              className="flex justify-between items-center py-2 text-[var(--text-primary)] hover:text-[var(--accent-gold)] border-b border-[var(--border-gold)]/20 no-underline"
            >
              <span className="font-serif text-base font-bold">Library</span>
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
  );
});

Header.displayName = "Header";
export default Header;
