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

  if (!profile?.has_paid) redirect("/programa");

  return (
    <div style={{ display: "flex" }}>
      <SidebarModulos role={profile.role ?? "free"} />
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
