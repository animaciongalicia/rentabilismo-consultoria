"use client";

import { useState, useMemo } from "react";
import type { PublicProfile } from "./page";
import { ROLES } from "@/config/roles";

const ROLE_LABEL: Record<string, string> = {
  founder: "Fundador",
  admin: "Administrador",
  member: "Miembro",
  free: "Explorador",
};

const ROLE_COLOR: Record<string, string> = {
  founder: "#6366f1",
  admin: "#d97706",
  member: "#16a34a",
  free: "#6b7280",
};

function getUniqueCountries(profiles: PublicProfile[]): string[] {
  const countries = profiles
    .map((p) => p.country)
    .filter((c): c is string => !!c && c.trim() !== "");
  return Array.from(new Set(countries)).sort();
}

function getUniqueSectors(profiles: PublicProfile[]): string[] {
  const sectors = profiles
    .map((p) => p.sector)
    .filter((s): s is string => !!s && s.trim() !== "");
  return Array.from(new Set(sectors)).sort();
}

function getInitials(name: string | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ComunidadClient({
  profiles,
  currentUserId,
}: {
  profiles: PublicProfile[];
  currentUserId: string;
}) {
  const [filterCountry, setFilterCountry] = useState<string>("");
  const [filterSector, setFilterSector] = useState<string>("");

  const countries = useMemo(() => getUniqueCountries(profiles), [profiles]);
  const sectors   = useMemo(() => getUniqueSectors(profiles), [profiles]);

  const filtered = useMemo(() => {
    return profiles.filter((p) => {
      if (filterCountry && p.country !== filterCountry) return false;
      if (filterSector  && p.sector  !== filterSector)  return false;
      return true;
    });
  }, [profiles, filterCountry, filterSector]);

  if (profiles.length === 0) {
    return (
      <div style={{
        padding: "3rem",
        textAlign: "center",
        border: "1px solid var(--border)",
        color: "var(--muted)",
        fontSize: "0.875rem",
      }}>
        Todavía no hay empresarios presentándose aquí.
      </div>
    );
  }

  return (
    <div>
      {/* Filtros */}
      <div style={{
        display: "flex", gap: "0.75rem", flexWrap: "wrap",
        marginBottom: "2rem", alignItems: "center",
      }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Filtrar:
        </div>

        <select
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
          style={{
            padding: "0.4rem 0.75rem",
            border: "1px solid var(--border)",
            backgroundColor: "var(--card)",
            color: "var(--foreground)",
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          <option value="">Todos los países</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={filterSector}
          onChange={(e) => setFilterSector(e.target.value)}
          style={{
            padding: "0.4rem 0.75rem",
            border: "1px solid var(--border)",
            backgroundColor: "var(--card)",
            color: "var(--foreground)",
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          <option value="">Todos los sectores</option>
          {sectors.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {(filterCountry || filterSector) && (
          <button
            onClick={() => { setFilterCountry(""); setFilterSector(""); }}
            style={{
              padding: "0.4rem 0.75rem",
              border: "1px solid var(--border)",
              backgroundColor: "transparent",
              color: "var(--muted)",
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
          >
            Limpiar filtros
          </button>
        )}

        <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginLeft: "auto" }}>
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Grid de perfiles */}
      {filtered.length === 0 ? (
        <div style={{
          padding: "3rem",
          textAlign: "center",
          border: "1px solid var(--border)",
          color: "var(--muted)",
          fontSize: "0.875rem",
        }}>
          No hay perfiles con estos filtros.
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1px",
          border: "1px solid var(--border)",
          backgroundColor: "var(--border)",
          overflow: "hidden",
        }}>
          {filtered.map((profile) => {
            const isCurrentUser = profile.id === currentUserId;
            const role = ROLES.FREE;
            const initials = getInitials(profile.full_name);
            const joinDate = new Date(profile.created_at).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "short",
            });

            return (
              <div
                key={profile.id}
                style={{
                  padding: "1.25rem",
                  backgroundColor: isCurrentUser ? "var(--card)" : "var(--background)",
                  position: "relative",
                }}
              >
                {isCurrentUser && (
                  <div style={{
                    position: "absolute",
                    top: "0.625rem",
                    right: "0.75rem",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}>
                    Tú
                  </div>
                )}

                {/* Avatar + nombre */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "0.875rem" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    backgroundColor: ROLE_COLOR[role] ?? "#6b7280",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.85rem", fontWeight: 800, color: "#fff", flexShrink: 0,
                  }}>
                    {initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.2rem" }}>
                      {profile.full_name ?? "Empresario anónimo"}
                    </div>
                    <div style={{ display: "flex", gap: "0.375rem", alignItems: "center", flexWrap: "wrap" }}>
                      {profile.country && (
                        <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
                          {profile.country}
                        </span>
                      )}
                      <span style={{
                        fontSize: "0.6rem", fontWeight: 700,
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        padding: "0.1rem 0.35rem",
                        backgroundColor: ROLE_COLOR[role] ?? "#6b7280",
                        color: "#fff", borderRadius: "2px",
                      }}>
                        {ROLE_LABEL[role] ?? role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sector */}
                <div style={{ marginBottom: "0.625rem", fontSize: "0.75rem", color: "var(--muted)" }}>
                  {profile.sector ?? "Sector no indicado"}
                </div>

                {/* Frase de dolor */}
                {profile.pain_phrase ? (
                  <p style={{
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                    margin: 0,
                    paddingTop: "0.75rem",
                    borderTop: "1px solid var(--border)",
                  }}>
                    &ldquo;{profile.pain_phrase}&rdquo;
                  </p>
                ) : (
                  <p style={{
                    fontSize: "0.75rem",
                    color: "var(--border)",
                    margin: 0,
                    paddingTop: "0.75rem",
                    borderTop: "1px solid var(--border)",
                  }}>
                    Sin frase todavía
                  </p>
                )}

                <div style={{ marginTop: "0.75rem", fontSize: "0.65rem", color: "#444" }}>
                  Desde {joinDate}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
