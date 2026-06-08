"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const { playNavigate } = useSacredSound();

  // Create full path items, starting with Home
  const allItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...items,
  ];

  // For mobile layout: if we have more than 2 items, only show the last 2 items
  // to avoid wrapping and text overlap on narrow screens.
  const mobileItems = allItems.length > 2 ? allItems.slice(-2) : allItems;

  return (
    <nav className="w-full flex items-center justify-between py-3 px-4 md:px-6 bg-[var(--bg-secondary)]/40 border-y border-[var(--border-gold)]/30 backdrop-blur-sm select-none mb-6">
      {/* Desktop Breadcrumb: Show full chain */}
      <ol className="hidden md:flex items-center space-x-2 text-xs font-semibold text-[var(--text-secondary)]">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-[var(--accent-gold)]/40 mx-2 flex-shrink-0" />
              )}
              {isLast || !item.href ? (
                <span className="text-[var(--accent-gold)] truncate max-w-[200px]">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => playNavigate()}
                  className="flex items-center hover:text-[var(--text-primary)] transition-colors duration-150 no-underline cursor-pointer"
                >
                  {index === 0 && <Home className="w-3.5 h-3.5 mr-1" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      {/* Mobile Breadcrumb: Show condensed last 2 items */}
      <ol className="flex md:hidden items-center space-x-2 text-xs font-semibold text-[var(--text-secondary)] w-full overflow-hidden">
        {allItems.length > 2 && (
          <li className="flex items-center text-[var(--text-secondary)]/50 mr-1 flex-shrink-0">
            <span>...</span>
            <ChevronRight className="w-3 h-3 text-[var(--accent-gold)]/30 mx-1 flex-shrink-0" />
          </li>
        )}
        {mobileItems.map((item, index) => {
          const isLast = index === mobileItems.length - 1;
          return (
            <li key={index} className="flex items-center truncate">
              {index > 0 && (
                <ChevronRight className="w-3 h-3 text-[var(--accent-gold)]/40 mx-1.5 flex-shrink-0" />
              )}
              {isLast || !item.href ? (
                <span className="text-[var(--accent-gold)] truncate max-w-[150px]">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => playNavigate()}
                  className="hover:text-[var(--text-primary)] transition-colors duration-150 no-underline cursor-pointer truncate"
                >
                  {item.label === "Home" && <Home className="w-3 h-3 mr-0.5 inline" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
