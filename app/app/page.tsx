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
    <div style={{ minHeight: '100vh', padding: '4rem 3.5rem' }}>
      <div style={{ maxWidth: '580px' }}>

        {pagoOk && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.75rem 1rem',
            border: '1px solid #b7e0c4',
            backgroundColor: '#f4fdf7',
            marginBottom: '2rem',
            fontSize: '0.825rem',
            fontWeight: 600,
            color: '#2d6a4a',
          }}>
            <CheckCircle size={15} />
            Pago confirmado. Ya tienes acceso.
          </div>
        )}

        <div style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '0.75rem',
        }}>
          Dashboard
        </div>

        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginBottom: '0.75rem' }}>
          Hola, {profile.full_name?.split(' ')[0]}.
        </h1>

        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          Estás dentro. El contenido del programa se está preparando.
          Tendrás acceso a tu diagnóstico personalizado en breve.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {[
            { label: 'Diagnóstico de rentabilidad', soon: true },
            { label: 'Tu plan de acción', soon: true },
            { label: 'Casos de referencia', soon: true },
          ].map(({ label }, i) => (
            <div key={label} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--card)',
              opacity: i === 0 ? 1 : 0.5,
            }}>
              <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{label}</span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                border: '1px solid var(--border)',
                padding: '0.2rem 0.5rem',
              }}>
                Próximamente
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
