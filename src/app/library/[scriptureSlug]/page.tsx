import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Footer from "@/components/layout/Footer";
import ScriptureDetailClient from "@/components/library/ScriptureDetailClient";

interface PageProps {
  params: Promise<{ scriptureSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { scriptureSlug } = await params;
  const scripture = await prisma.scripture.findUnique({
    where: { slug: scriptureSlug }
  });
  return {
    title: scripture ? `${scripture.titleEnglish} (${scripture.titleSanskrit}) — Sanatan Library` : "Scripture Not Found",
    description: scripture?.description || "Browse chapters and verses of holy scriptures."
  };
}

export default async function ScriptureOverviewPage({ params }: PageProps) {
  const { scriptureSlug } = await params;

  // Retrieve scripture details and all its chapters from Prisma
  const scripture = await prisma.scripture.findUnique({
    where: { slug: scriptureSlug },
    include: {
      chapters: {
        orderBy: { chapterNumber: "asc" }
      }
    }
  });

  if (!scripture) {
    notFound();
  }

  const getNextReadItems = () => {
    const s = scriptureSlug.toLowerCase();
    const items = [];
    
    if (s === "gita") {
      items.push({
        category: "Deities",
        titleEnglish: "Lord Krishna",
        titleSanskrit: "कृष्ण",
        description: "Explore the biography, avatars, and teachings of the speaker of the Gita.",
        href: "/deities/krishna"
      });
      items.push({
        category: "Scriptures",
        titleEnglish: "Upanishads",
        titleSanskrit: "उपनिषद्",
        description: "Deep-dive into the forest philosophy that formed the background of the Gita.",
        href: "/library?tab=upanishads"
      });
      items.push({
        category: "Timeline",
        titleEnglish: "Sacred Timeline",
        titleSanskrit: "इतिहास कालचक्र",
        description: "Trace the Kurukshetra war epoch and other historical milestones.",
        href: "/history"
      });
    } else if (s.includes("veda")) {
      items.push({
        category: "Scriptures",
        titleEnglish: "Bhagavad Gita",
        titleSanskrit: "श्रीमद्भगवद्गीता",
        description: "Read the essence of all Vedic wisdom spoken directly by Sri Krishna.",
        href: "/library/gita/chapter/1"
      });
      items.push({
        category: "Sages",
        titleEnglish: "Sage Veda Vyasa",
        titleSanskrit: "वेदव्यास",
        description: "Meet the compiler who classified the Vedas and wrote the Puranas.",
        href: "/sages"
      });
      items.push({
        category: "Knowledge",
        titleEnglish: "Karma & Dharma",
        titleSanskrit: "कर्म एवं धर्म",
        description: "Understand the core concepts of actions, duties, and cosmic order.",
        href: "/knowledge"
      });
    } else {
      items.push({
        category: "Scriptures",
        titleEnglish: "Bhagavad Gita",
        titleSanskrit: "श्रीमद्भगवद्गीता",
        description: "Study the key text of the Mahabharata on duty and spiritual path.",
        href: "/library/gita/chapter/1"
      });
      items.push({
        category: "Deities",
        titleEnglish: "Lord Rama",
        titleSanskrit: "राम",
        description: "Study the character, virtues, and battles of the hero of Ramayana.",
        href: "/deities/rama"
      });
      items.push({
        category: "Timeline",
        titleEnglish: "Sacred Timeline",
        titleSanskrit: "इतिहास कालचक्र",
        description: "Trace the historical timeline of ancient epics and compilers.",
        href: "/history"
      });
    }
    return items;
  };

  return (
    <>
      <ScriptureDetailClient 
        scripture={scripture} 
        nextReadItems={getNextReadItems()} 
      />
      <Footer />
    </>
  );
}
