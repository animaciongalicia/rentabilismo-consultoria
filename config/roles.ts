// config/roles.ts
// Fuente de verdad de los roles del sistema.
// Cualquier comparación de roles debe usar estas constantes.

export const ROLES = {
  FOUNDER: "founder",
  ADMIN:   "admin",
  MEMBER:  "member",
  FREE:    "free",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

/** Roles con acceso total (equivalen a has_paid = true aunque no lo tengan). */
export const SUPER_ROLES: Role[] = [ROLES.FOUNDER, ROLES.ADMIN];

/**
 * Devuelve true si el rol tiene privilegios de superusuario (founder o admin).
 * Acepta string | null | undefined para simplificar su uso con datos de Supabase.
 */
export function isSuperUser(role: string | null | undefined): boolean {
  return SUPER_ROLES.includes(role as Role);
}

/**
 * Devuelve true si el usuario tiene acceso completo al programa
 * (ha pagado o es superusuario).
 */
export function hasFullAccess(hasPaid: boolean, role: string | null | undefined): boolean {
  return hasPaid || isSuperUser(role);
}
