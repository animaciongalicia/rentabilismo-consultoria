// /app/progreso — Informe de progreso del usuario
//
// Esta página carga todas las respuestas guardadas, las agrupa por módulo y
// lección, y las muestra como un informe estructurado.
//
// TODO (Fase 6): Para generar el PDF, reemplazar el JSX de esta página por
// una llamada a @react-pdf/renderer (o una API externa como Puppeteer/WeasyPrint)
// pasando los datos de `grouped` como input. El punto de enganche está marcado
// con el comentario "← PDF hook" más abajo.

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MODULOS } from "@/components/SidebarModulos";
import { getLessonsForModule } from "@/config/lessons";
import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Mi progreso — Rentabilismo",
};

export const dynamic = "force-dynamic";

interface Response {
  module_slug: string;
  lesson_slug: string;
  exercise_key: string;
  response: string;
  updated_at: string;
}

// Helper: human-readable exercise label
function exerciseLabel(key: string): string {
  if (key === "principal") return "Ejercicio principal";
  if (key.startsWith("extra-")) return `Ejercicio ${Number(key.replace("extra-", "")) + 1}`;
  return key;
}

export default async function ProgresoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Load all saved responses for this user (non-empty only)
  const { data: responses } = await supabase
    .from("exercise_responses")
    .select("module_slug, lesson_slug, exercise_key, response, updated_at")
    .eq("user_id", user.id)
    .neq("response", "")
    .order("module_slug")
    .order("lesson_slug")
    .order("exercise_key");

  // Load progress stats
  const { data: progressData } = await supabase
    .from("module_progress")
    .select("module_slug, completed_lessons, total_lessons")
    .eq("user_id", user.id);

  const progressMap = new Map(
    (progressData ?? []).map((p) => [p.module_slug, p])
  );

  // Group responses: module → lesson → responses[]
  // ← PDF hook: pass `grouped` to PDF generator here (Fase 6)
  const grouped = new Map<string, Map<string, Response[]>>();
  for (const r of responses ?? []) {
    if (!grouped.has(r.module_slug)) grouped.set(r.module_slug, new Map());
    const lessonMap = grouped.get(r.module_slug)!;
    if (!lessonMap.has(r.lesson_slug)) lessonMap.set(r.lesson_slug, []);
    lessonMap.get(r.lesson_slug)!.push(r);
  }

  const totalResponses = (responses ?? []).length;
  const modulesStarted = grouped.size;
  const totalLessonsCompleted = Array.from(progressMap.values())
    .reduce((acc, p) => acc + p.completed_lessons, 0);

  // Sort modules by MODULOS order
  const sortedModules = MODULOS.filter((m) => grouped.has(m.slug));

  return (
    <div className="page-content">

      {/* Header */}
      <div style={{
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: "0.75rem",
      }}>
        Informe de progreso
      </div>

      <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginBottom: "0.75rem" }}>
        Mi trabajo en Rentabilismo
      </h1>

      <p style={{
        fontSize: "0.9rem",
        color: "var(--muted)",
        lineHeight: 1.75,
        marginBottom: "2.5rem",
        maxWidth: "720px",
      }}>
        Este informe recoge todo lo que has escrito en los ejercicios del programa.
        Es tuyo, nadie más puede verlo. Úsalo para revisar tu evolución o compartirlo
        con quien tú decidas.
      </p>

      {/* Stats strip */}
      {totalResponses > 0 ? (
        <>
          <div style={{
            display: "flex",
            gap: "0",
            border: "1px solid var(--border)",
            overflow: "hidden",
            marginBottom: "3rem",
          }}>
            {[
              { label: "Módulos trabajados", value: modulesStarted },
              { label: "Lecciones completadas", value: totalLessonsCompleted },
              { label: "Ejercicios respondidos", value: totalResponses },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  flex: 1,
                  padding: "1.25rem",
                  borderRight: i < 2 ? "1px solid var(--border)" : "none",
                  backgroundColor: "var(--card)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "1.75rem", fontWeight: 900 }}>{stat.value}</div>
                <div style={{
                  fontSize: "0.65rem",
                  color: "var(--muted)",
                  marginTop: "0.2rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Report body — one section per module */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {sortedModules.map((mod) => {
              const lessonMap = grouped.get(mod.slug)!;
              const lessons = getLessonsForModule(mod.slug);
              const progress = progressMap.get(mod.slug);

              return (
                <section key={mod.slug}>
                  {/* Module header */}
                  <div style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "1rem",
                    borderBottom: "2px solid var(--foreground)",
                    paddingBottom: "0.625rem",
                    marginBottom: "1.75rem",
                    flexWrap: "wrap",
                  }}>
                    <h2 style={{ fontSize: "1rem", margin: 0 }}>
                      {mod.titulo}
                    </h2>
                    {progress && (
                      <span style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}>
                        {progress.completed_lessons}/{progress.total_lessons} lecciones
                      </span>
                    )}
                  </div>

                  {/* Lessons in module order */}
                  {lessons
                    .filter(l => lessonMap.has(l.lessonSlug))
                    .map(lesson => {
                      const lessonResponses = lessonMap.get(lesson.lessonSlug)!;
                      return (
                        <div key={lesson.lessonSlug} style={{ marginBottom: "1.75rem" }}>
                          <div style={{
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            marginBottom: "0.875rem",
                            color: "var(--foreground)",
                          }}>
                            {lesson.orderIndex}. {lesson.title}
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                            {lessonResponses
                              .sort((a, b) => a.exercise_key.localeCompare(b.exercise_key))
                              .map(r => {
                                const ex = lesson.exercises.find(e => e.exerciseKey === r.exercise_key);
                                return (
                                  <div
                                    key={r.exercise_key}
                                    style={{
                                      border: "1px solid var(--border)",
                                      backgroundColor: "var(--card)",
                                      padding: "1.125rem 1.25rem",
                                    }}
                                  >
                                    {ex && (
                                      <p style={{
                                        fontSize: "0.775rem",
                                        color: "var(--muted)",
                                        marginBottom: "0.625rem",
                                        lineHeight: 1.6,
                                        fontStyle: "italic",
                                      }}>
                                        {ex.prompt}
                                      </p>
                                    )}
                                    <p style={{
                                      fontSize: "0.9rem",
                                      lineHeight: 1.8,
                                      margin: 0,
                                      whiteSpace: "pre-wrap",
                                    }}>
                                      {r.response}
                                    </p>
                                    <div style={{
                                      fontSize: "0.65rem",
                                      color: "var(--muted)",
                                      marginTop: "0.75rem",
                                    }}>
                                      Guardado: {new Date(r.updated_at).toLocaleDateString("es-ES", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })}
                </section>
              );
            })}
          </div>

          {/* Footer hint for PDF */}
          <div style={{
            marginTop: "3rem",
            padding: "1.25rem",
            border: "1px dashed var(--border)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}>
            <FileText size={16} style={{ color: "var(--muted)", flexShrink: 0 }} />
            <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
              <strong style={{ color: "var(--foreground)" }}>Exportar PDF —</strong>{" "}
              Próximamente podrás descargar este informe en PDF para guardarlo o
              compartirlo con tu equipo o asesor.
            </p>
          </div>
        </>
      ) : (
        // Empty state
        <div style={{
          border: "1px solid var(--border)",
          padding: "3rem 2rem",
          textAlign: "center",
          backgroundColor: "var(--card)",
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>○</div>
          <p style={{ fontWeight: 700, marginBottom: "0.5rem" }}>
            Todavía no has guardado ningún ejercicio.
          </p>
          <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginBottom: "1.5rem", maxWidth: "360px", margin: "0 auto 1.5rem" }}>
            Empieza por el Módulo 1, elige la primera lección y responde los ejercicios.
            Todo lo que escribas aparecerá aquí.
          </p>
          <Link href="/app/modulos/modulo-1-mentalidad" className="btn-primary">
            Ir al Módulo 1
          </Link>
        </div>
      )}
    </div>
  );
}
