import { CheckCircle, ArrowRight, AlertCircle } from 'lucide-react'
import CheckoutButton from './CheckoutButton'

export const metadata = {
  title: 'El Programa — Rentabilismo',
  description: 'Accede al método de consultoría guiada que transforma tu negocio en 90 días.',
}

const INCLUYE = [
  'Diagnóstico completo de rentabilidad en 7 preguntas',
  'Plan de acción personalizado con prioridades claras',
  'Acceso al dashboard privado con tu hoja de ruta',
  'Biblioteca de casos reales de empresarios como tú',
  'Soporte directo sin filtros durante 90 días',
]

export default function ProgramaPage({
  searchParams,
}: {
  searchParams: Promise<{ pago?: string }>
}) {
  return (
    <div style={{ minHeight: '100vh', padding: '5rem 4rem' }}>
      <div style={{ maxWidth: '640px' }}>

        {/* Aviso de pago cancelado */}
        <CancelBanner searchParams={searchParams} />

        {/* Tag */}
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '1.5rem',
        }}>
          El Programa
        </div>

        {/* Titular */}
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem' }}>
          Para de improvisar.<br />
          Empieza a cobrar lo que vales.
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--muted)',
          lineHeight: 1.7,
          marginBottom: '3rem',
        }}>
          Un método directo para diagnosticar por qué tu negocio no gana dinero
          y construir el plan que lo arregle. Sin teoría. Sin motivación barata.
          Solo trabajo real.
        </p>

        {/* Lo que incluye */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            Qué incluye
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {INCLUYE.map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle size={18} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Precio + CTA */}
        <div className="card-brutal" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.04em' }}>497€</span>
            <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>pago único · acceso permanente</span>
          </div>
          <CheckoutButton />
          <p style={{
            marginTop: '1rem',
            fontSize: '0.75rem',
            color: 'var(--muted)',
            lineHeight: 1.6,
          }}>
            Pago seguro con Stripe. Si en 7 días no has empezado a ver el problema claro,
            te devuelvo el dinero sin preguntas.
          </p>
        </div>

        {/* Garantía */}
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
          Pago de un solo uso. Sin suscripciones ocultas.
          El acceso no caduca mientras la plataforma exista.
        </p>

      </div>
    </div>
  )
}

// Componente servidor para el banner de cancelación
async function CancelBanner({ searchParams }: { searchParams: Promise<{ pago?: string }> }) {
  const params = await searchParams
  if (params.pago !== 'cancelado') return null
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem 1.25rem',
      border: '2px solid #cc8800',
      backgroundColor: '#fffbf0',
      marginBottom: '2rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#996600',
    }}>
      <AlertCircle size={16} />
      Cancelaste el pago. Puedes volver cuando quieras.
    </div>
  )
}
