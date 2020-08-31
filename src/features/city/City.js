import React from "react";
import { useTranslation } from "react-i18next";
import Section from "../navigation/Section";
import { RASHOMON } from "../../characters";
import { useSelector, useDispatch } from "react-redux";
import { selectSection, setSection } from "../navigation/reducer";

const City = () => {
  const { t } = useTranslation();
  const section = useSelector(selectSection);
  const dispatch = useDispatch();
  const goTo = (section) => () => dispatch(setSection(section));

  const SPLIT = "split";
  if (section === SPLIT) {
    return (
      <Section
        text={t(`story.city.split`)}
        character={RASHOMON}
        next={() => console.log("TODO")}
      />
    );
  }

  return (
    <Section
      text={t(`story.city.introduction`)}
      character={RASHOMON}
      next={goTo(SPLIT)}
    />
  );
};

export default City;
