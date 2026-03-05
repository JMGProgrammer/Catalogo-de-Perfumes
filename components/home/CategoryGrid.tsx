"use client";

import Link from "next/link";

const categories = [
  {
    label: "Nicho",
    sublabel: "Arte olfativo sin compromisos",
    href: "/catalog?category=Nicho",
    image:
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&auto=format&fit=crop",
    count: "80+ fragancias",
  },
  {
    label: "Diseñador",
    sublabel: "Las grandes maisons del lujo",
    href: "/catalog?category=Diseñador",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&auto=format&fit=crop",
    count: "65+ fragancias",
  },
  {
    label: "Árabe",
    sublabel: "El oud, la rosa y el misterio",
    href: "/catalog?category=Árabe",
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&auto=format&fit=crop",
    count: "45+ fragancias",
  },
  {
    label: "Sale",
    sublabel: "Descuentos en selección curada",
    href: "/catalog?category=Sale",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop",
    count: "Hasta −40%",
  },
];

export default function CategoryGrid() {
  return (
    <section className="px-6 md:px-20 py-24">
      <div className="max-w-site mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-3">
              Explorar
            </p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,3rem)] font-normal leading-tight">
              Comprar por categoría
            </h2>
          </div>
          <Link
            href="/catalog"
            className="hidden md:flex items-center gap-2 text-[0.75rem] font-medium tracking-[0.1em] text-stone hover:text-ink transition-colors duration-200"
          >
            Ver todo el catálogo
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid: large left + 3 right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Large card */}
          <CategoryCard category={categories[0]} large />

          {/* Right column */}
          <div className="flex flex-col gap-3">
            {categories.slice(1).map((cat) => (
              <CategoryCard key={cat.label} category={cat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  large = false,
}: {
  category: (typeof categories)[0];
  large?: boolean;
}) {
  return (
    <Link href={category.href} className="block">
      <div
        className={`
          relative overflow-hidden bg-mist cursor-pointer group
          ${large ? "h-[600px]" : "h-[185px]"}
        `}
      >
        <img
          src={category.image}
          alt={category.label}
          className="w-full h-full object-cover transition-transform duration-700 ease-silk group-hover:scale-[1.06]"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-ink/10 opacity-35 group-hover:opacity-50 transition-opacity duration-400" />

        {/* Content */}
        <div
          className={`absolute bottom-0 left-0 right-0 text-white ${large ? "p-10" : "p-5"}`}
        >
          <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-white/60 mb-1">
            {category.count}
          </p>
          <h3
            className={`font-display font-light tracking-[0.05em] mb-1 ${large ? "text-4xl" : "text-2xl"}`}
          >
            {category.label}
          </h3>
          {large && (
            <p className="text-sm text-white/70">{category.sublabel}</p>
          )}
          <div className="flex items-center gap-2 mt-3 text-[0.7rem] font-medium tracking-[0.1em] uppercase text-white/80">
            Explorar
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
