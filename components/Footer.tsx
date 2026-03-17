import Link from "next/link";

const NAV_LINKS = [
  { href: "/",             label: "Sobre Rentabilismo" },
  { href: "/el-muro",      label: "Comunidad" },
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/programa",     label: "El Programa" },
  { href: "/dolores",      label: "¿Es para mí?" },
];

const LEGAL_LINKS = [
  { href: "/aviso-legal",              label: "Aviso legal" },
  { href: "/politica-privacidad",      label: "Política de privacidad" },
  { href: "/politica-cookies",         label: "Política de cookies" },
  { href: "/condiciones-contratacion", label: "Condiciones de contratación" },
];

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "#0a0a0a",
      color: "#fff",
      borderTop: "3px solid #1a1a1a",
      marginTop: "6rem",
    }}>

      {/* Columnas principales */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
        gap: "3rem",
        padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3.5rem)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>

        {/* ── Col 1: posicionamiento ────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{
            fontSize: "0.7rem",
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#fff",
          }}>
            Rentabilismo
          </div>
          <p style={{
            fontSize: "0.825rem",
            color: "#888",
            lineHeight: 1.75,
            margin: 0,
            maxWidth: "280px",
          }}>
            No es un curso. Es un proceso de consultoría guiada, práctica y sin adornos,
            para empresarios que quieren entender de verdad su negocio y cambiar
            lo que no funciona.
          </p>
          <p style={{ fontSize: "0.775rem", color: "#555", margin: 0 }}>
            Creado por{" "}
            <span style={{ color: "#888", fontWeight: 600 }}>Consultoría Método.</span>
          </p>
        </div>

        {/* ── Col 2: navegación ─────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <div style={{
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#444",
            marginBottom: "0.25rem",
          }}>
            Navega
          </div>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: "0.825rem",
                color: "#777",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "color 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#777")}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* ── Col 3: legal ──────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <div style={{
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#444",
            marginBottom: "0.25rem",
          }}>
            Legal
          </div>
          {LEGAL_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: "0.825rem",
                color: "#555",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "color 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#888")}
              onMouseLeave={e => (e.currentTarget.style.color = "#555")}
            >
              {label}
            </Link>
          ))}
        </div>

      </div>

      {/* ── Línea de cierre ───────────────────────────────── */}
      <div style={{
        borderTop: "1px solid #1a1a1a",
        padding: "1rem clamp(1.5rem, 5vw, 3.5rem)",
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.5rem",
      }}>
        <span style={{ fontSize: "0.7rem", color: "#333", letterSpacing: "0.04em" }}>
          © {new Date().getFullYear()} Rentabilismo
        </span>
        {/* Frase de cierre — elegir una de las 3 opciones */}
        <span style={{ fontSize: "0.7rem", color: "#333", letterSpacing: "0.04em" }}>
          Sin humo. Con método. Sin excusas.
        </span>
      </div>

    </footer>
  );
}
