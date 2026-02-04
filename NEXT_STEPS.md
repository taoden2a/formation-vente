# 🚀 Prochaines étapes - Guide d'implémentation

Ce document détaille les étapes prioritaires pour finaliser le site de formation.

## ✅ Ce qui est fait

### Structure et Design
- ✅ Architecture Next.js 14 complète
- ✅ Système de design avec couleurs pédagogiques
- ✅ Composants UI réutilisables
- ✅ Layout responsive

### Pages publiques
- ✅ Page d'accueil / vente complète
- ✅ Page programme détaillé
- ✅ Page éthique
- ✅ Page affiliation (informations)
- ✅ Page de connexion (UI uniquement)

### Espace membre
- ✅ Accueil formation avec progression
- ✅ Pages module et leçon
- ✅ Système de notes UI
- ✅ Bibliothèques (exercices, modèles, études de cas, bibliographie)
- ✅ Page compte utilisateur

### Base de données
- ✅ Schéma Prisma complet
- ✅ Modèles pour toutes les entités

## 🔧 Ce qui reste à faire

### 1. Authentification (PRIORITÉ 1)

**Objectif** : Permettre aux utilisateurs de se connecter et protéger l'espace membre

**Actions** :
```bash
# Installer NextAuth
npm install next-auth @next-auth/prisma-adapter

# Créer le fichier de configuration
# app/api/auth/[...nextauth]/route.ts
```

**Fichiers à créer** :
- `app/api/auth/[...nextauth]/route.ts` - Configuration NextAuth
- `lib/auth.ts` - Options NextAuth et session
- `middleware.ts` - Protéger les routes /membre/*

**Ressources** :
- https://next-auth.js.org/getting-started/example
- https://authjs.dev/reference/adapter/prisma

### 2. Intégration Stripe (PRIORITÉ 1)

**Objectif** : Permettre l'achat de la formation et créer automatiquement le compte

**Actions** :

1. **Créer le produit et le prix dans Stripe**
   - Se connecter au dashboard Stripe
   - Créer un produit "L'Art de Convaincre"
   - Créer un prix unique (75-95€)
   - Noter le `price_id`

2. **Créer l'API de checkout**
```typescript
// app/api/stripe/checkout/route.ts
import Stripe from 'stripe'

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const session = await stripe.checkout.sessions.create({
    // Configuration...
  })

  return Response.json({ url: session.url })
}
```

3. **Créer le webhook**
```typescript
// app/api/stripe/webhook/route.ts
// Écouter l'événement checkout.session.completed
// Créer le compte utilisateur
// Créer l'enrollment
// Envoyer l'email
```

**Fichiers à créer** :
- `app/api/stripe/checkout/route.ts`
- `app/api/stripe/webhook/route.ts`
- `lib/stripe.ts`
- `lib/email.ts` (pour envoyer les emails)

**Ressources** :
- https://stripe.com/docs/checkout/quickstart
- https://stripe.com/docs/webhooks

### 3. Connexion des données réelles (PRIORITÉ 2)

**Objectif** : Remplacer les données mockées par de vraies requêtes Prisma

**Actions pour chaque page** :

**Page membre (app/membre/page.tsx)** :
```typescript
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export default async function MembreHomePage() {
  const session = await getServerSession()
  const userId = session?.user?.id

  // Récupérer les modules avec progression
  const modules = await prisma.module.findMany({
    where: { courseId: 'votre-course-id' },
    include: {
      lessons: true,
      progress: {
        where: { userId }
      }
    }
  })

  // Calculer la progression globale
  // ...
}
```

**Pages à mettre à jour** :
- `/membre/page.tsx` - Progression et modules
- `/membre/module/[slug]/page.tsx` - Module avec leçons
- `/membre/lecon/[slug]/page.tsx` - Leçon avec notes
- `/membre/exercices/page.tsx` - Liste exercices
- `/membre/modeles/page.tsx` - Liste modèles
- `/membre/etudes-de-cas/page.tsx` - Liste études de cas
- `/membre/bibliographie/page.tsx` - Bibliographie

### 4. Système de sauvegarde (PRIORITÉ 2)

**Objectif** : Sauvegarder les notes et la progression

**Actions** :

**API Notes** :
```typescript
// app/api/notes/route.ts
export async function POST(req: Request) {
  const session = await getServerSession()
  const { lessonId, content } = await req.json()

  await prisma.note.upsert({
    where: {
      userId_lessonId: {
        userId: session.user.id,
        lessonId
      }
    },
    create: {
      userId: session.user.id,
      lessonId,
      content
    },
    update: {
      content
    }
  })

  return Response.json({ success: true })
}
```

**API Progression** :
```typescript
// app/api/progress/route.ts
export async function POST(req: Request) {
  const { lessonId, status } = await req.json()

  await prisma.progress.upsert({
    // Sauvegarder la progression
  })
}
```

### 5. Système d'affiliation (PRIORITÉ 3)

**Objectif** : Tableau de bord pour les affiliés

**Fichiers à créer** :
- `app/membre/affiliation/page.tsx` - Dashboard affilié
- `app/api/affiliation/generate-link/route.ts` - Générer lien
- `app/api/affiliation/track-click/route.ts` - Tracker clics
- Middleware pour tracker les paramètres d'affiliation

**Fonctionnalités** :
- Générer un code affilié unique
- Créer le lien d'affiliation
- Tracker les clics (via cookies)
- Enregistrer les ventes avec commission
- Dashboard avec statistiques

### 6. Contenu de la formation (PRIORITÉ 3)

**Objectif** : Alimenter la base avec le vrai contenu

**Actions** :
1. Créer un script seed Prisma
2. Créer les 7 modules
3. Créer les 45+ leçons avec contenu
4. Ajouter exercices, modèles, études de cas
5. Compléter la bibliographie

```bash
# Créer le fichier seed
# prisma/seed.ts

npx prisma db seed
```

### 7. Pages légales et supplémentaires (PRIORITÉ 4)

**Fichiers à créer** :
- `app/mentions-legales/page.tsx`
- `app/cgv/page.tsx`
- `app/confidentialite/page.tsx`
- `app/faq/page.tsx`
- `app/contact/page.tsx`
- `app/mot-de-passe-oublie/page.tsx`

### 8. Optimisations et tests (PRIORITÉ 5)

- Tests unitaires (Jest)
- Tests E2E (Playwright)
- Optimisation SEO
- Performance (Core Web Vitals)
- Accessibilité
- Mode sombre (optionnel)

## 📋 Checklist de lancement

Avant de lancer en production :

### Technique
- [ ] Toutes les variables d'environnement configurées
- [ ] Base de données de production créée
- [ ] Migrations Prisma exécutées
- [ ] Stripe configuré en mode live
- [ ] NextAuth configuré avec secret sécurisé
- [ ] Domaine configuré
- [ ] SSL activé

### Contenu
- [ ] Tous les modules créés
- [ ] Toutes les leçons rédigées
- [ ] Exercices ajoutés
- [ ] Modèles créés
- [ ] Études de cas rédigées
- [ ] Bibliographie complète

### Légal
- [ ] Mentions légales
- [ ] CGV
- [ ] Politique de confidentialité
- [ ] RGPD conforme
- [ ] Cookies banner (si nécessaire)

### Marketing
- [ ] Page de vente optimisée
- [ ] Tracking analytics (Google Analytics, Plausible, etc.)
- [ ] Pixel Facebook/Meta (si pub)
- [ ] Email de bienvenue configuré
- [ ] Séquence d'emails post-achat

### Tests
- [ ] Parcours complet d'achat testé
- [ ] Création de compte après paiement testée
- [ ] Toutes les pages accessibles
- [ ] Responsive testé sur mobile/tablet
- [ ] Performance testée (Lighthouse)

## 🆘 Ressources utiles

### Documentation
- **Next.js** : https://nextjs.org/docs
- **Prisma** : https://www.prisma.io/docs
- **NextAuth** : https://next-auth.js.org
- **Stripe** : https://stripe.com/docs
- **Tailwind CSS** : https://tailwindcss.com/docs

### Outils
- **Stripe CLI** : Pour tester les webhooks localement
- **Prisma Studio** : Pour visualiser/éditer la BDD (`npx prisma studio`)
- **Vercel CLI** : Pour le déploiement

### Support
- Communauté Next.js : Discord, GitHub Discussions
- Stack Overflow : Pour les questions techniques
- Documentation officielle : Toujours la meilleure source

## 🎯 Ordre recommandé d'implémentation

1. **Semaine 1** : Authentification + Base de données connectée
2. **Semaine 2** : Stripe + Création automatique de compte
3. **Semaine 3** : Sauvegarde notes + progression + Tests
4. **Semaine 4** : Contenu de la formation
5. **Semaine 5** : Affiliation + Pages légales
6. **Semaine 6** : Tests finaux + Optimisations + Lancement

Bon courage ! 🚀
