export const metadata = {
  title: "Contacto — Rentabilismo",
  description: "¿Tienes dudas antes de entrar? Escríbenos. Sin formularios, sin CRM, sin respuesta automatizada.",
};

export default function ContactoPage() {
  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "3rem 3.5rem 2.5rem",
        maxWidth: "860px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem",
        }}>
          Contacto
        </div>
        <h1 style={{
          fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
          fontWeight: 900, lineHeight: 1.15,
          letterSpacing: "-0.03em", margin: "0 0 1.25rem",
        }}>
          Sin formulario.<br />Sin filtros.
        </h1>
        <p style={{
          fontSize: "1rem", color: "var(--muted)",
          lineHeight: 1.8, margin: 0, textAlign: "justify",
        }}>
          Si tienes dudas antes de registrarte, quieres saber si esto encaja con tu sector o tu
          situación concreta, o simplemente necesitas que alguien te lo explique sin el lenguaje
          de ventas habitual — escríbenos. No hay filtros automáticos, no hay equipo de soporte,
          no hay respuesta predefinida. Responde una persona real que conoce el programa por dentro.
        </p>
      </section>

      {/* ── EMAIL ────────────────────────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "2.5rem 3.5rem",
        maxWidth: "860px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
        }}>
          Escríbenos a
        </div>

        <a
          href="mailto:hola@consultoriametodo.es"
          style={{
            display: "inline-block",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--foreground)",
            textDecoration: "none",
            borderBottom: "1px solid var(--foreground)",
            paddingBottom: "2px",
            letterSpacing: "-0.01em",
          }}
        >
          hola@consultoriametodo.es
        </a>

        <div style={{
          marginTop: "1.5rem",
          padding: "1.25rem 1.5rem",
          border: "1px solid var(--border)",
          backgroundColor: "var(--card)",
        }}>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.75, margin: 0, textAlign: "justify" }}>
            <strong style={{ color: "var(--foreground)" }}>Tiempo de respuesta:</strong>
            {" "}En días laborables, normalmente en 24–48 h. No hay un equipo de soporte —
            responde la misma persona que ha construido y trabaja esto cada día. Por eso las
            respuestas son concretas y van al grano.
          </p>
        </div>
      </section>

      {/* ── ALIENTO ──────────────────────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "2.5rem 3.5rem",
        maxWidth: "860px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
        }}>
          No hay preguntas tontas
        </div>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.85, margin: 0, textAlign: "justify" }}>
          Si estás dando vueltas a si esto es para ti, si tu sector encaja, si el momento es el
          adecuado o si tienes dudas sobre lo que incluye — escríbenos antes de decidir nada.
          Muchas de las mejores conversaciones que tenemos empiezan con un &ldquo;no sé si esto
          es para mí&rdquo;. Preferimos que nos lo preguntes a que te quedes con la duda. Y si
          vemos que no encaja, te lo decimos igual de claro.
        </p>
      </section>

      {/* ── QUÉ PUEDES PREGUNTAR ─────────────────────────────── */}
      <section style={{ padding: "2.5rem 3.5rem", maxWidth: "860px" }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
        }}>
          Puedes preguntar sobre
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {[
            "Si esto encaja con tu tipo de negocio, sector o momento actual",
            "Cómo funciona el acceso, qué incluye y qué no",
            "Si el programa tiene sentido para un negocio como el tuyo",
            "Dudas sobre el proceso o el contenido antes de registrarte",
            "Consultoría personalizada o acompañamiento directo para tu empresa",
            "Cualquier otra cosa que necesites saber antes de decidir",
          ].map((item, i, arr) => (
            <div key={i} style={{
              padding: "0.875rem 0",
              borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
              fontSize: "0.9rem",
              lineHeight: 1.65,
              display: "flex", alignItems: "flex-start", gap: "0.75rem",
            }}>
              <span style={{ color: "var(--muted)", fontWeight: 700, flexShrink: 0 }}>—</span>
              {item}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
