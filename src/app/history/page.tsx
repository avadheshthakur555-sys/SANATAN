import React from "react";
import { Metadata } from "next";
import HistoryClient from "./HistoryClient";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "🕐 Pilgrimage Through Time — सनातन इतिहास | Sanatan",
  description: "Walk a continuous sacred pilgrimage through Sanatan history, from the origins of Dharma to the modern global era, presented like an illustrated ancient manuscript.",
};

export default function HistoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F0] text-[#3E2723]">
      <Breadcrumb items={[{ label: "Sacred Timeline" }]} />
      
      {/* Dynamic client-side history timeline */}
      <HistoryClient />
      
      {/* Page Footer */}
      <Footer />
    </div>
  );
}
