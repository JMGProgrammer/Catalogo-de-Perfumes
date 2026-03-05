"use client";

import { useState, useRef } from "react";
import { Perfume } from "@/types";
import ProductCard from "@/components/catalog/ProductCard";

interface Props {
  perfumes: Perfume[];
  onOpenDrawer: (perfume: Perfume) => void;
}

export default function TrendingCarousel({ perfumes, onOpenDrawer }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const scroll = (dir: "left" | "right") => {
    trackRef.current?.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  const onScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanLeft(scrollLeft > 0);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 4);
  };

  return (
    <section className="py-24 overflow-hidden bg-white">
      {/* Header */}
      <div className="flex justify-between items-end px-6 md:px-20 mb-10">
        <div>
          <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-3">
            Lo más buscado
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,3rem)] font-normal">
            En tendencia
          </h2>
        </div>
        <div className="flex gap-2">
          <NavBtn
            dir="left"
            onClick={() => scroll("left")}
            disabled={!canLeft}
          />
          <NavBtn
            dir="right"
            onClick={() => scroll("right")}
            disabled={!canRight}
          />
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-6 md:px-20 pb-4"
      >
        {perfumes.map((p) => (
          <div key={p.id} className="shrink-0 w-[280px]">
            <ProductCard perfume={p} onOpenDrawer={onOpenDrawer} />
          </div>
        ))}
      </div>
    </section>
  );
}

function NavBtn({
  dir,
  onClick,
  disabled,
}: {
  dir: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-11 h-11 flex items-center justify-center border transition-all duration-200
        ${
          disabled
            ? "border-mist text-mist cursor-not-allowed"
            : "border-ink text-ink hover:bg-ink hover:text-white"
        }
      `}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        {dir === "left" ? (
          <path d="M19 12H5M12 19l-7-7 7-7" />
        ) : (
          <path d="M5 12h14M12 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}
