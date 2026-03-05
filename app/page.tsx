"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import TrendingCarousel from "@/components/home/TrendingCarrousel";
import BrandsLogoGroup from "@/components/home/BrandsLogoGroup";
import TeamSection from "@/components/home/TeamSection";
import ProductDrawer from "@/components/product/ProductDrawer";
import { supabase } from "@/lib/supabase";
import { Perfume } from "@/types";

export default function HomePage() {
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [trending, setTrending] = useState<Perfume[]>([]);
  const [featured, setFeatured] = useState<Perfume | null>(null);

  useEffect(() => {
    const fetchPerfumes = async () => {
      // Trending perfumes for carousel
      const { data: trendingData } = await supabase
        .from("perfumes")
        .select("*")
        .eq("trending", true)
        .order("created_at", { ascending: false })
        .limit(10);

      // Featured perfume for hero card
      const { data: featuredData } = await supabase
        .from("perfumes")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (trendingData) setTrending(trendingData as Perfume[]);
      if (featuredData) setFeatured(featuredData as Perfume);
    };
    fetchPerfumes();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero featured={featured} />
        <CategoryGrid />
        {trending.length > 0 && (
          <TrendingCarousel
            perfumes={trending}
            onOpenDrawer={setSelectedPerfume}
          />
        )}
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
