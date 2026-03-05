"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import ProductGrid from "@/components/catalog/ProductGrid";
import ProductDrawer from "@/components/product/ProductDrawer";
import { supabase } from "@/lib/supabase";
import { FilterState } from "@/types";

// Tipo local que refleja exactamente lo que devuelve Supabase (snake_case)
interface SupaPerfume {
  id: string;
  name: string;
  brand: string;
  category: string;
  olfactive_family: string;
  concentration: string;
  gender: string;
  description: string;
  top_notes: string[];
  heart_notes: string[];
  base_notes: string[];
  ingredients: string[];
  perfumer: string;
  year: number;
  image_url: string;
  featured: boolean;
  trending: boolean;
  sizes: { ml: number; price: number; inStock: boolean }[];
  rating: number;
  review_count: number;
  created_at: string;
}

const defaultFilters: FilterState = {
  categories: [],
  brands: [],
  genders: [],
  concentrations: [],
  olfactiveFamilies: [],
  priceRange: [0, 1000],
  ingredients: [],
};

type SortOption = "relevance" | "price-asc" | "price-desc" | "rating" | "new";

export default function CatalogPage() {
  const searchParams = useSearchParams();

  const [allPerfumes, setAllPerfumes] = useState<SupaPerfume[]>([]);
  const [filtered, setFiltered] = useState<SupaPerfume[]>([]);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("relevance");
  const [selectedPerfume, setSelectedPerfume] = useState<SupaPerfume | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  // 1 — Fetch from Supabase once
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("perfumes")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setAllPerfumes(data as SupaPerfume[]);
      setLoading(false);
    };
    fetch();
  }, []);

  // 2 — Re-apply filters when URL changes
  useEffect(() => {
    const cat = searchParams.get("category");
    setFilters({ ...defaultFilters, categories: cat ? [cat] : [] });
  }, [searchParams]);

  // 3 — Filter + sort whenever data or filters change
  const applyFilters = useCallback(() => {
    let result = [...allPerfumes];

    if (filters.categories.length > 0)
      result = result.filter((p) => filters.categories.includes(p.category));

    if (filters.brands.length > 0)
      result = result.filter((p) => filters.brands.includes(p.brand));

    if (filters.genders.length > 0)
      result = result.filter((p) => filters.genders.includes(p.gender));

    if (filters.concentrations.length > 0)
      result = result.filter((p) =>
        filters.concentrations.includes(p.concentration),
      );

    if (filters.olfactiveFamilies.length > 0)
      result = result.filter((p) =>
        filters.olfactiveFamilies.includes(p.olfactive_family),
      );

    result = result.filter((p) => {
      if (!p.sizes || p.sizes.length === 0) return true;
      const minPrice = Math.min(...p.sizes.map((s) => s.price));
      return (
        minPrice >= filters.priceRange[0] && minPrice <= filters.priceRange[1]
      );
    });

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => {
          const aMin = a.sizes?.length
            ? Math.min(...a.sizes.map((s) => s.price))
            : 0;
          const bMin = b.sizes?.length
            ? Math.min(...b.sizes.map((s) => s.price))
            : 0;
          return aMin - bMin;
        });
        break;
      case "price-desc":
        result.sort((a, b) => {
          const aMin = a.sizes?.length
            ? Math.min(...a.sizes.map((s) => s.price))
            : 0;
          const bMin = b.sizes?.length
            ? Math.min(...b.sizes.map((s) => s.price))
            : 0;
          return bMin - aMin;
        });
        break;
      case "rating":
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "new":
        result.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
        break;
    }

    setFiltered(result);
  }, [allPerfumes, filters, sort]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const categoryLabel =
    filters.categories.length === 1
      ? `Perfumes ${filters.categories[0]}`
      : "Todo el catálogo";

  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen">
        {/* Header */}
        <div className="px-6 md:px-20 pt-12 pb-8 border-b border-mist">
          <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-2">
            {loading ? "Cargando..." : `${filtered.length} fragancias`}
          </p>
          <div className="flex justify-between items-end">
            <h1 className="font-display text-[clamp(1.8rem,3vw,3rem)] font-normal">
              {categoryLabel}
            </h1>
            <div className="flex items-center gap-3">
              <span className="hidden md:block text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone">
                Ordenar
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="px-3 py-2 border border-mist bg-white text-sm text-ink font-body cursor-pointer outline-none"
              >
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="rating">Mejor valorados</option>
                <option value="new">Más recientes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-12 px-6 md:px-20 py-12 max-w-site mx-auto">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onClear={() => setFilters({ ...defaultFilters })}
          />
          {loading ? (
            <div className="flex-1 flex items-center justify-center py-24">
              <p className="font-display text-2xl font-light text-stone">
                Cargando fragancias...
              </p>
            </div>
          ) : (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <ProductGrid
              perfumes={filtered as any}
              onOpenDrawer={(p) =>
                setSelectedPerfume(p as unknown as SupaPerfume)
              }
            />
          )}
        </div>
      </main>
      <Footer />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <ProductDrawer
        perfume={selectedPerfume as any}
        onClose={() => setSelectedPerfume(null)}
      />
    </>
  );
}
