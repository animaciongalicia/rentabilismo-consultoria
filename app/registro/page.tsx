import RegistroWizard from "./RegistroWizard";

export const metadata = {
  title: "Únete a la Trinchera — Rentabilismo",
  description: "Regístrate y únete a la comunidad de empresarios que dejan de perder dinero.",
};

export default function RegistroPage() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "var(--background)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 2rem",
    }}>
      <div style={{ width: "100%", maxWidth: "520px" }}>
        {/* Cabecera */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "1rem",
          }}>
            Registro
          </div>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
            Entra en la trinchera.
          </h1>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>
            3 pasos. Sin rodeos. Sin ventas disfrazadas de contenido.
          </p>
        </div>

        <RegistroWizard />
      </div>
    </div>
  );
}
