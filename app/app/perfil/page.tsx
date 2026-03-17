import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PerfilForm from "./PerfilForm";
import { MODULOS } from "@/config/modulos";
import { getLessonsForModule } from "@/config/lessons";

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

  const [profileResult, moduleProgressResult, recentActivityResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, country, pain_phrase, sector, business_size, objetivo_60_dias, role, has_paid, created_at, global_progress_pct")
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
    business_size: null, objetivo_60_dias: null, role: "free",
    has_paid: false, created_at: new Date().toISOString(), global_progress_pct: 0,
  };

  // Build module progress map
  const progressMap = new Map(
    (moduleProgressResult.data ?? []).map(p => [p.module_slug, p])
  );

  // Deduplicate recent activity by lessonSlug, keep 3 most recent
  const seen = new Set<string>();
  const recentLessons = (recentActivityResult.data ?? [])
    .filter(r => {
      if (seen.has(r.lesson_slug)) return false;
      seen.add(r.lesson_slug);
      return true;
    })
    .slice(0, 3);

  // Find lesson title from config
  function getLessonTitle(moduleSlug: string, lessonSlug: string): string {
    const lessons = getLessonsForModule(moduleSlug);
    return lessons.find(l => l.lessonSlug === lessonSlug)?.title ?? lessonSlug;
  }

  const globalPct = profile.global_progress_pct ?? 0;

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

      {/* ── Progreso ─────────────────────────────────────────── */}
      <div style={{ marginBottom: "3rem" }}>
        <div style={{
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem",
        }}>
          Progreso en el programa
        </div>

        {/* Global progress bar */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "baseline", marginBottom: "0.5rem",
          }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>Avance global</span>
            <span style={{ fontSize: "1.1rem", fontWeight: 900 }}>{globalPct}%</span>
          </div>
          <div style={{
            height: "4px", backgroundColor: "var(--border)",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${globalPct}%`,
              backgroundColor: "var(--foreground)",
              transition: "width 0.4s ease",
            }} />
          </div>
        </div>

        {/* Module checkpoints */}
        <div style={{
          border: "1px solid var(--border)",
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}>
          {MODULOS.map((mod, i) => {
            const p = progressMap.get(mod.slug);
            const completed = p ? p.completed_lessons >= p.total_lessons : false;
            const inProgress = p ? p.completed_lessons > 0 && !completed : false;
            const pct = p ? Math.round((p.completed_lessons / Math.max(p.total_lessons, 1)) * 100) : 0;
            const totalLessons = p?.total_lessons ?? getLessonsForModule(mod.slug).length;
            const shortTitle = mod.titulo.replace(/^Módulo \d+ – /, "");

            return (
              <div key={mod.slug} style={{
                display: "flex", alignItems: "center", gap: "0.875rem",
                padding: "0.625rem 1rem",
                borderBottom: i < MODULOS.length - 1 ? "1px solid var(--border)" : "none",
                backgroundColor: completed ? "var(--card)" : "var(--background)",
              }}>
                {/* Status marker */}
                <div style={{
                  width: "20px", height: "20px", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.65rem", fontWeight: 900,
                  border: completed ? "none" : "1px solid var(--border)",
                  backgroundColor: completed ? "var(--foreground)" : "transparent",
                  color: completed ? "var(--background)" : "var(--muted)",
                }}>
                  {completed ? "✓" : String(i + 1).padStart(2, "0")}
                </div>

                {/* Title + progress */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: "0.8rem",
                    fontWeight: completed ? 700 : 400,
                    color: completed ? "var(--foreground)" : inProgress ? "var(--foreground)" : "var(--muted)",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {shortTitle}
                  </div>
                </div>

                {/* Right label */}
                <div style={{
                  fontSize: "0.65rem", fontWeight: 700,
                  letterSpacing: "0.06em", textTransform: "uppercase", flexShrink: 0,
                  color: completed ? "var(--foreground)" : inProgress ? "var(--muted)" : "#ccc",
                }}>
                  {completed
                    ? "Completado"
                    : inProgress
                    ? `${p!.completed_lessons}/${totalLessons}`
                    : "—"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent activity */}
        {recentLessons.length > 0 && (
          <div>
            <div style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem",
            }}>
              Último trabajo
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {recentLessons.map((r, i) => {
                const modTitulo = MODULOS.find(m => m.slug === r.module_slug)?.titulo
                  .replace(/^Módulo \d+ – /, "") ?? r.module_slug;
                const lessonTitle = getLessonTitle(r.module_slug, r.lesson_slug);
                const date = new Date(r.updated_at).toLocaleDateString("es-ES", {
                  day: "numeric", month: "short",
                });
                return (
                  <div key={r.lesson_slug} style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.625rem 0",
                    borderBottom: i < recentLessons.length - 1 ? "1px solid var(--border)" : "none",
                    fontSize: "0.8rem",
                  }}>
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
          </div>
        )}
      </div>

      {/* Edit form */}
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
