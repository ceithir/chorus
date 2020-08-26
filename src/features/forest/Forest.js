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
import { CETO, CAROLE, CAMILLA, ALECTO, KATRINA } from "../../characters";
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
  const stepUp = () => dispatch(nextStep());
  const forestParty = useSelector(selectParty("forest"));
  const forest = useSelector(selectForest());
  const step = useSelector(selectStep);

  const PLANNING = "planning";
  const EXPLORATION = "exploration";

  if (section === EXPLORATION) {
    const root = "story.forest.exploration";

    const adventures = ["north", "east", "south", "west"]
      .map((direction) => {
        const character = forest[direction];
        if (!character) {
          return "";
        }
        if (
          direction === "west" &&
          [ALECTO, CAMILLA, KATRINA].includes(character)
        ) {
          const tree = `${root}.monster`;

          return Object.keys(t(tree, { returnObjects: true }))
            .map((index) => {
              return t(`${tree}.${index}.${character}`, {
                defaultValue: t(`${tree}.${index}.default`),
              });
            })
            .join("\n\n");
        }

        const key = `story.forest.exploration.${character}.${direction}`;
        const fallbackKey = `story.forest.exploration.${character}.default`;
        return t(key, { defaultValue: t(fallbackKey) });
      })
      .filter(Boolean);
    return (
      <Section
        text={adventures[step]}
        next={!!adventures[step + 1] ? stepUp : () => console.log("TODO")}
      />
    );
  }

  if (section === PLANNING) {
    const completed = forestParty.every((character) =>
      Object.values(forest).includes(character)
    );

    return (
      <Section
        text={t("story.forest.planning")}
        next={completed && goTo(EXPLORATION)}
      >
        <ForestSelector characters={forestParty} />
        {completed && (
          <Paragraph>
            <p>{t("story.forest.split")}</p>
          </Paragraph>
        )}
      </Section>
    );
  }

  const introduction = (() => {
    let parts = ["part-1"];

    if (forestParty.includes(CETO)) {
      parts.push("ceto");
    }

    parts.push("part-2");

    if (forestParty.includes(CAMILLA)) {
      parts.push("camilla");
    }

    parts.push("part-3");

    if (forestParty.includes(CAROLE)) {
      parts.push("carole");
    }

    return parts;
  })();

  return (
    <Section
      text={t(`story.forest.introduction.${introduction[step]}`)}
      next={!!introduction[step + 1] ? stepUp : goTo(PLANNING)}
    />
  );
};

export default Forest;
