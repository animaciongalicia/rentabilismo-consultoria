import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

type Profile = {
  id: string;
  full_name: string;
  age: number;
  country: string;
  pain_phrase: string;
  created_at: string;
};

async function getProfiles(): Promise<Profile[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, age, country, pain_phrase, created_at")
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) {
    console.error("Error fetching profiles:", error.message);
    return [];
  }

  return data ?? [];
}

export default async function HomePage() {
  const profiles = await getProfiles();

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        padding: "4rem 3.5rem 3.5rem",
        maxWidth: "820px",
      }}>
        <div style={{
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "1.5rem",
        }}>
          Rentabilismo — Consultoría Guiada
        </div>

        <h1 style={{
          fontSize: "clamp(1.875rem, 3.5vw, 2.875rem)",
          marginBottom: "1.25rem",
          maxWidth: "680px",
        }}>
          Consultoría guiada para hacer crecer{" "}
          <span style={{ borderBottom: "2px solid var(--foreground)", paddingBottom: "1px" }}>
            tu empresa en todos los frentes.
          </span>
        </h1>

        <p style={{
          fontSize: "0.975rem",
          color: "var(--muted)",
          lineHeight: 1.8,
          maxWidth: "540px",
          marginBottom: "1.75rem",
        }}>
          Te acompañamos en un proceso estructurado para diagnosticar y mejorar
          tu negocio: finanzas, operaciones, equipo, ventas y estrategia.
          Sin teoría. Con un plan concreto que puedas ejecutar desde el primer día.
        </p>

        {/* Áreas de consultoría */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "2rem",
        }}>
          {["Finanzas", "Operaciones", "Equipo", "Ventas", "Estrategia"].map(area => (
            <span key={area} style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "0.25rem 0.625rem",
              border: "1px solid var(--border)",
              color: "var(--muted)",
              backgroundColor: "var(--card)",
            }}>
              {area}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/registro" className="btn-primary">
            Empieza tu diagnóstico{" "}
            <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle", marginLeft: "0.25rem" }} />
          </Link>
          <Link href="/el-muro" className="btn-outline">
            Ver El Muro
          </Link>
        </div>

        {/* Stat solo si hay miembros reales */}
        {profiles.length > 0 && (
          <div style={{ marginTop: "2.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
              <strong style={{ color: "var(--foreground)", fontWeight: 700 }}>{profiles.length}</strong>
              {" "}empresarios ya colgaron su verdad en El Muro.
            </span>
          </div>
        )}
      </section>

      {/* ── EL MURO ───────────────────────────────────────── */}
      <section id="el-muro" style={{ padding: "3.5rem 3.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "0.75rem",
          }}>
            El Muro
          </div>
          <h2 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)", marginBottom: "0.625rem" }}>
            Empresarios que ya dijeron la verdad.
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem", maxWidth: "480px" }}>
            ¿Te reconoces en alguno?
          </p>
        </div>

        {profiles.length === 0 ? (
          <div style={{
            border: "1px solid var(--border)",
            padding: "2.5rem",
            maxWidth: "400px",
            backgroundColor: "var(--card)",
          }}>
            <p style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.375rem" }}>
              El Muro está vacío todavía.
            </p>
            <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              Sé el primero en colgar tu verdad aquí.
            </p>
            <Link href="/registro" className="btn-primary">
              Ser el primero
            </Link>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1rem",
          }}>
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}

        {/* CTA bajo el muro */}
        <div style={{
          marginTop: "3rem",
          borderTop: "1px solid var(--border)",
          paddingTop: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.25rem" }}>
              ¿Te identificas con alguno?
            </p>
            <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
              El primer paso es nombrarlo.
            </p>
          </div>
          <Link href="/registro" className="btn-primary">
            Únete a la trinchera
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProfileCard({ profile }: { profile: Profile }) {
  const initials = profile.full_name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="card-brutal" style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: "34px",
          height: "34px",
          backgroundColor: "var(--foreground)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: "0.75rem",
          flexShrink: 0,
        }}>
          {initials}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{profile.full_name}</div>
          <div style={{ display: "flex", gap: "0.625rem", marginTop: "0.125rem" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              <Calendar size={10} /> {profile.age} años
            </span>
            <span style={{ fontSize: "0.7rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              <MapPin size={10} /> {profile.country}
            </span>
          </div>
        </div>
      </div>

      <blockquote style={{
        borderLeft: "2px solid var(--border)",
        paddingLeft: "0.75rem",
        margin: 0,
        fontSize: "0.875rem",
        lineHeight: 1.6,
        color: "var(--foreground)",
        fontStyle: "italic",
      }}>
        &ldquo;{profile.pain_phrase}&rdquo;
      </blockquote>
    </div>
  );
}
