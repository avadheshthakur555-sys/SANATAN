import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  try {
    const verse = await prisma.verse.findUnique({
      where: { id },
      include: {
        chapter: true,
        scripture: true,
      },
    });

    if (!verse) {
      return NextResponse.json(
        { error: `Verse with ID ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(verse);
  } catch (e) {
    console.error("API Verse fetch ID failed:", e);
    return NextResponse.json(
      { error: "Failed to retrieve verse from database" },
      { status: 500 }
    );
  }
}
