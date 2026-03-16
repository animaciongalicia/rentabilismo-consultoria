import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ExternalLink, ArrowRight, Cpu } from "lucide-react";
import { AGENTES, HERRAMIENTAS_EXTERNAS } from "@/config/agentes";

export const metadata = {
  title: "Cuartel General — Rentabilismo",
  description: "Tu arsenal de agentes de IA y herramientas para trabajar tu negocio.",
};

export default async function CuartelGeneralPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/registro");

  const { data: profile } = await supabase
    .from("profiles")
    .select("has_paid, role")
    .eq("id", user.id)
    .single();

  const isSuperUser = profile?.role === "founder" || profile?.role === "admin";
  const hasPaid     = (profile?.has_paid ?? false) || isSuperUser;

  if (!hasPaid) redirect("/programa");

  return (
    <div className="page-content" style={{ maxWidth: "920px" }}>

      {/* ── CABECERA ─────────────────────────────────────── */}
      <div className="page-header-block">
        <div className="page-eyebrow">Cuartel General</div>
        <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", marginBottom: "0.875rem" }}>
          Tu arsenal de herramientas.
        </h1>
        <p style={{ fontSize: "0.925rem", color: "#444", lineHeight: 1.75, maxWidth: "620px" }}>
          Agentes de IA entrenados para tareas concretas de negocio
          y herramientas externas que ya puedes usar hoy.
          Cada uno está pensado para resolver un problema específico, no para entretener.
        </p>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", margin: "2rem 0" }} />

      {/* ── BLOQUE A: AGENTES RENTABILISTAS ──────────────── */}
      <section>
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "0.375rem" }}>
            Agentes Rentabilistas
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.7 }}>
            Una serie de asistentes de IA entrenados para tareas concretas:
            analizar competencia, fijar precios, calcular escandallos, revisar ideas…
            Cada agente trabaja contigo en un área específica y te da respuestas directas,
            sin rodeos y sin contenido genérico.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1px",
          border: "1px solid var(--border)",
          backgroundColor: "var(--border)",
        }}>
          {AGENTES.map((agente, i) => (
            <div
              key={agente.slug}
              style={{
                padding: "1.25rem",
                backgroundColor: "var(--background)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {/* Número + icono */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                  fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "var(--muted)",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Cpu size={13} style={{ color: "var(--muted)" }} />
              </div>

              {/* Nombre */}
              <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>{agente.nombre}</div>

              {/* Descripción */}
              <p style={{ fontSize: "0.8rem", color: "#555", lineHeight: 1.6, margin: 0, flex: 1 }}>
                {agente.descripcion}
              </p>

              {/* Módulo relacionado */}
              <div style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.03em" }}>
                {agente.modulo}
              </div>

              {/* CTA */}
              <Link
                href={`/app/cuartel-general/${agente.slug}`}
                className="btn-outline"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.375rem",
                  fontSize: "0.75rem", padding: "0.4rem 0.875rem",
                  alignSelf: "flex-start",
                }}
              >
                Abrir <ArrowRight size={11} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEPARADOR ────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--border)", margin: "3rem 0" }} />

      {/* ── BLOQUE B: HERRAMIENTAS EXTERNAS ──────────────── */}
      <section>
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "0.375rem" }}>
            Herramientas gratuitas externas
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.7 }}>
            Herramientas que ya puedes usar hoy, sin coste adicional.
            Construidas específicamente para empresarios que quieren trabajar en serio.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1px",
          border: "1px solid var(--border)",
          backgroundColor: "var(--border)",
        }}>
          {HERRAMIENTAS_EXTERNAS.map(herramienta => (
            <div
              key={herramienta.url}
              style={{
                padding: "1.25rem",
                backgroundColor: "var(--card)",
                display: "flex",
                flexDirection: "column",
                gap: "0.625rem",
              }}
            >
              {/* Nombre + subtítulo */}
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.15rem" }}>
                  {herramienta.nombre}
                </div>
                <div style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.03em" }}>
                  {herramienta.subtitulo}
                </div>
              </div>

              {/* Descripción */}
              <p style={{ fontSize: "0.8rem", color: "#555", lineHeight: 1.6, margin: 0, flex: 1 }}>
                {herramienta.descripcion}
              </p>

              {/* CTA — enlace externo, nueva pestaña */}
              <a
                href={herramienta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.375rem",
                  fontSize: "0.75rem", padding: "0.4rem 0.875rem",
                  alignSelf: "flex-start",
                }}
              >
                Abrir <ExternalLink size={11} />
              </a>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
