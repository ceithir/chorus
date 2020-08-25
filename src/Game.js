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
import { selectParty } from "./features/party/reducer";
import ForestSelector from "./features/forest/ForestSelector";
import { selectForest } from "./features/forest/reducer";
import { Typography } from "antd";

const { Paragraph } = Typography;

const Game = () => {
  const section = useSelector(selectSection);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const goTo = (section) => () => dispatch(setSection(section));
  const goToChapter = (chapter) => () => dispatch(setChapter(chapter));
  const chapter = useSelector(selectChapter);
  const forestParty = useSelector(selectParty("forest"));
  const forest = useSelector(selectForest());

  if (chapter === "forest") {
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
          return forestParty.includes(CAROLE)
            ? "introduction.carole"
            : PLANNING;
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
      <Section
        text={t(`story.forest.introduction.${part}`)}
        next={goTo(next)}
      />
    );
  }

  const meetingOrder = [CETO, ALECTO, CAROLE, KATRINA, TEKELI, CAMILLA];
  const i = meetingOrder.indexOf(section);
  if (i > -1) {
    return (
      <Section text={t(`story.meeting.${section}`)}>
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
          next={goToChapter("forest")}
        />
      );
    default:
      return (
        <Section text={t("story.meeting.introduction")} next={goTo(CETO)} />
      );
  }
};

export default Game;
