/**
 * PREVIEW MARKETING - SAFE FOR CLIENT BUNDLE
 *
 * Ce fichier contient UNIQUEMENT la structure visible du programme :
 * - Titres des modules
 * - Objectifs des modules
 * - Titres des leçons
 * - Titres des exercices
 *
 * AUCUN CONTENU PREMIUM :
 * - Pas de descriptions complètes de leçons
 * - Pas de takeaways
 * - Pas de contenu détaillé
 * - Pas d'URLs de téléchargement
 */

// Types pour le preview
export interface LessonPreview {
  id: number;
  title: string;
}

export interface ModulePreview {
  id: number;
  title: string;
  objective: string;
  lessons: LessonPreview[];
  exercises: string[];
}

export interface TemplatePreview {
  id: string;
  title: string;
  type: "PDF" | "Template" | "Schema";
}

// ============================================================================
// STRUCTURE DU PROGRAMME (PREVIEW ONLY)
// Données publiques - peuvent être affichées sur la page marketing
// Source : contenu formation.txt — 8 modules, 43 leçons, 26 exercices
// ============================================================================

export const programPreview: ModulePreview[] = [
  {
    id: 1,
    title: "Comment le cerveau prend une décision d'achat",
    objective:
      "Comprendre comment une décision se forme réellement, avant toute technique. Ce module explique les bases neuropsychologiques de la décision d'achat, afin de vendre en accord avec le fonctionnement naturel du cerveau.",
    lessons: [
      { id: 1, title: "Pourquoi nous n'achetons jamais de manière rationnelle" },
      { id: 2, title: "Émotion d'abord, justification ensuite" },
      { id: 3, title: "Le rôle de l'attention (ce qui capte / ce qui est ignoré)" },
      { id: 4, title: "La peur de perdre vs le désir de gagner" },
      { id: 5, title: "Différence entre décision rapide et décision réfléchie" },
    ],
    exercises: [
      "Analyse d'un achat personnel récent",
      "Déconstruction d'une publicité",
      "Identifier ce qui fait hésiter vs ce qui fait agir",
    ],
  },
  {
    id: 2,
    title: "Les biais cognitifs vraiment utiles en vente",
    objective:
      "Utiliser peu de biais, mais les bons. Ce module présente les biais cognitifs majeurs qui influencent le client et explique comment les employer de façon éthique pour renforcer l'impact d'un message commercial. L'idée n'est pas de manipuler, mais de comprendre quels raccourcis mentaux peuvent faciliter la décision d'achat lorsqu'ils sont utilisés de manière honnête et transparente.",
    lessons: [
      { id: 1, title: "Aversion à la perte" },
      { id: 2, title: "Preuve sociale" },
      { id: 3, title: "Effet d'ancrage" },
      { id: 4, title: "Rareté réelle vs fausse rareté" },
      { id: 5, title: "Autorité et crédibilité" },
      { id: 6, title: "Effet de cadrage" },
      { id: 7, title: "Engagement progressif (effet de pied-dans-la-porte)" },
      { id: 8, title: "Coût irrécupérable (biais du sunk cost)" },
      { id: 9, title: "Effet de contraste" },
      { id: 10, title: "Biais de simplicité" },
    ],
    exercises: [
      "Associer chaque biais à un exemple concret de vente",
      "Réécriture d'une offre avec 3 biais maximum",
      "Identifier les biais abusifs (à éviter)",
    ],
  },
  {
    id: 3,
    title: "Comprendre profondément son client",
    objective:
      "Arrêter de vendre un produit, commencer à vendre une transformation. Ici, on apprend à se focaliser sur le client plutôt que sur l'offre brute. Il s'agit de comprendre ses problèmes, ses désirs et son univers mental pour lui proposer non pas un simple produit mais une solution qui le transforme positivement.",
    lessons: [
      { id: 1, title: "Douleur réelle vs douleur perçue" },
      { id: 2, title: "Désir conscient vs désir caché" },
      { id: 3, title: "Peurs silencieuses du client" },
      { id: 4, title: "Le langage interne du client" },
      { id: 5, title: "Pourquoi le client n'achète pas (les vraies raisons)" },
    ],
    exercises: [
      "Interview fictive d'un client type",
      "Cartographie des objections réelles",
      "Traduction produit → bénéfice mental",
    ],
  },
  {
    id: 4,
    title: "Construire une offre qui donne envie d'acheter",
    objective:
      "Créer une offre claire, désirable, compréhensible en 10 secondes. Ce module vous apprend à structurer votre offre commerciale de façon à ce qu'un client puisse comprendre en un coup d'œil ce que vous vendez et pourquoi il en a besoin. L'accent est mis sur la clarté de la promesse, la crédibilité et la réduction du risque.",
    lessons: [
      { id: 1, title: "Promesse claire et mesurable" },
      { id: 2, title: "Mécanisme crédible (comment ça marche)" },
      { id: 3, title: "Preuves et réassurance" },
      { id: 4, title: "Gestion du prix dans le cerveau" },
      { id: 5, title: "Garantie et réduction du risque" },
    ],
    exercises: [
      "Réécrire une offre floue en offre claire",
      "Comparaison de deux offres",
      "Test de compréhension en 10 secondes",
    ],
  },
  {
    id: 5,
    title: "Parler pour vendre (vente physique et orale)",
    objective:
      "Savoir parler sans forcer, sans pression, sans manipulation. Dans ce module, on travaille la vente en face-à-face ou par téléphone, c'est-à-dire la dimension orale et interpersonnelle. L'idée est d'adopter une communication fluide, naturelle et persuasive, où le client ne se sent ni agressé ni manipulé.",
    lessons: [
      { id: 1, title: "Posture mentale du vendeur crédible" },
      { id: 2, title: "Écoute active et questions puissantes" },
      { id: 3, title: "Reformulation qui rassure" },
      { id: 4, title: "Gestion des silences" },
      { id: 5, title: "Closing naturel (sans pousser)" },
    ],
    exercises: [
      "Script de découverte client",
      "Reformulation d'objections",
      "Simulation de vente courte",
    ],
  },
  {
    id: 6,
    title: "Écrire pour vendre (digital)",
    objective:
      "Faire agir avec des mots simples. Ici, on se concentre sur la vente à l'écrit : que ce soit un e-mail, une page de vente web, un message sur les réseaux, etc. L'objectif est d'apprendre à rédiger de manière persuasive en digital, en utilisant un style clair, concis et orienté action.",
    lessons: [
      { id: 1, title: "Structure d'un message qui convertit" },
      { id: 2, title: "Titres qui captent l'attention" },
      { id: 3, title: "Argumentation courte et claire" },
      { id: 4, title: "Appel à l'action efficace" },
      { id: 5, title: "Erreurs classiques du marketing digital" },
    ],
    exercises: [
      "Réécriture d'une page de vente",
      "Création d'un message court (email, message privé, page)",
      "Suppression du superflu",
    ],
  },
  {
    id: 7,
    title: "Marketing digital et acquisition (diffuser sans manipuler)",
    objective:
      "Apprendre à attirer des prospects qualifiés en diffusant le bon message aux bonnes personnes, tout en utilisant les leviers du marketing digital de manière éthique — sans manipulation ni fausses promesses.",
    lessons: [
      { id: 1, title: "Le rôle réel du marketing digital" },
      { id: 2, title: "Attention : la vraie monnaie du digital" },
      { id: 3, title: "Les grands canaux d'acquisition (vue d'ensemble)" },
      { id: 4, title: "Le marketing de contenu (attirer sans forcer)" },
      { id: 5, title: "Les influenceurs : réalité, mythes et efficacité" },
      { id: 6, title: "Mise en avant d'un produit ou service" },
      { id: 7, title: "Tunnel simple et parcours prospect" },
      { id: 8, title: "Les erreurs classiques du marketing digital" },
    ],
    exercises: [
      "Choisir son canal d'acquisition principal",
      "Analyse d'une collaboration influenceur",
      "Transformer un message trop agressif en message crédible",
      "Construire un parcours d'acquisition simple (max 3 étapes)",
    ],
  },
  {
    id: 8,
    title: "Mise en pratique finale",
    objective:
      "Passer de la théorie à l'action. Ce dernier module est consacré à des exercices intégrateurs pour appliquer tout ce qui a été appris dans les modules précédents — de la compréhension du cerveau à la construction d'une offre complète.",
    lessons: [],
    exercises: [
      "Création d'une offre complète",
      "Script de vente oral",
      "Version écrite de la vente",
      "Simulation réelle (vente test)",
    ],
  },
];

export const templatesPreview: TemplatePreview[] = [
  { id: "grille-analyse-client", title: "Grille d'analyse client", type: "Template" },
  { id: "script-decouverte", title: "Script de découverte", type: "PDF" },
  { id: "carte-biais-cognitifs", title: "Carte des biais cognitifs", type: "Schema" },
  { id: "structure-offre", title: "Structure offre irrésistible", type: "Template" },
  { id: "checklist-page-vente", title: "Checklist page de vente", type: "PDF" },
  { id: "sequence-email", title: "Séquence email type", type: "Template" },
  { id: "matrice-objections", title: "Matrice des objections", type: "Template" },
  { id: "tunnel-vente", title: "Schéma tunnel de vente", type: "Schema" },
];

// ============================================================================
// HELPER FUNCTIONS (PREVIEW ONLY)
// ============================================================================

export function getTotalModules(): number {
  return programPreview.length;
}

export function getTotalLessonsPreview(): number {
  return programPreview.reduce((acc, m) => acc + m.lessons.length, 0);
}

export function getTotalExercisesPreview(): number {
  return programPreview.reduce((acc, m) => acc + m.exercises.length, 0);
}

export function getTotalTemplatesPreview(): number {
  return templatesPreview.length;
}

// Stats pour affichage marketing
export const programStats = {
  modules: getTotalModules(),
  lessons: getTotalLessonsPreview(),
  exercises: getTotalExercisesPreview(),
  templates: getTotalTemplatesPreview(),
} as const;
