/**
 * CONTENU PREMIUM - SERVER ONLY
 *
 * CE FICHIER NE DOIT JAMAIS ETRE IMPORTE DANS UN COMPOSANT CLIENT.
 * L'import "server-only" garantit une erreur de build si quelqu'un essaie.
 *
 * Utilisation: Uniquement dans les Server Components sous /membre/*
 */
import "server-only";

// Types
export interface Exercise {
  title: string;
  description: string;
  correction?: string[]; // Correction pédagogique — affichée après validation
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  content?: string[];
  takeaways: string[];
  exercise?: Exercise;
}

export interface StandaloneExercise {
  id: number;
  title: string;
  description: string;
}

export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
  standaloneExercises?: StandaloneExercise[];
}

export interface Template {
  id: string;
  title: string;
  description: string;
  type: "PDF" | "Template" | "Schema";
  moduleId?: number;
  downloadUrl?: string;
}

// ============================================================================
// CONTENU PREMIUM COMPLET - 8 MODULES, 43 LEÇONS THÉORIQUES + 4 PRATIQUES
// ============================================================================

export const programModules: Module[] = [
  {
    id: 1,
    title: "Comment le cerveau prend une décision d’achat",
    lessons: [
      {
        id: 1,
        title: "Pourquoi nous n’achetons jamais de manière rationnelle",
        description:
          "La plupart des vendeurs construisent leur argumentation sur la logique. Problème : ce n’est pas la raison qui achète. 70 à 95 % des décisions d’achat sont pilotées par des processus émotionnels ou automatiques inconscients.",
        content: [
          "De nombreuses études en neurosciences et psychologie comportementale convergent vers le même constat : entre 70 et 95 % des décisions d’achat sont pilotées par des processus émotionnels ou automatiques inconscients. Les recherches Gallup le confirment : environ 70 % des décisions d’achat reposent sur des facteurs émotionnels, contre 30 % seulement sur des facteurs rationnels.",
          "Ce n’est pas que le client est irrationnel. C’est que le cerveau humain décide d’abord avec les émotions, puis utilise la raison pour justifier ce choix après coup. Le neuroscientifique Antonio Damasio l’a démontré : ses patients présentant des lésions dans les zones émotionnelles du cerveau conservaient un raisonnement intact, mais se retrouvaient incapables de prendre la moindre décision. Sans émotion, pas de décision.",
          "En pratique : quelqu’un achète un smartphone sur un coup d’œil, puis expliquera que c’était « un bon investissement », que l’appareil photo est « professionnel », que l’ancien modèle « était trop lent ». Ces justifications sont réelles — mais elles sont arrivées après la décision, pas avant. Un vendeur qui ne parle qu’aux arguments logiques passe à côté de l’essentiel.",
        ],
        takeaways: [
          "70 à 95 % des décisions d’achat sont émotionnelles ou automatiques (Gallup)",
          "Le client achète d’abord avec ses émotions, puis rationalise — la raison valide, elle ne décide pas",
          "Sans émotion, la décision est neurobiologiquement impossible (Damasio, 1994)",
        ],
        exercise: {
          title: "Analyse d’un achat personnel récent",
          description:
            "Choisissez un achat récent un peu impulsif. Identifiez : (1) l’émotion réelle qui a déclenché l’achat (envie, peur de manquer, désir de statut, soulagement…), (2) les justifications rationnelles que vous vous êtes données après. Observez l’écart entre les deux. Ce mécanisme est exactement celui que vivent vos clients.",
        },
      },
      {
        id: 2,
        title: "Émotion d’abord, justification ensuite",
        description:
          "Comprendre l’ordre dans lequel la décision d’achat se déroule change radicalement la façon de construire un discours de vente. Le déclencheur est toujours émotionnel — la raison n’intervient qu’après.",
        content: [
          "L’être humain est ce qu’on pourrait appeler un « être rationalisant » : parfaitement capable de raisonnement logique, mais ce raisonnement intervient après la décision, pour la valider et la défendre. Le processus réel : un stimulus crée une réaction émotionnelle (désir, peur, curiosité), cette émotion génère une impulsion d’achat, puis le cerveau rationnel sélectionne les arguments qui confirment l’envie initiale.",
          "Ce dernier point est crucial : le cerveau ne cherche pas la vérité, il cherche la confirmation. C’est le biais de confirmation à l’œuvre. Le client qui a envie d’acheter trouvera des raisons d’acheter. Celui qui n’a pas envie trouvera des raisons de ne pas acheter — et aucun argument logique ne le changera sans un changement émotionnel préalable.",
          "Exemple : un couple visite un appartement. En entrant dans la cuisine, l’un d’eux sent intérieurement « c’est lui ». La visite continue, ils notent tout — mais la décision est déjà prise. Ils retravailleront mentalement les défauts pour les minimiser. Le bon ordre pour le vendeur : déclencher l’émotion d’abord, fournir les arguments ensuite.",
        ],
        takeaways: [
          "Le déclencheur d’achat est toujours une impulsion émotionnelle, jamais un calcul rationnel",
          "Le cerveau sélectionne les preuves qui confirment l’envie déjà présente — il ne cherche pas la vérité",
          "Changer d’avis sans changement émotionnel préalable est presque impossible",
        ],
      },
      {
        id: 3,
        title: "Le rôle de l’attention (ce qui capte / ce qui est ignoré)",
        description:
          "Avant de déclencher une émotion, il faut franchir une première barrière : exister dans l’esprit du client. Dans un monde saturé, la majorité des messages de vente sont tout simplement ignorés.",
        content: [
          "En 2024, on estime qu’un individu est exposé à plus de 1 200 messages publicitaires par jour — contre environ 300 dans les années 1980. Face à cette surcharge, le cerveau a développé un filtre automatique puissant : il ne laisse passer que ce qui est pertinent, saillant, ou porteur d’une forte charge émotionnelle.",
          "Ce filtre opère selon trois critères : le contraste (ce qui rompt avec l’environnement ambiant), la pertinence personnelle (ce qui concerne directement mes préoccupations du moment), et la charge émotionnelle (ce qui suscite immédiatement peur, désir, curiosité ou humour). Les études d’eye-tracking le confirment : sur une page web, 80 % des regards se concentrent sur 20 % des zones. Le reste est invisible.",
          "Conséquence directe : si les 3 premières secondes de votre message ne passent pas ce filtre, le reste n’existe pas. Un titre générique « Bienvenue sur notre site » vs « Vous perdez 3 heures par jour à cause de cette erreur » — le second capte l’attention par contraste et pertinence personnelle. Le vendeur efficace oriente l’attention sur les éléments clés et élimine le superflu.",
        ],
        takeaways: [
          "Le cerveau filtre 95 % des stimuli — passer ce filtre est la première mission du vendeur",
          "Trois clés de l’attention : contraste, pertinence personnelle, charge émotionnelle",
          "Les 3 premières secondes (ou mots) déterminent si le reste sera lu ou entendu",
        ],
        exercise: {
          title: "Déconstruction d’une publicité",
          description:
            "Choisissez une publicité qui vous a arrêté dans votre scrolling. Analysez : (1) quel mécanisme a capté votre attention en premier (contraste visuel, mot fort, question, émotion ?), (2) à quel désir ou peur personnelle cela répondait-il, (3) comment la suite du message a maintenu cette attention. Ce modèle devient votre référence pour construire vos propres accroches.",
        },
      },
      {
        id: 4,
        title: "La peur de perdre vs le désir de gagner",
        description:
          "Toute décision d’achat est motivée par deux forces : fuir une douleur ou atteindre un plaisir. Ces deux moteurs n’ont pas le même poids — et comprendre cette asymétrie change profondément la façon de présenter une offre.",
        content: [
          "Kahneman et Tversky ont formalisé l’aversion à la perte : la douleur psychologique de perdre quelque chose est environ deux fois plus intense que le plaisir d’en gagner l’équivalent. Perdre 100 € est ressenti comme deux fois plus douloureux que gagner 100 € est agréable. Ce n’est pas rationnel — c’est neurologique.",
          "Pour le vendeur, cela crée une hiérarchie des leviers : la douleur actuelle (ce que le client souffre déjà) est le levier le plus fort, suivie de la perte imminente (ce qu’il risque de perdre s’il n’agit pas), puis du gain potentiel (ce qu’il obtiendrait en agissant). Un discours centré uniquement sur les bénéfices positifs passe à côté du levier le plus puissant.",
          "Exemple saisissant : la vente de chaudières. Tant que l’ancienne fonctionne, peu de clients agissent malgré les arguments d’économie d’énergie. Dès qu’elle tombe en panne un soir d’hiver, l’achat devient immédiat — la douleur est réalisée. Le meilleur discours combine les deux : « Voici ce que vous gagnez / voici ce que vous arrêtez de subir. »",
        ],
        takeaways: [
          "L’aversion à la perte est 2× plus forte que le désir de gain (Kahneman & Tversky, 1979)",
          "Levier le plus puissant : rendre visible une douleur existante ou une perte imminente",
          "Combiner les deux moteurs : gain potentiel + arrêt de douleur = double déclencheur",
        ],
      },
      {
        id: 5,
        title: "Différence entre décision rapide et décision réfléchie",
        description:
          "Le client ne prend pas toutes ses décisions de la même façon. Comprendre les deux modes de décision permet d’adapter son approche — et d’éviter de perdre des ventes en sur-expliquant.",
        content: [
          "Daniel Kahneman distingue deux systèmes de pensée. Le Système 1 est rapide, automatique, émotionnel — il pilote 70 à 95 % de nos décisions quotidiennes (parmi les 5 000 à 6 000 décisions que nous prenons chaque jour) et consomme peu d’énergie. Le Système 2 est lent, analytique, délibéré — il intervient pour les décisions complexes ou à enjeux élevés, mais coûte cher en énergie mentale.",
          "En situation de stress, de fatigue ou de surcharge d’informations, le Système 2 devient moins accessible. Le client patine, hésite, reporte — et finit souvent par ne rien faire. Un client qui dit « je vais réfléchir » signifie souvent que son Système 1 n’a pas été touché — pas que son Système 2 manque d’informations.",
          "La clé pour le vendeur est double : capter le Système 1 d’abord (créer une première impression positive, une émotion de confiance, une envie instinctive), puis satisfaire le Système 2 ensuite (fournir les arguments qui permettent de valider ce que le Système 1 a déjà décidé). Simplifier l’offre réduit la charge du Système 2 et accélère la décision.",
        ],
        takeaways: [
          "Système 1 (rapide, émotionnel) pilote 70 à 95 % des décisions quotidiennes",
          "Système 2 (lent, analytique) valide après coup — il ne décide pas en premier",
          "« Je vais réfléchir » = le Système 1 n’a pas été convaincu, pas un manque d’arguments",
        ],
        exercise: {
          title: "Identifier ce qui fait hésiter vs ce qui fait agir",
          description:
            "Prenez une décision d’achat importante que vous envisagez actuellement. Faites deux colonnes : (1) ce qui vous retient (peurs, doutes, incertitudes), (2) ce qui vous pousse à agir (désirs, urgences, bénéfices attendus). Pour chaque frein, identifiez s’il est rationnel (manque d’information) ou émotionnel (peur). Cette distinction révèle comment vos clients vivent leurs hésitations — et comment les lever.",
        },
      },
    ],
  },
  {
    id: 2,
    title: "Les biais cognitifs vraiment utiles en vente",
    lessons: [
      {
        id: 1,
        title: "Aversion à la perte",
        description:
          "Formulé par Kahneman et Tversky, ce biais établit que la douleur de perdre est environ deux fois plus forte que le plaisir de gagner la même chose. C'est l'un des leviers les plus puissants en vente.",
        content: [
          "L'aversion à la perte signifie qu'une personne moyenne préfère éviter de perdre 100 € plutôt que de gagner 100 €, et qu'elle demandera généralement un gain potentiel au moins deux fois supérieur à une perte pour prendre un risque. En vente, cela se traduit par la puissance des formulations du type « Plus que 2 pièces en stock » ou « Promo valable jusqu'à ce soir minuit ». Ce n'est pas un hasard si les campagnes jouent sur la peur de manquer l'occasion : le cerveau accorde plus d'importance à une perte potentielle qu'à un gain équivalent.",
          "Exemple concret : un site d'hôtel affichant « Plus qu'une chambre à ce tarif » déclenche chez le prospect l'idée qu'en n'achetant pas tout de suite, il va perdre cette opportunité avantageuse. Ce biais, bien utilisé, peut inciter le client à agir immédiatement pour ne pas subir un manque réel.",
          "Ce biais doit être manié avec sincérité. Une fausse rareté ou de fausses urgences répétées risquent de générer de la méfiance à long terme. Il faut donc l'utiliser de façon éthique — signaler une vraie limite de stock ou une date butoir réelle — pour créer un sérieux sentiment d'urgence sans tromper le client.",
        ],
        takeaways: [
          "La douleur de perdre est ressentie 2× plus intensément que le plaisir de gagner (Kahneman & Tversky)",
          "La peur de manquer l'occasion (FOMO) stimule davantage la décision que le seul désir de gain",
          "Seule une rareté ou une urgence réelle est éthique et crédible sur la durée",
        ],
      },
      {
        id: 2,
        title: "Preuve sociale",
        description:
          "En situation d'incertitude, l'être humain regarde naturellement ce que font les autres pour guider son propre choix. C'est le fondement des avis clients, témoignages et indicateurs sociaux.",
        content: [
          "Le biais de preuve sociale signifie que plus une action ou un produit semble approuvé par nos pairs, plus nous aurons confiance pour nous engager nous aussi. En vente, ce principe est omniprésent : les avis clients, témoignages, notes étoiles, chiffres d'utilisateurs sont autant de signaux rassurants.",
          "Les chiffres sont clairs : en 2020, 87 % des Français déclaraient consulter les avis clients avant de prendre une décision d'achat, et 79 % faisaient confiance à ces avis en ligne presque autant qu'à une recommandation personnelle. Afficher « Plus de 10 000 clients satisfaits » ou une note de 4,5/5 basée sur 500 avis va fortement crédibiliser une offre aux yeux d'un prospect hésitant.",
          "Utiliser la preuve sociale en vente : intégrer dans son argumentaire des références à d'autres clients similaires, montrer des cas d'usage, signaler les produits les plus vendus (« best-seller », « plébiscité par les utilisateurs »). Attention : les preuves doivent être véridiques et pertinentes. Un faux témoignage repéré ruinerait définitivement la confiance.",
        ],
        takeaways: [
          "87 % des Français consultent les avis clients avant d'acheter (2020)",
          "Les témoignages spécifiques et vérifiables sont plus convaincants que les affirmations générales",
          "La preuve sociale réduit le risque perçu — elle répond à la question non formulée : « Est-ce que ça marche vraiment ? »",
        ],
        exercise: {
          title: "Inventaire de vos preuves sociales",
          description:
            "Listez toutes les preuves sociales que vous pouvez mobiliser honnêtement : témoignages de clients réels, nombre d'acheteurs, notes, mentions presse, partenaires connus. Pour chaque preuve, évaluez sa spécificité (une preuve vague « client satisfait » vaut moins qu'un témoignage daté avec prénom, métier et résultat chiffré). Objectif : identifier les 3 preuves les plus solides à mettre en avant en priorité.",
        },
      },
      {
        id: 3,
        title: "Effet d'ancrage",
        description:
          "Le cerveau se base sur la première information chiffrée qu'il reçoit comme point de référence. L'ordre de présentation des prix ou des offres influence directement la perception de la valeur.",
        content: [
          "L'effet d'ancrage décrit la tendance du cerveau à utiliser la première information chiffrée reçue comme point de référence (l'« ancre »), même si elle est arbitraire. Si vous montrez d'abord un produit très cher puis un produit moyen, ce dernier semblera bon marché en comparaison relative — alors que présenté isolément, il aurait pu paraître coûteux.",
          "En pratique : annoncer un prix de référence élevé (« le prix conseillé est de 500 € ») permet ensuite de faire paraître attractif un prix remisé à 350 €. De même, présenter en premier une option premium crée un ancrage qui valorise l'option standard. À l'oral comme à l'écrit, il est souvent conseillé de « planter le décor » avec des repères avantageux : évoquer le coût mensuel plutôt qu'annuel (ancre plus petite), ou citer un bénéfice monétaire à long terme avant de mentionner le tarif (ancre positive).",
          "L'ancrage agit même inconsciemment. Il faut donc l'utiliser de façon transparente : le client doit pouvoir comparer en toute connaissance, sans être dupé par un faux comparatif. L'ancrage éthique consiste à présenter de vraies alternatives avec de vraies valeurs — pas à gonfler un prix artificiel pour le « réduire » ensuite.",
        ],
        takeaways: [
          "La première information chiffrée reçue devient le point de référence pour toute évaluation suivante",
          "Présenter l'option premium en premier valorise l'option standard qui suit",
          "L'ancrage s'applique aussi à la valeur : énoncer le bénéfice chiffré avant d'annoncer le prix",
        ],
      },
      {
        id: 4,
        title: "Rareté réelle vs fausse rareté",
        description:
          "Nous accordons plus de valeur à ce qui est rare ou disponible pour peu de temps. Mais seule la rareté authentique construit la confiance sur la durée — la fausse rareté la détruit.",
        content: [
          "La rareté est un levier puissant sur le cerveau : nous avons tendance à accorder plus de valeur à ce qui est rare, limité ou disponible pour peu de temps. Ce biais vient en partie de l'instinct de survie (ce qui est rare peut manquer) et du fait que la rareté crée de l'urgence dans la décision. Il rejoint directement l'aversion à la perte : le client craint de perdre l'opportunité s'il n'agit pas.",
          "En marketing, on distingue la vraie rareté (le produit ou l'offre est effectivement en stock très limité, ou l'événement a une date finale objective) de la fausse rareté (créée artificiellement, par exemple des « ventes flash » qui se répètent chaque semaine). La fausse rareté peut fonctionner à court terme, mais gare à l'effet boomerang sur la confiance si le client s'en rend compte.",
          "Exemples de raretés légitimes : séries limitées justifiées, fin de collection, nombre de places restreint pour un événement, disponibilité réelle du formateur. Un formateur peut dire « Nous n'acceptons que 10 participants pour garantir un suivi personnalisé » si c'est vrai : cela donne envie de saisir sa place tout en étant cohérent. En revanche, afficher « Plus que 2 en stock » en permanence alors que ce n'est pas le cas finit par décrédibiliser l'annonce.",
        ],
        takeaways: [
          "La rareté réelle crée une urgence légitime — la fausse rareté crée de la méfiance",
          "Toujours expliquer pourquoi c'est limité : la raison justifiée renforce la crédibilité",
          "Seule la rareté que vous pouvez défendre honnêtement mérite d'être communiquée",
        ],
        exercise: {
          title: "Audit des raretés de votre offre",
          description:
            "Passez en revue votre offre actuelle et listez toutes les formes de rareté réelles que vous pouvez mettre en avant honnêtement : votre disponibilité limitée, un nombre de places restreint justifié, une édition limitée, une date de fin réelle. Pour chacune, vérifiez qu'elle résiste à la question : « Si mon client découvrait la réalité, serait-il d'accord que cette limite est vraie et légitime ? »",
        },
      },
      {
        id: 5,
        title: "Autorité et crédibilité",
        description:
          "Le biais d'autorité nous pousse à accorder plus de confiance aux figures perçues comme légitimes ou expertes. La parole d'un expert a un poids persuasif élevé — à condition qu'elle soit fondée.",
        content: [
          "Le biais d'autorité nous pousse à accorder plus de confiance ou d'obéissance aux figures perçues comme légitimes ou expertes. Dans le célèbre test de Milgram en psychologie, de simples citoyens administraient prétendument des chocs électriques dangereux à un inconnu sur ordre d'une autorité scientifique, illustrant jusqu'où peut aller l'influence de l'autorité.",
          "En vente, le principe d'autorité signifie que la parole d'un expert, d'une célébrité ou d'une institution reconnue a un poids persuasif élevé. Un produit recommandé par un médecin, ou un logiciel « certifié » par un label officiel, gagnera fortement en crédibilité. Comment l'utiliser : diplômes ou années d'expérience mis en avant, partenaires de renom, mentions presse (« Vu dans Les Échos »), témoignage d'un expert du secteur, statistiques d'une étude scientifique appuyant votre propos.",
          "Ces éléments activent chez le client un réflexe de confiance envers l'avis autorisé. Cela impose honnêteté et exactitude : pas question de s'inventer des titres ou de citer de fausses sources. Attention également à ne pas écraser le client : trop d'autorité peut engendrer de la méfiance ou de la distance. L'idéal est une crédibilité équilibrée par de l'empathie et de l'accessibilité.",
        ],
        takeaways: [
          "Les signaux d'autorité (titres, certifications, mentions presse) activent un réflexe de confiance",
          "L'autorité doit être réelle et vérifiable — toute fausse légitimité se retourne contre son auteur",
          "Équilibrer l'autorité par l'empathie : l'expert intimidant vend moins que l'expert accessible",
        ],
      },
      {
        id: 6,
        title: "Effet de cadrage",
        description:
          "La même réalité est perçue différemment selon la façon dont on la formule. Sans changer les faits, le cadrage influence directement la décision d'achat.",
        content: [
          "Le framing effect désigne l'influence de la formulation ou du contexte de présentation d'une information sur la décision, sans que le fond change. Dire d'un yaourt qu'il est « 90 % sans matière grasse » donnera une impression plus positive que « 10 % de matières grasses », alors que c'est objectivement identique. De même, annoncer « 98 % de clients satisfaits » est plus rassurant que « 2 % de clients insatisfaits », bien que les deux soient vrais.",
          "En vente, on utilisera ce biais en choisissant soigneusement les mots et métriques mis en avant. On peut cadrer un prix en le ramenant à l'utilisation (« seulement 1 € par jour »), formuler un délai en positif (« plus que 2 jours avant la fin de l'offre »). Il faut également adapter le cadrage à ce qui compte pour le client : pour un produit écologique, il sera plus convaincant de cadrer en termes d'impact environnemental si l'audience est sensible à l'écologie.",
          "Attention à rester sincère : le cadrage ne doit pas constituer un mensonge par omission dangereux. Le bon framing met en lumière le bon bénéfice de l'offre sans en altérer la vérité. L'objectif est d'aider le client à voir ce qui compte vraiment pour lui, pas de l'induire en erreur par une présentation trompeuse.",
        ],
        takeaways: [
          "La même réalité formulée différemment produit des réactions émotionnelles très différentes",
          "Cadrer en positif (ce qu'on gagne) est généralement plus efficace que cadrer en négatif (ce qu'on évite)",
          "Le cadrage éthique met en lumière le bon bénéfice — sans altérer la vérité ni omettre l'essentiel",
        ],
        exercise: {
          title: "Recadrage de votre offre",
          description:
            "Prenez les 5 arguments principaux de votre offre actuelle. Pour chacun, essayez au moins deux cadrages différents : positif/négatif, global/par jour, technique/émotionnel. Exemple : « Formation de 10 heures » → « Maîtrisez la vente en 10 heures » → « 1h par jour pendant 2 semaines pour transformer votre façon de convaincre ». Identifiez le cadrage qui résonne le mieux avec la préoccupation principale de votre client cible.",
        },
      },
      {
        id: 7,
        title: "Engagement progressif (effet de pied-dans-la-porte)",
        description:
          "Un petit « oui » prépare le terrain pour un plus grand « oui ». Une fois engagé dans une direction, le cerveau cherche à rester cohérent avec ses choix précédents.",
        content: [
          "L'étude classique en psychologie : on demandait aux gens de mettre un petit autocollant pour la sécurité routière sur leur voiture, puis plus tard de poser un grand panneau dans leur jardin. Ceux ayant accepté le petit autocollant étaient bien plus nombreux à accepter le panneau par la suite, car ils se percevaient déjà comme « citoyens responsables ». En vente, convaincre un prospect de s'inscrire à une newsletter ou d'essayer un échantillon gratuit augmente significativement la probabilité qu'il achète plus tard le produit complet.",
          "En entretien de vente, obtenir que le client valide étape par étape construit un enchaînement de micro-engagements. Psychologiquement, la personne veut maintenir une cohérence avec ses positions précédentes : après plusieurs oui, il lui devient difficile de dire non à la proposition finale sans se contredire. Pensez aux périodes d'essai, aux offres « satisfait ou remboursé », aux ventes additionnelles progressives.",
          "Ce levier doit rester subtil et bienveillant. Un engagement forcé ou une série de questions orientées pour piéger le client dans des oui trompeurs serait de la manipulation. En revanche, faire progresser le client par palier en lui donnant le contrôle à chaque étape est une démarche d'influence saine : l'engagement même faible crée de l'attachement et de la confiance progressivement.",
        ],
        takeaways: [
          "Un petit engagement augmente la probabilité d'un engagement plus grand par besoin de cohérence",
          "Les micro-oui successifs construisent une dynamique favorable à la décision finale",
          "Périodes d'essai et offres « satisfait ou remboursé » utilisent ce principe de façon éthique",
        ],
        exercise: {
          title: "Cartographier votre escalier d'engagement",
          description:
            "Identifiez les 3 micro-engagements qui précèdent naturellement l'achat principal dans votre offre. Exemple : (1) s'abonner à votre newsletter → (2) télécharger un guide gratuit → (3) assister à un webinaire → (4) acheter la formation. Pour chaque étape, définissez la valeur que le prospect reçoit et ce que ce petit engagement lui révèle sur lui-même.",
        },
      },
      {
        id: 8,
        title: "Coût irrécupérable (biais du sunk cost)",
        description:
          "Ce biais pousse à continuer une action dans laquelle on a déjà investi, même si elle s'avère peu judicieuse. Comprendre ce mécanisme permet d'anticiper les comportements des prospects engagés.",
        content: [
          "Le biais du sunk cost pousse à continuer une action parce qu'on a déjà investi temps, argent ou énergie, pour ne pas « gaspiller » l'investissement consenti. On reste devant un film ennuyeux parce qu'on a déjà regardé 1h. On garde un abonnement inutile parce qu'on a déjà payé pour l'année. En contexte de vente B2B, un directeur qui a consacré des mois à étudier un projet hésite à l'abandonner même si de meilleures solutions émergent, car il a « déjà investi tellement de temps et d'argent dans l'actuel ».",
          "Pour le vendeur, ce biais signifie deux choses. Premièrement : si on parvient à amener progressivement le prospect à investir dans le processus (répondre à un questionnaire, tester un produit, participer à une démo), ce dernier sera enclin à poursuivre jusqu'à l'achat pour rentabiliser son investissement initial. Deuxièmement : ce biais peut être un frein si le client a trop misé sur l'ancienne solution.",
          "Utilisation éthique : segmenter l'offre en paliers. Une fois que le client a acheté le module 1, il aura plus tendance à acheter les modules suivants pour rentabiliser l'ensemble de la formation commencée. Face à un client bloqué par le sunk cost d'une solution existante, il faut l'aider à surmonter ce biais en minimisant le coût du changement et en valorisant clairement les gains futurs.",
        ],
        takeaways: [
          "Un prospect ayant déjà investi temps ou argent est plus enclin à poursuivre jusqu'à l'achat",
          "Le sunk cost peut bloquer le changement : aider le client à voir les gains futurs plutôt que les pertes passées",
          "Les offres en paliers exploitent ce biais de façon éthique pour maintenir l'engagement",
        ],
        exercise: {
          title: "Identifier le sunk cost de vos prospects",
          description:
            "Réfléchissez à vos prospects typiques. Dans quel investissement passé sont-ils potentiellement « bloqués » ? (Ancien logiciel, fournisseur historique, formation commencée ailleurs…). Préparez un argument qui reconnaît cet investissement passé, puis montre concrètement en quoi le coût du changement est faible comparé aux gains futurs. Ne tentez pas de nier l'investissement — aidez à le relativiser.",
        },
      },
      {
        id: 9,
        title: "Effet de contraste",
        description:
          "Notre appréciation d'une offre est toujours relative à ce à quoi on la compare sur le moment. L'ordre et le contexte de présentation changent radicalement la perception de la valeur.",
        content: [
          "Ce principe veut que notre appréciation de quelque chose soit toujours relative à ce à quoi on la compare sur le moment. Un objet lourd paraît plus léger si on vient d'en soulever un très lourd juste avant. Un prix de 100 € semble cher si on l'évalue après un article à 50 €, mais il paraît raisonnable si on vient de parler d'un produit à 300 €.",
          "Les vendeurs utilisent l'effet de contraste en présentant par exemple d'abord une option très haut de gamme (prix fort) puis l'option standard : la deuxième apparaît plus abordable que si elle avait été présentée seule. En magasin, c'est la raison pour laquelle on expose les articles les plus luxueux en tête de gondole : pour donner un point de comparaison qui rehausse la valeur perçue des gammes inférieures. Le contraste fonctionne aussi sur d'autres attributs que le prix : fonctionnalités, délais, garanties.",
          "À utiliser : si vous vendez un pack premium et un pack standard, présentez toujours le premium en premier (même si vous pensez en vendre peu) pour que le standard soit vu comme une bonne affaire en contraste. En négociation, commencer par une demande un peu plus ambitieuse : concéder ensuite donnera l'impression d'avoir fait un effort. Il ne s'agit pas de gonfler artificiellement une offre — mais si vous avez plusieurs niveaux de prestation, l'ordre de présentation peut tout changer dans la perception.",
        ],
        takeaways: [
          "Aucun prix, aucune offre n'est perçu de façon absolue — toujours relatif à ce qui précède",
          "Présenter l'option la plus chère en premier rend l'option standard plus attractive",
          "L'ordre de présentation est une décision stratégique, pas un détail",
        ],
      },
      {
        id: 10,
        title: "Biais de simplicité",
        description:
          "Le cerveau humain préfère ce qui est simple et facile à traiter. Face à trop de complexité, il se fatigue, hésite, et finalement ne décide rien. Simplifier, c'est vendre.",
        content: [
          "Par nature, le cerveau humain préfère ce qui est simple, clair et facile à traiter. Un message simple est saisi plus vite et mémorisé plus facilement qu'un message complexe. Face à un choix compliqué, le cerveau peut ressentir de l'anxiété ou de la fatigue décisionnelle, ce qui freine le passage à l'action. L'effet de fluidité cognitive est bien documenté : un contenu fluide donne une impression de confiance et de vérité plus élevée qu'un contenu compliqué.",
          "En vente, ce biais doit encourager à simplifier l'offre et le discours autant que possible. Limiter le nombre d'options proposées : face à 15 versions d'un produit, le client peut renoncer à choisir, alors qu'avec 3 versions il se décidera plus aisément. Utiliser un langage courant sans jargon non expliqué. Les études marketing le confirment : si l'utilisateur doit lire trop de texte pour comprendre ce que vous vendez, c'est que votre proposition de valeur est mauvaise.",
          "Une page web au design épuré, une phrase d'accroche limpide, un bouton d'action bien visible encouragent davantage l'engagement, car l'effort cognitif requis est minimal. Le biais de simplicité recoupe la règle d'or : « Ne faites pas réfléchir le client plus qu'il ne faut. » Cela ne veut pas dire le prendre pour un ignorant — cela veut dire lui mâcher le travail en rendant votre message accessible immédiatement, même à quelqu'un qui découvre votre offre pour la première fois.",
        ],
        takeaways: [
          "La complexité tue la décision — chaque point de friction supplémentaire réduit les conversions",
          "Trois options valent mieux que quinze : trop de choix provoque la paralysie décisionnelle",
          "Si votre client doit réfléchir pour comprendre ce que vous vendez, votre proposition de valeur est trop floue",
        ],
        exercise: {
          title: "Test de simplicité en 5 secondes",
          description:
            "Choisissez votre page d'accueil, votre pitch ou votre brochure principale. Montrez-la pendant 5 secondes à quelqu'un de votre entourage qui ne connaît pas votre activité, puis cachez-la. Posez-lui trois questions : (1) Qu'est-ce que je vends ? (2) À qui ? (3) Quel est le résultat promis ? Si les trois réponses sont correctes, votre proposition est claire. Sinon, identifiez précisément ce qui a manqué et simplifiez.",
        },
      },
    ],
  },
  {
    id: 3,
    title: "Comprendre profondément son client",
    lessons: [
      {
        id: 1,
        title: "Douleur réelle vs douleur perçue",
        description:
          "La douleur que vit objectivement votre client et la façon dont il la ressent ne sont pas toujours identiques. C'est la douleur perçue — émotionnelle, subjective — qui motive l'achat. Pas la douleur réelle.",
        content: [
          "Theodore Levitt, professeur de marketing à Harvard, a formulé l'une des vérités les plus importantes du commerce : « Les gens n'ont pas besoin d'une perceuse. Ils ont besoin d'un trou dans leur mur. » La perceuse est le produit. Le trou dans le mur est la transformation attendue. La douleur réelle, c'est l'absence de trou. La douleur perçue, c'est la frustration de ne pas pouvoir accrocher ce tableau, l'agacement de remettre la tâche à plus tard, ou la gêne visuelle face à ce mur vide depuis des mois. C'est cette douleur perçue qui déclenche l'achat — pas le fait objectif.",
          "La douleur réelle est factuelle : les ventes de l'entreprise stagnent depuis deux trimestres, la personne prend du poids, l'ancienne chaudière tombe souvent en panne. La douleur perçue est émotionnelle : la peur de devoir licencier, la honte de ne plus se sentir à l'aise dans ses vêtements, l'appréhension de se réveiller sans chauffage un matin d'hiver. Ces deux niveaux coexistent toujours. Mais seule la douleur perçue a le pouvoir de déclencher une décision.",
          "La conséquence directe pour le vendeur : si votre discours s'adresse uniquement à la douleur réelle (données, chiffres, faits techniques), vous parlez à la raison de votre client. Si vous adressez la douleur perçue — comment il vit la situation, ce qu'elle lui coûte émotionnellement, ce qu'elle l'empêche de faire — vous parlez à ce qui déclenche réellement sa décision. L'objectif de ce module est précisément cela : arrêter de vendre un produit, commencer à vendre une transformation.",
        ],
        takeaways: [
          "Douleur réelle = le fait objectif. Douleur perçue = comment le client le vit émotionnellement",
          "C'est toujours la douleur perçue qui déclenche l'achat — pas la douleur réelle",
          "On vend l'amélioration de la vie du client (le « trou dans le mur »), pas l'outil lui-même (la perceuse) — Levitt",
        ],
        exercise: {
          title: "Interview fictive d'un client type",
          description:
            "Choisissez un client type pour votre offre. Construisez une fiche en deux colonnes : à gauche, sa douleur réelle (les faits objectifs de sa situation), à droite, comment il la ressent et la vit émotionnellement (honte, peur, frustration, fatigue, agacement…). Pour chaque douleur réelle, posez-vous la question : « Qu'est-ce que ça lui fait ressentir concrètement ? » L'objectif est de passer de la description factuelle à la réalité émotionnelle vécue par votre client.",
        },
      },
      {
        id: 2,
        title: "Désir conscient vs désir caché",
        description:
          "Le client vous dit ce qu'il veut — mais ce qu'il veut vraiment, il ne le formule pas toujours. Parfois, il ne le sait pas lui-même. La vente efficace répond au désir caché, pas seulement au désir déclaré.",
        content: [
          "Le désir conscient, c'est ce que le client exprime : « Je cherche un logiciel de gestion. » « Je veux augmenter mon chiffre d'affaires. » « Je voudrais perdre du poids. » Ce sont des demandes réelles, des points de départ valides — mais ce ne sont pas les motivations profondes. Ce sont leurs traductions rationnelles, les formulations acceptables pour décrire une aspiration plus intime.",
          "Le désir caché, c'est la transformation réelle que le client cherche, souvent plus émotionnelle et plus personnelle. « Perdre du poids » peut cacher « avoir l'énergie de finir mes journées sans m'effondrer » ou « me sentir à l'aise sans honte quand je me regarde dans une glace ». « Augmenter mon chiffre d'affaires » peut cacher « prouver à moi-même que j'avais raison de tout quitter pour me lancer » ou « arrêter d'avoir des conversations difficiles avec mon banquier ». Le désir caché est presque toujours plus émotionnel, plus intime, et plus proche du vrai déclencheur d'achat.",
          "L'enjeu pour le vendeur : une offre qui ne répond qu'au désir conscient est une offre parmi d'autres — le client peut comparer, arbitrer, remettre à plus tard. Une offre qui touche le désir caché devient personnelle et urgente, parce qu'elle répond à quelque chose que personne d'autre n'a nommé. La transformation que vous proposez doit viser ce niveau : non pas « vous allez perdre du poids » mais « vous allez retrouver l'énergie et la confiance que vous cherchez ».",
        ],
        takeaways: [
          "Désir conscient = ce que le client dit vouloir. Désir caché = ce qu'il veut vraiment, souvent inavoué",
          "Le désir caché est presque toujours plus émotionnel et plus puissant que le désir déclaré",
          "L'offre qui répond au désir caché devient personnelle et urgente — elle n'est plus comparable à rien d'autre",
        ],
      },
      {
        id: 3,
        title: "Peurs silencieuses du client",
        description:
          "Au-delà des objections formulées, le client porte des peurs qu'il n'exprime jamais. Ces peurs silencieuses bloquent la décision sans que personne ne les nomme — et elles ne se lèvent qu'à condition d'être identifiées.",
        content: [
          "Les peurs silencieuses sont les freins internes que le client ne verbalise pas — soit parce qu'il ne voudrait pas paraître vulnérable, soit parce qu'il n'en est pas pleinement conscient lui-même. Quand un client dit « c'est trop cher », il exprime souvent une peur silencieuse plus profonde : « Et si ça ne marche pas pour moi spécifiquement ? » Quand il dit « je dois en parler à mon associé », il peut cacher : « J'ai peur d'avoir l'air impulsif ou de me tromper devant quelqu'un que j'estime. » Quand il dit « ce n'est pas le bon moment », il traduit parfois : « J'ai peur que ce changement déstabilise mon organisation actuelle. »",
          "Parmi les peurs silencieuses les plus fréquentes : la peur de se tromper et de le regretter, la peur du jugement des pairs ou de la hiérarchie, la peur de ne pas être à la hauteur de ce que la solution suppose, la peur du changement et de l'inconnu, la peur de gaspiller de l'argent dans quelque chose qui ne sera pas utilisé. Ces peurs sont rarement dites — mais elles sont presque toujours présentes, surtout pour les décisions d'achat significatives.",
          "Pour le vendeur, l'enjeu est double. D'abord, apprendre à lire entre les lignes : une objection formulée est souvent le signal d'une peur silencieuse qu'il faut identifier. Ensuite, construire dans son discours des éléments qui rassurent sur ces peurs spécifiques sans qu'elles soient nommées : une garantie solide répond à la peur de gaspiller de l'argent, un témoignage d'une personne dans la même situation répond à la peur de ne pas être à la hauteur, un processus clair et simple répond à la peur du changement. On ne peut lever une peur qu'on n'a pas identifiée.",
        ],
        takeaways: [
          "Les objections exprimées sont souvent la traduction d'une peur silencieuse plus profonde",
          "Peurs les plus fréquentes : se tromper, être jugé, ne pas être à la hauteur, gaspiller, devoir changer",
          "On ne peut lever une peur qu'on n'a pas identifiée — la clé est d'apprendre à lire ce que le client ne dit pas",
        ],
        exercise: {
          title: "Cartographie des objections réelles",
          description:
            "Listez les 5 objections que vous entendez le plus souvent. Pour chacune, posez-vous la question : « Quelle peur silencieuse se cache derrière cette formulation ? » Exemple : « Je vais réfléchir » → peur probable : manque de confiance dans le résultat, peur du regard des pairs, ou appréhension de l'engagement. Une fois la peur identifiée pour chaque objection, préparez un élément de réassurance qui y répond directement — sans jamais nommer la peur explicitement.",
        },
      },
      {
        id: 4,
        title: "Le langage interne du client",
        description:
          "Le client a ses propres mots pour décrire son problème et son désir. Reprendre exactement son vocabulaire dans votre discours est l'une des techniques de persuasion les plus puissantes — et les plus sous-utilisées.",
        content: [
          "Le langage interne, c'est l'ensemble des mots que votre client utilise spontanément pour parler de son problème — pas votre vocabulaire professionnel, pas le jargon de votre secteur, pas les termes techniques que vous avez appris. Sa langue à lui. Un entrepreneur qui veut mieux vendre ne dit peut-être pas « optimiser mon taux de conversion » ou « améliorer mon parcours client ». Il dit « arrêter de perdre des gens qui étaient pourtant intéressés » ou « trouver quoi leur répondre quand ils me demandent de baisser mes prix ».",
          "Quand vous répondez à un client avec ses propres mots, il ressent immédiatement qu'il est compris — pas que vous récitez un argumentaire. Ce phénomène crée une confiance instantanée qui s'obtient difficilement autrement. À l'inverse, si vous répondez avec votre terminologie, même exacte et pertinente, le client perçoit un décalage et se met en retrait. La règle est simple : comprenez son problème dans votre langue, mais parlez-en dans la sienne.",
          "Comment collecter ce langage : les avis clients en ligne sont des sources directes de langage authentique — c'est l'un des seuls endroits où les clients décrivent leur problème et leur transformation désirée en leurs propres mots, sans filtre ni reformulation. Les forums, groupes, commentaires de votre audience sont des mines d'or du même type. Les interviews directes avec des clients passés permettent d'aller plus loin. L'objectif est de repérer les formulations qui reviennent, les métaphores spontanées, les émotions nommées spontanément. Et de les intégrer telles quelles dans vos messages de vente — sans les reformuler.",
        ],
        takeaways: [
          "Le langage interne = les mots exacts qu'utilise le client pour décrire son problème, pas votre jargon professionnel",
          "Reprendre le vocabulaire du client crée une confiance immédiate — il sent qu'il est compris, pas ciblé",
          "Les avis clients en ligne sont la source de langage authentique la plus accessible et la plus fiable",
        ],
      },
      {
        id: 5,
        title: "Pourquoi le client n'achète pas (les vraies raisons)",
        description:
          "« C'est trop cher », « je vais réfléchir », « ce n'est pas le bon moment » — ces objections sont des traductions, pas des raisons. Comprendre les vraies raisons du non-achat change radicalement la façon de construire un discours de vente.",
        content: [
          "Les objections formulées sont des mécanismes de protection — des formulations socialement acceptables pour mettre fin à une conversation sans exposer la vraie pensée. « C'est trop cher » signifie rarement que le client n'a pas d'argent. Il signifie le plus souvent : « Je ne vois pas assez clairement ce que j'obtiens pour mon cas spécifique » ou « Je ne suis pas encore convaincu que ça marchera pour moi. » Répondre au prix dans ce cas-là ne change rien à la décision.",
          "Les vraies raisons derrière la quasi-totalité des non-achats se résument à quatre catégories. La première est le manque de confiance : dans le vendeur, dans la solution, ou dans sa propre capacité à utiliser ce qui est vendu. La deuxième est une valeur perçue insuffisante : le client ne voit pas clairement ce qu'il obtient, ou le bénéfice ne lui semble pas proportionnel au prix. La troisième est l'absence d'urgence : le problème n'est pas douloureux au point de déclencher une décision maintenant. La quatrième est un mauvais timing : d'autres priorités dominent à ce moment précis.",
          "La conséquence est directe : répondre à la mauvaise raison est inutile et parfois contre-productif. Si la vraie raison est le manque de confiance, multiplier les arguments de valeur ne résout rien. Si la vraie raison est l'absence d'urgence, baisser le prix n'accélère pas la décision. C'est précisément pourquoi ce module existe : comprendre le client — ses douleurs, ses désirs, ses peurs silencieuses, son langage interne — est le seul moyen d'identifier la vraie raison du non-achat et d'y répondre directement.",
        ],
        takeaways: [
          "Les vraies raisons du non-achat : manque de confiance, valeur perçue insuffisante, urgence absente, mauvais timing",
          "Répondre à l'objection formulée sans identifier la vraie raison ne change jamais rien",
          "Comprendre le client — douleurs, désirs, peurs, langage — est le seul moyen de lever les vrais freins",
        ],
        exercise: {
          title: "Traduction produit → bénéfice mental",
          description:
            "Prenez votre offre principale et listez ses 5 caractéristiques principales. Pour chacune, posez-vous la question deux fois : (1) « Qu'est-ce que ça change concrètement dans la vie de mon client ? » (bénéfice fonctionnel), puis (2) « Qu'est-ce que ça lui fait ressentir ? » (bénéfice mental). Exemple : « 10 leçons vidéo » → bénéfice fonctionnel : « Apprenez à votre rythme » → bénéfice mental : « Maîtrisez la vente sans modifier votre emploi du temps, à l'heure qui vous convient. » L'objectif est d'atteindre le bénéfice mental — celui qui touche la douleur perçue ou le désir caché.",
        },
      },
    ],
  },
  {
    id: 4,
    title: "Construire une offre qui donne envie d'acheter",
    lessons: [
      {
        id: 1,
        title: "Promesse claire et mesurable",
        description:
          "La promesse est le cœur de votre offre : ce que vous garantissez d'apporter au client en termes de résultat ou de bénéfice. Pour qu'elle suscite l'adhésion, elle doit être claire, sans ambiguïté, et mesurable.",
        content: [
          "Une promesse floue ne convertit pas. Dire \"Nous améliorons votre performance commerciale\" ne dit rien de concret au prospect. Préférez : \"Nous vous aidons à augmenter vos ventes de +20 % en 3 mois\". La différence : le client peut se projeter dans un gain tangible. Une promesse mesurable a du poids parce qu'elle implique un engagement, pas une vague intention.",
          "Le test des 10 secondes est implacable : un visiteur web ne passe que quelques secondes à décider si votre site vaut la peine. Faites lire votre promesse à quelqu'un de non initié pendant 10 secondes. Peut-il résumer ce que vous offrez ? Si ce n'est pas le cas, retravaillez. Exemple : \"Livre blanc pour devenir un pro du jardinage\" vs \"Apprenez à cultiver 10 légumes en 30 jours (même en partant de zéro)\" — le second est immédiatement compris et désirable.",
          "La promesse doit rester réaliste et tenue. Annoncer l'impossible génère du désenchantement et détruit la confiance. La question centrale à se poser : quel problème exact résolvez-vous, et quel résultat le client peut-il en attendre ? Mettez cela en avant dans un titre ou une accroche — c'est la première chose que le prospect voit, et souvent la seule s'il part trop tôt.",
        ],
        takeaways: [
          "Une promesse mesurable (chiffre, délai, résultat concret) a bien plus de poids qu'une formulation vague",
          "Test des 10 secondes : si un inconnu ne comprend pas l'offre en 10 secondes, la promesse doit être retravaillée",
          "Clarté + réalisme : promettre trop tue la confiance, promettre flou tue l'intérêt",
        ],
        exercise: {
          title: "Réécrire une offre floue en offre claire",
          description: "Prenez un exemple d'offre (la vôtre ou une prise sur Internet) dont la proposition est confuse ou trop générique. Reformulez-la en appliquant les principes suivants : clarifier la promesse en une phrase simple, ajouter un élément mesurable, expliciter le mécanisme, insérer une preuve, inclure une garantie. Comparez l'effet avant/après. Exemple : \"Solution innovante pour optimiser votre organisation\" → \"2 heures gagnées par jour dans votre gestion de projet, grâce à notre logiciel d'automatisation. Essayez-le 14 jours gratuitement.\"",
        },
      },
      {
        id: 2,
        title: "Mécanisme crédible (comment ça marche)",
        description:
          "Une fois la promesse annoncée, le client se demande : comment allez-vous y arriver ? Le mécanisme est l'explication du fonctionnement ou de la méthode derrière votre offre. Sans lui, la promesse sonne creux.",
        content: [
          "Si vous promettez \"+20 % de ventes\", le client a besoin de croire en la méthode : formation, outil logiciel, coaching intensif. Un \"raison pourquoi\" renforce la confiance. Exemple : \"grâce à notre logiciel d'automatisation breveté qui traite 1 000 leads/heure\", ou \"grâce à une méthode de coaching issue de 50 ans de recherches\". Le lien logique entre votre solution et la promesse doit être visible.",
          "L'absence de mécanisme crée l'effet \"trop beau pour être vrai\". \"Perdez 5 kg en un mois\" sans explication sonne comme une arnaque. \"Perdez 5 kg en un mois grâce à un programme nutritionnel personnalisé et un suivi quotidien par un coach\" donne une méthode concrète — et donc de la crédibilité. Le client n'a pas besoin de retenir tous les détails techniques, mais le fait que vous les ayez expliqués crée un climat de sérieux.",
          "Dans une page de vente, on présente souvent la promesse en titre puis on explique \"Comment ça marche\" dans une section dédiée. Vulgarisez si nécessaire : comparaisons, schémas, cas pratiques. Un mécanisme bien communiqué élimine les objections de doute (\"je n'y crois pas\", \"ça marchera pas pour moi\") parce qu'il montre qu'il y a un procédé réfléchi derrière le résultat annoncé.",
        ],
        takeaways: [
          "Le mécanisme répond à \"comment ?\" — il rend la promesse crédible et évite l'effet trop-beau-pour-être-vrai",
          "Transparence et pédagogie : même vulgarisé, le fait d'expliquer crée un climat de sérieux",
          "Différenciation : un mécanisme unique (méthode propriétaire, technologie, expertise) renforce le positionnement",
        ],
      },
      {
        id: 3,
        title: "Preuves et réassurance",
        description:
          "Même avec une promesse alléchante et un mécanisme crédible, le client prudent cherchera des preuves que vous pouvez tenir parole. Toute offre solide doit inclure des éléments de réassurance concrets.",
        content: [
          "La preuve sociale et la preuve factuelle sont les deux piliers. Témoignages de clients satisfaits, études de cas, chiffres de réussite, certifications, avis d'experts, démonstrations avant/après. Exemples : \"+150 entrepreneurs formés, note moyenne 4.8/5\" ou \"Cas client : l'entreprise X a augmenté sa production de 30 % grâce à nous\". Ces preuves montrent que d'autres ont déjà obtenu ce qui est promis.",
          "La réassurance couvre aussi les incertitudes pratiques. Support client disponible 7j/7, installation prise en charge de A à Z, paiement sécurisé — ce sont de petits détails qui mettent en confiance. Une bonne pratique : lister les questions que se pose le client et y répondre dans une FAQ intégrée à l'offre. Chaque doute clarifié est un pas de plus vers l'achat.",
          "La forme compte autant que le fond pour la réassurance. Un design professionnel, sans faute d'orthographe, avec des images de qualité, signale votre sérieux. Les logos de grandes entreprises clientes, les labels qualité, les partenariats de confiance ajoutent une couche de crédibilité tierce. L'objectif : que le client n'ait plus aucune raison objective d'hésiter.",
        ],
        takeaways: [
          "Preuves tangibles : chiffres, logos, avis authentiques — montrer que d'autres ont déjà obtenu ce qui est promis",
          "FAQ intégrée : chaque doute clarifié explicitement réduit la friction et rapproche de l'achat",
          "La forme est un signal de confiance : design soigné, zéro faute, images de qualité",
        ],
        exercise: {
          title: "Comparaison de deux offres",
          description: "Choisissez deux offres similaires (deux annonces de formation, deux fiches produits concurrentes) et analysez-les. Laquelle vous rassure le plus et donne le plus envie ? Identifiez pourquoi : présence de témoignages ? Clarté du bénéfice ? Design plus pro ? Listez les éléments de l'offre \"gagnante\" qui la rendent plus convaincante. Cette comparaison vous aide à repérer concrètement les ingrédients d'une offre efficace et à identifier ce qui manque dans la vôtre.",
        },
      },
      {
        id: 4,
        title: "Gestion du prix dans le cerveau",
        description:
          "Le prix active une zone sensible du cerveau : l'insula, associée à la perception de la douleur. Des études de neuroéconomie montrent que voir un prix jugé trop élevé peut activer la même région cérébrale que la douleur physique. La façon de présenter le prix peut amplifier ou atténuer ce choc.",
        content: [
          "La technique centrale : encadrer le prix par la valeur. Au lieu de simplement \"Prix : 500 €\", dire \"Investissement : 500 € (pour un retour estimé de 5 000 € économisés la première année)\". Le cerveau voit le gain, pas seulement la perte. Le fractionnement peut aussi réduire la douleur : \"33 € par mois\" paraît moins douloureux que \"400 € par an\", même si le total est identique. Et l'ancrage : afficher une option plus chère en premier fait paraître votre offre principale plus raisonnable.",
          "La monnaie de paiement influence le ressenti. Acheter par carte ou en un clic \"fait moins mal\" que sortir un billet en espèces, car le cerveau ne voit pas concrètement l'argent partir. Faciliter le paiement (plusieurs moyens, étalement possible, pas de frais cachés) réduit les frictions mentales. Les coûts additionnels découverts tardivement sont particulièrement destructeurs : ils amplifient la douleur et créent de la déception.",
          "Un prix trop bas peut desservir. Le cerveau associe faible coût à faible qualité. Le bon prix psychologique est celui qui paraît cohérent avec tout ce qui précède : la promesse, le mécanisme, les preuves, la rareté. Si vous avez bien travaillé ces éléments, le client devrait percevoir le prix non comme une douleur mais comme le passage à l'acte gagnant. Justifiez le prix : expliquer ce qui le compose (qualité supérieure, support inclus, exclusivité) calme l'insula activée.",
        ],
        takeaways: [
          "L'insula (douleur) s'active à la vue du prix : toujours présenter le prix en face de la valeur, jamais seul",
          "Fractionnement, ancrage, facilité de paiement : trois leviers pour réduire la douleur perçue du prix",
          "Un prix trop bas nuit : le cerveau assimile prix bas = qualité basse. La cohérence avec l'offre est clé",
        ],
      },
      {
        id: 5,
        title: "Garantie et réduction du risque",
        description:
          "Même convaincu, un client peut hésiter à cause du risque perçu. \"Et si je ne suis pas satisfait ? Je vais perdre mon argent...\" Pour lever ce dernier frein, offrez des garanties solides. Une garantie transforme l'achat en un choix sans regret possible.",
        content: [
          "Une garantie \"satisfait ou remboursé 30 jours\" fait quasiment disparaître le risque financier aux yeux du client. Il se dit qu'au pire, il récupérera son argent. Des études ont montré que la présence d'une garantie de remboursement augmente les ventes et les profits en retail — elle envoie un signal de qualité et de confiance dans le produit. Si vous, vendeur, êtes prêt à rembourser en cas de déception, c'est que vous croyez réellement en votre offre.",
          "Au-delà du remboursement, plusieurs leviers réduisent le risque perçu. Une démonstration gratuite ou un échantillon permet de tester avant d'acheter définitivement. Un contrat sans engagement enlève la peur d'être coincé. Paradoxalement, plus le client voit qu'il pourra revenir en arrière s'il le souhaite, plus il avancera volontiers. La marche arrière facile accélère la marche en avant.",
          "Pensez à Amazon : leur politique de retour facile a largement contribué à faire sauter les barrières de l'achat en ligne. Même à petite échelle, soignez cette notion de \"vous ne prenez aucun risque à essayer, c'est nous qui le prenons pour vous\". Rassurez aussi sur les petits risques pratiques : livraison (colis endommagé ? on renvoie), confidentialité (données sécurisées), support (on ne lâche pas après achat). Chaque friction supprimée rend l'offre plus fluide.",
        ],
        takeaways: [
          "Une garantie de remboursement augmente les ventes : elle signale la confiance du vendeur dans son propre produit",
          "La marche arrière facile accélère la marche en avant : moins le client se sent en danger, plus il dit oui",
          "Éliminer chaque friction pratique (retour, confidentialité, support) crée une expérience d'achat sans résistance",
        ],
        exercise: {
          title: "Test de compréhension en 10 secondes",
          description: "Pour une page de votre site ou un dépliant commercial, montrez l'offre à une personne n'ayant pas connaissance de votre produit pendant 10 secondes, puis cachez-la. Demandez-lui : qu'a-t-elle compris ? Quel est le bénéfice clé ? Qu'est-ce qui l'a marquée ? Si elle ne peut pas répondre clairement, retravaillez le titre, le visuel ou l'accroche. Refaites ce test avec plusieurs personnes pour obtenir un feedback \"côté client\" sur la clarté de votre communication.",
        },
      },
    ],
  },
  {
    id: 5,
    title: "Parler pour vendre",
    lessons: [
      {
        id: 1,
        title: "Posture mentale du vendeur crédible",
        description:
          "Avant même les mots, c'est l'attitude intérieure du vendeur qui se ressent. Le client jauge dès les premières minutes votre crédibilité et votre intention. Si vous êtes aligné, confiant et honnête, cela se sentira et inspirera confiance en retour.",
        content: [
          "Une posture mentale crédible signifie : croire sincèrement en la valeur de ce que l'on propose, se positionner en conseiller qui veut aider le client, et non en \"mendiant\" qui quémande une vente. Adoptez la posture \"je sais que mon produit est bon et je suis là pour voir s'il convient à votre problème\". Concrètement : contact visuel franc, voix posée et calme, ni inférieur en suppliant l'achat, ni supérieur condescendant — mais partenaire.",
          "La congruence est non-négociable : le discours le plus rodé sera vain si votre ton ou vos gestes trahissent le doute. Annoncer \"notre solution est la plus fiable du marché\" d'une voix hésitante et le regard fuyant fait perdre toute force à l'affirmation. La crédibilité passe aussi par la capacité à admettre une limite ou à dire \"je ne sais pas, je vais me renseigner\" plutôt que de baratiner. Un vendeur crédible n'hésite pas à reconnaître ce que sa solution ne fait pas.",
          "Travaillez votre mental : voyez-vous comme un apporteur de solutions légitime. Si vous êtes intimidé, rappelez-vous que le client a un problème et que vous avez peut-être la clé — vous lui rendez service en partageant votre offre. Cette posture d'aide plutôt que de vente à tout prix change souvent tout, y compris dans la voix et l'énergie que vous dégagez.",
        ],
        takeaways: [
          "Le client jauge votre crédibilité et votre intention dès les premières minutes — avant même que vous parliez de l'offre",
          "Congruence obligatoire : mots, ton et non-verbal doivent dire la même chose — tout signe de doute détruit la confiance",
          "Posture de conseiller, pas de vendeur : \"je vérifie si mon produit convient à votre problème\" — cette intention change l'énergie de tout l'échange",
        ],
      },
      {
        id: 2,
        title: "Écoute active et questions puissantes",
        description:
          "Parler pour vendre ne signifie pas monopoliser la parole. Les meilleurs vendeurs écoutent plus qu'ils ne parlent : les top performers parlent en moyenne 43 % du temps et laissent le client parler 57 % du temps.",
        content: [
          "L'écoute active consiste à être pleinement attentif aux paroles du client : acquiescer, reformuler, poser des questions de relance, de sorte qu'il se sente compris. Un client qui se sent écouté et compris est bien plus en confiance pour acheter. Pour provoquer sa parole, posez des questions ouvertes. Plutôt que des questions fermées (oui/non), utilisez \"quoi, comment, pourquoi\" : \"Qu'est-ce que vous attendez prioritairement d'une solution comme la nôtre ?\", \"Comment gérez-vous ce problème actuellement ?\"",
          "La méthode SPIN Selling de Neil Rackham structure la découverte en 4 étapes : Situation (\"Comment fonctionnez-vous aujourd'hui sur ce point ?\"), Problème (\"Qu'est-ce qui vous pose le plus de difficultés ?\"), Implication (\"Si ça continue, que risque-t-il d'arriver ?\"), Need-payoff (\"Si vous aviez une solution, qu'est-ce que ça changerait pour vous ?\"). Ce questionnement fait prendre conscience au client de son besoin et le motive à chercher une solution.",
          "Calibrez le ratio parole/écoute selon le moment. En phase de découverte, le client devrait parler 70 % du temps. En phase de conclusion, vous parlerez plus — mais veillez à faire réagir le client pour maintenir l'interactivité. Et surtout : n'écoutez pas juste pour rebondir immédiatement avec votre argument, mais écoutez pour comprendre réellement. Souvent, en le laissant s'exprimer, le client vous donnera lui-même les clés pour conclure.",
        ],
        takeaways: [
          "Top performers : 43 % du temps de parole pour le vendeur, 57 % pour le client — écouter plus que parler est une performance",
          "SPIN Selling (Rackham) : Situation → Problème → Implication → Need-payoff — le client prend conscience de son besoin lui-même",
          "Écouter pour comprendre, pas pour rebondir : le client qui s'exprime librement donne souvent les clés de la vente",
        ],
        exercise: {
          title: "Script de découverte client",
          description: "Rédigez une trame de questions pour la phase de découverte lors d'une vente type. Incluez des questions ouvertes par étape (Situation, Problème, Implications, Need-payoff), prévoyez des relances, et pensez aux questions de clarification. Exercez-vous à le suivre en rôle-play avec un collègue jouant le client. Avec l'habitude, vous ne réciterez pas ce script mot à mot, mais vous aurez en tête le fil conducteur pour recueillir l'essentiel.",
        },
      },
      {
        id: 3,
        title: "Reformulation qui rassure",
        description:
          "La reformulation consiste à redire en d'autres mots ce que le client vient d'exprimer, pour montrer qu'on l'a bien compris et le rassurer sur le fait que ses propos sont pris en compte. C'est un outil puissant de l'écoute active.",
        content: [
          "Si le client dit \"Je trouve votre solution intéressante mais j'ai peur que ce soit compliqué à mettre en place pour mes équipes\", reformulez : \"Si je vous entends bien, ce qui vous inquiète c'est la phase de mise en place et l'adhésion de vos équipes, c'est bien ça ?\". Cette phrase montre que vous écoutez, clarifie le point précis de blocage, et incite le client à confirmer. Une fois qu'il acquiesce, vous pouvez apporter une réponse ciblée et rassurante.",
          "La reformulation sert aussi à tester vos hypothèses de compréhension : \"J'ai l'impression que pour vous le plus important c'est la fiabilité, plus que le prix, je me trompe ?\". S'il dit oui, vous savez sur quel terrain jouer. S'il dit non, il corrigera — vous aurez évité un hors-sujet. Reformuler en positif un objectif exprimé : \"Vous visez donc une croissance de 15 % cette année, c'est bien ça ?\". Plus tard, vous raccrocherez votre solution à cet objectif qu'il a lui-même confirmé.",
          "Un client en colère qu'on reformule calmement — \"Donc ce qui vous dérange c'est d'avoir attendu 3 semaines la livraison, je comprends\" — va souvent baisser d'un ton car il se sent entendu. La reformulation désamorce les tensions, donne du temps pour réfléchir avant de répondre, et montre que vous traitez sérieusement chaque point. C'est une technique recommandée en vente, en négociation et en relation d'aide précisément parce qu'elle réduit énormément de friction.",
        ],
        takeaways: [
          "Reformuler montre que vous écoutez réellement et crée un sentiment d'être compris — base de la confiance",
          "\"C'est bien ça ?\" après chaque reformulation : le client confirme ou corrige, et dans les deux cas vous avancez",
          "Reformuler une objection avant d'y répondre désamorce la tension et évite de répondre à côté",
        ],
        exercise: {
          title: "Reformulation d'objections",
          description: "Listez 5 objections fréquentes (\"c'est trop cher\", \"je n'ai pas le temps\", \"je suis satisfait de mon fournisseur actuel\") et écrivez pour chacune une phrase de reformulation + une réponse appropriée. Exemple — Objection : \"C'est trop cher.\" → Reformulation : \"Le budget est votre principal frein, c'est bien ça ?\" → Réponse : \"Permettez-moi de détailler ce que cela inclut…\". Faites cet exercice par écrit pour trouver les bons mots, puis répétez à voix haute pour que cela devienne naturel.",
        },
      },
      {
        id: 4,
        title: "Gestion des silences",
        description:
          "Le silence en entretien de vente est un allié méconnu. Beaucoup de vendeurs en ont peur et comblent le moindre blanc en parlant sans arrêt — ce qui peut étouffer le client et faire manquer des informations cruciales.",
        content: [
          "Le \"silence de 3 secondes\" : lorsque le client a fini de parler, résistez à l'envie de répondre tout de suite et attendez quelques secondes en le regardant attentivement. Souvent, il reprendra la parole pour compléter sa pensée ou donner une info plus personnelle qu'il n'aurait pas dite sans ce léger malaise du silence. Ce phénomène est naturel : tout le monde a tendance à meubler un silence prolongé. Le meilleur commercial prolonge consciemment un instant sans paroles pour obtenir ces détails supplémentaires — besoins cachés, décisionnaires impliqués, véritables objections.",
          "Garder le silence est perçu comme du respect : cela montre que vous réfléchissez à ce qui vient d'être dit. Au-delà de l'écoute, le silence s'utilise aussi lors de la conclusion : après avoir annoncé votre prix, taisez-vous. Ne remplissez pas immédiatement le vide par \"mais on peut peut-être s'arranger\" — cette précipitation trahit un manque de confiance en votre offre. Annoncez et attendez. \"Le premier qui parle après l'annonce du prix, perd\" — pas un jeu de pouvoir, mais l'espace mental pour que le client digère l'information.",
          "Le silence doit être maîtrisé : des silences brefs et bien placés, pas une mutisme bizarre. Ne comblez pas en répondant à la place du client. Un argument important suivi de silence le met en valeur — le client en mesure la portée au lieu de passer aussitôt au suivant. Exercice pratique : comptez mentalement \"1…2…3\" avant de reprendre la parole à chaque fin de phrase du client. Vous verrez que souvent, il continue et va plus en profondeur — exactement ce que vous voulez.",
        ],
        takeaways: [
          "Silence de 3 secondes après la parole du client : il reprend souvent avec une information plus personnelle et précieuse",
          "Après l'annonce du prix, se taire — la précipitation à meubler le silence trahit le manque de confiance en l'offre",
          "Un argument suivi de silence a plus d'impact : le client en mesure la portée au lieu de le laisser se noyer dans le suivant",
        ],
      },
      {
        id: 5,
        title: "Closing naturel (sans pousser)",
        description:
          "Si vous avez bien mené l'entretien — compris le besoin, établi la valeur, traité les objections — le closing doit être la suite naturelle de la conversation, presque une formalité. Un closing naturel, c'est proposer la prochaine étape sans forcer, comme une évidence.",
        content: [
          "Forcer un client hésitant par des techniques de pression crée de la réactance psychologique : si une personne se sent contrainte ou privée de choix, elle résiste par principe. On peut la convaincre sous pression, mais elle pourra regretter et annuler, ou ne plus jamais revenir. Le soft closing laisse le client libre de sa décision finale — il ne se sent pas dupé. Exemples naturels : \"Alors, si vous êtes prêt, on peut démarrer la semaine prochaine, qu'en dites-vous ?\" ou \"Souhaitez-vous qu'on avance ensemble ? Je peux préparer le contrat pour lundi.\"",
          "Parfois, ne pas conclure à chaud est la bonne stratégie. Si vous sentez un blocage, proposez un dernier élément rassurant plutôt que d'insister pour signer sur-le-champ : \"Je vous vois encore pensif, souhaitez-vous un dernier rendez-vous avec vos collègues pour valider ?\". Ironiquement, cette bienveillance en convainc souvent plus que la pression. Closing naturel ne veut pas dire attendre passivement — il faut demander la vente, mais de façon fluide. Après avoir répondu à toutes les questions : \"Tout me semble en ordre. On remplit les papiers ?\"",
          "Quand le client dit oui, sachez vous taire de nouveau — pas besoin de continuer à vendre ce qui est déjà vendu. Félicitez-le de son choix et projetez sur la suite : \"Vous ne le regretterez pas, on se recontacte dès demain pour lancer.\". Évitez les \"dernières manipulations\" type urgence artificielle — sauf si la limite est réelle, c'est perçu comme du push. Une vente gagnée par coercition est souvent une mauvaise vente (annulation, mauvaise réputation). Une vente conclue dans un climat de confiance fidélise.",
        ],
        takeaways: [
          "Réactance psychologique : la pression force une résistance — un closing doux qui laisse le choix génère plus de oui durables",
          "Closing = proposer la prochaine étape avec naturel, pas sortir une phrase magique sous pression",
          "Quand le client dit oui, arrêter de vendre — puis projeter sur la suite pour consolider l'engagement",
        ],
        exercise: {
          title: "Simulation de vente courte",
          description: "Avec un partenaire, simulez un échange de vente en 5 minutes (appel entrant ou rencontre rapide). Vous devez très vite cerner le besoin et conclure : poser quelques questions essentielles, écouter, proposer une solution, clore (demande d'essai ou prise de rendez-vous approfondi). Chronométrez pour vous challenger. Cette simulation renforce les réflexes pour les situations réelles où le temps est compté, et révèle vos points faibles (parler trop, oublier le next step, etc.). Corrigez et refaites plusieurs fois.",
        },
      },
    ],
  },
  {
    id: 6,
    title: "Écrire pour vendre",
    lessons: [
      {
        id: 1,
        title: "Structure d'un message qui convertit",
        description:
          "Un bon message de vente suit une structure logique qui guide le lecteur du début à la fin sans décrocher. Le modèle AIDA — Attention, Intérêt, Désir, Action — est le fil conducteur éprouvé du copywriting.",
        content: [
          "AIDA en pratique : capter l'Attention avec un titre accrocheur ou une première phrase choc (\"Vous perdez 2h par jour sur Excel ?\"). Susciter l'Intérêt en parlant du problème du lecteur ou d'une histoire intrigante. Stimuler le Désir en présentant la solution et ses bénéfices concrets — faire visualiser le futur positif s'il passe à l'action. Enfin, déclencher l'Action avec un call-to-action visible et incitatif. Sur une page web : un grand titre (A), quelques lignes d'accroche (I), bénéfices + preuves (D), bouton \"Passer commande\" (A).",
          "Autres structures efficaces : la formule PAS (Problème-Agitation-Solution) décrit le problème, l'aggrave pour faire ressentir le besoin, puis apporte la solution. La méthode QUEST (Question, Empathie, Solution, Témoignage, Action) suit un arc émotionnel complet. Quoi qu'il en soit, une structure donne un fil conducteur et évite le décousu — un texte non structuré perd rapidement le lecteur.",
          "Structure visuelle : aérez avec des paragraphes courts, intertitres, puces, images, pour qu'en survolant le texte on saisisse déjà la trame. Bon test : si on lit uniquement vos titres et sous-titres, comprend-on l'essentiel de l'offre ? Sur Internet, les gens lisent en F — ils parcourent le haut et les débuts de lignes. Structurez pour qu'à chaque étape du balayage ils soient accrochés à descendre plus bas.",
        ],
        takeaways: [
          "AIDA : Attention → Intérêt → Désir → Action — structure fondamentale de tout message qui convertit",
          "PAS (Problème-Agitation-Solution) et QUEST : alternatives selon le ton souhaité — toutes reposent sur le même principe de fil conducteur",
          "Test titres/sous-titres : si on comprend l'offre en lisant seulement les intertitres, la structure est claire",
        ],
        exercise: {
          title: "Réécriture d'une page de vente",
          description: "Prenez une page de vente existante (la vôtre ou un exemple en ligne). Analysez sa structure, ses titres, la longueur des textes, les CTA. Réécrivez-la en appliquant les bonnes pratiques : structure AIDA ou PAS, titres plus accrocheurs, messages plus concis, reformulation \"vous\" vs \"nous\", ajout d'une preuve ou d'un CTA manquant. Comparez ensuite les deux versions : la nouvelle doit pouvoir être lue plus vite et donner plus envie d'agir.",
        },
      },
      {
        id: 2,
        title: "Titres qui captent l'attention",
        description:
          "Le titre est de loin l'élément le plus important de votre texte. David Ogilvy, légende de la pub, disait que 5 fois plus de personnes lisent le titre que le corps du texte — et que si le titre n'accroche pas, 90 % de l'investissement est gâché.",
        content: [
          "Quatre approches qui fonctionnent : poser une question qui touche le lecteur (\"Comment doubler vos leads sans dépenser plus ?\"), faire une promesse claire (\"Apprenez l'espagnol en 30 jours – méthode garantie\"), éveiller la curiosité (\"Le secret des vendeurs millionnaires enfin révélé\"), ou mettre en avant un bénéfice distinctif (\"Perdez du poids sans faire de sport\"). Certains mots attirent l'œil : \"nouveau\", \"gratuit\", \"exclusif\", \"secret\", \"vous\" — mais à utiliser à bon escient, sans sensationnalisme creux.",
          "La spécificité est clé : \"Améliorez votre marketing digital\" vs \"3 techniques de marketing digital pour doubler votre taux de conversion\" — le second est plus précis, donc plus crédible et engageant. Brainstormez 5 à 10 versions de titres et choisissez le meilleur ou testez en A/B. Sur le web, un simple changement de formulation peut augmenter drastiquement les clics — l'A/B testing de titres est facile et très révélateur.",
          "Les intertitres sont des mini-titres qui maintiennent l'attention en la renouvelant tout au long d'une page longue. Exemple : \"Pourquoi cette méthode fonctionne ?\" relance la curiosité à mi-parcours. Certains copywriters passent 50 % du temps de rédaction sur le titre tant son impact est déterminant. C'est lui qui arrête le lecteur dans sa frénésie de scrolling et l'invite à plonger dans le texte.",
        ],
        takeaways: [
          "Ogilvy : 5× plus de lecteurs lisent le titre que le texte — si le titre ne capte pas, 90 % de l'investissement est gâché",
          "Spécifique > générique : un titre avec un chiffre ou un délai précis est plus crédible et plus engageant qu'une promesse vague",
          "A/B tester les titres : un changement de formulation peut multiplier les clics — c'est le levier de copywriting le plus rentable",
        ],
        exercise: {
          title: "Création d'un message court",
          description: "Entraînez-vous à vendre en quelques phrases. Rédigez un email de prospection de 5-6 lignes maximum (ou un message LinkedIn à un prospect, ou la section \"au-dessus de la ligne de flottaison\" d'un site). Objectif : faire passer le pitch essentiel de manière ultra condensée. Structure : objet accrocheur + 2 phrases sur le problème + 1 phrase sur la solution + CTA. Quand on est capable de vendre en quelques lignes, on écrit ensuite de meilleures versions longues — car on sait ce qui compte vraiment.",
        },
      },
      {
        id: 3,
        title: "Argumentation courte et claire",
        description:
          "Sur Internet, la capacité d'attention est réduite et les gens scannent plus qu'ils ne lisent. Une argumentation efficace est concise : chaque phrase doit apporter quelque chose. Bannissez les tournures alambiquées, les paragraphes de 15 lignes et le blabla creux.",
        content: [
          "Une phrase = une idée clé. Phrases courtes, actives, concrètes. Au lieu de \"Notre entreprise s'efforce d'offrir des solutions innovantes afin de satisfaire une clientèle en quête de performance\", dites \"Nous offrons des solutions innovantes pour booster vos performances.\" Utilisez des mots simples connus de votre audience. Si du jargon est nécessaire, expliquez-le : \"biais cognitif\" peut devenir \"petit raccourci du cerveau\". Visez un style accessible au plus grand nombre.",
          "\"Trop d'info tue l'info\" : sélectionnez vos 2 ou 3 arguments forts plutôt que d'étaler 10 arguments qui noient le poisson. La liste à puces est un format recommandé pour énoncer des points clés de façon aérée et percutante — chaque puce doit contenir une idée forte. Exemple : \"Avec notre solution vous : – Gagnez du temps ; – Réduisez vos coûts ; – Simplifiez vos processus.\" Plutôt que les mêmes idées perdues dans un gros paragraphe.",
          "Supprimez le superflu en relecture : adjectifs et adverbes inutiles, redondances, détours. Plus le message est épuré, plus il frappe. Steve Jobs disait que la simplicité est l'ultime sophistication — particulièrement vrai en copywriting digital. Conservez un ton conversationnel : n'écrivez pas un essai littéraire, écrivez comme vous parleriez à un client en face. \"Vous\" et \"je\", questions rhétoriques, courtes exclamations (\"Imaginez…\") rythment le texte et gardent l'attention.",
        ],
        takeaways: [
          "Une phrase = une idée — phrases courtes et actives : la clarté est la première qualité d'un texte qui convertit",
          "2-3 arguments forts > 10 arguments dilués — choisir c'est renoncer, mais renoncer c'est convaincre",
          "Ton conversationnel : écrire comme on parle à un client rend le texte humain, fluide et plus engageant",
        ],
        exercise: {
          title: "Suppression du superflu",
          description: "Prenez l'un de vos textes existants (page, brochure, script long) et faites l'exercice de la \"coupe sans pitié\". Supprimez tout ce qui peut être enlevé sans nuire à la compréhension : doublons, tournures passives (transformez en actives), adverbes dispensables (\"très\", \"vraiment\"), phrases d'introduction vagues. Visez à réduire de 30 % le nombre de mots. Comparez les deux versions : la version épurée doit être aussi claire, plus dynamique, et plus impactante.",
        },
      },
      {
        id: 4,
        title: "Appel à l'action efficace",
        description:
          "Le but d'un message de vente est de faire agir le lecteur. Le CTA (Call-to-Action) est la destinée finale de votre texte. Un CTA efficace est visible, explicite et incitatif — et doit être \"le chemin de moindre résistance\".",
        content: [
          "Visible : un bouton bien contrasté, gros, placé à des moments stratégiques (après un argumentaire convaincant, ou sticky en haut de page). Explicite : dire exactement ce que le lecteur doit faire et ce qu'il obtient. \"Télécharger le guide gratuit\" est mieux que \"Cliquer ici\" — le bénéfice est rappelé. \"Je profite de l'offre -50%\" sur un bouton est plus motivant que \"Acheter maintenant\". Incitatif : verbes d'action, urgence authentique si réelle (\"Inscrivez-vous maintenant – places limitées\").",
          "Levez le dernier frein juste à côté du CTA : un petit texte \"(Annulable en un clic, sans engagement)\" près du bouton d'essai gratuit lève la peur de s'engager. N'avoir qu'une action principale par message évite l'hésitation — si vous multipliez les CTA pour des actions différentes, le lecteur ne sait plus quoi faire. Sur une page longue, répétez le même CTA à différents endroits (pas plusieurs objectifs distincts — un seul résultat visé).",
          "Design : couleur qui tranche avec le reste pour le bouton (les études d'ergonomie montrent que les boutons contrastés attirent plus le clic), entouré d'espace, pas de fouillis. Sur mobile : facile à taper du pouce, bien visible. Si à la lecture du CTA le lecteur ressent la moindre friction ou incompréhension, c'est qu'il manque quelque chose avant dans le message. Un bon CTA est la suite naturelle d'un texte qui a déjà convaincu.",
        ],
        takeaways: [
          "CTA visible + explicite + incitatif : nommer le bénéfice dans le bouton convertit mieux qu'un générique \"Cliquer ici\"",
          "Un message = un objectif = un CTA — multiplier les actions crée l'hésitation et tue la conversion",
          "Lever le dernier frein juste à côté du bouton : une ligne rassurante (\"sans engagement\") peut débloquer l'acte final",
        ],
      },
      {
        id: 5,
        title: "Erreurs classiques du marketing digital",
        description:
          "Il y a des faux pas courants en rédaction marketing qui sabotent les efforts même d'une bonne offre. Les identifier permet d'éviter de répéter ce que font la majorité des contenus médiocres du web.",
        content: [
          "Parler de soi au lieu du client : le \"nous-nous\" est l'écueil classique. \"Nous sommes les leaders, notre produit fait ci, notre entreprise est…\" sans jamais parler du client est rebutant. Le client veut savoir ce que vous allez faire pour lui. Transformez les \"nous\" en \"vous\" : \"Vous bénéficiez de…\" au lieu de \"Nous fournissons…\". Trop de superlatifs sans preuve : \"révolutionnaire, incroyable, la meilleure du marché\" sans élément factuel déclenche de la méfiance. Préférez des faits précis et laissez les témoignages affirmer votre excellence.",
          "Ignorer l'optimisation mobile : beaucoup lisent les emails ou naviguent sur smartphone. Un email avec des lignes de 100 caractères ou une page non responsive est un échec assuré. Testez toujours sur mobile : le titre tient-il sur un petit écran ? Le CTA est-il visible sans scroller longtemps ? Négliger la cohérence omni-canal : si votre message sur le site dit une chose et l'email de relance dit autre chose, le prospect est confus. Incohérence = perte de confiance. Ne promettez pas une promo en pub pour aboutir sur une page sans mention de promo.",
          "Surcharger de contenus ou d'objectifs : raconter l'histoire de l'entreprise, détailler chaque caractéristique technique, et aussi vendre et aussi faire s'inscrire à la newsletter — c'est trop. Chaque contenu doit avoir un focus. Ne pas suivre les résultats : publier sans regarder les métriques (taux d'ouverture, de clic, de conversion) est une erreur de pilotage. Le marketing digital permet d'apprendre de chaque envoi. Si un email a un taux d'ouverture faible, peut-être que l'objet n'était pas bon — apprenez et ajustez en continu.",
        ],
        takeaways: [
          "\"Nous\" → \"vous\" : le client veut savoir ce que vous faites pour lui, pas ce que vous êtes",
          "Cohérence omni-canal : un message incohérent entre pub, page et email fragilise la confiance et rompt l'élan d'achat",
          "Mesurer et ajuster en continu : le marketing digital est un processus d'amélioration — sans métriques, on répète ses erreurs à l'aveugle",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Marketing digital et acquisition",
    lessons: [
      {
        id: 1,
        title: "Le rôle réel du marketing digital",
        description:
          "Le marketing digital ne consiste pas à forcer une vente immédiate, mais à attirer l'intérêt et nourrir la confiance jusqu'à l'acte d'achat. La plupart des prospects ont besoin de temps et d'information avant de se décider.",
        content: [
          "Selon les données, 70 % des leads ne sont pas qualifiés immédiatement, et 80 % de ceux qui \"ne sont pas prêts aujourd'hui\" finiront par acheter auprès d'un concurrent sous 24 mois s'ils ne sont pas nurturés. En clair, vouloir vendre à tout prix dès le premier contact fait fuir les prospects froids et entame la crédibilité. La priorité doit être de gagner la confiance par l'éducation et la transparence.",
          "Il faut devenir un fermier plutôt qu'un chasseur dans sa stratégie marketing. Capter les contacts intéressés et leur apporter de la valeur continue pour rester présent jusqu'à ce qu'ils soient prêts. C'est une stratégie d'acquisition qui s'apparente à semer des graines (contenus, interactions) et patienter jusqu'à la récolte, au lieu de vouloir tout cueillir immédiatement.",
          "Forcer la conclusion à tout prix via des arguments agressifs ou des incitations incessantes risque au contraire de détruire la confiance naissante. Les consommateurs ont été trop souvent échaudés par des promesses non tenues et partent avec une certaine méfiance face à une marque inconnue. Le rôle du marketing digital est d'accompagner progressivement les prospects tout au long de leur maturation.",
        ],
        takeaways: [
          "70 % des leads ne sont pas qualifiés immédiatement — 80 % des prospects \"pas prêts\" achèteront chez un concurrent s'ils ne sont pas nurturés",
          "Fermier vs chasseur : cultiver la relation sur la durée vaut plus que forcer la vente immédiate",
          "Confiance d'abord, vente ensuite — l'éducation et la transparence raccourcissent le cycle de décision",
        ],
      },
      {
        id: 2,
        title: "Attention : la vraie monnaie du digital",
        description:
          "Dans l'économie numérique, l'attention est la ressource la plus précieuse et la plus limitée. Chaque jour, un individu est exposé à des milliers de messages. L'enjeu est de capter et retenir un minimum d'attention au milieu de ce brouhaha.",
        content: [
          "La répétition publicitaire fonctionne jusqu'à un certain point, puis devient contre-productive. Une étude sur la publicité vidéo montre qu'exposer quelqu'un 6 fois à la même annonce en une heure améliore la mémorisation (92 % se souviennent), mais 48 % trouvent la pub agaçante et l'intention d'achat chute de 16 %. La répétition crée de la familiarité jusqu'à un seuil, au-delà elle génère lassitude et rejet.",
          "Psychologiquement, plus on est exposé à un stimulus, plus on a tendance à l'apprécier et lui faire confiance : c'est l'effet de simple exposition. En marketing, on n'achète pas ce qu'on ne connaît pas — le prospect doit souvent voir plusieurs fois une marque pour qu'elle devienne familière et rassurante. C'est la base de la \"règle de 7\" expositions minimum avant décision d'achat.",
          "\"La visibilité sans crédibilité ne convertit pas.\" Capter l'attention ne suffit pas si on n'installe pas la confiance derrière. Inversement, la crédibilité sans visibilité ne sert à rien. L'attention doit être gagnée honnêtement puis cultivée — une présence équilibrée (suffisamment répétée pour devenir familière, mais respectueuse pour ne pas lasser) est la clé dans un monde de saturation informationnelle.",
        ],
        takeaways: [
          "Règle de 7 : il faut en moyenne 7 expositions avant une décision d'achat — la répétition stratégique crée la familiarité",
          "Au-delà du seuil, la répétition devient irritante : 48 % trouvent la pub agaçante dès la 6e exposition, intention d'achat -16 %",
          "Visibilité + crédibilité : les deux sont nécessaires — l'une sans l'autre ne convertit pas",
        ],
      },
      {
        id: 3,
        title: "Les grands canaux d'acquisition",
        description:
          "Il existe plusieurs grands canaux d'acquisition en digital, chacun avec ses logiques, avantages et limites. L'objectif n'est pas de maîtriser chaque canal, mais de comprendre lequel utiliser selon votre activité et votre audience.",
        content: [
          "Contenu organique : articles, vidéos, podcasts, posts sur réseaux. Génère 3× plus de leads que le marketing traditionnel à budget égal, et coûte 62 % moins cher. Résultats à moyen/long terme, demande constance. Publicité payante : Google Ads, Facebook Ads, Instagram, LinkedIn. Rapidité et précision de ciblage, idéal pour lancer ou accélérer. Mais dès qu'on coupe le budget, le flux s'arrête — complémentaire de l'organique, pas substitut.",
          "Partenariats et recommandations : affiliation, co-marketing, parrainage client. 88 % des consommateurs font confiance aux recommandations de personnes qu'ils connaissent plus qu'à tout autre canal publicitaire. Le bouche-à-oreille est le canal le plus efficace en termes de confiance — 83 % des consommateurs mondiaux font plus confiance aux recommandations d'amis ou famille qu'à la publicité.",
          "Le marketing d'influence : collaborer avec des créateurs disposant d'une communauté fidèle. ROI estimé à 5,2:1 par rapport aux autres canaux digitaux. Aucun canal n'est magique seul : la stratégie saine les combine. Organique pour la durée, payant pour accélérer, influence pour la crédibilité tierce, bouche-à-oreille pour la fidélisation.",
        ],
        takeaways: [
          "Contenu organique : 3× plus de leads, 62 % moins cher — mais résultats à moyen terme, demande constance",
          "Recommandations et bouche-à-oreille : 88 % font confiance aux pairs — le canal de conversion le plus puissant",
          "Combiner les canaux selon le stade du parcours prospect : organique (découverte), payant (accélérateur), influence (crédibilité), parrainage (fidélisation)",
        ],
        exercise: {
          title: "Choisir son canal d'acquisition principal",
          description: "En fonction de votre activité et de votre audience, identifiez le canal d'acquisition digital le plus adapté (réseaux sociaux, SEO, emailing, publicité ciblée, partenariat). Justifiez pourquoi ce canal est pertinent et quelles actions concrètes vous allez y mener. Focaliser ses efforts là où le prospect a le plus de chances d'être réceptif est la condition sine qua non d'une acquisition efficace.",
        },
      },
      {
        id: 4,
        title: "Le marketing de contenu (attirer sans forcer)",
        description:
          "Le marketing de contenu est l'art d'attirer les prospects en leur apportant de la valeur avant même de tenter de vendre. Donner de la valeur avant de vendre permet de bâtir une relation de confiance et de crédibilité avec votre audience.",
        content: [
          "Un contenu éducatif vise à informer et former, là où un contenu promotionnel vise à convaincre d'acheter. Les deux sont complémentaires, mais il faut généralement commencer par l'éducatif. Un prospect d'abord aidé par vos contenus aura bien plus tendance à écouter vos offres commerciales qu'un prospect froid démarché à brûle-pourpoint. 62 % des millennials déclarent que la fidélité à une marque dépend directement du type et de la qualité du contenu qu'elle produit.",
          "Il est crucial de fournir de la valeur réelle et non du simple \"remplissage marketing\". Contenus utiles, pertinents et honnêtes. Mieux vaut publier moins, mais mieux : la qualité à la quantité. Le piège du contenu \"vide mais viral\" guette beaucoup de créateurs — un message choc peut faire le buzz, mais sans substance, il n'apporte rien à la relation commerciale. \"Les consommateurs ne cherchent pas des promesses flashy ou du contenu vide : ils veulent de la vraie valeur, de l'originalité et du concret.\"",
          "\"Montrez, ne dites pas\" : démontrer votre expertise dans vos contenus vaut mieux que clamer \"nous sommes les meilleurs\". La preuve par les faits surpasse la promesse non étayée. Une entreprise qui vend des outils de productivité publie un ebook \"10 méthodes pour mieux gérer son temps\" — elle ne vend rien directement, mais attire des lecteurs qu'elle pourra convertir en présentant ses outils comme solutions. L'idée n'est pas de cacher qu'on a quelque chose à vendre, mais de prouver sa valeur d'abord.",
        ],
        takeaways: [
          "62 % des millennials : la fidélité à une marque dépend de la qualité de son contenu — le contenu est un actif de long terme",
          "Éducatif avant promotionnel : donner avant de recevoir construit la crédibilité qui rend les messages commerciaux ultérieurs efficaces",
          "\"Montrez, ne dites pas\" — démontrer l'expertise dans les contenus convertit mieux que les proclamations auto-promotionnelles",
        ],
      },
      {
        id: 5,
        title: "Les influenceurs : réalité, mythes et efficacité",
        description:
          "Les influenceurs arrivent à influencer les décisions d'achat parce qu'ils entretiennent une relation de confiance personnelle avec leur audience. 71 % des consommateurs disent faire confiance aux recommandations d'influenceurs (Nielsen Trust in Advertising).",
        content: [
          "Micro vs macro influenceurs : ce n'est pas la taille de l'audience qui fait tout. Les micro-influenceurs (10k–100k abonnés) ont en moyenne 6 % de taux d'engagement contre ~2,5 % pour les macro. 60 % des marques préfèrent collaborer avec des micro-influenceurs pour leur communauté de niche très engagée. La crédibilité perçue est souvent plus forte chez un micro-influenceur spécialiste que chez une star multi-sujets.",
          "Crédibilité vs portée brute : un influenceur qui accepte toute sorte de placement finit par lasser et perdre la confiance de sa communauté. Un cas d'école : une influenceuse Instagram (Arii) avec 2,6 millions de followers n'a pas réussi à vendre 36 t-shirts de sa propre marque — en cause, une audience très jeune sans pouvoir d'achat, et beaucoup de suiveurs passifs. La taille de l'audience ne dit rien de sa capacité d'achat.",
          "Les risques : faux abonnés, audience inadaptée, perte de crédibilité en cas de scandale. La clé est l'alignement entre l'influenceur, le produit et l'audience. Un placement fonctionne quand le produit s'intègre naturellement à l'univers du créateur. Si la promotion semble forcée ou hors-sujet, le public rejettera le message. Pertinence prime sur notoriété.",
        ],
        takeaways: [
          "Micro-influenceurs (10k–100k) : 6 % d'engagement vs 2,5 % pour les macro — plus engagés, plus ciblés, souvent plus efficaces",
          "La taille de l'audience ne garantit pas les ventes : 2,6M followers ≠ 36 t-shirts vendus (cas Arii)",
          "Alignement obligatoire : influenceur × produit × audience — sans cohérence, le placement sonne faux et convertit zéro",
        ],
        exercise: {
          title: "Analyse d'une collaboration influenceur",
          description: "Prenez un exemple réel d'une campagne d'influence (placement de produit par un YouTubeur ou un post sponsorisé Instagram). Analysez : adéquation entre l'influenceur et la marque (audience visée, valeurs), crédibilité perçue du message (sonnait-il authentique ?), résultats apparents (engagement, réactions des followers), risques éventuels (polémiques, commentaires négatifs). Faites cet exercice sur un cas réussi ou un cas raté, et tirez des leçons concrètes.",
        },
      },
      {
        id: 6,
        title: "Mise en avant d'un produit ou service",
        description:
          "Présenter son offre sans tomber dans la survente est un exercice de style en marketing éthique. Il s'agit de mettre en avant les atouts de votre produit de façon honnête, concrète et crédible, en privilégiant la démonstration et la preuve à la place des promesses creuses.",
        content: [
          "\"Don't say it, prove it\" — montrez au lieu de proclamer. Si vous avancez que votre logiciel fait gagner 5h par semaine, montrez des études ou cas clients qui le confirment, ou faites tester une version limitée pour que le prospect constate lui-même les gains. \"Une marque vraiment confiante dans son produit devrait montrer aux consommateurs des preuves concrètes que celui-ci tient ses promesses, ne laissant aucune place au doute.\"",
          "Les témoignages authentiques sont un levier puissant — à condition d'être vrais. \"Laissez les clients utiliser leurs propres mots… leur vraie voix est plus crédible qu'un discours marketing bien ficelé.\" Évitez les témoignages génériques du type \"Produit formidable, je recommande ! – Jean D.\" qui sonnent faux. Préférez des retours détaillés, signés d'une personne identifiable, qui expliquent comment votre offre a résolu concrètement leur problème.",
          "Le contexte de présentation joue un rôle sous-estimé : présenter le bon message au bon moment du parcours. Vouloir conclure la vente trop tôt (alors que le prospect vient à peine de vous découvrir) est inefficace. Attendre qu'il ait montré des signes d'intérêt. La preuve sociale externe (labels, certifications, avis clients, notes, médias qui parlent de vous) valide l'offre sans que vous ayez à vous auto-proclamer.",
        ],
        takeaways: [
          "\"Don't say it, prove it\" — démonstration, avant/après, essai gratuit : la preuve concrète convertit, la promesse seule ne suffit pas",
          "Témoignage authentique > discours marketing : la vraie voix d'un vrai client établit plus de confiance qu'un texte parfait",
          "Bon message + bon timing : vouloir vendre trop tôt détruit la relation — attendre les signaux d'intérêt pour présenter l'offre",
        ],
        exercise: {
          title: "Transformer un message trop agressif en message crédible",
          description: "Prenez un exemple de texte publicitaire très \"pushy\" (plein de superlatifs et d'urgence injustifiée). Réécrivez-le de manière équilibrée et rassurante, tout en conservant l'attrait commercial. Exemple : \"Offre unique !!! Achetez MAINTENANT ou ratez l'affaire du siècle, 100% garanti de changer votre vie\" → reformuler en un message persuasif mais honnête et clair. Objectif : s'exercer à communiquer sans matraquage ni promesse vide.",
        },
      },
      {
        id: 7,
        title: "Tunnel simple et parcours prospect",
        description:
          "La décision d'achat est rarement instantanée. Elle résulte d'un parcours en plusieurs étapes que le prospect parcourt à son rythme. Un modèle simplifié : Découverte → Intérêt → Confiance → Action.",
        content: [
          "Découverte : le prospect vous rencontre pour la première fois. Pas de discours de vente direct — si le premier contact est \"achetez mon produit\", le réflexe est le rejet. Un bon contenu de découverte éclaire sur son problème potentiel et vous positionne comme ressource utile. Intérêt/considération : le prospect compare, évalue les solutions. Rôle du message : informer et rassurer, pas encore clore la vente. Confiance/décision : témoignages, garanties, FAQ, démonstrations — éliminer toute crainte restante. Action : rendre l'acte aussi fluide que possible.",
          "On peut segmenter les prospects en trois catégories : ~10 % achètent presque immédiatement, 60 % ont besoin de plusieurs expositions et interactions pour se décider, et ~30 % sont intéressés mais n'achèteront que bien plus tard. Si vous n'avez pas mis en place un tunnel multi-étapes, vous ne capturez que les 10 % ultra-réactifs et perdez les 60 % d'hésitants qui auraient pu devenir clients avec un bon suivi.",
          "Exemple de parcours réaliste : 1) vidéo éducative sur les réseaux (découverte) → 2) visite du site + téléchargement d'un guide gratuit (intérêt) → 3) séquence emails à valeur ajoutée (confiance) → 4) témoignage vidéo client + offre avec garantie (décision) → 5) publicité de reciblage avec code promo (action). Ce chemin peut s'étaler sur plusieurs semaines. À chaque étape, un message adapté. Sans ces points de contact, le prospect passe à autre chose.",
        ],
        takeaways: [
          "10 % achètent immédiatement, 60 % ont besoin de temps et de nurturing — un tunnel multi-étapes capture les 60 % que la vente directe perd",
          "Découverte → Intérêt → Confiance → Action : chaque étape a son message — vendre à l'étape Découverte provoque systématiquement le rejet",
          "Multiplier les points de contact sans harceler : être présent à chaque étape du parcours, avec le bon message, au bon moment",
        ],
        exercise: {
          title: "Construire un parcours d'acquisition simple (3 étapes)",
          description: "Imaginez un mini-tunnel pour convertir un prospect froid en client en 3 étapes : 1) Il voit un contenu ou une pub de découverte — quel message ? 2) Il montre de l'intérêt (clic, inscription, like) — quel follow-up ? 3) Vous lui proposez une offre adaptée — laquelle et sous quel angle ? Décrivez brièvement le contenu de chaque étape. Objectif : mettre en pratique la notion de séquencement des messages et réfléchir à la cohérence de l'expérience prospect.",
        },
      },
      {
        id: 8,
        title: "Les erreurs classiques du marketing digital",
        description:
          "Même avec de bonnes stratégies, certaines erreurs classiques rendent les actions inefficaces ou, pire, nuisent à l'image et à la confiance. Les identifier permet de démarrer avec une longueur d'avance.",
        content: [
          "Trop parler de soi : la faute la plus répandue. Un message centré sur \"nous, notre produit, nos réussites\" sans parler des besoins du client ne trouve pas d'écho. Transformer les \"nous\" en \"vous\" : \"Vous bénéficiez de…\" au lieu de \"Nous fournissons…\". Copier sans comprendre : ce n'est pas parce qu'une approche fonctionne pour un concurrent qu'elle conviendra à votre entreprise. Copier aveuglément, c'est ne pas se démarquer et risquer de reproduire des tactiques mal maîtrisées sans en saisir le pourquoi.",
          "Promesses excessives : \"Les marques qui multiplient les promesses sans preuves tangibles s'exposent à une perte de confiance durable, difficile à réparer.\" 83 % des consommateurs ne font plus confiance aux marques qui sur-promettent (Edelman Trust Barometer 2025). Mieux vaut promettre modestement et dépasser les attentes. Utilisation abusive de l'urgence et de la peur : \"L'utilisation excessive ou trompeuse du marketing d'urgence peut lasser les consommateurs, nuire à la fidélité, et détruire la confiance patiemment construite.\" Si c'est toujours la \"dernière chance\", plus personne n'y croit.",
          "Confondre visibilité et crédibilité : \"La visibilité sans crédibilité ne convertit pas. Et la crédibilité sans visibilité ne sert à rien.\" Avoir 100k abonnés achetés ou peu qualifiés ne fait pas une marque respectée. \"Être vu, c'est facile ; être choisi, c'est stratégique.\" Chaque action marketing devrait se poser la question : apporte-t-elle juste de la visibilité, ou aussi de la confiance ? À l'ère de la surcharge de contenus, la crédibilité est un vecteur de visibilité durable.",
        ],
        takeaways: [
          "\"Nous\" → \"vous\" : parler au client de son problème, pas de votre produit — c'est la première condition pour qu'il lise la suite",
          "83 % ne font plus confiance aux marques qui sur-promettent — promettre moins et livrer plus est la meilleure stratégie de réputation",
          "Visibilité ≠ crédibilité : courir après les vues sans fond détruit l'image — mieux vaut être reconnu expert dans une niche que buzz sans substance",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Mise en pratique finale",
    // Ce module est 100% pratique — aucune leçon théorique.
    // 4 exercices intégrateurs directement au niveau du module.
    // Source : contenu formation.txt — Module 9.
    lessons: [],
    standaloneExercises: [
      {
        id: 1,
        title: "Création d'une offre complète",
        description:
          "En vous aidant des frameworks et templates vus, concevez de A à Z une offre commerciale pour un de vos produits ou services (ou fictif si besoin). Cela inclut : définir la promesse centrale, les bénéfices mis en avant (Modules 3 et 4), le prix et la garantie (Module 4), les biais éventuellement utilisés pour renforcer l'attrait (Module 2), et assurer que tout est formulé de manière claire (Modules 6 et 7). Vous produirez par exemple une page de vente écrite ou une brochure PDF intégrant tous ces éléments. Faites relire par un pair ou formateur pour feedback, et peaufinez. Le résultat attendu est un document qui donne réellement envie d'acheter en respectant toutes les bonnes pratiques — en somme, la synthèse concrète des modules précédents.",
      },
      {
        id: 2,
        title: "Script de vente oral",
        description:
          "Rédigez un script ou déroulé pour un entretien de vente en face-à-face reprenant les phases depuis l'accueil jusqu'au closing (Modules 5 et 3). Intégrez les questions clés que vous poserez, les points où vous écouterez, comment vous présenterez l'offre (Modules 1 et 4 pour les arguments émotionnels et rationnels), ainsi que comment vous répondrez aux objections majeures. Entraînez-vous à le jouer avec un collègue qui fait le client — idéalement en variant les profils (client facile, client réticent avec objections). Le but est d'être capable de tenir une conversation structurée et convaincante sans la lire, en ayant intégré le scénario.",
      },
      {
        id: 3,
        title: "Version écrite de la vente",
        description:
          "Sur la base du script oral et de l'offre construite, réalisez la version écrite de votre argumentaire. Par exemple : un emailing de prospection reprenant les mêmes idées, ou une proposition commerciale écrite personnalisée pour un client précis. Exercez-vous à adapter le ton oral en ton écrit (plus formel mais tout aussi engageant). Cette version écrite servira de support envoyé au client après l'entretien ou de résumé de votre offre. Elle doit refléter fidèlement vos points forts tout en étant assez autonome pour convaincre si elle est lue seule.",
      },
      {
        id: 4,
        title: "Simulation réelle (vente test)",
        description:
          "Mettez-vous au défi de réaliser une simulation de vente complète en conditions presque réelles. Si possible, faites venir une personne extérieure (pas votre collègue ou formateur habituels) pour jouer le rôle du prospect, avec un contexte défini (ex : il correspond à votre persona cible mais a quelques objections spécifiques). Installez-vous comme en rendez-vous, avec vos supports, et menez l'entretien de bout en bout : découverte, argumentation, traitement d'objections, closing. Cette simulation peut être filmée pour analyse. Suite à cela, faites un débriefing sur tous les aspects : A-t-on bien mis en pratique l'écoute active ? Ai-je utilisé les leviers du cerveau à bon escient ? Le client test se dit-il convaincu ? Si vous le pouvez, faites même une vente test réelle pour affiner vos compétences sur le terrain.",
      },
    ],
  },
];

// ============================================================================
// TEMPLATES PREMIUM
// ============================================================================

export const templates: Template[] = [
  {
    id: "grille-analyse-client",
    title: "Grille d'analyse client",
    description: "Identifiez les motivations profondes de vos prospects avec cette grille structuree.",
    type: "Template",
    moduleId: 3,
    downloadUrl: "/downloads/grille-analyse-client.pdf",
  },
  {
    id: "script-decouverte",
    title: "Script de decouverte",
    description: "Questions cles pour reveler les besoins reels de vos clients.",
    type: "PDF",
    moduleId: 3,
    downloadUrl: "/downloads/script-decouverte.pdf",
  },
  {
    id: "carte-biais-cognitifs",
    title: "Carte des biais cognitifs",
    description: "Visualisez les 20 biais les plus utiles en vente.",
    type: "Schema",
    moduleId: 2,
    downloadUrl: "/downloads/carte-biais-cognitifs.pdf",
  },
  {
    id: "structure-offre",
    title: "Structure offre irresistible",
    description: "Template pour construire une offre qui convertit.",
    type: "Template",
    moduleId: 4,
    downloadUrl: "/downloads/structure-offre.pdf",
  },
  {
    id: "checklist-page-vente",
    title: "Checklist page de vente",
    description: "Verifiez que votre page contient tous les elements essentiels.",
    type: "PDF",
    moduleId: 6,
    downloadUrl: "/downloads/checklist-page-vente.pdf",
  },
  {
    id: "sequence-email",
    title: "Sequence email type",
    description: "5 emails de nurturing prets a personnaliser.",
    type: "Template",
    moduleId: 6,
    downloadUrl: "/downloads/sequence-email.pdf",
  },
  {
    id: "matrice-objections",
    title: "Matrice des objections",
    description: "Anticipez et preparez vos reponses aux objections courantes.",
    type: "Template",
    moduleId: 5,
    downloadUrl: "/downloads/matrice-objections.pdf",
  },
  {
    id: "tunnel-vente",
    title: "Schema tunnel de vente",
    description: "Visualisez les etapes de votre parcours client.",
    type: "Schema",
    moduleId: 7,
    downloadUrl: "/downloads/tunnel-vente.pdf",
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getTotalLessons(): number {
  return programModules.reduce((acc, m) => acc + m.lessons.length, 0);
}

export function getModule(moduleId: number): Module | undefined {
  return programModules.find((m) => m.id === moduleId);
}

export function getLesson(moduleId: number, lessonId: number): Lesson | undefined {
  const mod = getModule(moduleId);
  return mod?.lessons.find((l) => l.id === lessonId);
}

export function getAllExercises(): Array<{
  moduleId: number;
  moduleTitle: string;
  lessonId: number;
  lessonTitle: string;
  exercise: Exercise;
}> {
  const exercises: Array<{
    moduleId: number;
    moduleTitle: string;
    lessonId: number;
    lessonTitle: string;
    exercise: Exercise;
  }> = [];

  for (const mod of programModules) {
    for (const lesson of mod.lessons) {
      if (lesson.exercise) {
        exercises.push({
          moduleId: mod.id,
          moduleTitle: mod.title,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          exercise: lesson.exercise,
        });
      }
    }
    if (mod.standaloneExercises) {
      for (const se of mod.standaloneExercises) {
        exercises.push({
          moduleId: mod.id,
          moduleTitle: mod.title,
          lessonId: se.id,
          lessonTitle: se.title,
          exercise: { title: se.title, description: se.description },
        });
      }
    }
  }

  return exercises;
}

export function getTemplate(templateId: string): Template | undefined {
  return templates.find((t) => t.id === templateId);
}

export function getLessonKey(moduleId: number, lessonId: number): string {
  return `${moduleId}-${lessonId}`;
}

export function getTotalExercises(): number {
  return programModules.reduce(
    (acc, m) =>
      acc +
      m.lessons.filter((l) => !!l.exercise).length +
      (m.standaloneExercises?.length ?? 0),
    0
  );
}

export function getExerciseByLesson(
  moduleId: number,
  lessonId: number
): {
  exercise: Exercise;
  moduleTitle: string;
  lessonTitle: string;
} | undefined {
  const mod = getModule(moduleId);
  if (!mod) return undefined;
  const lesson = mod.lessons.find((l) => l.id === lessonId);
  if (lesson?.exercise) {
    return { exercise: lesson.exercise, moduleTitle: mod.title, lessonTitle: lesson.title };
  }
  const se = mod.standaloneExercises?.find((e) => e.id === lessonId);
  if (se) {
    return {
      exercise: { title: se.title, description: se.description },
      moduleTitle: mod.title,
      lessonTitle: se.title,
    };
  }
  return undefined;
}

export function getAllExercisesFlat(): Array<{
  moduleId: number;
  moduleTitle: string;
  lessonId: number;
  lessonTitle: string;
  exerciseKey: string;
  exercise: Exercise;
}> {
  const list: Array<{
    moduleId: number;
    moduleTitle: string;
    lessonId: number;
    lessonTitle: string;
    exerciseKey: string;
    exercise: Exercise;
  }> = [];
  for (const mod of programModules) {
    for (const lesson of mod.lessons) {
      if (lesson.exercise) {
        list.push({
          moduleId: mod.id,
          moduleTitle: mod.title,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          exerciseKey: `${mod.id}-${lesson.id}`,
          exercise: lesson.exercise,
        });
      }
    }
    if (mod.standaloneExercises) {
      for (const se of mod.standaloneExercises) {
        list.push({
          moduleId: mod.id,
          moduleTitle: mod.title,
          lessonId: se.id,
          lessonTitle: se.title,
          exerciseKey: `${mod.id}-${se.id}`,
          exercise: { title: se.title, description: se.description },
        });
      }
    }
  }
  return list;
}
