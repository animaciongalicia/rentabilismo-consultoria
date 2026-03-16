"use client";

// LessonExercises wraps multiple ExerciseBox components for a single lesson.
// It tracks which exercises have been saved and shows completion messages
// with Rentabilismo tone when a lesson or module is finished.

import { useState } from "react";
import ExerciseBox from "./ExerciseBox";
import { getMensajeLeccion, getMensajeModulo } from "@/config/mensajes-avance";

interface Exercise {
  exerciseKey: string;
  prompt: string;
  orderIndex: number;
  initialValue: string;
}

interface Props {
  moduleSlug: string;
  lessonSlug: string;
  exercises: Exercise[];
}

export default function LessonExercises({ moduleSlug, lessonSlug, exercises }: Props) {
  // Track which exercise keys have at least one saved (non-empty) response
  const [savedKeys, setSavedKeys] = useState<Set<string>>(
    new Set(exercises.filter(e => e.initialValue.trim()).map(e => e.exerciseKey))
  );

  // Set to "module" when module just completed, "lesson" when lesson just completed
  // Only fires on real transitions — not on page load
  const [completionEvent, setCompletionEvent] = useState<"lesson" | "module" | null>(null);

  function handleSaved(
    exerciseKey: string,
    meta: { lessonJustCompleted: boolean; moduleJustCompleted: boolean }
  ) {
    setSavedKeys(prev => new Set([...prev, exerciseKey]));
    if (meta.moduleJustCompleted) {
      setCompletionEvent("module");
    } else if (meta.lessonJustCompleted) {
      setCompletionEvent("lesson");
    }
  }

  const allSaved = exercises.length > 0 && exercises.every(e => savedKeys.has(e.exerciseKey));

  return (
    <div>
      {/* Module completion — shown only on real transition, higher priority */}
      {completionEvent === "module" && (
        <div style={{
          padding: "1.25rem 1.5rem",
          border: "2px solid var(--foreground)",
          backgroundColor: "var(--card)",
          marginBottom: "1.5rem",
        }}>
          <div style={{
            fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem",
          }}>
            Módulo completado
          </div>
          <p style={{ fontSize: "0.925rem", fontWeight: 700, margin: 0, lineHeight: 1.5 }}>
            {getMensajeModulo(moduleSlug)}
          </p>
        </div>
      )}

      {/* Lesson completion — shown persistently when allSaved */}
      {allSaved && completionEvent !== "module" && (
        <div style={{
          padding: "1rem 1.25rem",
          borderLeft: "3px solid var(--foreground)",
          border: "1px solid var(--border)",
          borderLeftWidth: "3px",
          backgroundColor: "var(--card)",
          marginBottom: "1.5rem",
        }}>
          <div style={{
            fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.375rem",
          }}>
            Lección completada
          </div>
          <p style={{ fontSize: "0.875rem", fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
            {getMensajeLeccion(lessonSlug)}
          </p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {exercises
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((exercise, i) => (
            <div key={exercise.exerciseKey}>
              <div style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "0.625rem",
              }}>
                Ejercicio {i + 1} {savedKeys.has(exercise.exerciseKey) && (
                  <span style={{ color: "var(--foreground)" }}>✓</span>
                )}
              </div>
              <ExerciseBox
                moduleSlug={moduleSlug}
                lessonSlug={lessonSlug}
                exerciseKey={exercise.exerciseKey}
                prompt={exercise.prompt}
                initialValue={exercise.initialValue}
                onSaved={handleSaved}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
