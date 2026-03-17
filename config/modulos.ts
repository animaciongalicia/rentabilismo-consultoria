// config/modulos.ts
// Fuente de verdad del listado de módulos del programa.
// Importar desde aquí, nunca desde componentes de UI.

export interface ModuloConfig {
  slug:   string;
  titulo: string;
}

export const MODULOS: ModuloConfig[] = [
  { slug: "modulo-1-mentalidad",   titulo: "El Punto de Partida" },
  { slug: "modulo-2-diagnostico",  titulo: "Módulo 1 – Diagnóstico de Rentabilidad" },
  { slug: "modulo-3-finanzas",     titulo: "Módulo 2 – Finanzas" },
  { slug: "modulo-producto",       titulo: "Módulo 3 – Producto y Servicio" },
  { slug: "modulo-4-precios",      titulo: "Módulo 4 – Estrategia de Precios" },
  { slug: "modulo-5-operaciones",  titulo: "Módulo 5 – Operaciones y Procesos" },
  { slug: "modulo-6-equipo",       titulo: "Módulo 6 – Equipo y Liderazgo" },
  { slug: "modulo-7-ventas",       titulo: "Módulo 7 – Ventas y Captación" },
  { slug: "modulo-8-marketing",    titulo: "Módulo 8 – Marketing y Posicionamiento" },
  { slug: "modulo-9-estrategia",   titulo: "Módulo 9 – Estrategia y Crecimiento" },
  { slug: "modulo-10-plan-accion", titulo: "Módulo 10 – Tu Plan de Acción" },
];

/** Primer módulo (siempre gratuito). */
export const MODULO_GRATUITO_SLUG = MODULOS[0].slug;
