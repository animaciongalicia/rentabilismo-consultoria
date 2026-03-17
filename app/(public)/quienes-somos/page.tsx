import Link from "next/link";

export const metadata = {
  title: "Quiénes somos — Rentabilismo",
  description:
    "15 años gestionando negocios reales. Rentabilismo nace de ver de primera mano qué funciona y qué no cuando tienes que pagar nóminas y tomar decisiones con información incompleta.",
};

export default function QuienesSomosPage() {
  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "3rem 3.5rem 2.5rem",
        maxWidth: "820px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem",
        }}>
          Quiénes somos
        </div>
        <h1 style={{
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          fontWeight: 900, lineHeight: 1.1,
          letterSpacing: "-0.03em", margin: "0 0 1.5rem",
        }}>
          Detrás de esto hay alguien<br />
          que ha estado donde tú estás.
        </h1>
        <p style={{
          fontSize: "1.05rem", color: "var(--muted)",
          lineHeight: 1.75, margin: 0, maxWidth: "580px",
        }}>
          15 años gestionando negocios reales. No desde un despacho.
          Desde la trinchera: tomando decisiones con datos incompletos,
          pagando nóminas, cerrando meses ajustados y aprendiendo
          lo que ningún curso enseña.
        </p>
      </section>

      {/* ── ORIGEN ───────────────────────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "2.5rem 3.5rem",
        maxWidth: "820px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
        }}>
          Por qué existe esto
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "620px" }}>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, margin: 0 }}>
            Llevo años haciendo consultoría con empresarios que trabajan mucho
            y ganan poco, o que no saben exactamente por qué su negocio no
            termina de despegar. La mayoría no tiene acceso a asesoramiento real.
            Hacen cursos que no se aplican a su situación. Leen libros de gestión
            pensados para grandes corporaciones. Y siguen igual.
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, margin: 0 }}>
            Rentabilismo nace de esa frustración — la mía y la de ellos.
            De ver que hay un hueco enorme entre el empresario que necesita
            ayuda concreta y los recursos que realmente le sirven.
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, margin: 0 }}>
            No me interesa enseñar teoría. Me interesa que al final del proceso
            puedas decir: <em>&ldquo;Ahora sé exactamente qué está fallando
            y qué voy a cambiar.&rdquo;</em>
          </p>
        </div>
      </section>

      {/* ── EXPERIENCIA ──────────────────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "2.5rem 3.5rem",
        maxWidth: "820px",
      }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem",
        }}>
          Experiencia
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1px",
          border: "1px solid var(--border)",
          marginBottom: "2rem",
        }}>
          {[
            { cifra: "15+", texto: "años gestionando negocios" },
            { cifra: "100+", texto: "empresarios acompañados en consultoría" },
            { cifra: "Múltiples", texto: "sectores: servicios, comercio, industria" },
            { cifra: "Resultados", texto: "medibles, no solo aprendizajes" },
          ].map(({ cifra, texto }) => (
            <div key={texto} style={{
              padding: "1.5rem",
              backgroundColor: "var(--card)",
            }}>
              <div style={{
                fontSize: "1.4rem", fontWeight: 900,
                letterSpacing: "-0.03em", marginBottom: "0.4rem",
              }}>
                {cifra}
              </div>
              <div style={{ fontSize: "0.825rem", color: "var(--muted)", lineHeight: 1.5 }}>
                {texto}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "620px" }}>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, margin: 0 }}>
            Detrás de Rentabilismo está <strong>Consultoría Método</strong>,
            una consultora especializada en gestión empresarial práctica para
            pymes y autónomos. El trabajo de consultoría nos ha dado acceso
            a ver de cerca los mismos errores repetirse en negocios muy distintos.
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, margin: 0 }}>
            Lo que encuentras aquí es la destilación de ese trabajo:
            los patrones que se repiten, los errores que más cuestan,
            las herramientas que realmente se aplican cuando tienes
            poco tiempo y muchos frentes abiertos.
          </p>
        </div>
      </section>

      {/* ── FOTO — placeholder hasta que llegue ──────────────── */}
      {/* TODO: añadir foto cuando esté disponible */}

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{ padding: "2.5rem 3.5rem", maxWidth: "820px" }}>
        <p style={{
          fontSize: "0.95rem", lineHeight: 1.75,
          color: "var(--muted)", margin: "0 0 1.5rem", maxWidth: "540px",
        }}>
          Si quieres saber cómo trabajamos o tienes preguntas antes de entrar,
          escríbenos directamente.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/contacto" className="btn-primary">
            Contacto
          </Link>
          <Link href="/como-funciona" className="btn-outline">
            Cómo funciona →
          </Link>
        </div>
      </section>

    </div>
  );
}
