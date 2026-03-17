"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "rntb_welcome_shown";

export default function WelcomeBanner({ name }: { name: string | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage no disponible (SSR guard)
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      padding: "1rem 1.25rem",
      backgroundColor: "var(--foreground)",
      color: "var(--background)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "1rem",
      marginBottom: "1.5rem",
    }}>
      <div>
        <p style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.25rem" }}>
          {name ? `Bienvenido, ${name.split(" ")[0]}.` : "Bienvenido."}
        </p>
        <p style={{ fontSize: "0.8rem", opacity: 0.8, lineHeight: 1.6, margin: 0 }}>
          Tienes acceso al <strong>Módulo 0 — Mentalidad</strong>: 4 lecciones, cada una con ejercicios.
          Escribe tus respuestas y pulsa <strong>Guardar</strong> para registrar tu progreso.
        </p>
      </div>
      <button
        onClick={dismiss}
        aria-label="Cerrar"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--background)",
          opacity: 0.7,
          padding: "0.1rem",
          flexShrink: 0,
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
