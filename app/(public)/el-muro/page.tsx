import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight } from "lucide-react";
import ElMuroClient from "./ElMuroClient";

export const metadata = {
  title: "El Muro — Rentabilismo",
  description: "Empresarios reales trabajando en sus negocios. Qué sectores están dentro, qué problemas nombran y hacia dónde van.",
};

export type MuroProfile = {
  id:                  string;
  full_name:           string | null;
  country:             string | null;
  sector:              string | null;
  business_size:       string | null;
  pain_phrase:         string | null;
  objetivo_60_dias:    string | null;
  global_progress_pct: number;
  created_at:          string;
};

const HISTORIAS_REALES: {
  nombre:    string;
  sector:    string;
  cambio:    string;
  resultado: string;
}[] = [];

async function getProfiles(): Promise<MuroProfile[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, country, sector, business_size, pain_phrase, objetivo_60_dias, global_progress_pct, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (!error) {
    return (data ?? []).map(p => ({ ...p, global_progress_pct: p.global_progress_pct ?? 0 }));
  }

  // Fallback: columnas pre-migración
  const { data: base, error: baseError } = await supabase
    .from("profiles")
    .select("id, full_name, country, pain_phrase, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (baseError) {
    console.error("Error fetching El Muro profiles:", baseError.message);
    return [];
  }

  return (base ?? []).map(p => ({
    id:                  p.id,
    full_name:           p.full_name,
    country:             p.country,
    sector:              null,
    business_size:       null,
    pain_phrase:         p.pain_phrase,
    objetivo_60_dias:    null,
    global_progress_pct: 0,
    created_at:          p.created_at,
  }));
}

function getUniqueSectores(profiles: MuroProfile[]): string[] {
  const seen = new Set<string>();
  return profiles
    .map(p => p.sector?.trim())
    .filter((s): s is string => !!s)
    .filter(s => { const k = s.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; })
    .sort();
}

export default async function ElMuroPage() {
  const profiles = await getProfiles();
  const sectores = getUniqueSectores(profiles);

  return (
    <div className="page-content" style={{ maxWidth: "1000px" }}>

      {/* ── CABECERA ─────────────────────────────────────── */}
      <div className="page-header-block">
        <div className="page-eyebrow">El Muro</div>

        <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)", marginBottom: "0.875rem" }}>
          Rentabilismo lo construyen<br />empresarios que hacen, no que miran.
        </h1>

        <p style={{ fontSize: "0.925rem", color: "#444", lineHeight: 1.75, maxWidth: "780px", marginBottom: "1.5rem" }}>
          Aquí ves quién está dentro, qué sectores hay, qué objetivos persiguen
          y cómo avanzan. Sin humo. Sin casos de éxito maquillados. Solo trabajo real.
        </p>

        {/* Stats */}
        {profiles.length > 0 && (
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            {[
              { n: profiles.length,  label: "en el muro" },
              sectores.length > 0 && { n: sectores.length, label: "sectores" },
            ].filter(Boolean).map(item => {
              const { n, label } = item as { n: number; label: string };
              return (
                <div key={label}>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.03em" }}>{n}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Top sectores */}
        {sectores.length > 0 && (
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {sectores
              .map(s => ({ nombre: s, n: profiles.filter(p => p.sector?.trim().toLowerCase() === s.toLowerCase()).length }))
              .sort((a, b) => b.n - a.n)
              .slice(0, 5)
              .map(({ nombre, n }) => (
                <div key={nombre} style={{ padding: "0.25rem 0.65rem", border: "1px solid var(--border)", backgroundColor: "var(--card)", fontSize: "0.72rem", color: "var(--muted)" }}>
                  {nombre} <strong style={{ color: "var(--foreground)" }}>({n})</strong>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* ── SEPARADOR ────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--border)", margin: "2rem 0" }} />

      {/* ── GRID CON FILTROS (Client Component) ──────────── */}
      {profiles.length === 0 ? (
        <div style={{ border: "1px solid var(--border)", padding: "2.5rem", maxWidth: "400px", backgroundColor: "var(--card)" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.375rem" }}>El Muro está vacío todavía.</p>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>Sé el primero.</p>
          <Link href="/registro" className="btn-primary">Ser el primero</Link>
        </div>
      ) : (
        <ElMuroClient profiles={profiles} sectores={sectores} />
      )}

      {/* ── CTA ──────────────────────────────────────────── */}
      <div style={{ marginTop: "3rem", borderTop: "1px solid var(--border)", paddingTop: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "480px" }}>
        <p style={{ fontWeight: 700, fontSize: "0.925rem", margin: 0 }}>¿Te ves reflejado?</p>
        <p style={{ color: "var(--muted)", fontSize: "0.825rem", margin: 0 }}>Crea tu cuenta, nombra tu problema y entra al Módulo 1 gratis.</p>
        <div>
          <Link href="/registro" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            Unirme <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* ── HISTORIAS REALES ─────────────────────────────── */}
      {HISTORIAS_REALES.length > 0 && (
        <div style={{ marginTop: "4rem", borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}>
          <div className="page-eyebrow" style={{ marginBottom: "0.75rem" }}>Cambios aplicados</div>
          <h2 style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", marginBottom: "1.5rem" }}>
            Lo que pasa cuando se trabaja de verdad.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1px", border: "1px solid var(--border)", backgroundColor: "var(--border)" }}>
            {HISTORIAS_REALES.map((h, i) => (
              <div key={i} style={{ padding: "1.5rem", backgroundColor: "var(--background)" }}>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>{h.sector}</div>
                <p style={{ fontSize: "0.85rem", color: "#333", lineHeight: 1.65, marginBottom: "0.875rem" }}><strong>Cambio:</strong> {h.cambio}</p>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, borderLeft: "2px solid var(--foreground)", paddingLeft: "0.75rem", margin: 0 }}>{h.resultado}</p>
                <div style={{ marginTop: "0.875rem", fontSize: "0.7rem", color: "var(--muted)" }}>— {h.nombre}</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
