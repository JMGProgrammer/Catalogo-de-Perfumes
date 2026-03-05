export interface Ingredient {
  id: string;
  name: string;
  origin: string;
  family: string;
  description: string;
  olfactiveProfile: string;
  funFact: string;
  imageUrl: string;
  usedIn: string[];
  rarity: "Común" | "Exclusivo" | "Rarísimo";
}

export const ingredients: Ingredient[] = [
  {
    id: "1",
    name: "Oud",
    origin: "Camboya, India, Laos",
    family: "Amaderado",
    description:
      "La resina que produce el árbol Aquilaria cuando es atacado por un hongo. Solo el 2% de los árboles la produce naturalmente, lo que lo convierte en uno de los ingredientes más valiosos del mundo.",
    olfactiveProfile:
      "Ahumado, animal, profundo, balsámico con toques de cuero",
    funFact:
      "Un kilo de aceite de oud puro puede costar más de $100.000 USD. Es literalmente más caro que el oro.",
    imageUrl:
      "https://images.unsplash.com/photo-1519235624215-85175d5eb36e?w=800&auto=format&fit=crop",
    usedIn: ["Oud Ispahan", "Ambre Nuit", "Oud Wood", "Attar Al Kaaba"],
    rarity: "Rarísimo",
  },
  {
    id: "2",
    name: "Rosa Taif",
    origin: "Arabia Saudita",
    family: "Floral",
    description:
      "Cultivada a 1.800 metros de altura en las montañas de Taif, esta rosa solo florece durante tres semanas al año. Se recoge a mano antes del amanecer para preservar su aroma único.",
    olfactiveProfile: "Frutal, mieloso, con notas de lichi y té verde",
    funFact:
      "Para producir 1ml de aceite esencial se necesitan aproximadamente 3.000 rosas. La cosecha completa dura apenas 21 días al año.",
    imageUrl:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&auto=format&fit=crop",
    usedIn: ["Oud Ispahan", "Attar Al Kaaba", "Rose 31"],
    rarity: "Rarísimo",
  },
  {
    id: "3",
    name: "Sándalo de Mysore",
    origin: "Karnataka, India",
    family: "Amaderado",
    description:
      "El sándalo de Mysore es considerado el más fino del mundo. Su cultivo está estrictamente regulado por el gobierno indio, lo que limita su disponibilidad y eleva su precio.",
    olfactiveProfile: "Cremoso, suave, cálido, con toques de vainilla y leche",
    funFact:
      "El árbol de sándalo tarda mínimo 40 años en producir madera de calidad perfumera. La mayoría de los sándalos en perfumería son sintéticos o de Australia.",
    imageUrl:
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&auto=format&fit=crop",
    usedIn: ["Santal 33", "Blanche", "Ambre Nuit"],
    rarity: "Exclusivo",
  },
  {
    id: "4",
    name: "Bergamota",
    origin: "Calabria, Italia",
    family: "Cítrico",
    description:
      "La cáscara del bergamoto, un cítrico que casi exclusivamente crece en la región de Calabria en el sur de Italia. Es la nota de salida más clásica de la perfumería occidental.",
    olfactiveProfile:
      "Fresco, floral, ligeramente picante, con toques de té Earl Grey",
    funFact:
      "El 95% de la bergamota mundial proviene de tan solo 1.800 hectáreas en Calabria. Sin bergamota, no existiría el Earl Grey.",
    imageUrl:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop",
    usedIn: ["Aventus", "Baccarat Rouge 540", "Musc Ravageur"],
    rarity: "Común",
  },
  {
    id: "5",
    name: "Ámbar Gris",
    origin: "Océanos del mundo",
    family: "Oriental",
    description:
      "Secretado por el intestino del cachalote, el ámbar gris es uno de los ingredientes más extraños y lujosos de la perfumería. Hoy se sintetiza en laboratorio, pero el natural se sigue vendiendo a precios astronómicos.",
    olfactiveProfile:
      "Dulce, animal, marino, cálido y extraordinariamente persistente",
    funFact:
      "Un trozo de ámbar gris natural encontrado en una playa puede valer miles de dólares. Madura flotando en el océano durante décadas antes de ser utilizable.",
    imageUrl:
      "https://images.unsplash.com/photo-1559181567-c3190ca9d222?w=800&auto=format&fit=crop",
    usedIn: ["Baccarat Rouge 540", "Aventus"],
    rarity: "Rarísimo",
  },
  {
    id: "6",
    name: "Jazmín Sambac",
    origin: "India, Egipto",
    family: "Floral",
    description:
      "El jazmín sambac es la variedad más aromática de la familia. Flor nacional de Filipinas e Indonesia, su absoluto es uno de los más costosos y complejos de extraer en perfumería.",
    olfactiveProfile:
      "Intensamente floral, indólico, cálido, con toques de té y fruta",
    funFact:
      "Las flores de jazmín solo se recolectan de noche porque es cuando liberan su máxima fragancia. Un perfumista puede usar 8 millones de flores para 1 kilo de absoluto.",
    imageUrl:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&auto=format&fit=crop",
    usedIn: ["Blanche", "Rose 31", "Baccarat Rouge 540"],
    rarity: "Exclusivo",
  },
  {
    id: "7",
    name: "Vetiver",
    origin: "Haití, Java, India",
    family: "Amaderado",
    description:
      "Las raíces del vetiver, una gramínea tropical, producen un aceite de una complejidad olfativa extraordinaria. Cada tierra de cultivo produce un vetiver con un perfil completamente diferente.",
    olfactiveProfile:
      "Terroso, ahumado, leñoso, con facetas cítricas y acuáticas",
    funFact:
      "El vetiver de Haití es considerado el más fino del mundo. Las raíces se destilan durante horas para obtener un aceite que puede envejecerse como un vino.",
    imageUrl:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop",
    usedIn: ["Santal 33", "Aventus", "Musc Ravageur"],
    rarity: "Común",
  },
  {
    id: "8",
    name: "Incienso (Olíbano)",
    origin: "Omán, Somalia, Etiopía",
    family: "Oriental",
    description:
      "La resina del árbol Boswellia, usada en rituales religiosos desde hace 5.000 años. El incienso omaní (Hojari) es considerado el mejor del mundo por su claridad y dulzura.",
    olfactiveProfile:
      "Resinoso, balsámico, ligeramente cítrico, espiritual y meditativo",
    funFact:
      "Los Reyes Magos trajeron incienso porque era más valioso que el oro en la antigüedad. Omán construyó gran parte de su riqueza histórica sobre el comercio de olíbano.",
    imageUrl:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&auto=format&fit=crop",
    usedIn: ["Attar Al Kaaba", "Dehn Al Oud Cambodi"],
    rarity: "Exclusivo",
  },
];
