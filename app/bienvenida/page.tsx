import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "Bienvenido a la Trinchera — Rentabilismo",
};

export default function BienvenidaPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 2rem",
    }}>
      <div style={{ maxWidth: "480px", textAlign: "center" }}>
        <CheckCircle size={56} strokeWidth={1.5} style={{ marginBottom: "2rem", color: "var(--foreground)" }} />
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Estás dentro.
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
          Revisa tu email para confirmar tu cuenta. Después de confirmar, tu frase de dolor
          aparecerá en El Muro para que otros empresarios se reconozcan en ti.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary">
            Ver El Muro
          </Link>
          <Link href="/login" className="btn-outline">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
