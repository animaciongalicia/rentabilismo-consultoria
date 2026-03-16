import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getModulo, getAllSlugs } from "@/lib/mdx";
import { MODULOS } from "@/components/SidebarModulos";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const modulo = getModulo(slug);
  if (!modulo) return {};
  return {
    title: `${modulo.frontmatter.title} — Rentabilismo`,
    description: modulo.frontmatter.description,
  };
}

export default async function ModuloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const modulo = getModulo(slug);

  if (!modulo) notFound();

  const { frontmatter, content } = modulo;

  // Navegación anterior / siguiente
  const currentIndex = MODULOS.findIndex((m) => m.slug === slug);
  const prev = currentIndex > 0 ? MODULOS[currentIndex - 1] : null;
  const next = currentIndex < MODULOS.length - 1 ? MODULOS[currentIndex + 1] : null;

  return (
    <article style={{ maxWidth: "740px", padding: "3rem 3.5rem 5rem" }}>

      {/* Número de módulo */}
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

      {/* Título */}
      <h1 style={{
        fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
        marginBottom: "0.75rem",
      }}>
        {frontmatter.title}
      </h1>

      {/* Descripción */}
      <p style={{
        fontSize: "0.95rem",
        color: "var(--muted)",
        lineHeight: 1.7,
        marginBottom: "2rem",
        maxWidth: "580px",
      }}>
        {frontmatter.description}
      </p>

      {/* Vídeo */}
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

      {/* Divisor */}
      <div style={{ borderTop: "1px solid var(--border)", marginBottom: "2.5rem" }} />

      {/* Contenido MDX */}
      <div className="prose">
        <MDXRemote source={content} />
      </div>

      {/* Navegación anterior / siguiente */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        marginTop: "4rem",
        paddingTop: "2rem",
        borderTop: "1px solid var(--border)",
      }}>
        {prev ? (
          <Link href={`/app/modulos/${prev.slug}`} style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.825rem",
            fontWeight: 600,
            color: "var(--foreground)",
            textDecoration: "none",
          }}>
            <ChevronLeft size={15} />
            <span>
              <span style={{ display: "block", fontSize: "0.65rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Anterior</span>
              {prev.titulo.replace(/^Módulo \d+ – /, "")}
            </span>
          </Link>
        ) : <div />}

        {next && (
          <Link href={`/app/modulos/${next.slug}`} style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.825rem",
            fontWeight: 600,
            color: "var(--foreground)",
            textDecoration: "none",
            textAlign: "right",
          }}>
            <span>
              <span style={{ display: "block", fontSize: "0.65rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Siguiente</span>
              {next.titulo.replace(/^Módulo \d+ – /, "")}
            </span>
            <ChevronRight size={15} />
          </Link>
        )}
      </div>
    </article>
  );
}
