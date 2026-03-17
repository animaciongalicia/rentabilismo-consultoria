import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { AGENTES } from "@/config/agentes";
import { createClient } from "@/lib/supabase/server";
import { hasFullAccess } from "@/config/roles";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  // ── Auth ────────────────────────────────────────────────────────
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: "No autenticado" }, { status: 401 });
  }

  // ── Acceso de pago ───────────────────────────────────────────────
  const { data: profile } = await supabase
    .from("profiles")
    .select("has_paid, role, plan")
    .eq("id", user.id)
    .single();

  const hasPaid = hasFullAccess(
    profile?.has_paid ?? false,
    profile?.role,
    profile?.plan,
  );
  if (!hasPaid) {
    return Response.json({ error: "Acceso no autorizado" }, { status: 403 });
  }

  // ── Validar body ─────────────────────────────────────────────────
  let agenteSlug: string, consulta: string;
  try {
    ({ agenteSlug, consulta } = await req.json());
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!agenteSlug?.trim() || !consulta?.trim()) {
    return Response.json({ error: "Datos incompletos" }, { status: 400 });
  }

  const agente = AGENTES.find(a => a.slug === agenteSlug);
  if (!agente) {
    return Response.json({ error: "Agente no encontrado" }, { status: 404 });
  }

  // ── System prompt ────────────────────────────────────────────────
  const systemPrompt = `Eres ${agente.nombre}, consultor especializado de Rentabilismo.

${agente.contexto}

Área: ${agente.modulo}

Cómo responder:
- Directo y concreto, sin rodeos ni motivación vacía
- Usa ejemplos reales y accionables
- Sé honesto aunque sea incómodo
- Si te falta información, pregunta lo imprescindible antes de aconsejar
- Cierra siempre con una acción concreta que el empresario pueda hacer esta semana
- Máximo 400 palabras salvo que el caso lo requiera`;

  // ── Streaming a Claude ───────────────────────────────────────────
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        const stream = anthropic.messages.stream({
          model: "claude-opus-4-6",
          max_tokens: 1024,
          thinking: { type: "adaptive" },
          system: systemPrompt,
          messages: [{ role: "user", content: consulta }],
        });

        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        const msg =
          err instanceof Anthropic.APIError
            ? `Error de la IA (${err.status}): ${err.message}`
            : "Error inesperado al procesar la consulta.";
        controller.enqueue(encoder.encode(`\n\n[ERROR] ${msg}`));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
