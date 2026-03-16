import LoginForm from "./LoginForm";

export const metadata = {
  title: "Iniciar Sesión — Rentabilismo",
};

export default function LoginPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 2rem",
    }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ marginBottom: "3rem" }}>
          <div style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "1rem",
          }}>
            Acceso
          </div>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
            Bienvenido de vuelta.
          </h1>
          <p style={{ color: "var(--muted)" }}>
            Entra y continúa donde lo dejaste.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
