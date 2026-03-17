import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getLesson, getLessonsForModule } from "@/config/lessons";
import LessonExercises from "@/components/LessonExercises";
import { MODULOS } from "@/config/modulos";
import { hasFullAccess } from "@/config/roles";
import { PRECIO_PROGRAMA } from "@/config/opciones";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  const { slug, lessonSlug } = await params;
  const lesson = getLesson(slug, lessonSlug);
  if (!lesson) return {};
  return { title: `${lesson.title} — Rentabilismo` };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  const { slug, lessonSlug } = await params;

  // Auth is guaranteed by layout, but we need the user id for DB queries
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const lesson = getLesson(slug, lessonSlug);
  if (!lesson) notFound();

  const lessons = getLessonsForModule(slug);
  const currentIndex = lessons.findIndex(l => l.lessonSlug === lessonSlug);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  // Module metadata for breadcrumb + navigation
  const moduloMeta = MODULOS.find(m => m.slug === slug);
  const moduloIndex = MODULOS.findIndex(m => m.slug === slug);
  const nextModulo = moduloIndex < MODULOS.length - 1 ? MODULOS[moduloIndex + 1] : null;

  // Profile for paid check
  const { data: profile } = await supabase
    .from("profiles")
    .select("has_paid, role, plan")
    .eq("id", user.id)
    .single();
  const hasPaid = hasFullAccess(profile?.has_paid ?? false, profile?.role, profile?.plan);
  const isLastLesson = !nextLesson;

  // Load existing responses for this lesson (server-side, no loading flash)
  const { data: responsesData } = await supabase
    .from("exercise_responses")
    .select("exercise_key, response")
    .eq("user_id", user.id)
    .eq("module_slug", slug)
    .eq("lesson_slug", lessonSlug);

  const responseMap: Record<string, string> = {};
  (responsesData ?? []).forEach((r) => {
    responseMap[r.exercise_key] = r.response ?? "";
  });

  const exercises = lesson.exercises.map((e) => ({
    exerciseKey: e.exerciseKey,
    prompt: e.prompt,
    orderIndex: e.orderIndex,
    initialValue: responseMap[e.exerciseKey] ?? "",
  }));

  return (
    <article className="page-content">

      {/* Breadcrumb */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "0.75rem",
        color: "var(--muted)",
        marginBottom: "2rem",
        flexWrap: "wrap",
      }}>
        <Link
          href={`/app/modulos/${slug}`}
          style={{
            color: "var(--muted)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <ChevronLeft size={12} />
          {moduloMeta?.titulo.replace(/^Módulo \d+ – /, "") ?? slug}
        </Link>
        <span>/</span>
        <span style={{ color: "var(--foreground)", fontWeight: 600 }}>{lesson.title}</span>
      </div>

      {/* Lesson position */}
      <div style={{
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: "0.75rem",
      }}>
        Lección {lesson.orderIndex} / {lessons.length}
      </div>

      {/* Lesson title */}
      <h1 style={{
        fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
        marginBottom: "1rem",
      }}>
        {lesson.title}
      </h1>

      {/* Intro text */}
      <p style={{
        fontSize: "0.975rem",
        color: "var(--muted)",
        lineHeight: 1.8,
        marginBottom: "2.5rem",
        borderLeft: "3px solid var(--border)",
        paddingLeft: "1rem",
      }}>
        {lesson.intro}
      </p>

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--border)", marginBottom: "2rem" }} />

      {/* Exercises label */}
      <div style={{
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: "1.25rem",
      }}>
        Ejercicios de esta lección
      </div>

      {/* Exercise boxes (client component handles save state + completion banner) */}
      <LessonExercises
        moduleSlug={slug}
        lessonSlug={lessonSlug}
        exercises={exercises}
      />

      {/* Banner de módulo completado — solo en última lección */}
      {isLastLesson && (
        <div style={{
          marginTop: "3rem",
          padding: "2rem",
          border: "1px solid #16a34a",
          backgroundColor: "#f0fdf4",
        }}>
          <div style={{
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#15803d", marginBottom: "0.625rem",
          }}>
            ✓ Última lección del módulo
          </div>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#14532d" }}>
            Has terminado {moduloMeta?.titulo ?? "este módulo"}.
          </h2>
          <p style={{ fontSize: "0.875rem", color: "#166534", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            Bien hecho. Cada módulo que completas es una capa menos de confusión sobre tu negocio.
            No pases al siguiente sin haber respondido con honestidad en este.
          </p>
          {nextModulo && (
            hasPaid ? (
              <Link
                href={`/app/modulos/${nextModulo.slug}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.625rem 1.25rem",
                  backgroundColor: "#15803d", color: "#fff",
                  fontWeight: 700, fontSize: "0.825rem",
                  textDecoration: "none", letterSpacing: "0.02em",
                }}
              >
                Siguiente módulo: {nextModulo.titulo.replace(/^Módulo \d+ – /, "")}
                <ArrowRight size={14} />
              </Link>
            ) : (
              <Link
                href="/programa"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.625rem 1.25rem",
                  backgroundColor: "#15803d", color: "#fff",
                  fontWeight: 700, fontSize: "0.825rem",
                  textDecoration: "none", letterSpacing: "0.02em",
                }}
              >
                Ver el programa completo — {PRECIO_PROGRAMA} €
                <ArrowRight size={14} />
              </Link>
            )
          )}
          {!nextModulo && (
            <Link
              href="/app/progreso"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                backgroundColor: "#15803d", color: "#fff",
                fontWeight: 700, fontSize: "0.825rem",
                textDecoration: "none",
              }}
            >
              Ver mi progreso completo <ArrowRight size={14} />
            </Link>
          )}
        </div>
      )}

      {/* Lesson navigation */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        marginTop: "3.5rem",
        paddingTop: "2rem",
        borderTop: "1px solid var(--border)",
      }}>
        {prevLesson ? (
          <Link
            href={`/app/modulos/${slug}/${prevLesson.lessonSlug}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.825rem",
              fontWeight: 600,
              color: "var(--foreground)",
              textDecoration: "none",
            }}
          >
            <ChevronLeft size={15} />
            <span>
              <span style={{ display: "block", fontSize: "0.65rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Anterior</span>
              {prevLesson.title}
            </span>
          </Link>
        ) : (
          <Link
            href={`/app/modulos/${slug}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.825rem",
              fontWeight: 600,
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            <ChevronLeft size={15} />
            <span>
              <span style={{ display: "block", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Volver al</span>
              módulo
            </span>
          </Link>
        )}

        {nextLesson && (
          <Link
            href={`/app/modulos/${slug}/${nextLesson.lessonSlug}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.825rem",
              fontWeight: 600,
              color: "var(--foreground)",
              textDecoration: "none",
              textAlign: "right",
            }}
          >
            <span>
              <span style={{ display: "block", fontSize: "0.65rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Siguiente</span>
              {nextLesson.title}
            </span>
            <ChevronRight size={15} />
          </Link>
        )}
      </div>
    </article>
  );
}
