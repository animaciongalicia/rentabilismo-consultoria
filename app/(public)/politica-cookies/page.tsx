// Política de Cookies — rentabilismo.com

export const metadata = {
  title: "Política de Cookies — Rentabilismo",
  description: "Información sobre el uso de cookies en Rentabilismo.",
};

const Section = ({
  label,
  children,
  last = false,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) => (
  <section style={{
    borderBottom: last ? "none" : "1px solid var(--border)",
    padding: "2.5rem 3.5rem",
    maxWidth: "820px",
  }}>
    <div style={{
      fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
      textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
    }}>
      {label}
    </div>
    <div style={{ fontSize: "0.9rem", lineHeight: 1.9, color: "var(--foreground)", textAlign: "justify" as const }}>
      {children}
    </div>
  </section>
);

const P = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <p style={{ margin: "0 0 0.875rem", ...style }}>{children}</p>
);

type CookieRow = {
  nombre: string;
  tipo: string;
  proveedor: string;
  finalidad: string;
  duracion: string;
};

const CookieTable = ({ rows }: { rows: CookieRow[] }) => (
  <div style={{ overflowX: "auto", marginBottom: "0.875rem" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
      <thead>
        <tr>
          {["Cookie", "Tipo", "Proveedor", "Finalidad", "Duración"].map(h => (
            <th key={h} style={{
              textAlign: "left", padding: "0.5rem 0.75rem",
              borderBottom: "2px solid var(--border)", fontWeight: 700,
              whiteSpace: "nowrap",
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.nombre} style={{ borderBottom: "1px solid var(--border)" }}>
            <td style={{ padding: "0.625rem 0.75rem", fontFamily: "monospace", verticalAlign: "top" }}>{row.nombre}</td>
            <td style={{ padding: "0.625rem 0.75rem", color: "var(--muted)", verticalAlign: "top", whiteSpace: "nowrap" }}>{row.tipo}</td>
            <td style={{ padding: "0.625rem 0.75rem", color: "var(--muted)", verticalAlign: "top" }}>{row.proveedor}</td>
            <td style={{ padding: "0.625rem 0.75rem", color: "var(--muted)", verticalAlign: "top" }}>{row.finalidad}</td>
            <td style={{ padding: "0.625rem 0.75rem", color: "var(--muted)", verticalAlign: "top", whiteSpace: "nowrap" }}>{row.duracion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const COOKIES_TECNICAS: CookieRow[] = [
  {
    nombre: "sb-*-auth-token",
    tipo: "Técnica / sesión",
    proveedor: "Supabase",
    finalidad: "Mantiene la sesión autenticada del usuario en la plataforma",
    duracion: "Sesión / 1 año",
  },
  {
    nombre: "__stripe_mid",
    tipo: "Técnica",
    proveedor: "Stripe",
    finalidad: "Identifica el navegador para prevención de fraude en el proceso de pago",
    duracion: "1 año",
  },
  {
    nombre: "__stripe_sid",
    tipo: "Técnica / sesión",
    proveedor: "Stripe",
    finalidad: "Identifica la sesión durante el proceso de pago seguro",
    duracion: "30 minutos",
  },
];

const COOKIES_ANALITICAS: CookieRow[] = [
  {
    nombre: "_ga",
    tipo: "Analítica",
    proveedor: "Google Analytics 4",
    finalidad: "Distingue usuarios únicos para medir el uso del sitio de forma agregada",
    duracion: "2 años",
  },
  {
    nombre: "_ga_XXXXXXXX",
    tipo: "Analítica",
    proveedor: "Google Analytics 4",
    finalidad: "Mantiene el estado de la sesión de Analytics",
    duracion: "2 años",
  },
  {
    nombre: "_gid",
    tipo: "Analítica",
    proveedor: "Google Analytics 4",
    finalidad: "Distingue usuarios para estadísticas de sesión",
    duracion: "24 horas",
  },
];

export default function PoliticaCookiesPage() {
  return (
    <div>

      {/* Cabecera */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "3rem 3.5rem 2.5rem",
        maxWidth: "820px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
        }}>
          Legal
        </div>
        <h1 style={{
          fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
          fontWeight: 900, lineHeight: 1.1,
          letterSpacing: "-0.03em", margin: "0 0 1rem",
        }}>
          Política de Cookies
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: 0, lineHeight: 1.7, maxWidth: "560px" }}>
          Qué son las cookies, cuáles usamos y cómo puedes controlarlas.
        </p>
      </section>

      {/* Qué es una cookie */}
      <Section label="Qué es una cookie">
        <P>
          Una cookie es un pequeño archivo de texto que un sitio web deposita en tu
          navegador cuando lo visitas. Sirve para recordar información entre visitas:
          que has iniciado sesión, tus preferencias de idioma o cómo has llegado al sitio.
        </P>
        <P style={{ margin: 0 }}>
          Las cookies no son virus, no pueden acceder a los archivos de tu dispositivo
          y, en la mayoría de los casos, puedes eliminarlas o bloquearlas fácilmente
          desde la configuración de tu navegador.
        </P>
      </Section>

      {/* Tipos */}
      <Section label="Tipos de cookies que usamos">
        <P><strong>Cookies técnicas y de sesión</strong> — Son imprescindibles para el
        funcionamiento del sitio. Sin ellas no puedes iniciar sesión ni acceder a los
        módulos. No requieren consentimiento.</P>
        <CookieTable rows={COOKIES_TECNICAS} />

        <P style={{ marginTop: "1.25rem" }}><strong>Cookies analíticas</strong> — Las usamos
        para entender cómo se usa el sitio y mejorar la experiencia. Requieren tu
        consentimiento.</P>
        <CookieTable rows={COOKIES_ANALITICAS} />

        <P style={{ marginTop: "1.25rem", marginBottom: 0 }}>
          <strong>No usamos cookies publicitarias ni de seguimiento de redes sociales.</strong>{" "}
          Las únicas cookies de terceros presentes en este sitio son las indicadas en la
          tabla anterior (Stripe, para el proceso de pago, y Google Analytics, con fines
          estadísticos).
        </P>
      </Section>

      {/* Gestión del consentimiento */}
      <Section label="Gestión del consentimiento">
        <P>
          Al visitar el sitio por primera vez verás un aviso de cookies en el que puedes
          aceptar o rechazar las cookies no esenciales.
        </P>
        <P>
          Puedes cambiar tu preferencia en cualquier momento haciendo clic en el enlace
          de gestión de cookies que encontrarás en el pie de página.
        </P>
        <P style={{ margin: 0, fontSize: "0.825rem", color: "var(--muted)" }}>
          Si en algún momento no ves el aviso de cookies, puedes gestionar tus preferencias
          directamente desde la configuración de privacidad de tu navegador (ver sección
          siguiente).
        </P>
      </Section>

      {/* Cómo eliminar cookies */}
      <Section label="Cómo eliminar o bloquear cookies desde tu navegador">
        <P>
          Puedes configurar tu navegador para bloquear o eliminar cookies.
          Ten en cuenta que bloquear las cookies técnicas puede impedir el correcto
          funcionamiento del sitio.
        </P>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", marginBottom: "0.875rem" }}>
          {[
            ["Chrome", "Ajustes → Privacidad y seguridad → Cookies y otros datos de sitios"],
            ["Firefox", "Opciones → Privacidad y seguridad → Cookies y datos del sitio"],
            ["Safari", "Preferencias → Privacidad → Administrar datos del sitio web"],
            ["Edge", "Configuración → Privacidad, búsqueda y servicios → Cookies"],
          ].map(([nav, ruta]) => (
            <div key={nav} style={{ display: "flex", gap: "0.75rem", fontSize: "0.85rem" }}>
              <span style={{ fontWeight: 700, minWidth: "70px" }}>{nav}</span>
              <span style={{ color: "var(--muted)" }}>{ruta}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Actualización */}
      <Section label="Cambios en esta política" last>
        <P>
          Podemos actualizar esta Política de Cookies cuando añadamos o eliminemos
          cookies, o cuando cambie la normativa aplicable. Te informaremos de cambios
          relevantes mediante el banner de cookies.
        </P>
        <P style={{ margin: 0 }}>
          Última actualización: <strong>18 de marzo de 2026</strong>.
        </P>
      </Section>

    </div>
  );
}
