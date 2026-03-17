import Link from "next/link";

export const metadata = {
  title: "Quiénes somos — Rentabilismo",
  description:
    "Más de 25 años de experiencia en consultoría empresarial y negocios propios. Detrás de Rentabilismo no hay teoría: hay cicatrices y resultados reales.",
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
          Un equipo de profesionales que ha estado<br />
          donde tú estás ahora.
        </h1>
        <p style={{
          fontSize: "1.05rem", color: "var(--muted)",
          lineHeight: 1.75, margin: 0, textAlign: "justify",
        }}>
          Más de 25 años de experiencia en consultoría empresarial, tanto trabajando para terceros
          como montando negocios propios, cometiendo errores, perdiendo dinero, aprendiendo lo que
          no se enseña en ningún aula y ayudando a otros a no repetir los mismos pasos en falso.
          Detrás de Rentabilismo no hay teoría: hay cicatrices y resultados reales.
        </p>
      </section>

      {/* ── POR QUÉ EXISTE ESTO ───────────────────────────────── */}
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

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.85, margin: 0, textAlign: "justify" }}>
            Muchos empresarios llegan a un punto en el que trabajan más que nunca y, aun así, no ven
            resultados claros. Facturan, sí… pero no saben cuánto ganan realmente. Viven apagando fuegos,
            tomando decisiones rápidas sin método, aceptando clientes que no valoran su trabajo o manteniendo
            servicios que les roban tiempo y margen. El marketing les confunde, la tecnología les abruma y
            la sensación de estar siempre ocupados pero sin avanzar se convierte en una frustración constante.
            No es falta de esfuerzo. Es falta de claridad y control.
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.85, margin: 0, textAlign: "justify" }}>
            Otros llegan después de haber probado cursos, estrategias o herramientas que prometían soluciones
            rápidas y solo dejaron más dudas. Saben que su negocio puede dar más, pero se sienten solos,
            desconfiados o bloqueados por el miedo a equivocarse otra vez. Algunos quieren crecer, delegar y
            automatizar, pero todo sigue dependiendo de ellos. Otros quieren vender mejor sin sentirse
            agresivos, ordenar sus números, recuperar la ilusión o entender cómo aplicar la inteligencia
            artificial sin complicarse la vida.
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.85, margin: 0, textAlign: "justify" }}>
            Rentabilismo nace precisamente para ese momento. Para empresarios que están cansados de sobrevivir
            y quieren dirigir con método. Para quienes saben que el problema no es el mercado, sino la falta
            de enfoque, sistema y decisiones rentables. Aquí no hay teoría vacía ni promesas mágicas. Hay
            claridad, acción y herramientas reales para entender dónde se va el dinero, cómo mejorar el margen
            y cómo construir un negocio que funcione sin quemarte.{" "}
            <strong>Porque no hay milagros. Hay método.</strong>
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
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1px",
          border: "1px solid var(--border)",
          marginBottom: "2rem",
        }}>
          {[
            "Muchos años de consultoría acumulada en el equipo",
            "Varios años de experiencia gestionando negocios propios en el barro",
            "Múltiples empresas acompañadas en distintos sectores",
            "Método construido desde la práctica, no desde el aula",
          ].map((texto) => (
            <div key={texto} style={{
              padding: "1.5rem",
              backgroundColor: "var(--card)",
            }}>
              <div style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--foreground)" }}>
                {texto}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.85, margin: 0, textAlign: "justify" }}>
            Detrás de Rentabilismo está <strong>Consultoría Método</strong>, una consultora especializada
            en gestión empresarial práctica para pymes y autónomos. Nuestro trabajo no se limita al
            diagnóstico: acompañamos en la implantación, en la toma de decisiones difíciles y en la
            construcción de sistemas que hacen que el negocio funcione con menos dependencia del empresario.
            Trabajamos en áreas de finanzas, operaciones, precios, ventas, equipos y estrategia —siempre
            desde la realidad del cliente, no desde un modelo genérico.
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.85, margin: 0, textAlign: "justify" }}>
            Lo que encuentras en Rentabilismo es la destilación de ese trabajo: los patrones que se repiten,
            los errores que más cuestan, las herramientas que realmente se aplican cuando tienes poco tiempo,
            muchos frentes abiertos y la presión de que cada decisión tiene consecuencias reales. No lo hemos
            diseñado para que se vea bien en una pantalla. Lo hemos diseñado para que funcione en tu empresa.
          </p>
        </div>
      </section>

      {/* ── FOTO — placeholder hasta que llegue ──────────────── */}
      {/* TODO: añadir foto cuando esté disponible */}

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{ padding: "2.5rem 3.5rem", maxWidth: "820px" }}>
        <p style={{
          fontSize: "0.95rem", lineHeight: 1.8,
          color: "var(--muted)", margin: "0 0 1.5rem", textAlign: "justify",
        }}>
          Si tienes preguntas antes de entrar, quieres saber si esto encaja con tu tipo de negocio
          o simplemente quieres hablar con alguien real antes de decidir, escríbenos sin compromiso.
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
