import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Cómo se trabaja aquí — Rentabilismo",
  description: "No vas a ver vídeos y ya está. Aquí vienes a sentarte una vez a la semana, mirar tu negocio con calma y tomar decisiones que se noten en la cuenta corriente.",
};

export default async function ComoFuncionaPage() {
  // Verificar si el usuario está logueado para el CTA del Módulo 1
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const modulo1Href = user ? "/app/modulos/modulo-1-mentalidad" : "/registro";

  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "3rem 3.5rem 2.5rem",
        maxWidth: "920px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem",
        }}>
          Cómo funciona
        </div>
        <h1 style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          lineHeight: 1.15,
          marginBottom: "1.5rem",
        }}>
          Cómo se trabaja aquí.
        </h1>
        <p style={{
          fontSize: "1.1rem",
          color: "#333",
          lineHeight: 1.8,
        }}>
          No vas a ver vídeos y ya está. Aquí vienes a sentarte una vez a la semana,
          mirar tu negocio con calma y tomar decisiones que se noten en la cuenta corriente.
        </p>
      </section>

      {/* ── 1. QUÉ ES UNA CONSULTORÍA GUIADA ────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "2.5rem 3.5rem",
        maxWidth: "860px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
        }}>
          Qué es esto
        </div>
        <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", marginBottom: "1.5rem" }}>
          No es un curso. Es un proceso.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
          {[
            "Rentabilismo está pensado para que trabajes sobre tu empresa, no sobre ejemplos inventados.",
            "Yo marco el camino con 10 módulos y preguntas concretas.",
            "Tú traes tus números, tus dudas y tus decisiones. Nadie lo hace por ti, pero no estás solo.",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "0.875rem", fontSize: "0.95rem", lineHeight: 1.7 }}>
              <span style={{ fontWeight: 800, color: "var(--muted)", flexShrink: 0, paddingTop: "2px", fontSize: "0.75rem" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ color: "var(--foreground)" }}>{item}</span>
            </div>
          ))}
        </div>

        <p style={{
          fontSize: "0.95rem",
          color: "#333",
          lineHeight: 1.8,
          maxWidth: "680px",
          padding: "1.25rem",
          border: "1px solid var(--border)",
          backgroundColor: "var(--card)",
        }}>
          Piensa en esto como una consultoría premium empaquetada: mismo criterio,
          mismo método, pero a tu ritmo, sin tener que cuadrar agendas ni enseñar
          tus papeles a nadie.
        </p>
      </section>

      {/* ── 2. EL RITMO DE TRABAJO ───────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "2.5rem 3.5rem",
        maxWidth: "860px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
        }}>
          El ritmo
        </div>
        <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", marginBottom: "1.5rem" }}>
          3 horas a la semana. En 2 meses, mejoras notables.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "1.5rem" }}>
          {[
            { n: "01", txt: "Cada módulo arranca con un vídeo de 10–12 minutos: el problema, el enfoque y qué puedes esperar cambiar." },
            { n: "02", txt: "Después vienen 4–5 lecciones de teoría y trabajo real: textos claros, ejemplos de empresa y ejercicios con tus datos." },
            { n: "03", txt: "Si reservas 3 horas a la semana, en el primer mes implementas mejoras concretas. En el segundo mes ajustas y refinas." },
            { n: "04", txt: "En 2 meses tienes mejoras notables. No promesas: decisiones tomadas, números revisados y procesos cambiados." },
          ].map((item, i, arr) => (
            <div key={i} style={{
              display: "flex",
              gap: "1.25rem",
              padding: "1rem 0",
              borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                width: "26px", height: "26px", flexShrink: 0,
                backgroundColor: "var(--foreground)", color: "var(--background)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.65rem", fontWeight: 800,
              }}>
                {item.n}
              </div>
              <p style={{ fontSize: "0.9rem", color: "#333", lineHeight: 1.7, margin: 0, paddingTop: "2px" }}>
                {item.txt}
              </p>
            </div>
          ))}
        </div>

        <p style={{
          fontSize: "0.9rem",
          color: "var(--foreground)",
          lineHeight: 1.75,
          maxWidth: "620px",
          fontWeight: 500,
        }}>
          No se trata de encontrar tiempo, se trata de reservarlo. Tres horas a la semana
          para pensar, decidir y arreglar cosas que llevas meses posponiendo.
        </p>
      </section>

      {/* ── 3. DENTRO DE CADA MÓDULO ─────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "2.5rem 3.5rem",
        maxWidth: "860px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
        }}>
          Dentro de cada módulo
        </div>
        <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", marginBottom: "1.5rem" }}>
          Cada módulo tiene cuatro capas.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", border: "1px solid var(--border)", backgroundColor: "var(--border)", marginBottom: "1.5rem" }}>
          {[
            {
              n: "01",
              titulo: "Entender",
              texto: "Vídeo de 10–12 minutos. El problema, el enfoque, qué vas a trabajar.",
            },
            {
              n: "02",
              titulo: "Procesar",
              texto: "Lecciones para que te veas reflejado: preguntas, casos reales y errores típicos.",
            },
            {
              n: "03",
              titulo: "Actuar",
              texto: "Ejercicios con tus datos reales: precios, gastos, equipo, procesos, márgenes.",
            },
            {
              n: "04",
              titulo: "Revisar y ajustar",
              texto: "Vuelves al módulo cuando tu empresa cambia y actualizas tus respuestas. El ciclo no termina.",
            },
          ].map((capa) => (
            <div key={capa.n} style={{
              padding: "1.25rem",
              backgroundColor: "var(--background)",
            }}>
              <div style={{
                fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem",
              }}>
                {capa.n}
              </div>
              <div style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                {capa.titulo}.
              </div>
              <p style={{ fontSize: "0.825rem", color: "#444", lineHeight: 1.65, margin: 0 }}>
                {capa.texto}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          padding: "1.5rem",
          border: "1px solid var(--foreground)",
          backgroundColor: "var(--card)",
        }}>
          <p style={{ fontSize: "0.925rem", lineHeight: 1.8, margin: 0 }}>
            Si solo ves el vídeo, te inspiras un rato.
            <br />
            <strong>Si haces los ejercicios, cierras el portátil con decisiones tomadas.</strong>
          </p>
        </div>
      </section>

      {/* ── 4. QUÉ PASA CON TUS DATOS ────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "2.5rem 3.5rem",
        maxWidth: "860px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
        }}>
          Tus datos
        </div>
        <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", marginBottom: "1.5rem" }}>
          Todo lo que escribes se queda en tu diagnóstico vivo.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
          {[
            "Cada respuesta que das se guarda en tu espacio privado.",
            "El sistema te enseña tu progreso por módulos y lecciones.",
            "Puedes volver dentro de un mes, revisar lo que escribiste y añadir mejoras.",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", fontSize: "0.9rem", lineHeight: 1.7 }}>
              <span style={{ color: "var(--foreground)", fontWeight: 700, flexShrink: 0 }}>—</span>
              <span style={{ color: "#333" }}>{item}</span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "0.925rem", color: "#333", lineHeight: 1.8, maxWidth: "640px", marginBottom: "1.5rem" }}>
          No son tareas para &laquo;entregarle al profe&raquo;. Es un cuaderno de trabajo vivo
          sobre tu empresa, que solo tú ves y que puedes revisar cuando quieras.
        </p>

        <div style={{
          padding: "0.875rem 1.25rem",
          border: "1px solid var(--border)",
          backgroundColor: "var(--card)",
          fontSize: "0.8rem",
          color: "#444",
          display: "inline-block",
          maxWidth: "540px",
        }}>
          Más adelante podrás descargar un informe con todo tu trabajo y tus decisiones clave.
        </div>
      </section>

      {/* ── 5. MÓDULO 1 GRATIS ───────────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "2.5rem 3.5rem",
        maxWidth: "860px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
        }}>
          Módulo 1 — Gratis
        </div>
        <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", marginBottom: "1.5rem" }}>
          El cambio empieza por ti. Por eso el primer paso es gratuito.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.75rem" }}>
          {[
            "Al crear tu cuenta, tienes acceso completo al Módulo 1: Mentalidad.",
            "Ahí no hablamos de \"pensar en positivo\", hablamos de dejar de engañarte con tu empresa y asumir el papel de director, no de bombero.",
            "Si lo que ves ahí te remueve y te encaja la forma de trabajar, el resto del programa tiene sentido. Si no, mejor no sigas.",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "0.875rem", fontSize: "0.925rem", lineHeight: 1.75 }}>
              <span style={{
                width: "20px", height: "20px", flexShrink: 0,
                backgroundColor: "var(--foreground)", color: "var(--background)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.6rem", fontWeight: 900, marginTop: "3px",
              }}>
                ✓
              </span>
              <span style={{ color: "var(--foreground)" }}>{item}</span>
            </div>
          ))}
        </div>

        <p style={{
          fontSize: "0.925rem", color: "#333", lineHeight: 1.8,
          maxWidth: "620px", marginBottom: "2rem",
        }}>
          El Módulo 1 es para que tú decidas si estás preparado. Yo no voy a perseguirte.
          Si quieres cambiar, das el siguiente paso y desbloqueas el programa entero.
        </p>

        {/* CTA — condicional: si logueado → módulo 1, si no → registro */}
        <Link
          href={modulo1Href}
          className="btn-primary"
          style={{
            display: "inline-flex", alignItems: "center",
            gap: "0.5rem", fontSize: "1rem", padding: "0.875rem 1.5rem",
          }}
        >
          Empezar el Módulo 1 gratis
          <ArrowRight size={16} />
        </Link>
        {!user && (
          <div style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--muted)" }}>
            Ya tienes cuenta?{" "}
            <Link href="/login" style={{ color: "var(--foreground)", fontWeight: 600, textDecoration: "underline" }}>
              Entra aquí
            </Link>
          </div>
        )}
      </section>

      {/* ── 6. ACCESO COMPLETO ───────────────────────────────── */}
      <section style={{
        padding: "2.5rem 3.5rem",
        maxWidth: "860px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
        }}>
          Acceso completo
        </div>
        <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", marginBottom: "1.5rem" }}>
          Cuando desbloqueas el acceso completo:
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {[
            "Entras a los 10 módulos del programa (Mentalidad, Diagnóstico, Producto/Servicio, Precios, Publicidad y Marketing, Procesos y Operaciones, Personas y Equipo, Estrategia y Plan de Acción).",
            "Acceso de por vida al programa, a las mejoras que vaya añadiendo y a nuevos casos prácticos.",
            "Puedes volver a usar la plataforma cada vez que quieras revisar tu negocio, abrir una línea nueva o ajustar precios.",
          ].map((item, i, arr) => (
            <div key={i} style={{
              display: "flex",
              gap: "1rem",
              padding: "1.25rem 0",
              borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <span style={{
                fontWeight: 800, color: "var(--muted)", flexShrink: 0,
                fontSize: "0.65rem", letterSpacing: "0.06em", paddingTop: "4px",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ fontSize: "0.9rem", color: "#333", lineHeight: 1.75, margin: 0 }}>
                {item}
              </p>
            </div>
          ))}
        </div>

        <p style={{
          marginTop: "2rem",
          fontSize: "0.975rem",
          color: "var(--foreground)",
          lineHeight: 1.8,
          maxWidth: "620px",
          fontWeight: 500,
          marginBottom: "2.5rem",
        }}>
          No es un contenido que consumes una vez. Es una herramienta a la que vuelves
          cada vez que tu empresa cambia de fase.
        </p>

        <Link href="/programa" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          Ver el programa completo <ArrowRight size={14} />
        </Link>
      </section>

    </div>
  );
}
