import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ChevronLeft } from "lucide-react";
import { AGENTES } from "@/config/agentes";
import { hasFullAccess } from "@/config/roles";
import AgenteForm from "../AgenteForm";

// Genera las rutas estáticas en build para todos los agentes
export async function generateStaticParams() {
  return AGENTES.map(a => ({ agente: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ agente: string }> }) {
  const { agente: slug } = await params;
  const agente = AGENTES.find(a => a.slug === slug);
  if (!agente) return { title: "Agente no encontrado — Rentabilismo" };
  return {
    title:       `${agente.nombre} — Rentabilismo`,
    description: agente.descripcion,
  };
}

export default async function AgentePage({
  params,
}: {
  params: Promise<{ agente: string }>;
}) {
  const { agente: slug } = await params;

  // Verificar que el agente existe
  const agente = AGENTES.find(a => a.slug === slug);
  if (!agente) notFound();

  // Verificar acceso — igual que en cuartel-general/page.tsx
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/registro");

  const { data: profile } = await supabase
    .from("profiles")
    .select("has_paid, role, plan")
    .eq("id", user.id)
    .single();

  const hasPaid = hasFullAccess(profile?.has_paid ?? false, profile?.role, profile?.plan);

  if (!hasPaid) redirect("/programa");

  // Posición del agente en la lista (para mostrar número)
  const index = AGENTES.findIndex(a => a.slug === slug);

  return (
    <div className="page-content" style={{ maxWidth: "720px" }}>

      {/* ── BACK ──────────────────────────────────────────── */}
      <Link
        href="/app/cuartel-general"
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.375rem",
          fontSize: "0.75rem", color: "var(--muted)", textDecoration: "none",
          letterSpacing: "0.04em", textTransform: "uppercase",
          marginBottom: "2rem",
        }}
      >
        <ChevronLeft size={13} /> Cuartel General
      </Link>

      {/* ── CABECERA ──────────────────────────────────────── */}
      <div className="page-header-block">
        <div className="page-eyebrow">
          {String(index + 1).padStart(2, "0")} / {String(AGENTES.length).padStart(2, "0")}
        </div>
        <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginBottom: "0.875rem" }}>
          {agente.nombre}
        </h1>
        <p style={{ fontSize: "0.925rem", color: "#444", lineHeight: 1.75, marginBottom: "0.5rem" }}>
          {agente.contexto}
        </p>
        <div style={{
          fontSize: "0.72rem", color: "var(--muted)",
          borderLeft: "2px solid var(--border)", paddingLeft: "0.75rem",
        }}>
          Relacionado con: {agente.modulo}
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", margin: "2rem 0" }} />

      {/* ── FORMULARIO ────────────────────────────────────── */}
      <AgenteForm
        agenteSlug={agente.slug}
        placeholder={agente.placeholder}
      />

      {/* ── NAVEGACIÓN ENTRE AGENTES ──────────────────────── */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginTop: "3rem", paddingTop: "1.5rem",
        borderTop: "1px solid var(--border)",
        gap: "1rem", flexWrap: "wrap",
      }}>
        {index > 0 ? (
          <Link
            href={`/app/cuartel-general/${AGENTES[index - 1].slug}`}
            style={{ fontSize: "0.8rem", color: "var(--muted)", textDecoration: "none" }}
          >
            ← {AGENTES[index - 1].nombre}
          </Link>
        ) : <div />}
        {index < AGENTES.length - 1 ? (
          <Link
            href={`/app/cuartel-general/${AGENTES[index + 1].slug}`}
            style={{ fontSize: "0.8rem", color: "var(--muted)", textDecoration: "none" }}
          >
            {AGENTES[index + 1].nombre} →
          </Link>
        ) : <div />}
      </div>

    </div>
  );
}
