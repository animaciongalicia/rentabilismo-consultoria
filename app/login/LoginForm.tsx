"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Introduce tu contraseña"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
          <label style={labelStyle}>Contraseña</label>
          <input
            {...register("password")}
            className="input-brutal"
            type="password"
            placeholder="Tu contraseña"
            autoComplete="current-password"
          />
          {errors.password && <p style={errorStyle}>{errors.password.message}</p>}
        </div>

        {error && (
          <div style={{
            padding: "1rem",
            border: "2px solid #cc0000",
            backgroundColor: "#fff5f5",
            color: "#cc0000",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </button>

        <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--muted)" }}>
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
  fontSize: "0.8rem",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom: "0.5rem",
};

const errorStyle: React.CSSProperties = {
  marginTop: "0.375rem",
  fontSize: "0.8rem",
  color: "#cc0000",
  fontWeight: 600,
};
