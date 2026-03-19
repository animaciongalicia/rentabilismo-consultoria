"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { ChevronRight, Loader2, Eye, EyeOff } from "lucide-react";
import { SECTORES, BUSINESS_SIZES } from "@/config/opciones";

export { SECTORES, BUSINESS_SIZES };

// ── Schemas Zod ───────────────────────────────────────────────
const paso1Schema = z.object({
  full_name:     z.string().min(2, "Mínimo 2 caracteres").max(80),
  age:           z.number().int().min(18, "Debes ser mayor de 18 años").max(100),
  country:       z.string().min(2, "Indica tu país"),
  sector:        z.string().min(1, "Selecciona tu sector"),
  business_size: z.string().min(1, "Selecciona el tamaño de tu negocio"),
});

const paso2Schema = z.object({
  pain_phrase:      z.string().min(20, "Cuéntanos un poco más (mín. 20 caracteres)").max(300, "Máximo 300 caracteres"),
  objetivo_60_dias: z.string().min(10, "Mínimo 10 caracteres").max(300, "Máximo 300 caracteres"),
});

const paso3Schema = z.object({
  email:    z.string().email("Email inválido"),
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

const STEP_LABELS = ["¿Quién eres?", "Tu negocio", "Tu acceso"];

export default function RegistroWizard() {
  const [step, setStep]           = useState(1);
  const [formData, setFormData]   = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const supabase = createClient();

  const form1 = useForm<Paso1>({
    resolver: zodResolver(paso1Schema),
    defaultValues: {
      full_name:     (formData.full_name as string) || "",
      age:           (formData.age as number) || undefined,
      country:       (formData.country as string) || "",
      sector:        (formData.sector as string) || "",
      business_size: (formData.business_size as string) || "",
    },
  });

  const form2 = useForm<Paso2>({
    resolver: zodResolver(paso2Schema),
    defaultValues: {
      pain_phrase:      (formData.pain_phrase as string) || "",
      objetivo_60_dias: (formData.objetivo_60_dias as string) || "",
    },
  });

  const form3 = useForm<Paso3>({
    resolver: zodResolver(paso3Schema),
    defaultValues: { email: "", password: "" },
  });

  const onStep1 = (data: Paso1) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(2);
  };

  const onStep2 = (data: Paso2) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(3);
  };

  const onStep3 = async (data: Paso3) => {
    setIsLoading(true);
    setError(null);
    const allData = { ...formData, ...data } as FormData;

    const { error: signUpError } = await supabase.auth.signUp({
      email:    allData.email,
      password: allData.password,
      options: {
        data: {
          full_name:        allData.full_name,
          age:              allData.age,
          country:          allData.country,
          pain_phrase:      allData.pain_phrase,
          sector:           allData.sector,
          business_size:    allData.business_size,
          objetivo_60_dias: allData.objetivo_60_dias,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
      return;
    }

    // Cinturón + tirantes: si el trigger de BD no existe o falló,
    // aseguramos que el perfil se crea antes de redirigir.
    const { data: { user: newUser } } = await supabase.auth.getUser();
    if (newUser) {
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", newUser.id)
        .single();

      if (!existingProfile) {
        await supabase.from("profiles").insert({
          id:               newUser.id,
          full_name:        allData.full_name,
          age:              allData.age,
          country:          allData.country,
          pain_phrase:      allData.pain_phrase,
          sector:           allData.sector,
          business_size:    allData.business_size,
          objetivo_60_dias: allData.objetivo_60_dias,
        });
      }
    }

    window.location.href = "/app/modulos/modulo-1-mentalidad";
    return;
  };

  return (
    <div>
      {/* Indicador de progreso */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        {STEP_LABELS.map((label, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{
              height: "2px",
              backgroundColor: i + 1 <= step ? "var(--foreground)" : "#e0e0e0",
              marginBottom: "0.4rem",
              transition: "background-color 0.2s ease",
            }} />
            <div style={{
              fontSize: "0.65rem",
              color: i + 1 <= step ? "var(--foreground)" : "#bbb",
              fontWeight: i + 1 === step ? 700 : 400,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}>
              {i + 1}. {label}
            </div>
          </div>
        ))}
      </div>

      {/* ── PASO 1: ¿Quién eres? ─────────────────────────────── */}
      {step === 1 && (
        <form onSubmit={form1.handleSubmit(onStep1)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            <div>
              <label style={labelStyle}>Nombre completo</label>
              <input {...form1.register("full_name")} className="input-brutal" placeholder="Ej: María García" />
              {form1.formState.errors.full_name && <p style={errorStyle}>{form1.formState.errors.full_name.message}</p>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label style={labelStyle}>Edad</label>
                <input {...form1.register("age", { valueAsNumber: true })} className="input-brutal" type="number" placeholder="35" min={18} max={100} />
                {form1.formState.errors.age && <p style={errorStyle}>{form1.formState.errors.age.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>País</label>
                <input {...form1.register("country")} className="input-brutal" placeholder="España" />
                {form1.formState.errors.country && <p style={errorStyle}>{form1.formState.errors.country.message}</p>}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Sector</label>
              <select {...form1.register("sector")} className="input-brutal" style={{ cursor: "pointer" }}>
                <option value="">Selecciona tu sector</option>
                {SECTORES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {form1.formState.errors.sector && <p style={errorStyle}>{form1.formState.errors.sector.message}</p>}
            </div>

            <div>
              <label style={labelStyle}>Tamaño del negocio</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                {BUSINESS_SIZES.map(({ value, label }) => {
                  const checked = form1.watch("business_size") === value;
                  return (
                    <label key={value} style={{
                      display: "flex", alignItems: "center", gap: "0.5rem",
                      padding: "0.625rem 0.875rem",
                      border: `1px solid ${checked ? "var(--foreground)" : "var(--border)"}`,
                      cursor: "pointer", fontSize: "0.85rem",
                      backgroundColor: checked ? "var(--foreground)" : "var(--card)",
                      color: checked ? "var(--background)" : "var(--foreground)",
                      transition: "all 0.15s",
                    }}>
                      <input
                        type="radio"
                        value={value}
                        {...form1.register("business_size")}
                        style={{ display: "none" }}
                      />
                      {label}
                    </label>
                  );
                })}
              </div>
              {form1.formState.errors.business_size && <p style={errorStyle}>{form1.formState.errors.business_size.message}</p>}
            </div>

            <button type="submit" className="btn-primary" style={btnFullStyle}>
              Siguiente <ChevronRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
            </button>
          </div>
        </form>
      )}

      {/* ── PASO 2: Tu negocio ───────────────────────────────── */}
      {step === 2 && (
        <form onSubmit={form2.handleSubmit(onStep2)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            <div>
              <label style={labelStyle}>Tu mayor problema ahora mismo</label>
              <p style={{ fontSize: "0.825rem", color: "var(--muted)", marginBottom: "0.625rem", lineHeight: 1.6 }}>
                Sé brutal. Esta frase aparecerá en El Muro.
                <br />
                <em>Ej: &ldquo;Trabajo 14 horas y gano menos que mi empleado&rdquo;</em>
              </p>
              <textarea
                {...form2.register("pain_phrase")}
                className="input-brutal"
                rows={3}
                placeholder="Tu dolor real en una frase..."
                style={{ resize: "vertical" }}
              />
              {form2.formState.errors.pain_phrase && <p style={errorStyle}>{form2.formState.errors.pain_phrase.message}</p>}
              <div style={{ textAlign: "right", fontSize: "0.7rem", color: "var(--muted)", marginTop: "0.25rem" }}>
                {form2.watch("pain_phrase")?.length || 0} / 300
              </div>
            </div>

            <div>
              <label style={labelStyle}>Objetivo a 60 días</label>
              <p style={{ fontSize: "0.825rem", color: "var(--muted)", marginBottom: "0.625rem", lineHeight: 1.6 }}>
                ¿Qué quieres haber conseguido en dos meses? Algo concreto.
                <br />
                <em>Ej: &ldquo;Tener claro qué clientes me cuestan más de lo que me dan&rdquo;</em>
              </p>
              <textarea
                {...form2.register("objetivo_60_dias")}
                className="input-brutal"
                rows={3}
                placeholder="Un objetivo real, medible y tuyo..."
                style={{ resize: "vertical" }}
              />
              {form2.formState.errors.objetivo_60_dias && <p style={errorStyle}>{form2.formState.errors.objetivo_60_dias.message}</p>}
              <div style={{ textAlign: "right", fontSize: "0.7rem", color: "var(--muted)", marginTop: "0.25rem" }}>
                {form2.watch("objetivo_60_dias")?.length || 0} / 300
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button type="button" className="btn-outline" onClick={() => setStep(1)} style={{ flex: 1 }}>Atrás</button>
              <button type="submit" className="btn-primary" style={{ flex: 2, ...btnFullStyle }}>
                Siguiente <ChevronRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ── PASO 3: Tu acceso ────────────────────────────────── */}
      {step === 3 && (
        <form onSubmit={form3.handleSubmit(onStep3)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            <div>
              <label style={labelStyle}>Email</label>
              <input {...form3.register("email")} className="input-brutal" type="email" placeholder="tu@email.com" autoComplete="email" />
              {form3.formState.errors.email && <p style={errorStyle}>{form3.formState.errors.email.message}</p>}
            </div>

            <div>
              <label style={labelStyle}>Contraseña</label>
              <div style={{ position: "relative" }}>
                <input
                  {...form3.register("password")}
                  className="input-brutal"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mín. 8 caracteres, 1 mayúscula, 1 número"
                  autoComplete="new-password"
                  style={{ paddingRight: "2.75rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{
                    position: "absolute", right: "0.75rem", top: "50%",
                    transform: "translateY(-50%)", background: "none",
                    border: "none", cursor: "pointer", color: "var(--muted)",
                    padding: 0, display: "flex",
                  }}
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form3.formState.errors.password && <p style={errorStyle}>{form3.formState.errors.password.message}</p>}
              <p style={{ fontSize: "0.725rem", color: "var(--muted)", marginTop: "0.375rem" }}>
                Guarda esta contraseña — la necesitarás para entrar.
              </p>
            </div>

            {error && (
              <div style={{ padding: "0.75rem 1rem", border: "1px solid #f0a0a0", backgroundColor: "#fff5f5", color: "#cc0000", fontSize: "0.825rem", fontWeight: 600 }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button type="button" className="btn-outline" onClick={() => setStep(2)} style={{ flex: 1 }} disabled={isLoading}>Atrás</button>
              <button type="submit" className="btn-primary" style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.75rem" }} disabled={isLoading}>
                {isLoading
                  ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />Registrando...</>
                  : "Entrar a la trinchera"}
              </button>
            </div>

            <p style={{ fontSize: "0.725rem", color: "var(--muted)", textAlign: "center" }}>
              Al registrarte aceptas que tu frase y objetivo aparezcan en El Muro de forma pública.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.75rem", fontWeight: 700,
  letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.5rem",
};
const errorStyle: React.CSSProperties = {
  marginTop: "0.375rem", fontSize: "0.775rem", color: "#cc0000", fontWeight: 600,
};
const btnFullStyle: React.CSSProperties = {
  width: "100%", padding: "0.75rem",
};
