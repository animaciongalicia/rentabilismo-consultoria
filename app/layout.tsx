import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rentabilismo — Consultoría Guiada",
  description: "Consultoría guiada para hacer crecer tu empresa en todos los frentes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
