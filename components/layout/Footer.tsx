import Link from "next/link";

const footerLinks = {
  Colecciones: [
    { label: "Perfumes Nicho", href: "/catalog?category=Nicho" },
    { label: "Perfumes Diseñador", href: "/catalog?category=Diseñador" },
    { label: "Perfumes Árabes", href: "/catalog?category=Árabe" },
    { label: "Novedades", href: "/catalog?sort=new" },
    { label: "Sale", href: "/catalog?category=Sale" },
  ],
  Información: [
    { label: "Guía olfativa", href: "/guide" },
    { label: "Los perfumistas", href: "/perfumers" },
    { label: "Ingredientes", href: "/ingredients" },
    { label: "Familias olfativas", href: "/families" },
  ],
  Ayuda: [
    { label: "Envíos y devoluciones", href: "/shipping" },
    { label: "Preguntas frecuentes", href: "/faq" },
    { label: "Contacto", href: "/contact" },
    { label: "Muestras gratuitas", href: "/samples" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink text-white px-6 md:px-20 pt-20 pb-8">
      <div className="max-w-site mx-auto">
        {/* Top: logo + newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pb-16 border-b border-white/10 mb-16">
          <div>
            <span className="font-display text-5xl font-light tracking-[0.15em] block mb-4">
              SILLAGE
            </span>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              La estela que deja un perfume. Curada para quienes entienden que
              la fragancia es la forma más íntima de expresión.
            </p>
          </div>

          <div>
            <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-6">
              Únete al club
            </p>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Primeras en conocer lanzamientos, ediciones limitadas y guías
              exclusivas sobre perfumería de autor.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 bg-white/7 border border-white/15 border-r-0 text-white text-sm placeholder:text-white/30 outline-none font-body"
              />
              <button className="px-6 py-3 bg-gold text-ink text-[0.65rem] font-medium tracking-[0.12em] uppercase hover:bg-gold-light transition-colors duration-200 font-body">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-white/40 mb-6">
                {section}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/8 pt-8 flex justify-between items-center">
          <p className="text-xs text-white/30">
            © 2025 SILLAGE. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/30">
            Diseñado con obsesión olfativa.
          </p>
        </div>
      </div>
    </footer>
  );
}
