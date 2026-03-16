import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PerfilForm from "./PerfilForm";

export const metadata = {
  title: "Mi perfil — Rentabilismo",
};

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

export default async function PerfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, country, pain_phrase, role, has_paid, created_at")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");

  const joinDate = new Date(profile.created_at).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const role = profile.role as string;
  const initials = (profile.full_name ?? "?")
    .split(" ")
    .map((w: string) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div style={{ maxWidth: "760px", padding: "3rem 3rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <div style={{
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem",
        }}>
          Mi perfil
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.5rem" }}>
          {/* Avatar */}
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            backgroundColor: ROLE_COLOR[role] ?? "#6b7280",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.1rem", fontWeight: 800, color: "#fff", flexShrink: 0,
          }}>
            {initials}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.25rem" }}>
              {profile.full_name}
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
              {/* Role badge */}
              <span style={{
                fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em",
                textTransform: "uppercase", padding: "0.2rem 0.6rem",
                backgroundColor: ROLE_COLOR[role] ?? "#6b7280",
                color: "#fff", borderRadius: "2px",
              }}>
                {ROLE_LABEL[role] ?? role}
              </span>
              {/* Paid badge */}
              {profile.has_paid && (
                <span style={{
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em",
                  textTransform: "uppercase", padding: "0.2rem 0.6rem",
                  border: "1px solid #16a34a", color: "#16a34a", borderRadius: "2px",
                }}>
                  Acceso activo
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Meta info */}
        <div style={{
          display: "flex", gap: "1.5rem", flexWrap: "wrap",
          fontSize: "0.775rem", color: "var(--muted)",
          padding: "0.875rem 1rem",
          border: "1px solid var(--border)",
          backgroundColor: "var(--card)",
        }}>
          <span><strong style={{ color: "var(--foreground)" }}>Email</strong> — {user.email}</span>
          <span><strong style={{ color: "var(--foreground)" }}>Miembro desde</strong> — {joinDate}</span>
          {profile.country && (
            <span><strong style={{ color: "var(--foreground)" }}>País</strong> — {profile.country}</span>
          )}
        </div>
      </div>

      {/* Edit form */}
      <PerfilForm
        initialData={{
          full_name: profile.full_name ?? "",
          country: profile.country ?? "",
          pain_phrase: profile.pain_phrase ?? "",
        }}
      />
    </div>
  );
}
