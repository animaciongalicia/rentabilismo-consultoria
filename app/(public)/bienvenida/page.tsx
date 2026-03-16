import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Confirma tu email — Rentabilismo",
};

// Esta página aparece cuando el usuario se registra y Supabase requiere
// confirmación de email antes de activar la sesión.
// Si Supabase tiene autoconfirm activo, el usuario ya habrá sido redirigido
// directamente a /app y esta página no se mostrará.
export default function BienvenidaPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 2rem",
    }}>
      <div style={{ maxWidth: "480px", textAlign: "center" }}>
        <Mail size={56} strokeWidth={1.5} style={{ marginBottom: "2rem", color: "var(--foreground)" }} />
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Revisa tu email.
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
          Te hemos enviado un enlace de confirmación. Haz clic en él para activar tu cuenta.
        </p>
        <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
          Una vez confirmado, podrás acceder al <strong style={{ color: "var(--foreground)" }}>Módulo 1 — Mentalidad</strong>{" "}
          de forma completamente gratuita.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/login" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            Ya confirmé — Entrar <ArrowRight size={14} />
          </Link>
          <Link href="/" className="btn-outline">
            Volver al inicio
          </Link>
        </div>
        <p style={{ marginTop: "2rem", fontSize: "0.75rem", color: "var(--muted)" }}>
          ¿No encuentras el email? Revisa la carpeta de spam.
        </p>
      </div>
    </div>
  );
}
