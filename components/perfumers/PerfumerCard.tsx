"use client";

import { useState } from "react";
import { Perfumer } from "@/data/perfumers";

const typeColor: Record<string, string> = {
  Nicho: "text-ink border-ink",
  Diseñador: "text-stone border-stone",
  Árabe: "text-gold border-gold",
};

export default function PerfumerCard({ perfumer }: { perfumer: Perfumer }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="flex flex-col items-center text-center group">
      {/* Circular photo */}
      <div className="relative mb-6">
        <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-gold/40 transition-all duration-500">
          {!imgError ? (
            <img
              src={perfumer.imageUrl}
              alt={perfumer.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Fallback avatar */
            <div className="w-full h-full bg-white/10 flex items-center justify-center font-display text-5xl font-light text-white/60">
              {perfumer.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Type badge */}
        <span
          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#1A1F2E] border text-[0.55rem] font-medium tracking-[0.15em] uppercase whitespace-nowrap ${typeColor[perfumer.type]}`}
        >
          {perfumer.type}
        </span>
      </div>

      {/* Name */}
      <h3 className="font-display text-xl font-normal text-white mb-1 leading-tight">
        {perfumer.name}
      </h3>

      {/* House + title */}
      <p className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-gold mb-1">
        {perfumer.house}
      </p>
      <p className="text-xs text-white/50 mb-4">
        {perfumer.title} · {perfumer.nationality}
      </p>

      {/* Social icons */}
      <div className="flex gap-3 mb-6">
        {perfumer.twitter && (
          <a
            href={perfumer.twitter}
            className="text-white/40 hover:text-white transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.902-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        )}
        {perfumer.linkedin && (
          <a
            href={perfumer.linkedin}
            className="text-white/40 hover:text-white transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        )}
      </div>

      {/* Notable fragrances */}
      <div className="flex flex-wrap justify-center gap-1.5">
        {perfumer.notableFragrances.map((f) => (
          <span
            key={f}
            className="px-2 py-0.5 bg-white/5 border border-white/10 text-[0.65rem] text-white/60"
          >
            {f}
          </span>
        ))}
      </div>
    </article>
  );
}
