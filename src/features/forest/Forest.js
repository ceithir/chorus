import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSection, setSection } from "../navigation/reducer";
import { useTranslation } from "react-i18next";
import Section from "../navigation/Section";
import { CETO, CAROLE, CAMILLA } from "../../characters";
import { selectParty } from "../party/reducer";
import ForestSelector from "./ForestSelector";
import { selectForest } from "./reducer";
import { Typography } from "antd";

const { Paragraph } = Typography;

const Forest = () => {
  const section = useSelector(selectSection);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const goTo = (section) => () => dispatch(setSection(section));
  const forestParty = useSelector(selectParty("forest"));
  const forest = useSelector(selectForest());

  const PLANNING = "planning";

  if (section === PLANNING) {
    const completed = forestParty.every((character) =>
      Object.values(forest).includes(character)
    );
    const next = () => {
      console.log("TODO");
    };

    return (
      <Section text={t("story.forest.planning")} next={completed && next}>
        <ForestSelector characters={forestParty} />
        {completed && (
          <Paragraph>
            <p>{t("story.forest.split")}</p>
          </Paragraph>
        )}
      </Section>
    );
  }

  const [, part] = section?.split(".") || ["introduction", "part-1"];

  const next = (() => {
    switch (part) {
      case CAROLE:
        return PLANNING;
      case "part-3":
        return forestParty.includes(CAROLE) ? "introduction.carole" : PLANNING;
      case CAMILLA:
        return "introduction.part-3";
      case "part-2":
        return forestParty.includes(CAMILLA)
          ? "introduction.camilla"
          : "introduction.part-3";
      case CETO:
        return "introduction.part-2";
      default:
        return forestParty.includes(CETO)
          ? "introduction.ceto"
          : "introduction.part-2";
    }
  })();

  return (
    <Section text={t(`story.forest.introduction.${part}`)} next={goTo(next)} />
  );
};

export default Forest;
