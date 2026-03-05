"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Definidos FUERA del componente para evitar re-renders que sacan el foco
const inputCls =
  "px-3 py-2.5 border border-mist bg-white text-sm text-ink placeholder:text-stone/40 outline-none focus:border-ink transition-colors duration-200 font-body";
const selectCls = inputCls;

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.62rem] font-medium tracking-[0.15em] uppercase text-stone">
        {label}
      </label>
      {children}
    </div>
  );
}

interface PerfumeForm {
  name: string;
  brand: string;
  category: string;
  olfactive_family: string;
  concentration: string;
  gender: string;
  description: string;
  perfumer: string;
  year: string;
  top_notes: string;
  heart_notes: string;
  base_notes: string;
  ingredients: string;
  featured: boolean;
  trending: boolean;
  sizes: { ml: number; price: number; inStock: boolean }[];
}

const EMPTY: PerfumeForm = {
  name: "",
  brand: "",
  category: "",
  olfactive_family: "",
  concentration: "",
  gender: "",
  description: "",
  perfumer: "",
  year: "",
  top_notes: "",
  heart_notes: "",
  base_notes: "",
  ingredients: "",
  featured: false,
  trending: false,
  sizes: [{ ml: 50, price: 0, inStock: true }],
};

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  editing?: Record<string, unknown> | null;
}

export default function PerfumeFormDrawer({
  open,
  onClose,
  onSaved,
  editing,
}: Props) {
  const [form, setForm] = useState<PerfumeForm>(EMPTY);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      if (editing) {
        setForm({
          name: (editing.name as string) ?? "",
          brand: (editing.brand as string) ?? "",
          category: (editing.category as string) ?? "",
          olfactive_family: (editing.olfactive_family as string) ?? "",
          concentration: (editing.concentration as string) ?? "",
          gender: (editing.gender as string) ?? "",
          description: (editing.description as string) ?? "",
          perfumer: (editing.perfumer as string) ?? "",
          year: String(editing.year ?? ""),
          top_notes: ((editing.top_notes as string[]) ?? []).join(", "),
          heart_notes: ((editing.heart_notes as string[]) ?? []).join(", "),
          base_notes: ((editing.base_notes as string[]) ?? []).join(", "),
          ingredients: ((editing.ingredients as string[]) ?? []).join(", "),
          featured: (editing.featured as boolean) ?? false,
          trending: (editing.trending as boolean) ?? false,
          sizes: (editing.sizes as {
            ml: number;
            price: number;
            inStock: boolean;
          }[]) ?? [{ ml: 50, price: 0, inStock: true }],
        });
        setImagePreview((editing.image_url as string) ?? "");
      } else {
        setForm(EMPTY);
        setImagePreview("");
        setImageFile(null);
      }
      setError("");
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, editing]);

  const set = (key: keyof PerfumeForm, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addSize = () =>
    setForm((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { ml: 0, price: 0, inStock: true }],
    }));

  const removeSize = (i: number) =>
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, idx) => idx !== i),
    }));

  const updateSize = (i: number, key: string, value: unknown) =>
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.map((s, idx) =>
        idx === i ? { ...s, [key]: value } : s,
      ),
    }));

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    let imageUrl = imagePreview;

    // Upload image if new file selected
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("perfume-images")
        .upload(path, imageFile, { upsert: true });

      if (uploadError) {
        setError("Error al subir la imagen.");
        setSaving(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("perfume-images")
        .getPublicUrl(path);

      imageUrl = urlData.publicUrl;
    }

    const payload = {
      name: form.name,
      brand: form.brand,
      category: form.category,
      olfactive_family: form.olfactive_family,
      concentration: form.concentration,
      gender: form.gender,
      description: form.description,
      perfumer: form.perfumer,
      year: Number(form.year),
      top_notes: form.top_notes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      heart_notes: form.heart_notes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      base_notes: form.base_notes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      ingredients: form.ingredients
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      featured: form.featured,
      trending: form.trending,
      sizes: form.sizes,
      image_url: imageUrl,
    };

    if (editing?.id) {
      const { error: updateError } = await supabase
        .from("perfumes")
        .update(payload)
        .eq("id", editing.id);
      if (updateError) {
        setError("Error al actualizar.");
        setSaving(false);
        return;
      }
    } else {
      const { error: insertError } = await supabase
        .from("perfumes")
        .insert(payload);
      if (insertError) {
        setError("Error al guardar.");
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    onSaved();
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-ink/40 z-[200] transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      />

      {/* Drawer */}
      <aside
        className={`
        fixed top-0 right-0 bottom-0 z-[201]
        w-full max-w-[600px] bg-white flex flex-col
        transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${visible ? "translate-x-0" : "translate-x-full"}
      `}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-mist shrink-0">
          <div>
            <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone mb-0.5">
              Panel Admin
            </p>
            <h2 className="font-display text-xl font-normal text-ink">
              {editing ? "Editar perfume" : "Añadir perfume"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone hover:text-ink transition-colors p-1"
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

        {/* Scrollable form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-8 py-8 space-y-8"
        >
          {/* SECTION: Info básica */}
          <section>
            <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-5">
              Información básica
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nombre">
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Oud Ispahan"
                  className={inputCls}
                />
              </Field>
              <Field label="Marca">
                <input
                  type="text"
                  required
                  value={form.brand}
                  onChange={(e) => set("brand", e.target.value)}
                  placeholder="Dior"
                  className={inputCls}
                />
              </Field>
              <Field label="Categoría">
                <select
                  required
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className={selectCls}
                >
                  <option value="">Seleccionar</option>
                  {["Nicho", "Diseñador", "Árabe", "Sale"].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Género">
                <select
                  required
                  value={form.gender}
                  onChange={(e) => set("gender", e.target.value)}
                  className={selectCls}
                >
                  <option value="">Seleccionar</option>
                  {["Femenino", "Masculino", "Unisex"].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Familia olfativa">
                <select
                  required
                  value={form.olfactive_family}
                  onChange={(e) => set("olfactive_family", e.target.value)}
                  className={selectCls}
                >
                  <option value="">Seleccionar</option>
                  {[
                    "Floral",
                    "Oriental",
                    "Amaderado",
                    "Fresco",
                    "Cítrico",
                    "Gourmand",
                    "Acuático",
                    "Especiado",
                  ].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Concentración">
                <select
                  required
                  value={form.concentration}
                  onChange={(e) => set("concentration", e.target.value)}
                  className={selectCls}
                >
                  <option value="">Seleccionar</option>
                  {[
                    "Parfum",
                    "Eau de Parfum",
                    "Eau de Toilette",
                    "Eau de Cologne",
                  ].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Perfumista">
                <input
                  type="text"
                  value={form.perfumer}
                  onChange={(e) => set("perfumer", e.target.value)}
                  placeholder="François Demachy"
                  className={inputCls}
                />
              </Field>
              <Field label="Año de lanzamiento">
                <input
                  type="number"
                  value={form.year}
                  onChange={(e) => set("year", e.target.value)}
                  placeholder="2012"
                  min="1900"
                  max="2025"
                  className={inputCls}
                />
              </Field>
            </div>
          </section>

          {/* SECTION: Descripción */}
          <section>
            <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-5">
              Descripción
            </p>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              placeholder="Descripción del perfume..."
              className={`${inputCls} w-full resize-none`}
            />
          </section>

          {/* SECTION: Notas olfativas */}
          <section>
            <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-5">
              Notas olfativas
            </p>
            <p className="text-xs text-stone mb-4">
              Separadas por coma. Ej: Rosa, Jazmín, Iris
            </p>
            <div className="flex flex-col gap-4">
              <Field label="Notas de cabeza">
                <input
                  type="text"
                  value={form.top_notes}
                  onChange={(e) => set("top_notes", e.target.value)}
                  placeholder="Bergamota, Limón"
                  className={inputCls}
                />
              </Field>
              <Field label="Notas de corazón">
                <input
                  type="text"
                  value={form.heart_notes}
                  onChange={(e) => set("heart_notes", e.target.value)}
                  placeholder="Rosa, Jazmín"
                  className={inputCls}
                />
              </Field>
              <Field label="Notas de fondo">
                <input
                  type="text"
                  value={form.base_notes}
                  onChange={(e) => set("base_notes", e.target.value)}
                  placeholder="Sándalo, Ámbar, Musgo"
                  className={inputCls}
                />
              </Field>
            </div>
          </section>

          {/* SECTION: Ingredientes */}
          <section>
            <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-5">
              Ingredientes principales
            </p>
            <Field label="Ingredientes (separados por coma)">
              <input
                type="text"
                value={form.ingredients}
                onChange={(e) => set("ingredients", e.target.value)}
                placeholder="Oud, Rosa, Sándalo"
                className={inputCls}
              />
            </Field>
          </section>

          {/* SECTION: Tamaños y precios */}
          <section>
            <div className="flex justify-between items-center mb-5">
              <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold">
                Tamaños y precios
              </p>
              <button
                type="button"
                onClick={addSize}
                className="text-[0.65rem] font-medium tracking-[0.1em] uppercase text-ink border border-mist px-3 py-1.5 hover:border-ink transition-colors"
              >
                + Agregar
              </button>
            </div>
            <div className="space-y-3">
              {form.sizes.map((size, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-[0.6rem] tracking-widest uppercase text-stone/60">
                      ML
                    </label>
                    <input
                      type="number"
                      value={size.ml}
                      onChange={(e) =>
                        updateSize(i, "ml", Number(e.target.value))
                      }
                      placeholder="50"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-[0.6rem] tracking-widest uppercase text-stone/60">
                      Precio $
                    </label>
                    <input
                      type="number"
                      value={size.price}
                      onChange={(e) =>
                        updateSize(i, "price", Number(e.target.value))
                      }
                      placeholder="150"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <label className="text-[0.6rem] tracking-widest uppercase text-stone/60">
                      Stock
                    </label>
                    <input
                      type="checkbox"
                      checked={size.inStock}
                      onChange={(e) =>
                        updateSize(i, "inStock", e.target.checked)
                      }
                      className="w-4 h-4 accent-ink mt-1"
                    />
                  </div>
                  {form.sizes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSize(i)}
                      className="text-stone hover:text-red-500 transition-colors mt-4 shrink-0"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: Imagen */}
          <section>
            <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-5">
              Imagen del producto
            </p>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-mist hover:border-ink transition-colors cursor-pointer py-8 gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover"
                />
              ) : (
                <>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-stone"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                  <p className="text-sm text-stone">Click para subir imagen</p>
                  <p className="text-xs text-stone/50">PNG, JPG hasta 5MB</p>
                </>
              )}
            </label>
            {imagePreview && (
              <button
                type="button"
                onClick={() => {
                  setImagePreview("");
                  setImageFile(null);
                }}
                className="mt-2 text-xs text-stone underline hover:text-ink transition-colors"
              >
                Quitar imagen
              </button>
            )}
          </section>

          {/* SECTION: Destacado / Tendencia */}
          <section>
            <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-5">
              Visibilidad
            </p>
            <div className="flex gap-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                  className="w-4 h-4 accent-ink"
                />
                <span className="text-sm text-ink">Destacado en home</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.trending}
                  onChange={(e) => set("trending", e.target.checked)}
                  className="w-4 h-4 accent-ink"
                />
                <span className="text-sm text-ink">En tendencia</span>
              </label>
            </div>
          </section>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>

        {/* Footer CTA */}
        <div className="px-8 py-5 border-t border-mist shrink-0 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3.5 border border-mist text-[0.7rem] font-medium tracking-[0.15em] uppercase text-stone hover:border-ink hover:text-ink transition-colors font-body"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit as unknown as React.MouseEventHandler}
            disabled={saving}
            className="flex-1 py-3.5 bg-ink text-white text-[0.7rem] font-medium tracking-[0.15em] uppercase font-body hover:bg-stone transition-colors disabled:opacity-50"
          >
            {saving
              ? "Guardando..."
              : editing
                ? "Guardar cambios"
                : "Añadir perfume"}
          </button>
        </div>
      </aside>
    </>
  );
}
