import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSection, setSection } from "./features/navigation/reducer";
import { useTranslation } from "react-i18next";
import Section from "./features/navigation/Section";

const sectionProps = ({ section, t, dispatch }) => {
  switch (section) {
    case "ceto":
      return { text: t("story.meeting.ceto") };
    default:
      return {
        text: t("story.meeting.introduction"),
        next: () => dispatch(setSection("ceto")),
      };
  }
};

const Game = () => {
  const section = useSelector(selectSection);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return <Section {...sectionProps({ section, t, dispatch })} />;
};

export default Game;
