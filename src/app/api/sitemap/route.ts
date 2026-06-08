import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { DEITIES_DATA } from "@/lib/deities-data";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sanatan-katha.org";

    // 1. Static Pages
    const staticPages = [
      "",
      "/graph",
      "/guru",
      "/temples",
      "/deities",
      "/library",
      "/history",
      "/downloads",
      "/rituals",
      "/sages",
      "/jyotirlinga"
    ];

    // 2. Dynamic Scriptures & Chapters
    const scriptures = await prisma.scripture.findMany();
    const chapters = await prisma.chapter.findMany({
      include: {
        scripture: true
      }
    });

    const scripturePages = scriptures.map(s => `/library/${s.slug}`);
    const chapterPages = chapters.map(chap => `/library/${chap.scripture.slug}/chapter/${chap.chapterNumber}`);

    // 3. Dynamic Deities (from static DEITIES_DATA)
    const deitySlugs = Object.keys(DEITIES_DATA);
    const deityPages = deitySlugs.map(slug => `/deities/${slug}`);

    // 4. Dynamic Temples (from Prisma sacredPlace)
    const places = await prisma.sacredPlace.findMany();
    const templePages = places.map(p => `/temples/${p.slug}`);

    // 5. Dynamic Jyotirlingas
    // Only places of type "JYOTIRLINGA" get their own /jyotirlinga/[slug] pages
    const jyotirlingaPages = places
      .filter(p => p.type === "JYOTIRLINGA")
      .map(p => `/jyotirlinga/${p.slug}`);

    // 6. Combined URLs
    const allUrls = [
      ...staticPages,
      ...scripturePages,
      ...chapterPages,
      ...deityPages,
      ...templePages,
      ...jyotirlingaPages
    ];
    
    const currentDate = new Date().toISOString();

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(url => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${url === "" ? "daily" : "weekly"}</changefreq>
    <priority>${url === "" ? "1.0" : url.includes("/library") || url.includes("/deities") || url.includes("/temples") ? "0.8" : "0.5"}</priority>
  </url>`).join("")}
</urlset>`;

    return new NextResponse(sitemapXml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap XML:", error);
    return NextResponse.json(
      { error: "Failed to generate sitemap XML", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
