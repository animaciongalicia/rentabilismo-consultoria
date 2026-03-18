"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Loader2, CheckCircle } from "lucide-react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setError(null);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    if (resetError) {
      setError("No se pudo enviar el email. Comprueba la dirección.");
      setIsLoading(false);
      return;
    }

    setSent(true);
    setIsLoading(false);
  };

  if (sent) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.875rem 1rem", border: "1px solid #b7e0c4", backgroundColor: "#f4fdf7", fontSize: "0.875rem", fontWeight: 600, color: "#2d6a4a" }}>
          <CheckCircle size={15} />
          Email enviado. Revisa tu bandeja de entrada.
        </div>
        <p style={{ fontSize: "0.825rem", color: "var(--muted)" }}>
          Si no lo ves, mira en spam. El enlace expira en 1 hora.
        </p>
        <Link href="/login" style={{ fontSize: "0.825rem", color: "var(--foreground)", fontWeight: 700, textDecoration: "underline" }}>
          Volver al login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={labelStyle}>Tu email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-brutal"
            placeholder="tu@email.com"
            autoComplete="email"
            required
          />
        </div>

        {error && (
          <div style={{ padding: "0.75rem 1rem", border: "1px solid #f0a0a0", backgroundColor: "#fff5f5", color: "#cc0000", fontSize: "0.825rem", fontWeight: 600 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", padding: "0.75rem" }}
          disabled={isLoading}
        >
          {isLoading ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />Enviando...</> : "Enviar enlace"}
        </button>

        <Link href="/login" style={{ textAlign: "center", fontSize: "0.825rem", color: "var(--muted)", textDecoration: "underline" }}>
          Volver al login
        </Link>
      </div>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.75rem", fontWeight: 700,
  letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.5rem",
};
