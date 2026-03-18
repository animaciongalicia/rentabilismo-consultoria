import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import { ROLES, isSuperUser } from "@/config/roles";

const VALID_ROLES = Object.values(ROLES) as string[];

export async function PATCH(request: Request) {
  // Verify caller is founder or admin
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { data: myProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!myProfile || !isSuperUser(myProfile.role)) {
    return NextResponse.json({ error: "Sin permisos" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });

  const { userId, role } = body as { userId?: string; role?: string };
  if (!userId || !role || !VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: "Parámetros inválidos" }, { status: 400 });
  }

  // Only founders can assign/remove founder role
  if (role === ROLES.FOUNDER && myProfile.role !== ROLES.FOUNDER) {
    return NextResponse.json({ error: "Solo los fundadores pueden asignar ese rol" }, { status: 403 });
  }

  // Use admin client to bypass RLS for updating another user's profile
  const adminClient = createAdminClient();
  const { error } = await adminClient
    .from("profiles")
    .update({ role })
    .eq("id", userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  console.log(`[Admin] Rol cambiado — by: ${user.id} (${myProfile.role}) → userId: ${userId} newRole: ${role}`);
  return NextResponse.json({ ok: true });
}
