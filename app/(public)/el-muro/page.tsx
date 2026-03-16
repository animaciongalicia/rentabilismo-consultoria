import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "El Muro — Rentabilismo",
  description: "Empresarios reales que nombraron su problema. ¿Te reconoces en alguno?",
};

type Role = "founder" | "admin" | "member" | "free";

type Profile = {
  id: string;
  full_name: string;
  age: number;
  country: string;
  pain_phrase: string;
  role: Role;
  created_at: string;
};

const ROLE_BADGE: Record<Role, { label: string; style: React.CSSProperties } | null> = {
  founder: {
    label: "Fundador",
    style: { backgroundColor: "var(--foreground)", color: "#fff", fontWeight: 700 },
  },
  admin: {
    label: "Admin",
    style: { backgroundColor: "#444", color: "#fff", fontWeight: 700 },
  },
  member: {
    label: "Miembro",
    style: { border: "1px solid var(--foreground)", color: "var(--foreground)", fontWeight: 600 },
  },
  free: null,
};

async function getProfiles(): Promise<Profile[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, age, country, pain_phrase, role, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error fetching profiles:", error.message);
    return [];
  }
  return data ?? [];
}

export default async function ElMuroPage() {
  const profiles = await getProfiles();

  const counts = {
    total: profiles.length,
    founders: profiles.filter(p => p.role === "founder").length,
    members: profiles.filter(p => p.role === "member").length,
    free: profiles.filter(p => p.role === "free").length,
  };

  return (
    <div>
      {/* ── CABECERA ─────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid var(--border)", padding: "4rem 3.5rem 3rem", maxWidth: "820px" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>
          El Muro
        </div>

        <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "1rem" }}>
          Empresarios que nombraron su problema.
        </h1>

        <p style={{ fontSize: "0.925rem", color: "var(--muted)", lineHeight: 1.75, maxWidth: "560px", marginBottom: "2rem" }}>
          El primer paso para cambiar algo es atreverse a nombrarlo. Aquí no hay
          historias de éxito ni casos de estudio perfectos. Solo empresarios reales
          que escribieron su verdad en una frase. Si te reconoces en alguna,
          ya sabes que no estás solo.
        </p>

        {/* Stats de roles — solo si hay gente */}
        {counts.total > 0 && (
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { n: counts.total, label: "en el muro" },
              counts.founders > 0 && { n: counts.founders, label: "fundadores" },
              counts.members > 0 && { n: counts.members, label: "miembros" },
              counts.free > 0 && { n: counts.free, label: "exploradores" },
            ].filter(Boolean).map((item) => {
              const { n, label } = item as { n: number; label: string };
              return (
                <div key={label}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>{n}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── GRID DE PERFILES ─────────────────────────────── */}
      <section style={{ padding: "3rem 3.5rem" }}>

        {/* Leyenda de roles */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.7rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Roles:</span>
          {(Object.entries(ROLE_BADGE) as [Role, typeof ROLE_BADGE[Role]][])
            .filter(([, badge]) => badge !== null)
            .map(([role, badge]) => (
              <span key={role} style={{
                fontSize: "0.65rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.2rem 0.5rem",
                ...badge!.style,
              }}>
                {badge!.label}
              </span>
            ))}
          <span style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            (sin badge = explorador)
          </span>
        </div>

        {profiles.length === 0 ? (
          <div style={{ border: "1px solid var(--border)", padding: "2.5rem", maxWidth: "400px", backgroundColor: "var(--card)" }}>
            <p style={{ fontWeight: 600, marginBottom: "0.375rem" }}>El Muro está vacío todavía.</p>
            <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>Sé el primero en colgar tu verdad.</p>
            <Link href="/registro" className="btn-primary">Ser el primero</Link>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1rem",
          }}>
            {profiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: "3rem", borderTop: "1px solid var(--border)", paddingTop: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.925rem", marginBottom: "0.25rem" }}>¿Te ves reflejado?</p>
            <p style={{ color: "var(--muted)", fontSize: "0.825rem" }}>Nombra tu problema. Únete al muro.</p>
          </div>
          <Link href="/registro" className="btn-primary">
            Unirme <ArrowRight size={13} style={{ display: "inline", verticalAlign: "middle", marginLeft: "0.25rem" }} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProfileCard({ profile }: { profile: Profile }) {
  const initials = profile.full_name
    .split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();

  const badge = ROLE_BADGE[profile.role];

  return (
    <div className="card-brutal" style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: "32px", height: "32px",
            backgroundColor: profile.role === "founder" ? "var(--foreground)" : profile.role === "member" ? "#333" : "#e0e0e0",
            color: profile.role === "free" ? "var(--foreground)" : "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: "0.7rem", flexShrink: 0,
          }}>
            {initials}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{profile.full_name}</div>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.1rem" }}>
              <span style={{ fontSize: "0.68rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.15rem" }}>
                <Calendar size={9} /> {profile.age}a
              </span>
              <span style={{ fontSize: "0.68rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.15rem" }}>
                <MapPin size={9} /> {profile.country}
              </span>
            </div>
          </div>
        </div>

        {badge && (
          <span style={{
            fontSize: "0.6rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "0.15rem 0.4rem",
            whiteSpace: "nowrap",
            flexShrink: 0,
            ...badge.style,
          }}>
            {badge.label}
          </span>
        )}
      </div>

      <blockquote style={{
        borderLeft: "2px solid var(--border)",
        paddingLeft: "0.75rem",
        margin: 0,
        fontSize: "0.85rem",
        lineHeight: 1.6,
        fontStyle: "italic",
        color: "var(--foreground)",
      }}>
        &ldquo;{profile.pain_phrase}&rdquo;
      </blockquote>
    </div>
  );
}
