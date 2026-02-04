# ⚡ Guide de démarrage rapide

Ce guide vous permet de lancer le projet en développement en 5 minutes.

## 📋 Prérequis

Assurez-vous d'avoir installé :
- Node.js 18+ : https://nodejs.org/
- PostgreSQL : https://www.postgresql.org/download/
- Un éditeur de code (VS Code recommandé)

## 🚀 Installation rapide

### 1. Installer les dépendances

```bash
cd formation-vente
npm install
```

### 2. Créer la base de données

```bash
# Créer la base de données PostgreSQL
createdb formation-vente

# Ou via psql :
psql -U postgres
CREATE DATABASE "formation-vente";
\q
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/formation-vente"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="changez-ce-secret-par-quelque-chose-de-securise"
```

> **Note** : Remplacez `postgres:password` par votre username et password PostgreSQL

### 4. Initialiser la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma db push
```

### 5. Lancer le serveur

```bash
npm run dev
```

Le site est maintenant accessible sur **http://localhost:3000** ! 🎉

## 🗺️ Navigation du site

### Pages publiques (accessibles sans connexion)

- **Accueil** : http://localhost:3000
- **Programme** : http://localhost:3000/programme
- **Éthique** : http://localhost:3000/ethique
- **Affiliation** : http://localhost:3000/affiliation
- **Connexion** : http://localhost:3000/connexion

### Espace membre (UI visible, mais pas encore protégé)

- **Accueil formation** : http://localhost:3000/membre
- **Module exemple** : http://localhost:3000/membre/module/biais-cognitifs-ethique
- **Leçon exemple** : http://localhost:3000/membre/lecon/biais-rarete
- **Exercices** : http://localhost:3000/membre/exercices
- **Modèles** : http://localhost:3000/membre/modeles
- **Études de cas** : http://localhost:3000/membre/etudes-de-cas
- **Bibliographie** : http://localhost:3000/membre/bibliographie
- **Mon compte** : http://localhost:3000/membre/compte

## 🔍 Explorer la base de données

Lancez Prisma Studio pour visualiser et éditer les données :

```bash
npx prisma studio
```

Cela ouvrira une interface web sur http://localhost:5555

## 🎨 Personnaliser le design

Les couleurs pédagogiques sont définies dans :
- `tailwind.config.js` : Configuration des couleurs
- `app/globals.css` : Classes CSS personnalisées

Pour modifier les couleurs :
```javascript
// tailwind.config.js
colors: {
  'pedagogy-blue': { /* vos couleurs */ },
  'pedagogy-yellow': { /* vos couleurs */ },
  // ...
}
```

## 📝 Données de démonstration

Actuellement, toutes les données affichées sont mockées (hardcodées) dans les composants. Pour alimenter avec de vraies données :

1. Créez un fichier `prisma/seed.ts`
2. Ajoutez vos données de formation
3. Lancez : `npx prisma db seed`

Exemple de seed :
```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const course = await prisma.course.create({
    data: {
      title: "L'Art de Convaincre",
      slug: 'art-convaincre',
      description: '...',
      price: 8500, // 85€
      isPublished: true,
    }
  })

  const module1 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Fondations',
      slug: 'fondations',
      description: '...',
      objectives: ['...'],
      order: 1,
      estimatedTime: 150,
    }
  })

  // ... créer les leçons, exercices, etc.
}

main()
```

## 🐛 Résolution de problèmes

### Erreur de connexion PostgreSQL

```
Error: Can't reach database server
```

**Solutions** :
- Vérifiez que PostgreSQL est lancé : `pg_ctl status`
- Vérifiez vos credentials dans `.env`
- Testez la connexion : `psql -U postgres`

### Erreur "Cannot find module"

```bash
npm install
npx prisma generate
```

### Port 3000 déjà utilisé

```bash
# Utiliser un autre port
npm run dev -- -p 3001
```

### Les styles ne s'appliquent pas

```bash
# Reconstruire Tailwind
npm run dev
```

## 📚 Commandes utiles

```bash
# Développement
npm run dev              # Lancer le serveur de dev
npm run build            # Build de production
npm run start            # Lancer le serveur de production
npm run lint             # Linter le code

# Prisma
npx prisma studio        # Interface visuelle de la BDD
npx prisma generate      # Générer le client Prisma
npx prisma db push       # Pousser le schéma vers la BDD
npx prisma db seed       # Alimenter la BDD
npx prisma migrate dev   # Créer une migration

# Utiles
npm run dev -- --turbo   # Lancer avec Turbopack (plus rapide)
```

## 🎯 Prochaines étapes

Une fois que tout fonctionne localement :

1. **Consultez [NEXT_STEPS.md](./NEXT_STEPS.md)** pour les étapes d'implémentation détaillées
2. **Commencez par l'authentification** (NextAuth.js)
3. **Puis Stripe** pour les paiements
4. **Connectez les vraies données** à la place des mocks

## 💡 Conseils

- **Utilisez Git** dès maintenant pour versionner votre code
- **Testez régulièrement** sur mobile (responsive déjà implémenté)
- **Consultez la documentation** en cas de doute
- **Prisma Studio** est votre ami pour visualiser les données

## 🆘 Besoin d'aide ?

- Lisez le [README.md](./README.md) complet
- Consultez [NEXT_STEPS.md](./NEXT_STEPS.md) pour l'implémentation
- Documentations officielles :
  - Next.js : https://nextjs.org/docs
  - Prisma : https://www.prisma.io/docs
  - Tailwind : https://tailwindcss.com/docs

Bon développement ! 🚀
