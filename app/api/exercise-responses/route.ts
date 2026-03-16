import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getLessonsForModule } from "@/config/lessons";

// ── GET /api/exercise-responses?moduleSlug=…&lessonSlug=… ─────────────────
// Returns the current user's saved responses for a module (and optionally a
// specific lesson). Used to pre-populate ExerciseBox on page load.
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const moduleSlug = searchParams.get("moduleSlug");
  const lessonSlug = searchParams.get("lessonSlug");

  if (!moduleSlug) {
    return NextResponse.json({ error: "moduleSlug requerido" }, { status: 400 });
  }

  let query = supabase
    .from("exercise_responses")
    .select("lesson_slug, exercise_key, response, updated_at")
    .eq("user_id", user.id)
    .eq("module_slug", moduleSlug)
    .neq("response", "");

  if (lessonSlug) {
    query = query.eq("lesson_slug", lessonSlug);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ responses: data ?? [] });
}

// ── POST /api/exercise-responses ──────────────────────────────────────────
// Upserts one exercise response and recalculates module_progress.
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });

  const { moduleSlug, lessonSlug, exerciseKey, response } = body as {
    moduleSlug?: string;
    lessonSlug?: string;
    exerciseKey?: string;
    response?: string;
  };

  if (!moduleSlug || !lessonSlug || !exerciseKey || response === undefined) {
    return NextResponse.json({ error: "Parámetros incompletos" }, { status: 400 });
  }

  // Upsert the response
  const { error: upsertError } = await supabase
    .from("exercise_responses")
    .upsert(
      {
        user_id: user.id,
        module_slug: moduleSlug,
        lesson_slug: lessonSlug,
        exercise_key: exerciseKey,
        response: response.trim(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,module_slug,lesson_slug,exercise_key" }
    );

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  // Recalculate module progress ─────────────────────────────────────────────
  // A lesson is "completed" when ALL its exercises have non-empty responses.
  // This matches the completion badge shown in LessonExercises.tsx.
  const { data: moduleResponses } = await supabase
    .from("exercise_responses")
    .select("lesson_slug, exercise_key")
    .eq("user_id", user.id)
    .eq("module_slug", moduleSlug)
    .neq("response", "");

  const lessons = getLessonsForModule(moduleSlug);
  const completedLessons = lessons.filter((lesson) => {
    const respondedKeys = new Set(
      (moduleResponses ?? [])
        .filter((r) => r.lesson_slug === lesson.lessonSlug)
        .map((r) => r.exercise_key)
    );
    return lesson.exercises.every((e) => respondedKeys.has(e.exerciseKey));
  }).length;

  const totalLessons = getLessonsForModule(moduleSlug).length || 4;

  await supabase
    .from("module_progress")
    .upsert(
      {
        user_id: user.id,
        module_slug: moduleSlug,
        completed_lessons: completedLessons,
        total_lessons: totalLessons,
        last_update: new Date().toISOString(),
      },
      { onConflict: "user_id,module_slug" }
    );

  return NextResponse.json({ ok: true, completedLessons, totalLessons });
}
