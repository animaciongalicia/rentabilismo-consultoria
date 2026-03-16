import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Cómo funciona — Rentabilismo",
  description: "Un proceso estructurado de consultoría guiada para diagnosticar y mejorar tu negocio en todas las áreas que importan.",
};

const FASES = [
  {
    num: "01",
    titulo: "Te registras y nos cuentas tu situación",
    texto: "El primer paso es nombrarlo. En el registro nos dices en una frase cuál es tu mayor problema ahora mismo. No hay respuestas correctas ni incorrectas.",
  },
  {
    num: "02",
    titulo: "Diagnóstico guiado",
    texto: "A través de los módulos del programa, haces un diagnóstico estructurado de tu negocio: finanzas, operaciones, equipo, ventas y estrategia. Tú eres quien responde, nosotros damos el marco.",
  },
  {
    num: "03",
    titulo: "Identificas los focos reales",
    texto: "No todo se puede arreglar a la vez. El programa te ayuda a priorizar qué cambiar primero para que cada esfuerzo tenga el mayor impacto posible.",
  },
  {
    num: "04",
    titulo: "Ejecutas con estructura",
    texto: "Cada módulo termina con pasos concretos. No teoría. No 'depende'. Acciones específicas adaptadas a tu situación que puedes empezar a aplicar.",
  },
  {
    num: "05",
    titulo: "Avanzas a tu ritmo",
    texto: "El programa es tuyo. Acceso permanente. Puedes volver a los módulos cuando lo necesites, aplicar lo que vas aprendiendo y regresar cuando tengas nuevas preguntas.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div>
      <section style={{ borderBottom: "1px solid var(--border)", padding: "4rem 3.5rem 3rem", maxWidth: "740px" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>
          Cómo funciona
        </div>
        <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "1rem" }}>
          Consultoría guiada.<br />No magia. No atajos.
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, maxWidth: "540px" }}>
          Rentabilismo es un proceso estructurado para que tú, como empresario,
          entiendas exactamente qué está fallando en tu negocio y sepas qué hacer para corregirlo.
          No te damos respuestas genéricas. Te damos las herramientas para encontrar las tuyas.
        </p>
      </section>

      <section style={{ padding: "3.5rem 3.5rem", maxWidth: "740px" }}>

        {/* Lo que NO es */}
        <div style={{ marginBottom: "3rem", padding: "1.5rem", border: "1px solid var(--border)", backgroundColor: "var(--card)" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem", color: "var(--muted)" }}>
            Lo que esto no es
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {[
              "No es un curso online con vídeos de motivación",
              "No es una consultoría que te da un informe de 80 páginas y desaparece",
              "No son técnicas de marketing ni fórmulas de crecimiento rápido",
              "No funciona si no estás dispuesto a mirarte al espejo y cambiar lo que hay que cambiar",
            ].map(item => (
              <div key={item} style={{ fontSize: "0.875rem", color: "var(--muted)", display: "flex", gap: "0.625rem" }}>
                <span style={{ flexShrink: 0, fontWeight: 700, color: "var(--foreground)" }}>—</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* El proceso */}
        <div style={{ marginBottom: "0.75rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
          El proceso
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {FASES.map((fase, i) => (
            <div key={fase.num} style={{
              display: "flex",
              gap: "1.5rem",
              padding: "1.5rem 0",
              borderBottom: i < FASES.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                fontSize: "0.65rem",
                fontWeight: 800,
                color: "var(--muted)",
                letterSpacing: "0.06em",
                minWidth: "24px",
                paddingTop: "3px",
              }}>
                {fase.num}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.925rem", marginBottom: "0.375rem" }}>
                  {fase.titulo}
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.7 }}>
                  {fase.texto}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "3rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/programa" className="btn-primary">
            Ver el programa <ArrowRight size={13} style={{ display: "inline", verticalAlign: "middle", marginLeft: "0.25rem" }} />
          </Link>
          <Link href="/registro" className="btn-outline">
            Empezar gratis
          </Link>
        </div>
      </section>
    </div>
  );
}
