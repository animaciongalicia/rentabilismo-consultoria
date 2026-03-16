import LoginForm from "./LoginForm";

export const metadata = {
  title: "Iniciar Sesión — Rentabilismo",
};

export default function LoginPage() {
  return (
    <div className="page-content" style={{ maxWidth: "480px" }}>
      <div className="page-header-block">
        <div className="page-eyebrow">Acceso</div>
        <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", marginBottom: "0.75rem" }}>
          Bienvenido de vuelta.
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
          Entra y continúa donde lo dejaste.
        </p>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", margin: "2rem 0" }} />

      <LoginForm />
    </div>
  );
}
