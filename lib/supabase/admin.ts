import { createClient } from '@supabase/supabase-js'

// Cliente con service role — bypasea RLS.
// Usar SOLO en rutas de servidor (API routes, webhooks).
// NUNCA importar desde componentes de cliente.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
