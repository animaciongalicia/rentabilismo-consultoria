'use client'

import { useState } from 'react'
import { Loader2, ArrowRight } from 'lucide-react'

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    setLoading(true)
    setError(null)

    const res = await fetch('/api/checkout', { method: 'POST' })

    if (res.status === 401) {
      // No logueado → registro (primer paso del flujo)
      window.location.href = '/registro'
      return
    }

    if (!res.ok) {
      setError('Error al iniciar el pago. Inténtalo de nuevo.')
      setLoading(false)
      return
    }

    const { url } = await res.json()
    if (url) window.location.href = url
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="btn-primary"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: '1.05rem',
          padding: '1rem',
        }}
      >
        {loading ? (
          <>
            <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
            Preparando pago...
          </>
        ) : (
          <>
            Acceder al programa
            <ArrowRight size={18} />
          </>
        )}
      </button>
      {error && (
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#cc0000', fontWeight: 600 }}>
          {error}
        </p>
      )}
    </div>
  )
}
