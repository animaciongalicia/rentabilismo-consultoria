// Política de Privacidad — rentabilismo.com

export const metadata = {
  title: "Política de Privacidad — Rentabilismo",
  description: "Cómo tratamos los datos personales de los usuarios de Rentabilismo.",
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

const Table = ({ rows }: { rows: [string, string, string, string][] }) => (
  <div style={{ overflowX: "auto", marginBottom: "0.875rem" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem" }}>
      <thead>
        <tr>
          {["Finalidad", "Base legitimadora", "Datos tratados", "Plazo de conservación"].map(h => (
            <th key={h} style={{
              textAlign: "left", padding: "0.5rem 0.75rem",
              borderBottom: "2px solid var(--border)", fontWeight: 700,
              whiteSpace: "nowrap",
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([fin, base, datos, plazo]) => (
          <tr key={fin} style={{ borderBottom: "1px solid var(--border)" }}>
            <td style={{ padding: "0.625rem 0.75rem", verticalAlign: "top" }}>{fin}</td>
            <td style={{ padding: "0.625rem 0.75rem", verticalAlign: "top", color: "var(--muted)" }}>{base}</td>
            <td style={{ padding: "0.625rem 0.75rem", verticalAlign: "top", color: "var(--muted)" }}>{datos}</td>
            <td style={{ padding: "0.625rem 0.75rem", verticalAlign: "top", color: "var(--muted)" }}>{plazo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TRATAMIENTOS: [string, string, string, string][] = [
  [
    "Gestión del registro y acceso a la plataforma",
    "Ejecución del contrato (art. 6.1.b RGPD)",
    "Nombre, email, contraseña (hash)",
    "Mientras dure la relación contractual + 5 años",
  ],
  [
    "Prestación del servicio de programa y ejercicios",
    "Ejecución del contrato (art. 6.1.b RGPD)",
    "Respuestas a ejercicios, progreso en módulos",
    "Mientras dure la relación contractual + 5 años",
  ],
  [
    "Gestión de pagos",
    "Ejecución del contrato (art. 6.1.b RGPD)",
    "Datos de facturación — tarjeta procesada directamente por Stripe Inc.",
    "5 años (obligación fiscal)",
  ],
  [
    "Comunicaciones comerciales sobre el programa",
    "Interés legítimo / consentimiento (art. 6.1.a o 6.1.f RGPD)",
    "Email, nombre",
    "Hasta retirada del consentimiento o solicitud de baja",
  ],
  [
    "Análisis de uso y mejora de la plataforma",
    "Interés legítimo (art. 6.1.f RGPD)",
    "Datos de navegación anonimizados — Google Analytics 4",
    "26 meses (retención por defecto de GA4)",
  ],
];

export default function PoliticaPrivacidadPage() {
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
          Política de Privacidad
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: 0, lineHeight: 1.7, maxWidth: "580px" }}>
          En esta página te explicamos qué datos personales recogemos, para qué los usamos,
          cuánto tiempo los guardamos y qué derechos tienes. Sin letra pequeña.
        </p>
      </section>

      {/* Responsable */}
      <Section label="Responsable del tratamiento">
        <P><strong>Identidad:</strong> Inversiones SHISO SL (marca comercial: Consultoría Método)</P>
        <P><strong>NIF / CIF:</strong> B 70319223</P>
        <P><strong>Domicilio:</strong> Ronda de Montealto 4, 15002, A Coruña (La Coruña)</P>
        <P style={{ margin: 0 }}><strong>Email de contacto:</strong> hola@rentabilismo.com</P>
      </Section>

      {/* Finalidades, bases y plazos */}
      <Section label="Qué datos tratamos, para qué y por cuánto tiempo">
        <P>
          Tratamos únicamente los datos necesarios para las finalidades que se describen
          a continuación. Nunca vendemos datos a terceros.
        </P>
        <Table rows={TRATAMIENTOS} />
      </Section>

      {/* Destinatarios */}
      <Section label="Destinatarios y encargados de tratamiento">
        <P>
          Para prestar el servicio trabajamos con los siguientes proveedores que actúan
          como encargados de tratamiento:
        </P>
        <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "0.875rem" }}>
          {[
            ["Supabase Inc.", "Alojamiento de base de datos y autenticación", "EE.UU. — SCCs vigentes"],
            ["Stripe Inc.", "Procesamiento de pagos", "EE.UU. — SCCs vigentes"],
            ["Supabase Inc.", "Envío de emails transaccionales (confirmación, etc.)", "EE.UU. — SCCs vigentes"],
            ["Google LLC (Analytics)", "Análisis de uso del sitio web", "EE.UU. — SCCs vigentes"],
            ["Google LLC (Search Console)", "Análisis de rendimiento en búsqueda (no datos de usuarios)", "EE.UU. — SCCs vigentes"],
          ].map(([prov, uso, pais]) => (
            <div key={prov} style={{
              display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr",
              gap: "0.75rem", padding: "0.5rem 0",
              borderBottom: "1px solid var(--border)", fontSize: "0.825rem",
              flexWrap: "wrap",
            }}>
              <span style={{ fontWeight: 600 }}>{prov}</span>
              <span style={{ color: "var(--muted)" }}>{uso}</span>
              <span style={{ color: "var(--muted)" }}>{pais}</span>
            </div>
          ))}
        </div>
        <P style={{ margin: 0, fontSize: "0.8rem", color: "var(--muted)" }}>
          Todos los proveedores indicados están ubicados en EE.UU. Las transferencias internacionales
          se amparan en las Cláusulas Contractuales Tipo (SCCs) aprobadas por la Comisión Europea
          (Decisión de Ejecución UE 2021/914).
        </P>
      </Section>

      {/* Derechos */}
      <Section label="Tus derechos">
        <P>
          En cualquier momento puedes ejercer los siguientes derechos enviando un email
          a <strong>hola@rentabilismo.com</strong> con copia de tu DNI o documento
          identificativo equivalente:
        </P>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "0.875rem" }}>
          {[
            ["Acceso", "Saber qué datos tenemos sobre ti."],
            ["Rectificación", "Corregir datos inexactos o incompletos."],
            ["Supresión", "Solicitar el borrado de tus datos cuando ya no sean necesarios."],
            ["Limitación", "Solicitar que dejemos de tratar tus datos mientras se resuelve una reclamación."],
            ["Portabilidad", "Recibir tus datos en formato estructurado y legible por máquina."],
            ["Oposición", "Oponerte al tratamiento basado en interés legítimo."],
            ["No decisión automatizada", "No ser objeto de decisiones basadas exclusivamente en tratamiento automatizado."],
          ].map(([derecho, desc]) => (
            <div key={derecho} style={{ display: "flex", gap: "0.75rem", fontSize: "0.875rem" }}>
              <span style={{ fontWeight: 700, minWidth: "140px" }}>{derecho}</span>
              <span style={{ color: "var(--muted)" }}>{desc}</span>
            </div>
          ))}
        </div>
        <P style={{ margin: 0 }}>
          Si consideras que el tratamiento no se ajusta a la normativa, puedes presentar
          una reclamación ante la Agencia Española de Protección de Datos (
          <strong>aepd.es</strong>).
        </P>
      </Section>

      {/* Seguridad */}
      <Section label="Seguridad y medidas técnicas">
        <P>
          Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos
          frente a accesos no autorizados, pérdida o destrucción accidental.
        </P>
        <P style={{ margin: 0 }}>
          Entre las medidas aplicadas se incluyen: cifrado en tránsito mediante TLS, cifrado
          en reposo gestionado por Supabase, control de accesos basado en roles y autenticación
          segura mediante tokens firmados.
        </P>
      </Section>

      {/* Actualización */}
      <Section label="Cambios en esta política" last>
        <P>
          Podemos actualizar esta Política de Privacidad en cualquier momento. Cuando lo
          hagamos, lo notificaremos por email o mediante un aviso visible en el Sitio.
        </P>
        <P style={{ margin: 0 }}>
          Última actualización: <strong>18 de marzo de 2026</strong>.
        </P>
      </Section>

    </div>
  );
}
