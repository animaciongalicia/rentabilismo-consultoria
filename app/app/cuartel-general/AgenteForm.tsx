"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface Props {
  agenteSlug: string;
  placeholder: string;
}

export default function AgenteForm({ agenteSlug, placeholder }: Props) {
  const [consulta,  setConsulta]  = useState("");
  const [respuesta, setRespuesta] = useState<string | null>(null);
  const [cargando,  setCargando]  = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consulta.trim()) return;

    setCargando(true);
    setError(null);
    setRespuesta(null);

    try {
      const res = await fetch("/api/agentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agenteSlug, consulta }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Error ${res.status}`);
      }

      // Leer el stream de texto
      if (!res.body) throw new Error("El servidor no devolvió respuesta en streaming.");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setRespuesta(text);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* Textarea */}
      <div>
        <label style={{
          display: "block",
          fontSize: "0.75rem", fontWeight: 700,
          letterSpacing: "0.06em", textTransform: "uppercase",
          marginBottom: "0.5rem",
        }}>
          Tu consulta
        </label>
        <textarea
          value={consulta}
          onChange={e => setConsulta(e.target.value)}
          placeholder={placeholder}
          rows={6}
          maxLength={2000}
          required
          className="input-brutal"
          style={{ resize: "vertical", height: "auto" }}
        />
        <div style={{ textAlign: "right", fontSize: "0.7rem", color: "var(--muted)", marginTop: "0.25rem" }}>
          {consulta.length} / 2000
        </div>
      </div>

      {/* Enviar */}
      <div>
        <button
          type="submit"
          disabled={cargando || !consulta.trim()}
          className="btn-primary"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            opacity: (cargando || !consulta.trim()) ? 0.6 : 1,
            cursor: (cargando || !consulta.trim()) ? "not-allowed" : "pointer",
          }}
        >
          {cargando
            ? <><Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> Analizando...</>
            : "Enviar consulta"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          padding: "0.75rem 1rem",
          border: "1px solid #f0a0a0",
          backgroundColor: "#fff5f5",
          fontSize: "0.825rem", color: "#cc0000",
        }}>
          {error}
        </div>
      )}

      {/* Respuesta en streaming */}
      {respuesta !== null && (
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
          <div style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem",
          }}>
            Respuesta
          </div>
          <div style={{
            padding: "1.25rem",
            border: "1px solid var(--border)",
            backgroundColor: "var(--card)",
            fontSize: "0.875rem",
            lineHeight: 1.75,
            whiteSpace: "pre-wrap",
            color: "var(--foreground)",
            minHeight: "3rem",
          }}>
            {respuesta}
            {cargando && (
              <span style={{
                display: "inline-block",
                width: "2px", height: "1em",
                backgroundColor: "var(--foreground)",
                marginLeft: "2px",
                verticalAlign: "text-bottom",
                animation: "blink 0.8s step-end infinite",
              }} />
            )}
          </div>

          {!cargando && (
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => { setConsulta(""); setRespuesta(null); }}
                style={{
                  fontSize: "0.75rem", color: "var(--muted)",
                  background: "none", border: "none",
                  cursor: "pointer", textDecoration: "underline", padding: 0,
                }}
              >
                Nueva consulta
              </button>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(respuesta)}
                style={{
                  fontSize: "0.75rem", color: "var(--muted)",
                  background: "none", border: "none",
                  cursor: "pointer", textDecoration: "underline", padding: 0,
                }}
              >
                Copiar respuesta
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </form>
  );
}
