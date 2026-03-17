import Link from "next/link";
import { ArrowRight, CheckCircle, Lock } from "lucide-react";

export const metadata = {
  title: "Bienvenido a Rentabilismo",
  description: "Has dado el primer paso. Ahora empieza el trabajo real.",
};

// Esta página aparece después del registro (con o sin confirmación de email).
// Si Supabase tiene autoconfirm ON → el usuario puede entrar directamente al app.
// Si Supabase tiene autoconfirm OFF → debe confirmar el email primero.
export default function BienvenidaPage({
  searchParams,
}: {
  searchParams: Promise<{ confirmed?: string }>;
}) {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "clamp(3rem, 6vw, 6rem) clamp(1.25rem, 5vw, 2rem)" }}>

      {/* Eyebrow */}
      <div style={{
        fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em",
        textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
      }}>
        Ya eres parte de Rentabilismo
      </div>

      {/* Titular */}
      <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", marginBottom: "1rem", lineHeight: 1.15 }}>
        Bienvenido. Esto no es un curso.
      </h1>

      {/* Mensaje directo */}
      <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "0.875rem" }}>
        Lo que acabas de abrir es un proceso de consultoría guiada. No hay vídeos de motivación,
        no hay teoría vacía, no hay promesas de hacerte rico rápido.
      </p>
      <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
        Hay preguntas incómodas, ejercicios que obligan a pensar y un método que ha funcionado
        con empresarios reales. Lo que hagas con eso depende de ti.
      </p>

      {/* Lo que viene ahora */}
      <div style={{
        border: "1px solid var(--border)", backgroundColor: "var(--card)",
        padding: "1.5rem", marginBottom: "2rem",
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
            "4 lecciones sobre cómo piensan los empresarios que escalan (y cómo dejan de hacerlo).",
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

      {/* Aviso de email si aplica */}
      <ConfirmacionEmailAviso />

      {/* CTA principal */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <Link href="/app/modulos/modulo-1-mentalidad" className="btn-primary" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "0.875rem 1.5rem", fontSize: "0.95rem", fontWeight: 800,
          letterSpacing: "0.01em",
        }}>
          Empezar El Punto de Partida <ArrowRight size={16} />
        </Link>
        <div style={{ fontSize: "0.775rem", color: "var(--muted)" }}>
          O{" "}
          <Link href="/login" style={{ color: "var(--foreground)", fontWeight: 600, textDecoration: "underline" }}>
            entra con tu cuenta
          </Link>
          {" "}si ya confirmaste el email.
        </div>
      </div>

      {/* Separador */}
      <div style={{ borderTop: "1px solid var(--border)", margin: "2.5rem 0" }} />

      {/* Programa completo — visión a futuro */}
      <div>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem",
        }}>
          Lo que te espera cuando estés listo
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: "0.5rem" }}>
          {[
            "Diagnóstico de Rentabilidad",
            "Finanzas reales",
            "Producto y Servicio",
            "Estrategia de Precios",
            "Marketing y Publicidad",
            "Procesos y Operaciones",
            "Personas y Equipo",
            "Ventas",
            "Estrategia y Crecimiento",
            "Tu Plan de Acción",
          ].map(mod => (
            <div key={mod} style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.5rem 0.75rem",
              border: "1px solid var(--border)",
              fontSize: "0.775rem", color: "#555",
            }}>
              <Lock size={10} style={{ color: "#444", flexShrink: 0 }} />
              {mod}
            </div>
          ))}
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

// Aviso de confirmación de email (solo si Supabase tiene confirmación activa)
async function ConfirmacionEmailAviso() {
  return (
    <div style={{
      padding: "0.875rem 1rem",
      border: "1px solid #e8c56a",
      backgroundColor: "#fffbf0",
      marginBottom: "1.5rem",
      fontSize: "0.825rem",
      lineHeight: 1.6,
      color: "#7a5500",
    }}>
      <strong style={{ display: "block", marginBottom: "0.25rem" }}>
        Revisa tu email antes de entrar.
      </strong>
      Si Supabase requiere confirmación, haz clic en el enlace que te hemos enviado
      y vuelve aquí. Si ya lo hiciste, pulsa "Empezar" directamente.
      <br />
      <span style={{ fontSize: "0.75rem", color: "#8a6a00" }}>¿No lo ves? Revisa spam.</span>
    </div>
  );
}
