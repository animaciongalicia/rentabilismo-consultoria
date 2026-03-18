// ── Configuración de los 12 Agentes Rentabilistas ────────────────────────────
// Para añadir o editar un agente: modificar este array.
// Cada agente genera automáticamente su ruta /app/cuartel-general/[slug].

export type Agente = {
  slug:          string;
  nombre:        string;
  etiqueta?:     string;      // Nombre descriptivo opcional (se muestra bajo el nombre principal)
  descripcion:   string;      // 1 frase para la tarjeta del grid
  contexto:      string;      // Explicación de para qué sirve el agente (página individual)
  instrucciones: string;      // Cómo usarlo en ChatGPT
  preguntasGuia: string[];    // 3-4 preguntas para trabajar con él
  prompt:        string;      // Prompt listo para crear el agente en ChatGPT
  chatgptUrl:    string;      // Enlace al agente en el Marketplace de ChatGPT
  placeholder?:  string;      // @deprecated — ya no se usa
  modulo:        string;      // Módulo relacionado (referencia, no enlace forzado)
};

export const AGENTES: Agente[] = [
  {
    slug:        "agente-mentalidad",
    nombre:      "El Espejo",
    etiqueta:    "Mentalidad",
    descripcion: "Identifica las creencias y patrones que frenan tu negocio sin que te des cuenta.",
    contexto:    "Te ayuda a hacer consciente el modelo mental con el que gestionas tu empresa: las historias que te cuentas, las decisiones que tomas por miedo y los hábitos que perpetúan los problemas. No para hacer terapia, sino para que puedas cambiar lo que hay que cambiar.",
    instrucciones: "Abre el agente en ChatGPT y cuéntale una situación concreta de tu negocio que te genere bloqueo, estrés o que lleves tiempo evitando. No hace falta que tengas la respuesta: él te hará preguntas. Respóndelas con honestidad, aunque incomoden.",
    preguntasGuia: [
      "¿Qué decisión llevo más de un mes sin tomar?",
      "¿Qué me cuento a mí mismo cuando algo en el negocio sale mal?",
      "¿Qué haría si supiera que no voy a fracasar?",
      "¿Qué parte de mi negocio no quiero analizar honestamente?",
    ],
    prompt:      "",
    chatgptUrl:  "",
    modulo:      "El Punto de Partida",
  },
  {
    slug:        "agente-precios",
    nombre:      "¿Y Si Subes El Precio?",
    etiqueta:    "Precios",
    descripcion: "Fija o ajusta tus precios con criterio real y sin perder margen.",
    contexto:    "Analiza tu estructura de costes, el valor percibido por el cliente y el posicionamiento de mercado para ayudarte a fijar precios que sean justos, competitivos y rentables. Identifica si estás cobrando demasiado poco, demasiado o en el lugar equivocado.",
    instrucciones: "Empieza compartiendo qué vendes, a qué precio y cuáles son tus costes más importantes. El agente te pedirá más detalles si los necesita y te ayudará a evaluar si tu precio actual tiene sentido o dónde hay margen de mejora.",
    preguntasGuia: [
      "¿Cuándo fue la última vez que subí mis precios?",
      "¿Sé con certeza cuánto me cuesta producir o prestar cada servicio?",
      "¿Dónde está el límite que mis clientes pagarían sin pestañear?",
      "¿Estoy compitiendo por precio o por valor?",
    ],
    prompt:      "",
    chatgptUrl:  "",
    modulo:      "Módulo 4 – Estrategia de Precios",
  },
  {
    slug:        "agente-escandallos",
    nombre:      "El Coste Real",
    etiqueta:    "Dineros",
    descripcion: "Calcula el coste real de cada producto o servicio con precisión.",
    contexto:    "Te ayuda a desgranar el coste total de lo que produces o vendes: materias primas, mano de obra, costes indirectos y mermas. Con los números bien hechos sabrás exactamente cuánto te cuesta hacer lo que haces y cuánto margen real te queda.",
    instrucciones: "Dile al agente qué producto o servicio quieres analizar y comparte todos los costes que conoces: materiales, tiempo, gastos indirectos. Él te guiará para completar el escandallo y calcular el margen real.",
    preguntasGuia: [
      "¿Sé exactamente cuánto me cuesta hacer lo que vendo?",
      "¿Incluyo mi tiempo en el cálculo del coste?",
      "¿Qué productos o servicios sospecho que no son rentables?",
      "¿Con qué margen mínimo podría trabajar sin perder?",
    ],
    prompt:      "",
    chatgptUrl:  "",
    modulo:      "Módulo 3 – Control Financiero",
  },
  {
    slug:        "agente-competencia",
    nombre:      "¿Por Qué No Te Eligen?",
    etiqueta:    "Competencia",
    descripcion: "Analiza tu competencia y encuentra tu ventaja diferencial real.",
    contexto:    "Te ayuda a estructurar un análisis de competencia útil y honesto: qué ofrecen, a qué precio, cómo se posicionan y dónde están los huecos que tú puedes ocupar. No se trata de copiarles, sino de entender el tablero para jugar mejor.",
    instrucciones: "Describe a tus dos o tres competidores más directos: qué ofrecen, a qué precio y cómo se presentan. El agente estructurará el análisis e identificará dónde tienes ventaja real y dónde hay huecos sin cubrir.",
    preguntasGuia: [
      "¿A quién pierde clientes mi negocio con más frecuencia?",
      "¿Qué hacen mis competidores mejor que yo?",
      "¿Qué hueco del mercado nadie está cubriendo bien?",
      "¿Qué piensan mis clientes de la competencia cuando me lo dicen?",
    ],
    prompt:      "",
    chatgptUrl:  "",
    modulo:      "Módulo 9 – Estrategia y Crecimiento",
  },
  {
    slug:        "agente-captacion",
    nombre:      "De Dónde Vienen Tus Clientes",
    etiqueta:    "Captación",
    descripcion: "Diseña acciones concretas para atraer clientes sin depender del azar.",
    contexto:    "Te ayuda a pensar y estructurar tu sistema de captación de clientes: qué canales usar, cómo generar confianza antes de la venta y qué pasos dar para que nuevos clientes te encuentren y quieran trabajar contigo.",
    instrucciones: "Explica cómo llegan tus clientes ahora y cuántos necesitas conseguir. El agente te ayudará a diseñar un sistema de captación paso a paso, adaptado a tu tipo de negocio y cliente.",
    preguntasGuia: [
      "¿Cuántos clientes nuevos conseguí el mes pasado y cómo?",
      "¿Tengo un proceso claro o cada cliente llega de forma diferente?",
      "¿Cuánto me cuesta conseguir un cliente nuevo?",
      "¿Qué canal de captación ha funcionado mejor y por qué lo he abandonado?",
    ],
    prompt:      "",
    chatgptUrl:  "",
    modulo:      "Módulo 7 – Ventas y Captación",
  },
  {
    slug:        "agente-finanzas",
    nombre:      "¿Por Qué No Queda Nada?",
    etiqueta:    "Finanzas",
    descripcion: "Interpreta tus números y detecta dónde se escapa la rentabilidad.",
    contexto:    "Te ayuda a leer e interpretar tus datos financieros básicos: ingresos, gastos, margen, punto de equilibrio y flujo de caja. Si los números no cuadran o no entiendes por qué no queda dinero, este agente te ayuda a encontrar la fuga.",
    instrucciones: "Comparte tus cifras: facturación mensual, gastos fijos, lo que sobra (o no). Cuantos más datos le des, más preciso será. El agente detectará dónde se escapa el dinero y qué métricas hay que vigilar.",
    preguntasGuia: [
      "¿Sé cuál es mi punto de equilibrio mensual?",
      "¿Conozco mi margen real, no solo mi facturación?",
      "¿Qué gasto podría eliminar sin que afecte a la operativa?",
      "¿Por qué facturar más no siempre resuelve el problema?",
    ],
    prompt:      "",
    chatgptUrl:  "",
    modulo:      "Módulo 3 – Control Financiero",
  },
  {
    slug:        "agente-operaciones",
    nombre:      "Lo Que Te Roba El Tiempo",
    etiqueta:    "Operaciones",
    descripcion: "Identifica cuellos de botella y elimina tareas que no generan valor.",
    contexto:    "Te ayuda a mapear cómo funciona tu negocio por dentro: qué procesos existen, cuáles te roban tiempo sin dar resultado, dónde se rompe la cadena y qué se podría delegar, automatizar o eliminar directamente.",
    instrucciones: "Describe el proceso que más tiempo te roba o que más problemas genera. El agente identificará qué puede eliminarse, delegarse o sistematizarse para que el negocio funcione mejor sin depender tanto de ti.",
    preguntasGuia: [
      "¿Cuántas horas semanales dedico a tareas que no necesitan hacerlas yo?",
      "¿Qué pasaría en mi negocio si yo desapareciera dos semanas?",
      "¿Qué proceso se rompe o falla con más frecuencia?",
      "¿Qué haría si tuviera solo 4 horas al día para trabajar?",
    ],
    prompt:      "",
    chatgptUrl:  "",
    modulo:      "Módulo 5 – Operaciones y Procesos",
  },
  {
    slug:        "agente-equipo",
    nombre:      "Por Qué No Puedes Irte",
    etiqueta:    "Equipo",
    descripcion: "Resuelve problemas de liderazgo, delegación y cultura interna.",
    contexto:    "Te ayuda a pensar con claridad sobre las personas que forman tu equipo: cómo liderar sin microgestionar, cómo delegar de verdad, cómo afrontar conversaciones difíciles y cómo construir un equipo que no dependa de ti para cada pequeña decisión.",
    instrucciones: "Comparte una situación concreta de tu equipo: alguien que no rinde, una tarea que no puedes delegar, una conversación que llevas tiempo evitando. El agente te ayuda a pensar con claridad cómo actuar.",
    preguntasGuia: [
      "¿Qué tarea sigo haciendo yo porque nadie más lo hace bien?",
      "¿Hay alguna conversación con alguien del equipo que llevo tiempo evitando?",
      "¿Mis colaboradores saben exactamente qué se espera de ellos?",
      "¿Cómo reacciono cuando algo sale mal y alguien de mi equipo falla?",
    ],
    prompt:      "",
    chatgptUrl:  "",
    modulo:      "Módulo 6 – Equipo y Liderazgo",
  },
  {
    slug:        "agente-propuesta-valor",
    nombre:      "¿Por Qué Tú?",
    etiqueta:    "Propuesta de Valor",
    descripcion: "Define con claridad qué te hace diferente y por qué deben elegirte.",
    contexto:    "Te ayuda a articular tu propuesta de valor de forma concisa, honesta y memorable. Qué problema resuelves, para quién, de qué manera diferente y por qué alguien debería elegirte a ti en lugar de a cualquier otro.",
    instrucciones: "Explica a qué te dedicas, para quién y qué problema resuelves. El agente te hará preguntas para ayudarte a articular tu propuesta de valor de forma que sea clara, diferente y memorable.",
    preguntasGuia: [
      "Si un cliente me pregunta '¿por qué tú?', ¿tengo una respuesta honesta y concisa?",
      "¿Qué cambia en la vida de mi cliente después de trabajar conmigo?",
      "¿En qué soy objetivamente diferente, no solo 'mejor' o 'más barato'?",
      "¿Mi cliente ideal ve mi propuesta de valor antes de hablar conmigo?",
    ],
    prompt:      "",
    chatgptUrl:  "",
    modulo:      "Módulo 8 – Marketing y Posicionamiento",
  },
  {
    slug:        "agente-marketing",
    nombre:      "Ruido o Señal",
    etiqueta:    "Marketing",
    descripcion: "Construye mensajes y acciones de marketing que venden sin ruido.",
    contexto:    "Te ayuda a diseñar mensajes claros que conecten con tu cliente ideal, elegir los canales donde tiene sentido estar y planificar acciones de marketing que no dependan de que te vean muchos, sino de que te elijan los correctos.",
    instrucciones: "Comparte qué acciones de marketing haces hoy y qué resultado están dando. El agente analizará si tiene sentido para tu negocio y te ayudará a priorizar lo que realmente funciona.",
    preguntasGuia: [
      "¿Qué acción de marketing ha traído más clientes en el último año?",
      "¿Estoy en los canales donde está mi cliente ideal o donde están todos?",
      "¿Mi mensaje de marketing explica qué problema resuelvo o solo describe lo que hago?",
      "¿Qué haría diferente si tuviera que conseguir 5 clientes esta semana?",
    ],
    prompt:      "",
    chatgptUrl:  "",
    modulo:      "Módulo 8 – Marketing y Posicionamiento",
  },
  {
    slug:        "agente-evaluador-ideas",
    nombre:      "¿Negocio o Hobby?",
    etiqueta:    "Evaluador de Ideas",
    descripcion: "Analiza si una idea de negocio tiene sentido real antes de que inviertas tiempo y dinero.",
    contexto:    "Te ayuda a evaluar cualquier idea de negocio con criterio: si hay mercado real, si los números pueden cuadrar, si tienes la capacidad para ejecutarla y cuáles son los riesgos principales. No se trata de entusiasmar ni de desanimar, sino de ver la idea con claridad antes de comprometerse.",
    instrucciones: "Describe la idea que quieres evaluar: en qué consiste, a quién va dirigida, cuánto crees que pagarían y qué te genera más dudas. El agente la analiza con criterio real para que veas si tiene sentido antes de comprometerte.",
    preguntasGuia: [
      "¿Hay personas que ya están pagando por algo parecido?",
      "¿Estoy enamorado de la idea o del problema que resuelve?",
      "¿Qué tendría que ser verdad para que esta idea funcione?",
      "¿Qué riesgo no estoy queriendo ver?",
    ],
    prompt:      "",
    chatgptUrl:  "",
    modulo:      "Módulo 9 – Estrategia y Crecimiento",
  },
  {
    slug:        "agente-ventas-sin-vender",
    nombre:      "Cierra Sin Perseguir",
    etiqueta:    "Ventas",
    descripcion: "Cierra más sin presionar: vende desde la confianza, no desde la insistencia.",
    contexto:    "Te ayuda a repensar tu proceso de venta para que el cliente llegue a la decisión de compra de forma natural. Cómo generar confianza antes de la conversación, cómo hacer preguntas que abren en lugar de cerrar, cómo tratar las objeciones sin parecer un vendedor y cómo cerrar sin forzar.",
    instrucciones: "Explica cómo es tu proceso de venta actual, desde el primer contacto hasta el cierre. Comparte también las objeciones más frecuentes que recibes. El agente identifica qué cambiar para que cierres más sin forzar.",
    preguntasGuia: [
      "¿Cuántos presupuestos o propuestas envío por cada cliente que cierra?",
      "¿Cuál es la objeción más frecuente que recibo y cómo la manejo?",
      "¿Hay clientes que deciden comprar solos, sin que yo tenga que insistir?",
      "¿Qué me impide pedir el cierre de forma natural?",
    ],
    prompt:      "",
    chatgptUrl:  "",
    modulo:      "Módulo 7 – Ventas y Captación",
  },
];

// Herramientas externas gratuitas
export const HERRAMIENTAS_EXTERNAS = [
  {
    nombre:      "Diagnóstico Empresarial",
    subtitulo:   "rentabilismo.online",
    descripcion: "Radiografía rápida de tu empresa para ver dónde se te va el dinero.",
    url:         "https://rentabilismo.online",
  },
  {
    nombre:      "Cliente Ideal",
    subtitulo:   "avatar-rentabilismo.com",
    descripcion: "Define con precisión a quién le vendes y por qué te compra.",
    url:         "https://avatar-rentabilismo.com",
  },
  {
    nombre:      "Ideas de Negocio",
    subtitulo:   "idea-rentabilismo.com",
    descripcion: "Analiza y evalúa nuevas ideas antes de invertir tiempo y dinero.",
    url:         "https://idea-rentabilismo.com",
  },
];
