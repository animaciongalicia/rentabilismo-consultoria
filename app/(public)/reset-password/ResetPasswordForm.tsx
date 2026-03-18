"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, CheckCircle } from "lucide-react";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    setIsLoading(true);
    setError(null);

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError("No se pudo actualizar la contraseña. El enlace puede haber expirado.");
      setIsLoading(false);
      return;
    }

    setDone(true);
    setTimeout(() => router.push("/login"), 2500);
  };

  if (done) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.875rem 1rem", border: "1px solid #b7e0c4", backgroundColor: "#f4fdf7", fontSize: "0.875rem", fontWeight: 600, color: "#2d6a4a" }}>
          <CheckCircle size={15} />
          Contraseña actualizada. Redirigiendo al login...
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={labelStyle}>Nueva contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input-brutal"
            placeholder="Mínimo 8 caracteres"
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Repite la contraseña</label>
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="input-brutal"
            placeholder="Repite la contraseña"
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
          {isLoading ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />Guardando...</> : "Guardar contraseña"}
        </button>
      </div>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.75rem", fontWeight: 700,
  letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.5rem",
};
