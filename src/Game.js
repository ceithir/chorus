import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSection,
  setSection,
  selectChapter,
  setChapter,
} from "./features/navigation/reducer";
import { useTranslation } from "react-i18next";
import Section from "./features/navigation/Section";
import PartySelector from "./features/party/PartySelector";
import {
  CETO,
  ALECTO,
  CAROLE,
  KATRINA,
  TEKELI,
  CAMILLA,
  RASHOMON,
} from "./characters";
import Forest from "./features/forest/Forest";
import Library from "./features/library/Library";

const Game = () => {
  const section = useSelector(selectSection);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const goTo = (section) => () => dispatch(setSection(section));
  const chapter = useSelector(selectChapter);

  if (chapter === "forest") {
    return <Forest />;
  }

  if (chapter === "library") {
    return <Library />;
  }

  const meetingOrder = [CETO, ALECTO, CAROLE, KATRINA, TEKELI, CAMILLA];
  const i = meetingOrder.indexOf(section);
  if (i > -1) {
    return (
      <Section text={t(`story.meeting.${section}`)} character={meetingOrder[i]}>
        <PartySelector
          character={section}
          next={goTo(meetingOrder[i + 1] || RASHOMON)}
        />
      </Section>
    );
  }

  switch (section) {
    case RASHOMON:
      return (
        <Section
          text={t("story.meeting.rashomon")}
          next={() => dispatch(setChapter("forest"))}
          character={RASHOMON}
        />
      );
    default:
      return (
        <Section
          text={t("story.meeting.introduction")}
          next={goTo(CETO)}
          character={RASHOMON}
        />
      );
  }
};

export default Game;
