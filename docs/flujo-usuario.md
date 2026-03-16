# Flujo de Usuario — Rentabilismo

Documento de referencia del flujo de navegación implementado.
Última actualización: 2026-03-16

---

## Flujo actual antes de esta reestructuración (problemas detectados)

- Todos los `/app/**` requerían pago → el usuario sin pagar era redirigido a `/programa` sin poder probar nada.
- Tras el registro, el usuario iba a `/bienvenida` (página muerta sin acción clara).
- El botón "Acceder al programa" en CheckoutButton redirigía a `/login` si no estabas logueado (debía ir a `/registro`).
- El CTA de `/programa` tenía "Acceder al programa" (checkout) y "Crear cuenta primero" simultáneamente → circular.
- La Home tenía un precio con CTA que apuntaba a `/programa` en vez de al inicio del flujo real.
- `SidebarModulos` no diferenciaba entre usuarios de pago y no pagados.
- No existía página de Comunidad en la zona privada.

---

## Flujo nuevo

### A) Visitante no registrado

```
HOME (/)
  ├─ [Empezar ahora — gratis]  →  /registro
  ├─ [Ver cómo funciona]       →  /como-funciona
  └─ Sección precio:
       ├─ [Crear cuenta gratis]           →  /registro
       └─ [accede al pago directamente]   →  /programa

/programa
  ├─ Módulo 1 marcado como "Gratis"
  ├─ Módulos 2-10 marcados como "Acceso completo (bloqueado)"
  ├─ [Crear cuenta gratis]     →  /registro      (Paso 1)
  └─ [Acceder al programa]     →  /registro      (CheckoutButton redirige si 401)

/registro  →  formulario 3 pasos  →  al enviar: window.location.href = "/app"
  │
  ├─ Si Supabase tiene autoconfirm = ON:
  │    → Usuario logueado → /app → redirect → /app/modulos/modulo-1-mentalidad ✓
  │
  └─ Si Supabase tiene autoconfirm = OFF (email confirmation requerido):
       → /app → proxy redirige a /registro (sin sesión)
       → WORKAROUND: mostrar /bienvenida con instrucciones para confirmar email
       → Usuario confirma email → inicia sesión en /login → /app ✓
```

**Nota sobre email confirmation:**
El RegistroWizard hace `window.location.href = "/app"` tras el signup.
- Con autoconfirm ON: funciona directamente.
- Con autoconfirm OFF: el proxy redirige a `/registro`. Para este caso,
  se recomienda activar autoconfirm en el proyecto Supabase, o implementar
  un redirect de vuelta tras la confirmación del email.

---

### B) Usuario registrado SIN pagar (role: "free", has_paid: false)

```
LOGIN → /app → /app/modulos/modulo-1-mentalidad

Rutas ACCESIBLES sin pago:
  ✓ /app/modulos/modulo-1-mentalidad         (módulo completo)
  ✓ /app/modulos/modulo-1-mentalidad/[lección] (todas las lecciones del M1)
  ✓ /app/perfil                              (ver y editar perfil)
  ✓ /app/comunidad                           (ver fichas de otros usuarios)

Rutas BLOQUEADAS (redirigen a /programa):
  ✗ /app/modulos/modulo-2-diagnostico  → /programa
  ✗ /app/modulos/modulo-3-finanzas     → /programa
  ✗ ... (M3 a M10)                     → /programa
  ✗ /app/progreso                      → /programa

En SidebarModulos:
  - Módulo 1: badge "Gratis", accesible
  - Módulos 2-10: icono de candado, clic lleva a /programa
  - Banner "9 módulos bloqueados — Desbloquear 799€"

En Módulo 1 (/app/modulos/modulo-1-mentalidad):
  - Botón "Siguiente" con candado → /programa (no al M2 directamente)
  - CTA al final: "Desbloquear los 9 módulos restantes — Ver el programa completo"
  - Sidebar derecho: botón "Desbloquear programa — 799€" → /programa
```

---

### C) Usuario registrado y PAGADO (role: "member"/"founder"/"admin", has_paid: true)

```
LOGIN → /app → /app/modulos/modulo-1-mentalidad

Rutas ACCESIBLES (todas):
  ✓ /app/modulos/[cualquier-módulo]
  ✓ /app/modulos/[slug]/[lección]
  ✓ /app/perfil
  ✓ /app/comunidad
  ✓ /app/progreso

En SidebarModulos:
  - Cabecera: "Programa completo"
  - Todos los módulos accesibles con indicadores de progreso
  - Sin banner de upgrade

En Módulo 1:
  - Botón "Siguiente" normal → /app/modulos/modulo-2-diagnostico
  - Sin CTA de upgrade (ya tiene acceso)
```

---

## Flujos concretos pedidos

### 1) Home → Registro → Módulo 1 → Pago → Acceso completo

```
/ → /registro → (signup) → /app → /app/modulos/modulo-1-mentalidad
                                         ↓
                         [CTA "Desbloquear — 799€"] → /programa
                                                            ↓
                                              [Acceder al programa]
                                                (CheckoutButton)
                                                            ↓
                                              Stripe checkout → pago OK
                                                            ↓
                                         webhook → has_paid=true, role='member'
                                                            ↓
                                              /app?pago=ok → acceso completo
```

### 2) Home → El programa → Pago → Registro → Acceso completo

```
/ → /programa
        ↓
  [Acceder al programa] (sin cuenta)
        ↓
  CheckoutButton 401 → /registro
        ↓
  (signup) → /app → /app/modulos/modulo-1-mentalidad (Módulo 1 gratis)
        ↓ (usuario decide pagar)
  /programa → [Acceder al programa] (ya logueado)
        ↓
  Stripe checkout → pago OK → webhook → /app?pago=ok → acceso completo
```

---

## Mapa de rutas completo

### Rutas públicas (sin auth)

| Path | Propósito |
|------|-----------|
| `/` | Home — presentación, precio, CTA |
| `/como-funciona` | Explicación del método |
| `/dolores` | ¿Eres tú? — identificación con el usuario |
| `/mentalidad` | Preview del tema del Módulo 1 |
| `/programa` | Página de venta — módulos + precio + checkout |
| `/el-muro` | Muro público de frases de empresarios |
| `/registro` | Crear cuenta (wizard 3 pasos) |
| `/login` | Iniciar sesión |
| `/olvide-contrasena` | Recuperar contraseña |
| `/bienvenida` | Confirmación post-registro (si email confirmation activo) |

### Rutas privadas — acceso gratuito (requieren auth, sin pago)

| Path | Propósito |
|------|-----------|
| `/app/modulos/modulo-1-mentalidad` | Módulo 1 completo (gratis) |
| `/app/modulos/modulo-1-mentalidad/[lección]` | Lecciones del Módulo 1 |
| `/app/perfil` | Ver y editar perfil |
| `/app/comunidad` | Fichas públicas de la comunidad |

### Rutas privadas — requieren pago

| Path | Propósito |
|------|-----------|
| `/app` | Redirect → Módulo 1 |
| `/app/modulos/modulo-2-diagnostico` ... `modulo-10-plan-accion` | Módulos 2-10 |
| `/app/modulos/[slug]/[lección]` (M2-M10) | Lecciones M2-M10 |
| `/app/progreso` | Informe de progreso completo |
| `/app/admin` | Panel admin (solo founder/admin) |

---

## Menú lateral público (Sidebar.tsx)

```
DESCUBRE
  - Inicio                → /
  - Cómo funciona         → /como-funciona
  - ¿Eres tú?             → /dolores
  - Mentalidad            → /mentalidad
  - El Programa           → /programa

COMUNIDAD
  - El Muro               → /el-muro

ACCESO
  - Únete                 → /registro
  - Entrar                → /login
```

## Menú lateral privado (SidebarModulos.tsx)

```
← Inicio (link)
Rentabilismo / [Programa completo | Acceso gratuito]

MÓDULOS
  01 Mentalidad Empresarial     [Badge "Gratis" si sin pago]
  02 Diagnóstico de Rentabilidad [🔒 → /programa si sin pago]
  ...
  10 Tu Plan de Acción          [🔒 → /programa si sin pago]

[Banner upgrade 799€ — si sin pago]

  - Comunidad             → /app/comunidad
  - Mi progreso           → /app/progreso  (solo si has_paid)
  - Mi perfil             → /app/perfil
  - Admin                 → /app/admin     (solo founder/admin)
```

---

## Comunidad (/app/comunidad)

- Visible para todos los usuarios logueados (con o sin pago).
- Muestra: nombre, país, frase de dolor, rol, fecha de unión.
- Filtros en cliente: por país, por rol.
- **Mensajería directa: NO implementada.**
  Para añadirla en el futuro ver comentario en `app/app/comunidad/page.tsx`.

---

## Notas técnicas

- La protección de rutas ocurre en **dos capas**:
  1. `proxy.ts` (middleware Next.js): intercepción a nivel de edge antes de renderizar
  2. `app/app/layout.tsx`: verificación adicional en el servidor
- Los roles `founder` y `admin` tienen acceso completo independientemente de `has_paid`.
- El pago se procesa mediante Stripe (pago único, no suscripción).
- El webhook `/api/stripe/webhook` actualiza `has_paid=true` y `role='member'` en Supabase.
