export interface Perfumer {
  id: string;
  name: string;
  house: string;
  title: string;
  nationality: string;
  specialty: string;
  bio: string;
  quote: string;
  imageUrl: string;
  type: "Nicho" | "Diseñador" | "Árabe";
  notableFragrances: string[];
  twitter?: string;
  linkedin?: string;
}

export const perfumers: Perfumer[] = [
  {
    id: "1",
    name: "François Demachy",
    house: "Dior",
    title: "Maître Parfumeur",
    nationality: "Francés",
    specialty: "Orientales y florales",
    bio: "Formado en Grasse, la capital mundial del perfume, François Demachy lleva más de dos décadas definiendo la identidad olfativa de Dior. Su obsesión por las materias primas naturales y su dominio del oud lo convierten en uno de los grandes maestros vivos.",
    quote:
      "Un perfume debe contar una historia antes de que la piel lo absorba.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    type: "Diseñador",
    notableFragrances: ["Oud Ispahan", "Ambre Nuit", "Granville"],
    twitter: "#",
    linkedin: "#",
  },
  {
    id: "2",
    name: "Francis Kurkdjian",
    house: "Maison Francis Kurkdjian",
    title: "Fundador & Perfumista",
    nationality: "Francés-Armenio",
    specialty: "Amaderados modernos",
    bio: "A los 25 años creó 'Le Mâle' para Jean Paul Gaultier, uno de los perfumes más vendidos de la historia. Fundó su propia maison en 2009 y desde entonces redefine el lujo olfativo contemporáneo con una precisión técnica extraordinaria.",
    quote:
      "La perfumería es la única forma de arte que involucra todos los sentidos a la vez.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    type: "Nicho",
    notableFragrances: [
      "Baccarat Rouge 540",
      "Aqua Universalis",
      "Oud Cashmere Mood",
    ],
    twitter: "#",
    linkedin: "#",
  },
  {
    id: "3",
    name: "Olivier Creed",
    house: "Creed",
    title: "Master Perfumer",
    nationality: "Británico-Francés",
    specialty: "Frescos masculinos",
    bio: "Sexta generación de la familia Creed, Olivier representa una dinastía perfumera que comenzó en 1760. Sus viajes por el mundo en busca de ingredientes únicos y su método artesanal lo sitúan en una categoría aparte dentro del nicho de lujo.",
    quote: "Los ingredientes son el alma. El resto es técnica.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    type: "Nicho",
    notableFragrances: [
      "Aventus",
      "Silver Mountain Water",
      "Green Irish Tweed",
    ],
    twitter: "#",
    linkedin: "#",
  },
  {
    id: "4",
    name: "Jérôme Epinette",
    house: "Byredo",
    title: "Perfumista Principal",
    nationality: "Francés",
    specialty: "Florales abstractos",
    bio: "Formado en el ISIPCA de Versalles, Epinette es el arquitecto olfativo detrás del universo de Byredo. Su capacidad para traducir emociones y recuerdos en fragancias lo convierte en uno de los perfumistas más influyentes de su generación.",
    quote: "Un perfume perfecto es aquel que no podés describir con palabras.",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    type: "Nicho",
    notableFragrances: ["Blanche", "Gypsy Water", "Bal d'Afrique"],
    twitter: "#",
    linkedin: "#",
  },
  {
    id: "5",
    name: "Juliette Karagueuzoglou",
    house: "Le Labo",
    title: "Co-fundadora & Perfumista",
    nationality: "Francesa",
    specialty: "Amaderados íntimos",
    bio: "Junto a Fabrice Penot, Juliette rompió todas las reglas de la perfumería comercial cuando fundó Le Labo en 2006. Su filosofía de mezclar los perfumes en el momento de la compra y rechazar la publicidad tradicional revolucionó la industria.",
    quote:
      "El perfume más honesto es el que no intenta gustarle a todo el mundo.",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    type: "Nicho",
    notableFragrances: ["Santal 33", "Rose 31", "Another 13"],
    twitter: "#",
    linkedin: "#",
  },
  {
    id: "6",
    name: "Rashid Al Farhan",
    house: "Ajmal Perfumes",
    title: "Master Attar Blender",
    nationality: "Emiratí",
    specialty: "Oud y attar árabe",
    bio: "Con más de 30 años destilando oud en los talleres de Ajmal en Dubai, Rashid es considerado uno de los últimos grandes maestros del attar árabe tradicional. Su conocimiento de las maderas de oud camboyano, indio y africano no tiene parangón.",
    quote:
      "El oud es la memoria de un árbol que vivió cien años. Hay que respetarlo.",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    type: "Árabe",
    notableFragrances: ["Attar Al Kaaba", "Dahn Al Oudh", "Asrar"],
    twitter: "#",
    linkedin: "#",
  },
];
