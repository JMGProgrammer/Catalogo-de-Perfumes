"use client";

import { Perfume } from "@/types";
import ProductCard from "./ProductCard";

interface Props {
  perfumes: Perfume[];
  onOpenDrawer: (perfume: Perfume) => void;
}

export default function ProductGrid({ perfumes, onOpenDrawer }: Props) {
  if (perfumes.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-3xl font-light text-stone mb-3">
          Sin resultados
        </p>
        <p className="text-sm text-stone max-w-xs leading-relaxed">
          Ninguna fragancia coincide con los filtros. Intentá ampliar tu
          búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {perfumes.map((perfume) => (
        <ProductCard
          key={perfume.id}
          perfume={perfume}
          onOpenDrawer={onOpenDrawer}
        />
      ))}
    </div>
  );
}
