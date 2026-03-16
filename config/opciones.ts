// config/opciones.ts
// Constantes de negocio: listas de selección, precios, etc.
// Importar desde aquí en cualquier formulario o componente que las necesite.

export const SECTORES: string[] = [
  "Hostelería y restauración",
  "Comercio y retail",
  "Servicios profesionales",
  "Construcción y reformas",
  "Tecnología y digital",
  "Salud y bienestar",
  "Educación y formación",
  "Industria y manufactura",
  "Transporte y logística",
  "Inmobiliario",
  "Consultoría",
  "Alimentación",
  "Otro",
];

export interface TamanoOpcion {
  value: string;
  label: string;
}

export const BUSINESS_SIZES: TamanoOpcion[] = [
  { value: "autonomo", label: "Autónomo / Solo" },
  { value: "2-5",      label: "2-5 personas" },
  { value: "6-20",     label: "6-20 personas" },
  { value: "+20",      label: "+20 personas" },
];

/** Precio fundador (lanzamiento 2026). */
export const PRECIO_FUNDADOR = 497;

/** Precio normal futuro (después del lanzamiento fundador). */
export const PRECIO_PROGRAMA = 797;

/** Fecha límite para el precio fundador (inclusive). 0 = sin límite de fecha. */
export const FOUNDER_DEADLINE: Date | null = new Date('2026-09-30T23:59:59Z');

/** Plazas máximas al precio fundador. 0 = sin límite de plazas. */
export const FOUNDER_SEATS = 100;
