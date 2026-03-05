"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-svh grid grid-cols-1 md:grid-cols-2 pt-[72px] overflow-hidden">
      {/* Left: Text */}
      <div className="flex flex-col justify-center px-6 md:px-20 py-16 relative z-10">
        <span className="animate-fade-up text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-8">
          Perfumería de autor · 2025
        </span>

        <h1 className="animate-fade-up-2 font-display font-light text-[clamp(3.5rem,8vw,8rem)] leading-[0.95] tracking-[-0.02em] text-ink mb-8">
          La estela
          <br />
          <em className="italic text-stone">que te</em>
          <br />
          define.
        </h1>

        <p className="animate-fade-up-3 text-sm text-stone leading-[1.8] max-w-sm mb-10">
          Nicho, diseñador y árabe. Cada frasco es un manifiesto. Encontrá tu
          firma olfativa entre más de 200 fragancias curadas.
        </p>

        <div className="animate-fade-up-4 flex gap-4 flex-wrap mb-16">
          <Link href="/catalog">
            <button className="px-10 py-4 bg-ink text-white text-[0.7rem] font-medium tracking-[0.15em] uppercase hover:bg-stone transition-colors duration-300 font-body">
              Explorar catálogo
            </button>
          </Link>
          <Link href="/catalog?category=Nicho">
            <button className="px-10 py-4 bg-transparent text-ink text-[0.7rem] font-medium tracking-[0.15em] uppercase border border-mist hover:border-ink transition-colors duration-300 font-body">
              Ver nicho
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="animate-fade-up-5 flex gap-12 pt-8 border-t border-mist">
          {[
            { n: "200+", label: "Fragancias" },
            { n: "40+", label: "Marcas" },
            { n: "12", label: "Familias olfativas" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-[2rem] font-light text-ink leading-none mb-1">
                {stat.n}
              </div>
              <div className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Image */}
      <div className="relative overflow-hidden bg-mist min-h-[50vh] md:min-h-0 group">
        <img
          src="https://images.unsplash.com/photo-1590134872878-d63af70c3248?w=1200&auto=format&fit=crop&q=80"
          alt="Perfume hero"
          className="w-full h-full object-cover transition-transform duration-[8000ms] ease-silk group-hover:scale-105"
        />

        {/* Info card */}
        <div className="animate-fade-up-3 absolute bottom-10 left-10 bg-white/92 backdrop-blur-md p-6 max-w-[280px]">
          <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-2">
            Destacado · Nicho
          </p>
          <p className="font-display text-2xl font-normal mb-1">
            Baccarat Rouge 540
          </p>
          <p className="text-sm text-stone mb-4">Maison Francis Kurkdjian</p>
          <p className="text-sm font-medium">Desde $215</p>
        </div>
      </div>
    </section>
  );
}
