import RegistroWizard from "./RegistroWizard";

export const metadata = {
  title: "Únete a la Trinchera — Rentabilismo",
  description: "Regístrate y únete a la comunidad de empresarios que dejan de perder dinero.",
};

export default function RegistroPage() {
  return (
    <div className="page-content" style={{ maxWidth: "560px" }}>
      <div className="page-header-block">
        <div className="page-eyebrow">Registro</div>
        <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", marginBottom: "0.75rem" }}>
          Entra en la trinchera.
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
          3 pasos. Sin rodeos. Sin ventas disfrazadas de contenido.
        </p>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", margin: "2rem 0" }} />

      <RegistroWizard />
    </div>
  );
}
