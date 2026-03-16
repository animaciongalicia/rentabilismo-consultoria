import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import { FOUNDER_DEADLINE, FOUNDER_SEATS } from '@/config/opciones'
import Stripe from 'stripe'

// Next.js App Router: el body debe llegar como stream sin parsear
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Firma ausente' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Firma inválida'
    console.error('[Webhook] Error de firma:', message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Obtenemos el user.id que pasamos al crear la sesión
    const userId =
      session.client_reference_id ??
      session.metadata?.supabase_user_id

    if (!userId) {
      console.error('[Webhook] checkout.session.completed sin user_id')
      return NextResponse.json({ error: 'user_id no encontrado' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const now = new Date()

    // Determinar si estamos en la ventana fundador
    const withinDeadline = !FOUNDER_DEADLINE || now <= FOUNDER_DEADLINE
    let plan = 'member'
    if (withinDeadline && FOUNDER_SEATS > 0) {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('plan', 'founder')
      plan = (count ?? 0) < FOUNDER_SEATS ? 'founder' : 'member'
    } else if (withinDeadline) {
      plan = 'founder'
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        has_paid:  true,
        role:      'member',
        plan,
        paid_at:   now.toISOString(),
        stripe_customer_id:         session.customer as string ?? null,
        stripe_checkout_session_id: session.id,
      })
      .eq('id', userId)

    if (error) {
      console.error('[Webhook] Error actualizando perfil:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(`[Webhook] Pago confirmado para user ${userId} — plan: ${plan}`)
  }

  return NextResponse.json({ received: true })
}
