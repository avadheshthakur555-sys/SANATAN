import React, { Suspense } from "react";
import { Metadata } from "next";
import LibraryBrowser from "@/components/library/LibraryBrowser";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "📚 Sacred Scripture Library — सनातन विद्या",
  description: "Browse the ancient texts and holy scriptures of Sanatan Dharma including the Vedas, Upanishads, Puranas, and Epics.",
};

export default function LibraryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F0] text-[#3E2723]">
      <div className="flex-grow w-full">
        <Suspense fallback={
          <div className="flex items-center justify-center py-40 bg-[#FAF7F0]">
            <span className="text-[#8C2D19] font-sanskrit text-3xl animate-pulse">ॐ</span>
          </div>
        }>
          <LibraryBrowser />
        </Suspense>
      </div>
      
      <Footer />
    </div>
  );
}
