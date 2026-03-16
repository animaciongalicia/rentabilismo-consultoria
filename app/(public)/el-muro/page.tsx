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
  role:                string | null;
  global_progress_pct: number;
  created_at:          string;
};

// ── Historias reales (estático, editar manualmente) ───────────
// Para añadir un caso nuevo: copia uno de los objetos y edítalo.
// No hay sistema de gestión todavía — se hace manualmente aquí.
const HISTORIAS_REALES: {
  nombre:   string;
  sector:   string;
  cambio:   string;
  resultado: string;
}[] = [
  // Ejemplo (descomentar y editar cuando haya casos reales):
  // {
  //   nombre:    "Javier R.",
  //   sector:    "Hostelería y restauración",
  //   cambio:    "Revisó su carta y eliminó los 8 platos menos rentables.",
  //   resultado: "Redujo costes de materia prima un 18% sin bajar ventas.",
  // },
];

async function getProfiles(): Promise<MuroProfile[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, country, sector, business_size, pain_phrase, objetivo_60_dias, role, global_progress_pct, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Error fetching El Muro profiles:", error.message);
    return [];
  }
  return (data ?? []).map(p => ({
    ...p,
    global_progress_pct: p.global_progress_pct ?? 0,
  }));
}

function getUniqueSectores(profiles: MuroProfile[]): string[] {
  const s = profiles.map(p => p.sector).filter((s): s is string => !!s && s.trim() !== "");
  return Array.from(new Set(s)).sort();
}

export default async function ElMuroPage() {
  const profiles  = await getProfiles();
  const sectores  = getUniqueSectores(profiles);

  const counts = {
    total:     profiles.length,
    founders:  profiles.filter(p => p.role === "founder").length,
    members:   profiles.filter(p => p.role === "member").length,
    free:      profiles.filter(p => p.role === "free").length,
  };

  // Sectores con conteo para el encabezado
  const sectorCounts = sectores.map(s => ({
    nombre: s,
    n: profiles.filter(p => p.sector === s).length,
  })).sort((a, b) => b.n - a.n).slice(0, 5);

  return (
    <div>

      {/* ── CABECERA ─────────────────────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "3rem 3.5rem 2.5rem",
        maxWidth: "920px",
      }}>
        <div style={{
          fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem",
        }}>
          El Muro
        </div>

        <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "0.875rem" }}>
          Rentabilismo lo construyen<br />empresarios que hacen, no que miran.
        </h1>

        <p style={{ fontSize: "0.925rem", color: "#444", lineHeight: 1.75, maxWidth: "680px", marginBottom: "1.5rem" }}>
          Aquí ves quién está dentro, qué sectores hay, qué objetivos persiguen
          y cómo avanzan. Sin humo. Sin casos de éxito maquillados. Solo trabajo real.
        </p>

        {/* Stats */}
        {counts.total > 0 && (
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {[
              { n: counts.total,    label: "en el muro" },
              counts.founders > 0 && { n: counts.founders, label: "fundadores" },
              counts.members  > 0 && { n: counts.members,  label: "miembros" },
              counts.free     > 0 && { n: counts.free,     label: "exploradores" },
              sectores.length > 0 && { n: sectores.length, label: "sectores" },
            ].filter(Boolean).map(item => {
              const { n, label } = item as { n: number; label: string };
              return (
                <div key={label}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>{n}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Top sectores */}
        {sectorCounts.length > 0 && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {sectorCounts.map(({ nombre, n }) => (
              <div key={nombre} style={{
                padding: "0.3rem 0.75rem",
                border: "1px solid var(--border)",
                backgroundColor: "var(--card)",
                fontSize: "0.72rem", color: "var(--muted)",
              }}>
                {nombre} <strong style={{ color: "var(--foreground)" }}>({n})</strong>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── GRID CON FILTROS (Client Component) ──────────────── */}
      <section style={{ padding: "2.5rem 3.5rem", maxWidth: "1100px" }}>
        {profiles.length === 0 ? (
          <div style={{
            border: "1px solid var(--border)", padding: "2.5rem",
            maxWidth: "400px", backgroundColor: "var(--card)",
          }}>
            <p style={{ fontWeight: 600, marginBottom: "0.375rem" }}>El Muro está vacío todavía.</p>
            <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>Sé el primero.</p>
            <Link href="/registro" className="btn-primary">Ser el primero</Link>
          </div>
        ) : (
          <ElMuroClient profiles={profiles} sectores={sectores} />
        )}

        {/* CTA */}
        <div style={{
          marginTop: "3rem",
          borderTop: "1px solid var(--border)",
          paddingTop: "2rem",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap", gap: "1.5rem",
        }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.925rem", marginBottom: "0.25rem" }}>
              ¿Te ves reflejado?
            </p>
            <p style={{ color: "var(--muted)", fontSize: "0.825rem" }}>
              Crea tu cuenta, nombra tu problema y entra al Módulo 1 gratis.
            </p>
          </div>
          <Link href="/registro" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            Unirme <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ── HISTORIAS REALES ─────────────────────────────────── */}
      {HISTORIAS_REALES.length > 0 && (
        <section style={{
          borderTop: "1px solid var(--border)",
          padding: "2.5rem 3.5rem",
          maxWidth: "920px",
        }}>
          <div style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.875rem",
          }}>
            Cambios aplicados
          </div>
          <h2 style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", marginBottom: "1.5rem" }}>
            Lo que pasa cuando se trabaja de verdad.
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--border)",
          }}>
            {HISTORIAS_REALES.map((h, i) => (
              <div key={i} style={{ padding: "1.5rem", backgroundColor: "var(--background)" }}>
                <div style={{
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem",
                }}>
                  {h.sector}
                </div>
                <p style={{ fontSize: "0.85rem", color: "#333", lineHeight: 1.65, marginBottom: "0.875rem" }}>
                  <strong>Cambio:</strong> {h.cambio}
                </p>
                <p style={{
                  fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)",
                  borderLeft: "2px solid var(--foreground)", paddingLeft: "0.75rem",
                  margin: 0,
                }}>
                  {h.resultado}
                </p>
                <div style={{ marginTop: "0.875rem", fontSize: "0.7rem", color: "var(--muted)" }}>
                  — {h.nombre}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
