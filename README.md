# 🎯 Comprendre pour Vendre - Plateforme de Formation

Site web complet de formation en ligne pour apprendre l'art de vendre et de convaincre de manière éthique.

## 🎨 Caractéristiques principales

### Design et UX
- ✅ Interface colorée et ludique (pas enfantine)
- ✅ Code couleur pédagogique cohérent :
  - 🔵 **Bleu** : Théorie / Compréhension
  - 🟡 **Jaune** : Attention / Décision / Biais
  - 🟢 **Vert** : Validation / Éthique / Résumé
  - 🟠 **Orange** : Action / Exercices / Templates
- ✅ Design moderne avec cartes arrondies et formes douces
- ✅ 100% texte (aucune vidéo)

### Zone publique
- ✅ Page d'accueil / page de vente complète
- ✅ Page programme détaillé
- ✅ Page éthique et positionnement
- ✅ Page affiliation (publique)
- ✅ Page de connexion

### Espace membre
- ✅ Accueil avec progression globale
- ✅ Grille de tous les modules avec statut
- ✅ Parcours recommandé (optionnel)
- ✅ Pages Module avec leçons, objectifs, ressources
- ✅ Pages Leçon avec encadrés pédagogiques colorés
- ✅ Système de notes personnelles par leçon
- ✅ Bibliothèques : Exercices, Modèles, Études de cas, Bibliographie
- ✅ Page compte utilisateur

### Fonctionnalités
- ✅ Navigation libre (tous les modules accessibles immédiatement)
- ✅ Système de progression (non commencé / en cours / terminé)
- ✅ Notes personnelles sauvegardées par leçon
- ⏳ Authentification utilisateur (NextAuth.js à implémenter)
- ⏳ Paiement Stripe et création automatique de compte
- ⏳ Système d'affiliation avec tableau de bord

## 🛠 Stack technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Base de données** : PostgreSQL avec Prisma ORM
- **Authentification** : NextAuth.js (à configurer)
- **Paiement** : Stripe (à configurer)
- **Déploiement** : Vercel

## 📦 Installation

### Prérequis

- Node.js 18+ et npm
- PostgreSQL installé et en cours d'exécution
- Compte Stripe (pour les paiements)

### Étapes d'installation

1. **Cloner le projet**
```bash
cd formation-vente
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env` à la racine du projet :

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/formation-vente"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-aleatoire-tres-securise"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_ID="price_..."

# App
APP_URL="http://localhost:3000"
```

4. **Créer la base de données PostgreSQL**

```bash
createdb formation-vente
```

5. **Initialiser Prisma et créer les tables**

```bash
npx prisma generate
npx prisma db push
```

6. **Lancer le serveur de développement**

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
formation-vente/
├── app/                          # Pages Next.js (App Router)
│   ├── page.tsx                  # Page d'accueil / vente
│   ├── programme/                # Programme détaillé
│   ├── ethique/                  # Approche éthique
│   ├── affiliation/              # Programme d'affiliation
│   ├── connexion/                # Page de connexion
│   ├── membre/                   # Espace membre (protégé)
│   │   ├── page.tsx             # Accueil formation
│   │   ├── module/[slug]/       # Page module
│   │   ├── lecon/[slug]/        # Page leçon
│   │   ├── exercices/           # Bibliothèque exercices
│   │   ├── modeles/             # Bibliothèque modèles
│   │   ├── etudes-de-cas/       # Bibliothèque études de cas
│   │   ├── bibliographie/       # Bibliographie
│   │   └── compte/              # Page compte utilisateur
│   ├── api/                     # Routes API
│   │   ├── auth/                # NextAuth (à implémenter)
│   │   ├── stripe/              # Webhooks Stripe (à implémenter)
│   │   └── affiliation/         # API affiliation (à implémenter)
│   ├── layout.tsx               # Layout principal
│   └── globals.css              # Styles globaux
├── components/                   # Composants React
│   ├── ui/                      # Composants UI génériques
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── ProgressBar.tsx
│   ├── pedagogy/                # Composants pédagogiques
│   │   └── PedagogyBox.tsx
│   └── layout/                  # Composants de layout
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/                         # Utilitaires
│   ├── prisma.ts               # Client Prisma
│   └── utils.ts                # Fonctions utilitaires
├── prisma/                      # Schéma Prisma
│   └── schema.prisma           # Modèles de base de données
├── public/                      # Fichiers statiques
├── tailwind.config.js          # Configuration Tailwind
├── tsconfig.json               # Configuration TypeScript
└── package.json                # Dépendances
```

## 🎨 Système de couleurs pédagogiques

Le code couleur est au cœur de la pédagogie du site. Chaque couleur a une fonction précise :

| Couleur | Usage | Classes Tailwind |
|---------|-------|------------------|
| 🔵 Bleu | Théorie, compréhension, concepts | `pedagogy-blue-*` |
| 🟡 Jaune | Attention, points clés, biais cognitifs | `pedagogy-yellow-*` |
| 🟢 Vert | Validation, éthique, résumés | `pedagogy-green-*` |
| 🟠 Orange | Action, exercices, templates | `pedagogy-orange-*` |

### Utilisation des PedagogyBox

```tsx
<PedagogyBox color="blue" title="Théorie">
  Contenu théorique ici
</PedagogyBox>

<PedagogyBox color="yellow" title="⚠️ Point critique">
  Attention particulière
</PedagogyBox>

<PedagogyBox color="green" title="Résumé">
  Synthèse de la leçon
</PedagogyBox>

<PedagogyBox color="orange" title="Exercice">
  Instructions de l'exercice
</PedagogyBox>
```

## 🗄 Modèle de données

Le schéma Prisma comprend :

- **User** : Utilisateurs
- **Course** : Formations
- **Module** : Modules de formation
- **Lesson** : Leçons
- **Exercise** : Exercices
- **Template** : Modèles
- **CaseStudy** : Études de cas
- **Bibliography** : Bibliographie
- **Enrollment** : Inscriptions
- **Progress** : Progression utilisateur
- **Note** : Notes personnelles
- **Payment** : Paiements
- **Affiliate** : Affiliés
- **AffiliateClick** : Clics affiliés
- **AffiliateSale** : Ventes affiliées

## 🚀 Prochaines étapes (TODO)

### Authentification
- [ ] Configurer NextAuth.js
- [ ] Implémenter la connexion/déconnexion
- [ ] Protéger les routes `/membre/*`
- [ ] Système de réinitialisation de mot de passe

### Paiement Stripe
- [ ] Configurer Stripe
- [ ] Créer le flow de checkout
- [ ] Implémenter le webhook de paiement
- [ ] Créer automatiquement le compte après paiement
- [ ] Envoyer l'email de confirmation

### Affiliation
- [ ] Tableau de bord affilié
- [ ] Tracking des clics
- [ ] Suivi des ventes et commissions
- [ ] Ressources marketing pour affiliés

### Contenu
- [ ] Alimenter la base de données avec le contenu réel des modules
- [ ] Créer les 45+ leçons
- [ ] Ajouter les exercices, modèles, études de cas
- [ ] Compléter la bibliographie

### Fonctionnalités
- [ ] Système de recherche de contenu
- [ ] Export des notes en PDF
- [ ] Système de notifications
- [ ] Tableau de bord admin
- [ ] Gestion du contenu via CMS ou interface admin

### Pages manquantes
- [ ] FAQ
- [ ] Contact
- [ ] Mentions légales
- [ ] CGV
- [ ] Politique de confidentialité
- [ ] Mot de passe oublié

## 📝 Notes importantes

### Éthique
Ce site est conçu autour d'une approche éthique de la vente et de la persuasion. Aucune technique manipulatrice n'est enseignée. La distinction entre influence et manipulation est au cœur de la formation.

### Données de démo
Actuellement, toutes les données affichées (modules, leçons, progression) sont des données mockées. Il faudra :
1. Implémenter les requêtes Prisma pour récupérer les vraies données
2. Alimenter la base de données avec le contenu réel
3. Implémenter les mutations pour sauvegarder les notes, la progression, etc.

### Scalabilité
Le site est conçu pour supporter plusieurs formations à terme :
- Le schéma de base de données supporte multiple cours
- La structure permet d'ajouter facilement de nouvelles formations
- Les composants sont réutilisables

## 🤝 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Consulter la documentation Next.js : https://nextjs.org/docs
- Consulter la documentation Prisma : https://www.prisma.io/docs

## 📄 Licence

Tous droits réservés © 2024 Comprendre pour Vendre
