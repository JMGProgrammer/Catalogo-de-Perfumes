"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { olfactiveFamilies } from "@/data/olfactiveFamilies";

export default function GuidePage() {
  const [selected, setSelected] = useState(olfactiveFamilies[0]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-[72px] bg-white">
        {/* Header */}
        <div className="px-6 md:px-20 pt-16 pb-12 border-b border-mist">
          <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-3">
            El ABC del olfato
          </p>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-light text-ink leading-tight">
              Guía olfativa
            </h1>
            <p className="text-sm text-stone leading-relaxed max-w-md">
              Las familias olfativas son el mapa con el que los perfumistas
              organizan el mundo de las fragancias. Aprendé a leerlo y elegir tu
              próximo perfume con más criterio.
            </p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left: family list */}
          <nav className="lg:w-[320px] shrink-0 border-r border-mist">
            {olfactiveFamilies.map((family) => (
              <button
                key={family.id}
                onClick={() => setSelected(family)}
                className={`
                  w-full flex items-center gap-4 px-8 py-5 text-left border-b border-mist
                  transition-all duration-200 group cursor-pointer
                  ${selected.id === family.id ? "bg-mist" : "hover:bg-mist/50"}
                `}
              >
                {/* Color dot */}
                <span
                  className="w-3 h-3 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-125"
                  style={{ background: family.color }}
                />

                <div className="flex-1 min-w-0">
                  <p
                    className={`font-display text-lg font-normal transition-colors duration-200 ${selected.id === family.id ? "text-ink" : "text-stone group-hover:text-ink"}`}
                  >
                    {family.name}
                  </p>
                  <p className="text-[0.65rem] text-stone/70 truncate">
                    {family.character}
                  </p>
                </div>

                {/* Intensity dots */}
                <div className="flex gap-0.5 shrink-0">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background:
                          n <= family.intensity ? family.color : "#E8E6E1",
                      }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </nav>

          {/* Right: detail panel */}
          <div
            key={selected.id}
            className="flex-1 p-8 md:p-16"
            style={{ background: selected.bgColor }}
          >
            {/* Family name */}
            <div className="flex items-center gap-4 mb-8">
              <span
                className="w-5 h-5 rounded-full shrink-0"
                style={{ background: selected.color }}
              />
              <h2 className="font-display text-[clamp(2rem,4vw,4rem)] font-light text-ink leading-none">
                {selected.name}
              </h2>
            </div>

            {/* Character tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {selected.character.split(", ").map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 text-[0.65rem] font-medium tracking-[0.12em] uppercase border"
                  style={{
                    borderColor: selected.color + "40",
                    color: selected.color,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-base text-stone leading-relaxed mb-10 max-w-2xl">
              {selected.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Key ingredients */}
              <div>
                <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-ink mb-3">
                  Ingredientes clave
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.keyIngredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-2.5 py-1 bg-white/70 border border-mist text-sm text-ink"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Subfamilies */}
              <div>
                <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-ink mb-3">
                  Subfamilias
                </p>
                <ul className="space-y-1.5">
                  {selected.subFamilies.map((sf) => (
                    <li
                      key={sf}
                      className="flex items-center gap-2 text-sm text-stone"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: selected.color }}
                      />
                      {sf}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Info pills */}
            <div className="flex flex-wrap gap-6 pt-8 border-t border-mist/60">
              <div>
                <p className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-stone/60 mb-1">
                  Ideal para
                </p>
                <p className="text-sm text-ink">{selected.idealFor}</p>
              </div>
              <div>
                <p className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-stone/60 mb-1">
                  Estación
                </p>
                <p className="text-sm text-ink">
                  {selected.season.join(" · ")}
                </p>
              </div>
              <div>
                <p className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-stone/60 mb-1">
                  Intensidad
                </p>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className="w-4 h-1.5 rounded-full"
                      style={{
                        background:
                          n <= selected.intensity ? selected.color : "#E8E6E1",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Representative perfumes */}
            {selected.representativePerfumes.length > 0 && (
              <div className="mt-8 pt-8 border-t border-mist/60">
                <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-ink mb-3">
                  En nuestra colección
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.representativePerfumes.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1.5 bg-ink text-white text-xs font-medium"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="px-6 md:px-20 py-16 bg-mist text-center">
          <p className="font-display text-[clamp(1.5rem,3vw,3rem)] font-light text-ink mb-4">
            ¿No sabés por dónde empezar?
          </p>
          <p className="text-sm text-stone mb-8 max-w-md mx-auto">
            Explorá el catálogo filtrado por familia olfativa y encontrá tu
            fragancia.
          </p>
          <a href="/catalog">
            <button className="px-10 py-4 bg-ink text-white text-[0.7rem] font-medium tracking-[0.15em] uppercase font-body hover:bg-stone transition-colors duration-300">
              Ir al catálogo
            </button>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
