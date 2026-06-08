import { NextRequest, NextResponse } from "next/server";
import { generateGuruResponse } from "@/lib/rag-pipeline";

export async function POST(req: NextRequest) {
  try {
    const { query, mode } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query is required and must be a string." },
        { status: 400 }
      );
    }

    const response = await generateGuruResponse(query, mode || "Scholar");
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in AI Guru API:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
