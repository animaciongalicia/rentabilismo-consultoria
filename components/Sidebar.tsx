"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, LogIn, UserPlus } from "lucide-react";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/el-muro", label: "El Muro", icon: Users },
  { href: "/registro", label: "Únete", icon: UserPlus },
  { href: "/login", label: "Entrar", icon: LogIn },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo / Marca */}
      <div style={{ marginBottom: "3rem" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{
            fontSize: "1.1rem",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            textTransform: "uppercase",
          }}>
            Rentabi<br />
            <span style={{ color: "#888888" }}>lismo</span>
          </div>
        </Link>
        <div style={{
          marginTop: "0.5rem",
          fontSize: "0.7rem",
          color: "#666666",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          Consultoría Guiada
        </div>
      </div>

      {/* Navegación */}
      <nav className="sidebar-nav" style={{ flex: 1 }}>
        <div style={{
          fontSize: "0.65rem",
          color: "#555555",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
          paddingLeft: "0.75rem",
        }}>
          Navegación
        </div>
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? "active" : ""}
          >
            <Icon size={15} strokeWidth={2.5} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer sidebar */}
      <div style={{
        borderTop: "1px solid #222",
        paddingTop: "1.5rem",
        fontSize: "0.7rem",
        color: "#444444",
        letterSpacing: "0.03em",
      }}>
        <div>© 2025 Rentabilismo</div>
        <div style={{ marginTop: "0.25rem" }}>Todos los derechos reservados</div>
      </div>
    </aside>
  );
}
