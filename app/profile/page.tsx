"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

interface Profile {
  id: string;
  name: string;
  username: string;
  description: string;
  is_admin: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile(data);
        setDescription(data.description ?? "");
      }
      setLoading(false);
    };
    load();
  }, [router]);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    await supabase
      .from("profiles")
      .update({ description })
      .eq("id", profile.id);
    setProfile({ ...profile, description });
    setEditing(false);
    setSaving(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="font-display text-2xl font-light text-stone">
          Cargando...
        </p>
      </div>
    );
  }

  if (!profile) return null;

  const initial = profile.name.charAt(0).toUpperCase();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-[72px]">
        <div className="max-w-2xl mx-auto px-6 py-16">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-12">
            <div className="w-24 h-24 bg-ink rounded-full flex items-center justify-center mb-6">
              <span className="font-display text-4xl font-light text-white">
                {initial}
              </span>
            </div>
            <h1 className="font-display text-3xl font-normal text-ink mb-1">
              {profile.name}
            </h1>
            <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone mb-2">
              @{profile.username}
            </p>
            {profile.is_admin && (
              <span className="px-3 py-1 bg-gold/10 border border-gold/30 text-[0.6rem] font-medium tracking-[0.15em] uppercase text-gold">
                Administrador
              </span>
            )}
          </div>

          {/* Description */}
          <div className="border border-mist p-8 mb-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone">
                Descripción
              </p>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="text-[0.65rem] font-medium tracking-[0.1em] uppercase text-stone hover:text-ink transition-colors underline underline-offset-4"
                >
                  Editar
                </button>
              )}
            </div>

            {editing ? (
              <div className="flex flex-col gap-3">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Contá algo sobre vos y tu relación con los perfumes..."
                  className="w-full px-4 py-3 border border-mist text-sm text-ink placeholder:text-stone/50 outline-none focus:border-ink transition-colors resize-none font-body"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2.5 bg-ink text-white text-[0.65rem] font-medium tracking-[0.15em] uppercase font-body hover:bg-stone transition-colors disabled:opacity-50"
                  >
                    {saving ? "Guardando..." : "Guardar"}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setDescription(profile.description);
                    }}
                    className="px-6 py-2.5 border border-mist text-[0.65rem] font-medium tracking-[0.15em] uppercase text-stone hover:border-ink hover:text-ink transition-colors font-body"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-stone leading-relaxed">
                {profile.description || "Sin descripción todavía."}
              </p>
            )}
          </div>

          {/* Admin link */}
          {profile.is_admin && (
            <div className="border border-gold/20 bg-gold/5 p-6 mb-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-ink mb-1">
                  Panel de administración
                </p>
                <p className="text-xs text-stone">
                  Gestioná perfumes, usuarios y destacados.
                </p>
              </div>
              <a
                href="/admin"
                className="px-5 py-2.5 bg-gold text-ink text-[0.65rem] font-medium tracking-[0.15em] uppercase font-body hover:bg-gold-light transition-colors"
              >
                Ir al admin
              </a>
            </div>
          )}

          {/* Sign out */}
          <div className="pt-6 border-t border-mist">
            <button
              onClick={handleSignOut}
              className="text-sm text-stone hover:text-ink transition-colors underline underline-offset-4"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
