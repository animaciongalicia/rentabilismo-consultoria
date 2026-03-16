import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SidebarModulos from "@/components/SidebarModulos";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("has_paid, role")
    .eq("id", user.id)
    .single();

  // Founders and admins always have access regardless of payment status
  const isSuperUser = profile?.role === "founder" || profile?.role === "admin";
  if (!profile?.has_paid && !isSuperUser) redirect("/programa");

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
      <SidebarModulos role={profile.role ?? "free"} progressMap={progressMap} />
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
