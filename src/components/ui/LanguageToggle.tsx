"use client";

import React, { memo } from "react";
import { useLanguageStore, Language } from "@/store/useLanguageStore";
import { useSacredSound } from "@/lib/sacred-audio";

const LanguageToggle = memo(() => {
  const { language, setLanguage } = useLanguageStore();
  const { playClick } = useSacredSound();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentLang = mounted ? language : "EN";

  const handleLanguageChange = (lang: Language) => {
    if (lang !== currentLang) {
      playClick();
      setLanguage(lang);
    }
  };

  const options: { value: Language; label: string; desc: string }[] = [
    { value: "EN", label: "EN", desc: "English" },
    { value: "HI", label: "हिं", desc: "Hindi" },
    { value: "SA", label: "सं", desc: "Sanskrit" },
  ];

  return (
    <div 
      className="inline-flex bg-[var(--bg-secondary)] border border-[var(--border-gold)] p-[3px] rounded-full select-none"
      role="radiogroup"
      aria-label="Language Selector"
    >
      {options.map((opt) => {
        const isActive = currentLang === opt.value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={isActive}
            aria-label={opt.desc}
            onClick={() => handleLanguageChange(opt.value)}
            className={`px-phi-md py-[4px] rounded-full text-phi-xs md:text-phi-sm font-semibold transition-all duration-382 cursor-pointer outline-none ${
              isActive
                ? "bg-[var(--accent-saffron)] text-white shadow-[0_2px_6px_rgba(249,115,22,0.3)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
});

LanguageToggle.displayName = "LanguageToggle";
export default LanguageToggle;
