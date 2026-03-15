/**
 * CORRECTIONS PÉDAGOGIQUES — SERVER ONLY
 *
 * Mappe chaque exercice "moduleId-lessonId" vers sa correction structurée.
 * Importé uniquement dans des Server Components.
 */
import "server-only";

export interface ExerciseCorrection {
  objective: string;       // Ce que l'exercice voulait faire découvrir
  keyPoints: string[];     // Points clés attendus dans une bonne réponse
  example: string;         // Exemple de bonne réflexion
  takeaways: string[];     // Ce qu'il faut retenir
}

/**
 * Clé : "moduleId-lessonId" (ex : "1-1", "3-3")
 */
export const exerciseCorrections: Record<string, ExerciseCorrection> = {

  // ─── MODULE 1 — Comment le cerveau prend une décision d'achat ─────────────

  "1-1": {
    objective:
      "Rendre visible le décalage entre la vraie raison d'un achat (émotionnelle) et les justifications qu'on se donne après (rationnelles).",
    keyPoints: [
      "L'émotion identifiée est concrète et personnelle (peur de manquer, envie de confort, désir de statut, soulagement…) — pas une formulation vague",
      "Les justifications rationnelles post-achat sont identifiées comme telles (rapport qualité/prix, utilité, bon timing…)",
      "L'écart entre les deux est clairement observé : la justification ne correspond pas à la vraie raison",
      "Le lien est fait avec le comportement client : vos prospects font exactement la même chose",
    ],
    example:
      "Achat d'une nouvelle paire de baskets alors que les anciennes fonctionnaient encore. Émotion réelle : envie de me sentir bien, petit plaisir après une semaine difficile. Justification donnée : « les anciennes commençaient à s'user et j'avais besoin de nouvelles pour le sport ». Observation : j'aurais pu attendre 3 mois, mais l'émotion a créé l'urgence et la raison a construit le scénario qui la validait.",
    takeaways: [
      "Vos clients font la même chose — ils ne vous disent pas la vraie raison, ils vous donnent leur justification",
      "Si vous vendez uniquement sur des arguments rationnels, vous répondez à la mauvaise question",
      "Connaître la vraie raison émotionnelle vous permet de l'activer en premier dans votre discours",
    ],
  },

  "1-3": {
    objective:
      "Identifier concrètement les trois mécanismes d'attention (contraste, pertinence, émotion) dans une publicité réelle, pour les reproduire dans sa propre communication.",
    keyPoints: [
      "Le premier mécanisme identifié est précis : rupture visuelle, mot percutant, question personnelle, image inattendue…",
      "Le désir ou la peur personnelle qui résonnait est nommé explicitement (pas juste « c'était bien fait »)",
      "La structure complète du message est analysée : comment il maintient l'attention au-delà des 3 premières secondes",
      "La transposition vers son propre contexte est amorcée : qu'est-ce que je peux reproduire ?",
    ],
    example:
      "Pub pour un service de comptabilité en ligne. Premier mécanisme : titre « Vous payez encore trop d'impôts ? » — pertinence personnelle immédiate. Désir/peur : peur de payer trop, envie de garder son argent. Suite : chiffre concret (« les indépendants économisent en moyenne 1 800 €/an »), puis témoignage bref. L'attention est maintenue par la promesse chiffrée et la preuve sociale. À reproduire dans mon contexte : ouvrir avec une question qui touche directement la douleur du prospect.",
    takeaways: [
      "Une bonne accroche ne dit pas ce que vous faites — elle touche ce que le client ressent ou craint",
      "Contraste + pertinence personnelle = les deux premières secondes les plus efficaces",
      "La pub qui vous a arrêté est votre meilleur modèle — déconstruisez-la plutôt que de réinventer",
    ],
  },

  "1-5": {
    objective:
      "Distinguer les freins rationnels (manque d'information) des freins émotionnels (peurs, doutes inconscients) pour savoir quel levier actionner face à une hésitation.",
    keyPoints: [
      "Les freins sont listés de façon spécifique, pas génériques (pas juste « le prix » mais « j'ai peur de dépenser sans être sûr du résultat »)",
      "Chaque frein est classé correctement : rationnel (un argument peut le lever) ou émotionnel (il faut d'abord rassurer)",
      "Les moteurs d'action sont aussi précis : désir concret, urgence ressentie, bénéfice imaginé",
      "La différence entre « aller chercher plus d'infos » (Système 2) et « créer une émotion positive » (Système 1) est intégrée",
    ],
    example:
      "Achat envisagé : formation en ligne à 350 €. Freins rationnels : je ne sais pas si le contenu est à jour, je ne connais pas le formateur. Freins émotionnels : peur de dépenser sans résultat, peur de ne pas avoir le temps de finir, peur du jugement de l'entourage (« encore une formation »). Moteurs : envie de progresser, un client a doublé ses revenus grâce à la méthode, fin de promo dans 3 jours. Observation : mes vrais freins sont émotionnels — une FAQ supplémentaire ne les lèvera pas, mais un témoignage qui résonne avec ma situation pourrait.",
    takeaways: [
      "« Je vais réfléchir » = le Système 1 n'est pas convaincu, pas un manque d'arguments",
      "Un frein émotionnel ne se lève pas avec un argument rationnel — il se lève avec réassurance ou émotion positive",
      "Identifier le bon type de frein avant de répondre évite de donner la mauvaise réponse",
    ],
  },

  // ─── MODULE 2 — Les biais cognitifs vraiment utiles en vente ──────────────

  "2-2": {
    objective:
      "Faire l'inventaire des preuves sociales existantes pour savoir lesquelles sont utilisables immédiatement, lesquelles sont à développer, et dans quel contexte les utiliser.",
    keyPoints: [
      "Les preuves existantes sont listées de façon concrète : témoignages, notes, chiffres clients, logos, médias…",
      "Chaque preuve est évaluée sur sa force : générique (« très bien ! ») vs spécifique (résultat chiffré + contexte)",
      "Les formats manquants sont identifiés (ex : j'ai des clients satisfaits mais pas de témoignages écrits)",
      "Un plan d'action minimal est esquissé : quelle preuve recueillir en premier, auprès de qui",
    ],
    example:
      "Inventaire d'un freelance graphiste : 3 avis Google (notes 5/5 mais textes courts et génériques), 2 témoignages LinkedIn (plus détaillés, mentionnent un résultat concret), 15 projets livrés dont 5 pour des marques reconnaissables. Manque : aucun avant/après, aucun chiffre de résultat client. Action immédiate : contacter les 2 meilleurs clients pour un témoignage en vidéo ou une citation longue avec résultat. À moyen terme : demander aux clients d'accepter que leur logo figure sur le site.",
    takeaways: [
      "Un témoignage vague vaut peu — un témoignage avec résultat concret et contexte vaut beaucoup",
      "Vous avez probablement déjà des preuves sociales inexploitées — commencez par les formaliser",
      "La preuve sociale fonctionne mieux quand elle ressemble au prospect (même secteur, même problème)",
    ],
  },

  "2-4": {
    objective:
      "Distinguer les raretés réelles des raretés construites dans son offre, pour utiliser uniquement des formes de rareté crédibles et éviter les pratiques qui détruisent la confiance.",
    keyPoints: [
      "Les raretés réelles sont identifiées clairement (capacité de temps limitée, stock physique, date de cohorte…)",
      "Les fausses raretés sont reconnues honnêtement (offres « limitées » reconduites indéfiniment, compteurs fictifs…)",
      "La distinction entre rareté crédible et rareté perçue comme manipulation est faite",
      "Au moins une forme de rareté légitime est identifiée pour son propre contexte",
    ],
    example:
      "Coach indépendant. Raretés réelles : je ne prends que 4 clients en accompagnement individuel simultanément (limite réelle de temps et qualité), mes sessions de groupe ont une date d'ouverture fixe 4 fois par an. Fausses raretés identifiées dans mon secteur : offres « clôturant dans 24h » qui se prolongent chaque semaine, compteurs faux sur les pages de vente. Ma rareté légitime à utiliser : « Je prends 4 clients simultanément — 2 places disponibles actuellement » (vérifiable, réel, crédible).",
    takeaways: [
      "La fausse rareté est détectable — quand les gens s'en rendent compte, la confiance est définitivement perdue",
      "Une rareté vraie, même petite, est plus persuasive qu'une urgence artificielle",
      "Si votre offre n'a pas de rareté naturelle, travaillez à en créer une qui soit réelle (cohorte, capacité, accès)",
    ],
  },

  "2-6": {
    objective:
      "Réécrire son offre en changeant le cadre de référence pour qu'elle soit perçue différemment par le prospect, sans changer le fond.",
    keyPoints: [
      "L'ancienne formulation est identifiée comme un cadre neutre ou négatif",
      "Le recadrage proposé change la perspective sans mentir : gain vs perte, investissement vs coût, résultat vs caractéristique",
      "Plusieurs angles de recadrage sont testés (prix fractionné, comparaison à une alternative coûteuse, bénéfice sur la durée…)",
      "Le recadrage est appliqué de façon cohérente, pas un simple changement de mot",
    ],
    example:
      "Formation à 350 € recadrée : (1) « 350 € pour apprendre à vendre » → « 350 € pour arrêter de perdre des clients qui refusent parce que vous n'avez pas su les convaincre » (cadre perte → douleur active). (2) « 350 € » → « Moins qu'un repas de travail par mois sur 1 an » (fractionnement mental). (3) « 350 € » → « La valeur d'une seule vente supplémentaire que vous ferez grâce à cette méthode » (ROI immédiat). Chaque cadrage présente la même réalité financière — mais active un biais cognitif différent.",
    takeaways: [
      "Le cadrage change la perception sans changer le réel — c'est la même information, pas un mensonge",
      "Présenter un prix sans contexte est le pire cadre possible — toujours l'ancrer à une valeur ou une économie",
      "Testez plusieurs cadres et gardez celui qui résonne le plus avec la douleur de votre client idéal",
    ],
  },

  "2-7": {
    objective:
      "Cartographier les petits engagements successifs qui mènent à l'achat principal, pour concevoir un parcours client qui réduit la résistance à chaque étape.",
    keyPoints: [
      "L'escalier commence par un engagement minimal, presque sans friction (suivre, lire, télécharger…)",
      "Chaque marche augmente légèrement l'engagement et la confiance accordée",
      "Le dernier palier — l'achat — arrive après que le prospect s'est déjà engagé plusieurs fois",
      "La logique de la cohérence est comprise : une fois qu'on a dit oui plusieurs fois, on a tendance à continuer",
    ],
    example:
      "Escalier d'une coach en communication. Marche 1 : lecture d'un article de blog (0 friction). Marche 2 : téléchargement d'un guide PDF (email donné, engagement minimal). Marche 3 : inscription à un webinaire gratuit (temps donné, engagement moyen). Marche 4 : session découverte 30 min (temps + confiance, engagement fort). Marche 5 : achat de l'accompagnement. À chaque étape, le prospect a déjà dit oui à la précédente — refuser l'étape suivante serait incohérent avec ce qu'il a déjà accepté.",
    takeaways: [
      "Plus l'engagement initial est faible, plus le taux d'entrée est élevé — commencez par quelque chose de presque gratuit",
      "Chaque oui crée un contexte mental favorable au oui suivant (principe de cohérence)",
      "L'achat n'est plus une décision isolée mais la suite logique d'une série d'engagements acceptés",
    ],
  },

  "2-8": {
    objective:
      "Identifier les coûts déjà engagés par le prospect (temps, argent, énergie) pour comprendre comment le biais du sunk cost influence sa résistance ou sa motivation à changer.",
    keyPoints: [
      "Les coûts irrécupérables réels du prospect sont listés : temps investi, argent dépensé, énergie consacrée, identité construite",
      "La distinction est faite entre sunk cost qui freine (rationalise le statu quo) et sunk cost qui pousse (justifie un achat supplémentaire)",
      "Une formulation est proposée pour activer ou désactiver ce biais selon le contexte",
      "L'usage éthique est distingué de la manipulation : activer un sunk cost réel vs en inventer un fictif",
    ],
    example:
      "Prospect qui a déjà investi 2 ans dans une activité freelance peu rentable. Sunk cost identifié : 2 ans d'efforts, une réputation construite, de l'argent dans du matériel. Frein possible : « J'ai déjà investi autant, changer de méthode c'est admettre que j'avais tort. » Levier possible : « Vous avez déjà investi 2 ans et construit une vraie base — c'est exactement le bon moment pour adopter une méthode qui va rentabiliser tout ce travail. » Le sunk cost devient une justification d'avancer plutôt qu'une raison de stagner.",
    takeaways: [
      "Le sunk cost peut freiner (défense du statu quo) ou accélérer (justification d'un nouvel investissement) — c'est vous qui choisissez le cadrage",
      "Les formulations « vous avez déjà fait X, il serait dommage de ne pas aller jusqu'au bout » activent ce biais de façon éthique si X est réel",
      "Identifier le sunk cost d'un prospect permet de comprendre pourquoi il hésite et d'y répondre précisément",
    ],
  },

  "2-10": {
    objective:
      "Tester si son offre ou sa communication passe le test des 5 secondes — c'est-à-dire si un inconnu comprend immédiatement ce que vous proposez et pourquoi c'est pertinent pour lui.",
    keyPoints: [
      "Le test est réellement effectué avec une personne non initiée (pas quelqu'un qui connaît déjà l'offre)",
      "La question posée est précise : qu'as-tu compris ? Qu'est-ce que ça t'apporte ? Est-ce que ça te parle ?",
      "Les zones de confusion ou d'incompréhension sont notées sans défense",
      "Une version simplifiée est proposée si le test a révélé des problèmes",
    ],
    example:
      "Test d'une page d'accueil pour un service de coaching entrepreneurial. Phrase testée : « Accélérateur de croissance pour entrepreneurs ambitieux. » Test avec 3 personnes non initiées. Résultats : 2/3 ne savent pas ce que ça veut dire concrètement, 1/3 pense que c'est pour des grandes entreprises. Reformulation après test : « Je vous aide à passer de 3 000 € à 10 000 €/mois en 6 mois — sans recruter ni travailler davantage. » Résultat du second test : 3/3 comprennent immédiatement et posent des questions.",
    takeaways: [
      "Si vous avez besoin d'expliquer votre offre, elle n'est pas encore assez simple",
      "Le test avec des inconnus est brutal mais révélateur — votre entourage vous comprend parce qu'il vous connaît",
      "La simplicité n'est pas un appauvrissement — c'est le niveau de clarté qui permet à votre Système 1 d'être capté en premier",
    ],
  },

  // ─── MODULE 3 — Comprendre son client ─────────────────────────────────────

  "3-1": {
    objective:
      "Distinguer la douleur déclarée (ce que le client dit vouloir) de la douleur réelle (ce qu'il ressent vraiment), pour construire un discours qui touche au bon endroit.",
    keyPoints: [
      "Le client fictif est suffisamment précis pour être crédible (secteur, situation, stade de vie ou d'activité)",
      "La douleur déclarée et la douleur réelle sont clairement distinguées et les deux sont nommées",
      "Les questions posées dans l'interview fictive cherchent à creuser, pas à confirmer — elles ouvrent plutôt que ferment",
      "Le lien est fait entre la douleur réelle et comment l'offre y répond (ou devrait y répondre)",
    ],
    example:
      "Client fictif : entrepreneur solo, 35 ans, secteur conseil RH. Douleur déclarée : « J'ai besoin d'un meilleur site web pour avoir plus de clients. » Douleur réelle révélée en creusant : peur de ne pas paraître assez légitime face aux grands cabinets, sentiment d'être invisible, manque de confiance dans sa capacité à vendre ses propres services. Question d'interview qui a creusé : « Quand un prospect ne vous rappelle pas, qu'est-ce que vous vous dites ? » Réponse révélatrice : « Que je n'étais pas assez convaincant. » L'offre devrait répondre à ça, pas juste refaire le site.",
    takeaways: [
      "Le client exprime son problème avec les outils conceptuels qu'il a — le vrai problème est souvent plus profond",
      "Les meilleures questions d'interview commencent par « quand ça arrive, qu'est-ce que vous vous dites ? »",
      "Répondre à la douleur perçue ne fidélise pas — répondre à la douleur réelle crée de la loyauté",
    ],
  },

  "3-3": {
    objective:
      "Transformer les objections classiques en révélateurs de peurs réelles, pour y répondre avec précision plutôt qu'avec des contre-arguments génériques.",
    keyPoints: [
      "Les objections listées sont réelles et spécifiques au contexte, pas génériques",
      "Pour chaque objection, la peur sous-jacente est identifiée (pas juste l'argument de surface)",
      "La réponse proposée adresse la peur, pas l'objection formulée",
      "La distinction est faite entre objection réelle (le prospect veut une réponse) et objection prétexte (il cherche à sortir poliment)",
    ],
    example:
      "Objection : « C'est trop cher. » Peur sous-jacente cartographiée : pas sûr que ça marche pour moi spécifiquement, peur de dépenser sans résultat, peur du jugement de l'entourage, peur de s'engager dans quelque chose qu'il ne finira pas. Réponse qui adresse la peur (pas l'argument prix) : témoignage d'un client dans une situation similaire + garantie de remboursement si pas de résultat après 30 jours. La réponse au prix (fractionner, montrer le ROI) vient après, en appui de la réassurance émotionnelle.",
    takeaways: [
      "Les objections les plus fréquentes ont presque toujours une peur émotionnelle derrière l'argument rationnel",
      "Répondre à l'argument sans répondre à la peur = réponse qui ne convainc pas",
      "La cartographie des objections est un exercice à refaire régulièrement — les peurs de vos clients évoluent",
    ],
  },

  "3-5": {
    objective:
      "Reformuler les caractéristiques d'un produit ou service en bénéfices mentaux — ce que ça change dans la vie et la tête du client, pas ce que ça fait techniquement.",
    keyPoints: [
      "La distinction caractéristique / bénéfice fonctionnel / bénéfice mental est appliquée",
      "Chaque caractéristique listée est traduite en « et donc pour vous… »",
      "Le bénéfice mental (émotion, identité, soulagement, statut) est identifié au-delà du bénéfice fonctionnel",
      "La formulation obtenue est testée mentalement : est-ce que ça parle immédiatement à quelqu'un qui n'a pas encore acheté ?",
    ],
    example:
      "Produit : logiciel de comptabilité automatisée. Caractéristique : synchronisation bancaire en temps réel. Bénéfice fonctionnel : vous n'avez plus à entrer les transactions manuellement. Bénéfice mental : vous n'avez plus ce sentiment d'angoisse quand vous ouvrez votre tableau de bord — vos chiffres sont toujours à jour, vous savez exactement où vous en êtes. L'accroche qui vend n'est pas « synchronisation automatique » mais « finissez chaque semaine en sachant exactement combien vous avez gagné. »",
    takeaways: [
      "Les clients n'achètent pas des fonctionnalités — ils achètent la disparition d'une douleur ou l'apparition d'un sentiment positif",
      "Caractéristique → bénéfice fonctionnel → bénéfice mental : les trois niveaux sont nécessaires, le dernier est le plus puissant",
      "Si vous ne pouvez pas dire « et donc vous ressentez… » après une caractéristique, vous n'avez pas encore trouvé le vrai bénéfice",
    ],
  },

  // ─── MODULE 4 — Construire une offre qui donne envie d'acheter ────────────

  "4-1": {
    objective:
      "Réécrire une offre floue en offre claire, mesurable et immédiatement compréhensible en 10 secondes.",
    keyPoints: [
      "La promesse réécrite est concrète : elle dit quoi, pour qui, avec quel résultat ou en combien de temps",
      "Un élément mesurable est présent (chiffre, délai, résultat observable)",
      "Le mécanisme est évoqué (comment ça marche, même brièvement)",
      "Le test des 10 secondes est passé : quelqu'un d'inconnu comprend immédiatement ce que vous proposez",
    ],
    example:
      "Avant : « Accompagnement personnalisé pour les entrepreneurs. » Après : « Je vous aide à décrocher vos 3 premiers clients en 60 jours — sans réseau, sans publicité — grâce à une méthode de prospection directe éprouvée. Essai gratuit 14 jours. » Analyse : promesse claire (3 clients), délai (60 jours), mécanisme évoqué (prospection directe), garantie d'entrée (essai gratuit). Quelqu'un qui lit ça en 10 secondes sait exactement ce qu'il obtiendrait et si ça le concerne.",
    takeaways: [
      "Une offre floue protège le vendeur de la déception mais empêche le prospect de s'identifier",
      "Mesurable = crédible : un résultat chiffré est toujours plus convaincant qu'un adjectif vague",
      "Si vous ne pouvez pas écrire votre offre en une phrase, c'est qu'elle n'est pas encore assez claire dans votre tête",
    ],
  },

  "4-3": {
    objective:
      "Identifier ce qui rend une offre plus convaincante qu'une autre en analysant les éléments de preuve et de réassurance présents.",
    keyPoints: [
      "Les deux offres comparées sont suffisamment similaires pour que la comparaison soit révélatrice",
      "Les éléments de preuve de l'offre « gagnante » sont listés et nommés précisément",
      "L'absence ou la faiblesse de ces éléments dans l'offre « perdante » est identifiée",
      "Un transfert concret est fait vers sa propre offre : qu'est-ce que je peux ajouter ou améliorer ?",
    ],
    example:
      "Comparaison de deux formations en ligne sur la gestion du temps. Offre A : design sobre, titre générique, liste de modules, prix, CTA. Offre B : même prix mais titre avec promesse précise (« Récupérez 10h par semaine en 21 jours »), 3 témoignages vidéo avec résultats concrets, FAQ de 8 questions, badge « 4.8/5 sur 2 400 avis », garantie 30 jours. Offre B gagnante. Éléments clés : preuve sociale forte, promesse mesurable, réassurance finale (garantie). Application à ma propre offre : je n'ai pas de FAQ, et mes témoignages ne mentionnent pas de résultat — je commence par ça.",
    takeaways: [
      "La preuve sociale convaincante est spécifique (chiffres, résultats, profils reconnaissables), pas générique",
      "Une FAQ répond aux objections restantes juste avant la décision — c'est souvent l'élément qui manque",
      "Observer ce que fait la concurrence mieux que vous est le moyen le plus rapide d'identifier vos angles morts",
    ],
  },

  "4-5": {
    objective:
      "Tester si un inconnu comprend l'offre en 10 secondes et identifier ce qui la rend confuse ou peu percutante.",
    keyPoints: [
      "Le test est effectué avec au moins 2 personnes ne connaissant pas l'offre",
      "Les réponses sont notées sans influence (pas de correction pendant le test)",
      "Les zones d'incompréhension ou d'indifférence sont identifiées précisément",
      "Une version améliorée est proposée sur la base du feedback, pas de l'intuition",
    ],
    example:
      "Page testée : offre d'un traiteur pour événements d'entreprise. Version 1 testée : « Des repas d'exception pour vos moments importants. » Résultat 3 personnes : 1 pense que c'est pour les mariages, 1 ne sait pas ce que ça inclut, 1 se demande pourquoi ça serait différent des autres traiteurs. Version 2 après retours : « Buffets et cocktails pour événements entreprises à Paris — devis en 24h, livraison incluse. » Résultat : 3/3 comprennent, 2/3 posent des questions sur le prix (signal d'intérêt). Ce que ce test a révélé : « exception » ne parle pas, « concrétude » parle.",
    takeaways: [
      "Votre entourage comprend votre offre parce qu'il vous connaît — testez avec des inconnus",
      "Si la personne testée pose des questions, c'est un signe d'intérêt — notez les questions plutôt que de répondre",
      "La meilleure accroche n'est souvent pas celle que vous aviez imaginée — c'est celle que le test révèle",
    ],
  },

  // ─── MODULE 5 — Parler pour vendre ────────────────────────────────────────

  "5-2": {
    objective:
      "Créer une trame de questions structurée pour la phase de découverte client, utilisable en conditions réelles sans réciter un script.",
    keyPoints: [
      "Les questions couvrent les 4 niveaux SPIN : Situation, Problème, Implications, Need-payoff",
      "Les questions sont ouvertes (pas de réponse oui/non) et invitent le client à développer",
      "Des relances sont prévues pour les moments de silence ou de réponse courte",
      "Le rôle-play révèle les vrais manques : questions trop fermées, ordre illogique, oublis",
    ],
    example:
      "Trame pour un consultant en marketing digital. S (Situation) : « Comment gérez-vous actuellement votre acquisition de clients ? » P (Problème) : « Qu'est-ce qui vous frustre le plus dans votre approche actuelle ? » I (Implication) : « Si ça reste ainsi les 6 prochains mois, quel impact ça aurait sur votre activité ? » N (Need-payoff) : « Si vous trouviez un système qui vous apportait 5 nouveaux clients par mois de façon prévisible, comment ça changerait votre quotidien ? » Relance type : « Vous dites que X vous pose problème — pouvez-vous me donner un exemple récent ? »",
    takeaways: [
      "SPIN n'est pas un script rigide — c'est un ordre logique pour amener le client à prendre conscience de son besoin",
      "La question Need-payoff est la plus puissante : elle fait imaginer la solution au client avant que vous la proposiez",
      "Un rôle-play honnête révèle toujours 2-3 angles morts que vous n'aviez pas anticipés",
    ],
  },

  "5-3": {
    objective:
      "Transformer les objections les plus fréquentes en échanges constructifs grâce à la reformulation — valider avant de répondre, répondre à la peur pas à l'argument.",
    keyPoints: [
      "La reformulation est distincte de la réponse : c'est une étape séparée",
      "La reformulation utilise les mots du client et se termine par « c'est bien ça ? »",
      "La réponse proposée s'adresse à la peur identifiée sous l'objection, pas à l'argument de surface",
      "Le ton est empathique, pas défensif — pas de « oui mais »",
    ],
    example:
      "Objection : « Je n'ai pas le temps. » Reformulation : « Si je comprends bien, votre souci principal c'est de ne pas pouvoir vous y consacrer correctement en ce moment, c'est ça ? » Client confirme. Réponse à la peur (pas à l'argument du temps) : « C'est exactement pour ça que ce programme est conçu en modules de 20 minutes. La plupart des participants le font le matin ou pendant leur trajet. Et si vous trouvez que c'est trop chronophage dans les 30 premiers jours, je vous rembourse intégralement. » La reformulation a révélé que la vraie peur était l'engagement, pas le manque de temps.",
    takeaways: [
      "Reformuler avant de répondre montre que vous écoutez vraiment — c'est aussi un gain de temps pour ne pas répondre à côté",
      "« C'est bien ça ? » est essentiel — si le client corrige, vous avez évité de répondre à la mauvaise objection",
      "Les meilleures réponses aux objections adressent une peur, pas un argument — c'est pour ça qu'elles convainquent",
    ],
  },

  "5-5": {
    objective:
      "S'entraîner à mener une vente complète en temps limité pour développer les réflexes de découverte rapide, de présentation ciblée et de closing naturel.",
    keyPoints: [
      "La découverte se fait en 2-3 questions seulement — l'essentiel est recueilli rapidement",
      "La présentation ne dure pas plus de 60 secondes — adaptée à ce qui a été dit en découverte",
      "Le closing est une proposition naturelle : « On fait comment pour avancer ? » pas une pression",
      "Le débriefing post-simulation est honnête sur ce qui n'a pas fonctionné",
    ],
    example:
      "Simulation : rencontre en 5 minutes dans un salon professionnel. Questions posées : « Quel est votre plus gros challenge en ce moment côté clients ? » + « Qu'avez-vous déjà essayé ? ». Présentation ciblée (60s) : basée sur le challenge mentionné, sans tout décrire. Closing naturel : « Si c'est pertinent pour vous, on pourrait faire 30 minutes en visio cette semaine — je vous montrerais concrètement comment ça s'appliquerait à votre situation. » Points à améliorer identifiés : j'ai eu tendance à décrire trop de bénéfices au lieu d'en choisir un seul lié à ce qu'il a dit.",
    takeaways: [
      "En 5 minutes, une seule question bien posée vaut mieux que cinq questions génériques",
      "Le closing naturel propose une prochaine étape concrète, pas une décision d'achat immédiate",
      "La simulation révèle toujours la même chose : on parle trop de son offre et pas assez du problème du client",
    ],
  },

  // ─── MODULE 6 — Écrire pour vendre ────────────────────────────────────────

  "6-1": {
    objective:
      "Réécrire une page de vente existante en appliquant la structure AIDA ou PAS, avec les bonnes pratiques de copywriting.",
    keyPoints: [
      "La structure est identifiable : Attention, Intérêt, Désir, Action (ou Problème, Agitation, Solution)",
      "Le ratio « nous » vs « vous » a été inversé en faveur du client",
      "Les titres et sous-titres suffisent pour comprendre l'offre sans lire le corps",
      "Au moins un élément de preuve (témoignage, chiffre) a été ajouté ou amélioré",
    ],
    example:
      "Avant : « Notre agence propose des services de communication digitale innovants et sur mesure pour les PME. » Après (AIDA) : Attention — « Vos concurrents ont déjà 10x plus de visibilité que vous sur Google. » Intérêt — « 78 % des PME de votre secteur ne maîtrisent pas leur acquisition digitale. Voici pourquoi. » Désir — « Nos clients doublent leur trafic en 90 jours — avec la même équipe, sans embauche. » Action — « Recevez votre audit gratuit en 48h. » Avant/après illustre la transformation : d'un texte centré sur l'agence à un texte centré sur la douleur et le résultat du client.",
    takeaways: [
      "AIDA n'est pas une recette magique — c'est un guide de la progression émotionnelle du lecteur",
      "La réécriture la plus impactante est souvent de remplacer tous les « nous » par des « vous »",
      "Tester la version réécrite avec une personne extérieure est indispensable — votre perception est biaisée",
    ],
  },

  "6-2": {
    objective:
      "S'entraîner à vendre en quelques lignes — l'exercice de synthèse ultime qui révèle si on sait ce qui compte vraiment dans son offre.",
    keyPoints: [
      "L'objet de l'email (ou titre de la section) capte l'attention sans être vague ni clickbait",
      "Le problème est mentionné en 1-2 phrases maximum — reconnaissable par le lecteur cible",
      "La solution est présentée en 1 phrase — pas de liste de features",
      "Le CTA est unique, clair, et dit ce que le lecteur obtiendra en cliquant",
    ],
    example:
      "Email de prospection pour un service de comptabilité automatisée (6 lignes). Objet : « Combien d'heures passez-vous en comptabilité chaque mois ? » Corps : « Bonjour [Prénom], les freelances que j'accompagne passent en moyenne 8h/mois sur leur comptabilité. Avec [Service], cette tâche tombe à 45 minutes — synchronisation bancaire automatique, déclarations TVA pré-remplies. Résultat : Mehdi a récupéré 7h/mois dès le premier mois. Vous voulez voir comment ça s'applique à votre situation ? » CTA : « Répondez juste \'oui\' — je vous envoie une démo de 5 minutes. » Ce qui marche : question d'ouverture personnelle, chiffre concret, preuve sociale courte, friction minimale pour le CTA.",
    takeaways: [
      "Si vous ne pouvez pas vendre en 6 lignes, vous n'avez pas encore trouvé l'essentiel",
      "L'objet de l'email est plus important que le corps — c'est lui qui décide si on lit",
      "Un CTA avec friction minimale (répondre « oui ») convertit bien plus qu'un lien vers une page de vente complexe",
    ],
  },

  "6-3": {
    objective:
      "Développer le réflexe d'épuration en supprimant tout ce qui n'ajoute pas de valeur ou de persuasion dans un texte commercial.",
    keyPoints: [
      "Le texte est réduit d'au moins 20-30 % sans perte de sens ou de force persuasive",
      "Les adverbes intensifs inutiles sont supprimés (très, vraiment, particulièrement…)",
      "Les tournures passives sont transformées en phrases actives",
      "Les phrases d'introduction vagues qui retardent l'entrée dans le vif du sujet sont coupées",
    ],
    example:
      "Avant (90 mots) : « Dans le monde actuel du marketing digital en constante évolution, il est devenu vraiment indispensable pour les entreprises modernes de vraiment comprendre l'importance cruciale d'une présence en ligne solide et efficace qui leur permettra de se démarquer véritablement de la concurrence. » Après (22 mots) : « Vos clients cherchent vos concurrents en ligne. Si vous n'êtes pas visible, vous perdez ces clients. Voici comment changer ça. » Résultat : -76 % de mots, +100 % de clarté et d'impact. Ce qui a été supprimé : emphases vides, répétitions de l'idée, tournures passives, introduction vague.",
    takeaways: [
      "Chaque mot non nécessaire dilue l'impact des mots nécessaires",
      "La « coupe sans pitié » est douloureuse la première fois — elle devient un réflexe avec la pratique",
      "Un texte épuré donne une image de confiance et de maîtrise — le bavardage signale l'insécurité",
    ],
  },

  // ─── MODULE 7 — Marketing digital et acquisition ──────────────────────────

  "7-3": {
    objective:
      "Choisir et justifier le canal d'acquisition le plus pertinent selon son activité, son audience et ses ressources — pour concentrer ses efforts au bon endroit.",
    keyPoints: [
      "Le canal choisi est justifié par des arguments liés à l'audience (où est-elle ?) et aux ressources (budget, temps, compétences)",
      "L'inadéquation des autres canaux est expliquée brièvement",
      "Les actions concrètes prévues sur ce canal sont spécifiques, pas vagues (pas « créer du contenu » mais « 1 article de 800 mots par semaine sur le thème X »)",
      "Le délai de résultat réaliste est estimé (organique = 3-6 mois, payant = immédiat mais continu)",
    ],
    example:
      "Activité : coach en gestion du stress pour managers. Audience cible : RH et managers dans des entreprises de 50-500 salariés — actifs sur LinkedIn. Ressources : 4h/semaine disponibles, budget nul. Canal principal choisi : LinkedIn organique. Actions concrètes : 2 posts/semaine sur les signaux de burnout non reconnus + 1 article long/mois sur les outils de gestion du stress en entreprise. Canaux écartés : Instagram (audience trop grand public), Google Ads (budget insuffisant pour le CPC B2B). Délai réaliste : premiers résultats organiques en 3-4 mois, construction d'autorité sur 6-12 mois.",
    takeaways: [
      "Être présent sur tous les canaux sans ressources = être invisible partout — un canal maîtrisé vaut mieux que cinq médiocres",
      "Le bon canal n'est pas le plus populaire — c'est celui où votre audience spécifique est la plus active et réceptive",
      "La stratégie de contenu la plus efficace est celle qu'on peut tenir dans la durée avec les ressources disponibles",
    ],
  },

  "7-5": {
    objective:
      "Analyser une collaboration influenceur réelle pour comprendre pourquoi elle a fonctionné ou échoué, et en tirer des critères de sélection applicables.",
    keyPoints: [
      "L'adéquation influenceur-marque-audience est évaluée (pas juste la taille de l'audience)",
      "La crédibilité perçue du message est analysée : sonnait-il authentique ou artificiel ?",
      "Les résultats sont évalués au-delà des vanity metrics (pas seulement les vues ou likes)",
      "Les risques identifiés sont concrets : faux abonnés, mauvaise démographie, scandale potentiel…",
    ],
    example:
      "Cas analysé : collaboration d'une marque de café spécialisé avec un micro-influenceur barista (8 500 abonnés, taux d'engagement 7 %). Ce qui a fonctionné : audience ultra-ciblée (passionnés de café), message authentique (il utilisait déjà la marque avant), démonstration de préparation en vidéo (preuve concrète). Résultat estimé : 340 clics vers le site, 28 commandes directement attribuables. Vs macro-influenceur lifestyle à 450k abonnés même budget : 2 200 vues, 12 commandes. Ratio conversion 5× supérieur pour le micro. Leçon : taille de communauté < qualité de l'engagement et pertinence.",
    takeaways: [
      "Micro-influenceur spécialisé > macro-influenceur généraliste pour la conversion — l'engagement prime sur la portée",
      "L'authenticité n'est pas un sentiment vague — elle se mesure : est-ce que l'influenceur utilisait déjà le produit ?",
      "Un partenariat réussi est celui où l'audience ne voit pas une pub mais une recommandation personnelle",
    ],
  },

  "7-6": {
    objective:
      "S'entraîner à réécrire un message marketing agressif ou trompeur en conservant sa force persuasive mais en restant honnête, crédible et respectueux.",
    keyPoints: [
      "Le message original est identifié comme problématique : promesse irréaliste, urgence artificielle, superlatifs non prouvés",
      "La version réécrite conserve l'intention persuasive sans les éléments trompeurs",
      "Des preuves ou éléments concrets remplacent les superlatifs vides",
      "L'urgence, si elle est conservée, est réelle et justifiée",
    ],
    example:
      "Original : « DERNIER JOUR — Offre EXCEPTIONNELLE et UNIQUE à -70 % !!! Votre vie va CHANGER ! Ne ratez PAS cette opportunité qui n'arrivera JAMAIS PLUS ! » Réécrit : « Cette offre se ferme vendredi à minuit (on n'ouvre que 2 fois par an). Les 3 dernières éditions ont eu en moyenne 47 participants qui ont mis en pratique et 68 % ont atteint leur objectif en 90 jours. Si vous êtes dans les 30 premières personnes, je vous offre en plus une session individuelle de 30 minutes. » Ce qui a changé : urgence réelle (fermeture justifiée), preuve concrète (résultats des éditions passées), bonus tangible. Ce qui est resté : incitation à agir maintenant — mais pour une raison vraie.",
    takeaways: [
      "Un message qui abuse des majuscules et des points d'exclamation signale le manque de preuve — si vous en avez, vous n'en avez pas besoin",
      "Remplacer un superlatif par un chiffre est la transformation la plus simple et la plus efficace",
      "La persuasion éthique ne sacrifie pas la force — elle remplace le mensonge par la preuve",
    ],
  },

  "7-7": {
    objective:
      "Concevoir un mini-tunnel de vente en 3 étapes avec un message adapté à chaque stade du parcours prospect — de la découverte à l'achat.",
    keyPoints: [
      "Les 3 étapes correspondent à des états mentaux distincts du prospect : je découvre / je m'intéresse / je décide",
      "Le message de l'étape 1 ne cherche pas à vendre — il capte l'intérêt par de la valeur",
      "La transition entre les étapes est logique et naturelle (pas un saut brusque)",
      "L'étape 3 inclut un élément de réassurance finale (garantie, témoignage, FAQ)",
    ],
    example:
      "Tunnel pour un service de coaching commercial. Étape 1 (découverte) : article LinkedIn « Les 3 erreurs qui font rater vos closings » + CTA doux : « Téléchargez les 10 questions de découverte qui changent tout. » Étape 2 (intérêt) : email de nurturing avec cas client concret + invitation à un webinaire gratuit de 45 min sur « Comment structurer un entretien de vente. » Étape 3 (décision) : email post-webinaire avec témoignages, présentation de l'accompagnement, garantie remboursement 30 jours, CTA direct vers un appel découverte. Chaque étape a un seul objectif — passer à la suivante, pas tout faire en une fois.",
    takeaways: [
      "Un tunnel simple mais cohérent convertit mieux qu'une page de vente parfaite envoyée à froid",
      "Le message doit correspondre au niveau de confiance du prospect — vendre à l'étape 1 détruit la relation",
      "La transition entre les étapes doit être proposée, pas forcée — l'opt-in libre génère plus d'engagement",
    ],
  },

  // ── MODULE 8 — MISE EN PRATIQUE FINALE ──────────────────────────────────────

  "8-1": {
    objective:
      "Produire une offre commerciale complète et utilisable immédiatement, en mobilisant tous les modules précédents : promesse claire (M4), bénéfices client (M3), biais utiles (M2), formulation (M6), prix et garantie (M4).",
    keyPoints: [
      "La promesse centrale est claire, mesurable et compréhensible en 10 secondes",
      "Les bénéfices sont exprimés du point de vue du client (Module 3) — pas du produit",
      "Le prix est contextualisé et la garantie réduit le risque perçu (Module 4)",
      "La formulation est simple, sans jargon, sans superlatifs creux (Module 6)",
      "Le document est autonome : il convainc si lu seul, sans explication orale",
    ],
    example:
      "Offre pour un service de conseil en recrutement. Promesse : « Trouvez votre prochain collaborateur clé en moins de 6 semaines — ou nous recommençons sans frais. » Bénéfices : gain de temps pour le dirigeant, réduction du risque de mauvais recrutement, accès à un réseau qualifié. Prix ancré sur le coût d'un mauvais recrutement (3 à 6 mois de salaire). Garantie remboursement 30 jours. Structure visuelle claire : titre fort, 3 bénéfices principaux, mécanisme en 3 étapes, preuves (témoignages), prix, garantie, appel à l'action.",
    takeaways: [
      "Une offre qui se comprend en 10 secondes convertit — si quelqu'un doit demander 'mais concrètement, qu'est-ce que j'achète ?', c'est à retravailler",
      "Faites relire par une personne extérieure qui ne connaît pas le produit — ses questions sont vos trous dans l'argumentaire",
      "Le livrable final doit être utilisable en vrai : page de vente, brochure ou devis prêt à envoyer",
    ],
  },

  "8-2": {
    objective:
      "Maîtriser un script d'entretien de vente complet — de l'accueil au closing — structuré, mémorisé et adaptable selon le profil du prospect.",
    keyPoints: [
      "Toutes les phases sont couvertes : accueil, découverte (questions ouvertes), présentation de l'offre, traitement des objections, closing",
      "Les questions de découverte sont ouvertes et permettent au prospect de parler plus de 50 % du temps (Module 5)",
      "Le script intègre les leviers du cerveau vus en Module 1 et 2 sans forcer",
      "Les objections principales sont anticipées et préparées avec des réponses factuelles",
      "Le closing est naturel — il découle de la découverte, pas d'une pression",
    ],
    example:
      "Script pour un entretien de 45 min avec un prospect chef d'entreprise. Accueil (2 min) : cadre l'entretien, pose les attentes. Découverte (20 min) : 5 questions ouvertes sur le contexte, les enjeux, ce qui a déjà été tenté, les critères de décision. Présentation (15 min) : les 3 points clés de l'offre répondant exactement aux enjeux exprimés. Objections (5 min) : « Votre prix est élevé » → ancrer sur le coût du problème non résolu. Closing (3 min) : reformuler l'accord, définir les prochaines étapes concrètes.",
    takeaways: [
      "Un script n'est pas un texte à lire — c'est une structure à intégrer pour improviser en confiance",
      "La qualité de la découverte détermine la qualité du closing : plus vous écoutez en phase 2, moins vous avez besoin de forcer en phase 5",
      "Entraînez-vous avec un profil difficile (objections multiples) — si vous gérez le cas difficile, le cas facile devient naturel",
    ],
  },

  "8-3": {
    objective:
      "Transposer l'argumentaire oral en version écrite autonome et persuasive — email, proposition commerciale ou page de vente — en appliquant les principes du Module 6.",
    keyPoints: [
      "La version écrite suit une structure qui convertit (Module 6) : accroche, problème, solution, preuves, CTA",
      "Le ton est adapté à l'écrit : plus direct et concis qu'à l'oral, sans perdre l'engagement",
      "Le document est autonome : pas besoin d'explication orale pour comprendre et vouloir acheter",
      "Les éléments de réassurance sont présents (témoignages, garantie, FAQ implicite)",
      "L'appel à l'action est clair, unique et positionné au bon endroit",
    ],
    example:
      "Email de prospection pour un service de formation commerciale. Objet : « Comment votre équipe perd 30 % de ses ventes (et comment l'éviter). » Corps : 3 lignes sur le problème reconnu par le prospect, 2 lignes sur la transformation possible, 1 preuve courte (résultat client), 1 CTA direct (appel 20 min). Pas de paragraphe > 3 lignes. Pas de superlatif. Un seul message, un seul objectif.",
    takeaways: [
      "L'email ou la page de vente qui ne répond pas immédiatement à 'en quoi ça me concerne ?' est ignoré — commencez par le problème, pas par vous",
      "Relisez à voix haute : si ça sonne faux ou commercial à l'excès, le prospect le ressent aussi à l'écrit",
      "Un bon écrit de vente peut se résumer en une phrase — si vous ne savez pas le faire, c'est que le message n'est pas encore assez clair",
    ],
  },

  "8-4": {
    objective:
      "Tester ses compétences en conditions quasi-réelles, identifier ses points forts et ses axes d'amélioration, et établir un plan de progression concret.",
    keyPoints: [
      "La simulation est réalisée avec une personne extérieure (pas un collègue habituel) jouant un persona défini",
      "L'entretien est mené de bout en bout sans interruption — découverte, argumentation, objections, closing",
      "Le débriefing post-simulation est structuré : ce qui a bien fonctionné, ce qui est à améliorer, pourquoi",
      "Un plan d'amélioration continue est établi : axes précis, méthode de travail, date de revue",
    ],
    example:
      "Simulation pour un freelance en stratégie digitale. Persona : dirigeant d'une PME, 50 salariés, a déjà travaillé avec une agence et a été déçu. Objection principale : 'Je ne veux pas retravailler avec un prestataire externe.' Après la simulation, débriefing : point fort identifié = très bonne phase de découverte (écoute, questions pertinentes). Point à améliorer = présentation trop longue du service sans relier aux problèmes exprimés. Plan : réécrire la phase de présentation pour qu'elle soit en miroir de la découverte. Revue dans 2 semaines après 3 nouvelles simulations.",
    takeaways: [
      "La simulation révèle les automatismes inconscients — ce qu'on croit faire et ce qu'on fait réellement sont souvent différents",
      "Le débriefing est aussi important que la simulation : sans analyse, la pratique renforce les mauvaises habitudes autant que les bonnes",
      "Le plan d'amélioration continue transforme une compétence en développement constant — c'est ce qui distingue un vendeur qui progresse d'un vendeur qui stagne",
    ],
  },
};
