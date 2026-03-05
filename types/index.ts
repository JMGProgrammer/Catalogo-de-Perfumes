// Tipos de unión — útiles como referencia pero no forzados en FilterState
export type OlfactiveFamily =
  | "Floral"
  | "Oriental"
  | "Amaderado"
  | "Fresco"
  | "Cítrico"
  | "Gourmand"
  | "Acuático"
  | "Especiado";

export type PerfumeCategory = "Nicho" | "Diseñador" | "Árabe" | "Sale";

export type Concentration =
  | "Parfum"
  | "Eau de Parfum"
  | "Eau de Toilette"
  | "Eau de Cologne";

export type Gender = "Femenino" | "Masculino" | "Unisex";

export interface PerfumeSize {
  ml: number;
  price: number;
  inStock: boolean;
}

// Perfume con campos en snake_case (tal como llega de Supabase)
export interface Perfume {
  id: string;
  name: string;
  brand: string;
  category: string;
  olfactive_family: string;
  olfactiveFamily?: string; // alias camelCase para compatibilidad con datos locales
  concentration: string;
  gender: string;
  sizes: PerfumeSize[];
  rating: number;
  review_count?: number;
  reviewCount?: number;
  description: string;
  top_notes?: string[];
  heart_notes?: string[];
  base_notes?: string[];
  topNotes?: string[];
  heartNotes?: string[];
  baseNotes?: string[];
  ingredients: string[];
  perfumer: string;
  year: number;
  image_url?: string;
  imageUrl?: string;
  imageAlt?: string;
  featured?: boolean;
  trending?: boolean;
  created_at?: string;
}

// FilterState usa string[] para no pelear con los tipos estrictos
export interface FilterState {
  categories: string[];
  brands: string[];
  genders: string[];
  concentrations: string[];
  olfactiveFamilies: string[];
  priceRange: [number, number];
  ingredients: string[];
}

export interface CartItem {
  perfume: Perfume;
  selectedSize: PerfumeSize;
  quantity: number;
}
