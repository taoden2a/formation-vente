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
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  content?: string[];
  takeaways: string[];
  exercise?: Exercise;
}

export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
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
// CONTENU PREMIUM COMPLET - 9 MODULES, 27 LECONS
// ============================================================================

export const programModules: Module[] = [
  {
    id: 1,
    title: "Comment le cerveau prend une decision d'achat",
    lessons: [
      {
        id: 1,
        title: "Pourquoi nous n’achetons jamais de manière rationnelle ?",
        description:
          "Decouvrez comment le cerveau humain fonctionne lorsqu'il prend une decision d'achat. Comprendre ces mecanismes est la base de toute strategie de vente efficace.",
        content: [
          "Pourquoi nous n’achetons jamais de manière rationnelle : De nombreuses études montrent que l’être humain ne décide pas d’acheter sur une pure analyse logique.",
          "En réalité, environ 70 à 95% des décisions d’achat seraient pilotées par des processus émotionnels ou automatiques inconscients .",
           "Par exemple, les recherches Gallup indiquent que près de 70% des décisions sont basées sur des facteurs émotionnels contre 30% seulement sur des facteurs rationnels .",
            "Notre cerveau privilégie l’intuition et les ressentis, puis ne rationalise qu’après coup pour justifier le choix effectué .",
             "Autrement dit, nous achetons d’abord avec nos émotions, puis nous utilisons la raison pour nous conforter dans notre achat.",
              "Le neuroscientifique Antonio Damasio a illustré ce phénomène : des patients ayant des lésions dans les zones émotionnelles du cerveau se sont révélés incapables de prendre la moindre décision, même simple, malgré un raisonnement intact .",
               "Sans émotions, le choix devient presque impossible, ce qui prouve que l’émotion est un composant central et incontournable de toute décision d’achat .",
        ],
        takeaways: [
          "Le cerveau prend 95% des decisions de maniere inconsciente",
          "Les emotions precedent toujours la rationalisation",
          "La vente efficace parle d'abord au cerveau limbique",
        ],
        exercise: {
          title: "Analysez votre dernier achat",
          description: "Pensez a votre dernier achat significatif (>50EUR). Decrivez les emotions que vous avez ressenties avant, pendant et apres l'achat. Identifiez quel 'cerveau' a pris la decision finale."
        }
      },
      {
        id: 2,
        title: "Les 3 cerveaux et leur role dans l'achat",
        description:
          "Le modele des trois cerveaux (reptilien, limbique, neocortex) et comment chacun influence differemment la decision d'achat.",
        content: [
          "Le cerveau reptilien est le plus ancien. Il gere nos instincts de survie : securite, alimentation, reproduction. En vente, c'est lui qui reagit aux garanties, aux preuves sociales massives, aux elements de reassurance.",
          "Le cerveau limbique est le siege des emotions et de la memoire. C'est lui qui cree l'attachement a une marque, qui ressent l'excitation d'une nouveaute, qui genere la confiance. Il est sensible aux histoires, aux images, aux experiences.",
          "Le neocortex, le plus recent, gere la logique et le langage. C'est lui qui justifie apres coup la decision prise par les deux autres. Il a besoin de chiffres, de comparaisons, d'arguments rationnels pour 'valider' ce que le reste du cerveau a deja decide."
        ],
        takeaways: [
          "Le cerveau reptilien cherche la survie et la securite",
          "Le cerveau limbique gere les emotions et la confiance",
          "Le neocortex rationalise apres coup",
        ],
        exercise: {
          title: "Cartographiez votre communication",
          description: "Prenez votre page de vente ou pitch actuel. Pour chaque argument, identifiez quel cerveau il cible. Avez-vous un equilibre ? Que manque-t-il ?"
        }
      },
      {
        id: 3,
        title: "Le parcours neurologique de la decision",
        description:
          "De la premiere impression a la decision finale : comment le cerveau traite l'information et arrive a un choix.",
        content: [
          "Tout commence par l'attention. Votre cerveau filtre des millions d'informations chaque seconde. Seules celles jugees pertinentes pour votre survie ou vos objectifs passent le filtre. C'est pourquoi les premieres secondes de tout message sont cruciales.",
          "Une fois l'attention captee, le cerveau evalue rapidement : est-ce une menace ou une opportunite ? Cette evaluation est emotionnelle, instantanee, et souvent definitive. Si votre prospect ressent du stress, de la confusion ou de la mefiance a ce stade, la vente est compromise.",
          "Enfin, si l'evaluation est positive, le cerveau engage ses ressources pour analyser plus en detail. C'est a ce moment que les arguments logiques entrent en jeu. Mais sans les deux etapes precedentes, ils ne seront jamais entendus."
        ],
        takeaways: [
          "L'attention est la premiere ressource a capter",
          "La memoire emotionnelle influence fortement les choix",
          "La decision est souvent prise avant d'en etre conscient",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Les biais cognitifs vraiment utiles en vente",
    lessons: [
      {
        id: 1,
        title: "Introduction aux biais cognitifs",
        description:
          "Qu'est-ce qu'un biais cognitif et pourquoi sont-ils si puissants pour influencer les decisions.",
        content: [
          "Un biais cognitif est un raccourci mental que notre cerveau utilise pour prendre des decisions rapidement. Ces raccourcis ont ete utiles pour notre survie, mais ils peuvent aussi nous conduire a des erreurs de jugement previsibles.",
          "En vente ethique, comprendre les biais n'est pas une invitation a manipuler, mais a communiquer plus efficacement. Si vous savez que votre prospect est naturellement attire par ce qui est rare, vous pouvez structurer votre offre pour mettre en avant sa vraie rarete, pas en inventer une fausse.",
          "Les biais fonctionnent parce qu'ils sont automatiques. Votre prospect ne choisit pas d'y repondre, c'est une reaction neurologique. Votre responsabilite est d'utiliser cette connaissance pour l'aider a prendre la meilleure decision pour lui."
        ],
        takeaways: [
          "Les biais sont des raccourcis mentaux automatiques",
          "Ils ne sont ni bons ni mauvais, c'est l'usage qui compte",
          "Comprendre les biais permet une communication plus efficace",
        ],
        exercise: {
          title: "Identifiez vos propres biais",
          description: "Repensez a une decision d'achat que vous regrettez. Quel biais cognitif a pu influencer votre choix ? Comment auriez-vous pu vous proteger ?"
        }
      },
      {
        id: 2,
        title: "Biais de reciprocite et d'engagement",
        description:
          "Comment utiliser le principe de reciprocite et l'engagement progressif pour construire une relation de confiance.",
        content: [
          "Le biais de reciprocite est l'un des plus puissants : quand quelqu'un nous donne quelque chose, nous ressentons une obligation naturelle de rendre la pareille. C'est ancre dans notre ADN social.",
          "En vente, cela se traduit par la valeur gratuite que vous offrez avant de demander quoi que ce soit : guides, conseils, echantillons. Plus la valeur percue est elevee, plus le sentiment d'obligation est fort.",
          "L'engagement progressif fonctionne sur le principe de coherence : une fois qu'on s'est engage dans une direction (meme petit engagement), on a tendance a continuer dans cette voie pour rester coherent avec soi-meme."
        ],
        takeaways: [
          "Donner avant de recevoir cree un sentiment d'obligation",
          "Les petits engagements preparent les grands",
          "La coherence est un moteur puissant de comportement",
        ],
      },
      {
        id: 3,
        title: "Preuve sociale et autorite",
        description:
          "L'influence du groupe et de l'expertise percue sur les decisions d'achat.",
        content: [
          "Nous sommes des animaux sociaux. Quand nous ne savons pas quoi faire, nous regardons ce que font les autres. C'est le biais de preuve sociale : si beaucoup de personnes font quelque chose, ca doit etre la bonne chose a faire.",
          "L'autorite fonctionne differemment : nous avons tendance a suivre les experts, les figures d'autorite, ceux qui ont les signes exterieurs de competence. Un titre, une certification, des annees d'experience - tout cela renforce l'influence.",
          "Combiner les deux est extremement puissant : 'Rejoignez 10 000 entrepreneurs qui ont suivi cette formation concue par un expert avec 20 ans d'experience.'"
        ],
        takeaways: [
          "Les temoignages reduisent le risque percu",
          "L'autorite se construit par la demonstration",
          "Les certifications et logos renforcent la credibilite",
        ],
      },
      {
        id: 4,
        title: "Rarete et urgence ethique",
        description:
          "Creer un sentiment d'urgence sans manipulation : les bonnes pratiques.",
        content: [
          "Le biais de rarete nous fait valoriser davantage ce qui est limite ou en voie de disparition. C'est un vestige de notre evolution : les ressources rares devaient etre saisies rapidement.",
          "L'urgence ethique repose sur des limites reelles : votre temps est limite, les places sont reellement comptees, l'offre expire vraiment. La fausse rarete est non seulement manipulatrice, elle detruit aussi votre credibilite a long terme.",
          "Communiquez clairement pourquoi c'est rare ou urgent. 'Je n'accompagne que 5 clients par mois car chaque projet demande mon attention complete' est bien plus credible qu'un compte a rebours qui recommence."
        ],
        takeaways: [
          "La rarete reelle est plus efficace que la fausse",
          "L'urgence doit etre justifiee et honnete",
          "La peur de manquer (FOMO) est un levier puissant",
        ],
        exercise: {
          title: "Audit de rarete",
          description: "Analysez votre offre actuelle. Quelle rarete reelle pouvez-vous mettre en avant ? (temps, places, edition limitee, votre disponibilite...). Evitez toute fausse rarete."
        }
      },
    ],
  },
  {
    id: 3,
    title: "Comprendre profondement son client",
    lessons: [
      {
        id: 1,
        title: "Au-dela des donnees demographiques",
        description:
          "Pourquoi les donnees classiques ne suffisent pas et comment aller plus loin dans la comprehension client.",
        content: [
          "Les donnees demographiques (age, sexe, revenus, localisation) sont utiles pour le ciblage publicitaire, mais elles ne vous disent rien sur les motivations d'achat. Deux personnes identiques demographiquement peuvent avoir des raisons completement differentes d'acheter.",
          "Ce qui compte vraiment, ce sont les psychographiques : les valeurs, les peurs, les aspirations, les frustrations. Un entrepreneur de 35 ans peut vouloir plus de liberte, tandis qu'un autre du meme profil cherche la reconnaissance.",
          "L'empathie est la competence cle. Il ne s'agit pas de deviner ce que pensent vos clients, mais de creer les conditions pour vraiment les comprendre : interviews, observations, analyse des comportements."
        ],
        takeaways: [
          "Les donnees demographiques ne predisent pas les comportements",
          "Les motivations profondes sont universelles",
          "L'empathie est la competence cle",
        ],
      },
      {
        id: 2,
        title: "Les vraies motivations d'achat",
        description:
          "Identifier ce qui pousse reellement quelqu'un a acheter : desirs, peurs, aspirations.",
        content: [
          "Derriere chaque achat, il y a une transformation souhaitee. Votre client n'achete pas un produit, il achete une version amelioree de lui-meme ou de sa situation.",
          "Les motivations se divisent en deux categories : s'eloigner de quelque chose (douleur, frustration, peur) ou se rapprocher de quelque chose (plaisir, statut, accomplissement). Les deux sont puissantes, mais la douleur motive souvent plus rapidement.",
          "La cle est de trouver la motivation cachee, celle que le client n'exprime pas directement. 'Je veux perdre du poids' cache peut-etre 'Je veux me sentir desirable' ou 'Je veux avoir l'energie de jouer avec mes enfants'."
        ],
        takeaways: [
          "On achete pour resoudre un probleme ou atteindre un desir",
          "La douleur motive plus que le plaisir",
          "Les motivations cachees sont souvent les plus fortes",
        ],
        exercise: {
          title: "Interview client",
          description: "Contactez un de vos clients recents. Demandez-lui pourquoi il a vraiment achete. Creusez avec des 'pourquoi' successifs jusqu'a atteindre la motivation profonde."
        }
      },
      {
        id: 3,
        title: "L'art de poser les bonnes questions",
        description:
          "Techniques d'interview et de decouverte pour reveler les besoins profonds.",
        content: [
          "Les questions fermees (oui/non) donnent peu d'information. Les questions ouvertes ('Comment...', 'Pourquoi...', 'Qu'est-ce qui...') ouvrent la conversation et revelent les vrais enjeux.",
          "La technique des 5 pourquoi est simple mais puissante : a chaque reponse, demandez 'pourquoi ?'. En 5 iterations, vous arrivez generalement a la motivation racine.",
          "Le silence est votre allie. Apres une question importante, laissez un silence. La plupart des gens comblent le vide avec des informations supplementaires, souvent les plus revelent."
        ],
        takeaways: [
          "Les questions ouvertes revelent plus d'informations",
          "Ecouter activement est plus important que parler",
          "Les silences sont des outils puissants",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Construire une offre qui donne envie d'acheter",
    lessons: [
      {
        id: 1,
        title: "Les composantes d'une offre irresistible",
        description:
          "Structure et elements essentiels pour construire une offre qui convertit naturellement.",
        content: [
          "Une offre irresistible n'est pas une question de prix bas. C'est une equation entre la valeur percue et le prix demande. Si la valeur percue depasse largement le prix, l'achat devient une evidence.",
          "Les composantes cles : une promesse claire, des benefices tangibles, des preuves credibles, une garantie qui elimine le risque, et un appel a l'action simple. Chaque element renforce les autres.",
          "La clarte est cruciale. Si votre prospect doit reflechir pour comprendre ce qu'il obtient, vous avez deja perdu. L'offre doit etre immediatement comprehensible."
        ],
        takeaways: [
          "La clarte de l'offre est primordiale",
          "La valeur percue doit depasser largement le prix",
          "Les garanties reduisent le risque percu",
        ],
        exercise: {
          title: "Deconstruisez une offre",
          description: "Choisissez une offre qui vous a convaincu d'acheter. Listez tous ses composants : promesse principale, benefices, bonus, garanties, urgence. Qu'est-ce qui a fait la difference ?"
        }
      },
      {
        id: 2,
        title: "Transformer les caracteristiques en benefices",
        description:
          "Comment passer du 'ce que c'est' au 'ce que ca vous apporte' dans votre communication.",
        content: [
          "Une caracteristique decrit ce que c'est. Un benefice decrit ce que ca change pour le client. La formation fait 10 heures (caracteristique) vs Vous maitriserez la vente en 10 heures (benefice).",
          "Pour chaque caracteristique, posez la question 'Et alors ?'. Repetez jusqu'a arriver a l'impact concret sur la vie du client. C'est la que se trouve le vrai argument de vente.",
          "Les benefices emotionnels sont souvent plus puissants que les benefices fonctionnels. 'Gagnez du temps' est fonctionnel. 'Retrouvez vos soirees en famille' est emotionnel."
        ],
        takeaways: [
          "Les clients achetent des resultats, pas des fonctionnalites",
          "Chaque caracteristique doit repondre a un 'et alors ?'",
          "Les benefices emotionnels sont plus puissants",
        ],
      },
      {
        id: 3,
        title: "Le positionnement prix strategique",
        description:
          "Comment fixer et presenter votre prix pour maximiser la valeur percue.",
        content: [
          "Le prix n'est jamais absolu, il est toujours relatif. Relatif aux alternatives, aux experiences passees, aux attentes. Votre travail est de controler ces references.",
          "L'ancrage est puissant : presentez d'abord une option plus chere, et votre offre principale semblera plus accessible. Ce n'est pas de la manipulation si les deux options ont une vraie valeur.",
          "Les options de paiement peuvent transformer un 'non' en 'oui'. Ce n'est pas une question d'argent total, mais de flux de tresorerie. 3x sans frais rend beaucoup de choses accessibles."
        ],
        takeaways: [
          "Le prix communique une valeur",
          "L'ancrage influence la perception du prix",
          "Les options de paiement peuvent lever des freins",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Parler pour vendre",
    lessons: [
      {
        id: 1,
        title: "Les fondamentaux de la persuasion orale",
        description:
          "Structure et techniques pour des presentations commerciales qui convertissent.",
        content: [
          "Une presentation persuasive suit une structure : capter l'attention, etablir la credibilite, presenter le probleme, proposer la solution, prouver que ca marche, appeler a l'action.",
          "Les histoires sont 22 fois plus memorables que les faits seuls. Illustrez chaque point cle avec une histoire : la votre, celle d'un client, ou une metaphore parlante.",
          "La repetition n'est pas ennuyeuse, elle est necessaire. Votre message cle doit etre repete au moins trois fois sous differentes formes pour etre retenu."
        ],
        takeaways: [
          "La structure guide l'attention",
          "Les histoires sont plus memorables que les faits",
          "La repetition renforce le message",
        ],
      },
      {
        id: 2,
        title: "Gerer les objections a l'oral",
        description:
          "Techniques pour transformer les objections en opportunites de renforcer la confiance.",
        content: [
          "Une objection n'est pas un rejet, c'est une demande d'information. Le prospect dit 'j'ai besoin d'en savoir plus sur ce point avant de me decider'. C'est positif : il considere serieusement votre offre.",
          "La premiere regle : ne jamais contredire directement. 'Je comprends votre preoccupation...' puis apportez une perspective nouvelle. Validez l'emotion avant de repondre au fond.",
          "Anticipez les objections courantes et integrez les reponses dans votre presentation. C'est plus puissant que d'y repondre apres coup."
        ],
        takeaways: [
          "Les objections sont des demandes d'information",
          "Valider avant de repondre",
          "Anticiper les objections courantes",
        ],
        exercise: {
          title: "Preparez vos reponses",
          description: "Listez les 5 objections que vous entendez le plus souvent. Pour chacune, preparez une reponse qui valide d'abord le concern, puis apporte une perspective nouvelle."
        }
      },
      {
        id: 3,
        title: "L'art du closing conversationnel",
        description:
          "Comment conclure naturellement une vente sans pression ni manipulation.",
        content: [
          "Le closing n'est pas une technique isolee, c'est la suite logique d'une conversation bien menee. Si vous avez bien compris le besoin, presente la solution, et repondu aux objections, le closing est une formalite.",
          "Les signaux d'achat indiquent le bon moment : questions sur les details pratiques, projections dans l'utilisation, comparaisons avec d'autres options. Quand vous les voyez, il est temps de conclure.",
          "La clarte sur les prochaines etapes rassure. Ne laissez pas votre prospect dans le flou : 'Voici comment ca se passe...' et decrivez le processus simple et clair."
        ],
        takeaways: [
          "Le closing est une suite logique, pas une technique",
          "Les signaux d'achat indiquent le bon moment",
          "La clarte sur les prochaines etapes rassure",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Ecrire pour vendre",
    lessons: [
      {
        id: 1,
        title: "Les principes du copywriting efficace",
        description:
          "Les fondamentaux de l'ecriture persuasive qui s'appliquent a tous les supports.",
        content: [
          "L'accroche determine tout. Vous avez 3 secondes pour capter l'attention. Si votre premiere phrase n'accroche pas, le reste ne sera jamais lu.",
          "Un message = une idee principale. La confusion tue la conversion. Meme si vous avez 10 arguments, choisissez le plus puissant et construisez autour.",
          "L'action souhaitee doit etre limpide. Chaque piece de contenu doit avoir UN objectif clair : cliquer, s'inscrire, acheter. Pas deux, pas trois. Un."
        ],
        takeaways: [
          "L'accroche determine si le reste sera lu",
          "Un message = une idee principale",
          "L'action souhaitee doit etre claire",
        ],
        exercise: {
          title: "Reecrivez votre accroche",
          description: "Prenez l'accroche principale de votre site ou pitch. Ecrivez 10 versions alternatives. Testez la meilleure aupres de 3 personnes de votre cible."
        }
      },
      {
        id: 2,
        title: "Structurer une page de vente",
        description:
          "Architecture d'une page qui guide le lecteur vers la decision d'achat.",
        content: [
          "Une page de vente suit un parcours emotionnel : attention, probleme, agitation, solution, preuve, offre, action. Chaque section prepare la suivante.",
          "Chaque section a un objectif : le titre capte l'attention, l'intro identifie le probleme, le corps presente la solution, les temoignages prouvent, l'offre concrete, le CTA actionne.",
          "Les preuves sociales doivent etre strategiquement placees : apres chaque affirmation majeure, apres la presentation du prix, juste avant le CTA. Elles levent les doutes au bon moment."
        ],
        takeaways: [
          "Le parcours de lecture doit etre fluide",
          "Chaque section a un objectif precis",
          "Les preuves sociales renforcent chaque argument",
        ],
      },
      {
        id: 3,
        title: "Emails et sequences de vente",
        description:
          "Creer des sequences email qui nurturent et convertissent sans spammer.",
        content: [
          "La frequence depend de la valeur. Vous pouvez envoyer tous les jours si chaque email apporte quelque chose. Vous etes spam si vous demandez sans donner.",
          "Chaque email doit tenir une promesse : enseigner quelque chose, divertir, inspirer, ou resoudre un probleme. Meme un email de vente peut apporter de la valeur.",
          "L'objet determine le taux d'ouverture. Soyez specifique, creez de la curiosite, evitez les mots spam. Testez plusieurs versions sur de petits segments avant d'envoyer a toute la liste."
        ],
        takeaways: [
          "La frequence depend de la valeur apportee",
          "Chaque email doit apporter quelque chose",
          "L'objet determine le taux d'ouverture",
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
        title: "Choisir les bons canaux d'acquisition",
        description:
          "Comment identifier et prioriser les canaux marketing adaptes a votre activite.",
        content: [
          "Etre present partout dilue votre effort et votre message. Mieux vaut dominer un canal que d'etre mediocre sur dix.",
          "Le bon canal depend de votre audience (ou est-elle ?), de vos ressources (temps, budget, competences), et de votre offre (visuelle ? technique ? relationnelle ?).",
          "Commencez par un canal, maitrisez-le, systematisez-le, puis ajoutez-en un autre. La croissance vient de la maitrise, pas de la dispersion."
        ],
        takeaways: [
          "Etre present partout dilue l'effort",
          "Maitriser un canal avant d'en ajouter d'autres",
          "Les canaux payants accelerent, les organiques durent",
        ],
      },
      {
        id: 2,
        title: "Creer du contenu qui attire",
        description:
          "Strategie de contenu pour attirer naturellement les clients potentiels.",
        content: [
          "Le meilleur contenu repond aux questions que vos prospects se posent avant de savoir que vous existez. C'est du contenu d'attraction, pas de promotion.",
          "La regularite prime sur la perfection. Un contenu 'assez bon' publie regulierement bat un contenu parfait publie rarement. L'algorithme et votre audience recompensent la constance.",
          "Adaptez le format au canal et a l'audience. Une meme idee peut devenir un post LinkedIn, une video YouTube, un thread Twitter, un article de blog. Reutilisez intelligemment."
        ],
        takeaways: [
          "Le contenu repond aux questions des prospects",
          "La regularite prime sur la perfection",
          "Le format depend de l'audience et du canal",
        ],
      },
      {
        id: 3,
        title: "Convertir le trafic en prospects",
        description:
          "Mecaniques de conversion : du visiteur au lead qualifie.",
        content: [
          "L'offre de valeur initiale (lead magnet) doit etre irresistible : specifique, actionnable, et directement liee a votre offre payante. Un guide vague ne convertit pas.",
          "Chaque etape supplementaire divise vos conversions par deux. Reduisez la friction au minimum : moins de champs, moins de clics, moins de decisions a prendre.",
          "Le suivi rapide est crucial. Un prospect chaud aujourd'hui est tiede demain et froid apres-demain. Automatisez pour repondre immediatement."
        ],
        takeaways: [
          "L'offre de valeur initiale doit etre irresistible",
          "La friction reduit les conversions",
          "Le suivi rapide augmente les chances de conversion",
        ],
        exercise: {
          title: "Optimisez un point de conversion",
          description: "Identifiez le point de conversion le plus faible de votre tunnel (inscription, prise de RDV, achat...). Listez 5 sources de friction potentielles et proposez une solution pour chacune."
        }
      },
    ],
  },
  {
    id: 8,
    title: "Ethique, limites et credibilite",
    lessons: [
      {
        id: 1,
        title: "Les lignes rouges de la persuasion",
        description:
          "Ou s'arrete l'influence ethique et ou commence la manipulation.",
        content: [
          "La difference fondamentale : l'influence aide quelqu'un a prendre une decision qui est bonne pour lui. La manipulation l'amene a prendre une decision qui sert vos interets aux depens des siens.",
          "Le consentement eclaire est non negociable. Votre client doit comprendre ce qu'il achete, ce qu'il obtient, et ce qu'il ne obtient pas. Pas de fines lignes, pas de surprises.",
          "Posez-vous la question : 'Si mon client savait tout ce que je sais, acheterait-il quand meme ?' Si la reponse est non, vous etes dans la manipulation."
        ],
        takeaways: [
          "La manipulation exploite, l'influence informe",
          "Le consentement eclaire est non negociable",
          "La reputation se construit sur la duree",
        ],
      },
      {
        id: 2,
        title: "Construire une credibilite durable",
        description:
          "Comment batir et maintenir une reputation qui renforce naturellement vos ventes.",
        content: [
          "La credibilite se gagne par les actes, pas par les paroles. Chaque promesse tenue, chaque resultat delivre, chaque client satisfait ajoute a votre capital confiance.",
          "Les erreurs reconnues renforcent paradoxalement la confiance. Personne n'est parfait, et un vendeur qui admet ses limites est plus credible qu'un qui pretend tout savoir.",
          "La transparence est un avantage competitif dans un monde de mefiance. Partagez vos methodes, expliquez vos prix, montrez vos coulisses. Ca desarme les sceptiques."
        ],
        takeaways: [
          "La credibilite se gagne par les actes",
          "Les erreurs reconnues renforcent la confiance",
          "La transparence est un avantage competitif",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Mise en pratique finale",
    lessons: [
      {
        id: 1,
        title: "Analyse de votre situation actuelle",
        description:
          "Audit complet de votre approche commerciale actuelle et identification des axes d'amelioration.",
        content: [
          "L'honnetete dans l'auto-evaluation est cruciale. Identifiez vos forces reelles (pas celles que vous aimeriez avoir) et vos faiblesses (pas celles qui sont 'acceptables').",
          "Evaluez chaque composante : clarte de votre offre, comprehension de votre client, capacite de persuasion, efficacite de votre tunnel, qualite de votre suivi.",
          "Priorisez les changements a fort impact. Le 80/20 s'applique : 20% des ameliorations apporteront 80% des resultats. Concentrez-vous sur ces 20%."
        ],
        takeaways: [
          "L'honnetete dans l'auto-evaluation est cruciale",
          "Les petites ameliorations s'accumulent",
          "Prioriser les changements a fort impact",
        ],
        exercise: {
          title: "Auto-audit commercial",
          description: "Evaluez votre approche actuelle sur 5 criteres : clarte de l'offre, comprehension client, persuasion ethique, tunnel de conversion, suivi. Notez chaque critere de 1 a 10."
        }
      },
      {
        id: 2,
        title: "Plan d'action personnalise",
        description:
          "Creation de votre feuille de route pour appliquer les apprentissages de la formation.",
        content: [
          "Un plan simple et actionnable vaut mieux qu'un plan parfait jamais execute. Trois actions concretes cette semaine valent mieux que dix 'un jour'.",
          "Fixez des delais. 'Je vais ameliorer ma page de vente' ne veut rien dire. 'Je reecris mon accroche d'ici vendredi' est actionnable.",
          "Mesurez pour progresser. Definissez des indicateurs simples : taux de conversion, nombre de prospects, chiffre d'affaires. Ce qui se mesure s'ameliore."
        ],
        takeaways: [
          "Un plan simple et actionnable vaut mieux qu'un plan parfait",
          "Les delais creent de la responsabilite",
          "Mesurer pour progresser",
        ],
      },
      {
        id: 3,
        title: "Exercice de synthese",
        description:
          "Mettez en pratique l'ensemble des concepts sur votre propre projet.",
        content: [
          "C'est en faisant qu'on apprend vraiment. Cette formation n'a de valeur que si vous appliquez. Commencez imparfaitement mais commencez.",
          "L'iteration ameliore les resultats. Votre premiere version ne sera pas parfaite, et c'est normal. Testez, mesurez, ajustez, repetez.",
          "Le feedback accelere l'apprentissage. Montrez votre travail, demandez des retours, acceptez les critiques constructives. C'est le chemin le plus rapide vers l'excellence."
        ],
        takeaways: [
          "La pratique revele les zones d'ombre",
          "L'iteration ameliore les resultats",
          "Le feedback accelere l'apprentissage",
        ],
        exercise: {
          title: "Pitch final",
          description: "Redigez un pitch de vente complet pour votre offre en appliquant tous les concepts de la formation. Incluez : accroche, probleme, solution, benefices, preuve sociale, garantie, appel a l'action."
        }
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
  {
    id: "audit-ethique",
    title: "Audit ethique",
    description: "Verifiez que vos pratiques respectent les principes ethiques.",
    type: "PDF",
    moduleId: 8,
    downloadUrl: "/downloads/audit-ethique.pdf",
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
  }

  return exercises;
}

export function getTemplate(templateId: string): Template | undefined {
  return templates.find((t) => t.id === templateId);
}

export function getLessonKey(moduleId: number, lessonId: number): string {
  return `${moduleId}-${lessonId}`;
}
