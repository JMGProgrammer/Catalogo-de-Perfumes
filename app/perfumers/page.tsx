"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PerfumerCard from "@/components/perfumers/PerfumerCard";
import { perfumers } from "@/data/perfumers";

type Filter = "Todos" | "Nicho" | "Diseñador" | "Árabe";

export default function PerfumersPage() {
  const [active, setActive] = useState<Filter>("Todos");

  const filtered =
    active === "Todos" ? perfumers : perfumers.filter((p) => p.type === active);

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen pt-[72px]"
        style={{
          background: "linear-gradient(180deg, #111827 0%, #0A0A0A 100%)",
        }}
      >
        {/* Hero header */}
        <div className="relative px-6 md:px-20 pt-20 pb-16 text-center overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10 pointer-events-none rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, #B8A082 0%, transparent 70%)",
            }}
          />
          <p className="relative text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-4">
            Los creadores
          </p>
          <h1 className="relative font-display text-[clamp(2.5rem,6vw,6rem)] font-light text-white leading-tight mb-6">
            Maestros del perfume
          </h1>
          <p className="relative text-sm text-white/50 leading-relaxed max-w-xl mx-auto">
            Cada fragancia de nuestra colección lleva la firma de un maestro.
            Explorá sus historias, filosofías y obras más representativas.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 px-6 mb-16 flex-wrap">
          {(["Todos", "Nicho", "Diseñador", "Árabe"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`
                px-6 py-2.5 text-[0.7rem] font-medium tracking-[0.12em] uppercase font-body
                border transition-all duration-200
                ${
                  active === f
                    ? "border-gold text-gold bg-gold/10"
                    : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="px-6 md:px-20 pb-24 max-w-site mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
            {filtered.map((perfumer) => (
              <PerfumerCard key={perfumer.id} perfumer={perfumer} />
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="border-t border-white/8 px-6 md:px-20 py-20 text-center">
          <blockquote className="font-display text-[clamp(1.5rem,3vw,3rem)] font-light text-white/70 italic max-w-3xl mx-auto leading-relaxed">
            "El perfumista es el único artista que trabaja con recuerdos que
            todavía no existen."
          </blockquote>
          <p className="mt-6 text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold">
            — Francis Kurkdjian
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
