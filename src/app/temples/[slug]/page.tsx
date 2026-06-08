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
    title: place ? `${place.name} — Sacred Pilgrimage Experience` : "Temple Not Found",
    description: place?.description || "Experience the local temple atlas, download guides, plan routes, and view schedules.",
  };
}

export default async function TempleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  const place = await prisma.sacredPlace.findUnique({
    where: {
      slug
    }
  });

  if (!place) {
    notFound();
  }

  const allPlaces = await prisma.sacredPlace.findMany();

  return <TempleDetailClient place={place} allPlaces={allPlaces} />;
}
