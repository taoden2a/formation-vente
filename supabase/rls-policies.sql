-- ============================================================
-- RLS (Row Level Security) — Bloquer tout accès public
-- ============================================================
-- Notre app utilise Prisma avec la connection string postgres
-- (rôle "postgres" ou service_role) qui bypass RLS par défaut.
-- => Activer RLS ne casse PAS notre application.
-- => Les rôles anon et authenticated (API REST Supabase publique)
--    n'auront plus aucun accès à aucune table.
-- ============================================================

-- Activer RLS sur toutes les tables
ALTER TABLE public.users               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bibliography        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliates          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_clicks    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_sales     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Bloquer TOUT accès public (anon + authenticated) sur chaque table
-- USING (false)      → bloque SELECT, UPDATE, DELETE
-- WITH CHECK (false) → bloque INSERT, UPDATE
-- ============================================================

CREATE POLICY "deny_all_public" ON public.users
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_public" ON public.courses
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_public" ON public.modules
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_public" ON public.lessons
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_public" ON public.exercises
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_public" ON public.templates
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_public" ON public.case_studies
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_public" ON public.bibliography
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_public" ON public.enrollments
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_public" ON public.progress
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_public" ON public.notes
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_public" ON public.payments
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_public" ON public.affiliates
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_public" ON public.affiliate_clicks
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_public" ON public.affiliate_sales
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_public" ON public.password_reset_tokens
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
