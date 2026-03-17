"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Eye, EyeOff } from "lucide-react";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Introduce tu contraseña"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (signInError) {
      setError("Email o contraseña incorrectos.");
      setIsLoading(false);
      return;
    }

    // Full page reload ensures server picks up the new session cookies.
    window.location.href = "/app/perfil";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            {...register("email")}
            className="input-brutal"
            type="email"
            placeholder="tu@email.com"
            autoComplete="email"
          />
          {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <label style={{ ...labelStyle, marginBottom: 0 }}>Contraseña</label>
            <Link
              href="/olvide-contrasena"
              style={{ fontSize: "0.75rem", color: "var(--muted)", textDecoration: "underline" }}
            >
              ¿La olvidaste?
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <input
              {...register("password")}
              className="input-brutal"
              type={showPassword ? "text" : "password"}
              placeholder="Tu contraseña"
              autoComplete="current-password"
              style={{ paddingRight: "2.75rem" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--muted)",
                padding: 0,
                display: "flex",
              }}
              tabIndex={-1}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p style={errorStyle}>{errors.password.message}</p>}
        </div>

        {error && (
          <div style={{
            padding: "0.75rem 1rem",
            border: "1px solid #f0a0a0",
            backgroundColor: "#fff5f5",
            color: "#cc0000",
            fontSize: "0.825rem",
            fontWeight: 600,
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", padding: "0.75rem" }}
          disabled={isLoading}
        >
          {isLoading ? (
            <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Entrando...</>
          ) : "Entrar"}
        </button>

        <p style={{ textAlign: "center", fontSize: "0.825rem", color: "var(--muted)" }}>
          ¿No tienes cuenta?{" "}
          <Link href="/registro" style={{ color: "var(--foreground)", fontWeight: 700, textDecoration: "underline" }}>
            Regístrate aquí
          </Link>
        </p>
      </div>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom: "0.5rem",
};

const errorStyle: React.CSSProperties = {
  marginTop: "0.375rem",
  fontSize: "0.775rem",
  color: "#cc0000",
  fontWeight: 600,
};
