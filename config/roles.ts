// config/roles.ts
// Fuente de verdad de los roles y planes del sistema.
// Cualquier comparación de roles/planes debe usar estas constantes.

// ── Roles (permisos de plataforma) ──────────────────────────────
// founder → acceso admin; admin → acceso admin; member → pagó; free → sin pago
export const ROLES = {
  FOUNDER: "founder",
  ADMIN:   "admin",
  MEMBER:  "member",
  FREE:    "free",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

/** Roles con acceso total (equivalen a has_paid = true aunque no lo tengan). */
export const SUPER_ROLES: Role[] = [ROLES.FOUNDER, ROLES.ADMIN];

export function isSuperUser(role: string | null | undefined): boolean {
  return SUPER_ROLES.includes(role as Role);
}

export function hasFullAccess(
  hasPaid: boolean,
  role: string | null | undefined,
  plan?: string | null,
): boolean {
  return hasPaid || isSuperUser(role) || hasActivePlan(plan);
}

// ── Planes (modelo comercial) ────────────────────────────────────
// Separado de role para no mezclar permisos con historial de compra.
export const PLANS = {
  FREE:    "free",
  FOUNDER: "founder",   // lanzamiento 2026, acceso vitalicio
  MEMBER:  "member",    // precio normal futuro
  ANNUAL:  "annual",    // suscripción anual (futuro)
  PREMIUM: "premium",   // extras premium (futuro)
} as const;

export type Plan = typeof PLANS[keyof typeof PLANS];

/** True si el usuario compró en la ventana fundador. */
export function isFounderPlan(plan: string | null | undefined): boolean {
  return plan === PLANS.FOUNDER;
}

/** True si el usuario tiene cualquier plan de pago activo. */
export function hasActivePlan(plan: string | null | undefined): boolean {
  return !!plan && plan !== PLANS.FREE;
}
