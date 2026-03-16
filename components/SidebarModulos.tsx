"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, User, ShieldCheck, BarChart2, Lock, Users, Cpu } from "lucide-react";
import { MODULOS } from "@/config/modulos";
import { PRECIO_PROGRAMA } from "@/config/opciones";
import { isSuperUser } from "@/config/roles";

export { MODULOS };

export default function SidebarModulos({
  role,
  hasPaid = false,
  progressMap = {},
}: {
  role?: string;
  hasPaid?: boolean;
  progressMap?: Record<string, number>;
}) {
  const pathname = usePathname();
  const isAdmin = isSuperUser(role);

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
          Rentabilismo
        </div>
        <div style={{ fontSize: "0.65rem", color: "#555", marginTop: "0.2rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {hasPaid ? "Programa completo" : "Acceso gratuito"}
        </div>
      </div>

      {/* Lista de módulos */}
      <nav style={{ flex: 1, padding: "0.75rem 0" }}>
        {MODULOS.map((mod, i) => {
          const href = `/app/modulos/${mod.slug}`;
          const isActive = pathname === href || pathname.startsWith(href + '/');
          const isModulo1 = i === 0;
          const isLocked = !hasPaid && !isModulo1;

          if (isLocked) {
            // Módulos 1-10 bloqueados para usuarios sin pago
            return (
              <Link
                key={mod.slug}
                href="/programa"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                  padding: "0.625rem 1.25rem",
                  fontSize: "0.8rem",
                  lineHeight: 1.4,
                  color: "#444",
                  backgroundColor: "transparent",
                  textDecoration: "none",
                  borderLeft: "2px solid transparent",
                  cursor: "pointer",
                }}
                title="Desbloquear con acceso completo"
              >
                <span style={{ minWidth: 0 }}>
                  <span style={{
                    display: "block",
                    fontSize: "0.6rem",
                    color: "#333",
                    letterSpacing: "0.06em",
                    marginBottom: "0.15rem",
                    textTransform: "uppercase",
                  }}>
                    {String(i).padStart(2, "0")}
                  </span>
                  {mod.titulo.replace(/^Módulo \d+ – /, "")}
                </span>
                <Lock size={11} style={{ color: "#333", flexShrink: 0 }} />
              </Link>
            );
          }

          return (
            <Link
              key={mod.slug}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.5rem",
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
              <span style={{ minWidth: 0 }}>
                <span style={{
                  display: "block",
                  fontSize: "0.6rem",
                  color: isActive ? "#aaa" : "#444",
                  letterSpacing: "0.06em",
                  marginBottom: "0.15rem",
                  textTransform: "uppercase",
                }}>
                  {String(i).padStart(2, "0")}
                </span>
                {mod.titulo.replace(/^Módulo \d+ – /, "")}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", flexShrink: 0 }}>
                {/* Badge GRATIS en Módulo 1 para usuarios sin pago */}
                {isModulo1 && !hasPaid && (
                  <span style={{
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#4ade80",
                    border: "1px solid #4ade80",
                    padding: "0.1rem 0.35rem",
                    borderRadius: "2px",
                  }}>
                    Gratis
                  </span>
                )}
                {/* Progress indicator */}
                {progressMap[mod.slug] !== undefined && (
                  <span style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    color: progressMap[mod.slug] === 100 ? "#4ade80" : "#555",
                    letterSpacing: "0.02em",
                  }}>
                    {progressMap[mod.slug] === 100 ? "✓" : `${progressMap[mod.slug]}%`}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Banner de upgrade para usuarios sin pago */}
      {!hasPaid && (
        <div style={{
          margin: "0 0.75rem 0.75rem",
          padding: "0.875rem 1rem",
          border: "1px solid #2a2a2a",
          backgroundColor: "#111",
        }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#fff", marginBottom: "0.375rem" }}>
            10 módulos bloqueados
          </div>
          <div style={{ fontSize: "0.65rem", color: "#666", lineHeight: 1.5, marginBottom: "0.625rem" }}>
            Acceso completo con un solo pago.
          </div>
          <Link href="/programa" style={{
            display: "block",
            textAlign: "center",
            padding: "0.5rem",
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "0.7rem",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}>
            Desbloquear — {PRECIO_PROGRAMA} €
          </Link>
        </div>
      )}

      {/* Bottom links */}
      <div style={{ borderTop: "1px solid #1e1e1e" }}>
        {/* Cuartel General — visible para todos; herramientas gratuitas + agentes (pago) */}
        <Link
          href="/app/cuartel-general"
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.625rem 1.25rem",
            fontSize: "0.75rem",
            color: pathname.startsWith("/app/cuartel-general") ? "#fff" : "#666",
            backgroundColor: pathname.startsWith("/app/cuartel-general") ? "#1a1a1a" : "transparent",
            textDecoration: "none",
            borderLeft: pathname.startsWith("/app/cuartel-general") ? "2px solid #fff" : "2px solid transparent",
          }}
        >
          <Cpu size={13} />
          <span style={{ flex: 1 }}>Cuartel General</span>
          {!hasPaid && (
            <span style={{
              fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.06em",
              textTransform: "uppercase", color: "#4ade80",
              border: "1px solid #4ade80", padding: "0.1rem 0.3rem",
              borderRadius: "2px",
            }}>
              Gratis
            </span>
          )}
        </Link>
        {/* Comunidad — visible para todos los usuarios logueados */}
        <Link
          href="/app/comunidad"
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.625rem 1.25rem",
            fontSize: "0.75rem",
            color: pathname === "/app/comunidad" ? "#fff" : "#666",
            backgroundColor: pathname === "/app/comunidad" ? "#1a1a1a" : "transparent",
            textDecoration: "none",
            borderLeft: pathname === "/app/comunidad" ? "2px solid #fff" : "2px solid transparent",
          }}
        >
          <Users size={13} /> Comunidad
        </Link>
        <Link
          href="/app/progreso"
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.625rem 1.25rem",
            fontSize: "0.75rem",
            color: pathname === "/app/progreso" ? "#fff" : "#666",
            backgroundColor: pathname === "/app/progreso" ? "#1a1a1a" : "transparent",
            textDecoration: "none",
            borderLeft: pathname === "/app/progreso" ? "2px solid #fff" : "2px solid transparent",
          }}
        >
          <BarChart2 size={13} /> Mi progreso
        </Link>
        <Link
          href="/app/perfil"
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.625rem 1.25rem",
            fontSize: "0.75rem",
            color: pathname === "/app/perfil" ? "#fff" : "#666",
            backgroundColor: pathname === "/app/perfil" ? "#1a1a1a" : "transparent",
            textDecoration: "none",
            borderLeft: pathname === "/app/perfil" ? "2px solid #fff" : "2px solid transparent",
          }}
        >
          <User size={13} /> Mi perfil
        </Link>
        {isAdmin && (
          <Link
            href="/app/admin"
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.625rem 1.25rem",
              fontSize: "0.75rem",
              color: pathname === "/app/admin" ? "#fff" : "#666",
              backgroundColor: pathname === "/app/admin" ? "#1a1a1a" : "transparent",
              textDecoration: "none",
              borderLeft: pathname === "/app/admin" ? "2px solid #d97706" : "2px solid transparent",
            }}
          >
            <ShieldCheck size={13} style={{ color: "#d97706" }} /> Admin
          </Link>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "0.75rem 1.25rem", borderTop: "1px solid #1e1e1e", fontSize: "0.65rem", color: "#333" }}>
        © 2026 Rentabilismo
      </div>
    </aside>
  );
}
