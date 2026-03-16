"use client";

// LessonExercises wraps multiple ExerciseBox components for a single lesson.
// It tracks which exercises have been saved to show a "Lección completada" badge
// without requiring a page reload.

import { useState } from "react";
import ExerciseBox from "./ExerciseBox";

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

  function handleSaved(exerciseKey: string) {
    setSavedKeys(prev => new Set([...prev, exerciseKey]));
  }

  const allSaved = exercises.length > 0 && exercises.every(e => savedKeys.has(e.exerciseKey));

  return (
    <div>
      {/* Completion banner */}
      {allSaved && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          padding: "0.75rem 1rem",
          backgroundColor: "#f0fdf4",
          border: "1px solid #86efac",
          marginBottom: "1.5rem",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "#15803d",
        }}>
          <span style={{ fontSize: "1rem" }}>✓</span>
          Lección completada — todos los ejercicios guardados.
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
                  <span style={{ color: "#16a34a" }}>✓</span>
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
