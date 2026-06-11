import React from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/db";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import GoldParticleField from "@/components/effects/GoldParticleField";
import JyotirlingaCatalog from "@/components/temple/JyotirlingaCatalog";

export const metadata: Metadata = {
  title: "12 Jyotirlinga Experience Portal — Sanatan Katha",
  description: "Explore the 12 sacred self-manifested light shrines of Lord Shiva. Access darshan guides, timings, location maps, and scriptural histories.",
};

// Map slugs to traditional ordering index
const TRADITIONAL_ORDER: Record<string, number> = {
  somnath: 1,
  mallikarjuna: 2,
  mahakaleshwar: 3,
  omkareshwar: 4,
  kedarnath: 5,
  bhimashankar: 6,
  "kashi-vishwanath": 7,
  trimbakeshwar: 8,
  vaidyanath: 9,
  nageshwar: 10,
  rameshwaram: 11,
  grishneshwar: 12
};

export default async function JyotirlingaIndexPage() {
  // Query all Jyotirlingas from database
  const places = await prisma.sacredPlace.findMany({
    where: {
      type: "JYOTIRLINGA"
    }
  });

  // Sort by traditional Dwadasha Jyotirlinga Stotram order
  const sortedPlaces = [...places].sort((a, b) => {
    const orderA = TRADITIONAL_ORDER[a.slug] || 99;
    const orderB = TRADITIONAL_ORDER[b.slug] || 99;
    return orderA - orderB;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#030204] text-[#F5F0E8] select-text relative overflow-x-hidden">

      {/* Universal Breadcrumb */}
      <Breadcrumb items={[{ label: "Temples", href: "/temples" }, { label: "12 Jyotirlingas" }]} />

      {/* Gold particle overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <GoldParticleField />
      </div>

      {/* Cinematic Hero */}
      <section className="relative w-full pb-20 pt-8 flex flex-col items-center justify-center border-b border-[#D4A01720] hero-cosmic text-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,20,10,0.15)_0%,transparent_70%)] pointer-events-none" />
        
        <span className="font-sanskrit text-4xl text-[#FFD700] font-bold tracking-widest drop-shadow-md mb-2">
          द्वादश ज्योतिर्लिङ्गानि
        </span>
        <h1 className="text-4xl md:text-6xl text-white font-serif font-bold uppercase tracking-wider">
          The 12 Jyotirlingas
        </h1>
        <div className="w-24 h-[1px] bg-[#D4A017] my-4"></div>
        <p className="text-sm md:text-base text-[#9CA3AF] max-w-2xl leading-relaxed">
          Embark on a sacred journey through the twelve manifestations of Lord Shiva as infinite columns of light. Delve into pilgrimage guides, routes, live aarti timetables, and cosmic chronicles.
        </p>
      </section>

      {/* Main Interactive Grid & Filter Catalog */}
      <main className="flex-grow max-w-6xl mx-auto px-4 w-full py-12 relative z-20">
        <JyotirlingaCatalog initialPlaces={sortedPlaces.map(p => ({
          ...p,
          order: TRADITIONAL_ORDER[p.slug] || 0
        }))} />
      </main>

      <Footer />
    </div>
  );
}
