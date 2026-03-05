"use client";

import { useState } from "react";
import { Perfume, PerfumeSize } from "@/types";
import StarRating from "@/components/ui/StarRating";

const familyDotColor: Record<string, string> = {
  Floral: "bg-[#E8B4B8]",
  Oriental: "bg-[#C4954A]",
  Amaderado: "bg-[#8B6914]",
  Fresco: "bg-[#7AB3C8]",
  Cítrico: "bg-[#D4A843]",
  Gourmand: "bg-[#C4784A]",
  Acuático: "bg-[#6BA8B4]",
  Especiado: "bg-[#B4674A]",
};

interface Props {
  perfume: Perfume;
  onOpenDrawer: (perfume: Perfume) => void;
}

export default function ProductCard({ perfume, onOpenDrawer }: Props) {
  const [selectedSize, setSelectedSize] = useState<PerfumeSize>(
    perfume.sizes[0],
  );
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpenDrawer(perfume)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-mist aspect-[3/4] mb-5">
        <img
          src={perfume.imageUrl}
          alt={perfume.imageAlt}
          className={`w-full h-full object-cover transition-transform duration-600 ease-silk ${hovered ? "scale-105" : "scale-100"}`}
        />

        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white px-3 py-1 text-[0.6rem] font-medium tracking-[0.12em] uppercase text-ink">
          {perfume.category}
        </span>

        {/* Add to cart — slides up on hover */}
        <button
          className={`
            absolute bottom-0 left-0 right-0 bg-ink text-white py-4
            text-[0.65rem] font-medium tracking-[0.15em] uppercase font-body
            transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]
            ${hovered ? "translate-y-0" : "translate-y-full"}
          `}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Añadir al carrito
        </button>
      </div>

      {/* Info */}
      <div>
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={perfume.rating} size={11} />
          <span className="text-[0.7rem] text-stone">
            ({perfume.reviewCount})
          </span>
        </div>

        {/* Brand */}
        <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone mb-1">
          {perfume.brand}
        </p>

        {/* Name */}
        <h3 className="font-display text-xl font-normal leading-tight mb-2">
          {perfume.name}
        </h3>

        {/* Olfactive family */}
        <div className="flex items-center gap-1.5 mb-3">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${familyDotColor[perfume.olfactiveFamily] ?? "bg-stone"}`}
          />
          <span className="text-[0.75rem] text-stone">
            {perfume.olfactiveFamily}
          </span>
        </div>

        {/* Sizes + price */}
        <div className="flex justify-between items-end">
          <div className="flex gap-1.5 flex-wrap">
            {perfume.sizes.map((size) => (
              <button
                key={size.ml}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                disabled={!size.inStock}
                className={`
                  px-2 py-1 text-[0.65rem] font-medium font-body border transition-all duration-200
                  ${
                    selectedSize.ml === size.ml
                      ? "border-ink bg-ink text-white"
                      : "border-mist bg-transparent text-stone"
                  }
                  ${!size.inStock ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                {size.ml}ml
              </button>
            ))}
          </div>
          <p className="font-display text-lg font-normal">
            ${selectedSize.price}
          </p>
        </div>
      </div>
    </article>
  );
}
