import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import AdminTable from "./AdminTable";
import { ROLES, isSuperUser } from "@/config/roles";

export const metadata = {
  title: "Admin — Rentabilismo",
};

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: myProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!myProfile || !isSuperUser(myProfile.role)) {
    redirect("/app");
  }

  // Fetch all profiles via admin client (bypasses RLS for reading emails)
  const adminClient = createAdminClient();
  const { data: profiles } = await adminClient
    .from("profiles")
    .select("id, full_name, country, role, plan, has_paid, created_at")
    .order("created_at", { ascending: false });

  // Fetch emails from auth.users via admin API
  const { data: { users: authUsers } } = await adminClient.auth.admin.listUsers({ perPage: 1000 });
  const emailMap = new Map(authUsers.map(u => [u.id, u.email ?? ""]));

  const rows = (profiles ?? []).map(p => ({
    id: p.id as string,
    full_name: (p.full_name ?? "—") as string,
    email: emailMap.get(p.id) ?? "—",
    country: (p.country ?? "") as string,
    role: (p.role ?? ROLES.FREE) as string,
    plan: (p.plan ?? "free") as string,
    has_paid: p.has_paid as boolean,
    created_at: p.created_at as string,
  }));

  return (
    <div className="page-content">
      <div style={{
        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem",
      }}>
        Panel de administración
      </div>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Usuarios</h1>
      <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "2.5rem" }}>
        {rows.length} usuarios registrados
      </p>

      {/* Stats strip */}
      <div style={{
        display: "flex", gap: "1px", marginBottom: "2.5rem",
        border: "1px solid var(--border)", backgroundColor: "var(--border)",
        overflow: "hidden",
      }}>
        {[
          { label: "Total", value: rows.length, color: "var(--foreground)" },
          { label: "Fundadores",   value: rows.filter(r => r.role === ROLES.FOUNDER).length, color: "#6366f1" },
          { label: "Admins",       value: rows.filter(r => r.role === ROLES.ADMIN).length,   color: "#d97706" },
          { label: "Miembros",     value: rows.filter(r => r.role === ROLES.MEMBER).length,  color: "#16a34a" },
          { label: "Exploradores", value: rows.filter(r => r.role === ROLES.FREE).length,    color: "#6b7280" },
          { label: "Con acceso", value: rows.filter(r => r.has_paid).length, color: "#16a34a" },
        ].map(stat => (
          <div key={stat.label} style={{
            flex: 1, padding: "1rem", backgroundColor: "var(--card)", textAlign: "center",
          }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: "0.65rem", color: "var(--muted)", marginTop: "0.2rem",
              textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <AdminTable rows={rows} myRole={myProfile.role} />
    </div>
  );
}
