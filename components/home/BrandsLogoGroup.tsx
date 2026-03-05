const brands = [
  { name: "Byredo", type: "Nicho" },
  { name: "Le Labo", type: "Nicho" },
  { name: "Creed", type: "Nicho" },
  { name: "Frédéric Malle", type: "Nicho" },
  { name: "Dior", type: "Diseñador" },
  { name: "Tom Ford", type: "Diseñador" },
  { name: "Chanel", type: "Diseñador" },
  { name: "Hermès", type: "Diseñador" },
  { name: "Ajmal", type: "Árabe" },
  { name: "Swiss Arabian", type: "Árabe" },
  { name: "Lattafa", type: "Árabe" },
  { name: "Amouage", type: "Árabe" },
];

const typeStyles: Record<string, string> = {
  Nicho: "text-ink",
  Diseñador: "text-stone",
  Árabe: "text-gold",
};

const dotStyles: Record<string, string> = {
  Nicho: "bg-ink",
  Diseñador: "bg-stone",
  Árabe: "bg-gold",
};

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
          {Object.entries(typeStyles).map(([type]) => (
            <div key={type} className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full inline-block ${dotStyles[type]}`}
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
              className="flex flex-col items-center gap-2 px-8 py-6 border-r border-b border-mist min-w-[140px] hover:bg-mist transition-colors duration-200 cursor-pointer"
            >
              {/* Initial as logo placeholder */}
              <span
                className={`font-display text-[1.8rem] font-light ${typeStyles[brand.type]}`}
              >
                {brand.name.charAt(0)}
              </span>
              <span className="font-display text-base font-normal text-ink text-center whitespace-nowrap">
                {brand.name}
              </span>
              <span
                className={`text-[0.55rem] font-medium tracking-[0.2em] uppercase ${typeStyles[brand.type]}`}
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
