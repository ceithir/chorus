import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSection, setSection } from "./features/navigation/reducer";
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
  MAHARAL,
} from "./characters";

const Game = () => {
  const section = useSelector(selectSection);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const goTo = (section) => () => dispatch(setSection(section));

  const meetingOrder = [CETO, ALECTO, CAROLE, KATRINA, TEKELI, CAMILLA];
  const i = meetingOrder.indexOf(section);
  if (i > -1) {
    return (
      <Section text={t(`story.meeting.${section}`)}>
        <PartySelector
          character={section}
          next={goTo(i >= meetingOrder.length ? MAHARAL : meetingOrder[i + 1])}
        />
      </Section>
    );
  }

  switch (section) {
    case MAHARAL:
      return <Section text={t("story.meeting.maharal")} />;
    default:
      return (
        <Section text={t("story.meeting.introduction")} next={goTo(CETO)} />
      );
  }
};

export default Game;
