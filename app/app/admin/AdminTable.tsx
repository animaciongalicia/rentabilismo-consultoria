"use client";

import { useState } from "react";

interface UserRow {
  id: string;
  full_name: string;
  email: string;
  country: string;
  role: string;
  has_paid: boolean;
  created_at: string;
}

const ROLES = ["founder", "admin", "member", "free"] as const;

const ROLE_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  founder: { label: "Fundador",       color: "#fff",    bg: "#6366f1", icon: "💎" },
  admin:   { label: "Admin",          color: "#fff",    bg: "#d97706", icon: "🛡️" },
  member:  { label: "Miembro",        color: "#fff",    bg: "#16a34a", icon: "✅" },
  free:    { label: "Explorador",     color: "#fff",    bg: "#6b7280", icon: "○" },
};

export default function AdminTable({ rows, myRole }: { rows: UserRow[]; myRole: string }) {
  const [users, setUsers] = useState(rows);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const canChangeFounder = myRole === "founder";

  const filtered = users.filter(u =>
    u.full_name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  async function changeRole(userId: string, newRole: string) {
    setLoadingId(userId);
    const res = await fetch("/api/admin/role", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: newRole }),
    });
    if (res.ok) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    }
    setLoadingId(null);
  }

  return (
    <div>
      {/* Search */}
      <input
        type="search"
        placeholder="Buscar por nombre o email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%", padding: "0.625rem 0.875rem", marginBottom: "1rem",
          fontSize: "0.875rem", border: "1px solid var(--border)",
          backgroundColor: "var(--card)", color: "var(--foreground)",
          outline: "none", fontFamily: "inherit", boxSizing: "border-box",
        }}
      />

      {/* Table */}
      <div style={{ border: "1px solid var(--border)", overflow: "hidden" }}>
        {/* Header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr 90px 80px 90px",
          gap: "0",
          padding: "0.625rem 1rem",
          backgroundColor: "var(--card)",
          borderBottom: "1px solid var(--border)",
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "var(--muted)",
        }}>
          <span>Usuario</span>
          <span>Email</span>
          <span>Rol</span>
          <span>Acceso</span>
          <span>Desde</span>
        </div>

        {/* Rows */}
        {filtered.length === 0 && (
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--muted)", fontSize: "0.875rem" }}>
            Sin resultados
          </div>
        )}
        {filtered.map((user, i) => {
          const cfg = ROLE_CONFIG[user.role] ?? ROLE_CONFIG.free;
          const initials = user.full_name
            .split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() || "?";
          const date = new Date(user.created_at).toLocaleDateString("es-ES", {
            day: "2-digit", month: "2-digit", year: "2-digit",
          });
          const isLoading = loadingId === user.id;

          return (
            <div
              key={user.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr 90px 80px 90px",
                alignItems: "center",
                padding: "0.75rem 1rem",
                borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
                backgroundColor: isLoading ? "var(--card)" : "transparent",
                opacity: isLoading ? 0.5 : 1,
                transition: "opacity 0.15s",
              }}
            >
              {/* Name + country */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", minWidth: 0 }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  backgroundColor: cfg.bg, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.6rem", fontWeight: 800, color: "#fff",
                }}>
                  {initials}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "0.825rem", fontWeight: 600, whiteSpace: "nowrap",
                    overflow: "hidden", textOverflow: "ellipsis" }}>
                    {user.full_name}
                  </div>
                  {user.country && (
                    <div style={{ fontSize: "0.65rem", color: "var(--muted)" }}>{user.country}</div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div style={{ fontSize: "0.775rem", color: "var(--muted)", overflow: "hidden",
                textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.email}
              </div>

              {/* Role selector */}
              <div>
                <select
                  value={user.role}
                  onChange={e => changeRole(user.id, e.target.value)}
                  disabled={isLoading || (!canChangeFounder && user.role === "founder")}
                  style={{
                    fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.4rem",
                    backgroundColor: cfg.bg, color: "#fff",
                    border: "none", borderRadius: "2px", cursor: "pointer",
                    fontFamily: "inherit", width: "100%",
                  }}
                >
                  {ROLES.map(r => (
                    <option
                      key={r}
                      value={r}
                      disabled={r === "founder" && !canChangeFounder}
                      style={{ backgroundColor: ROLE_CONFIG[r].bg }}
                    >
                      {ROLE_CONFIG[r].icon} {ROLE_CONFIG[r].label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Paid */}
              <div>
                <span style={{
                  fontSize: "0.65rem", fontWeight: 700, padding: "0.15rem 0.5rem",
                  border: `1px solid ${user.has_paid ? "#16a34a" : "var(--border)"}`,
                  color: user.has_paid ? "#16a34a" : "var(--muted)",
                  borderRadius: "2px",
                }}>
                  {user.has_paid ? "Activo" : "Free"}
                </span>
              </div>

              {/* Date */}
              <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>{date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
