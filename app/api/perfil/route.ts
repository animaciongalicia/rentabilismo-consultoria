import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });

  const { full_name, country, pain_phrase } = body as {
    full_name?: string;
    country?: string;
    pain_phrase?: string;
  };

  if (!full_name?.trim()) {
    return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: full_name.trim(),
      country: country?.trim() ?? "",
      pain_phrase: pain_phrase?.trim() ?? "",
    })
    .eq("id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
