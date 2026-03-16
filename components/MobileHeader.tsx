"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X,
  Home, Users, LogIn, UserPlus,
  HelpCircle, HeartCrack, Brain, BookOpen,
} from "lucide-react";

const NAV_SECTIONS = [
  {
    label: "Descubre",
    items: [
      { href: "/",              label: "Inicio",        icon: Home },
      { href: "/como-funciona", label: "Cómo funciona", icon: HelpCircle },
      { href: "/dolores",       label: "¿Eres tú?",     icon: HeartCrack },
      { href: "/mentalidad",    label: "Mentalidad",    icon: Brain },
      { href: "/programa",      label: "El Programa",   icon: BookOpen },
    ],
  },
  {
    label: "Comunidad",
    items: [
      { href: "/el-muro", label: "El Muro", icon: Users },
    ],
  },
  {
    label: "Acceso",
    items: [
      { href: "/registro", label: "Únete",  icon: UserPlus },
      { href: "/login",    label: "Entrar", icon: LogIn },
    ],
  },
];

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar menú al cambiar de ruta
  useEffect(() => { setOpen(false); }, [pathname]);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Barra superior fija ─────────────────────── */}
      {/* display controlado por CSS (.mobile-header) — inline style no incluye display */}
      <header style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: "56px",
        backgroundColor: "var(--foreground)",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.25rem",
        zIndex: 200,
      }}
        className="mobile-header"
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{
            fontSize: "0.9rem",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}>
            Rentabilismo
          </div>
        </Link>

        <button
          onClick={() => setOpen(v => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            padding: "0.375rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* ── Overlay / menú desplegado ───────────────── */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: "56px", left: 0, right: 0, bottom: 0,
            backgroundColor: "var(--foreground)",
            zIndex: 199,
            overflowY: "auto",
            padding: "1.5rem 1.25rem 3rem",
            flexDirection: "column",
            gap: "2rem",
          }}
          className="mobile-menu"
        >
          {NAV_SECTIONS.map(({ label, items }) => (
            <div key={label}>
              <div style={{
                fontSize: "0.6rem",
                color: "#444",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
                paddingLeft: "0.625rem",
              }}>
                {label}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {items.map(({ href, label: itemLabel, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: pathname === href ? "#fff" : "#999",
                      textDecoration: "none",
                      fontWeight: 500,
                      fontSize: "0.9rem",
                      padding: "0.75rem 0.625rem",
                      letterSpacing: "0.02em",
                      borderBottom: "1px solid #1a1a1a",
                      backgroundColor: pathname === href ? "rgba(255,255,255,0.06)" : "transparent",
                    }}
                  >
                    <Icon size={16} strokeWidth={2} />
                    {itemLabel}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div style={{
            marginTop: "auto",
            paddingTop: "1rem",
            borderTop: "1px solid #1e1e1e",
            fontSize: "0.65rem",
            color: "#333",
          }}>
            © 2026 Rentabilismo
          </div>
        </div>
      )}
    </>
  );
}
