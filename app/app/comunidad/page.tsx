import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ComunidadClient from "./ComunidadClient";

export const metadata = {
  title: "Comunidad — Rentabilismo",
};

// NOTA: La mensajería directa entre usuarios NO está implementada todavía.
// Esta página solo muestra fichas públicas de los miembros.
// Para añadir mensajería en el futuro:
// 1. Crear tabla "messages" en Supabase con from_user, to_user, content, created_at
// 2. Añadir RLS policies para que cada usuario solo lea sus mensajes
// 3. Crear API route /api/messages para enviar y recibir
// 4. Añadir UI de chat en esta página o en /app/comunidad/[userId]

export type PublicProfile = {
  id: string;
  full_name: string | null;
  country: string | null;
  pain_phrase: string | null;
  role: string | null;
  created_at: string;
};

export default async function ComunidadPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/registro");

  // Obtener todos los perfiles públicos
  // Solo se muestran campos públicos: sin email, sin datos de pago
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, country, pain_phrase, role, created_at")
    .order("created_at", { ascending: false });

  const publicProfiles: PublicProfile[] = (profiles ?? []).map((p) => ({
    id: p.id,
    full_name: p.full_name,
    country: p.country,
    pain_phrase: p.pain_phrase,
    role: p.role,
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
          Comunidad
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
          {publicProfiles.length} {publicProfiles.length === 1 ? "empresario" : "empresarios"} en la comunidad
        </div>
      </div>

      {/* Client component con filtros y grid de perfiles */}
      <ComunidadClient profiles={publicProfiles} currentUserId={user.id} />
    </div>
  );
}
