// BOCETO — Aviso Legal
// Obligatorio por Ley 34/2002 (LSSI-CE), art. 10.
// Rellenar todos los [TODO] con datos reales antes de publicar.

export const metadata = {
  title: "Aviso Legal — Rentabilismo",
  description: "Información legal del titular del sitio web Rentabilismo.",
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
    <div style={{ fontSize: "0.9rem", lineHeight: 1.9, color: "var(--foreground)", maxWidth: "640px" }}>
      {children}
    </div>
  </section>
);

const P = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <p style={{ margin: "0 0 0.875rem", ...style }}>{children}</p>
);

const Field = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: "flex", gap: "1rem", padding: "0.5rem 0", borderBottom: "1px solid var(--border)", flexWrap: "wrap" }}>
    <span style={{ minWidth: "200px", fontWeight: 600, fontSize: "0.825rem" }}>{label}</span>
    <span style={{ color: "var(--muted)", fontSize: "0.825rem" }}>{value}</span>
  </div>
);

export default function AvisoLegalPage() {
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
          Aviso Legal
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: 0, lineHeight: 1.7 }}>
          En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad
          de la Información y de Comercio Electrónico (LSSI-CE).
        </p>
      </section>

      {/* Datos del titular */}
      <Section label="Datos del titular">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Field label="Razón social"        value="[TODO: nombre completo o denominación social]" />
          <Field label="NIF / CIF"           value="[TODO: NIF o CIF]" />
          <Field label="Domicilio social"    value="[TODO: calle, número, código postal, municipio, provincia]" />
          <Field label="Email de contacto"   value="[TODO: hola@rentabilismo.com o similar]" />
          <Field label="Teléfono"            value="[TODO: opcional, o eliminar esta fila]" />
          <Field label="Registro Mercantil"  value="[TODO: si procede — Tomo X, Folio X, Hoja X — o eliminar si no aplica]" />
        </div>
      </Section>

      {/* Objeto */}
      <Section label="Objeto">
        <P>
          El presente Aviso Legal regula el acceso y uso del sitio web{" "}
          <strong>rentabilismo.com</strong> (en adelante, "el Sitio"), titularidad de la
          entidad indicada en la sección anterior.
        </P>
        <P>
          El Sitio ofrece un programa de consultoría guiada online dirigido a empresarios
          y autónomos, compuesto por módulos de formación, ejercicios y herramientas prácticas
          de gestión empresarial.
        </P>
      </Section>

      {/* Condiciones de uso */}
      <Section label="Condiciones de acceso y uso">
        <P>
          El acceso al Sitio es gratuito, salvo el coste de conexión a internet. El acceso
          a determinados contenidos y funcionalidades requiere registro y, en su caso, el
          abono del precio correspondiente.
        </P>
        <P>
          El usuario se compromete a hacer un uso diligente y lícito del Sitio y de sus
          contenidos, absteniéndose de utilizarlos con fines contrarios a la ley, a la moral
          o al orden público.
        </P>
        <P>
          El titular se reserva el derecho a modificar en cualquier momento las condiciones
          de acceso, los contenidos y la estructura del Sitio, sin obligación de preaviso.
        </P>
      </Section>

      {/* Propiedad intelectual */}
      <Section label="Propiedad intelectual e industrial">
        <P>
          Todos los contenidos del Sitio — textos, imágenes, vídeos, ejercicios, marcas,
          logotipos, código y diseño — son propiedad del titular o de terceros que han
          autorizado su uso, y están protegidos por la legislación española e internacional
          sobre propiedad intelectual e industrial.
        </P>
        <P>
          Queda expresamente prohibida la reproducción total o parcial, distribución,
          transformación o comunicación pública de los contenidos del Sitio sin autorización
          expresa y por escrito del titular.
        </P>
      </Section>

      {/* Exclusión de responsabilidad */}
      <Section label="Exclusión de responsabilidad">
        <P>
          El titular no garantiza la disponibilidad, continuidad ni infalibilidad del Sitio,
          y queda exonerado de responsabilidad por daños o perjuicios derivados de su falta
          de disponibilidad o de errores en los contenidos.
        </P>
        <P>
          Los resultados obtenidos por los usuarios al aplicar los contenidos del programa
          dependen exclusivamente de su propia situación, esfuerzo y decisiones. El titular
          no garantiza resultados económicos concretos.
        </P>
        <P>
          El Sitio puede contener enlaces a sitios web de terceros. El titular no se hace
          responsable del contenido, privacidad ni condiciones de uso de dichos sitios.
        </P>
      </Section>

      {/* Legislación */}
      <Section label="Ley aplicable y jurisdicción" last>
        <P>
          Las presentes condiciones se rigen por la legislación española vigente. Para la
          resolución de cualquier litigio derivado de la interpretación o aplicación de
          este Aviso Legal, las partes se someten, con renuncia expresa a cualquier otro
          fuero, a los Juzgados y Tribunales de{" "}
          <strong>[TODO: ciudad del domicilio social]</strong>.
        </P>
        <P style={{ margin: 0 }}>
          Última actualización: <strong>[TODO: mes y año]</strong>.
        </P>
      </Section>

    </div>
  );
}
