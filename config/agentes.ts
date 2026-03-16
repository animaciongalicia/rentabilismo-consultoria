// ── Configuración de los 10 Agentes Rentabilistas ────────────────────────────
// Para añadir o editar un agente: modificar este array.
// Cada agente genera automáticamente su ruta /app/cuartel-general/[slug].

export type Agente = {
  slug:          string;
  nombre:        string;
  descripcion:   string;   // 1 frase para la tarjeta del grid
  contexto:      string;   // Párrafo explicativo en la página del agente
  placeholder:   string;   // Texto de ayuda en el textarea
  modulo:        string;   // Módulo relacionado (referencia, no enlace forzado)
};

export const AGENTES: Agente[] = [
  {
    slug:        "agente-precios",
    nombre:      "Agente Precios",
    descripcion: "Fija o ajusta tus precios con criterio real y sin perder margen.",
    contexto:    "Analiza tu estructura de costes, el valor percibido por el cliente y el posicionamiento de mercado para ayudarte a fijar precios que sean justos, competitivos y rentables. Identifica si estás cobrando demasiado poco, demasiado poco o en el lugar equivocado.",
    placeholder: "Ej: Tengo un servicio de diseño web que cobro a 800€ pero no sé si es suficiente. Mis costes fijos son… y tardo una media de X horas.",
    modulo:      "Módulo 4 – Estrategia de Precios",
  },
  {
    slug:        "agente-escandallos",
    nombre:      "Agente Escandallos",
    descripcion: "Calcula el coste real de cada producto o servicio con precisión.",
    contexto:    "Te ayuda a desgranar el coste total de lo que produces o vendes: materias primas, mano de obra, costes indirectos y mermas. Con un escandallo bien hecho sabrás exactamente cuánto te cuesta hacer lo que haces y cuánto margen real te queda.",
    placeholder: "Ej: Tengo un plato de menú (o un producto/servicio). Los ingredientes/materiales cuestan X, tardo Y horas en hacerlo y tengo estos costes fijos…",
    modulo:      "Módulo 3 – Control Financiero",
  },
  {
    slug:        "agente-competencia",
    nombre:      "Agente Competencia",
    descripcion: "Analiza tu competencia y encuentra tu ventaja diferencial real.",
    contexto:    "Te ayuda a estructurar un análisis de competencia útil y honesto: qué ofrecen, a qué precio, cómo se posicionan y dónde están los huecos que tú puedes ocupar. No se trata de copiarles, sino de entender el tablero para jugar mejor.",
    placeholder: "Ej: Mis competidores directos son X, Y, Z. Cobran X, ofrecen esto… Yo me diferencio (o creo diferenciarme) en…",
    modulo:      "Módulo 9 – Estrategia y Crecimiento",
  },
  {
    slug:        "agente-captacion",
    nombre:      "Agente Captación",
    descripcion: "Diseña acciones concretas para atraer clientes sin depender del azar.",
    contexto:    "Te ayuda a pensar y estructurar tu sistema de captación de clientes: qué canales usar, cómo generar confianza antes de la venta y qué pasos dar para que nuevos clientes te encuentren y quieran trabajar contigo.",
    placeholder: "Ej: Ahora mismo mis clientes llegan por… Quiero conseguir X clientes nuevos en 60 días. Mi ticket medio es… y mi cliente ideal es…",
    modulo:      "Módulo 7 – Ventas y Captación",
  },
  {
    slug:        "agente-finanzas",
    nombre:      "Agente Finanzas",
    descripcion: "Interpreta tus números y detecta dónde se escapa la rentabilidad.",
    contexto:    "Te ayuda a leer e interpretar tus datos financieros básicos: ingresos, gastos, margen, punto de equilibrio y flujo de caja. Si los números no cuadran o no entiendes por qué no queda dinero, este agente te ayuda a encontrar la fuga.",
    placeholder: "Ej: Facturo X al mes, mis gastos fijos son Y, y sin embargo a final de mes no me queda nada. ¿Dónde puede estar el problema?",
    modulo:      "Módulo 3 – Control Financiero",
  },
  {
    slug:        "agente-operaciones",
    nombre:      "Agente Operaciones",
    descripcion: "Identifica cuellos de botella y elimina tareas que no generan valor.",
    contexto:    "Te ayuda a mapear cómo funciona tu negocio por dentro: qué procesos existen, cuáles te roban tiempo sin dar resultado, dónde se rompe la cadena y qué se podría delegar, automatizar o eliminar directamente.",
    placeholder: "Ej: El proceso que más me ahoga es… Tardo X horas semanales en Y tarea. Lo que más me interrumpe es… Lo que nadie más sabe hacer en mi empresa es…",
    modulo:      "Módulo 5 – Operaciones y Procesos",
  },
  {
    slug:        "agente-equipo",
    nombre:      "Agente Equipo",
    descripcion: "Resuelve problemas de liderazgo, delegación y cultura interna.",
    contexto:    "Te ayuda a pensar con claridad sobre las personas que forman tu equipo: cómo liderar sin microgestionar, cómo delegar de verdad, cómo afrontar conversaciones difíciles y cómo construir un equipo que no dependa de ti para cada pequeña decisión.",
    placeholder: "Ej: El problema con mi equipo ahora mismo es… Tengo X personas. El cargo que más problemas me da es… Lo que no soy capaz de delegar es…",
    modulo:      "Módulo 6 – Equipo y Liderazgo",
  },
  {
    slug:        "agente-propuesta-valor",
    nombre:      "Agente Propuesta de Valor",
    descripcion: "Define con claridad qué te hace diferente y por qué deben elegirte.",
    contexto:    "Te ayuda a articular tu propuesta de valor de forma concisa, honesta y memorable. Qué problema resuelves, para quién, de qué manera diferente y por qué alguien debería elegirte a ti en lugar de a cualquier otro.",
    placeholder: "Ej: Mi negocio es… Me dirijo a… El problema que resuelvo es… Me diferencio de la competencia en que… pero no sé cómo comunicarlo bien.",
    modulo:      "Módulo 8 – Marketing y Posicionamiento",
  },
  {
    slug:        "agente-marketing",
    nombre:      "Agente Marketing",
    descripcion: "Construye mensajes y acciones de marketing que venden sin ruido.",
    contexto:    "Te ayuda a diseñar mensajes claros que conecten con tu cliente ideal, elegir los canales donde tiene sentido estar y planificar acciones de marketing que no dependan de que te vean muchos, sino de que te elijan los correctos.",
    placeholder: "Ej: Ahora mismo mi marketing consiste en… No estoy consiguiendo… Mi cliente ideal es… y el mensaje con el que intento llegar a él es…",
    modulo:      "Módulo 8 – Marketing y Posicionamiento",
  },
  {
    slug:        "agente-plan-accion",
    nombre:      "Agente Plan de Acción",
    descripcion: "Convierte diagnósticos y decisiones en un plan concreto y ejecutable.",
    contexto:    "Te ayuda a transformar lo que sabes que hay que hacer en pasos concretos, ordenados por impacto y viabilidad. Sin excesos de planificación, sin parálisis por análisis. Un plan que puedas empezar a ejecutar esta semana.",
    placeholder: "Ej: Sé que tengo que mejorar en X, Y y Z pero no sé por dónde empezar. Mi situación ahora mismo es… y lo que quiero conseguir en 60 días es…",
    modulo:      "Módulo 10 – Tu Plan de Acción",
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
