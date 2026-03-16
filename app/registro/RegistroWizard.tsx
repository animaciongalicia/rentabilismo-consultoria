"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ChevronRight, Loader2 } from "lucide-react";

// Schemas por paso
const paso1Schema = z.object({
  full_name: z.string().min(2, "Mínimo 2 caracteres").max(80),
  age: z
    .number()
    .int()
    .min(18, "Debes ser mayor de 18 años")
    .max(100),
  country: z.string().min(2, "Indica tu país"),
});

const paso2Schema = z.object({
  pain_phrase: z
    .string()
    .min(20, "Cuéntanos un poco más (mín. 20 caracteres)")
    .max(300, "Máximo 300 caracteres"),
});

const paso3Schema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
});

type Paso1 = z.infer<typeof paso1Schema>;
type Paso2 = z.infer<typeof paso2Schema>;
type Paso3 = z.infer<typeof paso3Schema>;

type FormData = Paso1 & Paso2 & Paso3;

const STEP_LABELS = [
  "¿Quién eres?",
  "El zasca",
  "Tu acceso",
];

export default function RegistroWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  // Paso 1
  const form1 = useForm<Paso1>({
    resolver: zodResolver(paso1Schema),
    defaultValues: {
      full_name: (formData.full_name as string) || "",
      age: (formData.age as number) || undefined,
      country: (formData.country as string) || "",
    },
  });

  // Paso 2
  const form2 = useForm<Paso2>({
    resolver: zodResolver(paso2Schema),
    defaultValues: { pain_phrase: (formData.pain_phrase as string) || "" },
  });

  // Paso 3
  const form3 = useForm<Paso3>({
    resolver: zodResolver(paso3Schema),
    defaultValues: { email: "", password: "" },
  });

  const onStep1 = (data: Paso1) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const onStep2 = (data: Paso2) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(3);
  };

  const onStep3 = async (data: Paso3) => {
    setIsLoading(true);
    setError(null);

    const allData = { ...formData, ...data } as FormData;

    const { error: signUpError } = await supabase.auth.signUp({
      email: allData.email,
      password: allData.password,
      options: {
        data: {
          full_name: allData.full_name,
          age: allData.age,
          country: allData.country,
          pain_phrase: allData.pain_phrase,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
      return;
    }

    router.push("/bienvenida");
  };

  const progress = ((step - 1) / 3) * 100;

  return (
    <div>
      {/* Indicador de progreso */}
      <div style={{ marginBottom: "2.5rem" }}>
        {/* Steps */}
        <div style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}>
          {STEP_LABELS.map((label, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{
                height: "3px",
                backgroundColor: i + 1 <= step ? "var(--foreground)" : "#e0e0e0",
                marginBottom: "0.5rem",
                transition: "background-color 0.3s ease",
              }} />
              <div style={{
                fontSize: "0.7rem",
                color: i + 1 <= step ? "var(--foreground)" : "#aaa",
                fontWeight: i + 1 === step ? 700 : 400,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}>
                {i + 1}. {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PASO 1: Nombre, Edad, País */}
      {step === 1 && (
        <form onSubmit={form1.handleSubmit(onStep1)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={labelStyle}>Tu nombre completo</label>
              <input
                {...form1.register("full_name")}
                className="input-brutal"
                placeholder="Ej: María García"
              />
              {form1.formState.errors.full_name && (
                <p style={errorStyle}>{form1.formState.errors.full_name.message}</p>
              )}
            </div>

            <div>
              <label style={labelStyle}>Tu edad</label>
              <input
                {...form1.register("age", { valueAsNumber: true })}
                className="input-brutal"
                type="number"
                placeholder="Ej: 35"
                min={18}
                max={100}
              />
              {form1.formState.errors.age && (
                <p style={errorStyle}>{form1.formState.errors.age.message}</p>
              )}
            </div>

            <div>
              <label style={labelStyle}>Tu país</label>
              <input
                {...form1.register("country")}
                className="input-brutal"
                placeholder="Ej: España"
              />
              {form1.formState.errors.country && (
                <p style={errorStyle}>{form1.formState.errors.country.message}</p>
              )}
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }}>
              Siguiente <ChevronRight size={16} style={{ display: "inline", verticalAlign: "middle" }} />
            </button>
          </div>
        </form>
      )}

      {/* PASO 2: El Zasca */}
      {step === 2 && (
        <form onSubmit={form2.handleSubmit(onStep2)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={labelStyle}>
                ¿Por qué estás aquí?
              </label>
              <p style={{
                fontSize: "0.85rem",
                color: "var(--muted)",
                marginBottom: "0.75rem",
                lineHeight: 1.6,
              }}>
                Sé brutal y honesto. Esta frase aparecerá en El Muro para que otros empresarios se reconozcan en ti.
                <br />
                <em style={{ fontSize: "0.8rem" }}>Ej: &ldquo;Trabajo 14 horas y gano menos que mi empleado&rdquo;</em>
              </p>
              <textarea
                {...form2.register("pain_phrase")}
                className="input-brutal"
                rows={4}
                placeholder="Tu dolor real en una frase..."
                style={{ resize: "vertical" }}
              />
              {form2.formState.errors.pain_phrase && (
                <p style={errorStyle}>{form2.formState.errors.pain_phrase.message}</p>
              )}
              <div style={{
                textAlign: "right",
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginTop: "0.25rem",
              }}>
                {form2.watch("pain_phrase")?.length || 0} / 300
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                type="button"
                className="btn-outline"
                onClick={() => setStep(1)}
                style={{ flex: 1 }}
              >
                Atrás
              </button>
              <button type="submit" className="btn-primary" style={{ flex: 2 }}>
                Siguiente <ChevronRight size={16} style={{ display: "inline", verticalAlign: "middle" }} />
              </button>
            </div>
          </div>
        </form>
      )}

      {/* PASO 3: Email y Contraseña */}
      {step === 3 && (
        <form onSubmit={form3.handleSubmit(onStep3)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={labelStyle}>Tu email</label>
              <input
                {...form3.register("email")}
                className="input-brutal"
                type="email"
                placeholder="tu@email.com"
                autoComplete="email"
              />
              {form3.formState.errors.email && (
                <p style={errorStyle}>{form3.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label style={labelStyle}>Contraseña</label>
              <input
                {...form3.register("password")}
                className="input-brutal"
                type="password"
                placeholder="Mín. 8 caracteres, 1 mayúscula, 1 número"
                autoComplete="new-password"
              />
              {form3.formState.errors.password && (
                <p style={errorStyle}>{form3.formState.errors.password.message}</p>
              )}
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

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                type="button"
                className="btn-outline"
                onClick={() => setStep(2)}
                style={{ flex: 1 }}
                disabled={isLoading}
              >
                Atrás
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                    Registrando...
                  </>
                ) : (
                  "Entrar a la trinchera"
                )}
              </button>
            </div>

            <p style={{ fontSize: "0.75rem", color: "var(--muted)", textAlign: "center" }}>
              Al registrarte aceptas que tus datos de dolor sean visibles en El Muro de forma pública.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom: "0.5rem",
  color: "var(--foreground)",
};

const errorStyle: React.CSSProperties = {
  marginTop: "0.375rem",
  fontSize: "0.8rem",
  color: "#cc0000",
  fontWeight: 600,
};
