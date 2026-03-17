import Link from "next/link";
import { ArrowRight, CheckCircle, Lock } from "lucide-react";

export const metadata = {
  title: "Bienvenido a Rentabilismo",
  description: "Has dado el primer paso. Ahora empieza el trabajo real.",
};

const MODULOS_LIBRES = [
  { titulo: "El Punto de Partida", sub: "Mentalidad y modelo mental", libre: true },
];

const MODULOS_9 = [
  "Diagnóstico de Rentabilidad",
  "Finanzas reales",
  "Producto y Servicio",
  "Estrategia de Precios",
  "Marketing y Publicidad",
  "Procesos y Operaciones",
  "Personas y Equipo",
  "Ventas",
  "Estrategia y Crecimiento",
];

export default function BienvenidaPage() {
  return (
    <div style={{ padding: "3rem 3.5rem", maxWidth: "860px" }}>

      {/* Eyebrow */}
      <div style={{
        fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em",
        textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
      }}>
        Ya eres parte de Rentabilismo
      </div>

      {/* Titular */}
      <h1 style={{
        fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
        marginBottom: "1rem", lineHeight: 1.15,
        letterSpacing: "-0.03em",
      }}>
        Bienvenido. Esto no es un curso.
      </h1>

      {/* Mensaje directo */}
      <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "0.875rem", maxWidth: "600px" }}>
        Lo que acabas de abrir es un proceso de consultoría guiada. No hay vídeos de motivación,
        no hay teoría vacía, no hay promesas de hacerte rico rápido.
      </p>
      <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "600px" }}>
        Hay preguntas incómodas, ejercicios que obligan a pensar y un método que ha funcionado
        con empresarios reales. Lo que hagas con eso depende de ti.
      </p>

      {/* Lo que empieza ahora */}
      <div style={{
        border: "1px solid var(--border)", backgroundColor: "var(--card)",
        padding: "1.5rem", marginBottom: "2rem", maxWidth: "600px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem",
        }}>
          Lo que empieza ahora
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            "El Punto de Partida — tu primer módulo, gratuito, ya disponible.",
            "4 lecciones para ver cómo estás pensando sobre tu negocio y qué cambiar primero.",
            "Ejercicios escritos que nadie va a leer por ti. Tú los haces, tú los aprovechas.",
            "Sin presión, sin fechas límite. Este es tu proceso.",
          ].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
              <CheckCircle size={15} strokeWidth={2} style={{ flexShrink: 0, marginTop: "3px", color: "#16a34a" }} />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Aviso confirmación email — Rentabilismo lo requiere */}
      <div style={{
        padding: "0.875rem 1rem",
        border: "1px solid #e8c56a",
        backgroundColor: "#fffbf0",
        marginBottom: "1.5rem",
        fontSize: "0.825rem",
        lineHeight: 1.6,
        color: "#7a5500",
        maxWidth: "600px",
      }}>
        <strong style={{ display: "block", marginBottom: "0.25rem" }}>
          Revisa tu email antes de entrar.
        </strong>
        Rentabilismo requiere que confirmes tu dirección antes de acceder al programa.
        Busca el correo de confirmación y haz clic en el enlace.{" "}
        <span style={{ fontSize: "0.75rem", color: "#8a6a00" }}>¿No lo ves? Revisa spam.</span>
      </div>

      {/* CTA */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "3rem" }}>
        <Link href="/registro" className="btn-primary" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "0.875rem 1.5rem", fontSize: "0.95rem", fontWeight: 800,
          letterSpacing: "0.01em", width: "fit-content",
        }}>
          Únete <ArrowRight size={16} />
        </Link>
        <div style={{ fontSize: "0.775rem", color: "var(--muted)" }}>
          ¿Ya confirmaste?{" "}
          <Link href="/login" style={{ color: "var(--foreground)", fontWeight: 600, textDecoration: "underline" }}>
            Entra con tu cuenta
          </Link>
        </div>
      </div>

      {/* Separador */}
      <div style={{ borderTop: "1px solid var(--border)", marginBottom: "2.5rem" }} />

      {/* Programa completo */}
      <div>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
        }}>
          Lo que te espera cuando estés listo
        </div>

        {/* Módulo 1 — ancho completo, libre */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "1rem",
          padding: "0.875rem 1.25rem",
          border: "1px solid var(--foreground)",
          marginBottom: "0.5rem",
          flexWrap: "wrap",
        }}>
          <div>
            <div style={{ fontSize: "0.825rem", fontWeight: 700 }}>El Punto de Partida</div>
            <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Mentalidad y modelo mental · 4 lecciones</div>
          </div>
          <span style={{
            fontSize: "0.6rem", fontWeight: 900, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#16a34a", border: "1px solid #16a34a",
            padding: "0.2rem 0.6rem",
          }}>
            Libre
          </span>
        </div>

        {/* Módulos 2–10 — 3 columnas */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.5rem",
          marginBottom: "0.5rem",
        }}>
          {MODULOS_9.map(mod => (
            <div key={mod} style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.625rem 0.875rem",
              border: "1px solid var(--border)",
              fontSize: "0.775rem", color: "var(--muted)",
            }}>
              <Lock size={10} style={{ color: "#444", flexShrink: 0 }} />
              {mod}
            </div>
          ))}
        </div>

        {/* Plan de Acción — ancho completo, cierre */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "1rem",
          padding: "0.875rem 1.25rem",
          border: "1px solid var(--border)",
          backgroundColor: "var(--card)",
          flexWrap: "wrap",
        }}>
          <div>
            <div style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--muted)" }}>Tu Plan de Acción</div>
            <div style={{ fontSize: "0.75rem", color: "#555" }}>El cierre del proceso — todo confluye aquí</div>
          </div>
          <Lock size={12} style={{ color: "#444", flexShrink: 0 }} />
        </div>

        <p style={{ marginTop: "1rem", fontSize: "0.775rem", color: "var(--muted)", lineHeight: 1.6 }}>
          10 módulos desbloqueables con un solo pago.{" "}
          <Link href="/programa" style={{ color: "var(--foreground)", fontWeight: 600, textDecoration: "underline" }}>
            Ver el programa completo
          </Link>
        </p>
      </div>

    </div>
  );
}
