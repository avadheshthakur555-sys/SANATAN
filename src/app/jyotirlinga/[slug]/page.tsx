import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import TempleDetailClient from "@/components/temple/TempleDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const place = await prisma.sacredPlace.findUnique({
    where: { slug }
  });
  return {
    title: place ? `${place.name} — 12 Jyotirlinga Experience` : "Jyotirlinga Temple Not Found",
    description: place?.description || "Experience the local temple atlas, download guides, plan routes, and view schedules.",
  };
}

export default async function JyotirlingaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  const place = await prisma.sacredPlace.findUnique({
    where: {
      slug
    }
  });

  // Verify place exists and is indeed a Jyotirlinga
  if (!place || place.type !== "JYOTIRLINGA") {
    notFound();
  }

  const allPlaces = await prisma.sacredPlace.findMany();

  return <TempleDetailClient place={place} allPlaces={allPlaces} />;
}
