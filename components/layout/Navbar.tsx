"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const navLinks = [
  { label: "Nicho", href: "/catalog?category=Nicho" },
  { label: "Diseñador", href: "/catalog?category=Dise%C3%B1ador" },
  { label: "Árabe", href: "/catalog?category=%C3%81rabe" },
  { label: "Colecciones", href: "/catalog" },
  { label: "Ingredientes", href: "/ingredients" },
  { label: "Guía Olfativa", href: "/guide" },
];

interface UserState {
  name: string;
  is_admin: boolean;
}

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<UserState | null>(null);

  const loadProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("name, is_admin")
      .eq("id", userId)
      .single();
    if (data) setUser(data);
  };

  useEffect(() => {
    // Scroll listener
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) loadProfile(session.user.id);
      else setUser(null);
    });

    // React to auth changes (login / logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) loadProfile(session.user.id);
      else setUser(null);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <nav
        className={`
        fixed top-0 left-0 right-0 z-50 h-[72px]
        flex items-center justify-between px-6 md:px-20
        transition-all duration-400
        ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-mist"
            : "bg-transparent border-b border-transparent"
        }
      `}
      >
        <Link
          href="/"
          className="font-display text-2xl tracking-[0.15em] text-ink shrink-0"
        >
          SILLAGE
        </Link>

        {/* Desktop links */}
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

        {/* Right */}
        <div className="flex items-center gap-4 shrink-0">
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

          {/* Home */}
          <Link
            href="/"
            aria-label="Inicio"
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
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </Link>

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

          {/* Auth — desktop */}
          {user ? (
            <div className="hidden lg:flex items-center gap-3">
              {user.is_admin && (
                <Link
                  href="/admin"
                  className="text-[0.62rem] font-medium tracking-[0.12em] uppercase text-gold hover:text-gold-light transition-colors border border-gold/30 px-3 py-1.5"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/profile"
                className="w-8 h-8 bg-ink rounded-full flex items-center justify-center hover:bg-stone transition-colors"
              >
                <span className="font-display text-sm text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </Link>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-stone hover:text-ink transition-colors"
              >
                Ingresar
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-ink text-white text-[0.62rem] font-medium tracking-[0.12em] uppercase hover:bg-stone transition-colors font-body"
              >
                Registrarse
              </Link>
            </div>
          )}

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
          <div className="pt-4 flex flex-col gap-4">
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="text-base text-ink font-medium"
                >
                  Mi perfil
                </Link>
                {user.is_admin && (
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="text-base text-gold font-medium"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="text-base text-stone text-left"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-base text-ink"
                >
                  Ingresar
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-base text-ink"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
