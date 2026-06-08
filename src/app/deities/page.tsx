import React from "react";
import { Metadata } from "next";
import DeitiesDirectoryView from "@/components/deities/DeitiesDirectoryView";

export const metadata: Metadata = {
  title: "🗺️ Sacred Deities Directory — सनातन",
  description: "Browse profile summaries, mantras, stotras, and stories of prominent deities in Sanatan Dharma, including the Trimurti and Tridevi.",
};

export default function DeitiesDirectoryPage() {
  return <DeitiesDirectoryView />;
}
