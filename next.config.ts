import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @react-pdf/renderer debe ejecutarse en Node.js, no ser bundleado por Webpack.
  // Sin esto, la ruta /app/progreso/pdf falla en producción con errores de canvas/fs.
  serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
