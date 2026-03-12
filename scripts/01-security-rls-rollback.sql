-- ═══════════════════════════════════════════════════════════════════════════════
-- 01-SECURITY-RLS-ROLLBACK.SQL - Comprendre pour Vendre
-- ═══════════════════════════════════════════════════════════════════════════════
--
-- Date: 2026-02-20
-- Objectif: Annuler toutes les modifications de 01-security-rls.sql
--
-- ATTENTION: Ce script désactive RLS et supprime toutes les policies.
--            À utiliser uniquement en cas de problème après application du script.
--
-- ═══════════════════════════════════════════════════════════════════════════════


-- ┌─────────────────────────────────────────────────────────────────────────────┐
-- │ SECTION 1: SUPPRESSION DES POLICIES                                        │
-- └─────────────────────────────────────────────────────────────────────────────┘

-- USERS
DROP POLICY IF EXISTS "users_deny_select" ON users;
DROP POLICY IF EXISTS "users_deny_insert" ON users;
DROP POLICY IF EXISTS "users_deny_update" ON users;
DROP POLICY IF EXISTS "users_deny_delete" ON users;

-- ENROLLMENTS
DROP POLICY IF EXISTS "enrollments_deny_select" ON enrollments;
DROP POLICY IF EXISTS "enrollments_deny_insert" ON enrollments;
DROP POLICY IF EXISTS "enrollments_deny_update" ON enrollments;
DROP POLICY IF EXISTS "enrollments_deny_delete" ON enrollments;

-- PROGRESS
DROP POLICY IF EXISTS "progress_deny_select" ON progress;
DROP POLICY IF EXISTS "progress_deny_insert" ON progress;
DROP POLICY IF EXISTS "progress_deny_update" ON progress;
DROP POLICY IF EXISTS "progress_deny_delete" ON progress;

-- NOTES
DROP POLICY IF EXISTS "notes_deny_select" ON notes;
DROP POLICY IF EXISTS "notes_deny_insert" ON notes;
DROP POLICY IF EXISTS "notes_deny_update" ON notes;
DROP POLICY IF EXISTS "notes_deny_delete" ON notes;

-- PAYMENTS
DROP POLICY IF EXISTS "payments_deny_select" ON payments;
DROP POLICY IF EXISTS "payments_deny_insert" ON payments;
DROP POLICY IF EXISTS "payments_deny_update" ON payments;
DROP POLICY IF EXISTS "payments_deny_delete" ON payments;

-- AFFILIATES
DROP POLICY IF EXISTS "affiliates_deny_select" ON affiliates;
DROP POLICY IF EXISTS "affiliates_deny_insert" ON affiliates;
DROP POLICY IF EXISTS "affiliates_deny_update" ON affiliates;
DROP POLICY IF EXISTS "affiliates_deny_delete" ON affiliates;

-- AFFILIATE_SALES
DROP POLICY IF EXISTS "affiliate_sales_deny_select" ON affiliate_sales;
DROP POLICY IF EXISTS "affiliate_sales_deny_insert" ON affiliate_sales;
DROP POLICY IF EXISTS "affiliate_sales_deny_update" ON affiliate_sales;
DROP POLICY IF EXISTS "affiliate_sales_deny_delete" ON affiliate_sales;

-- AFFILIATE_CLICKS
DROP POLICY IF EXISTS "affiliate_clicks_deny_select" ON affiliate_clicks;
DROP POLICY IF EXISTS "affiliate_clicks_allow_insert" ON affiliate_clicks;
DROP POLICY IF EXISTS "affiliate_clicks_deny_update" ON affiliate_clicks;
DROP POLICY IF EXISTS "affiliate_clicks_deny_delete" ON affiliate_clicks;

-- COURSES
DROP POLICY IF EXISTS "courses_allow_select" ON courses;
DROP POLICY IF EXISTS "courses_deny_insert" ON courses;
DROP POLICY IF EXISTS "courses_deny_update" ON courses;
DROP POLICY IF EXISTS "courses_deny_delete" ON courses;

-- MODULES
DROP POLICY IF EXISTS "modules_allow_select" ON modules;
DROP POLICY IF EXISTS "modules_deny_insert" ON modules;
DROP POLICY IF EXISTS "modules_deny_update" ON modules;
DROP POLICY IF EXISTS "modules_deny_delete" ON modules;

-- LESSONS
DROP POLICY IF EXISTS "lessons_allow_select" ON lessons;
DROP POLICY IF EXISTS "lessons_deny_insert" ON lessons;
DROP POLICY IF EXISTS "lessons_deny_update" ON lessons;
DROP POLICY IF EXISTS "lessons_deny_delete" ON lessons;

-- EXERCISES
DROP POLICY IF EXISTS "exercises_allow_select" ON exercises;
DROP POLICY IF EXISTS "exercises_deny_insert" ON exercises;
DROP POLICY IF EXISTS "exercises_deny_update" ON exercises;
DROP POLICY IF EXISTS "exercises_deny_delete" ON exercises;

-- TEMPLATES
DROP POLICY IF EXISTS "templates_allow_select" ON templates;
DROP POLICY IF EXISTS "templates_deny_insert" ON templates;
DROP POLICY IF EXISTS "templates_deny_update" ON templates;
DROP POLICY IF EXISTS "templates_deny_delete" ON templates;

-- CASE_STUDIES
DROP POLICY IF EXISTS "case_studies_allow_select" ON case_studies;
DROP POLICY IF EXISTS "case_studies_deny_insert" ON case_studies;
DROP POLICY IF EXISTS "case_studies_deny_update" ON case_studies;
DROP POLICY IF EXISTS "case_studies_deny_delete" ON case_studies;

-- BIBLIOGRAPHY
DROP POLICY IF EXISTS "bibliography_allow_select" ON bibliography;
DROP POLICY IF EXISTS "bibliography_deny_insert" ON bibliography;
DROP POLICY IF EXISTS "bibliography_deny_update" ON bibliography;
DROP POLICY IF EXISTS "bibliography_deny_delete" ON bibliography;


-- ┌─────────────────────────────────────────────────────────────────────────────┐
-- │ SECTION 2: DÉSACTIVATION RLS                                               │
-- └─────────────────────────────────────────────────────────────────────────────┘

ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments DISABLE ROW LEVEL SECURITY;
ALTER TABLE progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE notes DISABLE ROW LEVEL SECURITY;
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates DISABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_sales DISABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks DISABLE ROW LEVEL SECURITY;
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE modules DISABLE ROW LEVEL SECURITY;
ALTER TABLE lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE exercises DISABLE ROW LEVEL SECURITY;
ALTER TABLE templates DISABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies DISABLE ROW LEVEL SECURITY;
ALTER TABLE bibliography DISABLE ROW LEVEL SECURITY;


-- ┌─────────────────────────────────────────────────────────────────────────────┐
-- │ SECTION 3: SUPPRESSION RÔLE APP_USER (OPTIONNEL)                           │
-- │                                                                             │
-- │ Décommenter si vous voulez supprimer le rôle app_user créé                 │
-- └─────────────────────────────────────────────────────────────────────────────┘

-- REVOKE ALL ON ALL TABLES IN SCHEMA public FROM app_user;
-- REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM app_user;
-- REVOKE USAGE ON SCHEMA public FROM app_user;
-- DROP ROLE IF EXISTS app_user;


-- ┌─────────────────────────────────────────────────────────────────────────────┐
-- │ SECTION 4: VÉRIFICATION                                                    │
-- └─────────────────────────────────────────────────────────────────────────────┘

-- Vérifier que RLS est désactivé partout
SELECT
  schemaname,
  tablename,
  CASE WHEN rowsecurity THEN 'ENABLED (PROBLEM!)' ELSE 'DISABLED (OK)' END AS rls_status
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Vérifier qu'il n'y a plus de policies
SELECT
  COUNT(*) AS remaining_policies
FROM pg_policies
WHERE schemaname = 'public';


-- ┌─────────────────────────────────────────────────────────────────────────────┐
-- │ FIN DU ROLLBACK                                                            │
-- │                                                                             │
-- │ Si tout est OK:                                                            │
-- │ - Toutes les tables ont rls_status = "DISABLED (OK)"                       │
-- │ - remaining_policies = 0                                                   │
-- └─────────────────────────────────────────────────────────────────────────────┘
