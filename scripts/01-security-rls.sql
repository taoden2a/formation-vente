-- ═══════════════════════════════════════════════════════════════════════════════
-- 01-SECURITY-RLS.SQL - Comprendre pour Vendre
-- ═══════════════════════════════════════════════════════════════════════════════
--
-- Date: 2026-02-20
-- Contexte: NextAuth + Prisma (pas de Supabase Auth, pas de supabase-js)
-- Objectif: Bloquer l'accès REST Supabase (anon/authenticated) tout en gardant
--           Prisma fonctionnel (rôle postgres = superuser, bypass RLS)
--
-- Tables sensibles (données utilisateur):
--   users, enrollments, progress, notes, payments, affiliates, affiliate_sales
--
-- Table tracking (INSERT public autorisé):
--   affiliate_clicks
--
-- Tables contenu (SELECT public autorisé):
--   courses, modules, lessons, exercises, templates, case_studies, bibliography
--
-- Colonnes camelCase confirmées depuis prisma/schema.prisma:
--   userId, courseId, moduleId, lessonId, exerciseId, affiliateId, etc.
--
-- ═══════════════════════════════════════════════════════════════════════════════


-- ┌─────────────────────────────────────────────────────────────────────────────┐
-- │ SECTION 1: CRÉATION RÔLE APP_USER (PRÉPARATION FUTURE)                     │
-- │                                                                             │
-- │ Ce rôle n'est PAS utilisé immédiatement. Il est créé pour une migration    │
-- │ future si on veut que Prisma soit soumis à RLS.                           │
-- └─────────────────────────────────────────────────────────────────────────────┘

-- Créer le rôle app_user s'il n'existe pas
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'app_user') THEN
    CREATE ROLE app_user WITH LOGIN PASSWORD 'CHANGE_ME_BEFORE_USE';
    RAISE NOTICE 'Role app_user created. CHANGE THE PASSWORD before using!';
  ELSE
    RAISE NOTICE 'Role app_user already exists.';
  END IF;
END
$$;

-- Accorder les permissions de base sur le schema public
GRANT USAGE ON SCHEMA public TO app_user;

-- Accorder SELECT, INSERT, UPDATE, DELETE sur toutes les tables existantes
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;

-- Accorder les mêmes permissions sur les futures tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_user;

-- Accorder USAGE sur les séquences (pour les auto-increment si utilisés)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO app_user;


-- ┌─────────────────────────────────────────────────────────────────────────────┐
-- │ SECTION 2: ACTIVATION RLS SUR TABLES SENSIBLES                             │
-- └─────────────────────────────────────────────────────────────────────────────┘

-- Users (identités, mots de passe hashés)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Enrollments (inscriptions aux formations)
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Progress (progression utilisateur)
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- Notes (notes personnelles)
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Payments (historique paiements)
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Affiliates (comptes affiliés)
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;

-- Affiliate Sales (ventes affiliées)
ALTER TABLE affiliate_sales ENABLE ROW LEVEL SECURITY;

-- Affiliate Clicks (tracking clics - policies spéciales ci-dessous)
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;


-- ┌─────────────────────────────────────────────────────────────────────────────┐
-- │ SECTION 3: POLICIES - TABLES PRIVÉES (DENY ALL pour anon/authenticated)    │
-- │                                                                             │
-- │ Note: Le rôle "postgres" (superuser) bypass automatiquement toutes les     │
-- │ policies RLS. Prisma continuera de fonctionner normalement.                │
-- └─────────────────────────────────────────────────────────────────────────────┘

-- ─────────────────────────────────────────────────────────────────────────────
-- USERS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE POLICY "users_deny_select" ON users
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "users_deny_insert" ON users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "users_deny_update" ON users
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "users_deny_delete" ON users
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ─────────────────────────────────────────────────────────────────────────────
-- ENROLLMENTS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE POLICY "enrollments_deny_select" ON enrollments
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "enrollments_deny_insert" ON enrollments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "enrollments_deny_update" ON enrollments
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "enrollments_deny_delete" ON enrollments
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ─────────────────────────────────────────────────────────────────────────────
-- PROGRESS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE POLICY "progress_deny_select" ON progress
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "progress_deny_insert" ON progress
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "progress_deny_update" ON progress
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "progress_deny_delete" ON progress
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ─────────────────────────────────────────────────────────────────────────────
-- NOTES
-- ─────────────────────────────────────────────────────────────────────────────

CREATE POLICY "notes_deny_select" ON notes
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "notes_deny_insert" ON notes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "notes_deny_update" ON notes
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "notes_deny_delete" ON notes
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ─────────────────────────────────────────────────────────────────────────────
-- PAYMENTS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE POLICY "payments_deny_select" ON payments
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "payments_deny_insert" ON payments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "payments_deny_update" ON payments
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "payments_deny_delete" ON payments
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ─────────────────────────────────────────────────────────────────────────────
-- AFFILIATES
-- ─────────────────────────────────────────────────────────────────────────────

CREATE POLICY "affiliates_deny_select" ON affiliates
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "affiliates_deny_insert" ON affiliates
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "affiliates_deny_update" ON affiliates
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "affiliates_deny_delete" ON affiliates
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ─────────────────────────────────────────────────────────────────────────────
-- AFFILIATE_SALES
-- ─────────────────────────────────────────────────────────────────────────────

CREATE POLICY "affiliate_sales_deny_select" ON affiliate_sales
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "affiliate_sales_deny_insert" ON affiliate_sales
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "affiliate_sales_deny_update" ON affiliate_sales
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "affiliate_sales_deny_delete" ON affiliate_sales
  FOR DELETE
  TO anon, authenticated
  USING (false);


-- ┌─────────────────────────────────────────────────────────────────────────────┐
-- │ SECTION 4: POLICIES - AFFILIATE_CLICKS (INSERT PUBLIC AUTORISÉ)            │
-- │                                                                             │
-- │ Cette table sert au tracking des clics affiliés. On autorise INSERT        │
-- │ public pour permettre le tracking, mais on bloque SELECT/UPDATE/DELETE.    │
-- └─────────────────────────────────────────────────────────────────────────────┘

-- Bloquer SELECT (les clics sont privés)
CREATE POLICY "affiliate_clicks_deny_select" ON affiliate_clicks
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- AUTORISER INSERT (tracking public)
-- Note: On vérifie que affiliateId est fourni et non vide
CREATE POLICY "affiliate_clicks_allow_insert" ON affiliate_clicks
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    "affiliateId" IS NOT NULL
    AND "affiliateId" != ''
  );

-- Bloquer UPDATE
CREATE POLICY "affiliate_clicks_deny_update" ON affiliate_clicks
  FOR UPDATE
  TO anon, authenticated
  USING (false);

-- Bloquer DELETE
CREATE POLICY "affiliate_clicks_deny_delete" ON affiliate_clicks
  FOR DELETE
  TO anon, authenticated
  USING (false);


-- ┌─────────────────────────────────────────────────────────────────────────────┐
-- │ SECTION 5: TABLES CONTENU (SELECT PUBLIC AUTORISÉ)                         │
-- │                                                                             │
-- │ Ces tables contiennent du contenu pédagogique public. On active RLS        │
-- │ mais on autorise SELECT pour tous (catalogue visible).                     │
-- │ INSERT/UPDATE/DELETE restent bloqués (admin only via postgres).            │
-- └─────────────────────────────────────────────────────────────────────────────┘

-- ─────────────────────────────────────────────────────────────────────────────
-- COURSES
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "courses_allow_select" ON courses
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "courses_deny_insert" ON courses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "courses_deny_update" ON courses
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "courses_deny_delete" ON courses
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ─────────────────────────────────────────────────────────────────────────────
-- MODULES
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "modules_allow_select" ON modules
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "modules_deny_insert" ON modules
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "modules_deny_update" ON modules
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "modules_deny_delete" ON modules
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ─────────────────────────────────────────────────────────────────────────────
-- LESSONS
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lessons_allow_select" ON lessons
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "lessons_deny_insert" ON lessons
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "lessons_deny_update" ON lessons
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "lessons_deny_delete" ON lessons
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ─────────────────────────────────────────────────────────────────────────────
-- EXERCISES
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "exercises_allow_select" ON exercises
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "exercises_deny_insert" ON exercises
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "exercises_deny_update" ON exercises
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "exercises_deny_delete" ON exercises
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ─────────────────────────────────────────────────────────────────────────────
-- TEMPLATES
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "templates_allow_select" ON templates
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "templates_deny_insert" ON templates
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "templates_deny_update" ON templates
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "templates_deny_delete" ON templates
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ─────────────────────────────────────────────────────────────────────────────
-- CASE_STUDIES
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "case_studies_allow_select" ON case_studies
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "case_studies_deny_insert" ON case_studies
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "case_studies_deny_update" ON case_studies
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "case_studies_deny_delete" ON case_studies
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ─────────────────────────────────────────────────────────────────────────────
-- BIBLIOGRAPHY
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE bibliography ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bibliography_allow_select" ON bibliography
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "bibliography_deny_insert" ON bibliography
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "bibliography_deny_update" ON bibliography
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "bibliography_deny_delete" ON bibliography
  FOR DELETE
  TO anon, authenticated
  USING (false);


-- ┌─────────────────────────────────────────────────────────────────────────────┐
-- │ SECTION 6: VÉRIFICATION                                                    │
-- └─────────────────────────────────────────────────────────────────────────────┘

-- Lister toutes les tables avec leur statut RLS
SELECT
  schemaname,
  tablename,
  CASE WHEN rowsecurity THEN 'ENABLED' ELSE 'DISABLED' END AS rls_status
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Lister toutes les policies créées
SELECT
  schemaname,
  tablename,
  policyname,
  CASE WHEN permissive = 'PERMISSIVE' THEN 'ALLOW' ELSE 'DENY' END AS type,
  roles::text,
  cmd AS operation
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Compter les policies par table
SELECT
  tablename,
  COUNT(*) AS policy_count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;


-- ┌─────────────────────────────────────────────────────────────────────────────┐
-- │ FIN DU SCRIPT                                                              │
-- │                                                                             │
-- │ Résumé:                                                                    │
-- │ - 15 tables avec RLS activé                                                │
-- │ - Tables privées: DENY ALL pour anon/authenticated                         │
-- │ - affiliate_clicks: INSERT autorisé, SELECT/UPDATE/DELETE bloqués          │
-- │ - Tables contenu: SELECT autorisé, INSERT/UPDATE/DELETE bloqués            │
-- │ - Rôle postgres (Prisma): bypass RLS automatique                           │
-- │ - Rôle app_user créé: pour migration future                                │
-- └─────────────────────────────────────────────────────────────────────────────┘
