import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import DeityDetailView from "@/components/deities/DeityDetailView";
import { DEITIES_DATA } from "@/lib/deities-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const details = DEITIES_DATA[slug];
  return {
    title: details ? `${details.nameEnglish} — Deities Encyclopaedia` : "Deity Not Found",
    description: details?.role || "Profile details of deity.",
  };
}

export default async function DeityDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const deity = DEITIES_DATA[slug];

  if (!deity) {
    notFound();
  }

  return <DeityDetailView slug={slug} />;
}
