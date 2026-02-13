# PROJECT MEMORY - Comprendre pour Vendre

> Source de vérité du projet. Maintenu par Claude.

---

## 1. Positionnement stratégique

### Nom de la formation
**Comprendre pour Vendre**

### Thèse centrale
La vente est la compétence mère. Sans savoir vendre, aucun projet ne tient. On n'enseigne pas des scripts agressifs mais la compréhension du cerveau humain et des mécanismes réels de décision.

### Audience universelle
- Commercial (augmenter ses résultats)
- Étudiant (lancer son projet)
- Entrepreneur (structurer son discours)
- Freelance (présenter sa valeur)
- Indépendant (développer son activité)

### Ton éditorial
- Sobre, maîtrisé, structuré, intelligent
- Pas de marketing agressif
- Pas de promesses irréalistes
- Pas de clichés type "liberté financière rapide"

### Statut
✅ Homepage v1 structurée et déployée

---

## 2. Stack actuelle

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Framework | Next.js (App Router) | 14.1.0 |
| DB | PostgreSQL (Supabase) | - |
| ORM | Prisma | 5.9.1 |
| Auth | NextAuth.js | 4.24.13 |
| Paiement | Stripe Checkout | 14.25.0 |
| Hébergement | Vercel | - |
| Styling | Tailwind CSS | 3.4.1 |

---

## 3. Architecture globale

### Structure App Router
```
app/
├── page.tsx                    # Homepage "Comprendre pour Vendre" (8 sections)
├── layout.tsx                  # Root layout (Header + Footer + AuthStatus)
├── connexion/page.tsx          # Login page
├── programme/page.tsx          # Programme détaillé (public)
├── ethique/page.tsx            # Page éthique (public)
├── affiliation/page.tsx        # Page affiliation (public)
├── paiement/
│   ├── succes/                 # Page succès post-paiement (polling accès)
│   └── annule/                 # Page annulation paiement
├── membre/                     # Zone protégée (layout avec vérification)
│   ├── layout.tsx              # Guard: session + Enrollment requis
│   ├── page.tsx                # Dashboard membre
│   ├── compte/
│   ├── exercices/
│   ├── modeles/
│   ├── etudes-de-cas/
│   ├── bibliographie/
│   ├── module/[slug]/
│   └── lecon/[slug]/
└── api/
    ├── auth/[...nextauth]/     # NextAuth handler
    ├── stripe/
    │   ├── checkout/           # POST: crée Stripe Checkout Session
    │   └── webhook/            # POST: reçoit events Stripe
    └── access/                 # GET: vérifie accès utilisateur
```

### Middleware
- `middleware.ts` : NextAuth middleware sur `/membre/:path*`
- Pas d'import Prisma (edge compatible)

### Connexions externes
- Supabase PostgreSQL (via `DATABASE_URL` pooler + `DIRECT_URL` direct)
- Stripe API (checkout + webhooks)

---

## 4. Flows critiques

### Authentification
1. User → `/connexion` → form email/password
2. `signIn("credentials")` → NextAuth → Prisma lookup
3. Session JWT avec `user.id` propagé via callbacks
4. `AuthStatus` (Server Component) dans le Header affiche état connexion

### Paiement Stripe
1. User connecté clique "Commencer maintenant" (`CheckoutButton`)
2. POST `/api/stripe/checkout` → crée Stripe Checkout Session
3. Redirect vers Stripe Checkout
4. Succès → redirect `/paiement/succes`
5. Webhook `checkout.session.completed` → crée `Payment` + `Enrollment`
6. Page succès poll `/api/access` jusqu'à `access: true` → redirect `/membre`

### Accès membre
1. `app/membre/layout.tsx` vérifie:
   - Session NextAuth (sinon redirect `/?locked=1`)
   - `userHasAccess(userId)` via `lib/acces.ts`
2. `userHasAccess` cherche `Enrollment` avec `course.slug === "formation-vente"`

### Prisma / DB
- Client singleton dans `lib/prisma.ts` avec guard `DATABASE_URL`
- Models: User, Course, Module, Lesson, Enrollment, Payment, Progress, Note, etc.
- Seed script: `prisma/seed.ts` (crée le cours principal)

---

## 5. Variables d'environnement requises

| Variable | Obligatoire | Description |
|----------|-------------|-------------|
| `DATABASE_URL` | ✅ | URL PostgreSQL (Supabase pooler avec `?pgbouncer=true`) |
| `DIRECT_URL` | ✅ | URL PostgreSQL directe (pour migrations Prisma) |
| `NEXTAUTH_URL` | ✅ | URL de l'app (ex: `https://formation-vente.vercel.app`) |
| `NEXTAUTH_SECRET` | ✅ | Secret pour JWT (générer avec `openssl rand -base64 32`) |
| `STRIPE_SECRET_KEY` | ✅ | Clé secrète Stripe (`sk_live_...` ou `sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Secret webhook Stripe (`whsec_...`) |
| `STRIPE_PRICE_ID` | ✅ | ID du prix Stripe (`price_...`) |

---

## 6. Décisions techniques importantes

| Décision | Justification |
|----------|---------------|
| Session JWT (pas database sessions) | Credentials provider ne supporte pas les sessions DB avec NextAuth |
| `asChild` pattern avec `@radix-ui/react-slot` | Permet `<Button asChild><Link>` sans wrapper |
| Polling `/api/access` sur page succès | Le webhook Stripe peut arriver après le redirect |
| Guard env vars avec `throw` | Erreurs explicites au lieu de 500 opaques |
| `prisma generate` dans build + postinstall | Vercel cache les node_modules, Prisma Client doit être regénéré |
| Apostrophes échappées `&apos;` | ESLint `react/no-unescaped-entities` strict |
| `bcryptjs` au lieu de `bcrypt` | `bcrypt` natif casse sur Vercel (binaire Linux incompatible) |

---

## 7. Problèmes connus

| Problème | Statut | Notes |
|----------|--------|-------|
| `asChild` type errors | ✅ Résolu | Ajout prop + `Slot` dans `Button.tsx` |
| Vercel build ancien commit | ✅ Résolu | Webhook cache, résolu par redeploy |
| `PrismaClientInitializationError` Vercel | ✅ Résolu | `postinstall` + `prisma generate` dans build |
| 500 prod sans env vars | ✅ Résolu | Guards ajoutés dans `lib/prisma.ts` et `lib/auth.ts` |
| 500 prod Prisma/Vercel cache | ✅ Résolu | Ajout `directUrl` dans schema + `DIRECT_URL` sur Vercel |
| 500 prod bcrypt native build | ✅ Résolu | Remplacement `bcrypt` par `bcryptjs` (pure JS) |

---

## 8. Prochaine priorité

- ~~Vérifier que toutes les env vars sont configurées sur Vercel~~ ✅ Fait
- Tester le flow complet en production (inscription → paiement → accès membre)
- Configurer le webhook Stripe en production (`https://formation-vente.vercel.app/api/stripe/webhook`)

---

## 9. Historique des changements

| Date | Changement |
|------|------------|
| 2025-02-12 | Init projet Next.js 14 + Prisma + NextAuth + Stripe |
| 2025-02-12 | Ajout vérification accès `app/membre/layout.tsx` (session + Enrollment) |
| 2025-02-12 | Extraction `authOptions` dans `lib/auth.ts` avec callbacks JWT |
| 2025-02-12 | Création route `/api/stripe/checkout` + `/api/stripe/webhook` |
| 2025-02-12 | Ajout `MAIN_COURSE_SLUG` dans `lib/acces.ts` |
| 2025-02-12 | Création page `/paiement/succes` avec polling `/api/access` |
| 2025-02-12 | Création page `/paiement/annule` |
| 2025-02-12 | Robustification `CheckoutButton` (try/catch, messages erreur) |
| 2025-02-12 | Sécurisation routes API Stripe (try/catch, JSON garanti) |
| 2025-02-12 | Ajout `AuthStatus` Server Component dans Header |
| 2025-02-12 | Fix ESLint `react/no-unescaped-entities` (toutes les apostrophes) |
| 2025-02-12 | Fix `asChild` prop dans `Button.tsx` avec `@radix-ui/react-slot` |
| 2025-02-12 | Ajout `postinstall` + `prisma generate` dans build pour Vercel |
| 2025-02-12 | Guards env vars dans `lib/prisma.ts` et `lib/auth.ts` |
| 2025-02-12 | Création `/docs/PROJECT_MEMORY.md` |
| 2025-02-12 | Ajout `directUrl` dans `prisma/schema.prisma` + `DIRECT_URL` sur Vercel |
| 2025-02-12 | Fix bcrypt natif → `bcryptjs` pour compatibilité Vercel serverless |
| 2026-02-12 | **Résolution complète incident déploiement production Vercel** |
| 2026-02-13 | **Homepage v1 "Comprendre pour Vendre"** – Structure complète avec 8 sections |

---

## 10. 🔥 Incident Déploiement Production – Résolu (2026-02-12)

### Problèmes rencontrés

1. **Erreur 500 en production** (Server Components render)
2. **bcrypt natif incompatible** avec environnement serverless Vercel
3. **Erreur Prisma** : `DATABASE_URL is not defined`
4. **Mauvaise configuration des variables d'environnement** (ajoutées au mauvais niveau)
5. **Node version mismatch** (24.x → 20.x)

### Causes techniques

| Cause | Explication |
|-------|-------------|
| `bcrypt` binaire natif | Nécessite compilation Linux → incompatible avec runtime Vercel serverless |
| Variables d'environnement | Ajoutées dans **Team** au lieu du **Project** sur Vercel |
| Prisma build | `DATABASE_URL` doit être accessible au moment du build |
| Node 24.x | Incompatibilité avec certaines dépendances natives |

### Correctifs appliqués

| Correctif | Fichier(s) impacté(s) |
|-----------|----------------------|
| Remplacement `bcrypt` → `bcryptjs` (pure JS) | `lib/auth.ts`, `scripts/create-user.mjs` |
| Suppression `bcrypt` et `@types/bcrypt` | `package.json` |
| Ajout `DATABASE_URL` + `DIRECT_URL` | Vercel Project Settings |
| Ajout `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `STRIPE_*` | Vercel Project Settings |
| Node version fixée à 20.x | Vercel Project Settings |
| Ajout `directUrl` dans schema Prisma | `prisma/schema.prisma` |
| Ajout `prisma generate` dans build + postinstall | `package.json` |
| Guards env vars avec `throw` explicite | `lib/prisma.ts`, `lib/auth.ts` |
| Redéploiement complet | Vercel Dashboard |

### État actuel

| Composant | Statut |
|-----------|--------|
| Build | ✅ Success |
| Prisma | ✅ OK |
| Supabase | ✅ OK |
| Auth (NextAuth) | ✅ OK |
| Site accessible | ✅ OK |

**URL production active** : https://formation-vente.vercel.app
