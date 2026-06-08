"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main className={`w-full flex-grow pb-[64px] md:pb-0 transition-all duration-300 ${isHome ? "pt-0" : "pt-[76px]"}`}>
      {children}
    </main>
  );
}
