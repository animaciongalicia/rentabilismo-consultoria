"use client";

import { useState, useMemo, useEffect } from "react";
import type { PublicProfile } from "./page";

const AVATAR_COLORS = ["#6366f1","#0ea5e9","#10b981","#f59e0b","#8b5cf6","#ec4899","#14b8a6","#ef4444"];

function avatarColor(name: string | null): string {
  if (!name) return "#6b7280";
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function getInitials(name: string | null): string {
  if (!name) return "?";
  return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

function normStr(s: string | null | undefined): string {
  return (s ?? "").trim().toLowerCase();
}

export default function ComunidadClient({
  profiles,
  currentUserId,
}: {
  profiles: PublicProfile[];
  currentUserId: string;
}) {
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterSector, setFilterSector] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setSearch(draft), 300);
    return () => clearTimeout(t);
  }, [draft]);

  // Países únicos normalizados (case-insensitive), mostramos primera aparición
  const countries = useMemo(() => {
    const seen = new Map<string, string>();
    profiles.forEach(p => {
      if (p.country) {
        const k = normStr(p.country);
        if (!seen.has(k)) seen.set(k, p.country.trim());
      }
    });
    return Array.from(seen.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [profiles]);

  const sectors = useMemo(() =>
    Array.from(new Set(profiles.map(p => p.sector).filter(Boolean) as string[])).sort(),
    [profiles]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return profiles.filter(p => {
      if (filterCountry && normStr(p.country) !== filterCountry) return false;
      if (filterSector && p.sector !== filterSector) return false;
      if (q && !p.full_name?.toLowerCase().includes(q) && !p.pain_phrase?.toLowerCase().includes(q) && !p.sector?.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [profiles, filterCountry, filterSector, search]);

  if (profiles.length === 0) {
    return (
      <div style={{ padding: "2rem", border: "1px solid var(--border)", color: "var(--muted)", fontSize: "0.875rem", textAlign: "center" }}>
        Todavía no hay empresarios presentándose aquí.
      </div>
    );
  }

  return (
    <div>
      {/* Filtros */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={draft}
          onChange={e => setDraft(e.target.value)}
          style={{ padding: "0.35rem 0.625rem", border: "1px solid var(--border)", backgroundColor: "var(--card)", color: "var(--foreground)", fontSize: "0.775rem", flex: "1 1 140px", fontFamily: "inherit", outline: "none" }}
        />
        <select value={filterCountry} onChange={e => setFilterCountry(e.target.value)} style={selStyle}>
          <option value="">País</option>
          {countries.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
        </select>
        <select value={filterSector} onChange={e => setFilterSector(e.target.value)} style={selStyle}>
          <option value="">Sector</option>
          {sectors.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {(filterCountry || filterSector || draft) && (
          <button onClick={() => { setFilterCountry(""); setFilterSector(""); setDraft(""); setSearch(""); }} style={{ ...selStyle, backgroundColor: "transparent", color: "var(--muted)", cursor: "pointer" }}>✕</button>
        )}
        <span style={{ fontSize: "0.7rem", color: "var(--muted)", marginLeft: "auto" }}>{filtered.length}</span>
      </div>

      {/* Grid 3 columnas */}
      {filtered.length === 0 ? (
        <div style={{ padding: "2rem", textAlign: "center", border: "1px solid var(--border)", color: "var(--muted)", fontSize: "0.875rem" }}>Sin resultados.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", border: "1px solid var(--border)", backgroundColor: "var(--border)", overflow: "hidden" }}>
          {filtered.map(profile => {
            const isMe = profile.id === currentUserId;
            const color = avatarColor(profile.full_name);
            const initials = getInitials(profile.full_name);
            return (
              <div key={profile.id} style={{ padding: "0.75rem", backgroundColor: isMe ? "var(--card)" : "var(--background)", position: "relative" }}>
                {isMe && (
                  <span style={{ position: "absolute", top: "0.5rem", right: "0.5rem", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)" }}>Tú</span>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                    {initials}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.8rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {profile.full_name ?? "Anónimo"}
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {[profile.country, profile.sector].filter(Boolean).join(" · ") || "—"}
                    </div>
                  </div>
                </div>

                {profile.pain_phrase ? (
                  <p style={{ fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.45, fontStyle: "italic", margin: 0, paddingTop: "0.375rem", borderTop: "1px solid var(--border)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                    &ldquo;{profile.pain_phrase}&rdquo;
                  </p>
                ) : (
                  <p style={{ fontSize: "0.7rem", color: "var(--border)", margin: 0, paddingTop: "0.375rem", borderTop: "1px solid var(--border)" }}>—</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const selStyle: React.CSSProperties = {
  padding: "0.35rem 0.625rem",
  border: "1px solid var(--border)",
  backgroundColor: "var(--card)",
  color: "var(--foreground)",
  fontSize: "0.775rem",
  cursor: "pointer",
  fontFamily: "inherit",
};
