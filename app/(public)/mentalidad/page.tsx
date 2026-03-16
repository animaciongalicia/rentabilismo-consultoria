import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Mentalidad — Rentabilismo",
  description: "Lo primero que tiene que cambiar eres tú. Sin eso, ninguna herramienta, método ni programa va a funcionar.",
};

export default function MentalidadPage() {
  return (
    <div>
      <section style={{ borderBottom: "1px solid var(--border)", padding: "2.5rem 3.5rem 2rem", maxWidth: "920px" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>
          Mentalidad
        </div>
        <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "1rem" }}>
          Lo primero que tiene que cambiar eres tú.
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
          Antes de hablar de finanzas, procesos o ventas, hay una pregunta previa
          que muy pocos se hacen con honestidad: ¿realmente quiero cambiar la forma
          en que llevo mi negocio?
        </p>
      </section>

      <section style={{ padding: "3.5rem 3.5rem", maxWidth: "920px" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.75rem" }}>
              El cambio empieza antes del programa
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8 }}>
              Muchos empresarios buscan una herramienta externa que arregle lo que
              ellos no están dispuestos a cambiar. Un software mejor. Un empleado más.
              Un método nuevo. Pero las herramientas no cambian los patrones de pensamiento
              ni las decisiones que se toman por miedo, inercia o comodidad.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginTop: "1rem" }}>
              El primer paso es reconocer que algunas cosas que has hecho hasta
              ahora no han funcionado. No porque hayas fallado como persona,
              sino porque nadie te enseñó a hacerlas de otra manera.
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.75rem" }}>
              Esto no es para todo el mundo
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8 }}>
              Rentabilismo es para empresarios que están dispuestos a hacer preguntas
              incómodas sobre su propio negocio y actuar en función de las respuestas.
              No buscamos a quien quiera que le digan lo que quiere oír.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginTop: "1rem" }}>
              Si llegas buscando validación, este no es tu sitio.
              Si llegas buscando claridad y disposición a trabajar, bienvenido.
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.75rem" }}>
              Querer cambiar es suficiente para empezar
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8 }}>
              No tienes que tener todo claro. No tienes que saber exactamente qué
              está fallando. Solo tienes que tener la convicción de que algo tiene
              que cambiar y la disposición de poner el trabajo para descubrir qué es.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginTop: "1rem" }}>
              El resto lo construimos juntos, paso a paso, módulo a módulo.
            </p>
          </div>

          {/* Cita destacada */}
          <div style={{
            borderLeft: "3px solid var(--foreground)",
            paddingLeft: "1.5rem",
            margin: "0.5rem 0",
          }}>
            <p style={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1.7, fontStyle: "italic" }}>
              &ldquo;No puedo ayudarte a cambiar tu negocio si tú no quieres cambiarlo.
              Pero si quieres, puedo acompañarte en cada paso.&rdquo;
            </p>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", paddingTop: "0.5rem" }}>
            <Link href="/programa" className="btn-primary">
              Ver el programa <ArrowRight size={13} style={{ display: "inline", verticalAlign: "middle", marginLeft: "0.25rem" }} />
            </Link>
            <Link href="/registro" className="btn-outline">
              Empezar el proceso
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
