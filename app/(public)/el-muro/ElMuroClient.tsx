"use client";

import { useState, useMemo, useEffect } from "react";
import type { MuroProfile } from "./page";

const AVATAR_COLORS = ["#6366f1","#0ea5e9","#10b981","#f59e0b","#8b5cf6","#ec4899","#14b8a6","#ef4444"];

function avatarColor(name: string | null): string {
  if (!name) return "#6b7280";
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function getInitials(name: string | null) {
  if (!name) return "?";
  return name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
}


function normStr(s: string | null | undefined): string {
  return (s ?? "").trim().toLowerCase();
}


export default function ElMuroClient({
  profiles,
  sectores,
}: {
  profiles: MuroProfile[];
  sectores: string[];
}) {
  const [filterSector, setFilterSector] = useState("");
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setSearch(draft), 300);
    return () => clearTimeout(t);
  }, [draft]);

  const filtered = useMemo(() =>
    profiles.filter(p => {
      if (filterSector && normStr(p.sector) !== normStr(filterSector)) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!p.full_name?.toLowerCase().includes(q) && !p.pain_phrase?.toLowerCase().includes(q) && !p.sector?.toLowerCase().includes(q)) return false;
      }
      return true;
    }),
    [profiles, filterSector, search]
  );

  return (
    <div>
      {/* ── Navegación por sector (pills) ─────────────────── */}
      <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
        <button onClick={() => setFilterSector("")} style={pillStyle(filterSector === "")}>Todos</button>
        {sectores.map(s => (
          <button key={s} onClick={() => setFilterSector(s === filterSector ? "" : s)} style={pillStyle(normStr(filterSector) === normStr(s))}>
            {s}
          </button>
        ))}
      </div>

      {/* ── Búsqueda + contador ───────────────────────────── */}
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1.25rem" }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={draft}
          onChange={e => setDraft(e.target.value)}
          style={{ padding: "0.35rem 0.625rem", border: "1px solid var(--border)", backgroundColor: "var(--card)", color: "var(--foreground)", fontSize: "0.775rem", flex: "1 1 160px", fontFamily: "inherit", outline: "none" }}
        />
        {draft && (
          <button onClick={() => { setDraft(""); setSearch(""); }} style={{ padding: "0.35rem 0.625rem", border: "1px solid var(--border)", backgroundColor: "transparent", color: "var(--muted)", fontSize: "0.775rem", cursor: "pointer", fontFamily: "inherit" }}>✕</button>
        )}
        <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--muted)", flexShrink: 0 }}>
          {filtered.length} {filtered.length === 1 ? "empresa" : "empresas"}
        </span>
      </div>

      {/* ── Grid de perfiles ─────────────────────────────── */}
      {filtered.length === 0 ? (
        <div style={{ padding: "2.5rem", textAlign: "center", border: "1px solid var(--border)", color: "var(--muted)", fontSize: "0.875rem" }}>
          No hay perfiles con estos filtros.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", backgroundColor: "var(--border)", border: "1px solid var(--border)" }}>
          {filtered.map(p => <ProfileCard key={p.id} profile={p} />)}
        </div>
      )}
    </div>
  );
}

function ProfileCard({ profile: p }: { profile: MuroProfile }) {
  const initials = getInitials(p.full_name);
  const color = avatarColor(p.full_name);
  const pct = p.global_progress_pct ?? 0;

  return (
    <div style={{ padding: "1.25rem", backgroundColor: "var(--background)", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
      {/* Cabecera: avatar + nombre */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
        <div style={{ width: "34px", height: "34px", flexShrink: 0, borderRadius: "50%", backgroundColor: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.7rem" }}>
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

      {/* Objetivo 60 días */}
      {p.objetivo_60_dias && (
        <div>
          <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.3rem" }}>Objetivo 60 días</div>
          <p style={{ margin: 0, fontSize: "0.8rem", lineHeight: 1.55, color: "#444", borderLeft: "2px solid var(--border)", paddingLeft: "0.625rem" }}>
            {p.objetivo_60_dias}
          </p>
        </div>
      )}

      {/* Progreso: 10 bloques */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ display: "flex", gap: "2px", flex: 1 }}>
          {Array.from({ length: 10 }, (_, i) => {
            const filled = pct >= (i + 1) * 10;
            return (
              <div key={i} style={{ flex: 1, height: "6px", backgroundColor: filled ? (pct === 100 ? "#16a34a" : "var(--foreground)") : "var(--border)" }} />
            );
          })}
        </div>
        <div style={{ fontSize: "0.65rem", fontWeight: 700, color: pct === 100 ? "#16a34a" : "var(--muted)", flexShrink: 0 }}>{pct}%</div>
      </div>
    </div>
  );
}

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
