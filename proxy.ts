import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Rutas de /app accesibles sin pago (solo requieren estar logueado)
const FREE_APP_PATHS = [
  '/app/modulos/modulo-1-mentalidad',
  '/app/perfil',
  '/app/comunidad',
  '/app/cuartel-general',
]

function isFreeAppPath(pathname: string): boolean {
  return FREE_APP_PATHS.some(
    (free) => pathname === free || pathname.startsWith(free + '/')
  )
}

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })
  const { pathname } = request.nextUrl

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refrescar sesión — no añadir lógica entre createServerClient y getUser
  const { data: { user } } = await supabase.auth.getUser()

  // ── Protección de rutas /app/** ──────────────────────────
  if (pathname.startsWith('/app')) {
    // Sin sesión → registro (primera acción natural del flujo)
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/registro'
      return NextResponse.redirect(url)
    }

    // Rutas gratuitas: Módulo 1, perfil y comunidad no requieren pago
    if (isFreeAppPath(pathname)) {
      return supabaseResponse
    }

    // Para el resto de rutas /app → verificar pago
    const { data: profile } = await supabase
      .from('profiles')
      .select('has_paid, role, plan')
      .eq('id', user.id)
      .single()

    const isSuperUser = profile?.role === 'founder' || profile?.role === 'admin'
    // has_paid es el flag legacy; plan cubre el modelo nuevo (FASE 6)
    const hasPaidAccess = profile?.has_paid || (!!profile?.plan && profile.plan !== 'free')

    if (!hasPaidAccess && !isSuperUser) {
      const url = request.nextUrl.clone()
      url.pathname = '/programa'
      return NextResponse.redirect(url)
    }
  }

  // ── Protección legacy /dashboard/** ─────────────────────
  if (!user && pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
