// middleware.ts
// Re-exporta la lógica de proxy.ts como middleware de Next.js.
// proxy.ts se mantiene separado para poder testearlo/importarlo sin el runtime de Next.
export { proxy as middleware, config } from './proxy'
