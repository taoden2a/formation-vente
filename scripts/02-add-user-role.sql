-- ============================================================================
-- 02-ADD-USER-ROLE.SQL - Comprendre pour Vendre
-- ============================================================================
--
-- Date: 2026-02-20
-- Objectif: Ajouter le champ role a la table users
--
-- Valeurs possibles:
-- - 'user'  : Utilisateur standard (defaut)
-- - 'admin' : Administrateur avec acces complet sans enrollment
--
-- SECURITE:
-- - Le role ne peut etre modifie que directement en base
-- - Aucune API publique ne permet de changer le role
-- - La verification se fait cote serveur uniquement
--
-- ============================================================================


-- ============================================================================
-- SECTION 1: AJOUT DE LA COLONNE ROLE
-- ============================================================================

-- Ajouter la colonne role avec valeur par defaut 'user'
-- La clause IF NOT EXISTS evite une erreur si la colonne existe deja
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'role'
    ) THEN
        ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'user';
    END IF;
END $$;


-- ============================================================================
-- SECTION 2: CONTRAINTE DE VALIDATION
-- ============================================================================

-- Ajouter une contrainte CHECK pour limiter les valeurs possibles
-- Supprime d'abord si elle existe pour permettre la re-execution
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('user', 'admin'));


-- ============================================================================
-- SECTION 3: INDEX (OPTIONNEL)
-- ============================================================================

-- Index sur role pour optimiser les requetes filtrant par role
-- Utile si on veut lister tous les admins par exemple
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);


-- ============================================================================
-- SECTION 4: VERIFICATION
-- ============================================================================

-- Verifier que la colonne a ete ajoutee
SELECT
    column_name,
    data_type,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'users' AND column_name = 'role';

-- Compter les utilisateurs par role
SELECT role, COUNT(*) as count FROM users GROUP BY role;


-- ============================================================================
-- SECTION 5: PROMOUVOIR UN UTILISATEUR ADMIN (EXEMPLE)
-- ============================================================================

-- Pour promouvoir un utilisateur en admin, executer:
-- UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';

-- Pour retirer le role admin:
-- UPDATE users SET role = 'user' WHERE email = 'admin@example.com';


-- ============================================================================
-- FIN DE LA MIGRATION
-- ============================================================================
