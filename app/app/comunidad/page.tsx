import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import ComunidadClient from "./ComunidadClient";

export const metadata = {
  title: "El Muro — Rentabilismo",
};

export type PublicProfile = {
  id: string;
  full_name: string | null;
  country: string | null;
  sector: string | null;
  pain_phrase: string | null;
  created_at: string;
};

export default async function ComunidadPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/registro");

  const admin = createAdminClient();
  const { data: profiles, error } = await admin
    .from("profiles")
    .select("id, full_name, country, sector, pain_phrase, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Comunidad] Error cargando perfiles:", error.message);
    return (
      <div style={{ maxWidth: "900px", padding: "3rem" }}>
        <div style={{ padding: "1.25rem", border: "1px solid var(--border)", color: "var(--muted)", fontSize: "0.875rem" }}>
          No se pudo cargar el muro en este momento. Inténtalo de nuevo.
        </div>
      </div>
    );
  }

  const publicProfiles: PublicProfile[] = (profiles ?? []).map((p) => ({
    id: p.id,
    full_name: p.full_name,
    country: p.country,
    sector: p.sector ?? null,
    pain_phrase: p.pain_phrase,
    created_at: p.created_at,
  }));

  return (
    <div style={{ maxWidth: "900px", padding: "3rem 3rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem",
        }}>
          El Muro
        </div>
        <h1 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", marginBottom: "0.75rem" }}>
          Los empresarios de la trinchera.
        </h1>
        <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, maxWidth: "600px" }}>
          Personas reales con negocios reales. Cada uno aquí por una razón distinta,
          pero todos con el mismo objetivo: que su empresa funcione mejor.
        </p>
        <div style={{
          marginTop: "1rem",
          padding: "0.625rem 0.875rem",
          border: "1px solid var(--border)",
          backgroundColor: "var(--card)",
          fontSize: "0.75rem",
          color: "var(--muted)",
          display: "inline-block",
        }}>
          {publicProfiles.length} {publicProfiles.length === 1 ? "empresario" : "empresarios"} en el muro
        </div>
      </div>

      <ComunidadClient profiles={publicProfiles} currentUserId={user.id} />
    </div>
  );
}
