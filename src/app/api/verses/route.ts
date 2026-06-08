import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const scriptureId = searchParams.get("scriptureId");
  const chapterId = searchParams.get("chapterId");

  if (!scriptureId || !chapterId) {
    return NextResponse.json(
      { error: "Missing scriptureId or chapterId parameters" },
      { status: 400 }
    );
  }

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  try {
    const total = await prisma.verse.count({
      where: { scriptureId, chapterId },
    });

    const rawVerses = await prisma.verse.findMany({
      where: { scriptureId, chapterId },
      skip,
      take: limit,
    });

    // Sort verses numerically to ensure consistent ordering
    const verses = [...rawVerses].sort((a, b) => {
      const numA = parseInt(a.verseNumber.replace(/\D/g, "")) || 0;
      const numB = parseInt(b.verseNumber.replace(/\D/g, "")) || 0;
      return numA - numB;
    });

    return NextResponse.json({
      verses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (e) {
    console.error("API Verses fetch failed:", e);
    return NextResponse.json(
      { error: "Failed to retrieve verses from database" },
      { status: 500 }
    );
  }
}
