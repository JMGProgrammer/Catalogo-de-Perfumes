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

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  category: PerfumeCategory;
  olfactiveFamily: OlfactiveFamily;
  concentration: Concentration;
  gender: Gender;
  sizes: PerfumeSize[];
  rating: number;
  reviewCount: number;
  description: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  ingredients: string[];
  perfumer: string;
  year: number;
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
  trending?: boolean;
}

export interface FilterState {
  categories: PerfumeCategory[];
  brands: string[];
  genders: Gender[];
  concentrations: Concentration[];
  olfactiveFamilies: OlfactiveFamily[];
  priceRange: [number, number];
  ingredients: string[];
}

export interface CartItem {
  perfume: Perfume;
  selectedSize: PerfumeSize;
  quantity: number;
}
