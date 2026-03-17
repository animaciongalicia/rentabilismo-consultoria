"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, LogIn, UserPlus, HelpCircle, HeartCrack, Brain, BookOpen } from "lucide-react";

const NAV_SECTIONS = [
  {
    label: "Descubre",
    items: [
      { href: "/",               label: "Inicio",         icon: Home },
      { href: "/como-funciona",  label: "Cómo funciona",  icon: HelpCircle },
      { href: "/dolores",        label: "¿Eres tú?",      icon: HeartCrack },
      { href: "/mentalidad",     label: "Mentalidad",     icon: Brain },
      { href: "/programa",       label: "El Programa",    icon: BookOpen },
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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{
            fontSize: "1rem",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}>
            Rentabilismo
          </div>
        </Link>
        <div style={{
          marginTop: "0.3rem",
          fontSize: "0.65rem",
          color: "#555",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          Consultoría Guiada
        </div>
      </div>

      {/* Navegación por secciones */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {NAV_SECTIONS.map(({ label, items }) => (
          <div key={label}>
            <div style={{
              fontSize: "0.6rem",
              color: "#444",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "0.375rem",
              paddingLeft: "0.625rem",
            }}>
              {label}
            </div>
            <div className="sidebar-nav">
              {items.map(({ href, label: itemLabel, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={pathname === href ? "active" : ""}
                >
                  <Icon size={14} strokeWidth={2} />
                  {itemLabel}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

    </aside>
  );
}
