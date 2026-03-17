import Link from "next/link";

const EMPRESA_LINKS = [
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/como-funciona", label: "Cómo trabajamos" },
  { href: "/dolores",       label: "¿Es para mí?" },
  { href: "/contacto",      label: "Contacto" },
];

const LEGAL_LINKS = [
  { href: "/aviso-legal",              label: "Aviso legal" },
  { href: "/politica-privacidad",      label: "Política de privacidad" },
  { href: "/politica-cookies",         label: "Política de cookies" },
  { href: "/condiciones-contratacion", label: "Condiciones de contratación" },
];

export default function Footer() {
  return (
    <footer className="site-footer">

      {/* Columnas principales */}
      <div className="footer-grid">

        {/* ── Col 1: posicionamiento ────────────────────── */}
        <div className="footer-brand">
          <div className="footer-logo">Rentabilismo</div>
          <p className="footer-tagline">
            No es un curso. Es un proceso de consultoría guiada, práctica y sin adornos,
            para empresarios que quieren entender de verdad su negocio y cambiar
            lo que no funciona.
          </p>
          <p className="footer-creator">
            Creado por <strong>Consultoría Método.</strong>
          </p>
        </div>

        {/* ── Col 2: empresa ────────────────────────────── */}
        <nav className="footer-nav">
          <p className="footer-col-label">La empresa</p>
          {EMPRESA_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="footer-link">
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Col 3: legal ──────────────────────────────── */}
        <nav className="footer-legal">
          <p className="footer-col-label">Legal</p>
          {LEGAL_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="footer-link footer-link--dim">
              {label}
            </Link>
          ))}
        </nav>

      </div>

      {/* ── Línea de cierre ───────────────────────────────── */}
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Rentabilismo</span>
        <span>Sin humo. Con método. Sin excusas.</span>
      </div>

    </footer>
  );
}
