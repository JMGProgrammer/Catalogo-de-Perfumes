export interface OlfactiveFamily {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  description: string;
  character: string;
  keyIngredients: string[];
  subFamilies: string[];
  representativePerfumes: string[];
  idealFor: string;
  season: string[];
  intensity: number; // 1-5
}

export const olfactiveFamilies: OlfactiveFamily[] = [
  {
    id: "floral",
    name: "Floral",
    color: "#C8748A",
    bgColor: "#FDF0F3",
    description:
      "La familia más grande y diversa de la perfumería. Las florales van desde la delicadeza de una sola flor hasta bouquets complejos que evocan jardines enteros. Son las fragancias que más han marcado la historia del perfume.",
    character: "Romántico, femenino, elegante, natural",
    keyIngredients: [
      "Rosa",
      "Jazmín",
      "Iris",
      "Ylang-ylang",
      "Tuberosa",
      "Magnolia",
    ],
    subFamilies: [
      "Floral sola",
      "Floral frutal",
      "Floral aldehídico",
      "Floral oriental",
    ],
    representativePerfumes: ["Blanche", "Rose 31"],
    idealFor: "Uso diario, eventos románticos, primavera",
    season: ["Primavera", "Verano"],
    intensity: 2,
  },
  {
    id: "oriental",
    name: "Oriental",
    color: "#C4954A",
    bgColor: "#FDF6ED",
    description:
      "Sensuales, cálidas y misteriosas, las orientales son el perfume de la seducción. Nacidas de la fascinación occidental por Oriente Medio, combinan resinas, especias y bálsamos en composiciones de una profundidad extraordinaria.",
    character: "Sensual, misterioso, exótico, sofisticado",
    keyIngredients: [
      "Oud",
      "Ámbar",
      "Incienso",
      "Vainilla",
      "Pachulí",
      "Benjuí",
    ],
    subFamilies: [
      "Oriental especiado",
      "Oriental floral",
      "Oriental amaderado",
      "Gourmand",
    ],
    representativePerfumes: ["Oud Ispahan", "Ambre Nuit", "Attar Al Kaaba"],
    idealFor: "Noches, ocasiones especiales, invierno",
    season: ["Otoño", "Invierno"],
    intensity: 5,
  },
  {
    id: "amaderado",
    name: "Amaderado",
    color: "#8B6914",
    bgColor: "#FBF7F0",
    description:
      "Los amaderados son la columna vertebral de la perfumería moderna. Cálidos sin ser pesados, sensuales sin ser obviamente sedutores, representan la elegancia discreta del lujo contemporáneo.",
    character: "Cálido, elegante, sofisticado, unisex",
    keyIngredients: [
      "Sándalo",
      "Cedro",
      "Vetiver",
      "Oud",
      "Madera de cachemira",
      "Gaiac",
    ],
    subFamilies: [
      "Amaderado seco",
      "Amaderado cremoso",
      "Amaderado ahumado",
      "Amaderado especiado",
    ],
    representativePerfumes: ["Santal 33", "Baccarat Rouge 540", "Oud Wood"],
    idealFor: "Trabajo, uso cotidiano, todo el año",
    season: ["Todo el año"],
    intensity: 3,
  },
  {
    id: "fresco",
    name: "Fresco",
    color: "#4A8FA8",
    bgColor: "#EFF6FA",
    description:
      "Limpios, energizantes y modernos, los frescos surgieron en los años 90 y revolucionaron la perfumería masculina. Evocan el aire después de la lluvia, el océano y la naturaleza en su estado más puro.",
    character: "Limpio, energético, joven, natural",
    keyIngredients: [
      "Notas marinas",
      "Bergamota",
      "Menta",
      "Piña",
      "Pepino",
      "Violeta",
    ],
    subFamilies: [
      "Fresco acuático",
      "Fresco verde",
      "Fresco cítrico",
      "Fougère",
    ],
    representativePerfumes: ["Aventus"],
    idealFor: "Deporte, trabajo, verano",
    season: ["Primavera", "Verano"],
    intensity: 1,
  },
  {
    id: "citrico",
    name: "Cítrico",
    color: "#D4A843",
    bgColor: "#FFFBF0",
    description:
      "Vivaces y alegres, los cítricos son los más universales de todos los perfumes. Usados casi siempre como notas de salida, algunos perfumistas logran que persistan más de lo esperado gracias a técnicas de fijación modernas.",
    character: "Alegre, fresco, energizante, optimista",
    keyIngredients: [
      "Bergamota",
      "Limón",
      "Naranja",
      "Pomelo",
      "Mandarina",
      "Yuzu",
    ],
    subFamilies: [
      "Cítrico puro",
      "Cítrico amaderado",
      "Cítrico floral",
      "Cítrico aromático",
    ],
    representativePerfumes: ["Narcos'is"],
    idealFor: "Mañanas, verano, uso casual",
    season: ["Primavera", "Verano"],
    intensity: 1,
  },
  {
    id: "gourmand",
    name: "Gourmand",
    color: "#C4784A",
    bgColor: "#FDF4EF",
    description:
      "Los gourmand son los perfumes más modernos y controvertidos. Nacidos a finales de los 90, evocan irresistiblemente la comida: caramelo, chocolate, vainilla, café. No son dulces empalagosos, sino memorias olfativas del placer.",
    character: "Dulce, adictivo, cálido, confortable",
    keyIngredients: [
      "Vainilla",
      "Caramelo",
      "Tonka",
      "Cacao",
      "Café",
      "Pralinée",
    ],
    subFamilies: ["Gourmand oriental", "Gourmand floral", "Gourmand fresco"],
    representativePerfumes: ["Narcos'is"],
    idealFor: "Noches de invierno, uso íntimo",
    season: ["Otoño", "Invierno"],
    intensity: 4,
  },
  {
    id: "especiado",
    name: "Especiado",
    color: "#B4674A",
    bgColor: "#FDF2EE",
    description:
      "Las especias han sido parte de la perfumería desde sus orígenes en las rutas comerciales de Oriente. Pimienta, cardamomo, clavo y canela añaden calidez y complejidad a cualquier composición.",
    character: "Vibrante, cálido, audaz, complejo",
    keyIngredients: [
      "Pimienta negra",
      "Cardamomo",
      "Clavo",
      "Canela",
      "Nuez moscada",
      "Azafrán",
    ],
    subFamilies: [
      "Especiado oriental",
      "Especiado amaderado",
      "Especiado floral",
    ],
    representativePerfumes: ["Oud Ispahan", "Musc Ravageur"],
    idealFor: "Noches, invierno, ocasiones especiales",
    season: ["Otoño", "Invierno"],
    intensity: 4,
  },
  {
    id: "acuatico",
    name: "Acuático",
    color: "#6BA8B4",
    bgColor: "#EFF8FA",
    description:
      "Los acuáticos capturan la esencia del agua en todas sus formas: el océano, la lluvia, los manantiales. Nacidos en los años 90, representan la libertad y la modernidad en estado puro.",
    character: "Libre, limpio, moderno, fresco",
    keyIngredients: [
      "Notas marinas",
      "Algas",
      "Agua de lluvia",
      "Loto",
      "Melon",
      "Cyclamen",
    ],
    subFamilies: ["Marino", "Ozónico", "Acuático floral"],
    representativePerfumes: ["Aventus"],
    idealFor: "Verano, playa, uso deportivo",
    season: ["Primavera", "Verano"],
    intensity: 1,
  },
];
