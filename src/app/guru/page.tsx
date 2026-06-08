import React from "react";
import type { Metadata } from "next";
import ChatConsole from "@/components/guru/ChatConsole";

export const metadata: Metadata = {
  title: "AI Guru — Sacred Scriptural RAG Oracle | Sanatan",
  description: "Ask questions and receive instant guidance from the Bhagavad Gita, Vedas, Upanishads, and commentaries using our verified zero-hallucination AI agent.",
};

export default function GuruPage() {
  return (
    <div className="h-[calc(100vh-68px)] w-full bg-[#050208] text-white relative overflow-hidden">
      <ChatConsole />
    </div>
  );
}
