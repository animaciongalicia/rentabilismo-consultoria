import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SidebarModulos from "@/components/SidebarModulos";
import { hasFullAccess, ROLES } from "@/config/roles";

// Rutas de /app accesibles sin pago (solo requieren estar logueado)
const FREE_APP_PATHS = [
  '/app/modulos/modulo-1-mentalidad',
  '/app/perfil',
  '/app/comunidad',
]

function isFreeAppPath(pathname: string): boolean {
  return FREE_APP_PATHS.some(
    (free) => pathname === free || pathname.startsWith(free + '/')
  )
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/registro");

  const { data: profile } = await supabase
    .from("profiles")
    .select("has_paid, role")
    .eq("id", user.id)
    .single();

  const hasPaid = hasFullAccess(profile?.has_paid ?? false, profile?.role);

  // La protección real de rutas la hace proxy.ts (middleware).
  // Aquí solo redirigimos si por algún motivo llega a rutas de pago sin pagar.
  // Las rutas gratuitas (M1, perfil, comunidad) se permiten sin pago.
  // Nota: este layout no tiene acceso al pathname, así que la protección fina
  // ya la gestiona proxy.ts. Aquí solo bloqueamos si no hay perfil.
  if (!profile) redirect("/registro");

  // Fetch module progress for sidebar indicators (one query, all modules)
  const { data: progressData } = await supabase
    .from("module_progress")
    .select("module_slug, completed_lessons, total_lessons")
    .eq("user_id", user.id);

  const progressMap: Record<string, number> = {};
  (progressData ?? []).forEach((p) => {
    progressMap[p.module_slug] = Math.round(
      (p.completed_lessons / Math.max(p.total_lessons, 1)) * 100
    );
  });

  return (
    <div style={{ display: "flex" }}>
      <SidebarModulos
        role={profile.role ?? ROLES.FREE}
        hasPaid={hasPaid}
        progressMap={progressMap}
      />
      <main style={{
        marginLeft: "260px",
        flex: 1,
        minHeight: "100vh",
        backgroundColor: "var(--background)",
      }}>
        {children}
      </main>
    </div>
  );
}
