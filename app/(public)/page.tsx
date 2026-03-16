import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight } from "lucide-react";

async function getUserCount(): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true });
  return count ?? 0;
}

export default async function HomePage() {
  const userCount = await getUserCount();

  return (
    <div>

      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "5rem 3.5rem 4rem",
        maxWidth: "920px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.75rem",
        }}>
          Rentabilismo — Consultoría Guiada
        </div>

        <h1 style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          lineHeight: 1.18,
          marginBottom: "1.5rem",
        }}>
          Mejora tu forma de pensar la empresa.{" "}
          <span style={{ borderBottom: "3px solid var(--foreground)", paddingBottom: "2px" }}>
            El resto vendrá detrás.
          </span>
        </h1>

        <p style={{
          fontSize: "1.05rem",
          color: "var(--muted)",
          lineHeight: 1.8,
          maxWidth: "700px",
          marginBottom: "2.25rem",
        }}>
          No es un curso más. Es un sistema de trabajo para empresarios que quieren
          sentirse tranquilos con sus números, orgullosos de su empresa y con un
          método claro para decidir.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/registro" className="btn-primary">
            Empezar ahora{" "}
            <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle", marginLeft: "0.3rem" }} />
          </Link>
          <Link href="/como-funciona" className="btn-outline">
            Ver cómo funciona
          </Link>
        </div>
      </section>

      {/* ── 2. QUÉ ES / QUÉ NO ES ─────────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "4rem 3.5rem",
        maxWidth: "860px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "2.5rem",
        }}>
          El programa
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0",
          border: "1px solid var(--border)",
          overflow: "hidden",
        }}>
          {/* Qué ES */}
          <div style={{ padding: "2.5rem", borderRight: "1px solid var(--border)" }}>
            <div style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", marginBottom: "1.5rem",
              color: "var(--foreground)",
            }}>
              ✓ Qué es Rentabilismo
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                "Un programa de consultoría guiada en 10 módulos para revisar tu negocio en profundidad.",
                "Un sistema de trabajo que te pide 2 horas a la semana para tomar decisiones con calma, no para apagar fuegos.",
                "Un espacio donde ordenas tus ideas, tus números y tus prioridades con método.",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{
                    width: "18px", height: "18px", backgroundColor: "var(--foreground)",
                    color: "var(--background)", fontSize: "0.6rem", fontWeight: 900,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "2px",
                  }}>✓</span>
                  <span style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "var(--foreground)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Qué NO ES */}
          <div style={{ padding: "2.5rem", backgroundColor: "var(--card)" }}>
            <div style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", marginBottom: "1.5rem",
              color: "var(--muted)",
            }}>
              ✗ Qué no es Rentabilismo
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                "No es motivación barata.",
                "No es un curso que ves y olvidas.",
                "No es contenido genérico: trabajas con datos reales de tu empresa y solo tú ves el diagnóstico completo.",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{
                    width: "18px", height: "18px", border: "1px solid var(--border)",
                    color: "var(--muted)", fontSize: "0.7rem", fontWeight: 900,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "2px",
                  }}>✗</span>
                  <span style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "var(--muted)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 3. ACCESO — PAGO ÚNICO, PARA TODA LA VIDA ─────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "4rem 3.5rem",
        maxWidth: "920px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "2rem",
        }}>
          Acceso
        </div>

        <h2 style={{
          fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
          lineHeight: 1.25,
          marginBottom: "1.5rem",
        }}>
          Un solo pago. Un sistema vivo para toda tu vida empresarial.
        </h2>

        <div style={{
          fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.9,
          maxWidth: "700px", marginBottom: "2.5rem",
        }}>
          <p style={{ marginBottom: "1rem" }}>
            Rentabilismo recoge más de 25 años de trabajo con empresas reales
            empaquetado en una herramienta que vas a poder usar una y otra vez.
          </p>
          <p style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: "0.75rem" }}>
            Pagas una sola vez y obtienes:
          </p>
          <ul style={{ paddingLeft: "1.25rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li>Acceso completo a los 10 módulos de consultoría guiada.</li>
            <li>Todas las mejoras futuras del programa sin coste extra: nuevos casos prácticos, nuevas herramientas y sesiones de ayuda en directo.</li>
            <li>Un espacio privado donde guardar tus diagnósticos, decisiones y planes de acción a lo largo del tiempo.</li>
          </ul>
        </div>

        {/* Tarjeta de precio */}
        <div style={{
          border: "2px solid var(--foreground)",
          padding: "2rem 2.25rem",
          maxWidth: "460px",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}>
          <div style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: "0.25rem",
          }}>
            Precio de acceso
          </div>

          <div style={{ fontSize: "0.85rem", color: "var(--muted)", textDecoration: "line-through" }}>
            Valor real en consultoría individual: más de 2.000 €
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span style={{ fontSize: "2.5rem", fontWeight: 900, lineHeight: 1 }}>799 €</span>
            <span style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 600 }}>
              — acceso de por vida
            </span>
          </div>

          <p style={{
            fontSize: "0.775rem", color: "var(--muted)", lineHeight: 1.65,
            padding: "0.75rem 0", borderTop: "1px solid var(--border)",
          }}>
            A medida que incorporemos más casos sectoriales, herramientas y soporte,
            el precio irá subiendo. Si ya estás dentro, tu acceso no cambia.
          </p>

          <Link href="/programa" className="btn-primary" style={{ textAlign: "center" }}>
            Acceder al programa{" "}
            <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle", marginLeft: "0.3rem" }} />
          </Link>
        </div>
      </section>

      {/* ── 4. COMUNIDAD Y PRÓXIMO PASO ────────────────────────── */}
      <section style={{ padding: "4rem 3.5rem", maxWidth: "920px" }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "2rem",
        }}>
          La comunidad
        </div>

        <p style={{
          fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
          fontWeight: 700, lineHeight: 1.45,
          marginBottom: "1.25rem",
        }}>
          Ya hay{" "}
          <span style={{
            borderBottom: "2px solid var(--foreground)",
            paddingBottom: "1px",
          }}>
            {userCount} empresarios
          </span>{" "}
          trabajando con Rentabilismo para ordenar sus números, sus decisiones y su tiempo.
        </p>

        <p style={{
          fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.75,
          marginBottom: "2.5rem", maxWidth: "700px",
        }}>
          Si estás aquí es porque sabes que tu empresa puede estar mejor y quieres
          hacerlo con método, sin humo y a tu ritmo.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", alignItems: "flex-start" }}>
          <Link href="/registro" className="btn-primary">
            Crear cuenta gratuita{" "}
            <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle", marginLeft: "0.3rem" }} />
          </Link>
          <Link href="/login" style={{
            fontSize: "0.775rem", color: "var(--muted)",
            textDecoration: "none", borderBottom: "1px dotted var(--muted)",
            paddingBottom: "1px",
          }}>
            Ya tengo cuenta · Entrar
          </Link>
        </div>
      </section>

    </div>
  );
}
