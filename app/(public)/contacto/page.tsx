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
        maxWidth: "700px",
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
          lineHeight: 1.75, margin: 0, maxWidth: "480px",
        }}>
          Si tienes una duda concreta antes de registrarte, o quieres
          saber si esto es para tu tipo de negocio, escríbenos directamente.
          Responde una persona real.
        </p>
      </section>

      {/* ── EMAIL ────────────────────────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "2.5rem 3.5rem",
        maxWidth: "700px",
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
          maxWidth: "440px",
        }}>
          <p style={{ fontSize: "0.825rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "var(--foreground)" }}>Tiempo de respuesta:</strong>
            {" "}En días laborables, normalmente en 24–48 h.
            No hay un equipo de soporte — responde la misma persona que ha construido esto.
          </p>
        </div>
      </section>

      {/* ── QUÉ PUEDES PREGUNTAR ─────────────────────────────── */}
      <section style={{ padding: "2.5rem 3.5rem", maxWidth: "700px" }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
        }}>
          Puedes preguntar sobre
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {[
            "Si esto encaja con tu tipo de negocio o sector",
            "Cómo funciona el acceso y qué incluye exactamente",
            "Dudas sobre el proceso antes de registrarte",
            "Consultoría personalizada para tu empresa",
          ].map((item, i, arr) => (
            <div key={i} style={{
              padding: "0.875rem 0",
              borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
              fontSize: "0.9rem",
              display: "flex", alignItems: "center", gap: "0.75rem",
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
