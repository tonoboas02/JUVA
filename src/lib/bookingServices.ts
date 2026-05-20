export type Service = {
  id: string;
  name: string;
  durationMin: number;
  capacity: number;
  description: string;
};

export const SERVICES: Service[] = [
  {
    id: "camara-hiperbarica",
    name: "Cámara Hiperbárica",
    durationMin: 60,
    capacity: 1,
    description: "Oxigenación hiperbárica para recuperación profunda.",
  },
  {
    id: "pemf-therapy",
    name: "PEMF Therapy",
    durationMin: 30,
    capacity: 1,
    description: "Campos electromagnéticos pulsados para regeneración celular.",
  },
  {
    id: "vacutherm",
    name: "VacuTherm",
    durationMin: 30,
    capacity: 3,
    description: "Terapia de vacío y calor para circulación y recuperación.",
  },
  {
    id: "rollers-infrared",
    name: "Rollers + Infrared",
    durationMin: 30,
    capacity: 3,
    description: "Masaje de rodillos con calor infrarrojo para la musculatura.",
  },
  {
    id: "emf-rf",
    name: "EMF RF",
    durationMin: 20,
    capacity: 1,
    description: "Radiofrecuencia electromagnética para regeneración tisular.",
  },
  {
    id: "iv-therapy",
    name: "IV Therapy",
    durationMin: 60,
    capacity: 3,
    description: "Terapia intravenosa personalizada de vitaminas y minerales.",
  },
  {
    id: "sauna-infrarrojo",
    name: "Sauna Infrarrojo",
    durationMin: 45,
    capacity: 2,
    description: "Sauna de espectro completo para desintoxicación y recuperación.",
  },
  {
    id: "vo2-max",
    name: "VO2 Max",
    durationMin: 60,
    capacity: 1,
    description: "Evaluación y entrenamiento de capacidad aeróbica máxima.",
  },
  {
    id: "sala-de-fuerza",
    name: "Sala de Fuerza",
    durationMin: 60,
    capacity: 5,
    description: "Entrenamiento de fuerza con equipamiento de alto rendimiento.",
  },
];

const OPEN_HOUR = 7;
const CLOSE_HOUR = 19;

export function generateTimeSlots(durationMin: number): string[] {
  const slots: string[] = [];
  const totalMinutes = (CLOSE_HOUR - OPEN_HOUR) * 60;

  for (let elapsed = 0; elapsed + durationMin <= totalMinutes; elapsed += durationMin) {
    const hour = OPEN_HOUR + Math.floor(elapsed / 60);
    const minute = elapsed % 60;
    const label = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    slots.push(label);
  }

  return slots;
}

export function getService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}
