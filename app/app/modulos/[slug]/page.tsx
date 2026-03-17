import { notFound, redirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getModulo, getAllSlugs } from "@/lib/mdx";
import { MODULOS } from "@/config/modulos";
import { getLessonsForModule } from "@/config/lessons";
import { PRECIO_PROGRAMA } from "@/config/opciones";
import { hasFullAccess } from "@/config/roles";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Lock, ArrowRight } from "lucide-react";
import WelcomeBanner from "@/components/WelcomeBanner";

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

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/registro");

  // Verificar estado de pago para mostrar CTA apropiado
  const { data: profile } = await supabase
    .from("profiles")
    .select("has_paid, role, plan, full_name")
    .eq("id", user.id)
    .single();

  const hasPaid = hasFullAccess(profile?.has_paid ?? false, profile?.role, profile?.plan);

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
  const isModulo1 = currentIndex === 0;
  const prev = currentIndex > 0 ? MODULOS[currentIndex - 1] : null;
  const next = currentIndex < MODULOS.length - 1 ? MODULOS[currentIndex + 1] : null;

  return (
    <>
      {/* Banner de bienvenida — solo primera visita, solo Módulo 0 */}
      {isModulo1 && !hasPaid && (
        <WelcomeBanner name={profile?.full_name ?? null} />
      )}

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
          {isModulo1 && !hasPaid && (
            <span style={{
              marginLeft: "0.75rem",
              fontSize: "0.55rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "#16a34a",
              border: "1px solid #16a34a",
              padding: "0.1rem 0.4rem",
              borderRadius: "2px",
              verticalAlign: "middle",
            }}>
              Gratis
            </span>
          )}
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

        {/* CTA de upgrade para usuarios sin pago en Módulo 0 */}
        {isModulo1 && !hasPaid && (
          progressPercent === 100 ? (
            /* Módulo completado: mensaje de felicitación + CTA */
            <div style={{
              marginTop: "3rem",
              padding: "2rem",
              border: "1px solid #16a34a",
              backgroundColor: "#f0fdf4",
            }}>
              <div style={{
                fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#15803d", marginBottom: "0.75rem",
              }}>
                ✓ Módulo completado
              </div>
              <h2 style={{ fontSize: "1.25rem", marginBottom: "0.625rem", color: "#14532d" }}>
                Has terminado el Módulo 0.
              </h2>
              <p style={{ fontSize: "0.875rem", color: "#166534", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Si lo has hecho de verdad, ya tienes más claridad mental sobre tu negocio
                que la mayoría de empresarios. El resto del programa baja a tierra:
                diagnóstico de rentabilidad, finanzas reales, precios, operaciones, equipo,
                ventas, marketing, estrategia y tu plan de acción en 60 días.
                Un solo pago, acceso permanente.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                <Link href="/programa" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", backgroundColor: "#15803d", borderColor: "#15803d" }}>
                  Ver el programa completo — {PRECIO_PROGRAMA} € <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ) : (
            /* Módulo en progreso: CTA genérico */
            <div style={{
              marginTop: "3rem",
              padding: "2rem",
              border: "1px solid var(--foreground)",
              backgroundColor: "var(--card)",
            }}>
              <div style={{
                fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem",
              }}>
                ¿Seguimos?
              </div>
              <h2 style={{ fontSize: "1.25rem", marginBottom: "0.625rem" }}>
                Desbloquea los 9 módulos restantes
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Si este módulo te ha resultado útil, el resto del programa profundiza en
                diagnóstico, finanzas, precios, operaciones, equipo, ventas, marketing,
                estrategia y tu plan de acción. Un solo pago, acceso permanente.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                <Link href="/programa" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                  Ver el programa completo — {PRECIO_PROGRAMA} € <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )
        )}

        {/* Module prev/next navigation */}
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
            hasPaid ? (
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
            ) : (
              // Usuario sin pago: el "siguiente" lleva a la página de pago
              <Link
                href="/programa"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.825rem",
                  fontWeight: 600,
                  color: progressPercent === 100 ? "var(--foreground)" : "var(--muted)",
                  textDecoration: "none",
                  textAlign: "right",
                }}
              >
                <span>
                  <span style={{ display: "block", fontSize: "0.65rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Siguiente</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    {next.titulo.replace(/^Módulo \d+ – /, "")}
                    <Lock size={12} />
                  </span>
                </span>
                <ChevronRight size={15} />
              </Link>
            )
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

        {/* Link to progress report (solo para usuarios con pago) */}
        {hasPaid && (
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
        )}

        {/* CTA de upgrade en sidebar para usuarios sin pago */}
        {!hasPaid && (
          <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
            <Link
              href="/programa"
              style={{
                display: "block",
                padding: "0.75rem",
                backgroundColor: "var(--foreground)",
                color: "var(--background)",
                textDecoration: "none",
                textAlign: "center",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Desbloquear programa — {PRECIO_PROGRAMA} €
            </Link>
          </div>
        )}
      </aside>

    </div>
    </>
  );
}
