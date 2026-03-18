import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata = {
  title: "Recuperar contraseña — Rentabilismo",
};

export default function OlvideContrasenaPage() {
  return (
    <div className="page-content" style={{ maxWidth: "480px" }}>
      <div className="page-header-block">
        <div className="page-eyebrow">Recuperar acceso</div>
        <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", marginBottom: "0.75rem" }}>
          ¿Olvidaste la contraseña?
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
          Introduce tu email y te mandamos un enlace para crear una nueva.
        </p>
      </div>
      <div style={{ borderTop: "1px solid var(--border)", margin: "2rem 0" }} />
      <ForgotPasswordForm />
    </div>
  );
}
