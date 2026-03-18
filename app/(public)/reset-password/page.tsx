import ResetPasswordForm from "./ResetPasswordForm";

export const metadata = {
  title: "Nueva contraseña — Rentabilismo",
};

export default function ResetPasswordPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 2rem" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>
          Recuperar acceso
        </div>
        <h1 style={{ fontSize: "1.875rem", marginBottom: "0.625rem" }}>
          Crea una nueva contraseña
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginBottom: "2rem", lineHeight: 1.6 }}>
          Elige una contraseña segura para tu cuenta.
        </p>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
