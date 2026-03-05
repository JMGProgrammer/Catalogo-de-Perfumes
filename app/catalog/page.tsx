"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import ProductGrid from "@/components/catalog/ProductGrid";
import ProductDrawer from "@/components/product/ProductDrawer";
import { perfumes } from "@/data/perfumes";
import { FilterState, Perfume, PerfumeCategory } from "@/types";

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
  const categoryParam = searchParams.get("category") as PerfumeCategory | null;

  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    categories: categoryParam ? [categoryParam] : [],
  });
  const [sort, setSort] = useState<SortOption>("relevance");
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  const filtered = useMemo(() => {
    let result = [...perfumes];

    if (filters.categories.length)
      result = result.filter((p) => filters.categories.includes(p.category));
    if (filters.brands.length)
      result = result.filter((p) => filters.brands.includes(p.brand));
    if (filters.genders.length)
      result = result.filter((p) => filters.genders.includes(p.gender));
    if (filters.concentrations.length)
      result = result.filter((p) =>
        filters.concentrations.includes(p.concentration),
      );
    if (filters.olfactiveFamilies.length)
      result = result.filter((p) =>
        filters.olfactiveFamilies.includes(p.olfactiveFamily),
      );

    result = result.filter((p) => {
      const min = Math.min(...p.sizes.map((s) => s.price));
      return min >= filters.priceRange[0] && min <= filters.priceRange[1];
    });

    switch (sort) {
      case "price-asc":
        result.sort(
          (a, b) =>
            Math.min(...a.sizes.map((s) => s.price)) -
            Math.min(...b.sizes.map((s) => s.price)),
        );
        break;
      case "price-desc":
        result.sort(
          (a, b) =>
            Math.min(...b.sizes.map((s) => s.price)) -
            Math.min(...a.sizes.map((s) => s.price)),
        );
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        result.sort((a, b) => b.year - a.year);
        break;
    }

    return result;
  }, [filters, sort]);

  return (
    <>
      <Navbar />

      <main className="pt-[72px] min-h-screen">
        {/* Page header */}
        <div className="px-6 md:px-20 pt-12 pb-8 border-b border-mist">
          <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-2">
            {filtered.length} fragancias
          </p>
          <div className="flex justify-between items-end">
            <h1 className="font-display text-[clamp(1.8rem,3vw,3rem)] font-normal">
              {filters.categories.length === 1
                ? `Perfumes ${filters.categories[0]}`
                : "Todo el catálogo"}
            </h1>

            {/* Sort */}
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
            onClear={() => setFilters(defaultFilters)}
          />
          <ProductGrid perfumes={filtered} onOpenDrawer={setSelectedPerfume} />
        </div>
      </main>

      <Footer />
      <ProductDrawer
        perfume={selectedPerfume}
        onClose={() => setSelectedPerfume(null)}
      />
    </>
  );
}
