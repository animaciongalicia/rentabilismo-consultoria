# Reglas de trabajo para Claude Code — Rentabilismo

## Principio general
Los cambios deben ser **quirúrgicos**: tocar solo lo que se pide, nada más.
No mejorar código de alrededor, no refactorizar, no añadir comentarios, no limpiar imports no relacionados.

---

## Constantes que NUNCA deben modificarse sin permiso explícito

| Constante | Valor | Archivo |
|-----------|-------|---------|
| `PRECIO_PROGRAMA` | 799 | `config/opciones.ts` |
| `PRECIO_FUNDADOR` | 497 | `config/opciones.ts` |
| `MODULO_GRATUITO_SLUG` | `modulo-1-mentalidad` | `config/modulos.ts` |

Cuando una página muestra el precio de **acceso al programa**, usa siempre `PRECIO_PROGRAMA`.
`PRECIO_FUNDADOR` es solo para el precio de fundador (descuento temporal), nunca como precio principal.

---

## Slugs de módulos — no cambiar sin migración de BD

Los slugs en `config/modulos.ts` están enlazados a registros en Supabase.
Cambiar un slug requiere una migración de datos explícita. No hacerlo sin confirmación.

---

## Archivos de configuración críticos — no reestructurar

- `config/modulos.ts` — fuente de verdad de módulos
- `config/lessons.ts` — fuente de verdad de lecciones
- `config/agentes.ts` — fuente de verdad de agentes
- `proxy.ts` — middleware de autenticación; cambios con mucho cuidado
- `app/app/layout.tsx` — layout del área privada

---

## Rutas de acceso

| Ruta | Acceso |
|------|--------|
| `/app/modulos/modulo-1-mentalidad` | Visitantes sin login (guest) |
| `/app/cuartel-general` | Requiere login, no requiere pago |
| `/app/modulos/[resto]` | Requiere login + pago |
| `/app/perfil`, `/app/comunidad`, `/app/progreso` | Requiere login, no pago |

---

## Antes de hacer un cambio

1. Leer el archivo completo antes de editar
2. Tocar solo las líneas necesarias
3. Si el cambio afecta a más de un archivo, listarlos y confirmar antes de proceder
4. En caso de duda sobre el alcance: preguntar
