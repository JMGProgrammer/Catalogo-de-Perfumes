"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import TrendingCarousel from "@/components/home/TrendingCarrousel";
import BrandsLogoGroup from "@/components/home/BrandsLogoGroup";
import TeamSection from "@/components/home/TeamSection";
import ProductDrawer from "@/components/product/ProductDrawer";
import { trendingPerfumes } from "@/data/perfumes";
import { Perfume } from "@/types";

export default function HomePage() {
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <TrendingCarousel
          perfumes={trendingPerfumes}
          onOpenDrawer={setSelectedPerfume}
        />
        <BrandsLogoGroup />
        <TeamSection />
      </main>
      <Footer />
      <ProductDrawer
        perfume={selectedPerfume}
        onClose={() => setSelectedPerfume(null)}
      />
    </>
  );
}
