"use client";

import Link from "next/link";
import { perfumers } from "@/data/perfumers";
import PerfumerCard from "@/components/perfumers/PerfumerCard";

// Solo mostramos 3 en la home
const featured = perfumers.slice(0, 3);

export default function TeamSection() {
  return (
    <section
      className="relative py-28 px-6 md:px-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #111827 0%, #1A2235 50%, #111827 100%)",
      }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
        }}
      />

      {/* Radial glow top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #B8A082 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-site mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-4">
            Los creadores
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-light text-white leading-tight mb-6">
            Maestros del perfume
          </h2>
          <p className="text-sm text-white/50 leading-relaxed max-w-lg mx-auto">
            Detrás de cada fragancia hay una historia, una obsesión, décadas de
            oficio. Conocé a los perfumistas que definen el olfato de nuestra
            época.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {featured.map((perfumer) => (
            <PerfumerCard key={perfumer.id} perfumer={perfumer} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/perfumers">
            <button className="px-10 py-4 border border-white/20 text-white text-[0.7rem] font-medium tracking-[0.15em] uppercase font-body hover:border-gold hover:text-gold transition-all duration-300">
              Ver todos los perfumistas
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
