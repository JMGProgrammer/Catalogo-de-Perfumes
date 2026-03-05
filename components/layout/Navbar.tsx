"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Nicho", href: "/catalog?category=Nicho" },
  { label: "Diseñador", href: "/catalog?category=Diseñador" },
  { label: "Árabe", href: "/catalog?category=Árabe" },
  { label: "Colecciones", href: "/catalog" },
  { label: "Ingredientes", href: "/ingredients" },
  { label: "Guía Olfativa", href: "/guide" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 h-[72px]
          flex items-center justify-between
          px-6 md:px-20
          transition-all duration-400
          ${
            scrolled
              ? "bg-white/95 backdrop-blur-md border-b border-mist"
              : "bg-transparent border-b border-transparent"
          }
        `}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl tracking-[0.15em] text-ink shrink-0"
        >
          SILLAGE
        </Link>

        {/* Desktop links — centered */}
        <div className="hidden lg:flex gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-stone hover:text-ink transition-colors duration-200 whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-5 shrink-0">
          <button
            aria-label="Buscar"
            className="text-ink/70 hover:text-ink transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button
            aria-label="Carrito"
            className="relative text-ink/70 hover:text-ink transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-ink text-white rounded-full text-[0.55rem] flex items-center justify-center font-medium">
              0
            </span>
          </button>
          <button
            aria-label="Menú"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-ink"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {menuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-[72px] inset-x-0 bottom-0 bg-white z-40 px-6 pt-10 flex flex-col gap-6 lg:hidden overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl font-light text-ink border-b border-mist pb-4"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
