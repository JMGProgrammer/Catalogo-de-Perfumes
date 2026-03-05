"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1. Check username not taken
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single();

    if (existing) {
      setError("Ese nombre de usuario ya está en uso.");
      setLoading(false);
      return;
    }

    // 2. Create auth user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message ?? "Error al registrarse.");
      setLoading(false);
      return;
    }

    // 3. Create profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      name,
      username,
      description: "",
      is_admin: false,
    });

    if (profileError) {
      setError("Error al crear el perfil.");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-10">
        <Link
          href="/"
          className="font-display text-3xl tracking-[0.15em] text-ink block mb-8"
        >
          SILLAGE
        </Link>
        <h1 className="font-display text-[2.5rem] font-light text-ink leading-tight mb-2">
          Creá tu cuenta
        </h1>
        <p className="text-sm text-stone">
          ¿Ya tenés cuenta?{" "}
          <Link
            href="/login"
            className="text-ink underline underline-offset-4 hover:text-gold transition-colors"
          >
            Ingresá
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-stone">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Juan"
              className="px-4 py-3.5 border border-mist bg-white text-sm text-ink placeholder:text-stone/50 outline-none focus:border-ink transition-colors duration-200 font-body"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-stone">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              required
              placeholder="juanmeny"
              className="px-4 py-3.5 border border-mist bg-white text-sm text-ink placeholder:text-stone/50 outline-none focus:border-ink transition-colors duration-200 font-body"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-stone">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@email.com"
            className="px-4 py-3.5 border border-mist bg-white text-sm text-ink placeholder:text-stone/50 outline-none focus:border-ink transition-colors duration-200 font-body"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-stone">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            minLength={6}
            className="px-4 py-3.5 border border-mist bg-white text-sm text-ink placeholder:text-stone/50 outline-none focus:border-ink transition-colors duration-200 font-body"
          />
          <p className="text-[0.65rem] text-stone/60">Mínimo 6 caracteres</p>
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 py-4 bg-ink text-white text-[0.7rem] font-medium tracking-[0.15em] uppercase font-body hover:bg-stone transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
}
