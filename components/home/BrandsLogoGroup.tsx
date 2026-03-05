"use client";

import { useState } from "react";

const brands = [
  { name: "Byredo", domain: "byredo.com", type: "Nicho" },
  { name: "Le Labo", domain: "lelabofragrances.com", type: "Nicho" },
  { name: "Creed", domain: "creedperfume.com", type: "Nicho" },
  { name: "Frédéric Malle", domain: "fredericmalle.com", type: "Nicho" },
  { name: "Dior", domain: "dior.com", type: "Diseñador" },
  { name: "Tom Ford", domain: "tomford.com", type: "Diseñador" },
  { name: "Chanel", domain: "chanel.com", type: "Diseñador" },
  { name: "Hermès", domain: "hermes.com", type: "Diseñador" },
  { name: "Ajmal", domain: "ajmalperfume.com", type: "Árabe" },
  { name: "Swiss Arabian", domain: "swissarabian.com", type: "Árabe" },
  { name: "Lattafa", domain: "lattafa.ae", type: "Árabe" },
  { name: "Amouage", domain: "amouage.com", type: "Árabe" },
];

const typeColor: Record<string, string> = {
  Nicho: "text-ink",
  Diseñador: "text-stone",
  Árabe: "text-gold",
};

const dotColor: Record<string, string> = {
  Nicho: "bg-ink",
  Diseñador: "bg-stone",
  Árabe: "bg-gold",
};

function BrandLogo({ domain, name }: { domain: string; name: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <span className="font-display text-3xl font-light text-stone">
        {name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={`${name} logo`}
      className="h-8 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
      onError={() => setError(true)}
    />
  );
}

export default function BrandsLogoGroup() {
  return (
    <section className="px-6 md:px-20 py-20 border-t border-b border-mist bg-white">
      <div className="max-w-site mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone mb-3">
            Nuestras marcas
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,3rem)] font-normal">
            Las mejores casas del mundo
          </h2>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-10 mb-12">
          {Object.entries(typeColor).map(([type]) => (
            <div key={type} className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full inline-block ${dotColor[type]}`}
              />
              <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone">
                {type}
              </span>
            </div>
          ))}
        </div>

        {/* Brand grid */}
        <div className="flex flex-wrap justify-center">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group flex flex-col items-center gap-3 px-8 py-6 border-r border-b border-mist min-w-[150px] hover:bg-mist transition-colors duration-200 cursor-pointer"
            >
              <div className="h-10 flex items-center justify-center">
                <BrandLogo domain={brand.domain} name={brand.name} />
              </div>
              <span className="font-display text-sm font-normal text-ink text-center whitespace-nowrap">
                {brand.name}
              </span>
              <span
                className={`text-[0.55rem] font-medium tracking-[0.2em] uppercase ${typeColor[brand.type]}`}
              >
                {brand.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
