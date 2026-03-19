import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PerfilForm from "./PerfilForm";
import { MODULOS } from "@/config/modulos";
import { getLessonsForModule } from "@/config/lessons";

export const metadata = {
  title: "Mi perfil — Rentabilismo",
};

const AVATAR_COLORS = ["#6366f1","#0ea5e9","#10b981","#f59e0b","#8b5cf6","#ec4899","#14b8a6","#ef4444"];

function avatarColor(name: string | null): string {
  if (!name) return "#6b7280";
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

export default async function PerfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [profileResult, moduleProgressResult, recentActivityResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, country, pain_phrase, sector, business_size, objetivo_60_dias, has_paid, created_at, global_progress_pct")
      .eq("id", user.id)
      .single(),
    supabase
      .from("module_progress")
      .select("module_slug, completed_lessons, total_lessons")
      .eq("user_id", user.id),
    supabase
      .from("exercise_responses")
      .select("module_slug, lesson_slug, updated_at")
      .eq("user_id", user.id)
      .neq("response", "")
      .order("updated_at", { ascending: false })
      .limit(15),
  ]);

  const profile = profileResult.data ?? {
    full_name: null, country: null, pain_phrase: null, sector: null,
    business_size: null, objetivo_60_dias: null,
    has_paid: false, created_at: new Date().toISOString(), global_progress_pct: 0,
  };

  const progressMap = new Map(
    (moduleProgressResult.data ?? []).map(p => [p.module_slug, p])
  );

  const seen = new Set<string>();
  const recentLessons = (recentActivityResult.data ?? [])
    .filter(r => {
      if (seen.has(r.lesson_slug)) return false;
      seen.add(r.lesson_slug);
      return true;
    })
    .slice(0, 3);

  function getLessonTitle(moduleSlug: string, lessonSlug: string): string {
    const lessons = getLessonsForModule(moduleSlug);
    return lessons.find(l => l.lessonSlug === lessonSlug)?.title ?? lessonSlug;
  }

  const globalPct = profile.global_progress_pct ?? 0;

  const joinDate = new Date(profile.created_at).toLocaleDateString("es-ES", {
    year: "numeric", month: "short",
  });

  const color = avatarColor(profile.full_name);
  const initials = (profile.full_name ?? "?")
    .split(" ")
    .map((w: string) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div style={{ maxWidth: "860px", padding: "2rem 2rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>
          Mi perfil
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.875rem" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 800, color: "#fff" }}>
              {initials}
            </div>
            <span style={{ position: "absolute", bottom: "2px", right: "2px", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#16a34a", border: "2px solid var(--background)" }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.2rem" }}>
              {profile.full_name ?? "Sin nombre"}
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
              {profile.has_paid && (
                <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.15rem 0.5rem", border: "1px solid #16a34a", color: "#16a34a", borderRadius: "2px" }}>
                  Acceso activo
                </span>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", fontSize: "0.75rem", color: "var(--muted)", padding: "0.625rem 0.875rem", border: "1px solid var(--border)", backgroundColor: "var(--card)" }}>
          <span><strong style={{ color: "var(--foreground)" }}>Email</strong> — {user.email}</span>
          <span><strong style={{ color: "var(--foreground)" }}>Miembro desde</strong> — {joinDate}</span>
          {profile.country && <span><strong style={{ color: "var(--foreground)" }}>País</strong> — {profile.country}</span>}
        </div>
      </div>

      {/* Progreso */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.875rem" }}>
          Progreso en el programa
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.375rem" }}>
          <span style={{ fontSize: "0.775rem", fontWeight: 600 }}>Avance global</span>
          <span style={{ fontSize: "1rem", fontWeight: 900 }}>{globalPct}%</span>
        </div>
        <div style={{ height: "3px", backgroundColor: "var(--border)", overflow: "hidden", marginBottom: "1rem" }}>
          <div style={{ height: "100%", width: `${globalPct}%`, backgroundColor: "var(--foreground)", transition: "width 0.4s ease" }} />
        </div>

        <div style={{ border: "1px solid var(--border)", overflow: "hidden", marginBottom: "1rem" }}>
          {MODULOS.map((mod, i) => {
            const p = progressMap.get(mod.slug);
            const completed = p ? p.completed_lessons >= p.total_lessons : false;
            const inProgress = p ? p.completed_lessons > 0 && !completed : false;
            const totalLessons = p?.total_lessons ?? getLessonsForModule(mod.slug).length;
            const shortTitle = mod.titulo.replace(/^Módulo \d+ – /, "");
            return (
              <div key={mod.slug} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0.875rem", borderBottom: i < MODULOS.length - 1 ? "1px solid var(--border)" : "none", backgroundColor: completed ? "var(--card)" : "var(--background)" }}>
                <div style={{ width: "18px", height: "18px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 900, border: completed ? "none" : "1px solid var(--border)", backgroundColor: completed ? "var(--foreground)" : "transparent", color: completed ? "var(--background)" : "var(--muted)" }}>
                  {completed ? "✓" : String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ flex: 1, minWidth: 0, fontSize: "0.775rem", fontWeight: completed ? 700 : 400, color: completed ? "var(--foreground)" : inProgress ? "var(--foreground)" : "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {shortTitle}
                </div>
                <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", flexShrink: 0, color: completed ? "var(--foreground)" : inProgress ? "var(--muted)" : "#ccc" }}>
                  {completed ? "Completado" : inProgress ? `${p!.completed_lessons}/${totalLessons}` : "—"}
                </div>
              </div>
            );
          })}
        </div>

        {recentLessons.length > 0 && (
          <div>
            <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>
              Último trabajo
            </div>
            {recentLessons.map((r, i) => {
              const modTitulo = MODULOS.find(m => m.slug === r.module_slug)?.titulo.replace(/^Módulo \d+ – /, "") ?? r.module_slug;
              const lessonTitle = getLessonTitle(r.module_slug, r.lesson_slug);
              const date = new Date(r.updated_at).toLocaleDateString("es-ES", { day: "numeric", month: "short" });
              return (
                <div key={r.lesson_slug} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0", borderBottom: i < recentLessons.length - 1 ? "1px solid var(--border)" : "none", fontSize: "0.775rem" }}>
                  <span style={{ color: "var(--muted)", fontWeight: 700, flexShrink: 0 }}>—</span>
                  <span style={{ flex: 1, color: "var(--foreground)" }}>
                    {lessonTitle}
                    <span style={{ color: "var(--muted)", fontWeight: 400 }}> · {modTitulo}</span>
                  </span>
                  <span style={{ color: "var(--muted)", fontSize: "0.7rem", flexShrink: 0 }}>{date}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Datos del perfil */}
      <PerfilForm
        initialData={{
          full_name:        profile.full_name        ?? "",
          country:          profile.country          ?? "",
          pain_phrase:      profile.pain_phrase      ?? "",
          sector:           profile.sector           ?? "",
          business_size:    profile.business_size    ?? "",
          objetivo_60_dias: profile.objetivo_60_dias ?? "",
        }}
      />
    </div>
  );
}
