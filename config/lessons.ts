// config/lessons.ts
// Fuente de verdad para lecciones y ejercicios de todos los módulos.
// Usada tanto en el frontend como para sembrar las tablas `lessons` y
// `lesson_exercises` en Supabase.

export interface ExerciseConfig {
  exerciseKey: string;  // "principal" | "extra-1" | …
  prompt: string;
  orderIndex: number;
}

export interface LessonConfig {
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  intro: string;  // Párrafo introductorio corto que se muestra antes de los ejercicios
  orderIndex: number;
  exercises: ExerciseConfig[];
}

export const LESSONS_CONFIG: LessonConfig[] = [

  // ── MÓDULO 1: MENTALIDAD EMPRESARIAL ──────────────────────────
  {
    moduleSlug: "modulo-1-mentalidad",
    lessonSlug: "m1-l1-modelo-mental",
    title: "Tu modelo mental actual",
    intro: "Todo empresario tiene una historia que se cuenta sobre su empresa. Esa historia determina sus decisiones más que cualquier número. Esta lección te ayuda a hacerla consciente.",
    orderIndex: 1,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Qué historia te cuentas sobre tu empresa que puede que no sea del todo cierta? Escribe sin filtros, lo primero que te venga.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿En qué momento del día o la semana sientes más claridad sobre tu negocio? ¿Qué lo provoca?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-1-mentalidad",
    lessonSlug: "m1-l2-tres-trampas",
    title: "Las tres trampas del empresario",
    intro: "Confundir facturación con beneficio, tomar decisiones por miedo y convertirse en el cuello de botella de la empresa. Tres trampas muy comunes. ¿En cuál estás tú?",
    orderIndex: 2,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿En cuál de las tres trampas (facturación ≠ beneficio, decisiones por miedo, ser imprescindible) te reconoces más? Describe una situación concreta reciente.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Qué tendrías que cambiar en los próximos 30 días para salir de esa trampa? Sé específico.",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-1-mentalidad",
    lessonSlug: "m1-l3-reaccionar-a-decidir",
    title: "De reaccionar a decidir",
    intro: "La mayoría de los empresarios toman decisiones reaccionando al entorno, no desde una posición de calma y estrategia. Esta lección te ayuda a identificar tu patrón y cambiarlo.",
    orderIndex: 3,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Haz un listado de las 5 últimas decisiones importantes que tomaste en tu empresa. ¿Cuántas fueron reactivas y cuántas planificadas?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Qué bloques de tiempo podrías reservar semanalmente para pensar con calma —no para hacer, sino para decidir?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-1-mentalidad",
    lessonSlug: "m1-l4-entorno-energia",
    title: "Tu entorno y energía empresarial",
    intro: "Con quién pasas el tiempo y cómo cuidas tu energía determina la calidad de tus decisiones. Este ejercicio te ayuda a auditar tu entorno profesional.",
    orderIndex: 4,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Qué personas de tu entorno profesional te dan energía y cuáles te la restan? Lista al menos 3 de cada tipo.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Qué hábito sencillo podrías incorporar esta semana para llegar a tus decisiones más descansado y con más perspectiva?",
        orderIndex: 2,
      },
    ],
  },

  // ── MÓDULO 2: DIAGNÓSTICO DE RENTABILIDAD ─────────────────────
  {
    moduleSlug: "modulo-2-diagnostico",
    lessonSlug: "m2-l1-margen-real",
    title: "Tu margen real en euros",
    intro: "El margen bruto es el punto de partida de cualquier análisis de rentabilidad. Sin saber cuánto queda de cada euro que entra, no se puede tomar ninguna decisión financiera sana.",
    orderIndex: 1,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Elige tu producto o servicio más vendido del último trimestre. ¿Cuánto cobras por él y cuánto te cuesta producirlo/entregarlo (tiempo, materiales, subcontratas)? Calcula el margen bruto en euros.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Hay algún servicio o producto que vendas a pérdida o con margen muy bajo sin saberlo hasta ahora? ¿Cuál y por qué crees que sigue en tu catálogo?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-2-diagnostico",
    lessonSlug: "m2-l2-clientes-80-20",
    title: "Clientes que suman y clientes que restan",
    intro: "La regla del 80/20 se cumple en casi todas las carteras de clientes. Saber quién te da más y quién te consume más te permite tomar decisiones de las que nadie habla en los libros de empresa.",
    orderIndex: 2,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Aplica la regla del 80/20 a tu cartera: ¿qué 20% de clientes genera el 80% de tu facturación? Lista los 5 clientes que más aportan y los 5 que más tiempo o conflictos generan.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Existe algún cliente que, si lo perdieras, te aliviaría? Describe por qué y qué harías con ese tiempo liberado.",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-2-diagnostico",
    lessonSlug: "m2-l3-costes-equilibrio",
    title: "Costes fijos y punto de equilibrio",
    intro: "Saber cuánto necesitas facturar para cubrir solo los costes fijos es el dato más básico —y más ignorado— de cualquier negocio. A partir de ese número, todo lo demás tiene sentido.",
    orderIndex: 3,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Lista todos tus costes fijos mensuales (alquiler, nóminas, suscripciones, seguros…). Suma el total. ¿Cuánto tienes que facturar cada mes para cubrir solo eso, sin ganar nada?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Hay algún coste fijo que pagas desde hace tiempo y que ya no aporta valor directo? ¿Qué harías si lo eliminases?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-2-diagnostico",
    lessonSlug: "m2-l4-numero-tranquilidad",
    title: "Tu número de supervivencia mensual",
    intro: "Cada empresario tiene un número que, si lo alcanza, le permite dormir tranquilo. Definirlo con precisión es el primer paso para construir una estrategia coherente.",
    orderIndex: 4,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Define tu 'número de tranquilidad': ¿cuánto necesitas facturar mensualmente para dormir sin pensar en las facturas? ¿Cuántos meses de los últimos 12 lo has alcanzado?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Qué palanca concreta (precio, volumen o reducción de coste) tiene más impacto para llegar a ese número? Describe cómo podrías accionarla en 90 días.",
        orderIndex: 2,
      },
    ],
  },

  // ── MÓDULO 3: CONTROL FINANCIERO ──────────────────────────────
  {
    moduleSlug: "modulo-3-finanzas",
    lessonSlug: "m3-l1-tesoreria-beneficio",
    title: "Tesorería vs beneficio",
    intro: "Una empresa puede ganar dinero en el papel y quedarse sin liquidez para pagar la nómina. Entender esta diferencia no es contabilidad: es supervivencia.",
    orderIndex: 1,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Ha habido algún mes en que tu empresa ganaba dinero en el papel pero no tenías liquidez para pagar? Describe qué pasó y cómo lo resolviste.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Con cuántos días de antelación sabes hoy que vas a tener un problema de tesorería? ¿Qué información necesitarías para saberlo antes?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-3-finanzas",
    lessonSlug: "m3-l2-modelo-ingresos",
    title: "Tu modelo de ingresos",
    intro: "La mayoría de los empresarios saben cuánto facturan pero no entienden la estructura de cuándo y cómo entra ese dinero. Eso es lo que vamos a revisar aquí.",
    orderIndex: 2,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Describe tu flujo de ingresos: ¿de dónde viene el dinero, en qué fechas suele entrar, qué porcentaje es recurrente frente a puntual?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Hay alguna fuente de ingreso recurrente que podrías crear o ampliar en tu negocio actual sin grandes cambios estructurales?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-3-finanzas",
    lessonSlug: "m3-l3-gastos-operativos",
    title: "Control de gastos operativos",
    intro: "Los gastos pequeños y recurrentes son los más peligrosos: nadie los revisa porque individualmente parecen insignificantes. En conjunto, pueden destruir tu margen.",
    orderIndex: 3,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Tienes una revisión mensual de tus gastos operativos? Si sí, ¿qué encontraste en la última? Si no, ¿qué crees que encontrarías si la hicieras ahora?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Cuáles son los 3 gastos sobre los que tienes menos control o visibilidad? ¿Qué necesitarías para tenerlos bajo control?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-3-finanzas",
    lessonSlug: "m3-l4-metricas-clave",
    title: "Métricas financieras clave",
    intro: "No se puede gestionar lo que no se mide. Esta lección identifica las 4-5 métricas que todo empresario debería conocer de su negocio de memoria.",
    orderIndex: 4,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "De estas métricas: margen bruto, margen neto, días de cobro medio, ratio gastos fijos/facturación… ¿cuál NO conoces hoy de tu empresa? ¿Por qué crees que no la has calculado?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "Elige UNA métrica que vayas a empezar a medir este mes. Describe cómo la calcularías y qué harías con esa información.",
        orderIndex: 2,
      },
    ],
  },

  // ── MÓDULO 4: ESTRATEGIA DE PRECIOS ───────────────────────────
  {
    moduleSlug: "modulo-4-precios",
    lessonSlug: "m4-l1-valor-real",
    title: "¿Qué vale lo que vendes?",
    intro: "La mayoría de los precios se fijan mirando a la competencia o sumando costes. Ninguno de esos dos métodos te lleva a un precio que refleje el valor real que aportas.",
    orderIndex: 1,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Tus precios actuales los fijaste mirando a la competencia, calculando costes o pensando en el valor que aportas? Explica cómo llegaste al precio de tu servicio/producto principal.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Hay algo que entregas a tus clientes que tiene un valor muy alto para ellos pero que tú no estás cobrando explícitamente? Descríbelo.",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-4-precios",
    lessonSlug: "m4-l2-estructura-precios",
    title: "Estructura de precios",
    intro: "Un precio sin estructura es una oportunidad perdida. Tener tarifas claras, paquetes bien definidos y condiciones explícitas te ahorra tiempo, negociaciones y malentendidos.",
    orderIndex: 2,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Tienes una estructura de precios clara (tarifas, paquetes, condiciones)? Si sí, descríbela. Si no, ¿cuál es el coste de no tenerla en términos de tiempo y energía?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Qué paquete o formato de tu oferta tiene mejor ratio valor/esfuerzo para ti? ¿Por qué no es el más promocionado?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-4-precios",
    lessonSlug: "m4-l3-comunicar-valor",
    title: "Comunicar valor, no precio",
    intro: "Un cliente que dice 'es caro' no tiene un problema de presupuesto: tiene un problema de percepción de valor. Y eso es responsabilidad de quien vende.",
    orderIndex: 3,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Cuando un cliente dice 'es caro', ¿qué sueles responder? ¿Defiendes el precio con argumentos de valor o acabas haciendo descuento?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "Escribe en 3 frases el resultado concreto que obtiene un cliente que trabaja contigo. Sin adjetivos, solo hechos y beneficios medibles.",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-4-precios",
    lessonSlug: "m4-l4-actualizar-precios",
    title: "Actualizar precios sin perder clientes",
    intro: "Subir precios da miedo. Pero no subirlos cuando los costes aumentan tiene un coste silencioso que pocos calculan. Esta lección te da un método para hacerlo con confianza.",
    orderIndex: 4,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Cuánto tiempo llevas con los mismos precios? ¿Cuánto han subido tus costes en ese período? Haz el cálculo.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "Diseña un mensaje sencillo para comunicar una subida de precio del 10-15% a tus clientes actuales. ¿Qué dirías y cómo lo justificarías?",
        orderIndex: 2,
      },
    ],
  },

  // ── MÓDULO 5: OPERACIONES Y PROCESOS ──────────────────────────
  {
    moduleSlug: "modulo-5-operaciones",
    lessonSlug: "m5-l1-mapa-procesos",
    title: "Tu mapa de procesos",
    intro: "Muchas empresas funcionan por costumbre, no por diseño. Mapear tus procesos es el primer paso para dejar de depender de que las cosas 'siempre se han hecho así'.",
    orderIndex: 1,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Describe el proceso completo desde que un nuevo cliente te contacta hasta que recibes el pago. ¿Cuántos pasos hay? ¿Cuáles son los más lentos o dependen más de ti?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Hay algún proceso que repites más de 3 veces al mes y que no está documentado en ningún sitio? Descríbelo brevemente.",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-5-operaciones",
    lessonSlug: "m5-l2-donde-escapa-tiempo",
    title: "Dónde se escapa el tiempo",
    intro: "El tiempo del empresario es el recurso más escaso y el más mal gestionado. Esta lección te ayuda a ver con claridad en qué estás poniendo tu energía y si vale la pena.",
    orderIndex: 2,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿En qué tareas pasas más tiempo durante la semana? ¿Son de alto valor (solo tú puedes hacerlas) o de bajo valor (otra persona o un sistema podría hacerlas)?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "Si pudieras eliminar o delegar una tarea que haces hoy, ¿cuál sería y qué impacto tendría en tu semana?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-5-operaciones",
    lessonSlug: "m5-l3-sistematizar",
    title: "Procesos que puedes sistematizar",
    intro: "Sistematizar no es burocracia: es liberar tu cabeza de tener que recordar cómo se hacen las cosas. Cada proceso que documentas es un paso hacia una empresa que puede funcionar sin que estés en todo.",
    orderIndex: 3,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Elige un proceso repetitivo de tu empresa. Descríbelo paso a paso como si se lo explicaras a alguien nuevo. ¿Qué información o decisiones faltan para que esa persona lo ejecute sin ti?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Qué plantilla o herramienta podrías crear en los próximos 7 días para hacer ese proceso más automático o independiente de ti?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-5-operaciones",
    lessonSlug: "m5-l4-medir-mejorar",
    title: "Medir para mejorar",
    intro: "Sin métricas operativas, la mejora es aleatoria. Esta lección te ayuda a identificar las señales que realmente indican si tus operaciones están funcionando bien.",
    orderIndex: 4,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Qué métricas operativas mides hoy (tiempo de entrega, tasa de error, satisfacción del cliente)? Si no mides nada, ¿qué consecuencias tiene eso para tus decisiones?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "Elige UNA métrica operativa que empezarás a registrar esta semana. ¿Cómo lo harás y qué umbral te indicaría que algo va mal?",
        orderIndex: 2,
      },
    ],
  },

  // ── MÓDULO 6: EQUIPO Y LIDERAZGO ──────────────────────────────
  {
    moduleSlug: "modulo-6-equipo",
    lessonSlug: "m6-l1-tu-rol-real",
    title: "Tu rol real en la empresa",
    intro: "Muchos empresarios son el empleado más caro de su propia empresa. Antes de hablar de liderazgo, hay que ser honesto sobre qué estás haciendo realmente cada día.",
    orderIndex: 1,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Cuál es tu función real en la empresa hoy? ¿Qué porcentaje de tu tiempo dedicas a trabajar EN el negocio (tareas operativas) frente a trabajar EL negocio (decisiones y estrategia)?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "Si mañana no pudieras trabajar durante un mes, ¿qué se pararía? ¿Qué seguiría funcionando? ¿Qué te dice eso sobre tu empresa?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-6-equipo",
    lessonSlug: "m6-l2-quien-hace-que",
    title: "Quién hace qué y por qué",
    intro: "En muchas empresas pequeñas, las responsabilidades están repartidas por costumbre o necesidad, no por diseño. Eso genera huecos, duplicidades y confusión que nadie quiere nombrar.",
    orderIndex: 2,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Lista las personas de tu equipo (o colaboradores externos). Para cada una: ¿qué hace bien, qué no hace bien y su rol está claramente definido?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Hay alguna responsabilidad en tu empresa que nadie tiene asignada claramente? ¿Qué problemas concretos genera eso?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-6-equipo",
    lessonSlug: "m6-l3-conversaciones-pendientes",
    title: "Conversaciones difíciles pendientes",
    intro: "Cada conversación que pospones con alguien de tu equipo tiene un coste: en rendimiento, en confianza y en tu propia energía. Esta lección te ayuda a preparar las que llevas posponiendo.",
    orderIndex: 3,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Hay alguna conversación que estás posponiendo con alguien de tu equipo? (Sin nombres.) ¿Qué te ha impedido tenerla y cuánto te está costando no tenerla?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Qué dirías en esa conversación si supieras que va a ir bien? Escribe el guion en 5 frases.",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-6-equipo",
    lessonSlug: "m6-l4-cultura-resultados",
    title: "Cultura de resultados",
    intro: "La cultura de una empresa no se declara: se practica. Cómo reconoces el buen trabajo, cómo gestionas el error y qué toleras día a día define más tu empresa que cualquier valor escrito en la pared.",
    orderIndex: 4,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Cómo defines el buen rendimiento en tu equipo? ¿Lo saben ellos? ¿Qué métricas o señales usas para valorar si alguien está haciendo bien su trabajo?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Qué reconocimiento o feedback positivo das a tu equipo cuando las cosas van bien? ¿Y cuando no van bien, cómo lo gestionas?",
        orderIndex: 2,
      },
    ],
  },

  // ── MÓDULO 7: VENTAS Y CAPTACIÓN ──────────────────────────────
  {
    moduleSlug: "modulo-7-ventas",
    lessonSlug: "m7-l1-proceso-venta",
    title: "Tu proceso de venta actual",
    intro: "La venta sin proceso es ruleta. Saber exactamente qué pasa desde el primer contacto hasta el cierre te permite identificar dónde se pierden las oportunidades —y hay siempre uno o dos pasos que lo explican todo.",
    orderIndex: 1,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Describe tu proceso de venta actual: desde el primer contacto hasta el cierre. ¿Cuántos pasos hay? ¿En qué paso pierdes más oportunidades?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Cuál es tu tasa de cierre aproximada? De cada 10 propuestas que envías, ¿cuántas acaban en venta? ¿Qué crees que determina el sí o el no?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-7-ventas",
    lessonSlug: "m7-l2-origen-clientes",
    title: "De dónde vienen tus clientes",
    intro: "Muchos empresarios no saben con precisión de dónde vienen sus clientes. Saber eso —y si es algo que controlas— es la diferencia entre tener una estrategia de captación y esperar que las cosas pasen.",
    orderIndex: 2,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿De dónde vienen el 80% de tus clientes actuales? (Referidos, redes sociales, publicidad, presencia directa, web…) ¿Es algo que controlas o simplemente 'pasa'?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Qué canal de captación ha funcionado mejor en los últimos 12 meses y en cuál has invertido más tiempo o dinero? ¿Coinciden?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-7-ventas",
    lessonSlug: "m7-l3-cliente-ideal",
    title: "El cliente ideal que quieres",
    intro: "No todos los clientes son buenos clientes. Definir con precisión a quién quieres —y a quién no— te permite construir un negocio que disfrutas, no uno que aguantas.",
    orderIndex: 3,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Describe a tu cliente ideal en términos concretos: sector, tamaño, problema que tiene, cómo toma decisiones, por qué te elegiría. Si tienes varios tipos, elige el que más te gustaría tener.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Tu cartera actual se parece a ese cliente ideal? ¿Qué porcentaje sí y qué porcentaje no? ¿Qué consecuencias tiene esa diferencia en tu día a día?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-7-ventas",
    lessonSlug: "m7-l4-propuesta-valor",
    title: "Tu propuesta de valor",
    intro: "Una propuesta de valor no es un eslogan: es la respuesta a '¿por qué debo elegirte a ti y no a otro?'. Si esa respuesta no es clara y diferenciada, el precio siempre será el factor decisivo.",
    orderIndex: 4,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Completa esta frase en máximo 2 líneas: 'Ayudo a [tipo de cliente] a conseguir [resultado concreto] a través de [método/producto], a diferencia de [alternativas] que [limitación de esas alternativas]'.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "Si un cliente potencial te pregunta '¿por qué debo elegirte a ti y no a otro?', ¿qué respondes? ¿Es suficientemente diferenciador o es lo mismo que dice cualquier competidor?",
        orderIndex: 2,
      },
    ],
  },

  // ── MÓDULO 8: MARKETING Y POSICIONAMIENTO ─────────────────────
  {
    moduleSlug: "modulo-8-marketing",
    lessonSlug: "m8-l1-percepcion-mercado",
    title: "Cómo te percibe el mercado",
    intro: "La distancia entre cómo crees que te perciben y cómo realmente te perciben es donde se esconden los problemas de posicionamiento. Esta lección te ayuda a reducir esa distancia.",
    orderIndex: 1,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Cómo crees que te perciben tus clientes actuales? ¿Y los potenciales que aún no te contratan? ¿Tienes algún dato o feedback que lo respalde?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Hay una brecha entre cómo quieres que te perciban y cómo crees que realmente te perciben? Descríbela con honestidad.",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-8-marketing",
    lessonSlug: "m8-l2-mensaje-central",
    title: "Tu mensaje central",
    intro: "Un mensaje claro y consistente en todos tus canales genera confianza. La inconsistencia —decir cosas distintas en distintos sitios— genera confusión, aunque el servicio sea excelente.",
    orderIndex: 2,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Tienes un mensaje claro y consistente en todos tus canales? Si alguien leyera tu web hoy, ¿entendería en 10 segundos qué haces, para quién y por qué eres diferente?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "Escribe en 1 párrafo el mensaje central que quieres que transmita tu marca. Sin jerga técnica, como si se lo explicaras a un amigo.",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-8-marketing",
    lessonSlug: "m8-l3-canales",
    title: "Canales donde estás y donde deberías estar",
    intro: "Estar en todos lados sin foco es peor que no estar en ninguno. Esta lección te ayuda a auditar tus canales actuales y decidir dónde concentrar tu energía.",
    orderIndex: 3,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Lista los canales de comunicación/marketing que usas hoy. Para cada uno: ¿cuánto tiempo/dinero inviertes y qué resultados concretos te da?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "Si tuvieras que elegir solo 2 canales para los próximos 6 meses, ¿cuáles elegirías y por qué? ¿Cómo cambiaría eso tu plan actual?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-8-marketing",
    lessonSlug: "m8-l4-contenido-que-atrae",
    title: "Contenido que atrae al cliente correcto",
    intro: "El mejor contenido de marketing no habla de ti: habla de los problemas de tu cliente con una precisión que le hace pensar 'esto es exactamente lo que me pasa'. Eso solo se consigue con experiencia real.",
    orderIndex: 4,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Qué tipo de contenido o mensaje resuena más con tus mejores clientes actuales? (Lo que comparten, comentan, o lo que les llevó a contactarte.)",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "Diseña 3 ideas de contenido que podrías crear este mes y que reflejen tu experiencia real, no contenido genérico. ¿En qué formato y canal los publicarías?",
        orderIndex: 2,
      },
    ],
  },

  // ── MÓDULO 9: ESTRATEGIA Y CRECIMIENTO ────────────────────────
  {
    moduleSlug: "modulo-9-estrategia",
    lessonSlug: "m9-l1-donde-quieres-llegar",
    title: "Dónde estás y dónde quieres llegar",
    intro: "Sin un destino claro, cualquier camino parece válido. Definir con un número concreto dónde quieres estar en 12 meses no es optimismo: es la condición mínima para construir una estrategia.",
    orderIndex: 1,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Define con un número concreto dónde quieres estar en 12 meses: facturación, margen, número de clientes, horas trabajadas… el que más importa para ti ahora mismo.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Dónde estás hoy en esa misma métrica? ¿Qué brecha hay y qué te ha impedido cerrarla en los últimos 12 meses?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-9-estrategia",
    lessonSlug: "m9-l2-que-necesitas-crecer",
    title: "Qué necesitas para crecer",
    intro: "El crecimiento no lo limita la ambición: lo limita un recurso concreto —tiempo, capital, talento o sistema. Identificar cuál es el tuyo es más valioso que cualquier plan de negocio.",
    orderIndex: 2,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Cuál es el recurso que más limita tu crecimiento ahora mismo: tiempo, capital, talento, clientes, sistemas o algo más? Explica por qué es ese y no otro.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Qué inversión (en tiempo, dinero o energía) tendría el mayor retorno en tu empresa en los próximos 6 meses? ¿Por qué no la has hecho ya?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-9-estrategia",
    lessonSlug: "m9-l3-riesgos-frenos",
    title: "Riesgos y frenos al crecimiento",
    intro: "Crecer sin gestionar los riesgos es construir sobre arena. Esta lección te ayuda a nombrar los frenos reales —los que nunca se dicen en voz alta— antes de que se conviertan en problemas.",
    orderIndex: 3,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "¿Qué es lo que más te preocupa que podría salir mal si tu empresa crece? (Más clientes, más equipo, más deuda, pérdida de control…) Nómbralo.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Hay alguna dependencia crítica en tu empresa (un cliente con más del 30% de tus ingresos, un empleado insustituible)? ¿Qué plan tienes si eso falla?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-9-estrategia",
    lessonSlug: "m9-l4-hoja-ruta-12-meses",
    title: "Tu hoja de ruta a 12 meses",
    intro: "Una hoja de ruta no es una lista de deseos: es un conjunto de hitos concretos, medibles y ordenados en el tiempo. Esta lección te ayuda a construir la tuya.",
    orderIndex: 4,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Escribe los 3 hitos más importantes que quieres haber logrado en 12 meses. Para cada uno: qué es, cómo sabrás que lo has conseguido y qué primer paso darás esta semana.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Qué tendrías que dejar de hacer para poder enfocarte en esos 3 hitos? ¿Hay proyectos, clientes o actividades que consumen energía sin aportar valor al objetivo?",
        orderIndex: 2,
      },
    ],
  },

  // ── MÓDULO 10: TU PLAN DE ACCIÓN ──────────────────────────────
  {
    moduleSlug: "modulo-10-plan-accion",
    lessonSlug: "m10-l1-tres-decisiones",
    title: "Las 3 decisiones más importantes ahora",
    intro: "Después de 9 módulos de diagnóstico y reflexión, llega el momento de priorizar. No puedes actuar en todo a la vez: esta lección te ayuda a identificar qué tres decisiones tienen más impacto ahora mismo.",
    orderIndex: 1,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "De todo lo que has trabajado en los 9 módulos anteriores, ¿cuáles son las 3 decisiones más importantes que tienes que tomar en tu empresa este trimestre? Escríbelas con claridad.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "Para cada una de esas 3 decisiones, ¿qué información o recurso necesitas para tomarla? ¿Está en tu mano conseguirlo?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-10-plan-accion",
    lessonSlug: "m10-l2-plan-90-dias",
    title: "Tu plan de los próximos 90 días",
    intro: "90 días es el horizonte de tiempo más útil para la mayoría de los empresarios: suficientemente cerca para ser concreto y suficientemente largo para ver resultados reales.",
    orderIndex: 2,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Diseña tu plan de los próximos 90 días: ¿qué vas a hacer diferente? ¿Qué proyectos priorizas, cuáles pausas y cuáles eliminas definitivamente?",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Quién en tu entorno (equipo, asesor, mentor, pareja, socio) tiene que conocer este plan y apoyarlo? ¿Cómo se lo vas a comunicar?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-10-plan-accion",
    lessonSlug: "m10-l3-metricas-seguimiento",
    title: "Métricas de seguimiento",
    intro: "Un plan sin métricas de seguimiento es solo un deseo. Esta lección te ayuda a definir los indicadores que te dirán, mes a mes, si vas en la dirección correcta.",
    orderIndex: 3,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Elige las 3-5 métricas que revisarás cada mes para saber si tu empresa va bien. Para cada una: nombre, cómo se calcula, umbral aceptable y señal de alarma.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Cuándo vas a hacer tu primera revisión mensual de estas métricas? Pon una fecha concreta. ¿Qué formato tendrá (reunión, dashboard, documento)?",
        orderIndex: 2,
      },
    ],
  },
  {
    moduleSlug: "modulo-10-plan-accion",
    lessonSlug: "m10-l4-compromiso-empresarial",
    title: "Tu compromiso empresarial",
    intro: "Este es el cierre del programa. No el final, sino el comienzo del trabajo real. Esta lección es un espacio para consolidar lo que has aprendido y comprometerte contigo mismo.",
    orderIndex: 4,
    exercises: [
      {
        exerciseKey: "principal",
        prompt: "Escribe una carta breve (5-10 líneas) dirigida a ti mismo dentro de 12 meses. Describe cómo quieres que esté tu empresa, cómo te sientes y qué has aprendido de este proceso.",
        orderIndex: 1,
      },
      {
        exerciseKey: "extra-1",
        prompt: "¿Qué le dirías al empresario que eras cuando empezaste este programa? ¿Qué cambia en ti a partir de hoy?",
        orderIndex: 2,
      },
    ],
  },
];

// Helpers

export function getLessonsForModule(moduleSlug: string): LessonConfig[] {
  return LESSONS_CONFIG
    .filter(l => l.moduleSlug === moduleSlug)
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

export function getLesson(moduleSlug: string, lessonSlug: string): LessonConfig | undefined {
  return LESSONS_CONFIG.find(l => l.moduleSlug === moduleSlug && l.lessonSlug === lessonSlug);
}
