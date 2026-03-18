export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const REQUIRED: string[] = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "NEXT_PUBLIC_BASE_URL",
  ];

  const missing = REQUIRED.filter(k => !process.env[k]);
  if (missing.length > 0) {
    throw new Error(
      `[env] Variables de entorno requeridas no encontradas: ${missing.join(", ")}`
    );
  }
}
