"use client";

import { useState } from "react";
import {
  FilterState,
  OlfactiveFamily,
  PerfumeCategory,
  Concentration,
  Gender,
} from "@/types";

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onClear: () => void;
}

const CATEGORIES: PerfumeCategory[] = ["Nicho", "Diseñador", "Árabe", "Sale"];
const GENDERS: Gender[] = ["Femenino", "Masculino", "Unisex"];
const CONCENTRATIONS: Concentration[] = [
  "Parfum",
  "Eau de Parfum",
  "Eau de Toilette",
  "Eau de Cologne",
];
const FAMILIES: OlfactiveFamily[] = [
  "Floral",
  "Oriental",
  "Amaderado",
  "Fresco",
  "Cítrico",
  "Gourmand",
  "Acuático",
  "Especiado",
];
const BRANDS = [
  "Byredo",
  "Le Labo",
  "Creed",
  "Dior",
  "Tom Ford",
  "Maison Francis Kurkdjian",
  "Frédéric Malle",
  "Ajmal",
  "Swiss Arabian",
  "Commodity",
];

export default function FilterSidebar({ filters, onChange, onClear }: Props) {
  const [open, setOpen] = useState<string[]>(["category", "family"]);

  const toggle = (s: string) =>
    setOpen((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const toggleItem = <T extends string>(
    arr: T[],
    item: T,
    key: keyof FilterState,
  ) => {
    const next = arr.includes(item)
      ? arr.filter((i) => i !== item)
      : [...arr, item];
    onChange({ ...filters, [key]: next });
  };

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    filters.genders.length +
    filters.concentrations.length +
    filters.olfactiveFamilies.length;

  return (
    <aside className="w-[240px] shrink-0">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-mist mb-2">
        <div className="flex items-center gap-2">
          <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-ink">
            Filtros
          </p>
          {activeCount > 0 && (
            <span className="w-[18px] h-[18px] bg-ink text-white rounded-full text-[0.6rem] flex items-center justify-center font-semibold">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="text-[0.7rem] text-stone underline font-body cursor-pointer"
          >
            Limpiar
          </button>
        )}
      </div>

      <Section id="category" label="Categoría" open={open} onToggle={toggle}>
        {CATEGORIES.map((cat) => (
          <Checkbox
            key={cat}
            label={cat}
            checked={filters.categories.includes(cat)}
            onChange={() => toggleItem(filters.categories, cat, "categories")}
          />
        ))}
      </Section>

      <Section
        id="family"
        label="Familia olfativa"
        open={open}
        onToggle={toggle}
      >
        {FAMILIES.map((f) => (
          <Checkbox
            key={f}
            label={f}
            checked={filters.olfactiveFamilies.includes(f)}
            onChange={() =>
              toggleItem(filters.olfactiveFamilies, f, "olfactiveFamilies")
            }
          />
        ))}
      </Section>

      <Section id="gender" label="Género" open={open} onToggle={toggle}>
        {GENDERS.map((g) => (
          <Checkbox
            key={g}
            label={g}
            checked={filters.genders.includes(g)}
            onChange={() => toggleItem(filters.genders, g, "genders")}
          />
        ))}
      </Section>

      <Section
        id="concentration"
        label="Concentración"
        open={open}
        onToggle={toggle}
      >
        {CONCENTRATIONS.map((c) => (
          <Checkbox
            key={c}
            label={c}
            checked={filters.concentrations.includes(c)}
            onChange={() =>
              toggleItem(filters.concentrations, c, "concentrations")
            }
          />
        ))}
      </Section>

      <Section id="brand" label="Marca" open={open} onToggle={toggle}>
        {BRANDS.map((b) => (
          <Checkbox
            key={b}
            label={b}
            checked={filters.brands.includes(b)}
            onChange={() => toggleItem(filters.brands, b, "brands")}
          />
        ))}
      </Section>

      <Section id="price" label="Precio" open={open} onToggle={toggle}>
        <div className="pt-1">
          <div className="flex justify-between mb-3">
            <span className="text-sm text-stone">${filters.priceRange[0]}</span>
            <span className="text-sm text-stone">${filters.priceRange[1]}</span>
          </div>
          <input
            type="range"
            min={0}
            max={1000}
            value={filters.priceRange[1]}
            onChange={(e) =>
              onChange({
                ...filters,
                priceRange: [filters.priceRange[0], Number(e.target.value)],
              })
            }
            className="w-full accent-ink"
          />
        </div>
      </Section>
    </aside>
  );
}

/* ── Accordion section ── */
function Section({
  id,
  label,
  open,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  open: string[];
  onToggle: (s: string) => void;
  children: React.ReactNode;
}) {
  const isOpen = open.includes(id);
  return (
    <div className="border-b border-mist">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex justify-between items-center py-4 text-[0.7rem] font-medium tracking-[0.12em] uppercase text-ink font-body cursor-pointer"
      >
        {label}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-silk ${isOpen ? "max-h-[400px]" : "max-h-0"}`}
      >
        <div className="pb-4 flex flex-col">{children}</div>
      </div>
    </div>
  );
}

/* ── Checkbox ── */
function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex items-center gap-2.5 py-1.5 cursor-pointer text-sm ${checked ? "text-ink" : "text-stone"} transition-colors duration-150`}
    >
      <span
        onClick={onChange}
        className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-all duration-200
          ${checked ? "border-ink bg-ink" : "border-mist bg-transparent"}`}
      >
        {checked && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}
