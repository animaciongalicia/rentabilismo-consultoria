import { CheckCircle, ArrowRight, AlertCircle, Lock, Gift } from "lucide-react";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";
import { PRECIO_PROGRAMA } from "@/config/opciones";

export const metadata = {
  title: "El Programa — Rentabilismo",
  description: "Un proceso de consultoría guiada para empresarios que quieren entender y cambiar su negocio de verdad.",
};

const PARA_QUIEN = [
  "Llevas tiempo sintiendo que trabajas mucho para lo que ganas",
  "Quieres entender de verdad cómo funciona (o no funciona) tu negocio",
  "Estás dispuesto a hacer preguntas incómodas y actuar en función de las respuestas",
  "Buscas acompañamiento real, no teoría ni motivación vacía",
];

// El Punto de Partida está marcado como gratuito al crear cuenta
const MODULO_CERO = { area: "El Punto de Partida", texto: "Mentalidad empresarial. Sin esto, lo demás no sirve.", gratis: true };

const MODULOS_PAGO = [
  { area: "Diagnóstico de Rentabilidad", texto: "Qué está funcionando, qué no y por qué. La radiografía honesta de tu negocio." },
  { area: "Finanzas", texto: "Números que importan: márgenes, costes, flujo de caja y dónde se va el dinero realmente." },
  { area: "Producto y Servicio", texto: "Qué vendes exactamente, a quién y si lo estás posicionando y enfocando bien." },
  { area: "Estrategia de Precios", texto: "Si estás cobrando lo que vale lo que haces y cómo corregirlo sin perder clientes." },
  { area: "Operaciones y Procesos", texto: "Cómo dejar de ser imprescindible para todo y construir una empresa que funcione sin ti." },
  { area: "Equipo y Liderazgo", texto: "Si tienes las personas correctas en los puestos correctos y cómo gestionarlo bien." },
  { area: "Ventas y Captación", texto: "Cómo convertir interés en clientes que pagan, con un proceso claro y sin presión." },
  { area: "Marketing y Posicionamiento", texto: "Cómo te percibe el mercado, qué mensaje transmites y por qué te eligen a ti." },
  { area: "Estrategia y Crecimiento", texto: "Hacia dónde vas, si el camino tiene sentido y cómo priorizar lo que de verdad importa." },
  { area: "Tu Plan de Acción", texto: "Qué vas a cambiar, en qué orden, con qué recursos y con qué métricas lo medirás." },
];

export default function ProgramaPage({
  searchParams,
}: {
  searchParams: Promise<{ pago?: string }>;
}) {
  return (
    <div>
      <section style={{ borderBottom: "1px solid var(--border)", padding: "clamp(2rem, 5vw, 4rem) clamp(1.25rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)", maxWidth: "920px" }}>
        <CancelBanner searchParams={searchParams} />

        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>
          El Programa
        </div>

        <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "1rem" }}>
          Solo para empresarios que quieren cambiar de verdad.
        </h1>

        <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, maxWidth: "680px" }}>
          Rentabilismo no es un curso. Es un proceso de consultoría guiada en el que
          tú diagnosticas tu negocio, identificas lo que hay que cambiar y ejecutas
          con estructura. Nosotros acompañamos. Tú decides y actúas.
        </p>
      </section>

      <section style={{ padding: "clamp(1.5rem, 5vw, 3.5rem)", maxWidth: "920px" }}>

        {/* ¿Para quién es? */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>
            Es para ti si
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {PARA_QUIEN.map(item => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
                <CheckCircle size={16} strokeWidth={2} style={{ flexShrink: 0, marginTop: "2px" }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Aviso honesto */}
        <div style={{ marginBottom: "3rem", padding: "1.25rem 1.5rem", border: "1px solid var(--border)", backgroundColor: "var(--card)", fontSize: "0.875rem", lineHeight: 1.7, color: "var(--muted)" }}>
          <strong style={{ color: "var(--foreground)", display: "block", marginBottom: "0.375rem" }}>
            Y no es para ti si buscas resultados sin esfuerzo.
          </strong>
          Este proceso exige que estés dispuesto a mirar tu negocio sin filtros y a
          cambiar lo que no funciona aunque lleve tiempo haciéndolo así. Si no estás
          en ese momento, no pasa nada. Vuelve cuando lo estés.
        </div>

        {/* Los 11 módulos del programa */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>
            Los 11 módulos del programa
          </div>
          <div style={{ fontSize: "0.775rem", color: "var(--muted)", marginBottom: "1rem" }}>
            El primer módulo está incluido gratis al crear tu cuenta. El resto se desbloquea con el acceso completo.
          </div>

          {/* Módulo 0 — full width */}
          <div style={{
            display: "flex",
            gap: "0.875rem",
            padding: "1rem 1.25rem",
            border: "1px solid var(--foreground)",
            backgroundColor: "var(--card)",
            marginBottom: "0.625rem",
          }}>
            <div style={{ fontSize: "0.6rem", fontWeight: 800, color: "var(--muted)", minWidth: "18px", paddingTop: "2px" }}>
              00
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                <div style={{ fontWeight: 700, fontSize: "0.825rem" }}>{MODULO_CERO.area}</div>
                <span style={{
                  fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.06em",
                  textTransform: "uppercase", color: "#16a34a",
                  border: "1px solid #16a34a", padding: "0.1rem 0.35rem",
                  borderRadius: "2px", display: "flex", alignItems: "center", gap: "0.2rem",
                }}>
                  <Gift size={9} /> Gratis
                </span>
              </div>
              <div style={{ fontSize: "0.775rem", color: "var(--muted)" }}>{MODULO_CERO.texto}</div>
            </div>
          </div>

          {/* Módulos 1-10 — 2 columnas */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "0.625rem" }}>
            {MODULOS_PAGO.map((item, i) => (
              <div key={item.area} style={{
                display: "flex",
                gap: "0.875rem",
                padding: "0.875rem 1rem",
                border: "1px solid var(--border)",
                backgroundColor: "var(--card)",
              }}>
                <div style={{ fontSize: "0.6rem", fontWeight: 800, color: "var(--muted)", minWidth: "18px", paddingTop: "2px" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.825rem" }}>{item.area}</div>
                    <span style={{
                      fontSize: "0.55rem", fontWeight: 600, color: "var(--muted)",
                      display: "flex", alignItems: "center", gap: "0.2rem",
                    }}>
                      <Lock size={9} /> Acceso completo
                    </span>
                  </div>
                  <div style={{ fontSize: "0.775rem", color: "var(--muted)" }}>{item.texto}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cómo funciona el acceso */}
        <div style={{ marginBottom: "3rem", borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>
            Cómo funciona el acceso
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[
              "Crea tu cuenta gratis — accede a El Punto de Partida de inmediato.",
              "Si el programa encaja contigo, desbloquea los 10 módulos restantes con un pago único.",
              "Acceso permanente — el programa es tuyo para siempre, sin suscripciones.",
              "Sin letra pequeña ni pagos adicionales.",
            ].map(item => (
              <div key={item} style={{ display: "flex", gap: "0.75rem", fontSize: "0.875rem", color: "var(--muted)" }}>
                <span style={{ color: "var(--foreground)", fontWeight: 700, flexShrink: 0 }}>—</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* CTA principal — flujo claro en dos pasos */}
        <div style={{ padding: "2rem", border: "1px solid var(--foreground)", backgroundColor: "var(--card)" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.625rem" }}>
            ¿Listo para empezar?
          </h2>

          {/* Paso 1: cuenta gratis */}
          <div style={{ marginBottom: "1.5rem", padding: "1.25rem", border: "1px solid var(--border)", backgroundColor: "var(--background)" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>
              Paso 1 — Gratis
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Crea tu cuenta y accede a "El Punto de Partida" (Mentalidad) sin pagar nada.
              Si te convence, das el siguiente paso.
            </p>
            <Link href="/registro" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              Crear cuenta gratis <ArrowRight size={14} />
            </Link>
            <div style={{ marginTop: "0.625rem", fontSize: "0.725rem", color: "var(--muted)" }}>
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" style={{ color: "var(--foreground)", fontWeight: 600, textDecoration: "underline" }}>
                Inicia sesión
              </Link>
            </div>
          </div>

          {/* Paso 2: acceso completo */}
          <div style={{ padding: "1.25rem", border: "1px solid var(--border)", backgroundColor: "var(--background)" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>
              Paso 2 — {PRECIO_PROGRAMA} € · Pago único
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Desbloquea los 10 módulos de pago. Acceso permanente, sin suscripciones.
              Si ya tienes cuenta, haz clic aquí para pagar directamente.
            </p>
            <CheckoutButton />
          </div>

          <p style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--muted)" }}>
            Pago único. Acceso permanente. Sin letra pequeña.
          </p>
        </div>

      </section>
    </div>
  );
}

async function CancelBanner({ searchParams }: { searchParams: Promise<{ pago?: string }> }) {
  const params = await searchParams;
  if (params.pago !== "cancelado") return null;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "0.625rem",
      padding: "0.75rem 1rem", border: "1px solid #e8c56a",
      backgroundColor: "#fffbf0", marginBottom: "2rem",
      fontSize: "0.825rem", fontWeight: 600, color: "#8a6a00",
    }}>
      <AlertCircle size={15} />
      Cancelaste el proceso. Aquí seguimos cuando quieras.
    </div>
  );
}
