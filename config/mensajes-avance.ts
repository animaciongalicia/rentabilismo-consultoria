// config/mensajes-avance.ts
//
// Mensajes que se muestran al completar una lección o un módulo.
// Tono: directo, útil, empresarial. Sin motivación vacía.
// Editar libremente: añadir, cambiar o eliminar entradas por lessonSlug / moduleSlug.

// ── Por lección ──────────────────────────────────────────────────────────────
// Si no hay mensaje para un lessonSlug concreto, se usa MENSAJE_LECCION_DEFAULT.

export const MENSAJE_LECCION_DEFAULT =
  "Ejercicios guardados. Avanza a la siguiente lección.";

export const MENSAJES_LECCION: Record<string, string> = {
  // Módulo 1 — Mentalidad
  "m1-l1-modelo-mental":
    "Has puesto por escrito cómo piensas sobre tu negocio. La mayoría nunca lo hace.",
  "m1-l2-rol-del-dueno":
    "Está claro quién debe llevar el timón. Ahora hay que actuar como tal.",
  "m1-l3-creencias-limitantes":
    "Las creencias que frenaban están identificadas. Eso ya es trabajo real.",
  "m1-l4-compromiso":
    "Has firmado el compromiso contigo mismo. A partir de aquí, no hay excusas.",

  // Módulo 2 — Diagnóstico
  "m2-l1-foto-actual":
    "Ya tienes la foto real. Muchos prefieren no mirarla. Tú ya la tienes.",
  "m2-l2-que-funciona":
    "Sabes qué parte del negocio tiene que seguir. Ahora hay que protegerla.",
  "m2-l3-que-no-funciona":
    "Has señalado los focos de pérdida. El diagnóstico está hecho.",
  "m2-l4-prioridades":
    "Tienes un orden. Eso vale más que cualquier lista de tareas.",

  // Módulo 3 — Finanzas
  "m3-l1-estructura-ingresos":
    "Sabes de dónde viene el dinero. Ahora ya no opinas: ves.",
  "m3-l2-estructura-gastos":
    "Has diseccionado los gastos. Ahora sabes dónde se va el dinero realmente.",
  "m3-l3-margen-real":
    "Tienes el margen real, no el que te gustaría tener. Eso cambia todo.",
  "m3-l4-control-caja":
    "Control de caja establecido. Sin esto, todo lo demás es teoría.",

  // Módulo 4 — Precios
  "m4-l1-coste-real":
    "Coste real calculado. Muchos empresarios nunca llegan a este número.",
  "m4-l2-valor-percibido":
    "Entiendes por qué tus clientes pagan lo que pagan. Eso es poder.",
  "m4-l3-estrategia-precios":
    "Estrategia de precios definida. Ahora cobras con criterio, no con miedo.",
  "m4-l4-aplicacion":
    "Plan de aplicación listo. Lo que queda es ejecutar.",

  // Módulo 5 — Operaciones
  "m5-l1-procesos-criticos":
    "Los procesos críticos están sobre la mesa. Ahora se pueden mejorar.",
  "m5-l2-cuellos-botella":
    "Los cuellos de botella identificados. Saber dónde está el atasco es el primer paso.",
  "m5-l3-sistematizar":
    "Has definido qué sistematizar. Tu negocio puede funcionar sin ti en esas partes.",
  "m5-l4-delegar":
    "Plan de delegación establecido. Dejar de ser imprescindible empieza aquí.",

  // Módulo 6 — Equipo
  "m6-l1-estructura-equipo":
    "Tienes claro quién hace qué. Eso evita más problemas de los que imaginas.",
  "m6-l2-roles-responsabilidades":
    "Roles y responsabilidades definidos. El caos tiene menos sitio ahora.",
  "m6-l3-rendimiento":
    "Has evaluado el rendimiento de tu equipo con criterio, no con intuición.",
  "m6-l4-cultura":
    "La cultura que quieres en tu empresa está escrita. Ahora hay que vivirla.",

  // Módulo 7 — Ventas
  "m7-l1-cliente-ideal":
    "Cliente ideal definido. Ahora sabes a quién no debes decir que sí.",
  "m7-l2-proceso-venta":
    "Proceso de venta estructurado. Se puede repetir y mejorar.",
  "m7-l3-conversion":
    "Has analizado dónde pierdes ventas. Ahora puedes taparlo.",
  "m7-l4-fidelizacion":
    "Plan de fidelización establecido. Un cliente que repite vale más que diez nuevos.",

  // Módulo 8 — Marketing
  "m8-l1-posicionamiento":
    "Tu posicionamiento está definido. Ahora sabes qué lugar ocupas en la mente de tus clientes.",
  "m8-l2-mensaje":
    "Mensaje claro. Lo que dices sobre tu negocio ahora tiene coherencia.",
  "m8-l3-canales":
    "Canales prioritarios identificados. Menos dispersión, más impacto.",
  "m8-l4-plan-accion-marketing":
    "Plan de marketing concreto. No intenciones: acciones con fecha.",

  // Módulo 9 — Estrategia
  "m9-l1-vision":
    "Has definido hacia dónde va tu empresa. Sin norte no hay camino.",
  "m9-l2-ventaja-competitiva":
    "Tu ventaja competitiva está articulada. Eso es difícil de copiar.",
  "m9-l3-escenarios":
    "Has pensado en escenarios. Eso te hace menos vulnerable a lo inesperado.",
  "m9-l4-decisiones-estrategicas":
    "Decisiones estratégicas tomadas. No postergadas: tomadas.",

  // Módulo 10 — Plan de Acción
  "m10-l1-resumen-diagnostico":
    "Diagnóstico completo consolidado. Tienes una visión clara de todo el trabajo hecho.",
  "m10-l2-objetivos-90-dias":
    "Objetivos de 90 días fijados. Específicos, no deseos.",
  "m10-l3-plan-semanal":
    "Plan semanal diseñado. Lo que no está en la agenda no existe.",
  "m10-l4-seguimiento":
    "Sistema de seguimiento establecido. Ahora puedes saber si avanzas o no.",
};

// ── Por módulo ───────────────────────────────────────────────────────────────
// Mensaje que aparece al completar el último ejercicio del módulo.

export const MENSAJE_MODULO_DEFAULT =
  "Módulo completado. Has terminado una parte crítica del trabajo real.";

export const MENSAJES_MODULO: Record<string, string> = {
  "modulo-1-mentalidad":
    "Has completado el punto de partida. Sin esto, todo lo demás es decoración.",
  "modulo-2-diagnostico":
    "Diagnóstico terminado. Ya sabes exactamente dónde está el problema.",
  "modulo-3-finanzas":
    "Las finanzas están sobre la mesa. Ahora cada decisión tiene base real.",
  "modulo-4-precios":
    "Precios revisados. A partir de aquí, cada venta tiene sentido económico.",
  "modulo-5-operaciones":
    "Operaciones estructuradas. Tu negocio puede funcionar sin que estés en todo.",
  "modulo-6-equipo":
    "Equipo analizado. Las personas correctas en los puestos correctos.",
  "modulo-7-ventas":
    "Sistema de ventas definido. Captar clientes ya no depende del azar.",
  "modulo-8-marketing":
    "Posicionamiento claro. Lo que dices sobre tu negocio ahora tiene fuerza.",
  "modulo-9-estrategia":
    "Estrategia trazada. Sabes hacia dónde vas y por qué.",
  "modulo-10-plan-accion":
    "Has completado el programa. Lo que tienes ahora es un plan, no intenciones.",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getMensajeLeccion(lessonSlug: string): string {
  return MENSAJES_LECCION[lessonSlug] ?? MENSAJE_LECCION_DEFAULT;
}

export function getMensajeModulo(moduleSlug: string): string {
  return MENSAJES_MODULO[moduleSlug] ?? MENSAJE_MODULO_DEFAULT;
}
