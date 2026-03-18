import ResetPasswordForm from "./ResetPasswordForm";

export const metadata = {
  title: "Nueva contraseña — Rentabilismo",
};

export default function ResetPasswordPage() {
  return (
    <div className="page-content" style={{ maxWidth: "480px" }}>
      <div className="page-header-block">
        <div className="page-eyebrow">Recuperar acceso</div>
        <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", marginBottom: "0.75rem" }}>
          Crea una nueva contraseña
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
          Elige una contraseña segura para tu cuenta.
        </p>
      </div>
      <div style={{ borderTop: "1px solid var(--border)", margin: "2rem 0" }} />
      <ResetPasswordForm />
    </div>
  );
}
