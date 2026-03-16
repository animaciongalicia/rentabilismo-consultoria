"use client";

import { useState, useMemo } from "react";
import type { MuroProfile } from "./page";
import { ROLES } from "@/config/roles";

// ── Utilidades ────────────────────────────────────────────────
function getInitials(name: string | null) {
  if (!name) return "?";
  return name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
}

function roundProgress(pct: number): number {
  // Redondear al múltiplo de 20 más cercano: 0, 20, 40, 60, 80, 100
  return Math.round(pct / 20) * 20;
}

const BUSINESS_SIZE_LABEL: Record<string, string> = {
  autonomo: "Autónomo",
  "2-5":    "2-5 personas",
  "6-20":   "6-20 personas",
  "+20":    "+20 personas",
};

const ROLE_BADGE: Record<string, { label: string; bg: string; color: string }> = {
  founder: { label: "Fundador",   bg: "#000",    color: "#fff" },
  admin:   { label: "Admin",      bg: "#444",    color: "#fff" },
  member:  { label: "Miembro",    bg: "transparent", color: "var(--foreground)" },
  free:    { label: "Explorador", bg: "transparent", color: "#6b7280" },
};

export default function ElMuroClient({
  profiles,
  sectores,
}: {
  profiles: MuroProfile[];
  sectores: string[];
}) {
  const [filterSector, setFilterSector] = useState("");
  const [filterRole,   setFilterRole]   = useState("");

  const filtered = useMemo(() =>
    profiles.filter(p => {
      if (filterSector && p.sector !== filterSector) return false;
      if (filterRole   && p.role   !== filterRole)   return false;
      return true;
    }),
    [profiles, filterSector, filterRole]
  );

  return (
    <div>
      {/* ── Navegación por sector (pills) ─────────────────── */}
      <div style={{
        display: "flex", gap: "0.375rem", flexWrap: "wrap",
        marginBottom: "1.5rem",
        paddingBottom: "1.5rem",
        borderBottom: "1px solid var(--border)",
      }}>
        <button
          onClick={() => setFilterSector("")}
          style={pillStyle(filterSector === "")}
        >
          Todos
        </button>
        {sectores.map(s => (
          <button
            key={s}
            onClick={() => setFilterSector(s === filterSector ? "" : s)}
            style={pillStyle(filterSector === s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* ── Filtros rápidos ───────────────────────────────── */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Estado:
        </span>
        {(["", ROLES.MEMBER, ROLES.FOUNDER, ROLES.FREE] as const).map(r => {
          const labels: Record<string, string> = { "": "Todos", [ROLES.MEMBER]: "Miembro", [ROLES.FOUNDER]: "Fundador", [ROLES.FREE]: "Explorador" };
          return (
            <button key={r} onClick={() => setFilterRole(r)} style={pillStyle(filterRole === r)}>
              {labels[r]}
            </button>
          );
        })}
        <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--muted)" }}>
          {filtered.length} {filtered.length === 1 ? "empresa" : "empresas"}
        </span>
      </div>

      {/* ── Grid de perfiles ─────────────────────────────── */}
      {filtered.length === 0 ? (
        <div style={{
          padding: "2.5rem", textAlign: "center",
          border: "1px solid var(--border)", color: "var(--muted)", fontSize: "0.875rem",
        }}>
          No hay perfiles con estos filtros.
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1px",
          backgroundColor: "var(--border)",
          border: "1px solid var(--border)",
        }}>
          {filtered.map(p => <ProfileCard key={p.id} profile={p} />)}
        </div>
      )}
    </div>
  );
}

// ── Tarjeta de perfil ─────────────────────────────────────────
function ProfileCard({ profile: p }: { profile: MuroProfile }) {
  const initials = getInitials(p.full_name);
  const badge    = ROLE_BADGE[p.role ?? ROLES.FREE] ?? ROLE_BADGE[ROLES.FREE];
  const progress = roundProgress(p.global_progress_pct ?? 0);
  const isMember = p.role === ROLES.MEMBER || p.role === ROLES.FOUNDER || p.role === ROLES.ADMIN;

  return (
    <div style={{
      padding: "1.25rem",
      backgroundColor: "var(--background)",
      display: "flex",
      flexDirection: "column",
      gap: "0.875rem",
    }}>
      {/* Cabecera: avatar + nombre + badge */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
          <div style={{
            width: "34px", height: "34px", flexShrink: 0,
            backgroundColor: isMember ? "var(--foreground)" : "#ddd",
            color: isMember ? "#fff" : "#555",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: "0.7rem",
          }}>
            {initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: "0.875rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {p.full_name ?? "Empresario"}
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: "0.1rem" }}>
              {[p.country, p.sector].filter(Boolean).join(" · ")}
            </div>
          </div>
        </div>
        {/* Badge rol */}
        <span style={{
          flexShrink: 0,
          fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.07em",
          textTransform: "uppercase", padding: "0.15rem 0.45rem",
          border: "1px solid var(--border)",
          backgroundColor: badge.bg, color: badge.color,
          whiteSpace: "nowrap",
        }}>
          {badge.label}
        </span>
      </div>

      {/* Tamaño */}
      {p.business_size && (
        <div style={{
          fontSize: "0.72rem", color: "var(--muted)",
          letterSpacing: "0.04em",
        }}>
          {BUSINESS_SIZE_LABEL[p.business_size] ?? p.business_size}
        </div>
      )}

      {/* Problema */}
      {p.pain_phrase && (
        <div>
          <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.3rem" }}>
            Problema
          </div>
          <p style={{
            margin: 0, fontSize: "0.825rem", lineHeight: 1.55,
            fontStyle: "italic", color: "var(--foreground)",
            borderLeft: "2px solid var(--border)", paddingLeft: "0.625rem",
          }}>
            &ldquo;{p.pain_phrase}&rdquo;
          </p>
        </div>
      )}

      {/* Objetivo 60 días */}
      {p.objetivo_60_dias && (
        <div>
          <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.3rem" }}>
            Objetivo 60 días
          </div>
          <p style={{
            margin: 0, fontSize: "0.8rem", lineHeight: 1.55,
            color: "#444",
            borderLeft: "2px solid var(--border)", paddingLeft: "0.625rem",
          }}>
            {p.objetivo_60_dias}
          </p>
        </div>
      )}

      {/* Progreso global */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
          <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
            Progreso
          </div>
          <div style={{ fontSize: "0.7rem", fontWeight: 800, color: progress === 100 ? "#16a34a" : "var(--foreground)" }}>
            {progress}%
          </div>
        </div>
        <div style={{ height: "4px", backgroundColor: "var(--border)" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: progress === 100 ? "#16a34a" : "var(--foreground)",
            transition: "width 0.3s ease",
          }} />
        </div>
      </div>
    </div>
  );
}

// ── Estilos helpers ───────────────────────────────────────────
function pillStyle(active: boolean): React.CSSProperties {
  return {
    fontSize: "0.72rem", fontWeight: active ? 700 : 500,
    letterSpacing: "0.03em",
    padding: "0.3rem 0.75rem",
    border: "1px solid var(--border)",
    backgroundColor: active ? "var(--foreground)" : "var(--card)",
    color: active ? "var(--background)" : "var(--muted)",
    cursor: "pointer",
    transition: "all 0.12s",
    whiteSpace: "nowrap" as const,
  };
}
