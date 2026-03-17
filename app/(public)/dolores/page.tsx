import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "¿Eres tú? — Rentabilismo",
  description: "Si has llegado hasta aquí es por algo. Reconoce tu situación y descubre si Rentabilismo es para ti.",
};

const DOLORES = [
  {
    titulo: "Tu asesor o gestor te lleva los números pero no te entiende",
    descripcion:
      "Te dicen cuánto has facturado, cuánto debes de IVA y cuándo tienes que pagar. Pero cuando les preguntas por qué no te queda dinero a fin de mes, o qué deberías cambiar para ganar más, la respuesta es un silencio incómodo o un consejo genérico. Necesitas más que alguien que rellene formularios.",
  },
  {
    titulo: "Trabajas más horas que nadie y ganas menos de lo que mereces",
    descripcion:
      "Eres el primero en llegar y el último en irte. Tu negocio depende de ti para todo. Y aun así, a fin de mes el número que ves en la cuenta no refleja el esfuerzo que has metido. Esto tiene solución, pero no es trabajar más.",
  },
  {
    titulo: "Has probado métodos y ninguno encajó en tu realidad",
    descripcion:
      "El problema de la mayoría de los métodos es que están diseñados para un tipo de negocio ideal que no existe. El tuyo tiene sus particularidades, su historia y sus condicionantes. Lo que necesitas no es otro método. Es alguien que te ayude a construir el tuyo.",
  },
  {
    titulo: "Sientes que nadie en tu entorno entiende lo que es esto",
    descripcion:
      "Tu familia, tus amigos, incluso tus empleados, no pueden entender del todo la presión de ser quien toma las decisiones, quien asume el riesgo y quien tiene que seguir adelante cuando todo va mal. En Rentabilismo, todos saben de qué estás hablando.",
  },
  {
    titulo: "Tienes claro que algo hay que cambiar pero no sabes por dónde empezar",
    descripcion:
      "La sensación de que hay demasiadas cosas rotas a la vez es paralizante. No puedes arreglar todo al mismo tiempo. El primer paso es saber qué es lo que más duele y qué tiene más impacto. Eso es exactamente lo que trabajamos primero.",
  },
  {
    titulo: "Has pagado cursos que prometían el cambio",
    descripcion:
      "Compraste el método, hiciste los módulos, aplicaste las técnicas. Pero la realidad de tu negocio no cambió. O cambió dos semanas y luego todo volvió a ser igual. El problema no eres tú. El problema es que nadie te acompañó a aplicarlo a tu caso concreto.",
  },
];

export default function DoloresPage() {
  return (
    <div>
      <section style={{ borderBottom: "1px solid var(--border)", padding: "2.5rem 3.5rem 2rem", maxWidth: "920px" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>
          ¿Eres tú?
        </div>
        <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "1rem" }}>
          Si has llegado hasta aquí, es por algo.
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
          No buscaste Rentabilismo por casualidad. Algo en tu situación actual te dijo
          que así no puede seguir. Reconoce si alguna de estas situaciones te resulta familiar.
        </p>
      </section>

      <section style={{ padding: "3.5rem 3.5rem", maxWidth: "920px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {DOLORES.map((dolor, i) => (
            <div key={dolor.titulo} style={{
              padding: "2rem 0",
              borderBottom: i < DOLORES.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.625rem", letterSpacing: "-0.01em" }}>
                {dolor.titulo}
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.8, margin: 0 }}>
                {dolor.descripcion}
              </p>
            </div>
          ))}
        </div>

        {/* Cierre */}
        <div style={{
          marginTop: "3rem",
          padding: "2rem",
          border: "1px solid var(--foreground)",
          backgroundColor: "var(--card)",
        }}>
          <p style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Si te has reconocido en algo de lo anterior, estás en el sitio correcto.
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            No prometemos milagros ni transformaciones instantáneas. Prometemos
            acompañamiento real, diagnóstico honesto y un proceso que funciona
            si tú estás dispuesto a trabajarlo.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/mentalidad" className="btn-primary">
              Lo siguiente: Mentalidad <ArrowRight size={13} style={{ display: "inline", verticalAlign: "middle", marginLeft: "0.25rem" }} />
            </Link>
            <Link href="/registro" className="btn-outline">
              Registrarme
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
