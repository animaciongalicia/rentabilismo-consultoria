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

-- Política RLS: solo el service role puede actualizar has_paid y stripe_*
-- (el webhook usa la service role key, no la anon key)
-- La política profiles_update_own existente es suficiente para datos de perfil;
-- el webhook actualiza con service role que bypasea RLS automáticamente.
