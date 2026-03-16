// app/app/progreso/pdf/route.ts
// GET /app/progreso/pdf — genera y devuelve el informe PDF del usuario autenticado.
//
// REQUISITOS:
// - Usuario autenticado (redirige a /login si no lo está).
// - Usuario con has_paid = true (o fundador/admin).
// - La librería @react-pdf/renderer necesita runtime Node.js (no Edge).
//   Configurado en next.config.ts con serverExternalPackages.

import { NextResponse } from "next/server";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { getReportData } from "@/lib/reports";
import ProgressReportPDF from "@/lib/pdf/ProgressReportPDF";
import { hasFullAccess } from "@/config/roles";

// Forzar runtime Node.js — @react-pdf/renderer no funciona en Edge Runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();

  // ── Autenticación ──────────────────────────────────────────
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"));
  }

  // ── Verificar acceso de pago ───────────────────────────────
  const { data: profile } = await supabase
    .from("profiles")
    .select("has_paid, role")
    .eq("id", user.id)
    .single();

  const hasPaid = hasFullAccess(profile?.has_paid ?? false, profile?.role);

  if (!hasPaid) {
    return NextResponse.json(
      { error: "Acceso denegado. Se requiere acceso completo para exportar el informe." },
      { status: 403 }
    );
  }

  // ── Recopilar datos del informe ────────────────────────────
  let reportData;
  try {
    reportData = await getReportData(user.id, supabase, user.email ?? "");
  } catch (err) {
    console.error("[PDF] Error recopilando datos del informe:", err);
    return NextResponse.json(
      { error: "Error al recopilar los datos del informe." },
      { status: 500 }
    );
  }

  // ── Generar PDF ────────────────────────────────────────────
  let pdfBuffer: Buffer;
  try {
    // renderToBuffer recibe un elemento React JSX — requiere React en scope.
    pdfBuffer = await renderToBuffer(
      React.createElement(ProgressReportPDF, { data: reportData })
    );
  } catch (err) {
    console.error("[PDF] Error generando PDF:", err);
    return NextResponse.json(
      { error: "Error al generar el PDF. Inténtalo de nuevo." },
      { status: 500 }
    );
  }

  // ── Responder con el PDF como descarga ─────────────────────
  const fecha     = new Date().toISOString().slice(0, 10);  // YYYY-MM-DD
  const filename  = `rentabilismo-informe-${fecha}.pdf`;

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type":        "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length":      String(pdfBuffer.length),
      // Sin caché — cada descarga genera datos frescos
      "Cache-Control":       "no-store",
    },
  });
}
