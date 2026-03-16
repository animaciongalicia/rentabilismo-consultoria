"use client";

import { useState } from "react";

interface Props {
  moduleSlug: string;
  lessonSlug: string;
  exerciseKey: string;
  prompt: string;
  initialValue: string;
  /** Called after a successful save so the parent can update completion state */
  onSaved?: (exerciseKey: string) => void;
}

type Status = "idle" | "saving" | "saved" | "error";

export default function ExerciseBox({
  moduleSlug,
  lessonSlug,
  exerciseKey,
  prompt,
  initialValue,
  onSaved,
}: Props) {
  const [value, setValue] = useState(initialValue);
  // Start as "saved" if there's already a stored response
  const [status, setStatus] = useState<Status>(initialValue.trim() ? "saved" : "idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isDirty = value !== initialValue && !(status === "saved" && value === initialValue);
  const canSave = value.trim().length > 0 && !(status === "saved" && !isDirty);

  async function handleSave() {
    if (!canSave) return;
    setStatus("saving");
    setErrorMsg("");

    const res = await fetch("/api/exercise-responses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleSlug, lessonSlug, exerciseKey, response: value }),
    });

    if (res.ok) {
      setStatus("saved");
      onSaved?.(exerciseKey);
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error ?? "Error al guardar. Inténtalo de nuevo.");
      setStatus("error");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    if (status === "saved") setStatus("idle");
    if (status === "error") { setStatus("idle"); setErrorMsg(""); }
  }

  return (
    <div style={{
      border: "1px solid var(--border)",
      backgroundColor: "var(--card)",
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    }}>
      <p style={{
        fontSize: "0.925rem",
        lineHeight: 1.75,
        fontWeight: 600,
        margin: 0,
        color: "var(--foreground)",
      }}>
        {prompt}
      </p>

      <textarea
        value={value}
        onChange={handleChange}
        rows={5}
        placeholder="Escribe tu respuesta aquí..."
        style={{
          width: "100%",
          padding: "0.75rem",
          fontSize: "0.875rem",
          lineHeight: 1.75,
          border: `1.5px solid ${status === "error" ? "#dc2626" : "var(--border)"}`,
          backgroundColor: "#ffffff",
          color: "var(--foreground)",
          fontFamily: "inherit",
          resize: "vertical",
          outline: "none",
          minHeight: "130px",
          boxSizing: "border-box",
          transition: "border-color 0.15s",
        }}
        onFocus={e => { e.currentTarget.style.borderColor = "var(--foreground)"; }}
        onBlur={e => {
          e.currentTarget.style.borderColor =
            status === "error" ? "#dc2626" : "var(--border)";
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={handleSave}
          disabled={!canSave || status === "saving"}
          className="btn-primary"
          style={{
            opacity: (!canSave || status === "saving") ? 0.55 : 1,
            cursor: (!canSave || status === "saving") ? "not-allowed" : "pointer",
            fontSize: "0.825rem",
            padding: "0.5rem 1.25rem",
          }}
        >
          {status === "saving" ? "Guardando…" : "Guardar"}
        </button>

        {status === "saved" && !isDirty && (
          <span style={{
            fontSize: "0.8rem",
            color: "#16a34a",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}>
            ✓ Guardado
          </span>
        )}

        {status === "error" && (
          <span style={{ fontSize: "0.8rem", color: "#dc2626" }}>
            {errorMsg}
          </span>
        )}
      </div>
    </div>
  );
}
