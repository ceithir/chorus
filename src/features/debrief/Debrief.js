import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSection,
  setSection,
  selectStep,
  nextStep,
} from "../navigation/reducer";
import Section from "../navigation/Section";
import { CETO, CAROLE, CAMILLA, ALECTO, KATRINA } from "../../characters";
import { selectForest } from "../forest/reducer";
import { selectCity } from "../city/reducer";
import { selectLibrary } from "../library/reducer";
import {
  WEST,
  divineFound,
  success as forestSuccessFunc,
} from "../forest/directions";
import {
  ROMANCE,
  MIMIC,
  ghostFound,
  success as librarySuccessFunc,
} from "../library/books";
import { score as cityScore, demonFound } from "../city/locations";
import { selectParty } from "../party/reducer";

const Debrief = () => {
  const section = useSelector(selectSection);
  const dispatch = useDispatch();
  const goTo = (section) => () => dispatch(setSection(section));
  const stepUp = () => dispatch(nextStep());
  const forest = useSelector(selectForest());
  const library = useSelector(selectLibrary());
  const forestParty = useSelector(selectParty("forest"));
  const libraryParty = useSelector(selectParty("library"));
  const cityParty = useSelector(selectParty("city"));
  const city = useSelector(selectCity());
  const step = useSelector(selectStep);

  const forestSuccess = forestSuccessFunc(forest);
  const librarySuccess = librarySuccessFunc({
    characters: libraryParty,
    assignations: library,
  });
  const citySuccess =
    cityScore(city) + (library[ROMANCE] === KATRINA ? 1 : 0) >= 2;
  const success = forestSuccess && librarySuccess && citySuccess;
  const hope =
    success &&
    [divineFound(forest), demonFound(city), ghostFound(library)].filter(Boolean)
      .length >= 2;
  const tekeliSpecial =
    [
      forestParty.includes(CETO),
      libraryParty.includes(CAMILLA),
      cityParty.includes(CAROLE),
    ].filter(Boolean).legnth >= 2;
  const alectoSpecial = forest[WEST] === ALECTO || library[MIMIC] === ALECTO;

  if (section === "ending") {
    if (!success) {
      return <Section text={`story.debrief.endings.bad`} />;
    }

    if (!hope) {
      return <Section text={`story.debrief.endings.respite`} />;
    }

    return <Section text={`story.debrief.endings.hope`} />;
  }

  const parts = (() => {
    const base = [alectoSpecial && "alecto", "dejanire-intro"].filter(Boolean);

    if (!forestSuccess) {
      return [...base, "dejanire-failure", "werebeasts"];
    }

    if (!librarySuccess) {
      return [...base, "maharal-failure", "book-burning"];
    }

    if (!citySuccess) {
      return [...base, "maharal-success", "bad-reports"];
    }

    if (tekeliSpecial) {
      return [...base, "maharal-success", "tekeli", "rashomon-success"];
    }

    return [...base, "maharal-success", "rashomon-success"];
  })();

  return (
    <Section
      text={`story.debrief.${parts[step]}`}
      next={parts[step + 1] ? stepUp : goTo("ending")}
    />
  );
};

export default Debrief;
