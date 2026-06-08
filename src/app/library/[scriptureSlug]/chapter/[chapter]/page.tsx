import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ScriptureReaderClient from "@/components/library/ScriptureReaderClient";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import NextReading, { NextReadItem } from "@/components/ui/NextReading";

interface PageProps {
  params: Promise<{ scriptureSlug: string; chapter: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { scriptureSlug, chapter } = await params;
  const isAllMode = chapter === "all";
  const num = parseInt(chapter);
  
  const scripture = await prisma.scripture.findUnique({
    where: { slug: scriptureSlug }
  });

  if (isAllMode) {
    return {
      title: scripture ? `Complete ${scripture.titleEnglish} (${scripture.titleSanskrit}) — Sanatan Library` : "Complete Scripture",
      description: `Read all chapters and verses of ${scripture?.titleEnglish || "scripture"} in a single continuous scroll.`,
    };
  }

  return {
    title: scripture ? `${scripture.titleEnglish} Chapter ${num} — ${scripture.titleSanskrit}` : `Chapter ${num}`,
    description: `Read chapter ${num} of ${scripture?.titleEnglish || "scripture"} in Sanskrit, Hindi, and English translation with commentaries.`,
  };
}

export default async function ScriptureChapterPage({ params }: PageProps) {
  const { scriptureSlug, chapter } = await params;
  const isAllMode = chapter === "all";
  const chapterNum = isAllMode ? 0 : parseInt(chapter);

  if (!isAllMode && (isNaN(chapterNum) || chapterNum < 1)) {
    notFound();
  }

  // Fetch scripture and its chapters ordered
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

  let activeChapter;
  let rawVerses;

  if (isAllMode) {
    activeChapter = {
      id: "all",
      chapterNumber: 0,
      titleSanskrit: "सम्पूर्ण ग्रन्थः",
      titleHindi: "सम्पूर्ण ग्रन्थ",
      titleEnglish: "Complete Scripture",
      summary: "Reading all chapters of this sacred scripture in a single continuous scroll.",
      totalVerses: scripture.totalVerses
    };

    // Fetch all verses in this scripture
    rawVerses = await prisma.verse.findMany({
      where: {
        scriptureId: scripture.id
      },
      include: {
        chapter: true
      }
    });
  } else {
    activeChapter = scripture.chapters.find((c) => c.chapterNumber === chapterNum);
    if (!activeChapter) {
      notFound();
    }

    // Fetch all verses in this chapter
    rawVerses = await prisma.verse.findMany({
      where: {
        scriptureId: scripture.id,
        chapterId: activeChapter.id
      },
      include: {
        chapter: true
      }
    });
  }

  // Sort verses numerically based on chapter number first (if all mode), then verseNumber (stripping symbols)
  const verses = [...rawVerses].sort((a, b) => {
    if (isAllMode && a.chapter.chapterNumber !== b.chapter.chapterNumber) {
      return a.chapter.chapterNumber - b.chapter.chapterNumber;
    }
    const numA = parseInt(a.verseNumber.replace(/\D/g, "")) || 0;
    const numB = parseInt(b.verseNumber.replace(/\D/g, "")) || 0;
    return numA - numB;
  });

  // Map chapters list for sidebar navigation
  const chaptersData = scripture.chapters.map((c) => ({
    number: c.chapterNumber,
    titleSanskrit: c.titleSanskrit,
    titleEnglish: c.titleEnglish,
    verseCount: c.totalVerses,
    summary: c.summary
  }));

  const getNextReadItems = (): NextReadItem[] => {
    const items: NextReadItem[] = [];
    const nextChapter = isAllMode ? null : scripture.chapters.find(c => c.chapterNumber === chapterNum + 1);

    if (nextChapter) {
      items.push({
        category: "Next Chapter",
        titleEnglish: `Chapter ${nextChapter.chapterNumber}: ${nextChapter.titleEnglish}`,
        titleSanskrit: nextChapter.titleSanskrit,
        description: `Continue reading the next chapter of this scripture.`,
        href: `/library/${scriptureSlug}/chapter/${nextChapter.chapterNumber}`
      });
    }

    const s = scriptureSlug.toLowerCase();
    if (s === "gita") {
      items.push({
        category: "Deities",
        titleEnglish: "Lord Krishna",
        titleSanskrit: "कृष्ण",
        description: "Explore the biography, avatars, and teachings of the speaker of the Bhagavad Gita.",
        href: "/deities/krishna"
      });
      items.push({
        category: "Scriptures",
        titleEnglish: "Upanishads",
        titleSanskrit: "उपनिषद्",
        description: "Deep-dive into the forest philosophy that formed the background of the Gita.",
        href: "/library?tab=upanishads"
      });
    } else if (s.includes("veda")) {
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
        category: "Timeline",
        titleEnglish: "Sacred Timeline",
        titleSanskrit: "इतिहास कालचक्र",
        description: "Trace the historical timeline of ancient epics and compilers.",
        href: "/history"
      });
    }

    // Ensure we always have at least 2 recommendations by adding default if needed
    if (items.length < 3) {
      items.push({
        category: "Library",
        titleEnglish: "Scriptures Library",
        titleSanskrit: "शास्त्र ग्रन्थावली",
        description: "Return to the main library to browse all Vedas, Upanishads, and Epics.",
        href: "/library"
      });
    }

    return items.slice(0, 3);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030204]">
      
      {/* Universal Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: "Library", href: "/library" },
          { label: scripture.titleEnglish, href: `/library/${scriptureSlug}` },
          { label: isAllMode ? "All Chapters" : `Chapter ${chapterNum}` }
        ]}
      />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 pb-8 pt-2 relative z-20">
        <ScriptureReaderClient
          scriptureSlug={scriptureSlug}
          scriptureTitleEnglish={scripture.titleEnglish}
          chapters={chaptersData}
          activeChapterNumber={chapterNum}
          activeChapterTitleSanskrit={activeChapter.titleSanskrit}
          activeChapterTitleEnglish={activeChapter.titleEnglish}
          activeChapterSummary={activeChapter.summary}
          verses={verses.map(v => ({
            id: v.id,
            verseNumber: v.verseNumber,
            textSanskrit: v.textSanskrit,
            textTransliteration: v.textTransliteration,
            translationHindi: v.translationHindi,
            translationEnglish: v.translationEnglish,
            wordMeanings: v.wordMeanings,
            commentaries: v.commentaries,
            references: v.references,
            relatedConcepts: v.relatedConcepts,
            audioUrl: v.audioUrl,
            chapterNumber: v.chapter.chapterNumber
          }))}
        />

        {/* Next Recommended Journey */}
        <NextReading items={getNextReadItems()} />
      </main>
      
      <Footer />
    </div>
  );
}
