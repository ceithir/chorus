import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSection,
  setSection,
  selectStep,
  nextStep,
} from "../navigation/reducer";
import Section from "../navigation/Section";
import { CETO, CAROLE, CAMILLA, ALECTO } from "../../characters";
import { selectForest } from "../forest/reducer";
import { selectCity } from "../city/reducer";
import { selectLibrary } from "../library/reducer";
import {
  WEST,
  divineFound,
  success as forestSuccessFunc,
} from "../forest/directions";
import {
  MIMIC,
  ghostFound,
  success as librarySuccessFunc,
} from "../library/books";
import { demonFound, success as citySuccessFunc } from "../city/locations";
import { selectParty } from "../party/reducer";
import EndingSection from "./EndingSection";

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
  const citySuccess = citySuccessFunc(city);
  const entitiesFound =
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
    return (
      <EndingSection
        forestSuccess={forestSuccess}
        librarySuccess={librarySuccess}
        citySuccess={citySuccess}
        entitiesFound={entitiesFound}
      />
    );
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
