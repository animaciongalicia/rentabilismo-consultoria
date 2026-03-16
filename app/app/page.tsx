import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Dashboard — Rentabilismo',
}

export default async function AppDashboard({
  searchParams,
}: {
  searchParams: Promise<{ pago?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, has_paid')
    .eq('id', user.id)
    .single()

  if (!profile?.has_paid) redirect('/programa')

  const params = await searchParams
  const pagoOk = params.pago === 'ok'

  return (
    <div style={{ minHeight: '100vh', padding: '5rem 4rem' }}>
      <div style={{ maxWidth: '640px' }}>

        {/* Banner de bienvenida post-pago */}
        {pagoOk && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            border: '2px solid var(--foreground)',
            backgroundColor: '#f0fff4',
            marginBottom: '2.5rem',
            fontSize: '0.875rem',
            fontWeight: 700,
          }}>
            <CheckCircle size={18} />
            Pago confirmado. Bienvenido al programa.
          </div>
        )}

        <div style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '1rem',
        }}>
          Dashboard
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
          Hola, {profile.full_name?.split(' ')[0]}.
        </h1>

        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '3rem' }}>
          Estás dentro. El contenido del programa se está preparando.
          En las próximas horas tendrás acceso a tu diagnóstico personalizado.
        </p>

        {/* Placeholder módulos — se implementan en FASE 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {['Diagnóstico de rentabilidad', 'Tu plan de acción', 'Casos de referencia'].map((mod, i) => (
            <div key={mod} className="card-brutal" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: i === 0 ? 1 : 0.4,
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{mod}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                  {i === 0 ? 'Disponible próximamente' : 'Próximamente'}
                </div>
              </div>
              <div style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: '2px solid var(--foreground)',
                padding: '0.25rem 0.625rem',
                opacity: i === 0 ? 1 : 0.4,
              }}>
                {i === 0 ? 'Fase 3' : 'Locked'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
