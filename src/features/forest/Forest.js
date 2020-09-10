import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSection,
  setSection,
  selectStep,
  nextStep,
  setChapter,
} from "../navigation/reducer";
import { useTranslation } from "react-i18next";
import Section from "../navigation/Section";
import {
  CETO,
  CAROLE,
  CAMILLA,
  ALECTO,
  KATRINA,
  DEJANIRE,
  name,
  TEKELI,
} from "../../characters";
import { selectParty } from "../party/reducer";
import ForestSelector from "./ForestSelector";
import { selectForest } from "./reducer";
import { Typography } from "antd";
import { DIRECTIONS, WEST, success, EAST, SOUTH } from "./directions";
import Results from "../debrief/Results";

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
  const RESULTS = "results";

  if (section === RESULTS) {
    const data = [
      forestParty.includes(CETO) && {
        key: "optigirl",
        character: CETO,
        type: "success",
      },
      forestParty.includes(TEKELI) &&
        forest[WEST] !== TEKELI && {
          key: "optigirl",
          character: TEKELI,
          type: "success",
        },
      [ALECTO, CAMILLA, KATRINA].includes(forest[WEST]) && {
        key: "beast",
        character: forest[WEST],
        type: "warning",
      },
      forestParty.includes(ALECTO) &&
        forest[WEST] !== ALECTO && {
          key: "citygirl",
          character: ALECTO,
          type: "warning",
        },
      forestParty.includes(CAROLE) &&
        forest[EAST] !== CAROLE && {
          key: "citygirl",
          character: CAROLE,
          type: "warning",
        },
      [CAROLE, KATRINA].includes(forest[EAST]) && {
        key: "fairies",
        character: forest[EAST],
        type: "success",
      },
      forestParty.includes(CETO) && {
        key: "dream",
      },
      [CAMILLA, DEJANIRE].includes(forest[SOUTH]) && {
        key: `ally.${forest[SOUTH]}`,
      },
    ].filter(Boolean);

    return (
      <Section next={() => dispatch(setChapter("library"))}>
        <Results context="forest" success={success(forest)} data={data} />
      </Section>
    );
  }

  if (section === EXPLORATION) {
    const root = "story.forest.exploration";

    const adventures = DIRECTIONS.map((direction) => {
      const character = forest[direction];
      if (!character) {
        return "";
      }
      const text = (() => {
        if (
          direction === WEST &&
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
        return t(key, {
          defaultValue: t(fallbackKey, { name: name({ character, t }) }),
        });
      })();

      return { character, text };
    }).filter(Boolean);
    return (
      <Section
        text={adventures[step]["text"]}
        character={adventures[step]["character"]}
        next={!!adventures[step + 1] ? stepUp : goTo(RESULTS)}
        translated={true}
      />
    );
  }

  if (section === PLANNING) {
    const completed = forestParty.every((character) =>
      Object.values(forest).includes(character)
    );

    return (
      <Section
        text={"story.forest.planning"}
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
    let parts = [{ key: "part-1", character: DEJANIRE }];

    if (forestParty.includes(CETO)) {
      parts.push({ key: "ceto", character: CETO });
    }

    parts.push({ key: "part-2", character: DEJANIRE });

    if (forestParty.includes(CAMILLA)) {
      parts.push({ key: "camilla", character: CAMILLA });
    }

    parts.push({ key: "part-3", character: DEJANIRE });

    if (forestParty.includes(CAROLE)) {
      parts.push({ key: "carole", character: CAROLE });
    }

    return parts;
  })();
  const current = introduction[step];

  return (
    <Section
      text={`story.forest.introduction.${current["key"]}`}
      character={current["character"]}
      next={!!introduction[step + 1] ? stepUp : goTo(PLANNING)}
    />
  );
};

export default Forest;
