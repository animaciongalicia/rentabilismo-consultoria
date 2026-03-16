"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface Props {
  agenteSlug: string;
  placeholder: string;
}

export default function AgenteForm({ agenteSlug, placeholder }: Props) {
  const [consulta,   setConsulta]   = useState("");
  const [respuesta,  setRespuesta]  = useState<string | null>(null);
  const [cargando,   setCargando]   = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consulta.trim()) return;

    setCargando(true);
    setError(null);
    setRespuesta(null);

    try {
      // ── TODO: aquí irá la llamada real al backend ─────────────────────────
      // Endpoint a implementar: POST /api/agentes
      // Body: { agenteSlug, consulta }
      // El endpoint llamará a la API de OpenAI con el prompt del agente + la consulta.
      // ─────────────────────────────────────────────────────────────────────
      //
      // Ejemplo de llamada futura:
      // const res = await fetch("/api/agentes", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ agenteSlug, consulta }),
      // });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.error ?? "Error del servidor");
      // setRespuesta(data.respuesta);
      //
      // Por ahora, simulamos una respuesta placeholder:
      await new Promise(r => setTimeout(r, 800)); // simula latencia
      setRespuesta(
        `[Integración con IA próximamente]\n\nTu consulta ha sido recibida correctamente. ` +
        `Cuando activemos la conexión con OpenAI, aquí recibirás la respuesta del ${agenteSlug.replace(/-/g, " ").replace("agente", "Agente")}.`
      );
      // ─────────────────────────────────────────────────────────────────────
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* Textarea de consulta */}
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

      {/* Botón enviar */}
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
            ? <><Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> Procesando...</>
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

      {/* Respuesta */}
      {respuesta && (
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
          }}>
            {respuesta}
          </div>
        </div>
      )}
    </form>
  );
}
