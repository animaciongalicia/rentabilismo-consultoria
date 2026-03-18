"use client";

import { useState, useRef, useEffect } from "react";
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
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(initialData);
  const [saved, setSaved] = useState(initialData);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

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
      setSaved(values);
      setStatus("saved");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => { setStatus("idle"); setEditing(false); }, 1200);
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error ?? "Error al guardar.");
      setStatus("error");
    }
  }

  function handleCancel() {
    setValues(saved);
    setEditing(false);
    setStatus("idle");
    setErrorMsg("");
  }

  const bsLabel = BUSINESS_SIZES.find(b => b.value === saved.business_size)?.label ?? saved.business_size;

  if (!editing) {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.625rem" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
            Datos del perfil
          </div>
          <button onClick={() => setEditing(true)} style={btnGhostStyle}>
            Editar
          </button>
        </div>
        <div style={{ border: "1px solid var(--border)", backgroundColor: "var(--card)" }}>
          {([
            ["Nombre", saved.full_name],
            ["País", saved.country],
            ["Sector", saved.sector],
            ["Tamaño", bsLabel],
            ["Frase en El Muro", saved.pain_phrase],
            ["Objetivo 60 días", saved.objetivo_60_dias],
          ] as [string, string][]).map(([label, val], i, arr) => (
            <div key={label} style={{ display: "flex", gap: "1rem", padding: "0.45rem 0.875rem", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--muted)", flexShrink: 0, width: "110px" }}>{label}</span>
              <span style={{ fontSize: "0.8rem", color: val ? "var(--foreground)" : "var(--border)" }}>{val || "—"}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.625rem" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
          Editar datos
        </div>
        <button type="button" onClick={handleCancel} style={btnGhostStyle}>
          Cancelar
        </button>
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          <InlineField label="Nombre">
            <input type="text" value={values.full_name} onChange={e => setValues(v => ({ ...v, full_name: e.target.value }))} required style={inp} />
          </InlineField>
          <InlineField label="País">
            <input type="text" value={values.country} onChange={e => setValues(v => ({ ...v, country: e.target.value }))} placeholder="España" style={inp} />
          </InlineField>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          <InlineField label="Sector">
            <select value={values.sector} onChange={e => setValues(v => ({ ...v, sector: e.target.value }))} style={{ ...inp, cursor: "pointer" }}>
              <option value="">—</option>
              {SECTORES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </InlineField>
          <InlineField label="Tamaño">
            <select value={values.business_size} onChange={e => setValues(v => ({ ...v, business_size: e.target.value }))} style={{ ...inp, cursor: "pointer" }}>
              <option value="">—</option>
              {BUSINESS_SIZES.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </select>
          </InlineField>
        </div>

        <InlineField label="Frase en El Muro" hint={`${values.pain_phrase.length}/300`}>
          <textarea value={values.pain_phrase} onChange={e => setValues(v => ({ ...v, pain_phrase: e.target.value }))} rows={2} maxLength={300} minLength={20} placeholder="Tu mayor reto ahora mismo..." style={{ ...inp, resize: "vertical", height: "auto" }} />
        </InlineField>

        <InlineField label="Objetivo 60 días" hint={`${values.objetivo_60_dias.length}/300`}>
          <textarea value={values.objetivo_60_dias} onChange={e => setValues(v => ({ ...v, objetivo_60_dias: e.target.value }))} rows={2} maxLength={300} placeholder="¿Qué quieres conseguir en dos meses?" style={{ ...inp, resize: "vertical", height: "auto" }} />
        </InlineField>

        {status === "error" && <div style={{ fontSize: "0.8rem", color: "#dc2626" }}>{errorMsg}</div>}

        <div>
          <button type="submit" disabled={status === "saving"} className="btn-primary" style={{ opacity: status === "saving" ? 0.6 : 1, cursor: status === "saving" ? "wait" : "pointer" }}>
            {status === "saving" ? "Guardando..." : status === "saved" ? "¡Guardado!" : "Guardar"}
          </button>
        </div>
      </div>
    </form>
  );
}

function InlineField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label style={{ fontSize: "0.7rem", color: "var(--muted)", fontWeight: 600 }}>{label}</label>
        {hint && <span style={{ fontSize: "0.65rem", color: "var(--muted)" }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

const inp: React.CSSProperties = {
  width: "100%",
  padding: "0.4rem 0.625rem",
  fontSize: "0.825rem",
  border: "1px solid var(--border)",
  backgroundColor: "var(--card)",
  color: "var(--foreground)",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const btnGhostStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  padding: "0.25rem 0.625rem",
  border: "1px solid var(--border)",
  backgroundColor: "transparent",
  color: "var(--muted)",
  cursor: "pointer",
  fontFamily: "inherit",
};
