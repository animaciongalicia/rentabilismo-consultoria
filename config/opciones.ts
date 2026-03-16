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

/** Precio del programa en euros. Cambia aquí, se refleja en toda la app. */
export const PRECIO_PROGRAMA = 799;
