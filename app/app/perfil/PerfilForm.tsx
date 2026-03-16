"use client";

import { useState } from "react";
import { SECTORES, BUSINESS_SIZES } from "@/config/opciones";

interface Props {
  initialData: {
    full_name:        string;
    country:          string;
    pain_phrase:      string;
    sector:           string;
    business_size:    string;
    objetivo_60_dias: string;
  };
}

export default function PerfilForm({ initialData }: Props) {
  const [values, setValues] = useState(initialData);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setErrorMsg("");

    const res = await fetch("/api/perfil", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error ?? "Error al guardar. Inténtalo de nuevo.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{
        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "var(--muted)", marginBottom: "-0.5rem",
      }}>
        Editar datos
      </div>

      <Field label="Nombre completo">
        <input
          type="text"
          value={values.full_name}
          onChange={e => setValues(v => ({ ...v, full_name: e.target.value }))}
          required
          style={inputStyle}
        />
      </Field>

      <Field label="País">
        <input
          type="text"
          value={values.country}
          onChange={e => setValues(v => ({ ...v, country: e.target.value }))}
          placeholder="España"
          style={inputStyle}
        />
      </Field>

      <Field label="Sector">
        <select
          value={values.sector}
          onChange={e => setValues(v => ({ ...v, sector: e.target.value }))}
          style={{ ...inputStyle, cursor: "pointer" }}
        >
          <option value="">Selecciona tu sector</option>
          {SECTORES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>

      <Field label="Tamaño del negocio">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          {BUSINESS_SIZES.map(({ value, label }) => {
            const checked = values.business_size === value;
            return (
              <label key={value} style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 0.75rem",
                border: `1px solid ${checked ? "var(--foreground)" : "var(--border)"}`,
                cursor: "pointer", fontSize: "0.825rem",
                backgroundColor: checked ? "var(--foreground)" : "var(--card)",
                color: checked ? "var(--background)" : "var(--foreground)",
                transition: "all 0.12s",
              }}>
                <input
                  type="radio"
                  name="business_size"
                  value={value}
                  checked={checked}
                  onChange={() => setValues(v => ({ ...v, business_size: value }))}
                  style={{ display: "none" }}
                />
                {label}
              </label>
            );
          })}
        </div>
      </Field>

      <Field
        label="Tu frase en El Muro"
        hint={`${values.pain_phrase.length}/300`}
      >
        <textarea
          value={values.pain_phrase}
          onChange={e => setValues(v => ({ ...v, pain_phrase: e.target.value }))}
          rows={3}
          maxLength={300}
          minLength={20}
          placeholder="En una frase, cuál es tu mayor reto ahora mismo..."
          style={{ ...inputStyle, resize: "vertical", height: "auto" }}
        />
      </Field>

      <Field
        label="Objetivo a 60 días"
        hint={`${values.objetivo_60_dias.length}/300`}
      >
        <textarea
          value={values.objetivo_60_dias}
          onChange={e => setValues(v => ({ ...v, objetivo_60_dias: e.target.value }))}
          rows={3}
          maxLength={300}
          placeholder="¿Qué quieres haber conseguido en dos meses?"
          style={{ ...inputStyle, resize: "vertical", height: "auto" }}
        />
      </Field>

      {status === "error" && (
        <div style={{ fontSize: "0.825rem", color: "#dc2626" }}>{errorMsg}</div>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "saving"}
          className="btn-primary"
          style={{ opacity: status === "saving" ? 0.6 : 1, cursor: status === "saving" ? "wait" : "pointer" }}
        >
          {status === "saving" ? "Guardando..." : status === "saved" ? "¡Guardado!" : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <label style={{ fontSize: "0.8rem", fontWeight: 600 }}>{label}</label>
        {hint && <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.625rem 0.75rem",
  fontSize: "0.875rem",
  border: "1px solid var(--border)",
  backgroundColor: "var(--card)",
  color: "var(--foreground)",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
};
