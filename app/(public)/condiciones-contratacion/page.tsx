// BOCETO — Condiciones de Contratación
// Regula la venta del programa online. Obligatorio por LGDCU (RDL 1/2007)
// y Ley 34/2002 (LSSI-CE) para ventas a consumidores finales.
// Rellenar todos los [TODO] antes de publicar.

import { PRECIO_PROGRAMA } from "@/config/opciones";

export const metadata = {
  title: "Condiciones de Contratación — Rentabilismo",
  description: "Condiciones de compra y uso del programa Rentabilismo.",
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

export default function CondicionesContratacionPage() {
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
          Condiciones de Contratación
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: 0, lineHeight: 1.7, maxWidth: "580px" }}>
          Estas condiciones regulan la compra del acceso completo al programa Rentabilismo.
          Léelas antes de finalizar tu compra. Si tienes dudas, escríbenos antes de pagar.
        </p>
      </section>

      {/* Partes */}
      <Section label="Partes del contrato">
        <P>
          <strong>Vendedor:</strong> [TODO: nombre / razón social], con NIF [TODO] y
          domicilio en [TODO: dirección completa]. Email de contacto: [TODO].
        </P>
        <P style={{ margin: 0 }}>
          <strong>Comprador:</strong> La persona física o jurídica que realiza la compra
          del acceso al programa a través del sitio web rentabilismo.com.
        </P>
      </Section>

      {/* Objeto */}
      <Section label="Objeto">
        <P>
          Mediante la contratación, el Comprador adquiere el acceso permanente al programa
          online <strong>Rentabilismo</strong>, compuesto por los módulos de contenido,
          ejercicios y herramientas disponibles en la plataforma en el momento de la compra,
          según se describe en la página <strong>/programa</strong>.
        </P>
        <P style={{ margin: 0 }}>
          El acceso se activa de forma inmediata tras la confirmación del pago y se mantiene
          de forma indefinida para la cuenta del Comprador, salvo en los casos de resolución
          del contrato descritos más adelante.
        </P>
      </Section>

      {/* Precio */}
      <Section label="Precio y forma de pago">
        <P>
          El precio del acceso completo al programa es de{" "}
          <strong>{PRECIO_PROGRAMA} €</strong> (IVA incluido).
        </P>
        <P>
          El pago se realiza en un único cargo mediante tarjeta de crédito o débito, a través
          del proveedor de pagos <strong>[TODO: Stripe / Redsys]</strong>. No almacenamos
          los datos de tu tarjeta: son procesados directamente por el proveedor de pagos.
        </P>
        <P style={{ margin: 0 }}>
          [TODO: si ofreces financiación, cuotas o métodos de pago adicionales, describirlos aquí.]
        </P>
      </Section>

      {/* Proceso de compra */}
      <Section label="Proceso de compra">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "0.875rem" }}>
          {[
            ["1", "Elige el plan de acceso en la página /programa o /registro"],
            ["2", "Completa el formulario con tus datos de contacto y facturación"],
            ["3", "Introduce los datos de pago en el formulario seguro del proveedor de pagos"],
            ["4", "Recibirás un email de confirmación con tu factura y el acceso activo"],
            ["5", "Inicia sesión en la plataforma y empieza desde el Módulo 1"],
          ].map(([num, paso]) => (
            <div key={num} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
              <span style={{
                minWidth: "24px", height: "24px", display: "flex", alignItems: "center",
                justifyContent: "center", border: "1px solid var(--border)",
                fontSize: "0.75rem", fontWeight: 700, flexShrink: 0,
              }}>
                {num}
              </span>
              <span style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.6 }}>{paso}</span>
            </div>
          ))}
        </div>
        <P style={{ margin: 0, fontSize: "0.825rem", color: "var(--muted)" }}>
          Al hacer clic en el botón de compra, el Comprador declara haber leído y
          aceptado estas Condiciones de Contratación y la Política de Privacidad.
        </P>
      </Section>

      {/* Derecho de desistimiento */}
      <Section label="Derecho de desistimiento">
        <P>
          De conformidad con el artículo 103 m) del Real Decreto Legislativo 1/2007
          (LGDCU), <strong>el Comprador pierde el derecho de desistimiento</strong> en el
          momento en que accede a los contenidos digitales del programa, si así lo ha
          consentido expresamente al completar la compra.
        </P>
        <P>
          [TODO: si decides ofrecer un período de garantía o reembolso voluntario
          (ej. 14 días), descríbelo aquí con claridad: condiciones, qué se considerará
          "haber accedido", cómo solicitar el reembolso y en qué plazo se procesa.]
        </P>
        <P style={{ margin: 0, fontSize: "0.825rem", color: "var(--muted)" }}>
          En cualquier caso, el comprador puede ejercer sus derechos de consumidor ante
          las Juntas Arbitrales de Consumo o mediante la plataforma europea de resolución
          de litigios en línea: <strong>ec.europa.eu/consumers/odr</strong>.
        </P>
      </Section>

      {/* Acceso y duración */}
      <Section label="Acceso a la plataforma y duración">
        <P>
          El acceso es personal, intransferible y válido para un único usuario. Está
          prohibido compartir credenciales, publicar los contenidos o distribuirlos por
          cualquier medio.
        </P>
        <P>
          El acceso se mantiene de forma indefinida mientras la plataforma esté operativa.
          Si Rentabilismo dejase de operar, el Vendedor notificará a los usuarios con un
          mínimo de <strong>[TODO: ej. 90 días]</strong> de antelación por email.
        </P>
        <P style={{ margin: 0 }}>
          El Vendedor puede ampliar, modificar o retirar contenidos del programa, siempre
          que no se reduzca de forma significativa el valor global del mismo.
        </P>
      </Section>

      {/* Propiedad intelectual */}
      <Section label="Propiedad intelectual">
        <P>
          Todos los contenidos del programa — textos, ejercicios, vídeos, metodologías y
          estructura — son propiedad del Vendedor y están protegidos por la legislación
          de propiedad intelectual.
        </P>
        <P style={{ margin: 0 }}>
          La licencia de uso es personal y no exclusiva. Queda prohibida cualquier
          reproducción, distribución o comunicación pública de los contenidos sin
          autorización expresa por escrito.
        </P>
      </Section>

      {/* Facturación */}
      <Section label="Facturación">
        <P style={{ margin: 0 }}>
          Se emitirá una factura por cada compra y se enviará al email facilitado durante
          el registro. Si necesitas factura con datos de empresa, indica el CIF y la
          razón social durante el proceso de pago o escríbenos a{" "}
          <strong>[TODO: email de facturación]</strong> en los [TODO: ej. 15] días
          siguientes a la compra.
        </P>
      </Section>

      {/* Ley aplicable */}
      <Section label="Ley aplicable y resolución de conflictos" last>
        <P>
          Estas condiciones se rigen por la legislación española vigente,
          en particular por el RDL 1/2007 (LGDCU), la Ley 34/2002 (LSSI-CE)
          y el Código Civil.
        </P>
        <P>
          Para la resolución de cualquier controversia, las partes acuerdan someterse
          a los Juzgados y Tribunales de <strong>[TODO: ciudad del domicilio social]</strong>,
          sin perjuicio del fuero que corresponda a los consumidores según la normativa
          de protección de consumidores y usuarios.
        </P>
        <P style={{ margin: 0 }}>
          Última actualización: <strong>[TODO: mes y año]</strong>.
        </P>
      </Section>

    </div>
  );
}
