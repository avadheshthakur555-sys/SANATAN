"use client";

import React, { memo, useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";

const ThemeToggle = memo(() => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const { playClick } = useSacredSound();

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    playClick();
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div className="w-[34px] h-[34px] rounded-full bg-[var(--bg-secondary)] border border-[var(--border-gold)] opacity-50" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-phi-sm rounded-full bg-[var(--bg-secondary)] border border-[var(--border-gold)] text-[var(--accent-gold)] hover:text-[var(--accent-saffron)] transition-all duration-618 ease-divine cursor-pointer outline-none ag-float flex items-center justify-center"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 transition-transform duration-382" />
      ) : (
        <Sun className="w-5 h-5 transition-transform duration-382" />
      )}
    </button>
  );
});

ThemeToggle.displayName = "ThemeToggle";
export default ThemeToggle;
