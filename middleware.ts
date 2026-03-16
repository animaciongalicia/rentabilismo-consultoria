// middleware.ts
//
// PROPÓSITO ÚNICO: Refrescar el token de sesión de Supabase en cada request.
//
// Sin este middleware, el access token de Supabase expira tras ~1 hora y el
// usuario queda desconectado aunque no haya hecho nada. El patrón @supabase/ssr
// necesita que el middleware lea el token de las cookies, lo refresque si ha
// expirado, y lo escriba de vuelta en la respuesta.
//
// IMPORTANTE (del equipo de Supabase):
// - NO poner ninguna lógica entre createServerClient() y supabase.auth.getUser().
//   Un error aquí puede causar desconexiones aleatorias difíciles de depurar.
// - NO redirigir aquí según el estado de autenticación.
//   Los redirects los gestiona cada layout/page (app/app/layout.tsx, etc.).
//   El middleware solo refresca; los layouts protegen.
//
// Docs: https://supabase.com/docs/guides/auth/server-side/nextjs

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Creamos la respuesta base que se pasará a través del middleware.
  // Es importante mutar esta variable en setAll (ver abajo).
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // 1. Escribe en el objeto request (para que Server Components lo lean)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // 2. Crea nueva respuesta con el request actualizado
          supabaseResponse = NextResponse.next({ request });
          // 3. Escribe en la respuesta (para que el browser los guarde)
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresca la sesión. DEBE estar justo aquí, sin lógica intermedia.
  // Si el token ha expirado, Supabase lo renueva y setAll() lo guarda.
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    // Aplica a todas las rutas excepto assets estáticos y archivos de imagen.
    // Esto garantiza que cada navegación refresca la sesión.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
