"use client";

import { useState, useEffect } from "react";
import { Perfume, PerfumeSize } from "@/types";
import StarRating from "@/components/ui/StarRating";

interface Props {
  perfume: Perfume | null;
  onClose: () => void;
}

type Section = "notas" | "ingredientes" | "perfumista" | null;

export default function ProductDrawer({ perfume, onClose }: Props) {
  const [selectedSize, setSelectedSize] = useState<PerfumeSize | null>(null);
  const [expanded, setExpanded] = useState<Section>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (perfume) {
      setSelectedSize(perfume.sizes[0]);
      setExpanded(null);
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [perfume]);

  if (!perfume) return null;

  const toggle = (s: Section) => setExpanded((prev) => (prev === s ? null : s));

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-ink/40 z-[200] transition-opacity duration-400 ${visible ? "opacity-100" : "opacity-0"}`}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 right-0 bottom-0 z-[201]
          w-full max-w-[520px] bg-white overflow-y-auto flex flex-col
          transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${visible ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Sticky header */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-8 py-5 border-b border-mist">
          <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone">
            Detalle del producto
          </p>
          <button
            onClick={onClose}
            className="text-ink/70 hover:text-ink transition-colors p-1"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-8 py-8">
          {/* Image */}
          <div className="bg-mist aspect-[4/3] mb-8 overflow-hidden">
            <img
              src={perfume.imageUrl}
              alt={perfume.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Brand + category */}
          <div className="flex justify-between items-center mb-2">
            <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone">
              {perfume.brand}
            </p>
            <span className="text-[0.6rem] font-medium tracking-[0.12em] uppercase px-2 py-1 border border-mist text-stone">
              {perfume.category}
            </span>
          </div>

          {/* Name */}
          <h2 className="font-display text-[2rem] font-normal leading-tight mb-3">
            {perfume.name}
          </h2>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-5">
            <StarRating rating={perfume.rating} />
            <span className="text-sm text-stone">
              {perfume.rating} · {perfume.reviewCount} reseñas
            </span>
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap mb-6">
            {[
              perfume.olfactiveFamily,
              perfume.concentration,
              perfume.gender,
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-mist text-[0.7rem] text-stone"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-[0.88rem] text-stone leading-[1.75] mb-8">
            {perfume.description}
          </p>

          {/* Size selector */}
          <div className="mb-6">
            <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone mb-3">
              Tamaño
            </p>
            <div className="flex gap-2 flex-wrap">
              {perfume.sizes.map((size) => (
                <button
                  key={size.ml}
                  onClick={() => setSelectedSize(size)}
                  disabled={!size.inStock}
                  className={`
                    px-5 py-2.5 text-sm font-medium font-body border transition-all duration-200
                    ${selectedSize?.ml === size.ml ? "border-ink bg-ink text-white" : "border-mist text-ink"}
                    ${!size.inStock ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
                  `}
                >
                  <span className="block">{size.ml}ml</span>
                  <span className="block text-[0.65rem] font-normal opacity-70">
                    ${size.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <div className="flex gap-3 mb-10">
            <button className="flex-1 py-4 bg-ink text-white text-[0.7rem] font-medium tracking-[0.15em] uppercase font-body hover:bg-stone transition-colors duration-200">
              Añadir al carrito · ${selectedSize?.price}
            </button>
            <button className="px-4 border border-mist text-ink hover:border-ink transition-colors duration-200">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Accordion */}
          <Accordion
            id="notas"
            label="Notas olfativas"
            expanded={expanded}
            onToggle={toggle}
          >
            <NoteGroup title="Notas de cabeza" notes={perfume.topNotes} />
            <NoteGroup title="Notas de corazón" notes={perfume.heartNotes} />
            <NoteGroup title="Notas de fondo" notes={perfume.baseNotes} />
          </Accordion>

          <Accordion
            id="ingredientes"
            label="Ingredientes principales"
            expanded={expanded}
            onToggle={toggle}
          >
            <div className="flex flex-wrap gap-1.5">
              {perfume.ingredients.map((ing) => (
                <span key={ing} className="px-3 py-1 bg-mist text-sm text-ink">
                  {ing}
                </span>
              ))}
            </div>
          </Accordion>

          <Accordion
            id="perfumista"
            label="El perfumista"
            expanded={expanded}
            onToggle={toggle}
          >
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-mist rounded-full flex items-center justify-center font-display text-xl text-stone shrink-0">
                {perfume.perfumer.charAt(0)}
              </div>
              <div>
                <p className="font-display text-base font-normal mb-1">
                  {perfume.perfumer}
                </p>
                <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone mb-2">
                  {perfume.brand} · {perfume.year}
                </p>
                <p className="text-[0.82rem] text-stone leading-relaxed">
                  Lanzado en {perfume.year}, esta fragancia representa la visión
                  creativa de {perfume.perfumer} para la casa {perfume.brand}.
                </p>
              </div>
            </div>
          </Accordion>
        </div>
      </aside>
    </>
  );
}

function Accordion({
  id,
  label,
  expanded,
  onToggle,
  children,
}: {
  id: Section;
  label: string;
  expanded: Section;
  onToggle: (s: Section) => void;
  children: React.ReactNode;
}) {
  const isOpen = expanded === id;
  return (
    <div className="border-b border-mist">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex justify-between items-center py-5 text-[0.75rem] font-medium tracking-[0.1em] uppercase text-ink font-body cursor-pointer"
      >
        {label}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ease-silk ${isOpen ? "max-h-[600px]" : "max-h-0"}`}
      >
        <div className="pb-5">{children}</div>
      </div>
    </div>
  );
}

function NoteGroup({ title, notes }: { title: string; notes: string[] }) {
  return (
    <div className="mb-5">
      <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone mb-2">
        {title}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {notes.map((note) => (
          <span key={note} className="px-3 py-1 bg-mist text-sm text-ink">
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}
