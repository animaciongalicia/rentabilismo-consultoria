// BOCETO — Política de Privacidad
// Obligatorio por RGPD (Reglamento UE 2016/679) y LOPDGDD (LO 3/2018).
// Rellenar todos los [TODO] antes de publicar.

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
    "Datos de facturación — tarjeta procesada por [TODO: Stripe / Redsys]",
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
    "Datos de navegación anonimizados — [TODO: indicar herramienta]",
    "[TODO: plazo según herramienta analítica]",
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
        <P><strong>Identidad:</strong> [TODO: nombre / razón social]</P>
        <P><strong>NIF / CIF:</strong> [TODO]</P>
        <P><strong>Domicilio:</strong> [TODO: dirección completa]</P>
        <P><strong>Email de contacto:</strong> [TODO: hola@rentabilismo.com]</P>
        <P style={{ margin: 0 }}>
          <strong>Delegado de Protección de Datos (DPD):</strong>{" "}
          [TODO: si nombras DPD, indicar nombre y email — si no procede, eliminar esta línea]
        </P>
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
            ["[TODO: Stripe / Redsys]", "Procesamiento de pagos", "[TODO: país y garantías]"],
            ["[TODO: proveedor email]", "Envío de comunicaciones transaccionales", "[TODO: país y garantías]"],
            ["[TODO: herramienta analítica]", "Análisis de uso del sitio", "[TODO: país y garantías]"],
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
          [TODO: si hay transferencias internacionales fuera del EEE, detallar garantías
          (Cláusulas Contractuales Tipo, decisión de adecuación, etc.)]
        </P>
      </Section>

      {/* Derechos */}
      <Section label="Tus derechos">
        <P>
          En cualquier momento puedes ejercer los siguientes derechos enviando un email
          a <strong>[TODO: email de privacidad]</strong> con copia de tu DNI o documento
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
          [TODO: si quieres detallar medidas concretas — cifrado en tránsito (TLS), cifrado
          en reposo, control de accesos por roles, backups — añádelas aquí.]
        </P>
      </Section>

      {/* Actualización */}
      <Section label="Cambios en esta política" last>
        <P>
          Podemos actualizar esta Política de Privacidad en cualquier momento. Cuando lo
          hagamos, lo notificaremos por email o mediante un aviso visible en el Sitio.
        </P>
        <P style={{ margin: 0 }}>
          Última actualización: <strong>[TODO: mes y año]</strong>.
        </P>
      </Section>

    </div>
  );
}
