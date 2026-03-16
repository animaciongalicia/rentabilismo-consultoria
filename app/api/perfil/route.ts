import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });

  const { full_name, country, pain_phrase, sector, business_size, objetivo_60_dias } = body as {
    full_name?:        string;
    country?:          string;
    pain_phrase?:      string;
    sector?:           string;
    business_size?:    string;
    objetivo_60_dias?: string;
  };

  if (!full_name?.trim()) {
    return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });
  }

  const VALID_SIZES = ["autonomo", "2-5", "6-20", "+20", ""];
  if (business_size !== undefined && !VALID_SIZES.includes(business_size)) {
    return NextResponse.json({ error: "Tamaño de negocio no válido" }, { status: 400 });
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name:        full_name.trim(),
      country:          country?.trim()          ?? "",
      pain_phrase:      pain_phrase?.trim()      ?? "",
      sector:           sector?.trim()           || null,
      business_size:    business_size?.trim()    || null,
      objetivo_60_dias: objetivo_60_dias?.trim() || null,
    })
    .eq("id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
