/* ─────────────────────────────────────────────────────────────────────────
   JUVA — Site Data
   Edit this file to update experience cards, technologies, and sanctuary
   spaces without touching any component files.
   ───────────────────────────────────────────────────────────────────────── */

export interface ExperienceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  placeholderKey: string;
  gradient: string;
}

export interface Technology {
  id: string;
  number: string;
  name: string;
  description: string;
  placeholderKey: string;
}

export interface SanctuarySpace {
  id: string;
  title: string;
  tagline: string;
  placeholderKey: string;
  gradient: string;
}

/* ─── Experience Cards ───────────────────────────────────────────────────── */
export const experienceCards: ExperienceCard[] = [
  {
    id: "recovery",
    title: "Recuperación y Longevidad",
    subtitle: "Recovery & Longevity",
    description:
      "Cámara hiperbárica, terapia PEMF, saunas de infrarrojos y paneles de luz. Un protocolo completo pensado para que el cuerpo se restaure en profundidad.",
    placeholderKey: "experience-recovery",
    gradient: "linear-gradient(135deg, #1D201E 0%, #0D0F0E 100%)",
  },
  {
    id: "performance",
    title: "Rendimiento y Condicionamiento",
    subtitle: "Performance & Conditioning",
    description:
      "Treadmills VacuTherm, rodillos de compresión y evaluación VO2 Max. Herramientas de precisión para quienes buscan un rendimiento diferente.",
    placeholderKey: "experience-performance",
    gradient: "linear-gradient(135deg, #1A1C1B 0%, #0F1110 100%)",
  },
  {
    id: "strength",
    title: "Fuerza y Movilidad",
    subtitle: "Strength & Mobility",
    description:
      "Voltra 1, cables NOHRD y WaterRowers. Equipamiento de diseño escandinavo para un entrenamiento controlado, funcional y estético.",
    placeholderKey: "experience-strength",
    gradient: "linear-gradient(135deg, #1D201E 0%, #111413 100%)",
  },
  {
    id: "therapy",
    title: "Terapias de Bienestar",
    subtitle: "Wellness Therapy",
    description:
      "Sesiones de IV Therapy y EMF RF en un ambiente cálido y privado. Cuidado de precisión en un entorno diseñado para el descanso.",
    placeholderKey: "experience-therapy",
    gradient: "linear-gradient(135deg, #181A19 0%, #0D0F0E 100%)",
  },
];

/* ─── Signature Technologies ─────────────────────────────────────────────── */
export const technologies: Technology[] = [
  {
    id: "hyperbaric",
    number: "01",
    name: "Cámara Hiperbárica",
    description:
      "Una experiencia de oxigenación diseñada para apoyar la recuperación y la vitalidad general del organismo.",
    placeholderKey: "tech-hyperbaric",
  },
  {
    id: "pemf",
    number: "02",
    name: "PEMF Therapy",
    description:
      "Tecnología de recuperación que trabaja en un nivel celular, enfocada en la relajación y el descanso profundo.",
    placeholderKey: "tech-pemf",
  },
  {
    id: "vacutherm",
    number: "03",
    name: "VacuTherm",
    description:
      "Entrenamiento de bajo impacto con tecnología termomecánica. Condicionamiento que respeta cada etapa del cuerpo.",
    placeholderKey: "tech-vacutherm",
  },
  {
    id: "sauna",
    number: "04",
    name: "Sauna Infrarrojo",
    description:
      "Recuperación por calor profundo en un espacio silencioso y restaurador. Dos cabinas privadas de madera nórdica.",
    placeholderKey: "tech-sauna",
  },
  {
    id: "iv",
    number: "05",
    name: "IV Therapy",
    description:
      "Sesiones de bienestar intravenoso en un ambiente privado de tipo lounge. Protocolos personalizados para cada miembro.",
    placeholderKey: "tech-iv",
  },
  {
    id: "vo2",
    number: "06",
    name: "VO2 Max",
    description:
      "Evaluación de rendimiento aeróbico para quienes buscan entender y mejorar su capacidad de resistencia.",
    placeholderKey: "tech-vo2",
  },
  {
    id: "nohrd",
    number: "07",
    name: "NOHRD Strength",
    description:
      "Equipamiento de madera de diseño escandinavo: cables y WaterRowers para movimiento funcional y elegante.",
    placeholderKey: "tech-nohrd",
  },
  {
    id: "voltra",
    number: "08",
    name: "Voltra 1",
    description:
      "Entrenamiento de resistencia digital compacto. Precisión total para fuerza, movilidad y control muscular.",
    placeholderKey: "tech-voltra",
  },
];

/* ─── Sanctuary Spaces ───────────────────────────────────────────────────── */
export const sanctuarySpaces: SanctuarySpace[] = [
  {
    id: "lounge",
    title: "The Recovery Lounge",
    tagline: "Donde el cuerpo vuelve a su estado natural.",
    placeholderKey: "sanctuary-recovery",
    gradient:
      "linear-gradient(160deg, #1D201E 0%, #141614 50%, #0D0F0E 100%)",
  },
  {
    id: "strength",
    title: "The Strength Room",
    tagline: "Equipado para quienes exigen lo mejor.",
    placeholderKey: "sanctuary-strength",
    gradient:
      "linear-gradient(160deg, #1A1C1A 0%, #111311 50%, #0A0C0A 100%)",
  },
  {
    id: "infrared",
    title: "Infrared & Therapy Suite",
    tagline: "Calor, luz y silencio en un solo espacio.",
    placeholderKey: "sanctuary-infrared",
    gradient:
      "linear-gradient(160deg, #1E1B18 0%, #15120F 50%, #0D0B09 100%)",
  },
];
