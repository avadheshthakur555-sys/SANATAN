import React from "react";
import { prisma } from "@/lib/db";
import TemplesClient from "@/components/temple/TemplesClient";

export const metadata = {
  title: "Sacred Atlas | Interactive Pilgrimage Map of Bharatvarsha",
  description: "Embark on a virtual pilgrimage across the cosmic lines of Bharat. Map, inspect, and experience the 12 Jyotirlingas, Char Dham, Shakti Peethas, and Divya Desams.",
};

// Enable ISR (Incremental Static Regeneration) to statically build the page at build time
export const revalidate = 86400; // Revalidate daily

export default async function TemplesPage() {
  // Fetch all places directly from SQLite at build time
  const places = await prisma.sacredPlace.findMany();

  // Ensure serialization safety for client component
  const serializedPlaces = places.map(p => ({
    ...p,
    historicalEra: p.historicalEra || null,
    architecture: p.architecture || null,
  }));

  return <TemplesClient initialPlaces={serializedPlaces} />;
}
