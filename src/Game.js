import React from "react";
import sanitizeHtml from "sanitize-html";
import { useSelector, useDispatch } from "react-redux";
import { selectSection, setSection } from "./features/navigation/reducer";

const hardcodedIntro = `
« Bonjour, et merci à vous d’être venues aussi nombreuses à cette permanence de l’association <em>Fanfare</em>. »
Rashomon laisse s’écouler un instant pour que le silence se fasse dans un public bien plus clairsemé que son discours poli et préparé à l’avance ne le laisse suggérer.
« Aujourd’hui, ce ne sont pas moins de trois projets qui ont besoin de votre aide. »

« Tout d’abord, en raison d’une année à 13 pleines lunes, les réserves de tue-loup, que l’association met gratuitement à la disposition des zoomorphes, sont au plus bas. Déjanire propose donc d’organiser une sortie en forêt pour récolter les ingrédients nécessaires à en produire une nouvelle fournée. »
À l’annonce de son nom, l’intéressée, debout dans un coin opposé de la salle, agite la main et sourit nerveusement à l’assemblée.

« Ensuite, la bibliothèque municipale a récemment reçu une généreuse donation d’ouvrages rares, mais leur mise en rayon a été retardée car on soupçonne la présence de livres dangereux dans ce lot.
Maharal demande notre aide pour inventorier ces opuscules sans plus tarder et ainsi débloquer la situation. »
La dénommée Maharal, adossée à un autre coin, se contente d’un hochement de tête.

« Enfin, à l’approche du solstice, les différents charmes protecteurs de la ville ont bien besoin d’un peu d’entretien, voire de réparations plus poussées, pour éviter que des esprits malicieux ne s’invitent aux festivités. Je serai en charge de cette activité. »

Rashomon marque sa dernière déclaration d’une courte pause avant d’achever sa présentation :
« Voilà pour l’idée générale. Si vous souhaitez participer à l’une de ces initiatives ou que vous avez des questions, je vous invite à aller voir la personne responsable pour en discuter plus avant. Nous resterons ici à votre disposition jusqu’à 10 heures environ. »

Un inconfortable silence répond à cette conclusion. Aucun applaudissement, aucune question, aucune réaction du public quelle qu’elle soit. Chaque fraction de l’assemblée observe soigneusement les autres, incertaine, suspicieuse, blasée, attendant d’une autre qu’elle se démarque en premier de cette maigre foule anonyme.
`;

const hardcodedCeto = `
Céto observe les trois organisatrices avec un amusement cynique teinté de jalousie.

La présentation de Rashomon était tout juste convenable, scolaire, artificielle. Du travail, des efforts, desservis par un manque certain de spontanéité, d’un lyrisme propre à enflammer les autres bénévoles. La déléguée de classe qui s’efforce de paraître sérieuse devant ses camarades, mais que
personne n’écoute vraiment attentivement.

Déjanire tient elle plus de la grande pataude timide qui essaye de se faire toute petite. Celle avec qui on essaye d’être gentil tout en soupirant intérieurement de sa gaucherie.

Quant à Maharal, c’est la gamine bizarre que personne n’arrive vraiment à cerner.

En son for intérieur, Céto ne doute pas qu’elle aurait pu faire meilleure impression que n’importe laquelle de ces trois-là si elle s’en était donnée la peine.
Toutefois, les circonstances du moment font qu’il vaut mieux, surtout quand on est une ophidienne venimeuse et pétrificatrice, éviter de s’exposer en première ligne. En conséquence, Céto a accepté de n’avoir qu’un rôle subalterne dans une association qu’elle a pourtant contribué à refonder après la réorganisation du quartier.

Elle n’en pense cependant pas moins.

Et pour couronner le tout, le reste de l’assistante n’étant constituée que de nouvelles désemparées, ou d’irrégulières guère plus débrouillardes, elle va devoir donner l’exemple ou on va y passer la matinée.
Aussi coupe-t-elle aux hésitations de son entourage en se redressant brusquement sur son séant, déroulant à la verticale plusieurs mètres de ses anneaux jusqu’à ce que sa tête frôle le plafond et qu’elle jette une ombre sur toute l’assemblée. Puis, ayant attiré l’attention de toutes, elle se rabat à une dimension plus convenable et repte en direction d’une des trois pas douées.

La tâche qui l’attire le plus est sans doute d’aller se poser dans une bibliothèque pour lire tranquillement, mais elle a également toutes les compétences requises pour les deux autres, et s’y débrouillera certainement mieux que toutes ces bleusailles.
Et, sachant qu’elle n’est pas exactement là pour s’amuser, peut-être devrait-elle s’engager dans l’activité où elle pense qu’il y aura le plus besoin d’aide plutôt que selon son humeur.
`;

const Section = ({ text, children }) => {
  return (
    <div>
      {text.split("\n").map((paragraph, index) => {
        return (
          <p
            key={index.toString()}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(paragraph) }}
          />
        );
      })}
      {children}
    </div>
  );
};

const Game = () => {
  const section = useSelector(selectSection);
  const dispatch = useDispatch();

  if (section === "ceto") {
    return <Section text={hardcodedCeto} />;
  }

  return (
    <Section text={hardcodedIntro}>
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(setSection("ceto"));
        }}
      >
        Next
      </button>
    </Section>
  );
};

export default Game;
