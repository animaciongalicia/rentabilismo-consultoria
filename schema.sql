-- ============================================================
-- RENTABILISMO - Esquema Base de Datos Supabase
-- Ejecutar en el SQL Editor de tu proyecto Supabase
-- ============================================================

-- 1. Tabla profiles vinculada a auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  age         INTEGER CHECK (age >= 18 AND age <= 100),
  country     TEXT NOT NULL,
  pain_phrase TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Habilitar Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Políticas RLS
-- Lectura pública: cualquiera puede ver los perfiles (para El Muro)
CREATE POLICY "profiles_public_read"
  ON public.profiles
  FOR SELECT
  USING (true);

-- Escritura: solo el propio usuario puede insertar su perfil
CREATE POLICY "profiles_insert_own"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Actualización: solo el propio usuario puede editar su perfil
CREATE POLICY "profiles_update_own"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 4. Trigger: crea fila en profiles automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, age, country, pain_phrase)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Anónimo'),
    (NEW.raw_user_meta_data->>'age')::INTEGER,
    COALESCE(NEW.raw_user_meta_data->>'country', 'Desconocido'),
    COALESCE(NEW.raw_user_meta_data->>'pain_phrase', '')
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- FASE 2 — Campos de pago Stripe
-- Ejecutar este bloque en el SQL Editor de Supabase
-- ============================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS has_paid                  BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS stripe_customer_id        TEXT,
  ADD COLUMN IF NOT EXISTS stripe_checkout_session_id TEXT;

-- ============================================================
-- FASE 2b — Sistema de roles
-- Ejecutar este bloque en el SQL Editor de Supabase
-- ============================================================

-- Roles disponibles:
--   founder  → fundadores del proyecto (asignado manualmente)
--   admin    → administradores con acceso total
--   member   → usuarios que han pagado (se asigna por webhook)
--   free     → usuarios registrados sin pago (por defecto)

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'free'
    CHECK (role IN ('founder', 'admin', 'member', 'free'));

-- Para asignarte a ti como fundador, ejecuta:
-- UPDATE public.profiles SET role = 'founder' WHERE id = 'tu-user-id-aqui';

-- ============================================================
-- FASE 4 — Lecciones, Ejercicios y Progreso
-- ▶ Ejecutar ESTE BLOQUE en el SQL Editor de Supabase
-- ============================================================

-- 4a. Definición de lecciones por módulo (datos no sensibles)
CREATE TABLE IF NOT EXISTS public.lessons (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  module_slug  TEXT        NOT NULL,
  lesson_slug  TEXT        NOT NULL,
  order_index  INTEGER     NOT NULL,
  title        TEXT        NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (module_slug, lesson_slug)
);

CREATE INDEX IF NOT EXISTS idx_lessons_module_order
  ON public.lessons (module_slug, order_index);

-- 4b. Plantillas de ejercicios por lección (datos no sensibles)
CREATE TABLE IF NOT EXISTS public.lesson_exercises (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  module_slug   TEXT        NOT NULL,
  lesson_slug   TEXT        NOT NULL,
  exercise_key  TEXT        NOT NULL,
  prompt        TEXT        NOT NULL,
  order_index   INTEGER     NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (module_slug, lesson_slug, exercise_key)
);

-- 4c. Respuestas reales del usuario (datos privados)
CREATE TABLE IF NOT EXISTS public.exercise_responses (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_slug   TEXT        NOT NULL,
  lesson_slug   TEXT        NOT NULL,
  exercise_key  TEXT        NOT NULL,
  response      TEXT        NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, module_slug, lesson_slug, exercise_key)
);

CREATE INDEX IF NOT EXISTS idx_exercise_responses_user_module
  ON public.exercise_responses (user_id, module_slug, lesson_slug);

-- 4d. Progreso por módulo (calculado al guardar ejercicios, datos privados)
-- Decisión de diseño: se almacena para evitar N queries en el sidebar.
-- Se recalcula en cada POST a /api/exercise-responses.
CREATE TABLE IF NOT EXISTS public.module_progress (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_slug       TEXT        NOT NULL,
  completed_lessons INTEGER     NOT NULL DEFAULT 0,
  total_lessons     INTEGER     NOT NULL DEFAULT 4,
  last_update       TIMESTAMPTZ          DEFAULT NOW(),
  UNIQUE (user_id, module_slug)
);

-- ── RLS ────────────────────────────────────────────────────────

ALTER TABLE public.lessons          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_progress  ENABLE ROW LEVEL SECURITY;

-- lessons y lesson_exercises: lectura pública (sin datos sensibles)
CREATE POLICY "lessons_public_read"
  ON public.lessons FOR SELECT USING (true);

CREATE POLICY "lesson_exercises_public_read"
  ON public.lesson_exercises FOR SELECT USING (true);

-- exercise_responses: solo el propio usuario
CREATE POLICY "exercise_responses_select_own"
  ON public.exercise_responses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "exercise_responses_insert_own"
  ON public.exercise_responses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "exercise_responses_update_own"
  ON public.exercise_responses FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- module_progress: solo el propio usuario
CREATE POLICY "module_progress_select_own"
  ON public.module_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "module_progress_insert_own"
  ON public.module_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "module_progress_update_own"
  ON public.module_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- FASE 5 — El Muro: sector, tamaño, objetivo y progreso global
-- ▶ Ejecutar ESTE BLOQUE en el SQL Editor de Supabase
-- ============================================================

-- ============================================================
-- FASE 6 — Planes de acceso (fundador, futuras suscripciones)
-- ▶ Ejecutar ESTE BLOQUE en el SQL Editor de Supabase
-- ============================================================

-- plan: tipo de acceso comercial (distinto de role, que es permiso de plataforma)
--   free             → sin pago (por defecto)
--   founder          → precio lanzamiento 2026, acceso vitalicio
--   member           → precio normal futuro (pago único)
--   annual           → preparado para suscripción anual futura
--   premium          → preparado para extras premium futuros
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS plan    TEXT NOT NULL DEFAULT 'free'
    CHECK (plan IN ('free', 'founder', 'member', 'annual', 'premium')),
  ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;

-- ============================================================
-- FASE 5 — El Muro: sector, tamaño, objetivo y progreso global
-- ▶ Ejecutar ESTE BLOQUE en el SQL Editor de Supabase
-- ============================================================

-- Nuevos campos en profiles para El Muro
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS sector             TEXT,
  ADD COLUMN IF NOT EXISTS business_size      TEXT
    CHECK (business_size IN ('autonomo', '2-5', '6-20', '+20')),
  ADD COLUMN IF NOT EXISTS objetivo_60_dias   TEXT,
  -- Progreso global simplificado (0-100), actualizado por /api/exercise-responses
  -- Se almacena aquí para que El Muro (página pública) pueda leerlo sin violar RLS
  ADD COLUMN IF NOT EXISTS global_progress_pct INTEGER NOT NULL DEFAULT 0
    CHECK (global_progress_pct >= 0 AND global_progress_pct <= 100);

-- Actualizar el trigger para incluir los nuevos campos del signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, full_name, age, country, pain_phrase,
    sector, business_size, objetivo_60_dias
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Anónimo'),
    (NEW.raw_user_meta_data->>'age')::INTEGER,
    COALESCE(NEW.raw_user_meta_data->>'country', 'Desconocido'),
    COALESCE(NEW.raw_user_meta_data->>'pain_phrase', ''),
    NEW.raw_user_meta_data->>'sector',
    NEW.raw_user_meta_data->>'business_size',
    NEW.raw_user_meta_data->>'objetivo_60_dias'
  );
  RETURN NEW;
END;
$$;
