import { notFound, redirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getModulo, getAllSlugs } from "@/lib/mdx";
import { MODULOS } from "@/components/SidebarModulos";
import { getLessonsForModule } from "@/config/lessons";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const modulo = getModulo(slug);
  if (!modulo) return {};
  return {
    title: `${modulo.frontmatter.title} — Rentabilismo`,
    description: modulo.frontmatter.description,
  };
}

export default async function ModuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const modulo = getModulo(slug);
  if (!modulo) notFound();

  const { frontmatter, content } = modulo;

  // User for personalized progress data
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Lessons for this module (from config)
  const lessons = getLessonsForModule(slug);

  // Which lessons has the user completed?
  const { data: responsesData } = await supabase
    .from("exercise_responses")
    .select("lesson_slug")
    .eq("user_id", user.id)
    .eq("module_slug", slug)
    .neq("response", "");

  const completedSlugs = new Set(
    (responsesData ?? []).map((r) => r.lesson_slug)
  );
  const completedCount = completedSlugs.size;
  const progressPercent = lessons.length > 0
    ? Math.round((completedCount / lessons.length) * 100)
    : 0;

  // Module prev/next navigation
  const currentIndex = MODULOS.findIndex((m) => m.slug === slug);
  const prev = currentIndex > 0 ? MODULOS[currentIndex - 1] : null;
  const next = currentIndex < MODULOS.length - 1 ? MODULOS[currentIndex + 1] : null;

  return (
    <div className="modulo-layout">

      {/* ── LEFT COLUMN: video + MDX overview ─────────────── */}
      <div className="modulo-main">

        {/* Module number */}
        <div style={{
          fontSize: "0.68rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "0.75rem",
        }}>
          {String(currentIndex + 1).padStart(2, "0")} / {String(MODULOS.length).padStart(2, "0")}
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          marginBottom: "0.75rem",
        }}>
          {frontmatter.title}
        </h1>

        {/* Description */}
        <p style={{
          fontSize: "0.95rem",
          color: "var(--muted)",
          lineHeight: 1.7,
          marginBottom: "2rem",
          maxWidth: "580px",
        }}>
          {frontmatter.description}
        </p>

        {/* Video */}
        {frontmatter.videoUrl && (
          <div style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%",
            height: 0,
            marginBottom: "2.5rem",
            border: "1px solid var(--border)",
            backgroundColor: "#000",
          }}>
            <iframe
              src={frontmatter.videoUrl}
              title={frontmatter.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
        )}

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--border)", marginBottom: "2.5rem" }} />

        {/* MDX content */}
        <div className="prose">
          <MDXRemote source={content} />
        </div>

        {/* Module prev/next */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
        }}>
          {prev ? (
            <Link
              href={`/app/modulos/${prev.slug}`}
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
                {prev.titulo.replace(/^Módulo \d+ – /, "")}
              </span>
            </Link>
          ) : <div />}

          {next && (
            <Link
              href={`/app/modulos/${next.slug}`}
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
                {next.titulo.replace(/^Módulo \d+ – /, "")}
              </span>
              <ChevronRight size={15} />
            </Link>
          )}
        </div>
      </div>

      {/* ── RIGHT COLUMN: lesson list + progress ──────────── */}
      <aside className="modulo-sidebar">

        {/* Progress header */}
        <div style={{
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "1rem",
        }}>
          Progreso del módulo
        </div>

        {/* Progress bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1.5rem",
        }}>
          <div style={{
            flex: 1,
            height: "6px",
            backgroundColor: "var(--border)",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${progressPercent}%`,
              backgroundColor: progressPercent === 100 ? "#16a34a" : "var(--foreground)",
              transition: "width 0.4s ease",
            }} />
          </div>
          <span style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: progressPercent === 100 ? "#16a34a" : "var(--foreground)",
            minWidth: "36px",
            textAlign: "right",
          }}>
            {progressPercent}%
          </span>
        </div>

        {/* Lesson list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {lessons.map((lesson) => {
            const done = completedSlugs.has(lesson.lessonSlug);
            return (
              <Link
                key={lesson.lessonSlug}
                href={`/app/modulos/${slug}/${lesson.lessonSlug}`}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.625rem",
                  padding: "0.75rem 0.875rem",
                  border: "1px solid var(--border)",
                  backgroundColor: done ? "#f0fdf4" : "var(--card)",
                  textDecoration: "none",
                  color: "var(--foreground)",
                  transition: "border-color 0.15s, background-color 0.15s",
                }}
              >
                {/* Completion indicator */}
                <div style={{
                  width: "18px",
                  height: "18px",
                  flexShrink: 0,
                  border: done ? "none" : "1.5px solid var(--border)",
                  backgroundColor: done ? "#16a34a" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.65rem",
                  color: "#fff",
                  marginTop: "1px",
                  borderRadius: "1px",
                }}>
                  {done ? "✓" : ""}
                </div>

                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontSize: "0.65rem",
                    color: "var(--muted)",
                    marginBottom: "0.15rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}>
                    Lección {lesson.orderIndex}
                  </div>
                  <div style={{
                    fontSize: "0.8rem",
                    fontWeight: done ? 600 : 500,
                    lineHeight: 1.4,
                    color: done ? "#15803d" : "var(--foreground)",
                  }}>
                    {lesson.title}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Module completed banner */}
        {progressPercent === 100 && (
          <div style={{
            marginTop: "1rem",
            padding: "0.875rem",
            backgroundColor: "#f0fdf4",
            border: "1px solid #86efac",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#15803d",
          }}>
            ✓ Módulo completado
          </div>
        )}

        {/* Link to progress report */}
        <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
          <Link
            href="/app/progreso"
            style={{
              fontSize: "0.775rem",
              color: "var(--muted)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              borderBottom: "1px dotted var(--border)",
              paddingBottom: "1px",
              width: "fit-content",
            }}
          >
            Ver informe de progreso →
          </Link>
        </div>
      </aside>

    </div>
  );
}
