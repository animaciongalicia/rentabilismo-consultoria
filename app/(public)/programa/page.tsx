import { CheckCircle, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

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

const QUE_TRABAJAMOS = [
  { area: "Mentalidad", texto: "El punto de partida. Sin esto, lo demás no sirve." },
  { area: "Diagnóstico", texto: "Qué está funcionando, qué no y por qué." },
  { area: "Finanzas", texto: "Dónde entra y dónde se va el dinero realmente." },
  { area: "Precios", texto: "Si estás cobrando lo que vale lo que haces." },
  { area: "Operaciones", texto: "Cómo dejar de ser imprescindible para todo." },
  { area: "Equipo", texto: "Si tienes las personas correctas en los puestos correctos." },
  { area: "Ventas", texto: "Cómo conseguir clientes que valgan la pena." },
  { area: "Marketing", texto: "Cómo te posicionas y qué percepción genera tu negocio." },
  { area: "Estrategia", texto: "Hacia dónde vas y si el camino tiene sentido." },
  { area: "Plan de acción", texto: "Qué vas a hacer, en qué orden y con qué recursos." },
];

export default function ProgramaPage({
  searchParams,
}: {
  searchParams: Promise<{ pago?: string }>;
}) {
  return (
    <div>
      <section style={{ borderBottom: "1px solid var(--border)", padding: "4rem 3.5rem 3rem", maxWidth: "740px" }}>
        <CancelBanner searchParams={searchParams} />

        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>
          El Programa
        </div>

        <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "1rem" }}>
          Solo para empresarios<br />que quieren cambiar de verdad.
        </h1>

        <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, maxWidth: "560px" }}>
          Rentabilismo no es un curso. Es un proceso de consultoría guiada en el que
          tú diagnosticas tu negocio, identificas lo que hay que cambiar y ejecutas
          con estructura. Nosotros acompañamos. Tú decides y actúas.
        </p>
      </section>

      <section style={{ padding: "3.5rem 3.5rem", maxWidth: "740px" }}>

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

        {/* Las 10 áreas */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>
            Las 10 áreas del programa
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.625rem" }}>
            {QUE_TRABAJAMOS.map((item, i) => (
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
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.825rem", marginBottom: "0.2rem" }}>{item.area}</div>
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
              "Acceso completo a los 10 módulos desde el primer día",
              "Avanza a tu ritmo, sin fechas límite ni presión",
              "Acceso permanente — el programa es tuyo para siempre",
              "Sin suscripciones ni pagos adicionales",
            ].map(item => (
              <div key={item} style={{ display: "flex", gap: "0.75rem", fontSize: "0.875rem", color: "var(--muted)" }}>
                <span style={{ color: "var(--foreground)", fontWeight: 700, flexShrink: 0 }}>—</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* CTA — sin precio visible */}
        <div style={{ padding: "2rem", border: "1px solid var(--foreground)", backgroundColor: "var(--card)" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.625rem" }}>
            ¿Listo para empezar?
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Si llevas leyendo esta página y algo te ha resonado, ese es el indicativo.
            El primer paso es registrarte. Si ya tienes cuenta, puedes acceder directamente al programa.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <CheckoutButton />
            <Link href="/registro" className="btn-outline">
              Crear cuenta primero
            </Link>
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
