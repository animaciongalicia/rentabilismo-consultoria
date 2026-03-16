"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export const MODULOS = [
  { slug: "modulo-1-mentalidad",   titulo: "Módulo 1 – Mentalidad Empresarial" },
  { slug: "modulo-2-diagnostico",  titulo: "Módulo 2 – Diagnóstico de Rentabilidad" },
  { slug: "modulo-3-finanzas",     titulo: "Módulo 3 – Control Financiero" },
  { slug: "modulo-4-precios",      titulo: "Módulo 4 – Estrategia de Precios" },
  { slug: "modulo-5-operaciones",  titulo: "Módulo 5 – Operaciones y Procesos" },
  { slug: "modulo-6-equipo",       titulo: "Módulo 6 – Equipo y Liderazgo" },
  { slug: "modulo-7-ventas",       titulo: "Módulo 7 – Ventas y Captación" },
  { slug: "modulo-8-marketing",    titulo: "Módulo 8 – Marketing y Posicionamiento" },
  { slug: "modulo-9-estrategia",   titulo: "Módulo 9 – Estrategia y Crecimiento" },
  { slug: "modulo-10-plan-accion", titulo: "Módulo 10 – Tu Plan de Acción" },
];

export default function SidebarModulos() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: "260px",
      minHeight: "100vh",
      backgroundColor: "#0a0a0a",
      color: "#fff",
      position: "fixed",
      top: 0,
      left: 0,
      display: "flex",
      flexDirection: "column",
      zIndex: 100,
      overflowY: "auto",
    }}>
      {/* Cabecera */}
      <div style={{ padding: "1.5rem 1.25rem 1rem", borderBottom: "1px solid #1e1e1e" }}>
        <Link href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          fontSize: "0.7rem",
          color: "#666",
          textDecoration: "none",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}>
          <ChevronLeft size={12} /> Inicio
        </Link>
        <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>
          La Clínica
        </div>
        <div style={{ fontSize: "0.65rem", color: "#555", marginTop: "0.2rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Programa completo
        </div>
      </div>

      {/* Lista de módulos */}
      <nav style={{ flex: 1, padding: "0.75rem 0" }}>
        {MODULOS.map((mod, i) => {
          const href = `/app/modulos/${mod.slug}`;
          const isActive = pathname === href;
          return (
            <Link
              key={mod.slug}
              href={href}
              style={{
                display: "block",
                padding: "0.625rem 1.25rem",
                fontSize: "0.8rem",
                lineHeight: 1.4,
                color: isActive ? "#fff" : "#888",
                backgroundColor: isActive ? "#1a1a1a" : "transparent",
                textDecoration: "none",
                borderLeft: isActive ? "2px solid #fff" : "2px solid transparent",
                transition: "color 0.15s, background-color 0.15s",
              }}
            >
              <span style={{
                display: "block",
                fontSize: "0.6rem",
                color: isActive ? "#aaa" : "#444",
                letterSpacing: "0.06em",
                marginBottom: "0.15rem",
                textTransform: "uppercase",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {mod.titulo.replace(/^Módulo \d+ – /, "")}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid #1e1e1e", fontSize: "0.65rem", color: "#333" }}>
        © 2026 Rentabilismo
      </div>
    </aside>
  );
}
