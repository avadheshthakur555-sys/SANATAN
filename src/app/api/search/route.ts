import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  if (!q.trim()) {
    return NextResponse.json({ scriptures: [], verses: [], deities: [], temples: [], festivals: [] });
  }

  try {
    // 1. Search Scriptures
    const scriptures = await prisma.scripture.findMany({
      where: {
        OR: [
          { titleEnglish: { contains: q } },
          { titleHindi: { contains: q } },
          { titleSanskrit: { contains: q } }
        ]
      },
      take: 5
    });

    // 2. Search Verses
    const rawVerses = await prisma.verse.findMany({
      where: {
        OR: [
          { textSanskrit: { contains: q } },
          { textTransliteration: { contains: q } },
          { translationHindi: { contains: q } },
          { translationEnglish: { contains: q } }
        ]
      },
      include: {
        scripture: {
          select: { titleEnglish: true, slug: true }
        },
        chapter: {
          select: { chapterNumber: true }
        }
      },
      take: 10
    });

    // Sort verses numerically
    const verses = [...rawVerses].sort((a, b) => {
      const numA = parseInt(a.verseNumber.replace(/\D/g, "")) || 0;
      const numB = parseInt(b.verseNumber.replace(/\D/g, "")) || 0;
      return numA - numB;
    });

    // 3. Search Temples (database query)
    const temples = await prisma.sacredPlace.findMany({
      where: {
        OR: [
          { name: { contains: q } },
          { nameSanskrit: { contains: q } },
          { state: { contains: q } },
          { mainDeity: { contains: q } },
          { significance: { contains: q } }
        ]
      },
      take: 5
    });

    // 4. Search Deities (all 13 primary deities)
    const staticDeities = [
      { nameEnglish: "Lord Shiva", nameSanskrit: "शिव", slug: "shiva", role: "The Destroyer of ego & regenerator of the cosmos" },
      { nameEnglish: "Lord Vishnu", nameSanskrit: "विष्णु", slug: "vishnu", role: "The Preserver and protector of cosmic order" },
      { nameEnglish: "Lord Brahma", nameSanskrit: "ब्रह्मा", slug: "brahma", role: "The Creator of the material universe" },
      { nameEnglish: "Devi Saraswati", nameSanskrit: "सरस्वती", slug: "saraswati", role: "Goddess of wisdom, speech, and fine arts" },
      { nameEnglish: "Devi Lakshmi", nameSanskrit: "लक्ष्मी", slug: "lakshmi", role: "Goddess of wealth, fortune, and abundance" },
      { nameEnglish: "Devi Parvati", nameSanskrit: "पार्वती", slug: "parvati", role: "Goddess of love, devotion, and divine strength" },
      { nameEnglish: "Lord Ganesha", nameSanskrit: "गणेश", slug: "ganesha", role: "The Remover of obstacles and patron of wisdom" },
      { nameEnglish: "Lord Kartikeya", nameSanskrit: "कार्तिकेय", slug: "kartikeya", role: "Commander of the divine forces" },
      { nameEnglish: "Lord Hanuman", nameSanskrit: "हनुमान", slug: "hanuman", role: "Symbol of ultimate strength and devotion" },
      { nameEnglish: "Devi Durga", nameSanskrit: "दुर्गा", slug: "durga", role: "The Divine Mother and fierce warrior protector" },
      { nameEnglish: "Devi Kali", nameSanskrit: "काली", slug: "kali", role: "Goddess of time and ultimate liberation" },
      { nameEnglish: "Lord Rama", nameSanskrit: "राम", slug: "rama", role: "Seventh incarnation of Vishnu, embodying ideal human duty" },
      { nameEnglish: "Lord Krishna", nameSanskrit: "कृष्ण", slug: "krishna", role: "Eighth incarnation of Vishnu, teacher of Bhagavad Gita" }
    ];

    const deities = staticDeities.filter(
      (d) =>
        d.nameEnglish.toLowerCase().includes(q.toLowerCase()) ||
        d.nameSanskrit.includes(q) ||
        d.role.toLowerCase().includes(q.toLowerCase())
    );

    // 5. Search Festivals
    const staticFestivals = [
      { name: "Maha Shivratri", deitySlug: "shiva", description: "Great night of Shiva, celebrating cosmic dance and marriage to Parvati" },
      { name: "Shravan Somvar", deitySlug: "shiva", description: "Auspicious Mondays in the holy month of Shravan dedicated to Shiva" },
      { name: "Vaikuntha Ekadashi", deitySlug: "vishnu", description: "Holy day where gates of Vishnu's celestial abode Vaikuntha open" },
      { name: "Krishna Janmashtami", deitySlug: "krishna", description: "Birth anniversary of Lord Krishna, Vishnu's eighth avatar" },
      { name: "Rama Navami", deitySlug: "rama", description: "Birth anniversary of Lord Rama, the ideal king and seventh avatar of Vishnu" },
      { name: "Ganesh Chaturthi", deitySlug: "ganesha", description: "Grand celebration marking the rebirth and arrival of Lord Ganesha" },
      { name: "Durga Puja", deitySlug: "durga", description: "Fierce battle and victory of Goddess Durga over demon Mahishasura" },
      { name: "Navratri", deitySlug: "durga", description: "Nine nights celebrating the nine forms of the Divine Mother Durga" },
      { name: "Kali Puja", deitySlug: "kali", description: "Worship of the dark goddess Kali on the new moon night of Diwali" },
      { name: "Diwali (Lakshmi Puja)", deitySlug: "lakshmi", description: "Festival of lights, welcoming prosperity and Goddess Lakshmi into homes" },
      { name: "Vasant Panchami", deitySlug: "saraswati", description: "Spring festival dedicated to Saraswati, goddess of learning and music" },
      { name: "Hanuman Jayanti", deitySlug: "hanuman", description: "Birth celebration of Lord Hanuman, the symbol of selfless devotion" },
      { name: "Thaipusam", deitySlug: "kartikeya", description: "Tamil festival commemorating Kartikeya receiving his divine spear (Vel)" }
    ];

    const festivals = staticFestivals.filter(
      (f) =>
        f.name.toLowerCase().includes(q.toLowerCase()) ||
        f.description.toLowerCase().includes(q.toLowerCase())
    );

    return NextResponse.json({
      scriptures,
      verses,
      temples,
      deities,
      festivals
    });
  } catch (e) {
    console.error("Search API execution failed:", e);
    return NextResponse.json({ error: "Failed to perform database search" }, { status: 500 });
  }
}
