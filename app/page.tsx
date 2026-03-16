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
        borderBottom: "3px solid var(--foreground)",
        padding: "6rem 4rem 5rem",
        maxWidth: "900px",
      }}>
        <div style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "2rem",
        }}>
          Rentabilismo — Consultoría Guiada
        </div>

        <h1 style={{
          fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          marginBottom: "2rem",
          maxWidth: "800px",
        }}>
          Tu negocio no es una ONG,{" "}
          <span style={{
            borderBottom: "4px solid var(--foreground)",
            paddingBottom: "2px",
          }}>
            pero estás perdiendo dinero.
          </span>
        </h1>

        <p style={{
          fontSize: "1.25rem",
          color: "var(--muted)",
          lineHeight: 1.7,
          maxWidth: "600px",
          marginBottom: "3rem",
        }}>
          Aquí no hay gurús ni fórmulas mágicas. Solo diagnóstico brutal y un plan de acción
          para que tu empresa empiece a funcionar como negocio, no como hobby caro.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/registro" className="btn-primary" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
            Únete a la trinchera{" "}
            <ArrowRight size={18} style={{ display: "inline", verticalAlign: "middle", marginLeft: "0.25rem" }} />
          </Link>
          <Link href="#el-muro" className="btn-outline">
            Ver El Muro
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          marginTop: "4rem",
          display: "flex",
          gap: "3rem",
          flexWrap: "wrap",
        }}>
          {[
            { num: profiles.length.toString(), label: "Empresarios en El Muro" },
            { num: "100%", label: "Sin promesas vacías" },
            { num: "0", label: "Coaches motivacionales" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.04em" }}>{num}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "0.25rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EL MURO ───────────────────────────────────────── */}
      <section id="el-muro" style={{ padding: "5rem 4rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <div style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "1rem",
          }}>
            El Muro
          </div>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "1rem" }}>
            Empresarios que ya dijeron la verdad.
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1rem", maxWidth: "560px" }}>
            Cada tarjeta es una persona real que se atrevió a nombrar su problema.
            ¿Te reconoces en alguna?
          </p>
        </div>

        {profiles.length === 0 ? (
          <div className="card-brutal" style={{
            textAlign: "center",
            padding: "4rem 2rem",
            maxWidth: "480px",
          }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              El Muro está vacío.
            </p>
            <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
              Sé el primero en colgar tu verdad aquí.
            </p>
            <Link href="/registro" className="btn-primary">
              Ser el primero
            </Link>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}>
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}

        {/* CTA bajo el muro */}
        <div style={{
          marginTop: "4rem",
          borderTop: "2px solid var(--foreground)",
          paddingTop: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "2rem",
        }}>
          <div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              ¿Te identificas con alguno?
            </h3>
            <p style={{ color: "var(--muted)" }}>
              Cuelga tu verdad en El Muro. El primer paso es nombrarlo.
            </p>
          </div>
          <Link href="/registro" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
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
    <div className="card-brutal" style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
        <div style={{
          width: "40px",
          height: "40px",
          backgroundColor: "var(--foreground)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: "0.875rem",
          flexShrink: 0,
          letterSpacing: "0.02em",
        }}>
          {initials}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{profile.full_name}</div>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.2rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              <Calendar size={11} /> {profile.age} años
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              <MapPin size={11} /> {profile.country}
            </span>
          </div>
        </div>
      </div>

      {/* Pain phrase */}
      <blockquote style={{
        borderLeft: "3px solid var(--foreground)",
        paddingLeft: "1rem",
        margin: 0,
        fontSize: "0.95rem",
        lineHeight: 1.6,
        color: "var(--foreground)",
        fontStyle: "italic",
      }}>
        &ldquo;{profile.pain_phrase}&rdquo;
      </blockquote>
    </div>
  );
}
