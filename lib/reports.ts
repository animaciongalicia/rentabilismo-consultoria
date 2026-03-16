// lib/reports.ts
// Recopila todos los datos necesarios para generar el informe PDF de un usuario.
// Recibe el user_id y un cliente Supabase ya autenticado (evita crear otro).

import { MODULOS } from "@/components/SidebarModulos";
import { getLessonsForModule } from "@/config/lessons";
import type { SupabaseClient } from "@supabase/supabase-js";

// ── Tipos exportados ──────────────────────────────────────────
export type ReportExercise = {
  exerciseKey: string;
  prompt:      string;        // Enunciado de la pregunta
  response:    string;        // Respuesta del usuario
  updatedAt:   string;        // ISO date string
};

export type ReportLesson = {
  lessonSlug:  string;
  lessonTitle: string;
  orderIndex:  number;
  exercises:   ReportExercise[];
};

export type ReportModule = {
  moduleSlug:  string;
  moduleTitle: string;
  progress:    { completed: number; total: number } | null;
  lessons:     ReportLesson[];
};

export type ReportData = {
  user: {
    name:    string;
    email:   string;
    sector:  string | null;
    country: string | null;
  };
  generatedAt: string;  // ISO date string
  stats: {
    modulesStarted:   number;
    lessonsCompleted: number;
    totalResponses:   number;
  };
  modules: ReportModule[];
};

// ── Función principal ─────────────────────────────────────────
export async function getReportData(
  userId: string,
  supabase: SupabaseClient,
  userEmail: string,
): Promise<ReportData> {

  // Perfil del usuario
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, sector, country")
    .eq("id", userId)
    .single();

  // Respuestas guardadas (no vacías), ordenadas
  const { data: rawResponses } = await supabase
    .from("exercise_responses")
    .select("module_slug, lesson_slug, exercise_key, response, updated_at")
    .eq("user_id", userId)
    .neq("response", "")
    .order("module_slug")
    .order("lesson_slug")
    .order("exercise_key");

  const responses = rawResponses ?? [];

  // Progreso por módulo
  const { data: progressData } = await supabase
    .from("module_progress")
    .select("module_slug, completed_lessons, total_lessons")
    .eq("user_id", userId);

  const progressMap = new Map(
    (progressData ?? []).map(p => [
      p.module_slug,
      { completed: p.completed_lessons, total: p.total_lessons },
    ])
  );

  // Agrupar respuestas: moduleSlug → lessonSlug → response[]
  type RawResp = { module_slug: string; lesson_slug: string; exercise_key: string; response: string; updated_at: string };
  const grouped = new Map<string, Map<string, RawResp[]>>();
  for (const r of responses) {
    if (!grouped.has(r.module_slug)) grouped.set(r.module_slug, new Map());
    const lm = grouped.get(r.module_slug)!;
    if (!lm.has(r.lesson_slug)) lm.set(r.lesson_slug, []);
    lm.get(r.lesson_slug)!.push(r);
  }

  // Construir módulos en el orden canónico definido en MODULOS
  const modules: ReportModule[] = MODULOS
    .filter(mod => grouped.has(mod.slug))
    .map(mod => {
      const lessonMap   = grouped.get(mod.slug)!;
      const lessonsConf = getLessonsForModule(mod.slug);

      const lessons: ReportLesson[] = lessonsConf
        .filter(lc => lessonMap.has(lc.lessonSlug))
        .map(lc => {
          const rawResps = lessonMap.get(lc.lessonSlug)!;

          const exercises: ReportExercise[] = lc.exercises
            .filter(ex => rawResps.some(r => r.exercise_key === ex.exerciseKey))
            .map(ex => {
              const r = rawResps.find(r => r.exercise_key === ex.exerciseKey)!;
              return {
                exerciseKey: ex.exerciseKey,
                prompt:      ex.prompt,
                response:    r.response,
                updatedAt:   r.updated_at,
              };
            });

          return {
            lessonSlug:  lc.lessonSlug,
            lessonTitle: lc.title,
            orderIndex:  lc.orderIndex,
            exercises,
          };
        });

      return {
        moduleSlug:  mod.slug,
        moduleTitle: mod.titulo,
        progress:    progressMap.get(mod.slug) ?? null,
        lessons,
      };
    });

  // Stats globales
  const totalResponses     = responses.length;
  const modulesStarted     = modules.length;
  const lessonsCompleted   = Array.from(progressMap.values())
    .reduce((acc, p) => acc + p.completed, 0);

  return {
    user: {
      name:    profile?.full_name   ?? "Empresario",
      email:   userEmail,
      sector:  profile?.sector      ?? null,
      country: profile?.country     ?? null,
    },
    generatedAt: new Date().toISOString(),
    stats: { modulesStarted, lessonsCompleted, totalResponses },
    modules,
  };
}
