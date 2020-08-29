import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSection,
  setSection,
  selectStep,
  nextStep,
} from "../navigation/reducer";
import { useTranslation } from "react-i18next";
import Section from "../navigation/Section";
import { CETO, KATRINA, MAHARAL } from "../../characters";
import { selectParty } from "../party/reducer";

const Library = () => {
  const section = useSelector(selectSection);
  const step = useSelector(selectStep);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const goTo = (section) => () => dispatch(setSection(section));
  const stepUp = () => dispatch(nextStep());
  const party = useSelector(selectParty("library"));

  const PLANNING = "planning";
  if (section === PLANNING) {
    return (
      <Section
        text={t(`story.library.planning`)}
        next={() => console.log("TODO")}
      />
    );
  }

  const introduction = [MAHARAL, CETO, KATRINA].filter((character) =>
    party.includes(character)
  );
  const character = introduction[step];

  return (
    <Section
      text={t(`story.library.introduction.${character}`)}
      character={character}
      next={!!introduction[step + 1] ? stepUp : goTo(PLANNING)}
    />
  );
};

export default Library;