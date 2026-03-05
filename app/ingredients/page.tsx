"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ingredients } from "@/data/ingredients";

const rarityColor: Record<string, string> = {
  Común: "text-stone border-stone/40",
  Exclusivo: "text-gold border-gold/40",
  Rarísimo: "text-[#C4954A] border-[#C4954A]/40",
};

const rarityBg: Record<string, string> = {
  Común: "bg-stone/5",
  Exclusivo: "bg-gold/5",
  Rarísimo: "bg-[#C4954A]/10",
};

type FamilyFilter = "Todos" | "Amaderado" | "Floral" | "Oriental" | "Cítrico";

export default function IngredientsPage() {
  const [active, setActive] = useState<FamilyFilter>("Todos");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    active === "Todos"
      ? ingredients
      : ingredients.filter((i) => i.family === active);

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-[72px] bg-white">
        {/* Header */}
        <div className="px-6 md:px-20 pt-16 pb-12 border-b border-mist">
          <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-3">
            La materia prima
          </p>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-light text-ink leading-tight">
              Ingredientes
            </h1>
            <p className="text-sm text-stone leading-relaxed max-w-md">
              Los ingredientes son el vocabulario del perfumista. Cada uno tiene
              una historia, un origen y un alma. Acá están los más importantes
              de nuestra colección.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 px-6 md:px-20 py-6 border-b border-mist flex-wrap">
          {(
            [
              "Todos",
              "Amaderado",
              "Floral",
              "Oriental",
              "Cítrico",
            ] as FamilyFilter[]
          ).map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`
                px-5 py-2 text-[0.7rem] font-medium tracking-[0.12em] uppercase font-body
                border transition-all duration-200
                ${
                  active === f
                    ? "border-ink bg-ink text-white"
                    : "border-mist text-stone hover:border-ink hover:text-ink"
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Ingredient list */}
        <div className="max-w-site mx-auto px-6 md:px-20 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((ingredient) => {
              const isOpen = expanded === ingredient.id;
              return (
                <article
                  key={ingredient.id}
                  className="border border-mist hover:border-ink/20 transition-colors duration-200 overflow-hidden"
                >
                  {/* Card header — always visible */}
                  <button
                    className="w-full flex gap-5 p-6 text-left cursor-pointer"
                    onClick={() => setExpanded(isOpen ? null : ingredient.id)}
                  >
                    {/* Image */}
                    <div className="w-20 h-20 shrink-0 overflow-hidden bg-mist">
                      <img
                        src={ingredient.imageUrl}
                        alt={ingredient.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h2 className="font-display text-2xl font-normal leading-tight">
                          {ingredient.name}
                        </h2>
                        <span
                          className={`shrink-0 px-2 py-0.5 border text-[0.55rem] font-medium tracking-[0.12em] uppercase ${rarityColor[ingredient.rarity]} ${rarityBg[ingredient.rarity]}`}
                        >
                          {ingredient.rarity}
                        </span>
                      </div>
                      <p className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-gold mb-1">
                        {ingredient.family}
                      </p>
                      <p className="text-xs text-stone">
                        Origen: {ingredient.origin}
                      </p>
                    </div>

                    {/* Chevron */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className={`shrink-0 text-stone mt-1 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {/* Expanded content */}
                  <div
                    className={`overflow-hidden transition-all duration-400 ${isOpen ? "max-h-[600px]" : "max-h-0"}`}
                  >
                    <div className="px-6 pb-6 border-t border-mist pt-5 space-y-4">
                      <p className="text-sm text-stone leading-relaxed">
                        {ingredient.description}
                      </p>

                      <div>
                        <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-ink mb-2">
                          Perfil olfativo
                        </p>
                        <p className="text-sm text-stone italic">
                          {ingredient.olfactiveProfile}
                        </p>
                      </div>

                      <div className="bg-gold/5 border border-gold/20 p-4">
                        <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-2">
                          ¿Sabías que...?
                        </p>
                        <p className="text-sm text-stone leading-relaxed">
                          {ingredient.funFact}
                        </p>
                      </div>

                      <div>
                        <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-ink mb-2">
                          Presente en
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {ingredient.usedIn.map((f) => (
                            <span
                              key={f}
                              className="px-2 py-0.5 bg-mist text-xs text-ink"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
