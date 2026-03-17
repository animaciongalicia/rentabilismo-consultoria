import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import SidebarModulos from "@/components/SidebarModulos";
import { hasFullAccess, ROLES } from "@/config/roles";
import { MODULO_GRATUITO_SLUG } from "@/config/modulos";

// Rutas de /app accesibles sin sesión (visitantes)
const GUEST_APP_PATHS = [
  `/app/modulos/${MODULO_GRATUITO_SLUG}`,
]

function isGuestAppPath(pathname: string): boolean {
  return GUEST_APP_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))
}

// Rutas de /app accesibles sin pago (solo requieren estar logueado)
const FREE_APP_PATHS = [
  `/app/modulos/${MODULO_GRATUITO_SLUG}`,
  '/app/perfil',
  '/app/comunidad',
  '/app/progreso',
  '/app/cuartel-general',
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
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Sin sesión: solo permitir rutas guest (proxy.ts ya redirige el resto)
  if (!user) {
    if (!isGuestAppPath(pathname)) redirect("/registro");
    // Visitante en módulo 1: renderizar con defaults vacíos
    return (
      <div style={{ display: "flex" }}>
        <SidebarModulos hasPaid={false} />
        <main style={{ marginLeft: "260px", flex: 1, minHeight: "100vh", backgroundColor: "var(--background)" }}>
          {children}
        </main>
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("has_paid, role, plan")
    .eq("id", user.id)
    .single();

  const hasPaid = hasFullAccess(profile?.has_paid ?? false, profile?.role, profile?.plan);

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
        plan={profile.plan ?? "free"}
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
