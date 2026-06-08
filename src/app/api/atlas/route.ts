import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    let places;
    if (type) {
      places = await prisma.sacredPlace.findMany({
        where: {
          type: type.toUpperCase()
        }
      });
    } else {
      places = await prisma.sacredPlace.findMany();
    }

    return NextResponse.json(places);
  } catch (error) {
    console.error("Error fetching sacred places:", error);
    return NextResponse.json(
      { error: "Failed to fetch sacred places.", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
