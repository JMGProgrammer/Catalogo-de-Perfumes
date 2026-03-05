"use client";

interface Perfume {
  id: string;
  name: string;
  brand: string;
  category: string;
  featured: boolean;
  trending: boolean;
  sizes: { ml: number; price: number }[];
  image_url: string;
}

interface Props {
  perfumes: Perfume[];
  onEdit: (p: Perfume) => void;
  onDelete: (id: string) => void;
  onToggle: (
    id: string,
    field: "featured" | "trending",
    value: boolean,
  ) => void;
}

export default function PerfumesTable({
  perfumes,
  onEdit,
  onDelete,
  onToggle,
}: Props) {
  if (perfumes.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-mist">
        <p className="font-display text-2xl font-light text-stone mb-2">
          Sin perfumes todavía
        </p>
        <p className="text-sm text-stone">
          Usá el botón "Añadir perfume" para empezar.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-mist">
            {[
              "Producto",
              "Categoría",
              "Precio desde",
              "Destacado",
              "Tendencia",
              "Acciones",
            ].map((h) => (
              <th
                key={h}
                className="text-left text-[0.62rem] font-medium tracking-[0.15em] uppercase text-stone py-3 px-4 first:pl-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-mist">
          {perfumes.map((p) => {
            const minPrice = p.sizes?.length
              ? Math.min(...p.sizes.map((s) => s.price))
              : 0;

            return (
              <tr
                key={p.id}
                className="group hover:bg-mist/30 transition-colors"
              >
                {/* Product */}
                <td className="py-4 px-4 pl-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-mist shrink-0 overflow-hidden">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display text-lg text-stone">
                          {p.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-ink text-sm leading-tight">
                        {p.name}
                      </p>
                      <p className="text-xs text-stone">{p.brand}</p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="py-4 px-4">
                  <span className="px-2 py-0.5 border border-mist text-[0.6rem] font-medium tracking-[0.1em] uppercase text-stone">
                    {p.category}
                  </span>
                </td>

                {/* Price */}
                <td className="py-4 px-4">
                  <span className="font-display text-base text-ink">
                    ${minPrice}
                  </span>
                </td>

                {/* Featured toggle */}
                <td className="py-4 px-4">
                  <button
                    onClick={() => onToggle(p.id, "featured", !p.featured)}
                    className={`w-8 h-4 rounded-full transition-colors duration-200 relative ${p.featured ? "bg-ink" : "bg-mist"}`}
                  >
                    <span
                      className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-200 ${p.featured ? "left-4" : "left-0.5"}`}
                    />
                  </button>
                </td>

                {/* Trending toggle */}
                <td className="py-4 px-4">
                  <button
                    onClick={() => onToggle(p.id, "trending", !p.trending)}
                    className={`w-8 h-4 rounded-full transition-colors duration-200 relative ${p.trending ? "bg-ink" : "bg-mist"}`}
                  >
                    <span
                      className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-200 ${p.trending ? "left-4" : "left-0.5"}`}
                    />
                  </button>
                </td>

                {/* Actions */}
                <td className="py-4 px-4">
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(p)}
                      className="px-3 py-1.5 border border-mist text-[0.62rem] font-medium tracking-[0.1em] uppercase text-stone hover:border-ink hover:text-ink transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="px-3 py-1.5 border border-red-200 text-[0.62rem] font-medium tracking-[0.1em] uppercase text-red-400 hover:border-red-500 hover:text-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
