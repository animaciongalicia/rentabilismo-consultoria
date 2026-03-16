// lib/pdf/ProgressReportPDF.tsx
//
// Componente PDF del informe de progreso de Rentabilismo.
//
// DECISIONES DE DISEÑO PARA ESTABILIDAD:
// - Solo fuentes embebidas en @react-pdf/renderer (Helvetica): sin fuentes externas.
// - Sin imágenes: el logo es texto puro. Evita errores de fetch en servidor.
// - Sin columnas múltiples: una sola columna. Las columnas en react-pdf son frágiles.
// - Cada módulo empieza en página nueva con <View break>: saltos controlados.
// - wrap={false} en cada bloque de ejercicio: evita cortes a mitad de respuesta.
//   Si una respuesta es muy larga (>~40 líneas), wrap={false} se ignora por react-pdf
//   y el texto fluye naturalmente — eso es mejor que cortar bloques.
// - Respuestas con \n: se dividen en párrafos individuales (<Text> separados).
//   Usar un solo <Text> con \n dentro puede generar saltos erráticos en algunos viewers.

import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ReportData } from "@/lib/reports";

// ── Paleta de colores ─────────────────────────────────────────
const C = {
  black:     "#0a0a0a",
  dark:      "#1a1a1a",
  mid:       "#555555",
  light:     "#888888",
  border:    "#d0ceca",
  bg:        "#f9f7f4",
  white:     "#ffffff",
  accent:    "#0a0a0a",  // mismo que black — no usamos colores llamativos
};

// ── Estilos ───────────────────────────────────────────────────
const S = StyleSheet.create({
  page: {
    fontFamily:      "Helvetica",
    fontSize:        10,
    color:           C.black,
    backgroundColor: C.white,
    paddingTop:      55,
    paddingBottom:   60,
    paddingLeft:     55,
    paddingRight:    55,
    lineHeight:      1.5,
  },

  // ── Portada ─────────────────────────
  coverBrand: {
    fontSize:      8,
    fontFamily:    "Helvetica-Bold",
    letterSpacing: 2,
    textTransform: "uppercase",
    color:         C.light,
    marginBottom:  60,
  },
  coverTitle: {
    fontSize:      26,
    fontFamily:    "Helvetica-Bold",
    color:         C.black,
    marginBottom:  10,
    lineHeight:    1.2,
  },
  coverSubtitle: {
    fontSize:  12,
    color:     C.mid,
    marginBottom: 40,
  },
  coverDivider: {
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    marginBottom:      24,
  },
  coverInfoRow: {
    flexDirection: "row",
    marginBottom:  8,
  },
  coverInfoLabel: {
    fontFamily:    "Helvetica-Bold",
    fontSize:      9,
    color:         C.light,
    letterSpacing: 1,
    textTransform: "uppercase",
    width:         90,
  },
  coverInfoValue: {
    fontSize: 10,
    color:    C.black,
    flex:     1,
  },
  coverFooter: {
    position:  "absolute",
    bottom:    40,
    left:      55,
    right:     55,
    fontSize:  8,
    color:     C.light,
    textAlign: "center",
  },
  coverDisclaimer: {
    marginTop:    40,
    padding:      14,
    borderWidth:  1,
    borderColor:  C.border,
    fontSize:     9,
    color:        C.mid,
    lineHeight:   1.6,
  },

  // ── Índice ──────────────────────────
  indexTitle: {
    fontFamily:    "Helvetica-Bold",
    fontSize:      14,
    marginBottom:  20,
    color:         C.black,
  },
  indexRow: {
    flexDirection:  "row",
    justifyContent: "space-between",
    alignItems:     "flex-start",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  indexModuleTitle: {
    fontSize: 9,
    color:    C.black,
    flex:     1,
  },
  indexProgress: {
    fontSize:      9,
    color:         C.light,
    fontFamily:    "Helvetica-Bold",
    letterSpacing: 0.5,
    width:         80,
    textAlign:     "right",
  },
  indexStats: {
    flexDirection:  "row",
    gap:            20,
    marginTop:      24,
    paddingTop:     16,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  indexStatBlock: {
    alignItems: "flex-start",
  },
  indexStatNumber: {
    fontFamily: "Helvetica-Bold",
    fontSize:   20,
    color:      C.black,
  },
  indexStatLabel: {
    fontSize:      7,
    color:         C.light,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginTop:     2,
  },

  // ── Módulo ──────────────────────────
  modulePage: {
    // Se combina con page; el break lo gestiona <View break>
  },
  moduleEyebrow: {
    fontSize:      7,
    fontFamily:    "Helvetica-Bold",
    letterSpacing: 2,
    textTransform: "uppercase",
    color:         C.light,
    marginBottom:  8,
  },
  moduleTitle: {
    fontSize:      18,
    fontFamily:    "Helvetica-Bold",
    color:         C.black,
    lineHeight:    1.2,
    marginBottom:  6,
  },
  moduleProgress: {
    fontSize:  9,
    color:     C.mid,
    marginBottom: 20,
  },
  moduleDivider: {
    borderBottomWidth: 2,
    borderBottomColor: C.black,
    marginBottom:      20,
  },

  // ── Lección ─────────────────────────
  lessonBlock: {
    marginBottom: 18,
  },
  lessonTitle: {
    fontFamily:      "Helvetica-Bold",
    fontSize:        11,
    color:           C.black,
    marginBottom:    10,
    paddingBottom:   5,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },

  // ── Ejercicio ────────────────────────
  exerciseBlock: {
    marginBottom:    12,
    padding:         10,
    borderWidth:     1,
    borderColor:     C.border,
    backgroundColor: C.bg,
  },
  exercisePrompt: {
    fontSize:      9,
    color:         C.light,
    fontFamily:    "Helvetica-Oblique",
    marginBottom:  6,
    lineHeight:    1.5,
  },
  exerciseParagraph: {
    fontSize:   10,
    color:      C.dark,
    lineHeight: 1.6,
    marginBottom: 3,
  },
  exerciseDate: {
    fontSize:   8,
    color:      "#aaaaaa",
    marginTop:  6,
    fontFamily: "Helvetica-Oblique",
  },

  // ── Footer de página ─────────────────
  pageFooter: {
    position:  "absolute",
    bottom:    28,
    left:      55,
    right:     55,
    flexDirection:  "row",
    justifyContent: "space-between",
    alignItems:     "center",
  },
  pageFooterBrand: {
    fontSize:      7,
    color:         C.light,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  pageFooterPage: {
    fontSize: 8,
    color:    C.light,
  },
});

// ── Helpers ───────────────────────────────────────────────────

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit", month: "long", year: "numeric",
    });
  } catch {
    return iso;
  }
}

// Divide el texto por saltos de línea y renderiza cada párrafo como <Text> separado.
// Esto evita problemas de rendering en algunos PDF viewers con \n en un solo Text.
function RespuestaParagraphs({ text }: { text: string }) {
  const paragraphs = text.split("\n").filter(p => p.trim() !== "");
  if (paragraphs.length === 0) {
    return <Text style={S.exerciseParagraph}>{text}</Text>;
  }
  return (
    <>
      {paragraphs.map((p, i) => (
        <Text key={i} style={S.exerciseParagraph}>{p}</Text>
      ))}
    </>
  );
}

// Footer de página (número de página + marca)
function PageFooter({ pageNum }: { pageNum?: number }) {
  return (
    <View style={S.pageFooter} fixed>
      <Text style={S.pageFooterBrand}>Rentabilismo · Informe de Progreso</Text>
      <Text
        style={S.pageFooterPage}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </View>
  );
}

// ── Componente principal ──────────────────────────────────────
export default function ProgressReportPDF({ data }: { data: ReportData }) {
  const { user, generatedAt, stats, modules } = data;

  return (
    <Document
      title="Informe de Progreso — Rentabilismo"
      author="Rentabilismo"
      subject={`Informe de progreso de ${user.name}`}
      creator="Rentabilismo Consultoría"
    >

      {/* ══════════════════════════════════════════════════════
          PORTADA
      ══════════════════════════════════════════════════════ */}
      <Page size="A4" style={S.page}>

        {/* Marca */}
        <Text style={S.coverBrand}>Rentabilismo · Consultoría Guiada</Text>

        {/* Título — dos <Text> separados para evitar \n erráticos en PDF viewers */}
        <View>
          <Text style={S.coverTitle}>Informe de</Text>
          <Text style={[S.coverTitle, { marginBottom: 10 }]}>Progreso</Text>
        </View>
        <Text style={S.coverSubtitle}>Trabajo realizado en el programa</Text>

        {/* Línea divisoria */}
        <View style={S.coverDivider} />

        {/* Datos del usuario */}
        {[
          { label: "Empresario",   value: user.name },
          user.sector  && { label: "Sector",     value: user.sector },
          user.country && { label: "País",        value: user.country },
          { label: "Generado",    value: formatDate(generatedAt) },
        ].filter(Boolean).map(item => {
          const { label, value } = item as { label: string; value: string };
          return (
            <View key={label} style={S.coverInfoRow}>
              <Text style={S.coverInfoLabel}>{label}</Text>
              <Text style={S.coverInfoValue}>{value}</Text>
            </View>
          );
        })}

        {/* Resumen estadístico */}
        <View style={[S.coverDivider, { marginTop: 24 }]} />
        <View style={{ flexDirection: "row", gap: 32 }}>
          {[
            { n: stats.modulesStarted,   label: "Módulos\ntrabajados" },
            { n: stats.lessonsCompleted, label: "Lecciones\ncompletadas" },
            { n: stats.totalResponses,   label: "Ejercicios\nrespondidos" },
          ].map(({ n, label }) => (
            <View key={label} style={{ alignItems: "flex-start" }}>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 24, color: C.black }}>{n}</Text>
              <Text style={{ fontSize: 8, color: C.light, lineHeight: 1.4, marginTop: 3 }}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Aviso de confidencialidad */}
        <View style={S.coverDisclaimer}>
          <Text>
            Este informe contiene el trabajo personal realizado dentro de la plataforma
            Rentabilismo. Los datos son privados y pertenecen exclusivamente al titular.
            No incluye información financiera sensible ni datos de terceros.
          </Text>
        </View>

        {/* Footer portada */}
        <Text style={S.coverFooter}>rentabilismo.com · Consultoría guiada para empresarios</Text>
      </Page>

      {/* ══════════════════════════════════════════════════════
          ÍNDICE
      ══════════════════════════════════════════════════════ */}
      <Page size="A4" style={S.page}>
        <Text style={S.indexTitle}>Índice de módulos</Text>

        {modules.map((mod, i) => (
          <View key={mod.moduleSlug} style={S.indexRow}>
            <Text style={S.indexModuleTitle}>
              {String(i + 1).padStart(2, "0")}  {mod.moduleTitle}
            </Text>
            <Text style={S.indexProgress}>
              {mod.progress
                ? `${mod.progress.completed}/${mod.progress.total} lecciones`
                : `${mod.lessons.length} lección${mod.lessons.length !== 1 ? "es" : ""}`}
            </Text>
          </View>
        ))}

        <View style={S.indexStats}>
          {[
            { n: stats.modulesStarted,   label: "Módulos\ntrabajados" },
            { n: stats.lessonsCompleted, label: "Lecciones\ncompletadas" },
            { n: stats.totalResponses,   label: "Ejercicios\nrespondidos" },
          ].map(({ n, label }) => (
            <View key={label} style={S.indexStatBlock}>
              <Text style={S.indexStatNumber}>{n}</Text>
              <Text style={S.indexStatLabel}>{label}</Text>
            </View>
          ))}
        </View>

        <PageFooter />
      </Page>

      {/* ══════════════════════════════════════════════════════
          MÓDULOS — uno por página (break al inicio de cada uno)
      ══════════════════════════════════════════════════════ */}
      {modules.map((mod, modIdx) => (
        <Page key={mod.moduleSlug} size="A4" style={S.page}>

          {/* Cabecera del módulo */}
          <View>
            <Text style={S.moduleEyebrow}>
              Módulo {String(modIdx + 1).padStart(2, "0")}
            </Text>
            <Text style={S.moduleTitle}>
              {mod.moduleTitle.replace(/^Módulo \d+ – /, "")}
            </Text>
            {mod.progress && (
              <Text style={S.moduleProgress}>
                {mod.progress.completed} de {mod.progress.total} lecciones completadas
              </Text>
            )}
          </View>

          <View style={S.moduleDivider} />

          {/* Lecciones del módulo */}
          {mod.lessons.map(lesson => (
            <View key={lesson.lessonSlug} style={S.lessonBlock}>
              <Text style={S.lessonTitle}>
                {lesson.orderIndex}. {lesson.lessonTitle}
              </Text>

              {/* Ejercicios de la lección */}
              {lesson.exercises.map(ex => (
                // wrap={false}: intenta mantener cada ejercicio en una sola página.
                // Si la respuesta es muy larga, @react-pdf ignora el wrap y fluye
                // al natural — es la mejor opción disponible.
                <View key={ex.exerciseKey} style={S.exerciseBlock} wrap={false}>
                  {/* Pregunta (prompt) */}
                  <Text style={S.exercisePrompt}>{ex.prompt}</Text>

                  {/* Respuesta: párrafos separados para \n correcto */}
                  <RespuestaParagraphs text={ex.response} />

                  {/* Fecha */}
                  <Text style={S.exerciseDate}>
                    Guardado: {formatDate(ex.updatedAt)}
                  </Text>
                </View>
              ))}
            </View>
          ))}

          <PageFooter />
        </Page>
      ))}

    </Document>
  );
}
