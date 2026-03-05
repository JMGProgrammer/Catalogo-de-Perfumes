"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email o contraseña incorrectos.");
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
          Bienvenido de vuelta
        </h1>
        <p className="text-sm text-stone">
          ¿No tenés cuenta?{" "}
          <Link
            href="/register"
            className="text-ink underline underline-offset-4 hover:text-gold transition-colors"
          >
            Registrate
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
            className="px-4 py-3.5 border border-mist bg-white text-sm text-ink placeholder:text-stone/50 outline-none focus:border-ink transition-colors duration-200 font-body"
          />
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 py-4 bg-ink text-white text-[0.7rem] font-medium tracking-[0.15em] uppercase font-body hover:bg-stone transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
